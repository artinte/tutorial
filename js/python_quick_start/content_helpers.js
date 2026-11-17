/* =========================================================
   PYTHON QUICK START
   content_helpers.js

   教程内容统一辅助函数
   ---------------------------------------------------------
   所有 chapterXX.js 共享这些内容构造函数。

   支持：

   paragraph
   code
   practice
   thinking
   note
   callout
   concepts
   checklist
   diagram
   lesson
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
   Code
========================================================= */

export function code(content, title = "", language = "python") {
    return {
        type: "code",
        title,
        content,
        language
    };
}


/* =========================================================
   Practice
========================================================= */

export function practice(
    title,
    description,
    starterCode = ""
) {
    return {
        type: "practice",
        title,
        description,
        starterCode
    };
}


/* =========================================================
   Thinking
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
========================================================= */

export function callout(title, content) {
    return {
        type: "callout",
        title,
        content
    };
}


/* =========================================================
   Concepts
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

export function checklist(items) {
    return {
        type: "checklist",
        items
    };
}


/* =========================================================
   Diagram
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
   Lesson
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
        content
    };
}