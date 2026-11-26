/* =========================================================
   内容模块自检
   ---------------------------------------------------------
   用法：

       node scripts/verify_kit.mjs

   检查什么：

   把每种内容块都渲染一遍，收集 HTML 里用到的所有 ck- 类名，
   确认它们都能在 css/shared 下找到样式定义。

   这样「改了 CSS 不小心删掉某条规则，导致按钮/卡片失去样式」
   就能被自动发现（曾真实发生过：.ck-practice-actions 与
   .ck-btn-ghost 被误删，按钮直接贴在代码带上）。

   例外：
   少数类名只是结构容器，本身没有视觉样式，列在 PASSTHROUGH 里。
========================================================= */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";


const base = process.cwd();

/*
 * 纯结构容器：只用来分组，本身不需要样式。
 * 新增条目时请写清原因。
 */

const PASSTHROUGH = new Set([
    "ck-block",             // 所有卡片的公共钩子，负责间距与卡片基线
    "ck-diagram-body",      // 图解的画布内层，样式由 diagram/ 下的具体图负责
    "ck-animation",         // 动画容器，视觉样式在 -head / -stage / -tools 上
    "ck-animation-content", // 动画内容层，宽高由动画自己的 css 决定
    "ck-list-block",        // 列表块的包裹层，样式在 .ck-list 上
    "ck-code"               // 与 ck-block 同时出现，样式已覆盖
]);


/* =========================================================
   1. 收集 css/shared 下定义过的类名
========================================================= */

function collectStyled(dir, set = new Set()) {

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {

        const full = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            collectStyled(full, set);
            continue;
        }

        if (!entry.name.endsWith(".css")) {
            continue;
        }

        const css = fs
            .readFileSync(full, "utf8")
            .replace(/\/\*[\s\S]*?\*\//g, "");

        for (const match of css.matchAll(/\.([A-Za-z][A-Za-z0-9_-]*)/g)) {
            set.add(match[1]);
        }
    }

    return set;
}


/* =========================================================
   2. 每种内容块渲染一份样本
========================================================= */

const samples = [
    { type: "paragraph", text: "段落" },
    { type: "heading", text: "标题" },
    { type: "code", content: 'print("hi")', title: "示例", language: "python" },
    { type: "code", content: "ls", title: "命令", language: "bash" },
    {
        type: "practice",
        title: "练习",
        description: "说明",
        starterCode: 'print("hi")',
        answer: 'print("hi")',
        hint: "提示",
        difficulty: "简单"
    },
    { type: "practice", title: "纯文字练习", description: "想一想", answer: "答案" },
    { type: "practice", title: "无答案练习", description: "想一想" },
    { type: "thinking", title: "想一想", description: "思考" },
    { type: "note", title: "注意", content: "内容" },
    { type: "callout", title: "重点", content: "内容" },
    { type: "callout", title: "重点", content: "内容", variant: "orange" },
    { type: "attention", title: "注意", content: "内容" },
    { type: "concepts", items: ["a", { title: "b", text: "c" }] },
    { type: "checklist", items: ["a"], title: "检查" },
    { type: "formula", text: "y = ax + b" },
    { type: "list", items: ["a", "b"], ordered: true },
    { type: "diagram", title: "图", html: '<div class="x"></div>', description: "说明" },
    { type: "image", alt: "图", html: "<div></div>", caption: "图注" },
    { type: "animation", title: "动画", html: "<div></div>", css: "", js: "1" }
];


const onlyCkClasses = html => {

    const names = new Set();

    for (const match of html.matchAll(/class="([^"]+)"/g)) {
        match[1]
            .split(/\s+/)
            .filter(name => name.startsWith("ck-"))
            .forEach(name => names.add(name));
    }

    return names;
};


/* =========================================================
   3. 运行
========================================================= */

const renderer = await import(
    pathToFileURL(path.join(base, "js/shared/content_renderer.js")).href
);

const styled = collectStyled(path.join(base, "css/shared"));

const used = new Set();

for (const block of samples) {

    const html = renderer.renderBlock(
        block,
        renderer.createRenderContext({ runCode: true })
    );

    onlyCkClasses(html).forEach(name => used.add(name));
}

/* 未提供运行环境时，练习里的运行按钮应该消失 */

const noRun = renderer.renderBlock(
    {
        type: "practice",
        title: "练习",
        description: "说明",
        starterCode: "print(1)",
        answer: "print(1)"
    },
    renderer.createRenderContext({ runCode: false })
);

let problems = 0;

function check(condition, message) {
    if (condition) {
        console.log(`✓ ${message}`);
    } else {
        console.error(`✗ ${message}`);
        problems += 1;
    }
}

const missing = [...used]
    .filter(name => !styled.has(name) && !PASSTHROUGH.has(name))
    .sort();

console.log(`渲染用到的 ck- 类名: ${used.size}`);
console.log(`其中纯结构容器（不需要样式）: ${
    [...used].filter(name => PASSTHROUGH.has(name)).length
}`);

check(
    missing.length === 0,
    missing.length === 0
        ? "所有内容块类名都有对应样式"
        : `缺少样式: ${missing.join(", ")}`
);

check(
    !/data-ck-run/.test(noRun),
    "未接入运行环境时不渲染运行按钮"
);

check(
    /data-ck-reveal/.test(noRun),
    "有答案时仍然渲染显示答案按钮"
);

/* 练习按钮与输出框必须同时存在 */

const withCode = renderer.renderBlock(
    {
        type: "practice",
        title: "练习",
        description: "说明",
        starterCode: "print(1)",
        answer: "print(1)"
    },
    renderer.createRenderContext({ runCode: true })
);

check(
    /ck-practice-actions/.test(withCode) &&
    /data-ck-run/.test(withCode) &&
    /data-ck-reveal/.test(withCode),
    "练习的按钮行同时包含运行与显示答案"
);

check(
    (withCode.match(/data-ck-output/g) || []).length === 1,
    "练习只有一个共用输出框"
);

check(
    /ck-code-gutter/.test(withCode),
    "练习代码带行号栏"
);

console.log(
    problems === 0 ? "\n全部检查通过。" : `\n${problems} 项检查失败。`
);

process.exitCode = problems === 0 ? 0 : 1;
