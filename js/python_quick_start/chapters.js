/* =========================================================
   PYTHON QUICK START
   chapters.js

   Python 快速入门
   ---------------------------------------------------------
   课程总入口

   本文件只负责：

   1. 课程元数据
   2. 课程前言
   3. 加载 15 个章节
   4. 导出 chapters
   5. 自动统计课程规模

   每一章独立维护：

       chapter01.js
       chapter02.js
       ...
       chapter15.js

   前言独立维护：

       introduction.js

   这样后续可以单独扩充前言或某一章，而不会让
   一个 JS 文件越来越庞大。

   课程整体路线：

       Python 基础
            ↓
       控制流 / 函数 / 数据结构
            ↓
       Module / Package / Environment
            ↓
       Standard Library
            ↓
       Files / JSON / CSV / MNIST
            ↓
       Exceptions / Debug / Testing
            ↓
       OOP / Composition
            ↓
       Iterator / Generator / Data Pipeline
            ↓
       Design Patterns / Architecture
            ↓
       Automation
            ↓
       NumPy / Matplotlib
            ↓
       Python 工程 / 数据科学 / ML / DL
========================================================= */


import introduction from "./introduction.js";

import { chapter01 } from "./chapter01.js";
import { chapter02 } from "./chapter02.js";
import { chapter03 } from "./chapter03.js";
import { chapter04 } from "./chapter04.js";
import { chapter05 } from "./chapter05.js";
import { chapter06 } from "./chapter06.js";
import { chapter07 } from "./chapter07.js";
import { chapter08 } from "./chapter08.js";
import { chapter09 } from "./chapter09.js";
import { chapter10 } from "./chapter10.js";
import { chapter11 } from "./chapter11.js";
import { chapter12 } from "./chapter12.js";
import { chapter13 } from "./chapter13.js";
import { chapter14 } from "./chapter14.js";
import { chapter15 } from "./chapter15.js";


/* =========================================================
   COURSE META
========================================================= */

export const COURSE_ID = "python_quick_start";


export const COURSE = {

    id: COURSE_ID,

    title: "Python 快速入门",

    englishTitle: "Python Quick Start",

    subtitle:
        "从零开始写出真正能运行的 Python 程序",

    description:
        "这是一门从零基础出发，逐步进入 Python 编程、软件工程、数据处理和 AI 开发的系统课程。" +
        "课程从变量、数据类型、控制流和函数开始，逐步学习数据结构、模块与 Package、标准库、文件与真实数据、异常处理、调试、测试、面向对象、组合、迭代器与生成器、设计模式、程序架构和自动化。" +
        "后半部分进一步进入 NumPy、Matplotlib 以及现代 Python 项目的基本形态，并建立通往数据科学、机器学习和深度学习的完整学习路线。" +
        "课程强调理解、实践和真实问题解决能力，而不是单纯记忆语法和 API。",

    level:
        "零基础 → 入门 → 初级开发 → 数据与 AI 入门",

    duration:
        "约 40～60 小时",


    /* =====================================================
       COURSE INTRODUCTION
       -----------------------------------------------------
       课程前言不是 Chapter 0。

       它属于整个课程本身，
       因此独立挂在 COURSE.introduction 下。
    ===================================================== */

    introduction,


    /*
     * 下面这些数字不再作为最终统计依据。
     *
     * 真正的课程规模由 COURSE_STATS 自动计算。
     * 这里保留字段，是为了兼容现有课程页面。
     */

    lessons: null,

    exercises: null,

    projects: null,


    /* =====================================================
       COURSE FEATURES
    ===================================================== */

    features: [

        "浏览器直接编写 Python",

        "点击运行即可执行代码",

        "真实 Python 服务执行",

        "每章大量可运行示例",

        "即时编程练习",

        "错误与 Debug 训练",

        "Python 标准库视角",

        "文件与真实数据处理",

        "MNIST 数据解析实践",

        "面向对象与组合设计",

        "Iterator / Generator 数据处理",

        "PyTorch DataLoader 思维",

        "设计模式与程序架构",

        "Python 自动化实践",

        "NumPy 数值计算",

        "Matplotlib 数据可视化",

        "现代 Python 项目结构",

        "机器学习与深度学习学习路线",

        "AI 学习助手"

    ],


    /* =====================================================
       COURSE GOALS
    ===================================================== */

    goals: [

        /* -------------------------------------------------
           Python 基础
        ------------------------------------------------- */

        "能够独立阅读简单 Python 程序",

        "理解 Python 基本语法和执行模型",

        "掌握变量、表达式和基本数据类型",

        "掌握 if、for、while 等控制流",

        "能够独立编写和调用函数",

        "理解参数、返回值和作用域",


        /* -------------------------------------------------
           数据结构
        ------------------------------------------------- */

        "熟练使用 list、tuple、dict、set",

        "理解字符串作为序列进行处理",

        "能够设计适合问题的数据结构",

        "能够处理嵌套数据结构",


        /* -------------------------------------------------
           Python 模块系统
        ------------------------------------------------- */

        "理解 Module、Package 和 import",

        "理解 __name__ 和 python -m",

        "理解虚拟环境和第三方 Package",

        "能够使用 requirements 或项目依赖配置",


        /* -------------------------------------------------
           标准库
        ------------------------------------------------- */

        "建立 Python 标准库的整体认识",

        "能够通过文档和工具发现合适的标准库能力",

        "理解 Python 内置功能、标准库和第三方库之间的区别",


        /* -------------------------------------------------
           文件与数据
        ------------------------------------------------- */

        "能够读写文本文件",

        "能够处理 JSON 和 CSV",

        "理解文本编码和二进制数据",

        "能够处理目录和批量文件",

        "能够解析具有实际格式的数据文件",

        "能够完成 MNIST 等真实数据的基础解析",


        /* -------------------------------------------------
           错误与测试
        ------------------------------------------------- */

        "能够正确阅读 Python traceback",

        "能够使用异常处理保护程序",

        "能够主动定位和分析 Bug",

        "理解 logging 和调试工具",

        "能够编写基本单元测试",

        "理解边界条件和回归测试",


        /* -------------------------------------------------
           OOP
        ------------------------------------------------- */

        "理解对象、类、实例和方法",

        "理解实例状态与行为",

        "理解继承的基本思想",

        "理解组合为什么经常比继承更加灵活",

        "能够使用对象组织复杂程序",


        /* -------------------------------------------------
           Iterator / Generator
        ------------------------------------------------- */

        "理解 Iterable 与 Iterator",

        "理解 iter() 和 next()",

        "理解 for 循环背后的迭代机制",

        "能够编写 Generator",

        "理解 yield 和惰性计算",

        "能够使用生成器处理大量数据",

        "理解数据预加载和 DataLoader 的基本思想",


        /* -------------------------------------------------
           软件设计
        ------------------------------------------------- */

        "理解职责分离",

        "理解高内聚与低耦合",

        "理解依赖注入",

        "理解 Strategy、Factory、Adapter、Facade 等设计模式",

        "理解 Observer 等事件驱动思想",

        "理解 Singleton 的使用场景与风险",

        "理解 MVC、MVP 等基本架构",

        "能够设计结构清晰的小型 Python 程序",


        /* -------------------------------------------------
           自动化
        ------------------------------------------------- */

        "能够使用 Python 批量处理文件",

        "能够编写自动化脚本",

        "能够生成数据报告",

        "能够编写基础 CLI 工具",


        /* -------------------------------------------------
           数据科学
        ------------------------------------------------- */

        "理解为什么数据科学需要专门的数据结构",

        "能够使用 NumPy 进行基础数值计算",

        "理解 ndarray 和向量化计算",

        "能够使用 Matplotlib 绘制基础数据图表",

        "能够通过可视化观察数据",


        /* -------------------------------------------------
           工程与下一阶段
        ------------------------------------------------- */

        "理解现代 Python 项目的基本结构",

        "了解 pyproject.toml 的作用",

        "了解 Type Hints 和 dataclass",

        "理解 Mock 和外部依赖测试",

        "了解 Python Web API 的基本工作方式",

        "建立数据科学、机器学习和深度学习的学习路线",

        "能够继续独立学习 Python 生态中的新工具和新领域"

    ]

};


/* =========================================================
   CHAPTER LIST
========================================================= */

export const chapters = [

    chapter01,
    chapter02,
    chapter03,
    chapter04,
    chapter05,
    chapter06,
    chapter07,
    chapter08,
    chapter09,
    chapter10,
    chapter11,
    chapter12,
    chapter13,
    chapter14,
    chapter15

];


/* =========================================================
   COURSE STATISTICS
========================================================= */

/**
 * 所有章节中的 Section 数量。
 *
 * 当前课程结构中：
 *
 * chapter
 *    ↓
 * sections
 *    ↓
 * lesson
 *
 * 因此这里的 lessons 实际统计的是课程中的教学单元。
 */

const lessonCount = chapters.reduce(

    (total, chapter) =>

        total +
        (chapter.sections || []).length,

    0

);


/**
 * practice 数量。
 *
 * 一个 section 可以包含多个 practice，
 * 因此需要逐个 section 统计。
 */

const exerciseCount = chapters.reduce(

    (total, chapter) =>

        total +

        (chapter.sections || []).reduce(

            (count, section) =>

                count +

                (section.content || []).filter(

                    block =>
                        block.type === "practice"

                ).length,

            0

        ),

    0

);


/**
 * 可运行 Python 示例数量。
 *
 * 统计：
 *
 * type === "code"
 *
 * 并且：
 *
 * language === "python"
 *
 * 如果旧内容没有填写 language，
 * 默认也视为 Python。
 */

const runnableExampleCount = chapters.reduce(

    (total, chapter) =>

        total +

        (chapter.sections || []).reduce(

            (count, section) =>

                count +

                (section.content || []).filter(

                    block =>

                        block.type === "code" &&

                        (
                            !block.language ||
                            block.language === "python"
                        )

                ).length,

            0

        ),

    0

);


/**
 * 所有代码块数量。
 *
 * 不管 Python、bash、text 还是其他语言。
 */

const codeBlockCount = chapters.reduce(

    (total, chapter) =>

        total +

        (chapter.sections || []).reduce(

            (count, section) =>

                count +

                (section.content || []).filter(

                    block =>
                        block.type === "code"

                ).length,

            0

        ),

    0

);


/**
 * Diagram 数量。
 */

const diagramCount = chapters.reduce(

    (total, chapter) =>

        total +

        (chapter.sections || []).reduce(

            (count, section) =>

                count +

                (section.content || []).filter(

                    block =>
                        block.type === "diagram"

                ).length,

            0

        ),

    0

);


/**
 * Note 数量。
 */

const noteCount = chapters.reduce(

    (total, chapter) =>

        total +

        (chapter.sections || []).reduce(

            (count, section) =>

                count +

                (section.content || []).filter(

                    block =>
                        block.type === "note"

                ).length,

            0

        ),

    0

);


/**
 * Thinking 数量。
 */

const thinkingCount = chapters.reduce(

    (total, chapter) =>

        total +

        (chapter.sections || []).reduce(

            (count, section) =>

                count +

                (section.content || []).filter(

                    block =>
                        block.type === "thinking"

                ).length,

            0

        ),

    0

);


/* =========================================================
   PUBLIC COURSE STATISTICS
========================================================= */

export const COURSE_STATS = {

    /* 基本规模 */

    chapters:
        chapters.length,

    lessons:
        lessonCount,

    exercises:
        exerciseCount,

    runnableExamples:
        runnableExampleCount,


    /* 内容规模 */

    codeBlocks:
        codeBlockCount,

    diagrams:
        diagramCount,

    notes:
        noteCount,

    thinkingBlocks:
        thinkingCount

};


/* =========================================================
   同步 COURSE 中的统计信息
   ---------------------------------------------------------
   这样现有页面如果使用：

       COURSE.lessons

       COURSE.exercises

       COURSE.projects

   也可以继续工作。

   注意：

   projects 不从 practice 自动推断。

   因为 practice ≠ project。

   后续如果需要精确统计项目，
   可以给 practice 增加 project: true。
========================================================= */

COURSE.lessons =
    COURSE_STATS.lessons;


COURSE.exercises =
    COURSE_STATS.exercises;


/*
 * 当前不自动统计 projects。
 *
 * practice 不等于 project。
 *
 * 所以这里暂时保持为 0，
 * 避免课程首页出现错误统计。
 */

COURSE.projects = 0;


/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default chapters;