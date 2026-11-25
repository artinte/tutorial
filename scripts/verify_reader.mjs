/* =========================================================
   共享阅读器自检脚本
   ---------------------------------------------------------
   用法：

       node scripts/verify_reader.mjs

   说明：
   阅读器依赖 DOM。这里用最小 DOM 桩代替浏览器，
   验证：

   1. 目录编号是 1 / 1.1
   2. 正文小标题编号是 1.1.1 / 1.1.2
   3. 每个小节都能打开
   4. 进度计算正确
   5. 完成状态可以切换并持久化
========================================================= */

import path from "node:path";
import { pathToFileURL } from "node:url";


/* =========================================================
   最小 DOM 桩
========================================================= */

function createMount(name) {
    return {
        name,
        innerHTML: "",
        listeners: {},
        classList: {
            add() { },
            remove() { },
            toggle() { }
        },
        addEventListener(type, handler) {
            this.listeners[type] = handler;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, bottom: 0, right: 0 };
        },
        scrollIntoView() { }
    };
}


const storage = new Map();

globalThis.localStorage = {
    getItem: key => (storage.has(key) ? storage.get(key) : null),
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: key => storage.delete(key)
};


/* =========================================================
   载入
========================================================= */

const base = process.cwd();

const { createCourseReader } = await import(
    pathToFileURL(
        path.join(base, "js/shared/course_reader.js")
    ).href
);

const courseModule = await import(
    pathToFileURL(
        path.join(base, "js/deep_learning_fundamentals/chapters.js")
    ).href
);


const course = {
    id: "verify-course",
    title: "自检课程",
    chapters: courseModule.chapters
};


/* =========================================================
   运行
========================================================= */

const toc = createMount("toc");
const article = createMount("article");
const nav = createMount("nav");
const progress = createMount("progress");

const reader = createCourseReader({
    course,
    tocMount: toc,
    articleMount: article,
    navMount: nav,
    progressMount: progress,
    runCode: false
});


let failures = 0;

function check(condition, message) {
    if (condition) {
        console.log(`✓ ${message}`);
    } else {
        console.error(`✗ ${message}`);
        failures += 1;
    }
}


/* ---------------------------------------------------------
   1. 目录编号
--------------------------------------------------------- */

check(
    toc.innerHTML.includes("ck-toc-num"),
    "目录已渲染"
);

check(
    /ck-toc-num">\s*1\s*</.test(toc.innerHTML),
    "章节编号从 1 开始"
);

check(
    /ck-toc-section-num">\s*1\.1\s*</.test(toc.innerHTML),
    "小节编号是 1.1"
);


/* ---------------------------------------------------------
   2. 逐节打开
--------------------------------------------------------- */

const flat = reader.getFlatSections();

let opened = 0;
let headingChecks = 0;
let badHeading = 0;

for (const node of flat) {

    if (!reader.open(node.chapter.id, node.section.id)) {
        continue;
    }

    opened += 1;

    const expectedTitleNumber = node.sectionNumber;

    if (!article.innerHTML.includes(expectedTitleNumber)) {
        badHeading += 1;
        console.error(
            `  小节标题缺少编号 ${expectedTitleNumber}：${node.section.id}`
        );
    }

    /*
     * 所有小标题必须是「小节编号.序号」的形式。
     */

    const numbers = [
        ...article.innerHTML.matchAll(
            /class="ck-heading-number">([^<]+)</g
        )
    ].map(match => match[1]);

    for (const number of numbers) {
        headingChecks += 1;

        if (!number.startsWith(`${node.sectionNumber}.`)) {
            badHeading += 1;
            console.error(
                `  小标题编号不在本节下：${number}（${node.section.id}）`
            );
        }
    }
}

check(
    opened === flat.length,
    `全部 ${flat.length} 个小节都能打开`
);

check(
    badHeading === 0,
    `小标题编号全部正确（共 ${headingChecks} 个）`
);


/* ---------------------------------------------------------
   3. 进度
--------------------------------------------------------- */

const first = flat[0];

reader.setCompleted(first.section.id, true);

const stats = reader.getOverallStats();

check(
    stats.completed === 1 && stats.total === flat.length,
    `进度统计：${stats.completed}/${stats.total}`
);

check(
    stats.percent === Math.round(1 / flat.length * 100),
    `进度百分比：${stats.percent}%`
);

check(
    reader.isCompleted(first.section.id),
    "完成状态可以读取"
);

check(
    storage.get(`tutorial-progress:${course.id}`)?.includes(first.section.id),
    "完成状态已写入 localStorage"
);


/* ---------------------------------------------------------
   4. 上一节 / 下一节
--------------------------------------------------------- */

reader.open(flat[3].chapter.id, flat[3].section.id);

const html = nav.innerHTML;

check(
    html.includes("data-ck-prev"),
    "有上一节按钮"
);

check(
    html.includes("data-ck-next"),
    "有下一节按钮"
);


/* ---------------------------------------------------------
   5. Python 课程（小标题最多）的编号检查
--------------------------------------------------------- */

const pythonModule = await import(
    pathToFileURL(
        path.join(base, "js/python_quick_start/chapters.js")
    ).href
);

const pyArticle = createMount("py-article");

const pyReader = createCourseReader({
    course: {
        id: "verify-python",
        title: "Python 快速入门",
        chapters: pythonModule.chapters
    },
    tocMount: createMount("py-toc"),
    articleMount: pyArticle,
    navMount: createMount("py-nav"),
    runCode: false
});

let pyOpened = 0;
let pyHeadings = 0;
let pyBad = 0;

for (const node of pyReader.getFlatSections()) {

    if (!pyReader.open(node.chapter.id, node.section.id)) {
        continue;
    }

    pyOpened += 1;

    const numbers = [
        ...pyArticle.innerHTML.matchAll(
            /class="ck-heading-number">([^<]+)</g
        )
    ].map(match => match[1]);

    for (const number of numbers) {
        pyHeadings += 1;

        if (!number.startsWith(`${node.sectionNumber}.`)) {
            pyBad += 1;
        }
    }
}

check(
    pyOpened === 194,
    `Python 课程 ${pyOpened} 个小节都能打开`
);

check(
    pyBad === 0 && pyHeadings > 100,
    `Python 课程小标题编号正确（共 ${pyHeadings} 个）`
);


/* ---------------------------------------------------------
   6. 兼容旧进度键
--------------------------------------------------------- */

storage.set(
    "legacy-course:learning-progress",
    JSON.stringify({ completedSections: ["1-1", "1-2"] })
);

const legacyReader = createCourseReader({
    course: { ...course, id: "legacy-course" },
    tocMount: createMount("toc2"),
    articleMount: createMount("article2")
});

check(
    legacyReader.isCompleted("1-1"),
    "可以读取旧的 completedSections 进度"
);


console.log(
    failures === 0
        ? "\n全部检查通过。"
        : `\n${failures} 项检查失败。`
);

process.exitCode = failures === 0 ? 0 : 1;
