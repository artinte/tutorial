/* =========================================================
   PYTHON QUICK START
   main.js
========================================================= */

import {
    COURSE_ID,
    COURSE,
    chapters
} from "./chapters.js";

import {
    escapeHTML
} from "/js/utils/html_escape.js"


/* =========================================================
   CONFIG
========================================================= */

const PYTHON_RUN_API =
    "/api/python/run";

const AI_CHAT_API =
    "/api/ai/chat";


const STORAGE_KEY =
    `tutorial-progress:${COURSE_ID}`;


/* =========================================================
   DOM
========================================================= */

const $ = (
    selector,
    root = document
) =>
    root.querySelector(selector);


const $$ = (
    selector,
    root = document
) =>
    [...root.querySelectorAll(selector)];


/* =========================================================
   STATE
========================================================= */

const state = {

    currentChapterId: null,

    currentLessonId: null,

    completedLessons:
        new Set(),

    aiHistory: [],

    runningPython: false,

    sendingAI: false
};


/* =========================================================
   INITIALIZE
========================================================= */

function initTopbarAutoHide() {

    const topbar =
        document.querySelector(
            ".topbar"
        );

    if (!topbar) {
        return;
    }

    let lastScrollY =
        window.scrollY;

    window.addEventListener(
        "scroll",
        () => {

            const currentScrollY =
                window.scrollY;


            /*
             * 页面顶部始终显示
             */

            if (currentScrollY <= 20) {

                topbar.classList.remove(
                    "topbar-hidden"
                );

                lastScrollY =
                    currentScrollY;

                return;
            }


            /*
             * 向下滚动 → 隐藏
             */

            if (
                currentScrollY >
                lastScrollY
            ) {

                topbar.classList.add(
                    "topbar-hidden"
                );

            }


            /*
             * 向上滚动 → 显示
             */

            else if (
                currentScrollY <
                lastScrollY
            ) {

                topbar.classList.remove(
                    "topbar-hidden"
                );

            }


            lastScrollY =
                currentScrollY;

        },
        {
            passive: true
        }
    );


    /*
     * 鼠标移动到顶部 → 显示
     */

    document.addEventListener(
        "mousemove",
        event => {

            if (event.clientY <= 12) {

                topbar.classList.remove(
                    "topbar-hidden"
                );

            }

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    init
);

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            $("#codeEditorModal")
                ?.classList.contains("open")
        ) {

            closeCodeEditor();
        }

    }
);

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".lesson-code-run"
            );

        if (!button) {
            return;
        }

        const block =
            button.closest(
                ".python-example"
            );

        if (!block) {
            return;
        }

        const editor =
            block.querySelector(
                ".lesson-code-editor"
            );

        const output =
            block.querySelector(
                ".lesson-code-output"
            );

        const status =
            block.querySelector(
                ".lesson-code-status"
            );

        if (!editor || !output) {
            return;
        }

        runInlinePython(
            editor.value,
            output,
            status,
            button
        );
    }
);


function init() {

    loadProgress();

    renderCourseStats();

    renderChapterNavigation();

    renderChapterGrid();

    updateProgressUI();

    bindEvents();

    initTopbarAutoHide();

    restoreRoute();
}


/* =========================================================
   EVENTS
========================================================= */

function bindEvents() {

    $("#startButton")
        ?.addEventListener(
            "click",
            startCourse
        );


    $("#finalStartButton")
        ?.addEventListener(
            "click",
            startCourse
        );


    $("#continueButton")
        ?.addEventListener(
            "click",
            continueCourse
        );


    $("#backOverviewButton")
        ?.addEventListener(
            "click",
            showOverview
        );


    $("#lessonBackButton")
        ?.addEventListener(
            "click",
            showOverview
        );


    $("#runPythonButton")
        ?.addEventListener(
            "click",
            () => {

                runPythonCode(
                    "pythonEditor",
                    "pythonOutput",
                    "runPythonButton",
                    "runnerStatus"
                );

            }
        );


    $("#clearOutputButton")
        ?.addEventListener(
            "click",
            clearPythonOutput
        );


    $("#aiTopButton")
        ?.addEventListener(
            "click",
            openAI
        );


    $("#lessonAiButton")
        ?.addEventListener(
            "click",
            openAI
        );


    $("#closeAiButton")
        ?.addEventListener(
            "click",
            closeAI
        );


    $("#sendAiButton")
        ?.addEventListener(
            "click",
            sendAIMessage
        );


    $("#aiInput")
        ?.addEventListener(
            "keydown",
            handleAIKeydown
        );

    $("#codeEditorButton")
        ?.addEventListener(
            "click",
            openCodeEditor
        );


    $("#closeCodeEditorButton")
        ?.addEventListener(
            "click",
            closeCodeEditor
        );


    $("#modalRunPythonButton")
        ?.addEventListener(
            "click",
            runModalPythonCode
        );


    window.addEventListener(
        "popstate",
        restoreRoute
    );


    bindPythonEditorShortcuts();
}


/* =========================================================
   COURSE STATS
========================================================= */

function getAllLessons() {

    return chapters.flatMap(
        chapter =>
            chapter.sections || []
    );
}


function getPracticeCount() {

    let count = 0;

    for (const chapter of chapters) {

        for (const lesson of chapter.sections || []) {

            for (const block of lesson.content || []) {

                if (block.type === "practice") {
                    count += 1;
                }

                if (block.type === "checklist") {
                    count +=
                        (block.items || []).length;
                }
            }
        }
    }

    return count;
}


function renderCourseStats() {

    const lessons =
        getAllLessons().length;

    const practices =
        getPracticeCount();


    if ($("#lessonCount")) {

        $("#lessonCount").textContent =
            lessons;
    }


    if ($("#practiceCount")) {

        $("#practiceCount").textContent =
            practices;
    }
}


/* =========================================================
   PROGRESS
========================================================= */

function loadProgress() {

    try {

        const raw =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!raw) {
            return;
        }

        const parsed =
            JSON.parse(raw);

        if (
            Array.isArray(
                parsed.completedLessons
            )
        ) {

            state.completedLessons =
                new Set(
                    parsed.completedLessons
                );
        }

    } catch (error) {

        console.warn(
            "无法读取课程进度",
            error
        );
    }
}


function saveProgress() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify({

            completedLessons:
                [...state.completedLessons],

            updatedAt:
                new Date().toISOString()

        })
    );
}


function isLessonComplete(
    lessonId
) {

    return state
        .completedLessons
        .has(lessonId);
}


function markLessonComplete(
    lessonId
) {

    state
        .completedLessons
        .add(lessonId);

    saveProgress();

    updateProgressUI();

    renderChapterNavigation();

    renderChapterGrid();
}


function getProgressPercent() {

    const total =
        getAllLessons().length;

    if (!total) {
        return 0;
    }

    return Math.round(

        state.completedLessons.size
        / total
        * 100
    );
}


function updateProgressUI() {

    const total =
        getAllLessons().length;

    const completed =
        state.completedLessons.size;

    const percent =
        getProgressPercent();


    if ($("#sidebarProgressBar")) {

        $("#sidebarProgressBar")
            .style.width =
            `${percent}%`;
    }


    if ($("#sidebarProgressText")) {

        $("#sidebarProgressText")
            .textContent =
            `${completed} / ${total}`;
    }
}


/* =========================================================
   CHAPTER NAVIGATION
========================================================= */

function renderChapterNavigation() {

    const container =
        $("#chapterNavigation");

    if (!container) {
        return;
    }


    container.innerHTML =
        chapters
            .map(
                (chapter, index) => {

                    const lessons =
                        chapter.sections || [];

                    const completed =
                        lessons.filter(
                            lesson =>
                                isLessonComplete(
                                    lesson.id
                                )
                        ).length;

                    const active =
                        state.currentChapterId ===
                        chapter.id;

                    return `

                        <button
                            class="
                                chapter-nav-item
                                ${active ? "active" : ""}
                            "
                            data-chapter-id="${escapeHTML(
                        chapter.id
                    )}"
                        >

                            <span
                                class="chapter-nav-number"
                            >
                                ${String(index + 1)
                            .padStart(2, "0")}
                            </span>

                            <span
                                class="chapter-nav-info"
                            >

                                <span
                                    class="chapter-nav-title"
                                >
                                    ${escapeHTML(
                                chapter.title
                            )}
                                </span>

                                <span
                                    class="chapter-nav-meta"
                                >
                                    ${completed}
                                    /
                                    ${lessons.length}
                                </span>

                            </span>

                            ${completed ===
                            lessons.length &&
                            lessons.length
                            ? `
                                        <span
                                            class="
                                                chapter-nav-check
                                            "
                                        >
                                            ✓
                                        </span>
                                      `
                            : ""
                        }

                        </button>
                    `;
                }
            )
            .join("");


    $$(".chapter-nav-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const chapterId =
                        button.dataset.chapterId;

                    openChapter(
                        chapterId
                    );
                }
            );
        });
}


/* =========================================================
   CHAPTER GRID
========================================================= */

function renderChapterGrid() {

    const container =
        $("#chapterGrid");

    if (!container) {
        return;
    }


    container.innerHTML =
        chapters
            .map(
                (chapter, index) => {

                    const lessons =
                        chapter.sections || [];

                    const completed =
                        lessons.filter(
                            lesson =>
                                isLessonComplete(
                                    lesson.id
                                )
                        ).length;

                    const done =
                        lessons.length > 0 &&
                        completed === lessons.length;


                    return `

                        <article
                            class="chapter-card"
                            data-chapter-id="${escapeHTML(
                        chapter.id
                    )}"
                        >

                            <div
                                class="chapter-card-top"
                            >

                                <span
                                    class="chapter-number"
                                >
                                    CHAPTER
                                    ${String(index + 1)
                            .padStart(2, "0")}
                                </span>

                                ${done
                            ? `
                                            <span
                                                class="
                                                    chapter-status
                                                "
                                            >
                                                ✓ 已完成
                                            </span>
                                          `
                            : ""
                        }

                            </div>


                            <h3>
                                ${escapeHTML(
                            chapter.title
                        )}
                            </h3>


                            ${chapter.englishTitle
                            ? `
                                        <div
                                            class="
                                                chapter-english
                                            "
                                        >
                                            ${escapeHTML(
                                chapter.englishTitle
                            )}
                                        </div>
                                      `
                            : ""
                        }


                            <p>
                                ${escapeHTML(
                            chapter.description
                        )}
                            </p>


                            <div class="chapter-meta">

                                <span>
                                    ${lessons.length}
                                    个知识点
                                </span>

                                <span>
                                    ${completed}
                                    已完成
                                </span>

                                <span>
                                    点击进入
                                </span>

                            </div>

                        </article>
                    `;
                }
            )
            .join("");


    $$(".chapter-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    console.log(
                        "========== 点击课程 =========="
                    );

                    console.log(
                        "card:",
                        card
                    );

                    console.log(
                        "data-chapter-id:",
                        card.dataset.chapterId
                    );

                    console.log(
                        "chapters:",
                        chapters
                    );


                    openChapter(
                        card.dataset.chapterId
                    );
                }
            );
        });
}


/* =========================================================
   COURSE START
========================================================= */

function startCourse() {

    const firstChapter =
        chapters[0];

    if (!firstChapter) {
        return;
    }

    const firstLesson =
        firstChapter.sections?.[0];

    if (!firstLesson) {
        return;
    }


    openLesson(
        firstChapter.id,
        firstLesson.id
    );
}


function continueCourse() {

    const lessons =
        getAllLessons();

    const next =
        lessons.find(
            lesson =>
                !isLessonComplete(
                    lesson.id
                )
        );


    if (!next) {

        showToast(
            "恭喜你，课程已经全部完成。"
        );

        return;
    }


    const chapter =
        chapters.find(
            item =>
                item.sections?.some(
                    lesson =>
                        lesson.id === next.id
                )
        );


    if (!chapter) {
        return;
    }


    openLesson(
        chapter.id,
        next.id
    );
}


/* =========================================================
   CHAPTER
========================================================= */

function openChapter(
    chapterId
) {

    const chapter =
        chapters.find(
            item =>
                item.id === chapterId
        );


    if (!chapter) {

        console.error(
            "找不到 Chapter:",
            chapterId
        );

        return;
    }


    const firstLesson =
        chapter.sections?.[0];


    if (!firstLesson) {

        console.error(
            "Chapter 没有课程:",
            chapter
        );

        return;
    }


    console.log(
        "进入 Chapter:",
        chapter.title
    );

    console.log(
        "进入第一课:",
        firstLesson.title
    );


    openLesson(
        chapter.id,
        firstLesson.id
    );
}

/* =========================================================
   LESSON
========================================================= */

function openLesson(
    chapterId,
    lessonId
) {

    const chapter =
        chapters.find(
            item =>
                item.id === chapterId
        );

    if (!chapter) {
        return;
    }


    const lesson =
        chapter.sections?.find(
            item =>
                item.id === lessonId
        );

    if (!lesson) {
        return;
    }


    state.currentChapterId =
        chapterId;

    state.currentLessonId =
        lessonId;


    updateRoute(
        chapterId,
        lessonId
    );


    $("#overviewView")
        ?.classList.add("hidden");


    $("#lessonView")
        ?.classList.remove("hidden");


    renderLesson(
        chapter,
        lesson
    );


    renderSectionNavigation(
        chapter,
        lesson
    );


    renderChapterNavigation();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   LESSON RENDER
========================================================= */

function renderLesson(
    chapter,
    lesson
) {

    const container =
        $("#lessonContent");

    if (!container) {
        return;
    }


    const chapterIndex =
        chapters.findIndex(
            item =>
                item.id === chapter.id
        );


    const lessonIndex =
        chapter.sections.findIndex(
            item =>
                item.id === lesson.id
        );


    const complete =
        isLessonComplete(
            lesson.id
        );


    container.innerHTML = `

        <header class="lesson-header">

            <div class="lesson-label">

                CHAPTER
                ${String(chapterIndex + 1)
            .padStart(2, "0")}

                ·

                LESSON
                ${String(lessonIndex + 1)
            .padStart(2, "0")}

            </div>


            <h1>
                ${escapeHTML(
                lesson.title
            )}
            </h1>


            ${lesson.intro
            ? `
                        <p
                            class="lesson-intro"
                        >
                            ${escapeHTML(
                lesson.intro
            )}
                        </p>
                      `
            : ""
        }

        </header>


        ${(lesson.content || [])
            .map(renderBlock)
            .join("")
        }

    `;

    /*
    * 初始化本课中的动画
    *
    * renderBlock()
    * 负责把 animation 的
    * HTML / CSS 渲染出来。
    *
    * initAnimations()
    * 再负责执行 animation.js。
    */
    initAnimations(
        container
    );


    renderLessonActions(
        chapter,
        lesson,
        complete
    );
}


const animationBlocks = new Map();

function initAnimations(
    container
) {

    if (!container) {
        return;
    }


    const animations =
        container.querySelectorAll(
            ".lesson-animation"
        );


    animations.forEach(
        animation => {

            if (
                animation.dataset
                    .animationInitialized === "true"
            ) {
                return;
            }


            animation.dataset
                .animationInitialized = "true";


            const animationId =
                animation.dataset.animationId;


            const button =
                animation.querySelector(
                    "[data-animation-play]"
                );


            if (!button) {
                return;
            }


            button.addEventListener(
                "click",
                () => {

                    playAnimation(
                        animationId,
                        animation,
                        button
                    );

                }
            );

        }
    );
}

function playAnimation(
    animationId,
    animation,
    button
) {

    const block =
        animationBlocks.get(
            animationId
        );

    if (!block) {
        return;
    }

    if (
        !block.js ||
        !block.js.trim()
    ) {
        return;
    }

    button.disabled = true;

    button.textContent =
        "播放中…";

    try {

        /*
         * -----------------------------------------------------
         * 重新建立动画 DOM
         *
         * 这样可以彻底清除上一次播放留下的：
         *
         * element.style.opacity
         * element.style.transform
         * element.style.transition
         * 等 inline style
         * -----------------------------------------------------
         */

        const stage =
            animation.querySelector(
                ".lesson-animation-stage"
            );

        if (!stage) {
            return;
        }

        stage.innerHTML = `

            <style>
                ${block.css || ""}
            </style>

            <div
                class="
                    lesson-animation-content
                "
            >
                ${block.html || ""}
            </div>

        `;


        /*
         * -----------------------------------------------------
         * 执行动画 JS
         * -----------------------------------------------------
         */

        const run =
            new Function(
                "animationRoot",
                block.js
            );

        run(animation);


        /*
         * -----------------------------------------------------
         * 等待动画结束
         * -----------------------------------------------------
         */

        setTimeout(
            () => {

                button.disabled =
                    false;

                button.textContent =
                    "↻ 重新播放";

            },
            block.duration || 1200
        );

    } catch (error) {

        console.error(
            "Animation error:",
            error
        );

        button.disabled =
            false;

        button.textContent =
            "▶ 播放动画";

    }
}

/* =========================================================
   CONTENT BLOCK
========================================================= */

function renderBlock(block) {
    if (!block) {
        return "";
    }

    switch (block.type) {
        case "paragraph":

            return `

                <div
                    class="content-block"
                >

                    <p>
                        ${escapeHTML(
                block.text || ""
            )}
                    </p>

                </div>

            `;

        case "heading":

            return `

                <div
                    class="content-block"
                >

                    <h3>
                        ${escapeHTML(
                block.text || ""
            )}
                    </h3>

                </div>

            `;

        case "code": {

            const code =
                block.code || "";

            const codeId =
                `python-${Math.random()
                    .toString(36)
                    .slice(2, 9)}`;

            return `

        <div
            class="
                content-block
                lesson-code
                python-example
            "
            data-python-code="${codeId}"
        >

            <div
                class="
                    lesson-code-header
                "
            >

                <span
                    class="
                        lesson-code-title
                    "
                >
                    ${escapeHTML(
                block.title ||
                "Python 示例"
            )}
                </span>

                <span
                    class="
                        lesson-code-language
                    "
                >
                    ${escapeHTML(
                block.language ||
                "python"
            )}
                </span>

            </div>


            <textarea
                class="
                    lesson-code-editor
                "
                spellcheck="false"
            >${escapeHTML(code)}</textarea>


            <div
                class="
                    lesson-code-actions
                "
            >

                <button
                    type="button"
                    class="lesson-code-run"
                    data-code-id="${codeId}"
                >
                    ▶ 运行代码
                </button>

                <span
                    class="
                        lesson-code-status
                    "
                >
                    就绪
                </span>

            </div>


            <div
                class="
                    lesson-code-result
                "
            >
                <pre
                    class="
                        lesson-code-output
                    "
                ></pre>

            </div>

        </div>

    `;
        }

        case "practice":
            return `

        <div
            class="
                content-block
                practice-block
            "
        >

            <div
                class="
                    practice-label
                "
            >
                PRACTICE
            </div>


            <h3>
                ${escapeHTML(
                block.title ||
                "练习"
            )}
            </h3>


            <p>
                ${escapeHTML(
                block.description ||
                ""
            )}
            </p>


            ${block.starterCode
                    ? `

                        <div
                            class="
                                python-example
                                practice-code-example
                            "
                        >

                            <div
                                class="
                                    lesson-code-header
                                "
                            >

                                <span
                                    class="
                                        lesson-code-title
                                    "
                                >
                                    Python
                                </span>


                                <span
                                    class="
                                        lesson-code-language
                                    "
                                >
                                    python
                                </span>

                            </div>


                            <textarea
                                class="
                                    lesson-code-editor
                                "
                                spellcheck="false"
                                autocomplete="off"
                                autocapitalize="off"
                                data-starter-code="true"
                            >${escapeHTML(
                        block.starterCode
                    )}</textarea>


                            <div
                                class="
                                    lesson-code-actions
                                "
                            >

                                <button
                                    type="button"
                                    class="
                                        lesson-code-run
                                    "
                                >
                                    运行
                                </button>


                                <span
                                    class="
                                        lesson-code-status
                                    "
                                >
                                    等待运行
                                </span>

                            </div>


                            <div
                                class="
                                    lesson-code-result
                                "
                            >

                                <pre
                                    class="
                                        lesson-code-output
                                    "
                                ></pre>

                            </div>

                        </div>

                    `
                    : ""
                }


            ${block.hint
                    ? `

                        <div
                            style="
                                margin-top:10px;
                                color:#5f7569;
                                font-size:11px;
                            "
                        >
                            提示：
                            ${escapeHTML(
                        block.hint
                    )}
                        </div>

                    `
                    : ""
                }


            ${block.difficulty
                    ? `

                        <span
                            class="
                                practice-difficulty
                            "
                        >
                            ${escapeHTML(
                        block.difficulty
                    )}
                        </span>

                    `
                    : ""
                }

        </div>

    `;

        case "thinking":

            return `

                <div
                    class="
                        content-block
                        thinking-block
                    "
                >

                    <div
                        class="
                            thinking-label
                        "
                    >
                        THINK ABOUT IT
                    </div>


                    <h3>
                        ${escapeHTML(
                block.title ||
                "想一想"
            )}
                    </h3>


                    <p>
                        ${escapeHTML(
                block.text ||
                block.description ||
                ""
            )}
                    </p>

                </div>

            `;

        case "note":
            return `

        <div
            class="
                content-block
                note-block
            "
        >

            <div
                class="
                    note-label
                "
            >
                NOTE
            </div>


            <h3>
                ${escapeHTML(
                block.title ||
                "注意"
            )}
            </h3>


            <p>
                ${escapeHTML(
                block.text ||
                block.description ||
                ""
            )}
            </p>

        </div>

    `;

        case "image":

            return `

        <figure
            class="
                content-block
                image-block
            "
        >

            <div
                class="image-visual"
                role="img"
                aria-label="${escapeHTML(
                block.alt || ""
            )}"
            >

                ${block.css
                    ? `
                            <style>
                                ${block.css}
                            </style>
                        `
                    : ""
                }

                ${block.html || ""}

            </div>

            ${block.caption
                    ? `
                        <figcaption
                            class="image-caption"
                        >
                            ${escapeHTML(
                        block.caption
                    )}
                        </figcaption>
                    `
                    : ""
                }

        </figure>

    `;

        case "attention":

            return `

                <div
                    class="
                        content-block
                        attention-block
                    "
                >

                    <div
                        class="
                            attention-label
                        "
                    >
                        ATTENTION
                    </div>


                    <h3>
                        ${escapeHTML(
                block.title ||
                "注意"
            )}
                    </h3>


                    <p>
                        ${escapeHTML(
                block.text ||
                block.description ||
                ""
            )}
                    </p>

                </div>

            `;

        case "callout":

            return `

        <div
            class="
                content-block
                callout-block
            "
        >

            <h3>
                ${escapeHTML(
                block.title ||
                "重点"
            )}
            </h3>


            <p>
                ${escapeHTML(
                block.text ||
                block.content ||
                ""
            )}
            </p>


            ${block.link
                    ? `
                        <a
                            class="callout-link"
                            href="${escapeHTML(
                        block.link.url
                    )}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ${escapeHTML(
                        block.link.content
                    )}
                            ↗
                        </a>
                    `
                    : ""
                }

        </div>

    `;

        case "concepts":

            return `

        <div
            class="
                content-block
                concepts-block
            "
        >

            ${(block.items || [])
                    .map(
                        item => `

                        <div
                            class="
                                concept-item
                            "
                        >

                            <span>
                                ${escapeHTML(
                            typeof item === "string"
                                ? item
                                : (
                                    item.term ||
                                    item.description ||
                                    item.text ||
                                    ""
                                )
                        )}
                            </span>

                        </div>

                    `
                    )
                    .join("")}

        </div>

    `;

        case "checklist":

            return `

                <div
                    class="
                        content-block
                        checklist-block
                    "
                >

                    <div
                        class="
                            checklist-title
                        "
                    >
                        ${escapeHTML(
                block.title ||
                "检查一下"
            )}
                    </div>


                    ${(block.items || [])
                    .map(
                        item => `

                                    <div
                                        class="
                                            checklist-item
                                        "
                                    >
                                        ${escapeHTML(
                            item
                        )}
                                    </div>

                                `
                    )
                    .join("")
                }

                </div>

            `;

        case "animation": {

            const animationId =
                `animation-${Math.random()
                    .toString(36)
                    .slice(2, 9)}`;


            animationBlocks.set(
                animationId,
                block
            );


            return `
        <div
            class="
                content-block
                lesson-animation
            "
            id="${animationId}"
            data-animation-id="${animationId}"
        >

            ${block.title
                    ? `
                        <div
                            class="
                                lesson-animation-header
                            "
                        >

                            <div
                                class="
                                    lesson-animation-label
                                "
                            >
                                ANIMATION
                            </div>

                            <h3>
                                ${escapeHTML(
                        block.title
                    )}
                            </h3>

                        </div>
                    `
                    : ""
                }


            <div
                class="
                    lesson-animation-stage
                "
            >

                <style>
                    ${block.css || ""}
                </style>


                <div
                    class="
                        lesson-animation-content
                    "
                >
                    ${block.html || ""}
                </div>

            </div>


            <div
                class="
                    lesson-animation-actions
                "
            >

                <button
                    type="button"
                    class="lesson-animation-play"
                    data-animation-play="${animationId}"
                >
                    ▶ 播放动画
                </button>

            </div>

        </div>
    `;
        }

        default:
            return "";
    }
}


/* =========================================================
   LESSON ACTIONS
========================================================= */

function renderLessonActions(
    chapter,
    lesson,
    complete
) {

    const container =
        $("#lessonActions");

    if (!container) {
        return;
    }


    const chapterIndex =
        chapters.findIndex(
            item =>
                item.id === chapter.id
        );


    const lessonIndex =
        chapter.sections.findIndex(
            item =>
                item.id === lesson.id
        );


    const next =
        getNextLesson(
            chapterIndex,
            lessonIndex
        );


    const previous =
        getPreviousLesson(
            chapterIndex,
            lessonIndex
        );


    container.innerHTML = `

        <div
            class="
                lesson-action-left
            "
        >

            ${previous
            ? `
                        <button
                            class="
                                lesson-action-button
                            "
                            data-action="previous"
                        >
                            ← 上一课
                        </button>
                      `
            : ""
        }


            <button
                class="
                    lesson-action-button
                "
                data-action="overview"
            >
                大纲
            </button>

        </div>


        <div>

            ${!complete
            ? `
                        <button
                            class="
                                lesson-action-button
                                primary
                            "
                            data-action="complete"
                        >
                            ✓ 标记完成
                        </button>
                      `
            : ""
        }


            ${next
            ? `
                        <button
                            class="
                                lesson-action-button
                                primary
                            "
                            data-action="next"
                        >
                            下一课 →
                        </button>
                      `
            : `
                        <button
                            class="
                                lesson-action-button
                                primary
                            "
                            data-action="finish"
                        >
                            完成课程
                        </button>
                      `
        }

        </div>

    `;


    container
        .querySelector(
            '[data-action="complete"]'
        )
        ?.addEventListener(
            "click",
            () => {

                markLessonComplete(
                    lesson.id
                );

                renderLesson(
                    chapter,
                    lesson
                );

                showToast(
                    "已记录学习进度"
                );
            }
        );


    container
        .querySelector(
            '[data-action="next"]'
        )
        ?.addEventListener(
            "click",
            () => {

                markLessonComplete(
                    lesson.id
                );

                openLesson(
                    next.chapter.id,
                    next.lesson.id
                );
            }
        );


    container
        .querySelector(
            '[data-action="previous"]'
        )
        ?.addEventListener(
            "click",
            () => {

                openLesson(
                    previous.chapter.id,
                    previous.lesson.id
                );
            }
        );


    container
        .querySelector(
            '[data-action="overview"]'
        )
        ?.addEventListener(
            "click",
            showOverview
        );


    container
        .querySelector(
            '[data-action="finish"]'
        )
        ?.addEventListener(
            "click",
            () => {

                markLessonComplete(
                    lesson.id
                );

                showToast(
                    "恭喜你完成了 Python 快速入门！"
                );

                showOverview();
            }
        );
}


/* =========================================================
   NEXT / PREVIOUS
========================================================= */

function getNextLesson(
    chapterIndex,
    lessonIndex
) {

    const chapter =
        chapters[chapterIndex];

    if (!chapter) {
        return null;
    }


    if (
        lessonIndex + 1 <
        chapter.sections.length
    ) {

        return {

            chapter,

            lesson:
                chapter.sections[
                lessonIndex + 1
                ]
        };
    }


    const nextChapter =
        chapters[
        chapterIndex + 1
        ];


    if (
        nextChapter &&
        nextChapter.sections?.length
    ) {

        return {

            chapter: nextChapter,

            lesson:
                nextChapter.sections[0]
        };
    }


    return null;
}


function getPreviousLesson(
    chapterIndex,
    lessonIndex
) {

    const chapter =
        chapters[chapterIndex];

    if (!chapter) {
        return null;
    }


    if (lessonIndex > 0) {

        return {

            chapter,

            lesson:
                chapter.sections[
                lessonIndex - 1
                ]
        };
    }


    const previousChapter =
        chapters[
        chapterIndex - 1
        ];


    if (
        previousChapter &&
        previousChapter.sections?.length
    ) {

        return {

            chapter: previousChapter,

            lesson:
                previousChapter.sections[
                previousChapter.sections.length - 1
                ]
        };
    }


    return null;
}


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function renderSectionNavigation(
    chapter,
    currentLesson
) {

    const container =
        $("#sectionNavigation");

    if (!container) {
        return;
    }


    $("#asideChapterTitle")
        .textContent =
        chapter.title;


    container.innerHTML =
        chapter.sections
            .map(
                (lesson, index) => `

                    <button
                        class="
                            section-nav-item
                            ${lesson.id ===
                        currentLesson.id
                        ? "current"
                        : ""
                    }
                        "
                        data-lesson-id="${escapeHTML(
                        lesson.id
                    )}"
                    >

                        ${String(index + 1)
                        .padStart(2, "0")}

                        ·

                        ${escapeHTML(
                            lesson.title
                        )}

                    </button>

                `
            )
            .join("");


    $$(".section-nav-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openLesson(
                        chapter.id,
                        button.dataset.lessonId
                    );
                }
            );
        });
}


/* =========================================================
   OVERVIEW
========================================================= */

function showOverview() {

    state.currentLessonId =
        null;


    $("#lessonView")
        ?.classList.add("hidden");


    $("#overviewView")
        ?.classList.remove("hidden");


    updateRoute(
        state.currentChapterId,
        null
    );


    renderChapterNavigation();

    renderChapterGrid();

    updateProgressUI();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   ROUTING
========================================================= */

function updateRoute(
    chapterId,
    lessonId
) {

    const url =
        new URL(
            window.location.href
        );


    url.searchParams.delete(
        "chapter"
    );

    url.searchParams.delete(
        "lesson"
    );


    if (chapterId) {

        url.searchParams.set(
            "chapter",
            chapterId
        );
    }


    if (lessonId) {

        url.searchParams.set(
            "lesson",
            lessonId
        );
    }


    window.history.pushState(
        {},
        "",
        url
    );
}


function restoreRoute() {

    const url =
        new URL(
            window.location.href
        );


    const chapterId =
        url.searchParams.get(
            "chapter"
        );


    const lessonId =
        url.searchParams.get(
            "lesson"
        );


    if (
        chapterId &&
        lessonId
    ) {

        openLesson(
            chapterId,
            lessonId
        );

        return;
    }


    if (chapterId) {

        state.currentChapterId =
            chapterId;

        renderChapterNavigation();

        showOverview();

        return;
    }


    showOverview();
}


/* =========================================================
   PYTHON RUNNER
========================================================= */

async function runPythonCode(
    editorId = "pythonEditor",
    outputId = "pythonOutput",
    buttonId = "runPythonButton",
    statusId = "runnerStatus"
) {

    if (state.runningPython) {
        return;
    }


    const editor =
        $(`#${editorId}`);

    const output =
        $(`#${outputId}`);

    const status =
        $(`#${statusId}`);

    const button =
        $(`#${buttonId}`);


    if (!editor || !output) {
        return;
    }


    const code =
        editor.value.trim();


    if (!code) {

        output.textContent =
            "请输入 Python 代码。";

        return;
    }


    state.runningPython =
        true;


    if (button) {

        button.disabled =
            true;

        button.innerHTML =
            "运行中...";
    }


    if (status) {

        status.textContent =
            "正在调用 Python Server...";
    }


    output.textContent =
        "正在执行 Python...\n";


    try {

        const response =
            await fetch(
                PYTHON_RUN_API,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            code

                        })
                }
            );


        // =================================================
        // 读取服务器返回
        // =================================================

        const data =
            await response.json()
                .catch(
                    () => ({})
                );


        // =================================================
        // 400
        // =================================================

        if (response.status === 400) {

            const errorMessage =
                data.error ||
                data.detail ||
                data.message ||
                "代码无法执行。";


            output.textContent =
                errorMessage;


            if (status) {

                status.textContent =
                    "代码未通过安全检查";
            }


            return;
        }


        // =================================================
        // 其他 HTTP 错误
        // =================================================

        if (!response.ok) {

            const errorMessage =
                data.error ||
                data.detail ||
                data.message ||
                `服务器错误 (${response.status})`;


            console.error(
                "Python server error:",
                response.status,
                data
            );


            output.textContent =
                `无法连接 Python Server。

${errorMessage}`;


            if (status) {

                status.textContent =
                    "Python Server 异常";
            }


            return;
        }


        // =================================================
        // 正常返回
        // =================================================

        const stdout =
            data.stdout ??
            data.output ??
            "";


        const stderr =
            data.stderr ??
            data.error ??
            "";


        let result = "";


        // =================================================
        // 标准输出
        // =================================================

        if (stdout) {

            result += stdout;
        }


        // =================================================
        // Python 错误输出
        // =================================================

        if (stderr) {

            if (result) {

                result += "\n";
            }

            result += stderr;
        }


        // =================================================
        // Python 执行失败
        // =================================================

        if (
            data.success === false &&
            !result
        ) {

            result =
                data.error ||
                "Python 程序执行失败。";
        }


        // =================================================
        // 最终输出
        // =================================================

        output.textContent =
            result ||
            "Python 执行完成，但没有输出。";


        // =================================================
        // 状态
        // =================================================

        if (status) {

            if (data.success === false) {

                status.textContent =
                    "运行失败";

            } else {

                status.textContent =
                    "运行完成";
            }
        }


    } catch (error) {

        console.error(
            "Python runner error:",
            error
        );


        output.textContent =
            `无法连接 Python Server。

${error.message || "服务器连接失败。"}`;


        if (status) {

            status.textContent =
                "Python Server 尚未连接";
        }


    } finally {

        state.runningPython =
            false;


        if (button) {

            button.disabled =
                false;

            button.innerHTML =
                "<span>▶</span> 运行代码";
        }
    }
}


async function runInlinePython(
    code,
    output,
    status,
    button
) {

    if (!code.trim()) {

        output.textContent =
            "请输入 Python 代码。";

        if (status) {
            status.textContent =
                "没有代码";
        }

        return;
    }


    if (button.disabled) {
        return;
    }


    /*
     * 开始运行
     */

    button.disabled = true;

    button.textContent =
        "运行中...";


    if (status) {

        status.textContent =
            "运行中...";
    }


    output.textContent =
        "正在运行...";


    try {

        const response =
            await fetch(
                PYTHON_RUN_API,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            code
                        })
                }
            );


        const data =
            await response.json()
                .catch(
                    () => ({})
                );


        /*
         * 安全检查失败
         */

        if (
            response.status === 400
        ) {

            output.textContent =
                data.error ||
                data.detail ||
                "代码无法执行。";

            if (status) {

                status.textContent =
                    "代码检查失败";
            }

            return;
        }


        /*
         * Server 错误
         */

        if (!response.ok) {

            output.textContent =
                data.error ||
                data.detail ||
                `Python Server 错误（${response.status}）。`;

            if (status) {

                status.textContent =
                    "运行失败";
            }

            return;
        }


        /*
         * 标准输出
         */

        const stdout =
            data.stdout ??
            data.output ??
            "";


        /*
         * 错误输出
         */

        const stderr =
            data.stderr ??
            data.error ??
            "";


        let result =
            stdout;


        if (stderr) {

            if (result) {
                result += "\n";
            }

            result += stderr;
        }


        /*
         * 显示结果
         */

        output.textContent =
            result ||
            "程序运行完成，没有输出。";


        /*
         * 更新状态
         */

        if (status) {

            status.textContent =
                data.success === false
                    ? "运行失败"
                    : "运行完成";
        }


    } catch (error) {

        console.error(
            "Inline Python runner error:",
            error
        );


        output.textContent =
            "无法连接 Python Server。\n\n" +
            (
                error.message ||
                "服务器连接失败。"
            );


        if (status) {

            status.textContent =
                "服务器未连接";
        }


    } finally {

        /*
         * 恢复按钮
         */

        button.disabled =
            false;

        button.textContent =
            "▶ 运行代码";

    }
}


function clearPythonOutput() {

    const output =
        $("#pythonOutput");

    if (output) {

        output.textContent =
            "输出已清空。";
    }


    const status =
        $("#runnerStatus");

    if (status) {

        status.textContent =
            "准备就绪";
    }
}


/* =========================================================
   PYTHON EDITOR SHORTCUTS
========================================================= */

function bindPythonEditorShortcuts() {

    const editor =
        $("#pythonEditor");

    if (!editor) {
        return;
    }


    editor.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Tab"
            ) {

                event.preventDefault();


                const start =
                    editor.selectionStart;

                const end =
                    editor.selectionEnd;


                editor.value =
                    editor.value.substring(
                        0,
                        start
                    ) +
                    "    " +
                    editor.value.substring(
                        end
                    );


                editor.selectionStart =
                    editor.selectionEnd =
                    start + 4;
            }


            if (
                event.ctrlKey &&
                event.key === "Enter"
            ) {

                event.preventDefault();

                runPythonCode(
                    "pythonEditor",
                    "pythonOutput",
                    "runPythonButton",
                    "runnerStatus"
                );
            }
        }
    );
}


/* =========================================================
   AI
========================================================= */

function openAI() {

    $("#aiPanel")
        ?.classList.add("open");


    setTimeout(
        () => {

            $("#aiInput")
                ?.focus();

        },
        100
    );
}


function closeAI() {

    $("#aiPanel")
        ?.classList.remove("open");
}


function handleAIKeydown(
    event
) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendAIMessage();
    }
}


async function sendAIMessage() {

    if (state.sendingAI) {
        return;
    }


    const input =
        $("#aiInput");

    if (!input) {
        return;
    }


    const message =
        input.value.trim();


    if (!message) {
        return;
    }


    appendAIMessage(
        "user",
        message
    );


    input.value = "";


    state.aiHistory.push({

        role: "user",

        content: message

    });


    state.sendingAI =
        true;


    const loading =
        appendAIMessage(
            "assistant",
            "正在思考..."
        );


    try {

        const context =
            buildAIContext();


        const response =
            await fetch(
                AI_CHAT_API,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            message,

                            history:
                                state.aiHistory,

                            context

                        })
                }
            );


        const data =
            await response.json()
                .catch(
                    () => ({})
                );


        if (!response.ok) {

            throw new Error(

                data.detail ||
                data.message ||
                `AI 服务错误 (${response.status})`
            );
        }


        const reply =
            data.reply ??
            data.content ??
            data.message ??
            "";


        if (!reply) {

            throw new Error(
                "AI 服务没有返回内容。"
            );
        }


        updateAIMessage(
            loading,
            reply
        );


        state.aiHistory.push({

            role: "assistant",

            content: reply

        });


    } catch (error) {

        console.error(
            "AI error:",
            error
        );


        updateAIMessage(

            loading,

            `AI 服务当前还没有连接。

你可以先继续学习。

当前前端已经预留接口：

POST ${AI_CHAT_API}

后续接入 DeepSeek、豆包、ChatGPT 或 Claude 都可以。`
        );


    } finally {

        state.sendingAI =
            false;
    }
}


function buildAIContext() {

    const chapter =
        chapters.find(
            item =>
                item.id ===
                state.currentChapterId
        );


    const lesson =
        chapter?.sections?.find(
            item =>
                item.id ===
                state.currentLessonId
        );


    return {

        courseId:
            COURSE_ID,

        courseTitle:
            COURSE.title,

        chapter:
            chapter
                ? {
                    id:
                        chapter.id,

                    title:
                        chapter.title
                }
                : null,

        lesson:
            lesson
                ? {
                    id:
                        lesson.id,

                    title:
                        lesson.title,

                    intro:
                        lesson.intro || ""
                }
                : null
    };
}


function appendAIMessage(
    role,
    text
) {

    const container =
        $("#aiMessages");

    if (!container) {
        return null;
    }


    const message =
        document.createElement(
            "div"
        );


    message.className =
        `ai-message ${role}`;


    message.innerHTML = `

        ${role === "assistant"
            ? `
                    <div
                        class="message-avatar"
                    >
                        AI
                    </div>
                  `
            : ""
        }


        <div
            class="message-bubble"
        >
            ${escapeHTML(text)}
        </div>

    `;


    container.appendChild(
        message
    );


    container.scrollTop =
        container.scrollHeight;


    return message;
}


function updateAIMessage(
    element,
    text
) {

    if (!element) {
        return;
    }


    const bubble =
        element.querySelector(
            ".message-bubble"
        );


    if (!bubble) {
        return;
    }


    bubble.textContent =
        text;


    const container =
        $("#aiMessages");


    if (container) {

        container.scrollTop =
            container.scrollHeight;
    }
}

/* =========================================================
   CODE EDITOR MODAL
========================================================= */

function openCodeEditor() {

    const modal =
        $("#codeEditorModal");

    const modalEditor =
        $("#modalPythonEditor");

    const editor =
        $("#pythonEditor");

    if (!modal || !modalEditor) {
        return;
    }


    if (editor) {

        modalEditor.value =
            editor.value;
    }


    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    setTimeout(
        () => {
            modalEditor.focus();
        },
        50
    );
}


function closeCodeEditor() {

    const modal =
        $("#codeEditorModal");

    const modalEditor =
        $("#modalPythonEditor");

    const editor =
        $("#pythonEditor");

    if (!modal) {
        return;
    }


    if (
        modalEditor &&
        editor
    ) {

        editor.value =
            modalEditor.value;
    }


    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );
}


function runModalPythonCode() {
    console.log("runModalPythonCode 被调用");
    runPythonCode(
        "modalPythonEditor",
        "modalPythonOutput",
        "modalRunPythonButton",
        "modalPythonStatus"
    );
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(
    message
) {

    const toast =
        $("#toast");

    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );
}
