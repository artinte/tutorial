/* =========================================================
   PYTHON QUICK START
   chapter01.js

   第 01 章：开始使用 Python
   ---------------------------------------------------------
   目标：

   这一章不是让学生背 Python 语法。

   而是建立最基本的 Python 心智模型：

   1. Python 程序是什么
   2. Python 如何执行代码
   3. print() 如何输出
   4. 注释是什么
   5. 变量是什么
   6. 什么是对象
   7. 什么是数据类型
   8. 什么是表达式
   9. 什么是运算符
   10. 如何读取用户输入
   11. 为什么 input() 得到的是字符串
   12. 如何进行类型转换
   13. 如何使用 f-string
   14. 如何把这些知识组合成小程序

   内容参考方向：

   - Python 官方 Tutorial
   - Python 官方语言参考
   - Python 官方 Built-in Functions
   - Python Crash Course
   - Automate the Boring Stuff with Python
   - Effective Python

   注意：
   本课程内容为 Tutorial Studio 自有课程结构，
   不复制上述资料原文。
========================================================= */

/* =========================================================
   MODULE

   本文件只负责：

   1. 章节元数据（标题、目标……）
   2. 组织本章所有小节

   每个小节单独维护，一个小节一个文件：

       chapter01/py-01-01.js
       chapter01/py-01-02.js
       ...

   调整某一节的内容，只需要改对应文件。
========================================================= */

import { py_01_01 } from "./chapter01/py-01-01.js";
import { py_01_02 } from "./chapter01/py-01-02.js";
import { py_01_03 } from "./chapter01/py-01-03.js";
import { py_01_04 } from "./chapter01/py-01-04.js";
import { py_01_05 } from "./chapter01/py-01-05.js";
import { py_01_06 } from "./chapter01/py-01-06.js";
import { py_01_07 } from "./chapter01/py-01-07.js";
import { py_01_08 } from "./chapter01/py-01-08.js";
import { py_01_09 } from "./chapter01/py-01-09.js";
import { py_01_10 } from "./chapter01/py-01-10.js";
import { py_01_11 } from "./chapter01/py-01-11.js";
import { py_01_12 } from "./chapter01/py-01-12.js";
import { py_01_13 } from "./chapter01/py-01-13.js";
import { py_01_14 } from "./chapter01/py-01-14.js";
import { py_01_15 } from "./chapter01/py-01-15.js";
import { py_01_16 } from "./chapter01/py-01-16.js";

/* =========================================================
   CHAPTER META
========================================================= */

export const chapter01 = {
    id: "chapter-01",
    number: "01",
    title: "开始使用 Python",
    englishTitle: "Getting Started with Python",
    description:
        "从 Python 程序、print() 和变量开始，逐步理解对象、数据类型、表达式、字符串、输入、类型转换和 f-string，并通过多个可以直接运行的小程序完成第一次 Python 实战。",
    objectives: [
        "理解 Python 程序和解释器",
        "能够在本地或在线环境中运行 Python 代码",
        "理解缩进和代码块",
        "能够阅读常见错误信息",
        "理解变量与赋值",
        "理解 Python 对象和基本数据类型",
        "掌握 int、float、str、bool、None",
        "掌握基本算术运算",
        "掌握字符串索引和切片",
        "理解程序如何获得外部数据",
        "理解字符串与数字之间的区别",
        "掌握 int()、float()、str() 等基本转换",
        "掌握 f-string",
        "能够编写结构清晰的小程序"
    ],
    sections: [
        py_01_01,
        py_01_02,
        py_01_03,
        py_01_04,
        py_01_05,
        py_01_06,
        py_01_07,
        py_01_08,
        py_01_09,
        py_01_10,
        py_01_11,
        py_01_12,
        py_01_13,
        py_01_14,
        py_01_15,
        py_01_16
    ]
};

export default chapter01;
