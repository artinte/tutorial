/* =========================================================
   SHARED · 教程内容渲染器
   content_renderer.js
   ---------------------------------------------------------
   输入：content block 数组
   输出：HTML 字符串

   设计原则：

   1. 内容里不出现 HTML / CSS（diagram 的结构化写法除外）。
   2. 渲染结果只使用 ck- 前缀的类名，
      因此两门课可以共用样式，互不污染。
   3. 旧字段（code / text / description）在这里统一归一化，
      旧内容不需要改一行就能正确显示。

   编号规则：

       chapter   1
       section   1.1
       heading   1.1.1、1.1.2 ……

   编号由这里生成，不写死在课程内容里。
========================================================= */

import {
    escapeHTML
} from "../utils/html_escape.js";


/* =========================================================
   动画注册表
   ---------------------------------------------------------
   动画的 js 需要被执行，因此渲染时把原始 block 存起来，
   播放时按 id 取回。每次渲染新小节前调用
   resetAnimationRegistry() 清空，避免跨小节残留。
========================================================= */

const animationRegistry = new Map();


export function resetAnimationRegistry() {
    animationRegistry.clear();
}


/* =========================================================
   类型归一化
   ---------------------------------------------------------
   把历史上出现过的写法统一成一种：

       think            → thinking
       "code" + code:   → content:
       无 type + text   → paragraph
========================================================= */

const TYPE_ALIASES = {
    think: "thinking",
    quote: "paragraph",
    text: "paragraph",
    tip: "note"
};


function normalizeType(type) {
    return TYPE_ALIASES[type] || type || "paragraph";
}


function pickContent(block) {
    return (
        block.content ??
        block.code ??
        block.text ??
        block.description ??
        ""
    );
}


function normalizeBlock(block) {
    if (block === null || block === undefined) {
        return null;
    }

    if (typeof block === "string") {
        return {
            type: "paragraph",
            text: block
        };
    }

    if (typeof block !== "object") {
        return null;
    }

    const type = normalizeType(block.type);

    const normalized = {
        ...block,
        type
    };

    switch (type) {
        case "code":
            normalized.content = pickContent(block);
            normalized.language = block.language || "python";
            break;

        case "note":
        case "callout":
        case "attention":
            normalized.content = pickContent(block);
            break;

        case "practice":
            normalized.description = pickContent(block);
            normalized.starterCode = block.starterCode || "";
            break;

        case "paragraph":
        case "heading":
        case "formula":
            normalized.text = block.text ?? block.content ?? "";
            break;

        case "thinking":
            normalized.description =
                block.description ?? block.text ?? "";
            break;

        default:
            break;
    }

    return normalized;
}


/* =========================================================
   基础工具
========================================================= */

function attr(value) {
    return escapeHTML(value);
}


function renderListItems(items, ordered = false) {
    if (!Array.isArray(items) || items.length === 0) {
        return "";
    }

    const tag = ordered ? "ol" : "ul";

    return `
        <${tag} class="ck-list">
            ${items.map(item => {

        /*
         * item 可以是字符串，
         * 也可以是 { title, text }。
         */

        if (item && typeof item === "object") {
            const title = item.title || "";
            const text = item.text || item.detail || "";

            return `
                        <li>
                            ${title
                    ? `<strong>${attr(title)}</strong>`
                    : ""
                }
                            ${text
                    ? `<span>${attr(text)}</span>`
                    : ""
                }
                        </li>
                    `;
        }

        return `<li>${attr(item)}</li>`;

    }).join("")}
        </${tag}>
    `;
}


/* =========================================================
   Paragraph
========================================================= */

function renderParagraph(block) {
    return `
        <p class="ck-para">
            ${attr(block.text)}
        </p>
    `;
}


/* =========================================================
   Heading（自动编号）
========================================================= */

function renderHeading(block, ctx) {
    ctx.headingIndex += 1;

    const number =
        ctx.sectionNumber
            ? `${ctx.sectionNumber}.${ctx.headingIndex}`
            : String(ctx.headingIndex);

    const id =
        `ck-h-${ctx.chapterNumber}-${ctx.sectionNumber}-${ctx.headingIndex}`;

    const tag =
        block.level === 3
            ? "h3"
            : "h2";

    return `
        <${tag}
            class="ck-heading"
            id="${attr(id)}"
            data-ck-heading-number="${attr(number)}"
        >
            <span class="ck-heading-number">${attr(number)}</span>
            <span class="ck-heading-text">${attr(block.text)}</span>
        </${tag}>
    `;
}


/* =========================================================
   Code
========================================================= */

function isRunnableCode(block, ctx) {
    if (ctx.runCode === false) {
        return false;
    }

    if (block.runnable === false) {
        return false;
    }

    return (block.language || "python") === "python";
}


function renderCode(block, ctx) {
    const runnable = isRunnableCode(block, ctx);

    const language =
        block.language || "python";

    const title =
        block.title || "示例代码";

    return `
        <div class="ck-block ck-code" data-ck-code>

            <div class="ck-code-head">

                <span class="ck-code-title">
                    ${attr(title)}
                </span>

                <span class="ck-code-lang">
                    ${attr(language)}
                </span>

            </div>


            <textarea
                class="ck-code-editor"
                spellcheck="false"
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                aria-label="${attr(title)}"
            >${attr(block.content)}</textarea>


            <div class="ck-code-tools">

                ${runnable
            ? `
                        <button
                            type="button"
                            class="ck-btn ck-btn-primary"
                            data-ck-run
                        >
                            ▶ 运行代码
                        </button>
                    `
            : ""
        }

                <button
                    type="button"
                    class="ck-btn"
                    data-ck-copy
                >
                    复制
                </button>

                <span class="ck-code-status" data-ck-status>
                    ${runnable ? "就绪" : "命令示例"}
                </span>

            </div>


            <pre
                class="ck-code-output"
                data-ck-output
                ${runnable ? "" : "hidden"}
            ></pre>

        </div>
    `;
}


/* =========================================================
   Practice
========================================================= */

function renderPractice(block, ctx) {
    return `
        <section class="ck-block ck-practice">

            <div class="ck-label">
                PRACTICE
            </div>

            <h3 class="ck-block-title">
                ${attr(block.title || "练习")}
            </h3>

            ${block.description
            ? `
                        <p class="ck-block-text">
                            ${attr(block.description)}
                        </p>
                    `
            : ""
        }

            ${renderListItems(block.tasks, true)}

            ${block.starterCode
            ? `
                        <div class="ck-practice-code">
                            ${renderCode(
                {
                    title: "练习起点",
                    language: "python",
                    content: block.starterCode
                },
                ctx
            )}
                        </div>
                    `
            : ""
        }

            ${block.hint
            ? `
                        <p class="ck-hint">
                            提示：${attr(block.hint)}
                        </p>
                    `
            : ""
        }

            ${block.difficulty
            ? `
                        <span class="ck-tag">
                            ${attr(block.difficulty)}
                        </span>
                    `
            : ""
        }

        </section>
    `;
}


/* =========================================================
   Thinking
========================================================= */

function renderThinking(block, ctx) {
    const items =
        Array.isArray(block.items) && block.items.length
            ? renderListItems(block.items, true)
            : "";

    const description =
        Array.isArray(block.description)
            ? renderListItems(block.description, true)
            : block.description
                ? `
                    <p class="ck-block-text">
                        ${attr(block.description)}
                    </p>
                  `
                : "";

    return `
        <section class="ck-block ck-thinking">

            <div class="ck-label">
                THINK ABOUT IT
            </div>

            <h3 class="ck-block-title">
                ${attr(block.title || "想一想")}
            </h3>

            ${description}
            ${items}

        </section>
    `;
}


/* =========================================================
   Note / Callout / Attention
========================================================= */

function renderNote(block) {
    return `
        <aside class="ck-block ck-note">

            <div class="ck-label">
                NOTE
            </div>

            <h3 class="ck-block-title">
                ${attr(block.title || "注意")}
            </h3>

            <p class="ck-block-text">
                ${attr(block.content)}
            </p>

        </aside>
    `;
}


function renderCallout(block) {
    const variant =
        block.variant === "orange" || block.variant === "green"
            ? `ck-callout-${block.variant}`
            : "";

    return `
        <aside class="ck-block ck-callout ${variant}">

            <h3 class="ck-block-title">
                ${attr(block.title || "重点")}
            </h3>

            <p class="ck-block-text">
                ${attr(block.content)}
            </p>

            ${block.link?.url
            ? `
                        <a
                            class="ck-link"
                            href="${attr(block.link.url)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ${attr(block.link.content || block.link.url)}
                            ↗
                        </a>
                    `
            : ""
        }

        </aside>
    `;
}


function renderAttention(block) {
    return `
        <aside class="ck-block ck-attention">

            <div class="ck-label">
                ATTENTION
            </div>

            <h3 class="ck-block-title">
                ${attr(block.title || "注意")}
            </h3>

            <p class="ck-block-text">
                ${attr(block.content)}
            </p>

        </aside>
    `;
}


/* =========================================================
   Concepts
========================================================= */

function renderConcepts(block) {
    const items = Array.isArray(block.items)
        ? block.items
        : [];

    if (items.length === 0) {
        return "";
    }

    return `
        <div class="ck-block ck-concepts">

            ${items.map(item => {

        if (item && typeof item === "object") {
            return `
                        <div class="ck-concept">

                            <strong>
                                ${attr(item.title || item.term || "")}
                            </strong>

                            <span>
                                ${attr(item.text || item.description || "")}
                            </span>

                        </div>
                    `;
        }

        return `
                    <div class="ck-concept">
                        <span>${attr(item)}</span>
                    </div>
                `;

    }).join("")}

        </div>
    `;
}


/* =========================================================
   Checklist
========================================================= */

function renderChecklist(block) {
    return `
        <div class="ck-block ck-checklist">

            <div class="ck-checklist-title">
                ${attr(block.title || "检查一下")}
            </div>

            ${(block.items || [])
            .map(item => `
                    <div class="ck-checklist-item">
                        <span class="ck-checklist-mark" aria-hidden="true">✓</span>
                        <span>${attr(item)}</span>
                    </div>
                `)
            .join("")}

        </div>
    `;
}


/* =========================================================
   Formula
========================================================= */

function renderFormula(block) {
    return `
        <div class="ck-block ck-formula">
            ${attr(block.text)}
        </div>
    `;
}


/* =========================================================
   List
========================================================= */

function renderListBlock(block) {
    return `
        <div class="ck-block ck-list-block">
            ${renderListItems(block.items, block.ordered)}
        </div>
    `;
}


/* =========================================================
   Diagram
   ---------------------------------------------------------
   示意图用 HTML + CSS 描述，具体图形写在内容里。

   渲染器只负责统一外框：

       标题 / 留白 / 圆角 / 说明文字

   图形内部的类名与布局由内容自己决定，
   对应样式统一写在 css/shared/diagram.css。
========================================================= */

function renderDiagram(block) {
    return `
        <figure class="ck-block ck-diagram">

            ${block.title
            ? `
                        <figcaption class="ck-diagram-title">
                            ${attr(block.title)}
                        </figcaption>
                    `
            : ""
        }

            <div class="ck-diagram-stage">
                <div class="ck-diagram-body ck-diagram-raw">
                    <style>${block.css || ""}</style>
                    ${block.html || ""}
                </div>
            </div>

            ${block.description
            ? `
                        <p class="ck-diagram-desc">
                            ${attr(block.description)}
                        </p>
                    `
            : ""
        }

        </figure>
    `;
}


/* =========================================================
   Figure（image）
========================================================= */

function renderFigure(block) {
    return `
        <figure class="ck-block ck-figure">

            <div
                class="ck-figure-visual"
                role="img"
                aria-label="${attr(block.alt || "")}"
            >
                <style>${block.css || ""}</style>
                ${block.html || ""}
            </div>

            ${block.caption
            ? `
                        <figcaption class="ck-figure-caption">
                            ${attr(block.caption)}
                        </figcaption>
                    `
            : ""
        }

        </figure>
    `;
}


/* =========================================================
   Animation
========================================================= */

function renderAnimation(block) {
    const id =
        `ck-anim-${Math.random().toString(36).slice(2, 9)}`;

    animationRegistry.set(id, block);

    return `
        <div
            class="ck-block ck-animation"
            data-ck-animation="${attr(id)}"
        >

            ${block.title
            ? `
                        <div class="ck-animation-head">
                            <div class="ck-label">ANIMATION</div>
                            <h3 class="ck-block-title">
                                ${attr(block.title)}
                            </h3>
                        </div>
                    `
            : ""
        }

            <div class="ck-animation-stage">
                <style>${block.css || ""}</style>
                <div class="ck-animation-content">
                    ${block.html || ""}
                </div>
            </div>

            <div class="ck-animation-tools">
                <button
                    type="button"
                    class="ck-btn"
                    data-ck-play="${attr(id)}"
                >
                    ▶ 播放动画
                </button>
            </div>

        </div>
    `;
}


/* =========================================================
   单个 block 渲染
========================================================= */

export function renderBlock(rawBlock, ctx) {
    const block = normalizeBlock(rawBlock);

    if (!block) {
        return "";
    }

    switch (block.type) {
        case "paragraph":
            return renderParagraph(block);

        case "heading":
            return renderHeading(block, ctx);

        case "code":
            return renderCode(block, ctx);

        case "practice":
            return renderPractice(block, ctx);

        case "thinking":
            return renderThinking(block, ctx);

        case "note":
            return renderNote(block);

        case "callout":
            return renderCallout(block);

        case "attention":
            return renderAttention(block);

        case "concepts":
            return renderConcepts(block);

        case "checklist":
            return renderChecklist(block);

        case "formula":
            return renderFormula(block);

        case "list":
            return renderListBlock(block);

        case "diagram":
            return renderDiagram(block);

        case "image":
        case "figure":
            return renderFigure(block);

        case "animation":
            return renderAnimation(block);

        default:
            /*
             * 未知类型不静默丢弃，
             * 在页面里保留一个可见提示，方便发现内容问题。
             */

            console.warn("[Content] 未知 block 类型：", block.type);

            return `
                <div class="ck-block ck-unknown">
                    未知内容类型：${attr(block.type)}
                </div>
            `;
    }
}


/* =========================================================
   渲染整篇内容
========================================================= */

export function createRenderContext(options = {}) {
    return {
        chapterNumber: options.chapterNumber || 1,
        sectionNumber: options.sectionNumber || "1",
        headingIndex: 0,
        runCode: options.runCode !== false
    };
}


export function renderBlocks(blocks, options = {}) {
    const ctx = createRenderContext(options);

    return (blocks || [])
        .map(block => renderBlock(block, ctx))
        .join("");
}


/* =========================================================
   小节文章
   ---------------------------------------------------------
   统一的小节版式：

       CHAPTER 1 · 1.1
       1.1  标题
       导语
       正文
========================================================= */

export function renderSectionArticle({
    chapter,
    section,
    chapterNumber,
    sectionNumber,
    runCode = true,
    objectives = []
}) {
    resetAnimationRegistry();

    const content = renderBlocks(
        section.content || [],
        {
            chapterNumber,
            sectionNumber,
            runCode
        }
    );

    return `
        <article class="ck-article" data-section-id="${attr(section.id)}">

            <header class="ck-article-head">

                <div class="ck-article-kicker">
                    CHAPTER ${attr(chapterNumber)}
                    <span>·</span>
                    ${attr(chapter.title || "")}
                </div>

                <h1 class="ck-article-title">
                    <span class="ck-article-number">
                        ${attr(sectionNumber)}
                    </span>
                    ${attr(section.title)}
                </h1>

                ${section.description || section.intro
            ? `
                            <p class="ck-article-intro">
                                ${attr(section.description || section.intro)}
                            </p>
                        `
            : ""
        }

                ${objectives.length
            ? `
                        <div class="ck-objectives">

                            <div class="ck-label">
                                LEARNING OBJECTIVES
                            </div>

                            ${renderListItems(objectives)}

                        </div>
                    `
            : ""
        }

            </header>

            <div class="ck-content">
                ${content}
            </div>

        </article>
    `;
}


/* =========================================================
   交互绑定
   ---------------------------------------------------------
   一次绑定，之后依赖事件委托，
   因此重新渲染内容不需要重新绑定。

   onRunCode(code, { output, status, button, block })
========================================================= */

export function initContentInteractions(root, options = {}) {

    if (!root || root.dataset.ckBound === "true") {
        return;
    }

    root.dataset.ckBound = "true";


    root.addEventListener("click", event => {

        /* -----------------------------------------------
           复制代码
        ----------------------------------------------- */

        const copyButton =
            event.target.closest("[data-ck-copy]");

        if (copyButton) {
            const blockEl = copyButton.closest("[data-ck-code]");
            const editor = blockEl?.querySelector(".ck-code-editor");
            const status = blockEl?.querySelector("[data-ck-status]");

            if (!editor) {
                return;
            }

            const text = editor.value;

            const done = () => {
                if (status) {
                    status.textContent = "已复制";
                }

                setTimeout(() => {
                    if (status) {
                        status.textContent = "就绪";
                    }
                }, 1600);
            };

            if (navigator.clipboard?.writeText) {
                navigator.clipboard
                    .writeText(text)
                    .then(done)
                    .catch(() => fallbackCopy(editor, done));
            } else {
                fallbackCopy(editor, done);
            }

            return;
        }


        /* -----------------------------------------------
           运行代码
        ----------------------------------------------- */

        const runButton =
            event.target.closest("[data-ck-run]");

        if (runButton) {
            const blockEl = runButton.closest("[data-ck-code]");
            const editor = blockEl?.querySelector(".ck-code-editor");
            const output = blockEl?.querySelector("[data-ck-output]");
            const status = blockEl?.querySelector("[data-ck-status]");

            if (!editor || !output) {
                return;
            }

            if (typeof options.onRunCode === "function") {
                options.onRunCode(editor.value, {
                    output,
                    status,
                    button: runButton,
                    block: blockEl
                });
            } else if (status) {
                status.textContent = "当前课程未接入运行环境";
            }

            return;
        }


        /* -----------------------------------------------
           播放动画
        ----------------------------------------------- */

        const playButton =
            event.target.closest("[data-ck-play]");

        if (playButton) {
            playAnimation(playButton.dataset.ckPlay, playButton);
        }

    });
}


function fallbackCopy(editor, done) {
    editor.select();

    try {
        document.execCommand("copy");
        done();
    } catch {
        /* 忽略：部分浏览器禁止复制 */
    }

    editor.setSelectionRange(0, 0);
}


/* =========================================================
   动画播放
========================================================= */

function playAnimation(animationId, button) {

    const block = animationRegistry.get(animationId);

    if (!block || !String(block.js || "").trim()) {
        return;
    }

    const container =
        button.closest("[data-ck-animation]");

    const stage =
        container?.querySelector(".ck-animation-stage");

    if (!stage) {
        return;
    }

    button.disabled = true;
    button.textContent = "播放中…";

    try {
        /*
         * 重建舞台，清除上一次播放在元素上留下的
         * inline style（opacity / transform / transition）。
         */

        stage.innerHTML = `
            <style>${block.css || ""}</style>
            <div class="ck-animation-content">
                ${block.html || ""}
            </div>
        `;

        const run = new Function("animationRoot", block.js);

        run(container);

    } catch (error) {
        console.error("[Content] 动画执行失败：", error);
    }

    setTimeout(() => {
        button.disabled = false;
        button.textContent = "↻ 重新播放";
    }, Number(block.duration) || 1200);
}
