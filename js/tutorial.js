/* =========================================================
   Tutorial Studio
   Tutorial Center · 教程中心

   文件：
   js/tutorial.js

   模块职责：
   1. 管理课程数据
   2. 按分类筛选课程
   3. 渲染课程卡片
   4. 打开已经开放的课程
   5. 显示课程空状态
   6. 支持键盘访问
   7. 提供课程数据查询接口

   当前 HTML 结构：
   - #categoryTabs
   - .category-tab
   - #courseGrid
   - #emptyState
   - #resetSearch

   注意：
   当前版本不再依赖搜索框和课程数量元素。
========================================================= */


/* =========================================================
   1. 配置
========================================================= */

const TUTORIAL_CONFIG = Object.freeze({

    basePath: new URL("./", window.location.href).pathname,

    defaultCategory: "all",

    logPrefix: "[Tutorial]"

});


/* =========================================================
   2. 课程数据

   status:
   available   已开放
   coming-soon 暂未开放

   只有已开放且配置了合法站内 URL 的课程
   才允许用户点击进入。
========================================================= */

const tutorials = [

    {
        id: "deep-learning-fundamentals",

        title: "深度学习基础",

        category: "ai",

        categoryName: "AI 与人工智能",

        icon: "AI",

        description:
            "从零开始学习深度学习，理解神经网络、反向传播、CNN、Transformer 以及模型训练的基本原理。",

        lessons: 24,

        duration: "6 小时",

        level: "入门",

        status: "available",

        url: "./deep_learning_fundamentals/index.html",

        keywords: [
            "人工智能",
            "神经网络",
            "机器学习",
            "CNN",
            "Transformer",
            "反向传播"
        ]
    },

    {
        id: "html-basic",

        title: "HTML 基础教程",

        category: "programming",

        categoryName: "编程开发",

        icon: "</>",

        description:
            "从零开始学习 HTML，理解网页结构、元素、属性以及语义化标签。",

        lessons: 18,

        duration: "3.5 小时",

        level: "入门",

        status: "coming-soon",

        keywords: [
            "HTML",
            "网页",
            "网页结构"
        ]
    },

    {
        id: "css-basic",

        title: "CSS 基础教程",

        category: "programming",

        categoryName: "编程开发",

        icon: "#",

        description:
            "系统学习 CSS 选择器、盒模型、布局、Flex、Grid、动画与响应式设计。",

        lessons: 24,

        duration: "5 小时",

        level: "入门",

        status: "coming-soon",

        keywords: [
            "CSS",
            "网页设计",
            "Flex",
            "Grid",
            "响应式"
        ]
    },

    {
        id: "javascript-basic",

        title: "JavaScript 基础",

        category: "programming",

        categoryName: "编程开发",

        icon: "JS",

        description:
            "从变量、函数到 DOM、事件与异步编程，建立完整的 JavaScript 基础。",

        lessons: 32,

        duration: "7 小时",

        level: "入门",

        status: "coming-soon",

        keywords: [
            "JavaScript",
            "JS",
            "DOM",
            "编程"
        ]
    },

    {
        id: "python_quick_start",

        title: "Python 快速入门",

        category: "programming",

        categoryName: "编程开发",

        icon: "Py",

        description:
            "从零开始快速掌握 Python，通过练习和实战项目建立编程基础，为数据分析、机器学习和深度学习做好准备。",

        lessons: 100,

        duration: "25～40 小时",

        level: "入门",

        status: "available",

        url: "./python_quick_start/index.html",

        keywords: [
            "Python",
            "编程",
            "数据分析",
            "机器学习",
            "实战项目"
        ]
    },

    {
        id: "web-development",

        title: "现代 Web 开发",

        category: "programming",

        categoryName: "编程开发",

        icon: "WEB",

        description:
            "理解现代 Web 应用的完整开发流程，学习前端与后端之间如何协作。",

        lessons: 36,

        duration: "8.5 小时",

        level: "进阶",

        status: "coming-soon",

        keywords: [
            "Web",
            "前端",
            "后端",
            "网站开发"
        ]
    },

    {
        id: "ai-basic",

        title: "人工智能基础",

        category: "ai",

        categoryName: "AI 与人工智能",

        icon: "AI",

        description:
            "理解人工智能、机器学习、深度学习与生成式 AI 的基本概念。",

        lessons: 20,

        duration: "4 小时",

        level: "入门",

        status: "coming-soon",

        keywords: [
            "AI",
            "人工智能",
            "机器学习",
            "生成式 AI"
        ]
    },

    {
        id: "prompt",

        title: "Prompt 工程",

        category: "ai",

        categoryName: "AI 与人工智能",

        icon: "✦",

        description:
            "理解提示词的基本结构，学习如何设计更加稳定、清晰的 AI 指令。",

        lessons: 16,

        duration: "3 小时",

        level: "入门",

        status: "coming-soon",

        keywords: [
            "Prompt",
            "提示词",
            "AI 指令"
        ]
    },

    {
        id: "ai-api",

        title: "AI API 开发",

        category: "ai",

        categoryName: "AI 与人工智能",

        icon: "API",

        description:
            "使用 API 将大模型能力集成到自己的 Web 应用与 Python 项目中。",

        lessons: 22,

        duration: "5 小时",

        level: "进阶",

        status: "coming-soon",

        keywords: [
            "API",
            "大模型",
            "接口",
            "AI 开发"
        ]
    },

    {
        id: "primary-math",

        title: "小学数学",

        category: "primary",

        categoryName: "小学课程",

        icon: "＋",

        description:
            "通过清晰的图形、动画与例题，建立小学数学知识体系。",

        lessons: 40,

        duration: "8 小时",

        level: "基础",

        status: "coming-soon",

        keywords: [
            "小学",
            "数学",
            "计算"
        ]
    },

    {
        id: "primary-chinese",

        title: "小学语文",

        category: "primary",

        categoryName: "小学课程",

        icon: "文",

        description:
            "覆盖识字、阅读、写作与基础语文知识，建立完整学习框架。",

        lessons: 35,

        duration: "7 小时",

        level: "基础",

        status: "coming-soon",

        keywords: [
            "小学",
            "语文",
            "阅读",
            "写作"
        ]
    },

    {
        id: "middle-math",

        title: "初中数学",

        category: "middle",

        categoryName: "中学课程",

        icon: "∑",

        description:
            "从代数、几何到函数，系统梳理初中数学核心知识。",

        lessons: 52,

        duration: "12 小时",

        level: "基础",

        status: "coming-soon",

        keywords: [
            "初中",
            "数学",
            "代数",
            "几何",
            "函数"
        ]
    },

    {
        id: "middle-physics",

        title: "初中物理",

        category: "middle",

        categoryName: "中学课程",

        icon: "Φ",

        description:
            "通过实验、动画和可视化模型理解力学、电学与光学。",

        lessons: 45,

        duration: "10 小时",

        level: "基础",

        status: "coming-soon",

        keywords: [
            "初中",
            "物理",
            "力学",
            "电学",
            "光学"
        ]
    },

    {
        id: "vscode",

        title: "VS Code 使用教程",

        category: "software",

        categoryName: "软件教程",

        icon: "VS",

        description:
            "从安装配置到插件、快捷键、调试与项目管理，全面掌握 VS Code。",

        lessons: 18,

        duration: "3.5 小时",

        level: "入门",

        status: "coming-soon",

        keywords: [
            "VS Code",
            "编辑器",
            "开发工具"
        ]
    },

    {
        id: "excel",

        title: "Excel 实用教程",

        category: "software",

        categoryName: "软件教程",

        icon: "XL",

        description:
            "学习 Excel 常用功能、公式、数据处理、图表与自动化技巧。",

        lessons: 30,

        duration: "6 小时",

        level: "入门",

        status: "coming-soon",

        keywords: [
            "Excel",
            "表格",
            "办公",
            "数据处理"
        ]
    },

    {
        id: "powerpoint",

        title: "PowerPoint 教程",

        category: "software",

        categoryName: "软件教程",

        icon: "PPT",

        description:
            "从基础操作到版式设计、动画与专业演示文稿制作。",

        lessons: 24,

        duration: "5 小时",

        level: "入门",

        status: "coming-soon",

        keywords: [
            "PowerPoint",
            "PPT",
            "演示文稿"
        ]
    },

    {
        id: "windows",

        title: "Windows 实用技巧",

        category: "skills",

        categoryName: "实用技能",

        icon: "⊞",

        description:
            "掌握 Windows 系统设置、文件管理、快捷操作与效率技巧。",

        lessons: 20,

        duration: "4 小时",

        level: "入门",

        status: "coming-soon",

        keywords: [
            "Windows",
            "电脑",
            "系统设置"
        ]
    },

    {
        id: "linux",

        title: "Linux 基础",

        category: "skills",

        categoryName: "实用技能",

        icon: "$",

        description:
            "从命令行开始学习 Linux 文件系统、进程、网络与服务器基础。",

        lessons: 28,

        duration: "6 小时",

        level: "入门",

        status: "coming-soon",

        keywords: [
            "Linux",
            "命令行",
            "服务器",
            "系统管理"
        ]
    }

];


/* =========================================================
   3. 页面状态
========================================================= */

const state = {
    category: TUTORIAL_CONFIG.defaultCategory
};


/* =========================================================
   4. DOM 引用
========================================================= */

const dom = {
    courseGrid: document.getElementById("courseGrid"),

    emptyState: document.getElementById("emptyState"),

    resetSearch: document.getElementById("resetSearch"),

    categoryTabs: [
        ...document.querySelectorAll(".category-tab")
    ]
};


/* =========================================================
   5. 通用工具
========================================================= */

function log(...args) {
    console.info(
        TUTORIAL_CONFIG.logPrefix,
        ...args
    );
}


function warn(...args) {
    console.warn(
        TUTORIAL_CONFIG.logPrefix,
        ...args
    );
}


function createElement(tagName, className = "", text) {
    const element = document.createElement(tagName);

    if (className) {
        element.className = className;
    }

    if (text !== undefined && text !== null) {
        element.textContent = String(text);
    }

    return element;
}


/* =========================================================
   6. 课程 URL 校验
========================================================= */

function isValidTutorialUrl(url) {
    if (
        typeof url !== "string" ||
        url.startsWith("//") ||
        url.includes("\\")
    ) {
        return false;
    }

    try {
        const parsed = new URL(
            url,
            window.location.href
        );

        return (
            parsed.origin === window.location.origin &&
            parsed.pathname.startsWith(TUTORIAL_CONFIG.basePath)
        );
    } catch {
        return false;
    }
}


function isTutorialAvailable(tutorial) {
    return Boolean(
        tutorial &&
        tutorial.status === "available" &&
        isValidTutorialUrl(tutorial.url)
    );
}


/* =========================================================
   7. DOM 检查
========================================================= */

function validateDOM() {
    const required = [
        ["courseGrid", dom.courseGrid],
        ["emptyState", dom.emptyState]
    ];

    const missing = required
        .filter(([, element]) => !element)
        .map(([name]) => name);

    if (missing.length > 0) {
        console.error(
            `${TUTORIAL_CONFIG.logPrefix} 页面缺少必要的 DOM 元素：`,
            missing
        );

        return false;
    }

    return true;
}


/* =========================================================
   8. 课程数据校验
========================================================= */

function validateTutorialData() {
    const seenIds = new Set();

    return tutorials.filter((tutorial, index) => {
        if (!tutorial || typeof tutorial !== "object") {
            warn(`第 ${index + 1} 条课程数据无效。`);
            return false;
        }

        if (
            typeof tutorial.id !== "string" ||
            !tutorial.id.trim()
        ) {
            warn(`第 ${index + 1} 条课程缺少 ID。`);
            return false;
        }

        if (seenIds.has(tutorial.id)) {
            warn(`发现重复课程 ID：${tutorial.id}`);
            return false;
        }

        if (
            typeof tutorial.title !== "string" ||
            !tutorial.title.trim()
        ) {
            warn(`课程 ${tutorial.id} 缺少标题。`);
            return false;
        }

        seenIds.add(tutorial.id);

        return true;
    });
}


/* =========================================================
   9. 课程统计
========================================================= */

function getCourseStatistics(list = validateTutorialData()) {
    const totalLessons = list.reduce(
        (total, tutorial) => {
            return total + (
                Number(tutorial.lessons) || 0
            );
        },
        0
    );

    const availableCount = list.filter(
        isTutorialAvailable
    ).length;

    return {
        courseCount: list.length,
        totalLessons,
        availableCount,
        comingSoonCount: list.length - availableCount
    };
}


/* =========================================================
   10. 按分类筛选
========================================================= */

function getFilteredTutorials() {
    const list = validateTutorialData();

    if (state.category === "all") {
        return list;
    }

    return list.filter(
        tutorial => tutorial.category === state.category
    );
}


/* =========================================================
   11. 创建课程卡片
========================================================= */

function createCourseCard(tutorial) {
    const available = isTutorialAvailable(tutorial);

    const article = createElement(
        "article",
        [
            "course-card",
            available
                ? "is-available"
                : "is-unavailable"
        ].join(" ")
    );

    article.dataset.id = tutorial.id;

    /*
     * 卡片顶部。
     */
    const top = createElement(
        "div",
        "course-top"
    );

    const category = createElement(
        "span",
        "course-category",
        tutorial.categoryName || "其他课程"
    );

    const icon = createElement(
        "div",
        "course-card-icon",
        tutorial.icon || "TS"
    );

    icon.setAttribute("aria-hidden", "true");

    top.append(
        category,
        icon
    );


    /*
     * 标题。
     */
    const title = createElement(
        "h3",
        "",
        tutorial.title
    );


    /*
     * 简介。
     */
    const description = createElement(
        "p",
        "course-card-description",
        tutorial.description || "暂无课程简介。"
    );


    /*
     * 课程信息。
     */
    const meta = createElement(
        "div",
        "course-meta"
    );

    const lessons = createElement(
        "span",
        "",
        `${Number(tutorial.lessons) || 0} 节课`
    );

    const duration = createElement(
        "span",
        "",
        tutorial.duration || "时长待定"
    );

    meta.append(
        lessons,
        duration
    );


    /*
     * 卡片底部。
     */
    const footer = createElement(
        "div",
        "course-footer"
    );

    const level = createElement(
        "span",
        "course-level",
        available
            ? `已开放 · ${tutorial.level || "入门"}`
            : "即将开放"
    );

    const arrow = createElement(
        "span",
        "course-arrow",
        available ? "→" : "—"
    );

    arrow.setAttribute("aria-hidden", "true");

    footer.append(
        level,
        arrow
    );


    /*
     * 组装卡片。
     */
    article.append(
        top,
        title,
        description,
        meta,
        footer
    );


    /*
     * 只有开放课程可以点击。
     */
    if (available) {
        article.setAttribute("role", "link");

        article.setAttribute("tabindex", "0");

        article.setAttribute(
            "aria-label",
            `开始学习：${tutorial.title}`
        );

        article.addEventListener("click", () => {
            openTutorial(tutorial);
        });

        article.addEventListener("keydown", event => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();

                openTutorial(tutorial);
            }
        });
    } else {
        article.setAttribute(
            "aria-label",
            `${tutorial.title}，课程暂未开放`
        );
    }

    return article;
}


/* =========================================================
   12. 打开课程
========================================================= */

function openTutorial(tutorial) {
    if (!tutorial) {
        return;
    }

    if (!isTutorialAvailable(tutorial)) {
        warn(
            "课程暂未开放或课程路径无效：",
            tutorial.id
        );

        return;
    }

    log(
        "正在打开课程：",
        tutorial.title,
        tutorial.url
    );

    window.location.assign(tutorial.url);
}


/* =========================================================
   13. 更新空状态
========================================================= */

function updateEmptyState(isEmpty) {
    dom.emptyState.hidden = !isEmpty;

    dom.courseGrid.hidden = isEmpty;
}


/* =========================================================
   14. 渲染课程列表
========================================================= */

function renderTutorials() {
    if (!dom.courseGrid) {
        return;
    }

    const filtered = getFilteredTutorials();

    const fragment = document.createDocumentFragment();

    filtered.forEach(tutorial => {
        try {
            fragment.appendChild(
                createCourseCard(tutorial)
            );
        } catch (error) {
            console.error(
                `${TUTORIAL_CONFIG.logPrefix} 课程卡片渲染失败：`,
                tutorial.id,
                error
            );
        }
    });

    dom.courseGrid.replaceChildren(fragment);

    updateEmptyState(
        dom.courseGrid.children.length === 0
    );

    log(
        "课程列表已更新：",
        dom.courseGrid.children.length,
        "门课程"
    );
}


/* =========================================================
   15. 设置分类
========================================================= */

function setCategory(category) {
    const requestedCategory = category || "all";

    const matchedTab = dom.categoryTabs.find(
        tab => tab.dataset.category === requestedCategory
    );

    state.category = matchedTab
        ? requestedCategory
        : "all";

    dom.categoryTabs.forEach(tab => {
        const isActive =
            tab.dataset.category === state.category;

        tab.classList.toggle(
            "active",
            isActive
        );

        tab.setAttribute(
            "aria-pressed",
            String(isActive)
        );

        if (isActive) {
            tab.setAttribute(
                "aria-current",
                "true"
            );
        } else {
            tab.removeAttribute(
                "aria-current"
            );
        }
    });

    renderTutorials();
}


/* =========================================================
   16. 分类事件
========================================================= */

function bindCategoryEvents() {
    dom.categoryTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            setCategory(
                tab.dataset.category
            );
        });
    });
}


/* =========================================================
   17. 重置筛选
========================================================= */

function resetFilters() {
    setCategory("all");
}


/* =========================================================
   18. 空状态事件
========================================================= */

function bindEmptyStateEvents() {
    if (!dom.resetSearch) {
        return;
    }

    dom.resetSearch.addEventListener(
        "click",
        resetFilters
    );
}


/* =========================================================
   19. 键盘操作

   Escape：
   返回全部课程。

   Ctrl + K / Command + K：
   保留为后续搜索功能的快捷键预留。
   当前 HTML 没有搜索框，因此不执行搜索操作。
========================================================= */

function bindKeyboardEvents() {
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (state.category !== "all") {
                resetFilters();
            }

            return;
        }

        /*
         * 当前页面没有搜索框，
         * 不拦截 Ctrl + K / Command + K。
         */
    });
}


/* =========================================================
   20. 教程中心接口
========================================================= */

const TutorialCenter = Object.freeze({

    /**
     * 获取全部课程。
     */
    getAll() {
        return [...validateTutorialData()];
    },

    /**
     * 获取当前分类下的课程。
     */
    getFiltered() {
        return [...getFilteredTutorials()];
    },

    /**
     * 获取课程统计。
     */
    getStatistics() {
        return getCourseStatistics();
    },

    /**
     * 根据 ID 查找课程。
     */
    getById(id) {
        return tutorials.find(
            tutorial => tutorial.id === id
        ) || null;
    },

    /**
     * 切换分类。
     */
    setCategory(category) {
        setCategory(category);
    },

    /**
     * 重置分类。
     */
    reset() {
        resetFilters();
    },

    /**
     * 打开课程。
     */
    open(id) {
        const tutorial = tutorials.find(
            item => item.id === id
        );

        if (tutorial) {
            openTutorial(tutorial);
        }
    }

});


/*
 * 提供浏览器控制台调试接口。
 *
 * 示例：
 *
 * TutorialCenter.getAll()
 * TutorialCenter.getStatistics()
 * TutorialCenter.getById("python_quick_start")
 * TutorialCenter.setCategory("programming")
 * TutorialCenter.reset()
 */
window.TutorialCenter = TutorialCenter;


/* =========================================================
   21. 初始化
========================================================= */

function initTutorialCenter() {
    if (!validateDOM()) {
        return;
    }

    log("正在初始化教程中心……");

    bindCategoryEvents();

    bindEmptyStateEvents();

    bindKeyboardEvents();

    setCategory(
        TUTORIAL_CONFIG.defaultCategory
    );

    const statistics = getCourseStatistics();

    log("教程中心初始化完成", {
        课程总数: statistics.courseCount,
        课程章节总数: statistics.totalLessons,
        已开放课程: statistics.availableCount,
        暂未开放课程: statistics.comingSoonCount
    });
}


/* =========================================================
   22. 启动
========================================================= */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initTutorialCenter,
        {
            once: true
        }
    );
} else {
    initTutorialCenter();
}