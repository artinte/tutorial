/* =========================================================
   PYTHON QUICK START
   chapter15.js

   第 15 章：从 Python 学习者到 Python 开发者

   本章定位：

   前 14 章已经完成：

   Python 基础
        ↓
   数据结构
        ↓
   文件与数据
        ↓
   异常与调试
        ↓
   OOP
        ↓
   Iterator / Generator
        ↓
   设计模式
        ↓
   自动化
        ↓
   NumPy / Matplotlib

   本章不再重复做 Todo List。

   而是回答：

   “学完 Python 基础之后，真正的 Python 开发是什么样的？”

   内容包括：

   Type Hints
   dataclass
   项目结构
   pyproject.toml
   测试
   Mock
   CLI
   Web API
   数据科学
   机器学习
   深度学习
   工程实践
   学习路线
========================================================= */

import {
    paragraph,
    code,
    practice,
    thinking,
    note,
    callout,
    concepts,
    checklist,
    diagram,
    lesson
} from "./content_helpers.js";


export const chapter15 = {

    id: "chapter-15",

    number: "15",

    title: "从 Python 学习者到 Python 开发者",

    englishTitle: "From Python Learner to Python Developer",

    description:
        "完成 Python 基础学习后的最后一站。理解现代 Python 项目的基本形态，并认识软件开发、自动化、数据科学、机器学习和深度学习等不同方向。",

    sections: [


        /* =====================================================
           01
        ===================================================== */

        lesson(
            "py-15-01",

            "Python 到底能做什么？",

            "不要把 Python 理解成一门只会写脚本的语言。",

            [

                paragraph(
                    "经过前面的学习，你已经接触了 Python 很多不同的能力。但如果把这些内容全部放在一起，你可能会产生一个新的问题：Python 到底是一门什么样的语言？"
                ),

                diagram(
                    "Python 能力地图",

                    `
                    <div class="diagram-grid">

                        <div class="diagram-node">
                            软件开发
                            <small>CLI / Web / Backend</small>
                        </div>

                        <div class="diagram-node">
                            自动化
                            <small>文件 / 数据 / 任务</small>
                        </div>

                        <div class="diagram-node">
                            数据科学
                            <small>NumPy / Pandas</small>
                        </div>

                        <div class="diagram-node">
                            机器学习
                            <small>Scikit-learn</small>
                        </div>

                        <div class="diagram-node">
                            深度学习
                            <small>PyTorch</small>
                        </div>

                        <div class="diagram-node">
                            工具开发
                            <small>API / CLI / Package</small>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "Python 的强大之处并不是语言本身拥有无穷多功能，而是它拥有非常庞大的生态系统。Python 本身负责提供一套优秀的语言基础，而不同领域的第三方库负责把这些能力扩展到现实世界。"
                ),

                callout(
                    "重要",

                    "真正的 Python 开发者不可能记住所有库的所有 API。更重要的能力是：知道问题属于什么领域，知道应该寻找什么工具，并且能够阅读文档和源码。"
                ),

                thinking(
                    "思考",

                    "如果一个问题你从来没有解决过，但你知道它大概属于“HTTP 请求”“图像处理”或者“数据分析”，这是否已经是一种编程能力？"
                )
            ]
        ),


        /* =====================================================
           02
        ===================================================== */

        lesson(
            "py-15-02",

            "Type Hints：让代码表达自己的意图",

            "学习现代 Python 中越来越重要的类型标注。",

            [

                paragraph(
                    "Python 是动态类型语言，但这并不意味着大型项目完全不需要类型信息。"
                ),

                code(
                    `def add(a, b):
    return a + b`,
                    "没有类型提示"
                ),

                code(
                    `def add(
    a: int,
    b: int
) -> int:

    return a + b`,
                    "加入 Type Hints"
                ),

                paragraph(
                    "类型提示主要用于表达开发者的意图，也方便 IDE、静态检查工具和其他开发者理解代码。"
                ),

                code(
                    `from pathlib import Path


def read_text(
    path: Path
) -> str:

    return path.read_text(
        encoding="utf-8"
    )`,
                    "真实项目中的类型提示"
                ),

                concepts([
                    "参数类型",
                    "返回值类型",
                    "容器类型",
                    "Optional",
                    "Union / |",
                    "类型别名",
                    "类型提示不是运行时类型检查"
                ]),

                practice(
                    "练习 111：给旧代码加类型",

                    "选择前面一个项目，为主要函数加入参数类型和返回值类型。"
                )
            ]
        ),


        /* =====================================================
           03
        ===================================================== */

        lesson(
            "py-15-03",

            "dataclass：更优雅地表示数据",

            "理解现代 Python 中数据对象的一种常见写法。",

            [

                paragraph(
                    "前面第 10 章已经学习了 class。但很多类实际上并没有复杂的行为，它们只是负责保存结构化数据。"
                ),

                code(
                    `class Student:

    def __init__(
        self,
        name,
        score
    ):

        self.name = name
        self.score = score`,
                    "传统数据类"
                ),

                code(
                    `from dataclasses import dataclass


@dataclass
class Student:

    name: str
    score: float`,
                    "dataclass"
                ),

                paragraph(
                    "dataclass 会自动帮助我们生成很多常见的数据对象方法，因此特别适合表示配置、记录、结果以及领域数据。"
                ),

                code(
                    `student = Student(
    "Alice",
    92
)


print(student)

print(student.name)

print(student.score)`,
                    "使用 dataclass"
                ),

                callout(
                    "设计思想",

                    "class 负责行为时，可以设计方法；dataclass 更适合表达结构化数据。不要为了使用 class 而使用 class。"
                ),

                practice(
                    "练习 112：重构数据对象",

                    "把前面某个项目中的普通数据字典改造成 dataclass，并比较两种设计的区别。"
                )
            ]
        ),


        /* =====================================================
           04
        ===================================================== */

        lesson(
            "py-15-04",

            "一个真正的 Python 项目长什么样？",

            "从单个 .py 文件进入真正的项目结构。",

            [

                code(
                    `my_project/
│
├── pyproject.toml
│
├── src/
│   └── my_project/
│       ├── __init__.py
│       ├── main.py
│       ├── models.py
│       ├── services.py
│       └── repository.py
│
├── tests/
│   ├── test_models.py
│   └── test_services.py
│
├── README.md
│
└── .gitignore`,
                    "现代 Python 项目结构",
                    "text"
                ),

                paragraph(
                    "你会发现，一个真实项目已经不再是“写一个 Python 文件”。代码、测试、配置、文档和依赖都成为项目的一部分。"
                ),

                concepts([
                    "src：源代码",
                    "tests：测试",
                    "README：项目说明",
                    "pyproject.toml：项目与工具配置",
                    ".gitignore：版本控制忽略规则"
                ]),

                paragraph(
                    "第 6 章已经学习过 Module、Package 和虚拟环境。现在可以把这些知识组合起来，形成一个完整 Python 项目的概念。"
                ),

                practice(
                    "项目练习 113：建立 Python 项目骨架",

                    "创建一个包含 src、tests、README 和 pyproject.toml 的最小 Python 项目。"
                )
            ]
        ),


        /* =====================================================
           05
        ===================================================== */

        lesson(
            "py-15-05",

            "测试的下一步：Mock 与边界",

            "测试不是简单地运行一次函数，而是验证程序在各种情况下是否仍然正确。",

            [

                paragraph(
                    "第 9 章已经介绍过测试。本节继续向工程实践推进。"
                ),

                paragraph(
                    "真实程序经常依赖文件系统、时间、网络、数据库等外部资源。如果每次测试都真的访问这些资源，测试会变慢、变得不稳定，也难以制造特定错误。"
                ),

                code(
                    `from unittest.mock import Mock


service = Mock()


service.get_user.return_value = {
    "name": "Alice"
}


user = service.get_user(
    123
)


print(user)

service.get_user.assert_called_once_with(
    123
)`,
                    "Mock 基础"
                ),

                concepts([
                    "测试纯函数",
                    "测试边界条件",
                    "模拟外部依赖",
                    "验证函数是否被正确调用",
                    "测试失败路径"
                ]),

                practice(
                    "练习 114：为服务添加 Mock",

                    "为一个依赖外部数据源的函数编写测试，并使用 Mock 模拟数据源。"
                )
            ]
        ),


        /* =====================================================
           06
        ===================================================== */

        lesson(
            "py-15-06",

            "CLI、Web API 与服务",

            "理解 Python 程序如何从个人脚本变成其他程序可以调用的服务。",

            [

                paragraph(
                    "第 13 章已经学习了 CLI。现在可以再向前一步：让其他程序通过网络调用 Python。"
                ),

                code(
                    `from fastapi import FastAPI


app = FastAPI()


@app.get("/")
def hello():

    return {
        "message": "Hello Python"
    }`,
                    "一个最小 Web API"
                ),

                paragraph(
                    "这里 Python 程序不再只是“运行一次然后退出”，而是启动一个服务，等待其他程序发送请求。"
                ),

                diagram(
                    "Python Web 服务",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            Browser
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            HTTP
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            FastAPI
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Python
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Data
                        </div>

                    </div>
                    `
                ),

                callout(
                    "你已经见过这个世界",

                    "如果你继续学习 Web 后端，就会进入 FastAPI、数据库、认证、异步、部署和 API 设计等内容。"
                ),

                practice(
                    "练习 115：第一个 API",

                    "创建一个最小 FastAPI 程序，实现一个 GET 接口，返回 JSON 数据。"
                )
            ]
        ),


        /* =====================================================
           07
        ===================================================== */

        lesson(
            "py-15-07",

            "Python 与数据科学",

            "进入另一条非常重要的 Python 路线。",

            [

                diagram(
                    "数据科学路线",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            Python
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            NumPy
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Pandas
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Matplotlib
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            数据分析
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "第 14 章已经系统学习 NumPy 和 Matplotlib。下一步可以进入 Pandas，学习 DataFrame、数据清洗、分组统计、连接和时间序列等内容。"
                ),

                paragraph(
                    "这条路线非常适合需要处理真实表格数据、业务数据和实验数据的人。"
                ),

                concepts([
                    "NumPy：数值计算",
                    "Pandas：表格数据",
                    "Matplotlib：可视化",
                    "Jupyter：交互式分析",
                    "数据清洗：把真实数据变成可分析的数据"
                ])
            ]
        ),


        /* =====================================================
           08
        ===================================================== */

        lesson(
            "py-15-08",

            "Python 与机器学习",

            "从“计算数据”进入“从数据学习”。",

            [

                paragraph(
                    "当你已经理解 NumPy、矩阵、X、y、Feature、Target 和可视化后，机器学习中的很多代码就不会显得突然。"
                ),

                diagram(
                    "机器学习路线",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            数据
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            清洗
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Feature
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Model
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Loss / Metric
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Evaluation
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "传统机器学习通常可以从 Scikit-learn 开始。它提供了大量成熟的分类、回归、聚类、降维和模型评估工具。"
                ),

                paragraph(
                    "此时你真正需要学习的重点已经不再是 Python 语法，而是机器学习本身：数据如何表示、模型如何学习、如何评价模型以及如何避免数据泄漏和过拟合。"
                ),

                practice(
                    "下一步实践",

                    "使用一个真实数据集完成：读取数据 → 划分训练集和测试集 → 训练模型 → 预测 → 评价 → 可视化。"
                )
            ]
        ),


        /* =====================================================
           09
        ===================================================== */

        lesson(
            "py-15-09",

            "Python 与深度学习",

            "理解 Python 为什么成为深度学习的重要工具。",

            [

                paragraph(
                    "如果继续进入深度学习，Python 的作用会进一步发生变化。很多底层高性能计算由 C/C++、CUDA 等系统完成，而 Python 负责组织模型、数据和训练流程。"
                ),

                diagram(
                    "深度学习程序",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            Dataset
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            DataLoader
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Model
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Loss
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Optimizer
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "你在第 11 章已经学习过 Iterator、Generator 和数据加载思想；第 14 章又学习了 NumPy、矩阵和 Loss 曲线。这些知识会在 PyTorch 中重新出现。"
                ),

                paragraph(
                    "如果继续深入，可以进一步学习 Dataset、DataLoader、Tensor、自动求导、神经网络、GPU、训练循环以及模型保存。"
                ),

                callout(
                    "推荐学习方向",

                    "如果你的目标是理解 AI 和深度学习，可以继续进入你的《深度学习基础教程》，从 PyTorch 和数据管道开始。"
                )
            ]
        ),


        /* =====================================================
           10
        ===================================================== */

        lesson(
            "py-15-10",

            "阅读文档：程序员不可能记住所有东西",

            "真正的编程能力之一，是在不知道答案的时候找到答案。",

            [

                paragraph(
                    "Python 有大量标准库和第三方库。没有任何人能够记住所有函数、所有参数和所有细节。"
                ),

                paragraph(
                    "因此，阅读文档本身就是编程能力的一部分。"
                ),

                code(
                    `help(str)

help(list)

help(len)`,
                    "使用 help"
                ),

                code(
                    `import pathlib


print(
    dir(pathlib.Path)
)


print(
    pathlib.Path.__doc__
)`,
                    "探索对象"
                ),

                concepts([
                    "官方文档",
                    "函数签名",
                    "参数说明",
                    "返回值",
                    "异常说明",
                    "示例代码",
                    "版本差异"
                ]),

                thinking(
                    "真正的问题",

                    "当你第一次遇到一个完全陌生的 Python 库时，你应该怎么办？不要马上搜索一段代码复制下来，而是先确定：它解决什么问题？核心对象是什么？最小使用方式是什么？"
                ),

                practice(
                    "练习 116：学习一个陌生库",

                    "选择一个你从未使用过的 Python 库，只通过官方文档完成一个最小示例，并记录你找到核心 API 的过程。"
                )
            ]
        ),


        /* =====================================================
           11
        ===================================================== */

        lesson(
            "py-15-11",

            "AI 时代，Python 学习方式也在改变",

            "AI 可以帮助你写代码，但不能替代程序设计能力。",

            [

                paragraph(
                    "现在使用 Python 开发时，你很可能会使用 AI 辅助编程。AI 可以生成代码、解释错误、重构函数、编写测试甚至帮助设计项目结构。"
                ),

                paragraph(
                    "但这并不意味着 Python 基础不重要。恰恰相反，当代码越来越容易生成时，理解代码为什么这样设计会越来越重要。"
                ),

                concepts([
                    "能够阅读代码",
                    "能够判断代码是否正确",
                    "能够描述需求",
                    "能够拆解问题",
                    "能够验证 AI 生成的结果",
                    "能够定位错误",
                    "能够进行架构决策"
                ]),

                callout(
                    "重要能力",

                    "未来真正有价值的能力，不是“能不能让 AI 写出 100 行 Python”，而是“能不能准确告诉 AI 要解决什么问题，并判断它写出来的东西是否可靠”。"
                ),

                thinking(
                    "最后一个思考",

                    "如果 AI 可以在几秒钟内生成一个函数，那么你真正应该学习的是什么？"
                )
            ]
        ),


        /* =====================================================
           12
        ===================================================== */

        lesson(
            "py-15-12",

            "最终实践：设计你自己的 Python 项目",

            "不再给你一个标准答案，而是从真实问题开始。",

            [

                paragraph(
                    "到这里，不建议再给你一个 Todo List 或学生管理系统。因为真正的编程能力应该开始脱离教材提供的问题。"
                ),

                paragraph(
                    "现在请自己选择一个你真正感兴趣的问题。"
                ),

                concepts([
                    "先描述问题，而不是先写代码",
                    "明确输入和输出",
                    "设计数据结构",
                    "拆分模块",
                    "设计核心函数",
                    "选择标准库或第三方库",
                    "处理异常",
                    "记录日志",
                    "编写测试",
                    "不断重构"
                ]),

                practice(
                    "最终项目",

                    "设计并完成一个真实的 Python 项目。可以是：个人知识库、量化数据分析工具、课程学习系统、文件自动化工具、API 服务、数据分析工具、机器学习实验平台、个人财务系统等。",

                    `项目设计：

1. 项目解决什么问题？

2. 输入是什么？

3. 输出是什么？

4. 核心数据结构是什么？

5. 需要哪些模块？

6. 哪些地方可能失败？

7. 如何测试？

8. 如果项目规模扩大，如何继续拆分？`
                )
            ]
        ),


        /* =====================================================
           13
        ===================================================== */

        lesson(
            "py-15-13",

            "Python Quick Start 完成之后",

            "这不是 Python 的终点，而是正式进入 Python 世界的起点。",

            [

                diagram(
                    "下一阶段路线",

                    `
                    <div class="diagram-grid">

                        <div class="diagram-node">
                            Python Web
                            <small>FastAPI / Django</small>
                        </div>

                        <div class="diagram-node">
                            数据分析
                            <small>Pandas / Jupyter</small>
                        </div>

                        <div class="diagram-node">
                            机器学习
                            <small>Scikit-learn</small>
                        </div>

                        <div class="diagram-node">
                            深度学习
                            <small>PyTorch</small>
                        </div>

                        <div class="diagram-node">
                            自动化
                            <small>CLI / Scheduler</small>
                        </div>

                        <div class="diagram-node">
                            工程开发
                            <small>Package / API / Testing</small>
                        </div>

                    </div>
                    `
                ),

                checklist([
                    "能够独立阅读 Python 程序",
                    "能够编写中等规模 Python 程序",
                    "理解模块和 Package",
                    "能够处理文件和真实数据",
                    "能够调试程序",
                    "理解面向对象和组合",
                    "理解迭代器和生成器",
                    "理解基本设计模式和架构",
                    "能够编写自动化程序",
                    "能够使用 NumPy 进行数值计算",
                    "能够使用 Matplotlib 观察数据",
                    "理解机器学习中的 X 和 y",
                    "知道如何继续学习 Python 生态"
                ]),

                paragraph(
                    "如果你能够完成前面章节的大部分实践，那么你已经不再只是“学过 Python”。你已经具备了继续进入软件开发、数据科学、机器学习和深度学习的基础。"
                ),

                callout(
                    "下一站",

                    "如果你的目标是 AI，可以继续进入机器学习与深度学习；如果你的目标是软件开发，可以进入 FastAPI、数据库、Web、异步编程和工程化；如果你的目标是数据分析，可以进入 Pandas、Jupyter 和统计分析。"
                ),

                paragraph(
                    "Python Quick Start 到这里结束。真正的学习，从这里开始。"
                )
            ]
        )

    ]
};


export default chapter15;