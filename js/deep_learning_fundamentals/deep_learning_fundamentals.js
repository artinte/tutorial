/* =========================================================
   DEEP LEARNING FUNDAMENTALS
   main.js
   ========================================================= */

import {
    COURSE_ID,
    COURSE,
    chapters
} from "./chapters.js";


/* =========================================================
   DOM 工具
   ========================================================= */

const $ = (selector, root = document) =>
    root.querySelector(selector);

const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];


function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


function scrollToElement(element, offset = 95) {
    if (!element) {
        return;
    }

    const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

    window.scrollTo({
        top,
        behavior: "smooth"
    });
}


/* =========================================================
   状态
   ========================================================= */

const state = {
    currentChapterId: null,
    currentSectionId: null,

    expandedChapters: new Set(),

    completedSections: new Set(),

    fontSize: 16,

    searchQuery: "",

    observer: null,

    toastTimer: null
};


const STORAGE_KEY =
    `${COURSE_ID}:learning-progress`;

const FONT_STORAGE_KEY =
    `${COURSE_ID}:reader-font-size`;


/* =========================================================
   初始化课程状态
   ========================================================= */

function initializeState() {
    const firstChapter = chapters[0];

    if (!firstChapter) {
        return;
    }

    state.currentChapterId =
        firstChapter.id;

    state.currentSectionId =
        firstChapter.sections?.[0]?.id ?? null;

    try {
        const saved = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "{}"
        );

        if (Array.isArray(saved.completedSections)) {
            state.completedSections =
                new Set(saved.completedSections);
        }

        if (saved.currentChapterId) {
            const chapter = chapters.find(
                item => item.id === saved.currentChapterId
            );

            if (chapter) {
                state.currentChapterId = chapter.id;
            }
        }

        if (saved.currentSectionId) {
            state.currentSectionId =
                saved.currentSectionId;
        }

    } catch (error) {
        console.warn("读取学习进度失败：", error);
    }

    try {
        const savedFontSize = Number(
            localStorage.getItem(FONT_STORAGE_KEY)
        );

        if (
            Number.isFinite(savedFontSize) &&
            savedFontSize >= 14 &&
            savedFontSize <= 22
        ) {
            state.fontSize = savedFontSize;
        }
    } catch {
        // 忽略字号读取失败
    }

    state.expandedChapters.add(
        state.currentChapterId
    );

    applyFontSize();
}


/* =========================================================
   基础数据工具
   ========================================================= */

function getChapter(chapterId) {
    return chapters.find(
        chapter => chapter.id === chapterId
    ) ?? null;
}


function getCurrentChapter() {
    return getChapter(
        state.currentChapterId
    );
}


function getAllSections() {
    return chapters.flatMap(chapter =>
        (chapter.sections || []).map(section => ({
            ...section,
            chapterId: chapter.id,
            chapterNumber: chapter.number,
            chapterTitle: chapter.title
        }))
    );
}


function getSectionCount() {
    return chapters.reduce(
        (total, chapter) =>
            total + (chapter.sections?.length || 0),
        0
    );
}


function getCompletedCount() {
    return state.completedSections.size;
}


function getProgress() {
    const total = getSectionCount();

    if (!total) {
        return 0;
    }

    return Math.min(
        100,
        Math.round(
            getCompletedCount() / total * 100
        )
    );
}


function getChapterProgress(chapter) {
    const total =
        chapter.sections?.length || 0;

    if (!total) {
        return 0;
    }

    const completed =
        chapter.sections.filter(section =>
            state.completedSections.has(section.id)
        ).length;

    return Math.round(
        completed / total * 100
    );
}


function isChapterCompleted(chapter) {
    return (
        chapter.sections?.length > 0 &&
        chapter.sections.every(section =>
            state.completedSections.has(section.id)
        )
    );
}


/* =========================================================
   持久化学习进度
   ========================================================= */

function saveProgress() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                currentChapterId:
                    state.currentChapterId,

                currentSectionId:
                    state.currentSectionId,

                completedSections:
                    [...state.completedSections]
            })
        );
    } catch (error) {
        console.warn("保存学习进度失败：", error);
    }
}


/* =========================================================
   提示消息
   ========================================================= */

function showToast(message) {
    const toast = $("#toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("visible");

    clearTimeout(state.toastTimer);

    state.toastTimer = setTimeout(() => {
        toast.classList.remove("visible");
    }, 2400);
}


/* =========================================================
   搜索
   ========================================================= */

function normalizeSearchText(value) {
    return String(value || "")
        .toLowerCase()
        .trim();
}


function sectionMatches(section, query) {
    if (!query) {
        return true;
    }

    const searchable = normalizeSearchText([
        section.id,
        section.title,
        section.intro,
        ...(section.keywords || []),
        ...(section.content || []).map(block =>
            typeof block === "string"
                ? block
                : JSON.stringify(block)
        )
    ].join(" "));

    return searchable.includes(query);
}


function chapterMatches(chapter, query) {
    if (!query) {
        return true;
    }

    const chapterText = normalizeSearchText([
        chapter.title,
        chapter.description,
        chapter.englishTitle,
        chapter.number,
        ...(chapter.objectives || [])
    ].join(" "));

    if (chapterText.includes(query)) {
        return true;
    }

    return (chapter.sections || []).some(section =>
        sectionMatches(section, query)
    );
}


/* =========================================================
   左侧章节导航
   ========================================================= */

function renderChapterSidebar() {
    const container = $("#chapterList");

    if (!container) {
        return;
    }

    const query =
        normalizeSearchText(state.searchQuery);

    const visibleChapters =
        chapters.filter(chapter =>
            chapterMatches(chapter, query)
        );

    container.innerHTML =
        visibleChapters.map(chapter => {
            const active =
                chapter.id === state.currentChapterId;

            const completed =
                isChapterCompleted(chapter);

            const progress =
                getChapterProgress(chapter);

            return `
                <button
                    class="
                        chapter-nav-item
                        ${active ? "active" : ""}
                    "
                    type="button"
                    data-open-chapter="${escapeHTML(chapter.id)}"
                >

                    <span class="chapter-nav-number">
                        ${escapeHTML(chapter.number)}
                    </span>

                    <span class="chapter-nav-copy">

                        <strong>
                            ${escapeHTML(chapter.title)}
                        </strong>

                        <small>
                            ${completed
                    ? "已完成"
                    : `${progress}% · ${chapter.sections.length} 小节`
                }
                        </small>

                    </span>

                    ${completed
                    ? '<span class="chapter-nav-check">✓</span>'
                    : ""
                }

                </button>
            `;
        }).join("");

    $("#sidebarChapterCount").textContent =
        `${visibleChapters.length} 章`;

    updateProgressUI();
}


/* =========================================================
   章节路线图
   ========================================================= */

function renderRoadmap() {
    const container = $("#roadmapList");
    const empty = $("#searchEmpty");

    if (!container) {
        return;
    }

    const query =
        normalizeSearchText(state.searchQuery);

    const visibleChapters =
        chapters.filter(chapter =>
            chapterMatches(chapter, query)
        );

    container.innerHTML =
        visibleChapters.map(chapter => {
            const expanded =
                state.expandedChapters.has(chapter.id) ||
                Boolean(query);

            const current =
                state.currentChapterId === chapter.id;

            const sections =
                chapter.sections || [];

            const filteredSections =
                query
                    ? sections.filter(section =>
                        sectionMatches(section, query) ||
                        normalizeSearchText(
                            chapter.title
                        ).includes(query)
                    )
                    : sections;


            /* =================================================
               小节链接
               ================================================= */

            const lessonHTML =
                filteredSections.map(section => {

                    const completed =
                        state.completedSections.has(section.id);


                    /*
                     * 小节页面路径
                     *
                     * section.id
                     *     → 课程内部 ID，例如：
                     *       1-1
                     *
                     * section.page
                     *     → 实际 HTML 文件名，例如：
                     *       what-is-machine-learning
                     */

                    const page =
                        section.page || section.id;

                    const lessonURL =
                        `./chapters/${encodeURIComponent(page)}.html`;


                    return `
                        <a
                            class="
                                lesson-link
                                ${completed ? "completed" : ""}
                            "
                            href="${lessonURL}"
                        >

                            <span class="lesson-link-number">
                                ${escapeHTML(section.id)}
                            </span>

                            <span class="lesson-link-copy">

                                <strong>
                                    ${escapeHTML(section.title)}
                                </strong>

                                <small>
                                    ${escapeHTML(
                        section.intro ||
                        section.description ||
                        "学习核心概念、原理与实践方法。"
                    )}
                                </small>

                            </span>

                            ${completed
                            ? '<span class="lesson-link-status">✓</span>'
                            : ""
                        }

                        </a>
                    `;
                }).join("");


            return `
                <article
                    class="
                        chapter-card
                        ${expanded ? "expanded" : ""}
                        ${current ? "current" : ""}
                    "
                    data-chapter-card="${escapeHTML(chapter.id)}"
                >

                    <div
                        class="chapter-card-header"
                        role="button"
                        tabindex="0"
                        aria-expanded="${expanded}"
                        data-toggle-chapter="${escapeHTML(chapter.id)}"
                    >

                        <div class="chapter-card-number">
                            ${escapeHTML(chapter.number)}
                        </div>

                        <div class="chapter-card-info">

                            <h3>
                                ${escapeHTML(chapter.title)}
                            </h3>

                            <p>
                                ${escapeHTML(
                chapter.description || ""
            )}
                            </p>

                        </div>

                        <div class="chapter-card-meta">

                            <span class="chapter-card-count">
                                ${sections.length} 个小节
                            </span>

                            <span class="chapter-card-arrow">
                                ⌄
                            </span>

                        </div>

                    </div>


                    <div class="chapter-card-body">

                        <div class="chapter-card-divider"></div>

                        <div class="chapter-lesson-list">
                            ${lessonHTML}
                        </div>

                    </div>

                </article>
            `;
        }).join("");


    const noResults =
        visibleChapters.length === 0;


    empty?.classList.toggle(
        "hidden",
        !noResults
    );


    container.classList.toggle(
        "hidden",
        noResults
    );


    $("#resultSummary").textContent =
        query
            ? `找到 ${visibleChapters.length} 个相关章节`
            : `共 ${chapters.length} 个章节 · ${getSectionCount()} 个学习小节`;


    renderChapterSidebar();
}


/* =========================================================
   正文渲染工具
   ========================================================= */

function renderParagraph(text) {
    return `<p>${escapeHTML(text)}</p>`;
}


function renderList(items, ordered = false) {
    const tag = ordered ? "ol" : "ul";

    return `
        <${tag}>
            ${(items || []).map(item =>
        `<li>${escapeHTML(item)}</li>`
    ).join("")}
        </${tag}>
    `;
}


function renderCallout(block) {
    const type =
        block.variant === "green"
            ? "callout-green"
            : block.variant === "orange"
                ? "callout-orange"
                : "";

    return `
        <div class="article-callout ${type}">

            <strong>
                ${escapeHTML(block.title || "核心提示")}
            </strong>

            <p>
                ${escapeHTML(block.text || "")}
            </p>

        </div>
    `;
}


function renderFormula(block) {
    return `
        <div class="formula-box">
            ${escapeHTML(block.text || "")}
        </div>
    `;
}


function renderCode(block) {
    return `
        <div class="code-block">

            <div class="code-block-header">

                <span>
                    ${escapeHTML(block.language || "CODE")}
                </span>

                <button
                    class="copy-code-button"
                    type="button"
                    data-copy-code
                >
                    复制代码
                </button>

            </div>

            <pre><code>${escapeHTML(block.code || "")}</code></pre>

        </div>
    `;
}


function renderConcepts(block) {
    return `
        <div class="concept-grid">

            ${(block.items || []).map(item => `
                <article class="concept-card">

                    <strong>
                        ${escapeHTML(item.title || "")}
                    </strong>

                    <p>
                        ${escapeHTML(item.text || "")}
                    </p>

                </article>
            `).join("")}

        </div>
    `;
}


function renderPractice(block) {
    return `
        <div class="practice-box">

            <span class="practice-label">
                PRACTICE & EXPERIMENT
            </span>

            <h3>
                ${escapeHTML(block.title || "动手实践")}
            </h3>

            <p>
                ${escapeHTML(block.text || "")}
            </p>

            ${block.tasks?.length
            ? renderList(block.tasks, true)
            : ""
        }

        </div>
    `;
}


function renderThinking(block) {
    return `
        <div class="thinking-box">

            <strong>
                思考与自测
            </strong>

            ${renderList(block.items || [], true)}

        </div>
    `;
}


function renderChecklist(block) {
    return `
        <div class="article-callout callout-green">

            <strong>
                本节学习检查
            </strong>

            ${renderList(block.items || [])}

        </div>
    `;
}


function renderBlock(block) {
    if (typeof block === "string") {
        return renderParagraph(block);
    }

    switch (block.type) {
        case "paragraph":
            return renderParagraph(block.text);

        case "heading":
            return `<h3>${escapeHTML(block.text || "")}</h3>`;

        case "subheading":
            return `<h4>${escapeHTML(block.text || "")}</h4>`;

        case "list":
            return renderList(
                block.items || [],
                Boolean(block.ordered)
            );

        case "note":
        case "callout":
            return renderCallout(block);

        case "formula":
            return renderFormula(block);

        case "code":
            return renderCode(block);

        case "concepts":
            return renderConcepts(block);

        case "practice":
            return renderPractice(block);

        case "thinking":
            return renderThinking(block);

        case "checklist":
            return renderChecklist(block);

        default:
            return "";
    }
}


/* =========================================================
   学习目标
   ========================================================= */

function renderObjectives(objectives) {
    if (!objectives?.length) {
        return "";
    }

    return `
        <div class="article-callout">

            <strong>
                学习目标
            </strong>

            ${renderList(objectives)}

        </div>
    `;
}


/* =========================================================
   正文小节
   ========================================================= */
function renderSection(section, index) {

    const content =
        (section.content || [])
            .map(renderBlock)
            .join("");

    const page =
        section.page || section.id;

    return `
        <section
            class="article-section"
            id="lesson-${escapeHTML(section.id)}"
            data-section-id="${escapeHTML(section.id)}"
        >

            <div
                class="lesson-heading"
                data-page="${escapeHTML(page)}"
                role="link"
                tabindex="0"
            >
                ${escapeHTML(section.title)}
            </div>

            ${
                section.intro
                    ? `
                        <p class="lesson-intro">
                            ${escapeHTML(section.intro)}
                        </p>
                    `
                    : ""
            }

            ${content}

        </section>
    `;
}

/* =========================================================
   小节标题 → 文章详情页
   ========================================================= */

function bindLessonLinks() {

    document
        .querySelectorAll(".lesson-heading")
        .forEach(heading => {

            heading.addEventListener("click", () => {

                const page =
                    heading.dataset.page;

                if (!page) {
                    console.error(
                        "lesson-heading 缺少 data-page：",
                        heading
                    );
                    return;
                }

                const lessonURL =
                    `./chapters/${encodeURIComponent(page)}.html`;

                window.location.href =
                    lessonURL;
            });

        });
}

/* =========================================================
   本章目录
   ========================================================= */

function renderTOC(chapter) {
    const container = $("#tocList");

    if (!container || !chapter) {
        return;
    }

    const sections =
        chapter.sections || [];

    container.innerHTML =
        sections.map(section => `
            <a
                class="toc-link"
                href="#lesson-${escapeHTML(section.id)}"
                data-toc-section="${escapeHTML(section.id)}"
            >
                ${escapeHTML(section.id)}
                &nbsp;
                ${escapeHTML(section.title)}
            </a>
        `).join("");

    $("#tocCount").textContent =
        String(sections.length);

    container.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            const sectionId =
                link.dataset.tocSection;

            const target = $(
                `#lesson-${CSS.escape(sectionId)}`
            );

            if (target) {
                history.replaceState(
                    null,
                    "",
                    `#lesson-${encodeURIComponent(sectionId)}`
                );

                scrollToElement(target, 105);
            }
        });
    });
}


/* =========================================================
   章节阅读页面
   ========================================================= */

function renderReader() {
    const container = $("#readerContent");
    const chapter = getCurrentChapter();

    if (!container || !chapter) {
        return;
    }

    const sections =
        chapter.sections || [];

    const completed =
        getChapterProgress(chapter);

    const firstSection =
        sections[0];

    container.innerHTML = `
        <div class="article-eyebrow">
            ${escapeHTML(COURSE_ID.toUpperCase())}
            /
            CHAPTER ${escapeHTML(chapter.number)}
        </div>

        <h1 class="article-title">
            ${escapeHTML(chapter.title)}
        </h1>

        <p class="article-lead">
            ${escapeHTML(chapter.description || "")}
        </p>

        <div class="article-meta">

            <span>
                第 ${escapeHTML(chapter.number)} 章
            </span>

            <span>
                ${sections.length} 个学习小节
            </span>

            <span>
                本章进度 ${completed}%
            </span>

        </div>

        <div class="article-cover">

            <div class="article-cover-label">
                CHAPTER ${escapeHTML(chapter.number)}
                ·
                ${escapeHTML(chapter.englishTitle || "DEEP LEARNING")}
            </div>

            <h3>
                ${escapeHTML(chapter.coverTitle || chapter.title)}
            </h3>

            <p>
                ${escapeHTML(
        chapter.coverDescription ||
        chapter.description ||
        ""
    )}
            </p>

        </div>

        ${renderObjectives(chapter.objectives)}

        ${sections.map(renderSection).join("")}

        <div class="lesson-completion">

            <div class="lesson-completion-copy">

                <strong>
                    ${isChapterCompleted(chapter)
            ? "本章已经完成"
            : "完成本章学习"
        }
                </strong>

                <p>
                    已完成 ${sections.filter(section =>
            state.completedSections.has(section.id)
        ).length}
                    /
                    ${sections.length}
                    个小节。
                </p>

            </div>

            <button
                class="complete-lesson-button"
                id="readerCompleteChapter"
                type="button"
            >
                ${isChapterCompleted(chapter)
            ? "✓ 已完成"
            : "✓ 完成本章"
        }
            </button>

        </div>

        <div class="chapter-navigation">

            ${getPreviousChapter(chapter)
            ? `
                    <button
                        class="chapter-navigation-button"
                        type="button"
                        data-nav-chapter="${escapeHTML(getPreviousChapter(chapter).id)}"
                    >
                        <span>← 上一章</span>

                        <strong>
                            ${escapeHTML(getPreviousChapter(chapter).title)}
                        </strong>
                    </button>
                `
            : `
                    <div></div>
                `
        }

            ${getNextChapter(chapter)
            ? `
                    <button
                        class="chapter-navigation-button"
                        type="button"
                        data-nav-chapter="${escapeHTML(getNextChapter(chapter).id)}"
                    >
                        <span>下一章 →</span>

                        <strong>
                            ${escapeHTML(getNextChapter(chapter).title)}
                        </strong>
                    </button>
                `
            : `
                    <div></div>
                `
        }

        </div>
    `;

    renderTOC(chapter);
    observeSections();
    updateProgressUI();

    const completionButton =
        $("#readerCompleteChapter");

    completionButton?.addEventListener(
        "click",
        () => markChapterComplete(chapter)
    );

    /*
     * 为每个小节添加完成按钮。
     * 按钮插入在对应小节末尾，不改变章节数据。
     */
    sections.forEach(section => {
        const sectionElement = $(
            `#lesson-${CSS.escape(section.id)}`,
            container
        );

        if (!sectionElement) {
            return;
        }

        const alreadyExists = $(
            ".section-completion-control",
            sectionElement
        );

        if (alreadyExists) {
            return;
        }

        const button = document.createElement("button");

        button.type = "button";
        button.className = "section-completion-control";

        button.textContent =
            state.completedSections.has(section.id)
                ? "✓ 已完成本节"
                : "标记本节已完成";

        button.style.cssText = `
            display: block;
            margin: 18px 0 0;
            padding: 8px 12px;
            color: #5267c7;
            background: #f4f6ff;
            border: 1px solid #e2e7ff;
            border-radius: 7px;
            font-size: 11px;
            font-weight: 700;
        `;

        button.addEventListener("click", () => {
            toggleSectionComplete(section.id);
        });

        sectionElement.appendChild(button);
    });

    bindCopyButtons();

    const firstIncomplete =
        sections.find(section =>
            !state.completedSections.has(section.id)
        );

    state.currentSectionId =
        firstIncomplete?.id ||
        firstSection?.id ||
        null;

    saveProgress();
}


/* =========================================================
   章节前后导航
   ========================================================= */

function getPreviousChapter(chapter) {
    const index =
        chapters.findIndex(item => item.id === chapter.id);

    if (index <= 0) {
        return null;
    }

    return chapters[index - 1];
}


function getNextChapter(chapter) {
    const index =
        chapters.findIndex(item => item.id === chapter.id);

    if (
        index < 0 ||
        index >= chapters.length - 1
    ) {
        return null;
    }

    return chapters[index + 1];
}


/* =========================================================
   切换章节
   ========================================================= */

function openChapter(chapterId, options = {}) {
    const chapter = getChapter(chapterId);

    if (!chapter) {
        return;
    }

    state.currentChapterId =
        chapter.id;

    state.expandedChapters.add(
        chapter.id
    );

    if (chapter.sections.length) {
        state.currentSectionId =
            chapter.sections[0].id;
    }

    saveProgress();

    renderRoadmap();
    renderReader();

    if (options.scroll !== false) {
        scrollToElement(
            $("#course-reader"),
            85
        );
    }
}


/* =========================================================
   打开具体小节
   ========================================================= */

function openSection(chapterId, sectionId) {
    const chapter =
        getChapter(chapterId);

    if (!chapter) {
        return;
    }

    const section =
        chapter.sections.find(item =>
            item.id === sectionId
        );

    if (!section) {
        return;
    }

    state.currentChapterId =
        chapter.id;

    state.currentSectionId =
        section.id;

    state.expandedChapters.add(
        chapter.id
    );

    saveProgress();

    renderRoadmap();
    renderReader();

    requestAnimationFrame(() => {
        const target = $(
            `#lesson-${CSS.escape(section.id)}`
        );

        if (target) {
            scrollToElement(target, 105);
        }
    });
}


/* =========================================================
   学习进度操作
   ========================================================= */

function toggleSectionComplete(sectionId) {
    if (state.completedSections.has(sectionId)) {
        state.completedSections.delete(sectionId);

        showToast("已取消本节完成状态。");
    } else {
        state.completedSections.add(sectionId);

        showToast("已完成本节学习。");
    }

    saveProgress();

    renderRoadmap();
    renderReader();
}


function markChapterComplete(chapter) {
    const sections =
        chapter.sections || [];

    if (!sections.length) {
        return;
    }

    const completed =
        isChapterCompleted(chapter);

    if (completed) {
        sections.forEach(section => {
            state.completedSections.delete(
                section.id
            );
        });

        showToast("已取消本章完成状态。");
    } else {
        sections.forEach(section => {
            state.completedSections.add(
                section.id
            );
        });

        showToast("恭喜你，已完成本章学习！");
    }

    saveProgress();

    renderRoadmap();
    renderReader();
}


function updateProgressUI() {
    const progress = getProgress();

    $("#sidebarProgressText").textContent =
        `${progress}%`;

    $("#readerProgressText").textContent =
        `${progress}%`;

    $("#sidebarProgressFill").style.width =
        `${progress}%`;

    $("#readerProgressFill").style.width =
        `${progress}%`;

    $("#sidebarProgressHint").textContent =
        progress === 100
            ? "全部小节已完成，恭喜你！"
            : progress === 0
                ? "完成第一个小节，开启你的学习旅程。"
                : `已经完成 ${getCompletedCount()} 个小节，继续保持。`;

    $("#readerProgressCaption").textContent =
        `已完成 ${getCompletedCount()} / ${getSectionCount()} 个小节`;

    $("#statChapterCount").textContent =
        String(chapters.length);

    $("#statSectionCount").textContent =
        String(getSectionCount());
}


/* =========================================================
   当前阅读小节高亮
   ========================================================= */

function observeSections() {
    if (state.observer) {
        state.observer.disconnect();
    }

    const sections =
        $$(".article-section[data-section-id]");

    if (!sections.length) {
        return;
    }

    state.observer = new IntersectionObserver(
        entries => {
            const visibleEntries =
                entries.filter(entry =>
                    entry.isIntersecting
                );

            if (!visibleEntries.length) {
                return;
            }

            visibleEntries.sort((a, b) =>
                a.boundingClientRect.top -
                b.boundingClientRect.top
            );

            const current =
                visibleEntries[0].target;

            const sectionId =
                current.dataset.sectionId;

            if (!sectionId) {
                return;
            }

            state.currentSectionId =
                sectionId;

            $$(".toc-link").forEach(link => {
                link.classList.toggle(
                    "active",
                    link.dataset.tocSection === sectionId
                );
            });

        },
        {
            root: null,
            rootMargin: "-110px 0px -65% 0px",
            threshold: 0
        }
    );

    sections.forEach(section => {
        state.observer.observe(section);
    });
}


/* =========================================================
   复制代码
   ========================================================= */

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);

        showToast("代码已复制。");

    } catch {
        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.select();

        const success =
            document.execCommand("copy");

        textarea.remove();

        showToast(
            success
                ? "代码已复制。"
                : "复制失败，请手动选择代码。"
        );
    }
}


function bindCopyButtons() {
    $$("[data-copy-code]").forEach(button => {
        button.addEventListener("click", () => {
            const code =
                $("code", button.closest(".code-block"));

            if (!code) {
                return;
            }

            copyText(code.textContent || "");
        });
    });
}


/* =========================================================
   字号调整
   ========================================================= */

function applyFontSize() {
    document.documentElement.style.setProperty(
        "--reader-font-size",
        `${state.fontSize}px`
    );

    try {
        localStorage.setItem(
            FONT_STORAGE_KEY,
            String(state.fontSize)
        );
    } catch {
        // 忽略存储失败
    }
}


function changeFontSize(delta) {
    state.fontSize = Math.min(
        22,
        Math.max(
            14,
            state.fontSize + delta
        )
    );

    applyFontSize();

    showToast(
        `正文大小：${state.fontSize}px`
    );
}


/* =========================================================
   URL 定位
   ========================================================= */

function readInitialLocation() {
    const params =
        new URLSearchParams(location.search);

    const chapterParam =
        params.get("chapter");

    if (chapterParam) {
        const chapter = chapters.find(item =>
            item.id === chapterParam ||
            item.number === chapterParam
        );

        if (chapter) {
            state.currentChapterId =
                chapter.id;

            state.expandedChapters.add(
                chapter.id
            );
        }
    }

    const hash =
        decodeURIComponent(
            location.hash.replace(/^#/, "")
        );

    if (!hash) {
        return;
    }

    const matchedSection =
        getAllSections().find(section =>
            section.id === hash
        );

    if (matchedSection) {
        state.currentChapterId =
            matchedSection.chapterId;

        state.currentSectionId =
            matchedSection.id;

        state.expandedChapters.add(
            matchedSection.chapterId
        );
    }
}


/* =========================================================
   搜索事件
   ========================================================= */

function handleSearch(value) {
    state.searchQuery = value;

    renderRoadmap();
}


function bindSearch() {
    const input =
        $("#courseSearch");

    input?.addEventListener(
        "input",
        event => {
            handleSearch(
                event.target.value
            );
        }
    );

    const clearSearch = () => {
        if (input) {
            input.value = "";
        }

        state.searchQuery = "";

        renderRoadmap();
    };

    $("#clearSearch")?.addEventListener(
        "click",
        clearSearch
    );

    $("#emptyClearSearch")?.addEventListener(
        "click",
        clearSearch
    );

    document.addEventListener(
        "keydown",
        event => {
            const isSearchShortcut =
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k";

            if (isSearchShortcut) {
                event.preventDefault();

                input?.focus();
            }

            if (
                event.key === "Escape" &&
                document.activeElement === input
            ) {
                clearSearch();

                input.blur();
            }
        }
    );
}


/* =========================================================
   章节列表事件
   ========================================================= */

function bindRoadmapEvents() {

    $("#roadmapList")?.addEventListener(
        "click",
        event => {

            const header =
                event.target.closest(
                    "[data-toggle-chapter]"
                );

            if (!header) {
                return;
            }

            if (
                event.target.closest(
                    ".lesson-link"
                )
            ) {
                return;
            }

            const chapterId =
                header.dataset.toggleChapter;

            if (
                state.expandedChapters.has(
                    chapterId
                )
            ) {

                state.expandedChapters.delete(
                    chapterId
                );

            } else {

                state.expandedChapters.add(
                    chapterId
                );
            }

            renderRoadmap();
        }
    );


    $("#roadmapList")?.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter" &&
                event.key !== " "
            ) {
                return;
            }

            const header =
                event.target.closest(
                    "[data-toggle-chapter]"
                );

            if (!header) {
                return;
            }

            event.preventDefault();

            header.click();
        }
    );


    $("#chapterList")?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-open-chapter]"
                );

            if (!button) {
                return;
            }

            openChapter(
                button.dataset.openChapter
            );
        }
    );


    $("#expandAll")?.addEventListener(
        "click",
        () => {

            chapters.forEach(chapter => {

                state.expandedChapters.add(
                    chapter.id
                );

            });

            renderRoadmap();
        }
    );


    $("#collapseAll")?.addEventListener(
        "click",
        () => {

            state.expandedChapters.clear();

            renderRoadmap();
        }
    );
}


/* =========================================================
   章节导航事件
   ========================================================= */

function bindNavigationEvents() {
    document.addEventListener(
        "click",
        event => {
            const button =
                event.target.closest("[data-nav-chapter]");

            if (!button) {
                return;
            }

            openChapter(
                button.dataset.navChapter
            );
        }
    );

    $("#startLearning")?.addEventListener(
        "click",
        () => {
            const chapter =
                getCurrentChapter();

            if (!chapter) {
                return;
            }

            const firstIncomplete =
                chapter.sections.find(section =>
                    !state.completedSections.has(section.id)
                );

            if (firstIncomplete) {
                openSection(
                    chapter.id,
                    firstIncomplete.id
                );
            } else {
                scrollToElement(
                    $("#course-reader"),
                    85
                );
            }
        }
    );

    $("#continueLearning")?.addEventListener(
        "click",
        () => {
            const allSections =
                getAllSections();

            const nextSection =
                allSections.find(section =>
                    !state.completedSections.has(section.id)
                );

            if (!nextSection) {
                showToast("全部学习内容已完成，恭喜你！");
                return;
            }

            openSection(
                nextSection.chapterId,
                nextSection.id
            );
        }
    );

    $("#markChapterComplete")?.addEventListener(
        "click",
        () => {
            const chapter =
                getCurrentChapter();

            if (chapter) {
                markChapterComplete(chapter);
            }
        }
    );

    $("#fontDecrease")?.addEventListener(
        "click",
        () => changeFontSize(-1)
    );

    $("#fontIncrease")?.addEventListener(
        "click",
        () => changeFontSize(1)
    );
}


/* =========================================================
   启动
   ========================================================= */

function init() {
    initializeState();

    readInitialLocation();

    bindSearch();
    bindRoadmapEvents();
    bindNavigationEvents();

    renderRoadmap();
    renderReader();

    /*
     * renderReader() 之后才绑定，
     * 因为 .lesson-title 是这里动态生成的。
     */
    bindLessonLinks();

    const hash =
        decodeURIComponent(
            location.hash.replace(/^#/, "")
        );

    if (hash) {
        requestAnimationFrame(() => {
            const target = $(
                `#lesson-${CSS.escape(hash)}`
            );

            if (target) {
                scrollToElement(target, 105);
            }
        });
    }
}

init();