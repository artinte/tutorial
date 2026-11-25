/* =========================================================
   SHARED · 教程内容基础模块
   content_blocks.js
   ---------------------------------------------------------
   目标：

   1. 课程内容只描述「是什么」，不写 HTML，也不写 CSS。
   2. 所有课程共用一套 block 定义与渲染样式。
   3. 通过构造器保证字段名一致，避免同一类型出现
      code / content、text / description 两种写法。

   规范：

   每种 block 只有一个权威字段：

       paragraph   → text
       heading     → text
       code        → content      ← 代码正文一律用 content
       practice    → description + starterCode
       thinking    → description  或 items
       note        → content
       callout     → content
       concepts    → items
       checklist   → items
       diagram     → spec（结构化）或 html（过渡）
       formula     → text
       list        → items
       animation   → html / css / js
       lesson      → id / title / description / content

   渲染器会兼容旧字段，但新内容请一律使用这里的构造器。
========================================================= */


/* =========================================================
   Paragraph
========================================================= */

export function paragraph(text) {
    return {
        type: "paragraph",
        text
    };
}


/* =========================================================
   Heading
   ---------------------------------------------------------
   渲染时自动编号（1.1.1、1.1.2 ……），
   不需要在正文里手写编号。
========================================================= */

export function heading(text, level = 2) {
    return {
        type: "heading",
        text,
        level
    };
}


/* =========================================================
   Code
   ---------------------------------------------------------
   content 是代码正文。
   language 决定是否提供「运行」按钮：
   只有 python 默认可以运行，其余语言只提供复制。
========================================================= */

export function code(
    content,
    title = "",
    language = "python"
) {
    return {
        type: "code",
        title,
        content,
        language
    };
}


/* =========================================================
   Practice
   ---------------------------------------------------------
   options 可选字段：

       tasks       练习步骤列表
       hint        提示
       difficulty  难度标签
========================================================= */

export function practice(
    title,
    description,
    starterCode = "",
    options = {}
) {
    return {
        type: "practice",
        title,
        description,
        starterCode,
        ...options
    };
}


/* =========================================================
   Thinking
   ---------------------------------------------------------
   description 可以是字符串，也可以是字符串数组。
========================================================= */

export function thinking(title, description) {
    return {
        type: "thinking",
        title,
        description
    };
}


/* =========================================================
   Note
========================================================= */

export function note(title, content) {
    return {
        type: "note",
        title,
        content
    };
}


/* =========================================================
   Callout
   ---------------------------------------------------------
   variant："" | "orange" | "green"
========================================================= */

export function callout(title, content, variant = "") {
    return {
        type: "callout",
        title,
        content,
        variant
    };
}


/* =========================================================
   Concepts
   ---------------------------------------------------------
   items 支持两种写法：

       ["概念 A", "概念 B"]
       [{ title, text }]
========================================================= */

export function concepts(items) {
    return {
        type: "concepts",
        items
    };
}


/* =========================================================
   Checklist
========================================================= */

export function checklist(items, title = "") {
    return {
        type: "checklist",
        title,
        items
    };
}


/* =========================================================
   Diagram
   ---------------------------------------------------------
   结构化示意图用 HTML + CSS 描述。

   这里只提供标题和说明，图形本身写在 html 里：

       diagram("Python 的三层工具世界", `
           <div class="stdlib-layer-diagram">
               <div class="stdlib-layer">你的程序</div>
               <div class="stdlib-arrow">↓</div>
               <div class="stdlib-layer">Python 标准库</div>
           </div>
       `);

   对应的样式统一写在：

       css/shared/diagram.css

   diagram 的外框（标题、留白、圆角）由渲染器负责，
   图形内部的类名和布局完全由内容自己决定。
========================================================= */

export function diagram(
    title,
    html,
    description = ""
) {
    return {
        type: "diagram",
        title,
        description,
        html
    };
}


/* =========================================================
   Formula
========================================================= */

export function formula(text) {
    return {
        type: "formula",
        text
    };
}


/* =========================================================
   List
========================================================= */

export function list(items, ordered = false) {
    return {
        type: "list",
        items,
        ordered
    };
}


/* =========================================================
   Animation
   ---------------------------------------------------------
   动画仍然需要少量 HTML / CSS / JS，
   但只需要描述动画自己的舞台，不参与页面样式。
========================================================= */

export function animation(options = {}) {
    return {
        type: "animation",
        title: options.title || "",
        html: options.html || "",
        css: options.css || "",
        js: options.js || "",
        duration: Number(options.duration) || 1200
    };
}


/* =========================================================
   Figure
   ---------------------------------------------------------
   用 SVG / HTML 描述图形，同样不参与页面样式。
========================================================= */

export function figure(options = {}) {
    return {
        type: "image",
        alt: options.alt || "",
        caption: options.caption || "",
        html: options.html || "",
        css: options.css || ""
    };
}


/* =========================================================
   Lesson（小节）
   ---------------------------------------------------------
   小节在页面上的编号由课程结构决定（1.1、1.2 ……），
   因此这里不写编号。
========================================================= */

export function lesson(
    id,
    title,
    description,
    content
) {
    return {
        id,
        title,
        description,
        content: content || []
    };
}
