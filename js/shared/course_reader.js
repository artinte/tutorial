/* =========================================================
   SHARED · 课程阅读器
   course_reader.js
   ---------------------------------------------------------
   把「课程数据」渲染成统一的阅读界面：

       左侧：目录
             1    章节
             1.1  小节
             1.2  小节

       右侧：当前小节正文
             1.1   小节标题
             1.1.1 正文小标题
             1.1.2 正文小标题

   两门课只负责提供 course 数据和自己页面的外框，
   目录、正文、编号、进度、上下节导航都由这里统一实现。
========================================================= */

import {
    escapeHTML
} from "../utils/html_escape.js";

import {
    renderSectionArticle
} from "./content_renderer.js";


/* =========================================================
   课程索引
   ---------------------------------------------------------
   一次性算出每章、每节的编号，避免渲染时反复查找。
========================================================= */

export function buildCourseIndex(course) {

    const flat = [];

    const chapters = (course.chapters || []).map(
        (chapter, chapterIndex) => {

            const chapterNumber = chapterIndex + 1;

            const sections = (chapter.sections || []).map(
                (section, sectionIndex) => {

                    const sectionNumber =
                        `${chapterNumber}.${sectionIndex + 1}`;

                    const node = {
                        chapter,
                        section,
                        chapterNumber,
                        chapterIndex,
                        sectionIndex,
                        sectionNumber
                    };

                    flat.push(node);

                    return node;
                }
            );

            return {
                chapter,
                chapterNumber,
                chapterIndex,
                sections
            };
        }
    );

    return { chapters, flat };
}


/* =========================================================
   进度存储
   ---------------------------------------------------------
   新格式：tutorial-progress:<courseId>
           { completed: [sectionId, ...] }

   同时兼容两门课的历史键，避免用户进度丢失。
========================================================= */

function readCompleted(courseId) {
    const completed = new Set();

    const keys = [
        `tutorial-progress:${courseId}`,
        `${courseId}:learning-progress`
    ];

    const fields = [
        "completed",
        "completedLessons",
        "completedSections"
    ];

    for (const key of keys) {
        let raw = null;

        try {
            raw = localStorage.getItem(key);
        } catch {
            continue;
        }

        if (!raw) {
            continue;
        }

        try {
            const parsed = JSON.parse(raw);

            for (const field of fields) {
                if (Array.isArray(parsed?.[field])) {
                    parsed[field].forEach(id => completed.add(id));
                }
            }
        } catch {
            /* 忽略损坏的进度数据 */
        }
    }

    return completed;
}


function writeCompleted(courseId, completed) {
    try {
        localStorage.setItem(
            `tutorial-progress:${courseId}`,
            JSON.stringify({
                completed: [...completed],
                updatedAt: new Date().toISOString()
            })
        );
    } catch {
        /* 忽略写入失败（隐私模式等） */
    }
}


/* =========================================================
   阅读器
========================================================= */

export function createCourseReader(options) {

    const {
        course,
        tocMount,
        articleMount,
        navMount = null,
        progressMount = null,
        runCode = true,
        autoCompleteOnNext = true,
        labels = {},
        onOpen = null,
        onProgress = null
    } = options;

    if (!course) {
        throw new Error("[Reader] 缺少 course 数据。");
    }

    const text = {
        tocTitle: labels.tocTitle || "课程目录",
        empty: labels.empty || "本课程暂无小节内容。",
        previous: labels.previous || "上一节",
        next: labels.next || "下一节",
        complete: labels.complete || "标记完成",
        completed: labels.completed || "已完成",
        uncomplete: labels.uncomplete || "取消完成",
        progress: labels.progress || "整体学习进度",
        sectionUnit: labels.sectionUnit || "节"
    };


    const index = buildCourseIndex(course);

    const state = {
        currentChapterId: null,
        currentSectionId: null,
        expandedChapters: new Set(),
        completed: readCompleted(course.id)
    };


    /* =====================================================
       查询
    ===================================================== */

    function findNode(chapterId, sectionId) {
        return index.flat.find(
            node =>
                node.chapter.id === chapterId &&
                node.section.id === sectionId
        ) || null;
    }

    function getCurrent() {
        return findNode(
            state.currentChapterId,
            state.currentSectionId
        );
    }

    function isCompleted(sectionId) {
        return state.completed.has(sectionId);
    }

    function getChapterStats(chapter) {
        const sections = chapter.sections || [];

        const completed = sections.filter(
            section => state.completed.has(section.id)
        ).length;

        return {
            total: sections.length,
            completed,
            percent: sections.length
                ? Math.round(completed / sections.length * 100)
                : 0
        };
    }

    function getOverallStats() {
        const total = index.flat.length;

        const completed = index.flat.filter(
            node => state.completed.has(node.section.id)
        ).length;

        return {
            total,
            completed,
            percent: total
                ? Math.round(completed / total * 100)
                : 0
        };
    }


    /* =====================================================
       目录
    ===================================================== */

    function renderToc() {

        if (!tocMount) {
            return;
        }

        if (index.flat.length === 0) {
            tocMount.innerHTML = `
                <p class="ck-toc-empty">${escapeHTML(text.empty)}</p>
            `;
            return;
        }

        tocMount.innerHTML = `
            <nav class="ck-toc" aria-label="${escapeHTML(text.tocTitle)}">

                ${index.chapters.map(({ chapter, chapterNumber, sections }) => {

            const stats = getChapterStats(chapter);

            const expanded =
                state.expandedChapters.has(chapter.id) ||
                state.currentChapterId === chapter.id;

            return `
                        <section
                            class="ck-toc-chapter${expanded ? " is-open" : ""}${state.currentChapterId === chapter.id ? " is-current" : ""
                }"
                            data-toc-chapter="${escapeHTML(chapter.id)}"
                        >

                            <button
                                type="button"
                                class="ck-toc-chapter-btn"
                                data-toc-toggle="${escapeHTML(chapter.id)}"
                                aria-expanded="${expanded}"
                            >
                                <span class="ck-toc-num">
                                    ${chapterNumber}
                                </span>

                                <span class="ck-toc-label">
                                    ${escapeHTML(chapter.title || "")}
                                </span>

                                <span class="ck-toc-count">
                                    ${stats.completed}/${stats.total}
                                </span>
                            </button>


                            <div class="ck-toc-sections">
                                ${sections.map(({ section, sectionNumber }) => `
                                    <button
                                        type="button"
                                        class="ck-toc-section${section.id === state.currentSectionId ? " is-active" : ""}${isCompleted(section.id) ? " is-done" : ""
                    }"
                                        data-toc-open="${escapeHTML(section.id)}"
                                        data-toc-open-chapter="${escapeHTML(chapter.id)}"
                                    >
                                        <span class="ck-toc-section-num">
                                            ${escapeHTML(sectionNumber)}
                                        </span>

                                        <span class="ck-toc-section-label">
                                            ${escapeHTML(section.title || "")}
                                        </span>

                                        <span class="ck-toc-check" aria-hidden="true">
                                            ${isCompleted(section.id) ? "✓" : ""}
                                        </span>
                                    </button>
                                `).join("")}
                            </div>

                        </section>
                    `;
        }).join("")}

            </nav>
        `;
    }


    /* =====================================================
       正文
    ===================================================== */

    function renderArticle(node) {

        if (!articleMount) {
            return;
        }

        if (!node) {
            articleMount.innerHTML = `
                <div class="ck-article-empty">
                    ${escapeHTML(text.empty)}
                </div>
            `;
            return;
        }

        const { chapter, section, chapterNumber, sectionNumber, sectionIndex } = node;

        /*
         * 章的学习目标只在小节的第一节展示，
         * 避免每节重复。
         */

        const objectives =
            sectionIndex === 0 && Array.isArray(chapter.objectives)
                ? chapter.objectives
                : [];

        articleMount.innerHTML = renderSectionArticle({
            chapter,
            section,
            chapterNumber,
            sectionNumber,
            objectives,
            runCode
        });
    }


    /* =====================================================
       上下节导航
    ===================================================== */

    function renderNav(node) {

        if (!navMount) {
            return;
        }

        if (!node) {
            navMount.innerHTML = "";
            return;
        }

        const position =
            index.flat.findIndex(
                item => item.section.id === node.section.id
            );

        const previous =
            position > 0 ? index.flat[position - 1] : null;

        const next =
            position >= 0 && position < index.flat.length - 1
                ? index.flat[position + 1]
                : null;

        const completed = isCompleted(node.section.id);

        navMount.innerHTML = `
            <div class="ck-pagenav">

                <div class="ck-pagenav-side">
                    ${previous
                ? `
                                <button
                                    type="button"
                                    class="ck-btn"
                                    data-ck-prev="${escapeHTML(previous.section.id)}"
                                    data-ck-prev-chapter="${escapeHTML(previous.chapter.id)}"
                                >
                                    ← ${escapeHTML(text.previous)}
                                    <span>${escapeHTML(previous.sectionNumber)}</span>
                                </button>
                            `
                : ""
            }
                </div>


                <button
                    type="button"
                    class="ck-btn ${completed ? "is-done" : "ck-btn-primary"}"
                    data-ck-complete="${escapeHTML(node.section.id)}"
                    aria-pressed="${completed}"
                >
                    ${completed ? `✓ ${escapeHTML(text.completed)}` : `✓ ${escapeHTML(text.complete)}`}
                </button>


                <div class="ck-pagenav-side is-right">
                    ${next
                ? `
                                <button
                                    type="button"
                                    class="ck-btn ck-btn-primary"
                                    data-ck-next="${escapeHTML(next.section.id)}"
                                    data-ck-next-chapter="${escapeHTML(next.chapter.id)}"
                                >
                                    ${escapeHTML(text.next)}
                                    <span>${escapeHTML(next.sectionNumber)}</span> →
                                </button>
                            `
                : ""
            }
                </div>

            </div>
        `;
    }


    /* =====================================================
       进度
    ===================================================== */

    function renderProgress() {

        const stats = getOverallStats();

        if (progressMount) {
            progressMount.innerHTML = `
                <div class="ck-progress">

                    <div class="ck-progress-head">
                        <span>${escapeHTML(text.progress)}</span>
                        <strong>${stats.percent}%</strong>
                    </div>

                    <div class="ck-progress-track">
                        <span style="width:${stats.percent}%"></span>
                    </div>

                    <p class="ck-progress-note">
                        ${stats.completed} / ${stats.total} ${escapeHTML(text.sectionUnit)}
                    </p>

                </div>
            `;
        }

        if (typeof onProgress === "function") {
            onProgress(stats);
        }
    }


    /* =====================================================
       渲染全部
    ===================================================== */

    function render() {
        renderToc();
        renderProgress();

        const node = getCurrent();

        renderArticle(node);
        renderNav(node);
    }


    /* =====================================================
       打开小节
    ===================================================== */

    function open(chapterId, sectionId, openOptions = {}) {

        const node = findNode(chapterId, sectionId);

        if (!node) {
            console.warn("[Reader] 找不到小节：", chapterId, sectionId);
            return false;
        }

        state.currentChapterId = chapterId;
        state.currentSectionId = sectionId;

        state.expandedChapters.add(chapterId);

        render();

        if (typeof onOpen === "function") {
            onOpen({
                course,
                chapter: node.chapter,
                section: node.section,
                chapterNumber: node.chapterNumber,
                sectionNumber: node.sectionNumber,
                node
            });
        }

        if (openOptions.scroll !== false && articleMount) {
            const rect =
                articleMount.getBoundingClientRect();

            if (rect.top < 0) {
                articleMount.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }

        return true;
    }


    function openFirst() {
        const first = index.flat[0];

        if (!first) {
            return false;
        }

        return open(
            first.chapter.id,
            first.section.id
        );
    }


    /* =====================================================
       清除当前选中（回到大纲时使用）
    ===================================================== */

    function clearActive() {
        state.currentSectionId = null;

        renderToc();
        renderProgress();
    }


    /* =====================================================
       只高亮章节（用于回到大纲时保留位置）
    ===================================================== */

    function setActiveChapter(chapterId) {
        const exists = index.chapters.some(
            item => item.chapter.id === chapterId
        );

        if (exists) {
            state.currentChapterId = chapterId;
            state.expandedChapters.add(chapterId);
        }

        state.currentSectionId = null;

        renderToc();
    }


    /* =====================================================
       完成状态
    ===================================================== */

    function setCompleted(sectionId, value) {

        if (value) {
            state.completed.add(sectionId);
        } else {
            state.completed.delete(sectionId);
        }

        writeCompleted(course.id, state.completed);

        render();

        return value;
    }


    function toggleCompleted(sectionId) {
        return setCompleted(
            sectionId,
            !isCompleted(sectionId)
        );
    }


    /* =====================================================
       事件
    ===================================================== */

    if (tocMount) {
        tocMount.addEventListener("click", event => {

            const toggle =
                event.target.closest("[data-toc-toggle]");

            if (toggle) {
                const chapterId = toggle.dataset.tocToggle;

                if (state.expandedChapters.has(chapterId)) {
                    state.expandedChapters.delete(chapterId);
                } else {
                    state.expandedChapters.add(chapterId);
                }

                renderToc();

                return;
            }

            const sectionButton =
                event.target.closest("[data-toc-open]");

            if (sectionButton) {
                open(
                    sectionButton.dataset.tocOpenChapter,
                    sectionButton.dataset.tocOpen
                );
            }
        });
    }


    if (navMount) {
        navMount.addEventListener("click", event => {

            const previous =
                event.target.closest("[data-ck-prev]");

            if (previous) {
                open(
                    previous.dataset.ckPrevChapter,
                    previous.dataset.ckPrev
                );
                return;
            }

            const next =
                event.target.closest("[data-ck-next]");

            if (next) {
                /*
                 * 进入下一节时，默认把当前小节标记为已完成。
                 * 这是课程常见的阅读习惯，也可以在
                 * createCourseReader({ autoCompleteOnNext: false })
                 * 中关闭。
                 */

                if (autoCompleteOnNext && state.currentSectionId) {
                    state.completed.add(state.currentSectionId);
                    writeCompleted(course.id, state.completed);
                }

                open(
                    next.dataset.ckNextChapter,
                    next.dataset.ckNext
                );
                return;
            }

            const complete =
                event.target.closest("[data-ck-complete]");

            if (complete) {
                toggleCompleted(complete.dataset.ckComplete);
            }
        });
    }


    /* =====================================================
       对外接口
    ===================================================== */

    render();

    return {
        open,
        openFirst,
        clearActive,
        setActiveChapter,
        refresh: render,
        renderToc,
        renderProgress,
        isCompleted,
        setCompleted,
        toggleCompleted,
        getChapterStats,
        getOverallStats,
        getCurrent,
        getChapters: () => index.chapters,
        getFlatSections: () => [...index.flat],
        getState: () => ({
            currentChapterId: state.currentChapterId,
            currentSectionId: state.currentSectionId
        })
    };
}
