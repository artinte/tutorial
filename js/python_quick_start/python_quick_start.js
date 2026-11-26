/* =========================================================
   PYTHON QUICK START
   python_quick_start.js
   ---------------------------------------------------------
   页面职责（只保留本课程独有的部分）：

   1. 课程首页：主视觉、Hero 统计、章节卡片
   2. Python 在线运行：调用 /api/python/run
   3. Python 学习助手：调用 /api/ai/chat
   4. 在线编辑器弹窗
   5. 路由：?chapter=…&lesson=…

   以下能力已经抽到共享模块，两门课共用：

       js/shared/content_blocks.js     内容构造器
       js/shared/content_renderer.js   正文渲染与交互
       js/shared/course_reader.js      目录 / 编号 / 进度 / 上下节

   因此这里不再包含任何 renderBlock 之类的内容渲染代码。
========================================================= */

import {
    COURSE_ID,
    COURSE,
    chapters
} from "./chapters.js";

import {
    escapeHTML
} from "../utils/html_escape.js";

import {
    createCourseReader
} from "../shared/course_reader.js";

import {
    initContentInteractions
} from "../shared/content_renderer.js";


/* =========================================================
   配置
   ========================================================= */

const PYTHON_RUN_API = "/api/python/run";

const AI_CHAT_API = "/api/ai/chat";


/* =========================================================
   DOM
   ========================================================= */

const $ = (selector, root = document) =>
    root.querySelector(selector);

const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];


/* =========================================================
   状态
========================================================= */

const state = {
    currentChapterId: null,
    currentLessonId: null,
    runningPython: false,
    sendingAI: false
};


let reader = null;


/* =========================================================
   启动
========================================================= */

document.addEventListener("DOMContentLoaded", init);

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        $("#codeEditorModal")?.classList.contains("open")
    ) {
        closeCodeEditor();
    }
});


function init() {

    renderCourseStats();

    createReader();

    renderChapterGrid();

    bindEvents();

    /*
     * 正文里的「运行代码 / 复制 / 播放动画」统一由共享模块代理，
     * 重新渲染小节不需要重新绑定。
     */

    initContentInteractions(
        $("#lessonContent"),
        {
            onRunCode: (code, target) => {
                runInlinePython(
                    code,
                    target.output,
                    target.status,
                    target.button
                );
            }
        }
    );

    restoreRoute();

    /*
     * 浏览器控制台调试接口。
     */

    window.PythonQuickStart = {
        reader,
        course: COURSE,
        chapters,
        stats: getCourseStats()
    };
}


/* =========================================================
   阅读器
========================================================= */

function createReader() {

    reader = createCourseReader({

        course: {
            id: COURSE_ID,
            title: COURSE.title,
            chapters
        },

        tocMount: $("#chapterNavigation"),

        articleMount: $("#lessonContent"),

        navMount: $("#lessonActions"),

        labels: {
            tocTitle: "Python 快速入门 · 课程目录",
            previous: "上一节",
            next: "下一节",
            complete: "标记完成",
            completed: "已完成"
        },

        /*
         * 无论是点击「课程目录」「上一节 / 下一节」，
         * 还是通过路由恢复，最终都会进入这里。
         * 因此视图切换与地址栏更新只需要写一份。
         */

        onOpen: ({ chapter, section }) => {

            state.currentChapterId = chapter.id;
            state.currentLessonId = section.id;

            $("#overviewView")?.classList.add("hidden");

            $("#lessonView")?.classList.remove("hidden");

            updateRoute(chapter.id, section.id);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },

        onProgress: ({ completed, total, percent }) => {

            if ($("#sidebarProgressText")) {
                $("#sidebarProgressText").textContent =
                    `${completed} / ${total}`;
            }

            if ($("#sidebarProgressBar")) {
                $("#sidebarProgressBar").style.width =
                    `${percent}%`;
            }

            renderChapterGrid();
        }
    });
}


/* =========================================================
   课程统计（Hero）
========================================================= */

function getFlatSections() {
    return chapters.flatMap(
        chapter => chapter.sections || []
    );
}


function getPracticeCount() {

    let count = 0;

    for (const chapter of chapters) {
        for (const section of chapter.sections || []) {
            for (const block of section.content || []) {
                if (block.type === "practice") {
                    count += 1;
                }

                if (block.type === "checklist") {
                    count += (block.items || []).length;
                }
            }
        }
    }

    return count;
}


function getCourseStats() {
    return {
        chapters: chapters.length,
        sections: getFlatSections().length,
        practices: getPracticeCount()
    };
}


function renderCourseStats() {

    const stats = getCourseStats();

    if ($("#lessonCount")) {
        $("#lessonCount").textContent = stats.sections;
    }

    if ($("#practiceCount")) {
        $("#practiceCount").textContent = stats.practices;
    }
}


/* =========================================================
   章节卡片（课程首页）
========================================================= */

function renderChapterGrid() {

    const container = $("#chapterGrid");

    if (!container) {
        return;
    }

    container.innerHTML = chapters.map((chapter, index) => {

        const stats = reader
            ? reader.getChapterStats(chapter)
            : { total: (chapter.sections || []).length, completed: 0 };

        const done =
            stats.total > 0 && stats.completed === stats.total;

        return `
            <article
                class="chapter-card"
                data-chapter-id="${escapeHTML(chapter.id)}"
            >

                <div class="chapter-card-top">

                    <span class="chapter-number">
                        CHAPTER ${String(index + 1).padStart(2, "0")}
                    </span>

                    ${done
                ? `
                                <span class="chapter-status">
                                    ✓ 已完成
                                </span>
                            `
                : ""
            }

                </div>


                <h3>
                    ${escapeHTML(chapter.title)}
                </h3>


                ${chapter.englishTitle
                ? `
                            <div class="chapter-english">
                                ${escapeHTML(chapter.englishTitle)}
                            </div>
                        `
                : ""
            }


                <p>
                    ${escapeHTML(chapter.description || "")}
                </p>


                <div class="chapter-meta">

                    <span>${stats.total} 个知识点</span>

                    <span>${stats.completed} 已完成</span>

                    <span>点击进入</span>

                </div>

            </article>
        `;
    }).join("");


    $$(".chapter-card", container).forEach(card => {

        card.addEventListener("click", () => {
            openChapter(card.dataset.chapterId);
        });
    });
}


/* =========================================================
   打开章节 / 小节
========================================================= */

function openChapter(chapterId) {

    const chapter = chapters.find(
        item => item.id === chapterId
    );

    const firstSection = chapter?.sections?.[0];

    if (!firstSection) {
        console.warn("[Python] 章节没有小节：", chapterId);
        return;
    }

    openLesson(chapter.id, firstSection.id);
}


function openLesson(chapterId, lessonId) {

    /*
     * 视图切换、路由、滚动都在阅读器的 onOpen 回调里完成，
     * 因此这里只负责交给阅读器渲染，
     * 目录点击和上下节点击会走同一条路径。
     */

    reader.open(chapterId, lessonId);
}


function showOverview() {

    state.currentLessonId = null;

    $("#lessonView")?.classList.add("hidden");

    $("#overviewView")?.classList.remove("hidden");

    if (state.currentChapterId) {
        reader.setActiveChapter(state.currentChapterId);
    } else {
        reader.clearActive();
    }

    updateRoute(state.currentChapterId, null);

    renderChapterGrid();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function startCourse() {

    const first = reader.getFlatSections()[0];

    if (!first) {
        return;
    }

    openLesson(first.chapter.id, first.section.id);
}


function continueCourse() {

    const next = reader
        .getFlatSections()
        .find(item => !reader.isCompleted(item.section.id));

    if (!next) {
        showToast("恭喜你，课程已经全部完成。");
        return;
    }

    openLesson(next.chapter.id, next.section.id);
}


/* =========================================================
   路由
========================================================= */

function buildRouteUrl(chapterId, lessonId) {

    const url = new URL(window.location.href);

    url.searchParams.delete("chapter");
    url.searchParams.delete("lesson");

    if (chapterId) {
        url.searchParams.set("chapter", chapterId);
    }

    if (lessonId) {
        url.searchParams.set("lesson", lessonId);
    }

    return url;
}


function updateRoute(chapterId, lessonId) {

    const url = buildRouteUrl(chapterId, lessonId);

    if (url.href === window.location.href) {
        return;
    }

    window.history.pushState({}, "", url);
}


function restoreRoute() {

    const params = new URLSearchParams(window.location.search);

    const chapterId = params.get("chapter");

    const lessonId = params.get("lesson");


    if (chapterId && lessonId) {
        openLesson(chapterId, lessonId);
        return;
    }


    if (chapterId) {

        const exists = chapters.some(
            chapter => chapter.id === chapterId
        );

        if (exists) {
            state.currentChapterId = chapterId;
            reader.setActiveChapter(chapterId);
        }
    }


    showOverview();
}


/* =========================================================
   事件
========================================================= */

function bindEvents() {

    $("#startButton")?.addEventListener("click", startCourse);

    $("#finalStartButton")?.addEventListener("click", startCourse);

    $("#continueButton")?.addEventListener("click", continueCourse);

    $("#backOverviewButton")?.addEventListener("click", showOverview);

    $("#lessonBackButton")?.addEventListener("click", showOverview);


    /* ------------------- Python 运行 ------------------- */

    $("#runPythonButton")?.addEventListener("click", () => {
        runPythonCode(
            "pythonEditor",
            "pythonOutput",
            "runPythonButton",
            "runnerStatus"
        );
    });

    $("#clearOutputButton")?.addEventListener(
        "click",
        clearPythonOutput
    );

    bindPythonEditorShortcuts();


    /* ------------------- 学习助手 ------------------- */

    $("#aiTopButton")?.addEventListener("click", openAI);

    $("#closeAiButton")?.addEventListener("click", closeAI);

    $("#sendAiButton")?.addEventListener("click", sendAIMessage);

    $("#aiInput")?.addEventListener("keydown", handleAIKeydown);


    /* ------------------- 在线编辑器 ------------------- */

    $("#codeEditorButton")?.addEventListener("click", openCodeEditor);

    $("#closeCodeEditorButton")?.addEventListener(
        "click",
        closeCodeEditor
    );

    $("#modalRunPythonButton")?.addEventListener(
        "click",
        runModalPythonCode
    );

    bindModalEditorGutter();


    window.addEventListener("popstate", restoreRoute);
}


/* =========================================================
   Python 运行
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

    const editor = $(`#${editorId}`);
    const output = $(`#${outputId}`);
    const status = $(`#${statusId}`);
    const button = $(`#${buttonId}`);

    if (!editor || !output) {
        return;
    }

    const code = editor.value.trim();

    if (!code) {
        output.textContent = "请输入 Python 代码。";
        return;
    }

    state.runningPython = true;

    if (button) {
        button.disabled = true;
        button.innerHTML = "运行中...";
    }

    if (status) {
        status.textContent = "正在调用 Python Server...";
    }

    try {

        const response = await fetch(PYTHON_RUN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 400) {

            output.textContent =
                data.error ||
                data.detail ||
                data.message ||
                "代码无法执行。";

            if (status) {
                status.textContent = "代码未通过安全检查";
            }

            return;
        }

        if (!response.ok) {

            console.error(
                "Python server error:",
                response.status,
                data
            );

            output.textContent =
                `无法连接 Python Server。\n\n${data.error ||
                data.detail ||
                data.message ||
                `服务器错误 (${response.status})`
                }`;

            if (status) {
                status.textContent = "Python Server 异常";
            }

            return;
        }

        const stdout = data.stdout ?? data.output ?? "";
        const stderr = data.stderr ?? data.error ?? "";

        let result = "";

        if (stdout) {
            result += stdout;
        }

        if (stderr) {
            if (result) {
                result += "\n";
            }

            result += stderr;
        }

        if (data.success === false && !result) {
            result = data.error || "Python 程序执行失败。";
        }

        output.textContent =
            result || "Python 执行完成，但没有输出。";

        if (status) {
            status.textContent =
                data.success === false
                    ? "运行失败"
                    : "运行完成";
        }

    } catch (error) {

        console.error("Python runner error:", error);

        output.textContent =
            `无法连接 Python Server。\n\n${error.message || "服务器连接失败。"
            }`;

        if (status) {
            status.textContent = "Python Server 尚未连接";
        }

    } finally {

        state.runningPython = false;

        if (button) {
            button.disabled = false;
            button.innerHTML = "<span>▶</span> 运行代码";
        }
    }
}


async function runInlinePython(code, output, status, button) {

    if (!code.trim()) {

        output.textContent = "请输入 Python 代码。";

        if (status) {
            status.textContent = "没有代码";
        }

        return;
    }

    if (button?.disabled) {
        return;
    }

    /*
     * 记住按钮原来的文案，跑完原样还原。
     * 练习里是「▶ 运行」，普通代码块是「▶ 运行代码」，
     * 不能统一写死成其中一个，否则点一次文案就变了。
     */

    const originalLabel = button ? button.innerHTML : "";

    if (button) {
        button.disabled = true;
        button.textContent = "运行中...";
    }

    if (status) {
        status.textContent = "运行中...";
    }

    output.hidden = false;
    output.textContent = "正在运行...";

    try {

        const response = await fetch(PYTHON_RUN_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 400) {

            output.textContent =
                data.error ||
                data.detail ||
                "代码无法执行。";

            if (status) {
                status.textContent = "代码检查失败";
            }

            return;
        }

        if (!response.ok) {

            output.textContent =
                data.error ||
                data.detail ||
                `Python Server 错误（${response.status}）。`;

            if (status) {
                status.textContent = "运行失败";
            }

            return;
        }

        const stdout = data.stdout ?? data.output ?? "";
        const stderr = data.stderr ?? data.error ?? "";

        let result = stdout;

        if (stderr) {
            if (result) {
                result += "\n";
            }

            result += stderr;
        }

        output.textContent =
            result || "程序运行完成，没有输出。";

        if (status) {
            status.textContent =
                data.success === false
                    ? "运行失败"
                    : "运行完成";
        }

    } catch (error) {

        console.error("Inline Python runner error:", error);

        output.textContent =
            "无法连接 Python Server。\n\n" +
            (error.message || "服务器连接失败。");

        if (status) {
            status.textContent = "服务器未连接";
        }

    } finally {

        if (button) {
            button.disabled = false;

            /*
             * 还原成点击前的文案，而不是写死一个字符串，
             * 否则「▶ 运行」会变成「▶ 运行代码」。
             */

            if (originalLabel) {
                button.innerHTML = originalLabel;
            } else {
                button.textContent = "▶ 运行";
            }
        }
    }
}


function clearPythonOutput() {

    const output = $("#pythonOutput");

    if (output) {
        output.textContent = "输出已清空。";
    }

    const status = $("#runnerStatus");

    if (status) {
        status.textContent = "准备就绪";
    }
}


function bindPythonEditorShortcuts() {

    const editor = $("#pythonEditor");

    if (!editor) {
        return;
    }

    editor.addEventListener("keydown", event => {

        if (event.key === "Tab") {

            event.preventDefault();

            const start = editor.selectionStart;
            const end = editor.selectionEnd;

            editor.value =
                editor.value.substring(0, start) +
                "    " +
                editor.value.substring(end);

            editor.selectionStart =
                editor.selectionEnd =
                start + 4;
        }

        if (event.ctrlKey && event.key === "Enter") {

            event.preventDefault();

            runPythonCode(
                "pythonEditor",
                "pythonOutput",
                "runPythonButton",
                "runnerStatus"
            );
        }
    });
}


/* =========================================================
   学习助手
========================================================= */

function openAI() {

    $("#aiPanel")?.classList.add("open");

    setTimeout(() => {
        $("#aiInput")?.focus();
    }, 100);
}


function closeAI() {

    $("#aiPanel")?.classList.remove("open");
}


function handleAIKeydown(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendAIMessage();
    }
}


async function sendAIMessage() {

    if (state.sendingAI) {
        return;
    }

    const input = $("#aiInput");

    if (!input) {
        return;
    }

    const message = input.value.trim();

    if (!message) {
        return;
    }

    appendAIMessage("user", message);

    input.value = "";

    state.sendingAI = true;

    const loading = appendAIMessage("assistant", "正在思考...");

    try {

        const context = buildAIContext();

        const lessonContext =
            [context.chapter?.title, context.lesson?.title]
                .filter(Boolean)
                .join(" / ");

        const prompt = [
            "请用简体中文简短回答，先给结论，通常不超过100字；需要代码时只给最小示例。",
            lessonContext ? `课程：${lessonContext}` : "",
            `问题：${message}`
        ]
            .filter(Boolean)
            .join("\n");

        const response = await fetch(AI_CHAT_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                mode: "chat",
                stream: false
            })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(
                data.error ||
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
            throw new Error("AI 服务没有返回内容。");
        }

        updateAIMessage(loading, reply);

    } catch (error) {

        console.error("AI error:", error);

        updateAIMessage(
            loading,
            `AI 暂时无法回答：${error.message || "请稍后重试。"}`
        );

    } finally {

        state.sendingAI = false;
    }
}


function buildAIContext() {

    const chapter = chapters.find(
        item => item.id === state.currentChapterId
    );

    const section = chapter?.sections?.find(
        item => item.id === state.currentLessonId
    );

    return {
        courseId: COURSE_ID,
        courseTitle: COURSE.title,
        chapter: chapter
            ? { id: chapter.id, title: chapter.title }
            : null,
        lesson: section
            ? {
                id: section.id,
                title: section.title,
                intro: section.description || section.intro || ""
            }
            : null
    };
}


function appendAIMessage(role, text) {

    const container = $("#aiMessages");

    if (!container) {
        return null;
    }

    const message = document.createElement("div");

    message.className = `ai-message ${role}`;

    message.innerHTML = `
        ${role === "assistant"
            ? `<div class="message-avatar">AI</div>`
            : ""
        }

        <div class="message-bubble">
            ${escapeHTML(text)}
        </div>
    `;

    container.appendChild(message);

    container.scrollTop = container.scrollHeight;

    return message;
}


function updateAIMessage(element, text) {

    if (!element) {
        return;
    }

    const bubble = element.querySelector(".message-bubble");

    if (!bubble) {
        return;
    }

    bubble.textContent = text;

    const container = $("#aiMessages");

    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}


/* =========================================================
   在线编辑器
========================================================= */

function openCodeEditor() {

    const modal = $("#codeEditorModal");
    const modalEditor = $("#modalPythonEditor");
    const editor = $("#pythonEditor");

    if (!modal || !modalEditor) {
        return;
    }

    if (editor) {
        modalEditor.value = editor.value;
    }

    updateModalEditorGutter();

    modal.classList.add("open");

    modal.setAttribute("aria-hidden", "false");

    setTimeout(() => {
        modalEditor.focus();
    }, 50);
}


function bindModalEditorGutter() {

    const editor = $("#modalPythonEditor");

    if (!editor) {
        return;
    }

    editor.addEventListener("input", updateModalEditorGutter);

    editor.addEventListener("scroll", syncModalEditorGutter);

    updateModalEditorGutter();
}


function updateModalEditorGutter() {

    const editor = $("#modalPythonEditor");
    const gutter = $("#modalEditorGutter");

    if (!editor || !gutter) {
        return;
    }

    gutter.textContent = Array.from(
        { length: editor.value.split("\n").length },
        (_, index) => index + 1
    ).join("\n");

    syncModalEditorGutter();
}


function syncModalEditorGutter() {

    const editor = $("#modalPythonEditor");
    const gutter = $("#modalEditorGutter");

    if (editor && gutter) {
        gutter.scrollTop = editor.scrollTop;
    }
}


function closeCodeEditor() {

    const modal = $("#codeEditorModal");
    const modalEditor = $("#modalPythonEditor");
    const editor = $("#pythonEditor");

    if (!modal) {
        return;
    }

    if (modalEditor && editor) {
        editor.value = modalEditor.value;
    }

    modal.classList.remove("open");

    modal.setAttribute("aria-hidden", "true");
}


function runModalPythonCode() {

    runPythonCode(
        "modalPythonEditor",
        "modalPythonOutput",
        "modalRunPythonButton",
        "modalPythonStatus"
    );
}


/* =========================================================
   提示
========================================================= */

let toastTimer = null;


function showToast(message) {

    const toast = $("#toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}
