/* =========================================================
   页面接线自检脚本
   ---------------------------------------------------------
   用法：

       node scripts/verify_pages.mjs

   检查：

   1. 每个页面引用的 CSS / JS 文件是否存在
   2. 页面脚本里 $("#id") 引用的 DOM 元素是否真实存在
   3. JS 模块的 import 路径是否存在
   4. 页面里是否还残留已废弃的元素引用
========================================================= */

import fs from "node:fs";
import path from "node:path";


const base = process.cwd();

let failures = 0;

function check(condition, message) {
    if (condition) {
        console.log(`✓ ${message}`);
    } else {
        console.error(`✗ ${message}`);
        failures += 1;
    }
}

function exists(relativePath) {
    return fs.existsSync(path.join(base, relativePath));
}

function read(relativePath) {
    return fs.readFileSync(
        path.join(base, relativePath),
        "utf8"
    );
}


/* =========================================================
   页面清单
========================================================= */

const pages = [
    {
        html: "index.html",
        script: "js/tutorial.js"
    },
    {
        html: "html/python_quick_start/index.html",
        script: "js/python_quick_start/python_quick_start.js"
    },
    {
        html: "html/deep_learning_fundamentals/index.html",
        script: "js/deep_learning_fundamentals/deep_learning_fundamentals.js"
    }
];


/* =========================================================
   1. 资源引用
========================================================= */

console.log("\n=== 资源引用 ===");

for (const page of pages) {

    const html = read(page.html);

    const baseDir = path.posix.dirname(page.html);

    const assets = [
        ...html.matchAll(/<link[^>]+href="([^"]+)"/g),
        ...html.matchAll(/<script[^>]+src="([^"]+)"/g)
    ]
        .map(match => match[1])
        .filter(href => !/^https?:|^\/\//.test(href));

    let missing = 0;

    for (const asset of assets) {
        const resolved = path.posix.normalize(
            path.posix.join(baseDir, asset)
        );

        if (!exists(resolved)) {
            console.error(`  ${page.html} 引用了不存在的文件：${asset}`);
            missing += 1;
        }
    }

    check(
        missing === 0,
        `${page.html}：${assets.length} 个资源引用都有效`
    );


    /* -----------------------------------------------
       内联脚本里的动态 import
    ----------------------------------------------- */

    const dynamicImports = [
        ...html.matchAll(/import\(\s*"([^"]+)"\s*\)/g)
    ].map(match => match[1]);

    let badImport = 0;

    for (const target of dynamicImports) {
        const resolved = path.posix.normalize(
            path.posix.join(baseDir, target)
        );

        if (!exists(resolved)) {
            console.error(
                `  ${page.html} 动态 import 不存在：${target}`
            );
            badImport += 1;
        }
    }

    if (dynamicImports.length) {
        check(
            badImport === 0,
            `${page.html}：${dynamicImports.length} 个动态 import 都有效`
        );
    }
}


/* =========================================================
   2. DOM id 接线
========================================================= */

console.log("\n=== DOM 接线 ===");

for (const page of pages) {

    const html = read(page.html);
    const script = read(page.script);

    const htmlIds = new Set(
        [...html.matchAll(/\bid="([^"]+)"/g)]
            .map(match => match[1])
    );

    const usedIds = new Set([
        ...[...script.matchAll(/\$\("#([A-Za-z0-9_-]+)"\)/g)]
            .map(match => match[1]),
        ...[...script.matchAll(/getElementById\(\s*"([A-Za-z0-9_-]+)"\s*\)/g)]
            .map(match => match[1])
    ]);

    const missing = [...usedIds]
        .filter(id => !htmlIds.has(id));

    if (missing.length) {
        missing.forEach(id => {
            console.error(
                `  ${page.script} 引用了页面不存在的元素：#${id}`
            );
        });
    }

    check(
        missing.length === 0,
        `${page.script}：${usedIds.size} 个 DOM 引用都存在`
    );
}


/* =========================================================
   3. 模块 import 路径
========================================================= */

console.log("\n=== 模块 import ===");

const jsFiles = [];

function collectJs(relativeDir) {
    for (const entry of fs.readdirSync(path.join(base, relativeDir), {
        withFileTypes: true
    })) {
        const relative = path.posix.join(relativeDir, entry.name);

        if (entry.isDirectory()) {
            collectJs(relative);
        } else if (entry.name.endsWith(".js")) {
            jsFiles.push(relative);
        }
    }
}

collectJs("js");

let badModules = 0;
let moduleCount = 0;

for (const file of jsFiles) {

    const source = read(file);

    const imports = [
        ...source.matchAll(
            /from\s+"(\.[^"]+)"/g
        )
    ].map(match => match[1]);

    for (const target of imports) {
        moduleCount += 1;

        const resolved = path.posix.normalize(
            path.posix.join(path.posix.dirname(file), target)
        );

        if (!exists(resolved)) {
            console.error(
                `  ${file} 的 import 不存在：${target}`
            );
            badModules += 1;
        }
    }
}

check(
    badModules === 0,
    `${moduleCount} 个模块 import 路径都有效`
);


/* =========================================================
   4. 废弃元素
========================================================= */

console.log("\n=== 废弃引用 ===");

const deprecated = [
    "asideChapterTitle",
    "sectionNavigation",
    "readerContent",
    "readerCompleteChapter",
    "tocList",
    "tocCount",
    "fontIncrease",
    "fontDecrease",
    "continueLearning",
    "markChapterComplete"
];

let stale = 0;

for (const page of pages) {

    const script = read(page.script);

    for (const id of deprecated) {
        if (script.includes(`#${id}`)) {
            console.error(
                `  ${page.script} 仍在引用废弃元素：#${id}`
            );
            stale += 1;
        }
    }
}

check(stale === 0, "没有残留的废弃元素引用");


console.log(
    failures === 0
        ? "\n全部检查通过。"
        : `\n${failures} 项检查失败。`
);

process.exitCode = failures === 0 ? 0 : 1;
