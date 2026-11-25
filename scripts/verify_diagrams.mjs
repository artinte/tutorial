/* =========================================================
   图解样式覆盖率检查
   ---------------------------------------------------------
   用法：

       node scripts/verify_diagrams.mjs            # 汇总
       node scripts/verify_diagrams.mjs --detail   # 按章节列出缺失类名

   作用：
   扫描所有 diagram 内容里出现的 class 名，
   检查 css/shared/diagram.css 里是否有对应样式。

   这样「图解没有样式」这类问题可以被自动发现。
========================================================= */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";


/* =========================================================
   用法
   ---------------------------------------------------------
       node scripts/verify_diagrams.mjs
       node scripts/verify_diagrams.mjs --detail
       node scripts/verify_diagrams.mjs --css=css/diagram/chapter-04.part.css

   默认检查 css/shared/diagram.css，
   指定 --css 时可以检查任意样式表（便于分章编写时自检）。
========================================================= */

const base = process.cwd();

const cssArg = process.argv
    .find(arg => arg.startsWith("--css="));

const CSS_FILE = cssArg
    ? cssArg.slice("--css=".length)
    : "css/shared/diagram.css";

const detail = process.argv.includes("--detail");


/* =========================================================
   1. 收集内容里的类名
========================================================= */

async function collectFromModule(modulePath) {

    const mod = await import(
        pathToFileURL(path.join(base, modulePath)).href
    );

    const chapters = mod.chapters || mod.default || [];

    const byChapter = new Map();

    for (const chapter of chapters) {
        for (const section of chapter.sections || []) {
            for (const block of section.content || []) {
                if (!block || block.type !== "diagram") {
                    continue;
                }

                const classes = new Set(
                    [...String(block.html || "")
                        .matchAll(/class="([^"]+)"/g)]
                        .flatMap(match => match[1].split(/\s+/))
                        .filter(Boolean)
                    );

                if (!classes.size) {
                    continue;
                }

                if (!byChapter.has(chapter.id)) {
                    byChapter.set(chapter.id, new Set());
                }

                const bucket = byChapter.get(chapter.id);

                classes.forEach(name => bucket.add(name));
            }
        }
    }

    return byChapter;
}


/* =========================================================
   2. 收集样式表里定义过的类名
========================================================= */

function collectStyledClasses(cssPath) {

    const full = path.join(base, cssPath);

    if (!fs.existsSync(full)) {
        return new Set();
    }

    const css = fs.readFileSync(full, "utf8");

    /*
     * 去掉注释，避免注释里的 .xxx 被当成规则。
     */

    const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, "");

    const styled = new Set();

    for (const match of cleaned.matchAll(/\.([A-Za-z0-9_-]+)/g)) {
        styled.add(match[1]);
    }

    return styled;
}


/* =========================================================
   3. 对比
========================================================= */

const styled = collectStyledClasses(CSS_FILE);

const sources = [
    {
        label: "Python 快速入门",
        module: "js/python_quick_start/chapters.js"
    },
    {
        label: "深度学习基础",
        module: "js/deep_learning_fundamentals/chapters.js"
    }
];


let totalMissing = 0;
let totalClasses = 0;

for (const source of sources) {

    const byChapter = await collectFromModule(source.module);

    if (byChapter.size === 0) {
        continue;
    }

    console.log(`\n=== ${source.label} ===`);

    for (const [chapterId, classes] of byChapter) {

        const missing = [...classes]
            .filter(name => !styled.has(name))
            .sort();

        totalClasses += classes.size;
        totalMissing += missing.length;

        const status = missing.length === 0
            ? "✓"
            : "✗";

        console.log(
            `${status} ${chapterId}：${classes.size} 个类名` +
            (missing.length ? `，缺 ${missing.length} 个样式` : "，全部有样式")
        );

        if (missing.length && detail) {
            console.log(`    ${missing.join("  ")}`);
        }
    }
}


console.log(
    `\n合计：${totalClasses} 个类名，` +
    `${totalMissing} 个缺少样式。`
);

if (totalMissing > 0 && !detail) {
    console.log("加上 --detail 可以查看具体缺哪些类名。");
}

process.exitCode = totalMissing === 0 ? 0 : 1;
