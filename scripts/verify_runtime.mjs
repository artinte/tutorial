/* =========================================================
   运行时冒烟测试
   ---------------------------------------------------------
   用法：

       node scripts/verify_runtime.mjs

   说明：
   这里用最小 DOM 桩真实执行两门课的页面引擎模块，
   验证：

   1. 模块可以正常导入、初始化不报错
   2. 左侧目录渲染出 1 / 1.1
   3. 打开小节后正文渲染出 1.1 与 1.1.1
   4. 深度学习课程点击小节可以进入阅读界面
   ========================================================== */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";


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


/* =========================================================
   DOM 桩
========================================================= */

function createElement(id = "") {

    return {
        id,
        innerHTML: "",
        textContent: "",
        value: "",
        hidden: false,
        style: {},
        dataset: {},
        listeners: {},
        attributes: {},
        classList: {
            calls: [],
            add(name) { this.calls.push(["add", name]); },
            remove(name) { this.calls.push(["remove", name]); },
            toggle(name) { this.calls.push(["toggle", name]); },
            contains() { return false; }
        },
        addEventListener(type, handler) {
            (this.listeners[type] ||= []).push(handler);
        },
        removeEventListener() { },
        setAttribute(name, value) {
            this.attributes[name] = value;
        },
        removeAttribute(name) {
            delete this.attributes[name];
        },
        getAttribute(name) {
            return this.attributes[name] ?? null;
        },
        appendChild() { },
        append() { },
        replaceChildren() { },
        remove() { },
        querySelector() { return null; },
        querySelectorAll() { return []; },
        closest() { return null; },
        focus() { },
        blur() { },
        select() { },
        setSelectionRange() { },
        getBoundingClientRect() {
            return { top: 0, left: 0, bottom: 0, right: 0 };
        },
        scrollIntoView() { }
    };
}


function installDom(htmlPath) {

    const html = fs.readFileSync(path.join(base, htmlPath), "utf8");

    const elements = new Map();

    for (const match of html.matchAll(/\bid="([^"]+)"/g)) {
        elements.set(match[1], createElement(match[1]));
    }

    const documentListeners = {};

    globalThis.document = {
        readyState: "complete",
        body: createElement("body"),
        activeElement: null,
        getElementById: id => elements.get(id) || null,
        querySelector(selector) {
            if (selector.startsWith("#")) {
                return elements.get(selector.slice(1)) || null;
            }
            return null;
        },
        querySelectorAll() {
            return [];
        },
        createElement,
        createDocumentFragment: createElement,
        addEventListener(type, handler) {
            (documentListeners[type] ||= []).push(handler);
        },
        execCommand() {
            return true;
        }
    };

    globalThis.window = {
        location: {
            href: `http://127.0.0.1:8123/${htmlPath}`,
            search: "",
            hash: "",
            origin: "http://127.0.0.1:8123",
            pathname: `/${htmlPath}`
        },
        history: {
            pushState() { }
        },
        addEventListener() { },
        removeEventListener() { },
        scrollTo() { },
        scrollY: 0
    };

    globalThis.CSS = {
        escape: value => String(value)
    };

    const storage = new Map();

    globalThis.localStorage = {
        getItem: key => (storage.has(key) ? storage.get(key) : null),
        setItem: (key, value) => storage.set(key, String(value)),
        removeItem: key => storage.delete(key)
    };

    return {
        elements,
        fire(type, event = {}) {
            (documentListeners[type] || [])
                .slice()
                .forEach(handler => handler(event));
        }
    };
}


/* =========================================================
   Python 课程
========================================================= */

console.log("\n=== Python 快速入门 ===");

const pythonDom = installDom(
    "html/python_quick_start/index.html"
);

await import(
    pathToFileURL(
        path.join(base, "js/python_quick_start/python_quick_start.js")
    ).href
);

pythonDom.fire("DOMContentLoaded");

const pyToc = pythonDom.elements.get("chapterNavigation").innerHTML;
const pyGrid = pythonDom.elements.get("chapterGrid").innerHTML;

check(
    /ck-toc-num">\s*1\s*</.test(pyToc),
    "左侧目录渲染出章节 1"
);

check(
    /ck-toc-section-num">\s*1\.1\s*</.test(pyToc),
    "左侧目录渲染出小节 1.1"
);

check(
    pyGrid.includes("chapter-card"),
    "首页章节卡片渲染正常"
);


/*
 * 通过调试接口打开第一个小节。
 */

const pythonApi = globalThis.window.PythonQuickStart;

check(
    Boolean(pythonApi?.reader),
    "阅读器已挂载到 window.PythonQuickStart"
);

const firstPython = pythonApi.reader.getFlatSections()[0];

pythonApi.reader.open(firstPython.chapter.id, firstPython.section.id);

const pyArticle = pythonDom.elements.get("lessonContent").innerHTML;

check(
    pyArticle.includes("ck-article-title"),
    "正文渲染出文章标题"
);

check(
    pyArticle.includes("ck-article-number"),
    "正文标题带小节编号"
);

check(
    pythonDom.elements.get("lessonActions").innerHTML.includes("data-ck-complete"),
    "底部出现标记完成按钮"
);

check(
    pythonDom.elements
        .get("overviewView")
        .classList.calls
        .some(call => call[0] === "add" && call[1] === "hidden"),
    "打开小节后自动切换到课时视图（目录点击也生效）"
);

check(
    pythonDom.elements
        .get("lessonView")
        .classList.calls
        .some(call => call[0] === "remove" && call[1] === "hidden"),
    "课时视图被显示"
);


/* =========================================================
   深度学习课程
========================================================= */

console.log("\n=== 深度学习基础 ===");

const dlDom = installDom(
    "html/deep_learning_fundamentals/index.html"
);

await import(
    pathToFileURL(
        path.join(
            base,
            "js/deep_learning_fundamentals/deep_learning_fundamentals.js"
        )
    ).href
);

const dlRoadmap = dlDom.elements.get("roadmapList").innerHTML;

check(
    dlRoadmap.includes("data-open-section"),
    "首页小节改成了页面内链接"
);

check(
    !dlRoadmap.includes("./chapters/"),
    "首页不再指向不存在的静态小节页"
);

check(
    dlDom.elements.get("readerToc").innerHTML.includes("ck-toc"),
    "阅读器目录已渲染"
);


/*
 * 模拟点击第一个小节链接。
 */

const roadmapElement = dlDom.elements.get("roadmapList");

const linkStub = createElement("link");

linkStub.dataset.openSection = "1-1";
linkStub.dataset.openChapter = "chapter-01";

const clickHandler = roadmapElement.listeners.click?.[0];

check(
    typeof clickHandler === "function",
    "路线图已绑定点击事件"
);

clickHandler({
    preventDefault() { },
    target: {
        closest(selector) {
            return selector === "[data-open-section]" ? linkStub : null;
        }
    }
});

const dlArticle = dlDom.elements.get("readerArticle").innerHTML;

check(
    dlArticle.includes("ck-article-title"),
    "点击小节后正文渲染成功"
);

check(
    /ck-article-number">\s*1\.1\s*</.test(dlArticle),
    "深度学习正文标题编号是 1.1"
);

check(
    dlDom.elements.get("readerNav").innerHTML.includes("data-ck-next"),
    "阅读界面出现上下节导航"
);

check(
    dlDom.elements
        .get("course-roadmap")
        .classList.calls
        .some(call => call[0] === "add" && call[1] === "hidden"),
    "进入阅读界面后首页路线图被隐藏"
);

check(
    dlDom.elements
        .get("readerSection")
        .classList.calls
        .some(call => call[0] === "remove" && call[1] === "hidden"),
    "阅读界面被显示"
);


console.log(
    failures === 0
        ? "\n全部检查通过。"
        : `\n${failures} 项检查失败。`
);

process.exitCode = failures === 0 ? 0 : 1;
