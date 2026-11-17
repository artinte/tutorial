/* =========================================================
   PYTHON QUICK START
   chapter06.js

   第六章：模块、包与 Python 环境
   ---------------------------------------------------------
   课程目标：

   1. 理解 Module
   2. 理解 import
   3. 掌握 from import
   4. 掌握 alias
   5. 理解 Package
   6. 理解 __name__
   7. 理解程序入口
   8. 理解 python -m
   9. 理解标准库与第三方 Package
   10. 掌握 pip
   11. 理解 requirements.txt
   12. 掌握虚拟环境
   13. 学会组织真实 Python 项目
========================================================= */


/* =========================================================
   导入统一内容辅助函数
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


/* =========================================================
   第六章
========================================================= */

export const chapter06 = {

    id: "chapter-06",

    number: "06",

    title: "模块、包与 Python 环境",

    englishTitle: "Modules, Packages & Environments",

    description:
        "从这里开始真正进入 Python 项目的组织方式。理解 Module、import、Package、pip、依赖管理、虚拟环境以及 Python 项目的基本结构。",

    sections: [

        /* =================================================
           01
        ================================================= */

        lesson(
            "py-06-01",

            "什么是 Module？",

            "理解一个 .py 文件就是一个模块，以及为什么程序需要拆分成多个文件。",

            [

                paragraph(
                    "前面的课程中，我们通常把一个完整程序写在一个 Python 文件里。刚开始学习时这样做非常方便，但随着程序越来越大，所有代码都堆在一个文件里就会变得越来越难以维护。"
                ),

                paragraph(
                    "例如一个程序同时负责计算、文本处理、文件操作和用户界面，如果全部写在 main.py 中，很快就会出现几百甚至几千行代码。"
                ),

                paragraph(
                    "Python 提供了 Module（模块）机制，可以把代码拆分到多个 .py 文件中。一个普通的 Python 文件，本身就可以成为一个 Module。"
                ),

                diagram(
                    "Module 的基本概念",
                    `
<div class="ds-diagram module-diagram">

    <div class="module-file">
        <div class="module-icon">PY</div>
        <strong>math_tools.py</strong>
        <span>一个 Module</span>
    </div>

    <div class="module-arrow">
        →
    </div>

    <div class="module-code">
        <div>add()</div>
        <div>subtract()</div>
        <div>multiply()</div>
    </div>

</div>
                    `,
                    "一个 .py 文件可以包含函数、变量、类等代码，它可以被其他 Python 文件导入。"
                ),

                code(
                    `# math_tools.py

def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b
`,
                    "math_tools.py"
                ),

                paragraph(
                    "然后在另一个文件中导入这个模块。"
                ),

                code(
                    `# main.py

import math_tools

print(math_tools.add(10, 20))
print(math_tools.subtract(20, 5))
print(math_tools.multiply(3, 4))
`,
                    "main.py"
                ),

                paragraph(
                    "这里的 math_tools 就是一个模块对象。模块中的函数通过模块名称访问。"
                ),

                paragraph(
                    "这种方式最大的好处是职责分离。main.py 负责程序流程，而 math_tools.py 负责数学工具。"
                ),

                diagram(
                    "模块之间的关系",
                    `
<div class="ds-diagram module-flow-diagram">

    <div class="module-card">
        <strong>main.py</strong>
        <span>程序入口</span>
    </div>

    <div class="flow-arrow">
        import →
    </div>

    <div class="module-card">
        <strong>math_tools.py</strong>
        <span>数学工具</span>
    </div>

</div>
                    `,
                    "程序可以把不同职责拆分到不同模块中。"
                ),

                concepts([
                    "Module 就是一个 Python 模块",
                    "一个 .py 文件可以成为 Module",
                    "Module 可以包含函数、变量和类",
                    "其他 Python 文件可以 import Module",
                    "模块可以帮助大型程序拆分职责"
                ]),

                practice(
                    "练习 53：创建自己的工具模块",
                    "创建 calculator.py，里面放加、减、乘、除函数，再从 main.py 中导入并调用。"
                ),

                practice(
                    "练习 54：创建文本工具模块",
                    "创建 text_tools.py，实现一个 count_words(text) 函数，并在 main.py 中调用。"
                ),

                thinking(
                    "思考",
                    "如果一个项目所有代码都放在一个 3000 行的 main.py 中，后期修改其中一个功能会不会越来越困难？模块化到底解决了什么问题？"
                )
            ]
        ),


        /* =================================================
           02
        ================================================= */

        lesson(
            "py-06-02",

            "import 的几种方式",

            "理解 import、from import 和 alias，以及为什么代码中经常看到不同的导入写法。",

            [

                paragraph(
                    "Python 提供了多种导入模块的方式。最基础的方式是 import。"
                ),

                code(
                    `import math

print(math.sqrt(25))
print(math.pi)`,
                    "import"
                ),

                paragraph(
                    "这里的 math 是模块对象，所以访问 sqrt 时需要写成 math.sqrt。"
                ),

                paragraph(
                    "也可以直接从模块中导入指定对象。"
                ),

                code(
                    `from math import sqrt

print(sqrt(25))`,
                    "from import"
                ),

                paragraph(
                    "还可以一次导入多个对象。"
                ),

                code(
                    `from math import sqrt, floor, ceil

print(sqrt(25))
print(floor(3.8))
print(ceil(3.2))`,
                    "导入多个对象"
                ),

                paragraph(
                    "如果模块名字比较长，或者团队有统一命名习惯，可以使用 alias（别名）。"
                ),

                code(
                    `import math as m

print(m.sqrt(25))
print(m.pi)`,
                    "alias"
                ),

                paragraph(
                    "标准库中也经常使用这种方式。例如 datetime 模块就可以使用别名。"
                ),

                code(
                    `import datetime as dt

today = dt.date.today()

print(today)`,
                    "datetime alias"
                ),

                diagram(
                    "三种常见 import",
                    `
<div class="ds-diagram import-compare">

    <div class="import-card">
        <strong>import math</strong>
        <span>math.sqrt()</span>
    </div>

    <div class="import-card">
        <strong>from math import sqrt</strong>
        <span>sqrt()</span>
    </div>

    <div class="import-card">
        <strong>import math as m</strong>
        <span>m.sqrt()</span>
    </div>

</div>
                    `,
                    "三种方式都可以导入模块，但代码中的名称空间写法不同。"
                ),

                paragraph(
                    "对于初学者来说，建议先熟悉 import module 这种最清晰的形式。它明确告诉读代码的人：sqrt 来自 math 模块。"
                ),

                concepts([
                    "import module",
                    "from module import object",
                    "import module as alias",
                    "模块对象可以通过 . 访问成员",
                    "导入方式会影响代码中的名称写法"
                ]),

                practice(
                    "练习 55：模块导入",
                    "分别使用 import、from import 和 alias 三种方式调用 math 中的函数。"
                ),

                practice(
                    "练习 56：datetime",
                    "导入 datetime 模块，输出今天的日期。",
                    `# 在这里完成代码
`
                ),

                note(
                    "命名建议",
                    "团队项目中应尽量保持导入方式清晰。不要为了少写几个字符而大量使用 from module import *。"
                )
            ]
        ),


        /* =================================================
           03
        ================================================= */

        lesson(
            "py-06-03",

            "模块到底发生了什么？",

            "理解 import 的基本机制，以及模块名称空间。",

            [

                paragraph(
                    "当我们写下 import math 时，并不是把 math.py 的所有代码简单复制到当前文件中。Python 会把模块作为一个对象加载，并通过模块名称空间访问其中的内容。"
                ),

                code(
                    `import math

print(math)
print(math.sqrt)
print(math.pi)`,
                    "模块对象"
                ),

                paragraph(
                    "可以把模块理解成一个独立的命名空间。模块里的变量和函数默认属于这个模块。"
                ),

                code(
                    `# math_tools.py

PI = 3.14159


def circle_area(radius):
    return PI * radius * radius
`,
                    "模块名称空间"
                ),

                code(
                    `import math_tools

print(math_tools.PI)
print(math_tools.circle_area(10))`,
                    "访问模块成员"
                ),

                paragraph(
                    "这种隔离非常重要。假设两个模块都有一个叫 data 的变量，它们不会因为名字相同就互相覆盖。"
                ),

                diagram(
                    "模块名称空间",
                    `
<div class="ds-diagram namespace-diagram">

    <div class="namespace-card">
        <strong>main.py</strong>
        <span>data = "main"</span>
    </div>

    <div class="namespace-arrow">
        import →
    </div>

    <div class="namespace-card">
        <strong>tools.py</strong>
        <span>data = "tools"</span>
    </div>

</div>
                    `,
                    "不同模块拥有相对独立的名称空间。"
                ),

                paragraph(
                    "因此，模块化不仅仅是把代码拆成多个文件，更重要的是把不同功能放进相对独立的命名空间中。"
                ),

                concepts([
                    "Module 是一个独立的名称空间",
                    "模块中的变量不会自动污染其他模块",
                    "可以通过 module.name 访问模块成员",
                    "模块化有助于降低代码之间的耦合"
                ]),

                thinking(
                    "为什么不能所有东西都叫 data？",
                    "模块名称空间可以帮助大型项目避免变量和函数名称相互冲突。"
                )
            ]
        ),


        /* =================================================
           04
        ================================================= */

        lesson(
            "py-06-04",

            "Package：如何组织多个模块",

            "理解 Package，以及如何使用目录组织大型 Python 项目。",

            [

                paragraph(
                    "如果项目只有两个或三个模块，直接放在一个目录里可能已经够用。但如果项目发展到几十甚至几百个模块，就需要更进一步的组织方式。"
                ),

                paragraph(
                    "这时候就可以使用 Package。简单理解，Package 是用于组织多个模块的目录结构。"
                ),

                code(
                    `my_project/
│
├── main.py
│
├── tools/
│   ├── __init__.py
│   ├── calculator.py
│   └── text.py
│
└── data/
    ├── __init__.py
    └── users.py`,
                    "典型项目结构"
                ),

                paragraph(
                    "这里 tools 可以作为一个 Package，里面包含 calculator.py 和 text.py 两个模块。"
                ),

                code(
                    `# tools/calculator.py

def add(a, b):
    return a + b
`,
                    "tools/calculator.py"
                ),

                code(
                    `# main.py

from tools.calculator import add

print(add(10, 20))`,
                    "从 Package 导入"
                ),

                paragraph(
                    "如果一个 Package 中包含多个模块，可以根据职责继续划分。例如 tools 负责工具，data 负责数据，services 负责业务逻辑。"
                ),

                diagram(
                    "Package 组织项目",
                    `
<div class="ds-diagram package-tree">

    <div class="package-root">
        my_project
    </div>

    <div class="package-branches">

        <div class="package-group">
            <strong>tools</strong>
            <span>calculator.py</span>
            <span>text.py</span>
        </div>

        <div class="package-group">
            <strong>data</strong>
            <span>users.py</span>
            <span>products.py</span>
        </div>

        <div class="package-group">
            <strong>services</strong>
            <span>user_service.py</span>
            <span>order_service.py</span>
        </div>

    </div>

</div>
                    `,
                    "Package 可以让大型项目按照职责进一步分组。"
                ),

                paragraph(
                    "现代 Python 中 Package 的形式比较灵活。对于初学者而言，可以先把它理解成：一个用于组织 Python 模块的目录。"
                ),

                practice(
                    "练习 57：创建 Package",
                    "创建一个 tools package，至少包含 calculator.py 和 text.py。"
                ),

                practice(
                    "练习 58：跨 Package 导入",
                    "从 tools.calculator 中导入 add()，并在 main.py 中调用。"
                ),

                concepts([
                    "Package 用于组织多个 Module",
                    "Package 通常对应项目中的一个功能目录",
                    "Package 可以继续包含多个模块",
                    "大型项目通常会按照职责划分多个 Package"
                ])
            ]
        ),


        /* =================================================
           05
        ================================================= */

        lesson(
            "py-06-05",

            "__name__ 与 main",

            "理解 Python 程序入口的经典写法。",

            [

                paragraph(
                    "现在我们已经可以把代码拆分成多个模块，但这里会出现一个新的问题：如果一个文件既可以被直接运行，又可以被其他模块 import，应该怎么办？"
                ),

                paragraph(
                    "Python 提供了一个非常重要的变量：__name__。"
                ),

                code(
                    `print(__name__)`,
                    "查看 __name__"
                ),

                paragraph(
                    "如果直接运行这个文件，通常会看到："
                ),

                code(
                    `__main__`,
                    "直接运行"
                ),

                paragraph(
                    "如果这个文件被其他模块 import，那么它的 __name__ 通常会变成模块名称。"
                ),

                diagram(
                    "__name__ 的两种情况",
                    `
<div class="ds-diagram name-diagram">

    <div class="name-card">
        <strong>直接运行</strong>
        <span>__name__ == "__main__"</span>
    </div>

    <div class="name-card">
        <strong>被 import</strong>
        <span>__name__ == 模块名称</span>
    </div>

</div>
                    `,
                    "同一个 Python 文件，在不同运行方式下可能拥有不同的 __name__。"
                ),

                paragraph(
                    "因此 Python 程序中经常出现下面这种结构。"
                ),

                code(
                    `def main():

    print("程序开始运行")


if __name__ == "__main__":
    main()`,
                    "程序入口"
                ),

                paragraph(
                    "这种写法的含义是：只有当这个文件被直接运行时，才执行 main()。如果它被其他模块导入，则不会自动执行 main()。"
                ),

                paragraph(
                    "这对于创建可以复用的工具模块非常重要。"
                ),

                code(
                    `# calculator.py

def add(a, b):
    return a + b


def main():

    print(add(10, 20))


if __name__ == "__main__":
    main()`,
                    "既可以运行又可以导入"
                ),

                code(
                    `# main.py

from calculator import add

print(add(100, 200))`,
                    "导入 calculator"
                ),

                paragraph(
                    "这里 calculator.py 可以独立运行，也可以作为一个模块被其他程序使用。"
                ),

                practice(
                    "练习 59：重构程序入口",
                    "把前面写过的一个小程序改造成 main() 入口结构。"
                ),

                practice(
                    "练习 60：可运行模块",
                    "创建一个 calculator.py，让它既可以被导入，也可以直接运行测试。"
                ),

                concepts([
                    "__name__ 是 Python 模块的重要特殊变量",
                    "直接运行文件时通常 __name__ == '__main__'",
                    "被 import 时 __name__ 通常是模块名称",
                    "if __name__ == '__main__' 是经典入口写法",
                    "这种写法适合可复用模块"
                ])
            ]
        ),


        /* =================================================
           06
        ================================================= */

        lesson(
            "py-06-06",

            "python -m：从模块方式运行程序",

            "理解 python 文件运行方式与模块运行方式的区别。",

            [

                paragraph(
                    "到这里，我们已经知道可以直接运行一个 Python 文件，例如："
                ),

                code(
                    `python main.py`,
                    "直接运行文件",
                    "bash"
                ),

                paragraph(
                    "Python 还提供另一种常见方式：使用 -m。"
                ),

                code(
                    `python -m module_name`,
                    "模块方式运行",
                    "bash"
                ),

                paragraph(
                    "例如，如果当前目录中存在 tools 包，并且其中有一个 report.py，就可以使用模块路径运行。"
                ),

                code(
                    `python -m tools.report`,
                    "运行 Package 中的模块",
                    "bash"
                ),

                paragraph(
                    "模块方式运行在大型项目中非常常见，因为它会按照 Python 的模块搜索规则来处理程序。"
                ),

                paragraph(
                    "你之前看到的虚拟环境、pip 等命令也经常推荐使用这种形式。"
                ),

                code(
                    `python -m pip --version`,
                    "检查 pip",
                    "bash"
                ),

                code(
                    `python -m pip install requests`,
                    "安装 Package",
                    "bash"
                ),

                paragraph(
                    "这种写法有一个好处：明确告诉 Python，你希望使用当前 python 对应环境中的 pip。"
                ),

                callout(
                    "推荐习惯",
                    "在学习和项目开发阶段，推荐优先熟悉 python -m pip，而不是完全依赖系统中单独的 pip 命令。这样更容易确认 pip 属于当前 Python 环境。"
                ),

                practice(
                    "练习 61：模块方式运行",
                    "创建一个简单模块，然后分别尝试使用 python 文件名.py 和 python -m 模块名运行它。"
                ),

                concepts([
                    "python file.py：直接运行文件",
                    "python -m module：以模块方式运行",
                    "python -m pip：使用当前 Python 环境中的 pip",
                    "大型项目中经常使用模块方式运行"
                ])
            ]
        ),


        /* =================================================
           07
        ================================================= */

        lesson(
            "py-06-07",

            "pip 与第三方 Package",

            "理解 Python 标准库、第三方 Package、依赖和 requirements.txt。",

            [

                paragraph(
                    "Python 本身已经提供了非常丰富的标准库，例如 math、datetime、json、pathlib、random 等。"
                ),

                code(
                    `import math
import random
import datetime
import json

print(math.sqrt(16))
print(random.randint(1, 10))`,
                    "标准库"
                ),

                paragraph(
                    "但现实世界的 Python 项目通常还需要大量第三方 Package。例如 HTTP 请求、Web 开发、数据分析、机器学习、图像处理等领域都有大量优秀的社区库。"
                ),

                diagram(
                    "Python Package 生态",
                    `
<div class="ds-diagram package-ecosystem">

    <div class="ecosystem-center">
        Python
    </div>

    <div class="ecosystem-items">

        <span>标准库</span>
        <span>Web</span>
        <span>数据分析</span>
        <span>AI</span>
        <span>图像处理</span>
        <span>自动化</span>

    </div>

</div>
                    `,
                    "Python 的生态系统包含标准库和大量第三方 Package。"
                ),

                paragraph(
                    "pip 是 Python 生态中最常见的 Package 管理工具之一。"
                ),

                code(
                    `python -m pip install requests`,
                    "安装第三方 Package",
                    "bash"
                ),

                paragraph(
                    "安装以后，就可以在 Python 中使用。"
                ),

                code(
                    `import requests

print(requests.__version__)`,
                    "使用 requests"
                ),

                paragraph(
                    "可以查看已经安装的 Package。"
                ),

                code(
                    `python -m pip list`,
                    "查看已安装 Package",
                    "bash"
                ),

                paragraph(
                    "也可以查看某一个 Package 的详细信息。"
                ),

                code(
                    `python -m pip show requests`,
                    "查看 Package 信息",
                    "bash"
                ),

                paragraph(
                    "真实项目中最重要的问题之一，是如何告诉别人：这个项目到底依赖哪些 Package？"
                ),

                paragraph(
                    "一个常见的做法就是使用 requirements.txt。"
                ),

                code(
                    `requests==2.32.5
fastapi==0.116.1
uvicorn==0.35.0`,
                    "requirements.txt"
                ),

                paragraph(
                    "其他开发者拿到项目以后，就可以根据这个文件安装依赖。"
                ),

                code(
                    `python -m pip install -r requirements.txt`,
                    "安装项目依赖",
                    "bash"
                ),

                concepts([
                    "标准库：Python 自带",
                    "第三方 Package：社区提供",
                    "pip：常见 Package 管理工具",
                    "pip list：查看安装列表",
                    "pip show：查看 Package 信息",
                    "requirements.txt：记录项目依赖"
                ]),

                practice(
                    "练习 62：安装一个 Package",
                    "安装 requests，并查看它的版本。"
                ),

                practice(
                    "练习 63：创建 requirements.txt",
                    "创建一个 requirements.txt，记录你的项目需要的第三方 Package。"
                ),

                note(
                    "重要",
                    "requirements.txt 只是记录依赖的一种常见方式。现代 Python 项目还存在 pyproject.toml 等更现代的项目配置方式，后面的课程可以继续学习。"
                )
            ]
        ),


        /* =================================================
           08
        ================================================= */

        lesson(
            "py-06-08",

            "虚拟环境：让不同项目互不干扰",

            "理解 .venv、项目隔离和依赖环境。",

            [

                paragraph(
                    "假设你的电脑上同时有两个 Python 项目。项目 A 需要 requests 的旧版本，而项目 B 需要新版本。如果所有 Package 都安装到同一个全局 Python 环境中，就可能发生版本冲突。"
                ),

                diagram(
                    "为什么需要虚拟环境",
                    `
<div class="ds-diagram venv-diagram">

    <div class="venv-global">
        <strong>系统 Python</strong>
        <span>所有项目混在一起</span>
    </div>

    <div class="venv-arrow">
        ↓
    </div>

    <div class="venv-projects">

        <div>
            <strong>项目 A</strong>
            <span>.venv</span>
            <small>requests 旧版本</small>
        </div>

        <div>
            <strong>项目 B</strong>
            <span>.venv</span>
            <small>requests 新版本</small>
        </div>

    </div>

</div>
                    `,
                    "虚拟环境让不同项目拥有相对独立的 Python 依赖环境。"
                ),

                paragraph(
                    "创建虚拟环境非常简单。"
                ),

                code(
                    `python -m venv .venv`,
                    "创建虚拟环境",
                    "bash"
                ),

                paragraph(
                    "执行之后，项目目录中通常会出现 .venv 目录。"
                ),

                code(
                    `my_project/
│
├── .venv/
├── main.py
├── requirements.txt
└── README.md`,
                    "项目结构",
                    "text"
                ),

                paragraph(
                    "激活虚拟环境的命令会根据操作系统不同而有所区别。Windows PowerShell 通常使用："
                ),

                code(
                    `.venv\\Scripts\\Activate.ps1`,
                    "Windows PowerShell",
                    "powershell"
                ),

                paragraph(
                    "Windows CMD 可以使用："
                ),

                code(
                    `.venv\\Scripts\\activate.bat`,
                    "Windows CMD",
                    "bat"
                ),

                paragraph(
                    "macOS 和 Linux 通常使用："
                ),

                code(
                    `source .venv/bin/activate`,
                    "macOS / Linux",
                    "bash"
                ),

                paragraph(
                    "激活之后安装的 Package 会进入这个项目对应的环境，而不是简单地污染系统环境。"
                ),

                code(
                    `python -m pip install requests`,
                    "安装项目依赖",
                    "bash"
                ),

                paragraph(
                    "完成项目以后，可以把当前环境中的依赖保存下来。"
                ),

                code(
                    `python -m pip freeze > requirements.txt`,
                    "导出依赖",
                    "bash"
                ),

                paragraph(
                    "以后在另一台机器上创建新的虚拟环境，再执行："
                ),

                code(
                    `python -m pip install -r requirements.txt`,
                    "恢复项目依赖",
                    "bash"
                ),

                paragraph(
                    "这样就形成了一个非常经典的 Python 项目工作流。"
                ),

                diagram(
                    "Python 项目环境工作流",
                    `
<div class="ds-diagram environment-flow">

    <div class="environment-step">
        <strong>创建项目</strong>
        <span>mkdir project</span>
    </div>

    <div class="environment-arrow">
        →
    </div>

    <div class="environment-step">
        <strong>创建 .venv</strong>
        <span>python -m venv .venv</span>
    </div>

    <div class="environment-arrow">
        →
    </div>

    <div class="environment-step">
        <strong>安装依赖</strong>
        <span>pip install</span>
    </div>

    <div class="environment-arrow">
        →
    </div>

    <div class="environment-step">
        <strong>记录依赖</strong>
        <span>requirements.txt</span>
    </div>

</div>
                    `,
                    "这是非常典型的 Python 项目环境管理流程。"
                ),

                concepts([
                    "虚拟环境用于隔离项目依赖",
                    "python -m venv .venv 创建虚拟环境",
                    ".venv 是非常常见的目录名称",
                    "不同项目可以拥有不同依赖版本",
                    "requirements.txt 可以记录依赖"
                ]),

                practice(
                    "练习 64：创建项目环境",
                    "为一个新的 Python 项目创建 .venv，并安装一个第三方 Package。"
                ),

                practice(
                    "练习 65：保存项目依赖",
                    "使用 pip freeze 将当前环境中的依赖保存到 requirements.txt。"
                ),

                thinking(
                    "思考",
                    "如果一个项目可以正常运行，但换到另一台电脑就无法运行，你觉得问题可能在哪里？虚拟环境和 requirements.txt 分别解决了什么问题？"
                )
            ]
        ),


        /* =================================================
           09
        ================================================= */

        lesson(
            "py-06-09",

            "综合项目：搭建一个多文件 Python 程序",

            "把 Module、Package、函数、数据结构和程序入口组合成一个真正的小型项目。",

            [

                paragraph(
                    "前面的内容都是单独学习模块、Package、pip 和虚拟环境。现在把它们组合起来。"
                ),

                paragraph(
                    "我们制作一个简单的“学生成绩分析器”。项目结构如下："
                ),

                code(
                    `student_app/
│
├── .venv/
│
├── main.py
│
├── analysis/
│   ├── __init__.py
│   └── scores.py
│
├── data/
│   ├── __init__.py
│   └── students.py
│
└── requirements.txt`,
                    "项目结构",
                    "text"
                ),

                paragraph(
                    "data/students.py 负责保存学生数据。"
                ),

                code(
                    `students = [
    {
        "name": "Alice",
        "scores": [90, 95, 88]
    },
    {
        "name": "Bob",
        "scores": [82, 86, 91]
    },
    {
        "name": "Charlie",
        "scores": [95, 97, 94]
    }
]`,
                    "data/students.py"
                ),

                paragraph(
                    "analysis/scores.py 负责成绩计算。"
                ),

                code(
                    `def average(scores):

    return sum(scores) / len(scores)


def highest_score(scores):

    return max(scores)


def lowest_score(scores):

    return min(scores)`,
                    "analysis/scores.py"
                ),

                paragraph(
                    "main.py 负责组织整个程序。"
                ),

                code(
                    `from data.students import students

from analysis.scores import (
    average,
    highest_score,
    lowest_score
)


def main():

    for student in students:

        scores = student["scores"]

        avg = average(scores)

        high = highest_score(scores)

        low = lowest_score(scores)

        print(
            student["name"],
            "平均分：",
            round(avg, 2),
            "最高：",
            high,
            "最低：",
            low
        )


if __name__ == "__main__":
    main()`,
                    "main.py"
                ),

                paragraph(
                    "现在这个程序已经不再是一个简单的单文件脚本，而是一个真正具有基本项目结构的 Python 程序。"
                ),

                diagram(
                    "完整项目结构",
                    `
<div class="ds-diagram project-architecture">

    <div class="project-root">
        student_app
    </div>

    <div class="project-columns">

        <div class="project-column">
            <strong>main.py</strong>
            <span>程序入口</span>
        </div>

        <div class="project-column">
            <strong>data</strong>
            <span>学生数据</span>
        </div>

        <div class="project-column">
            <strong>analysis</strong>
            <span>成绩分析</span>
        </div>

        <div class="project-column">
            <strong>.venv</strong>
            <span>项目环境</span>
        </div>

    </div>

</div>
                    `,
                    "一个项目通常可以按照数据、业务逻辑、入口和环境等职责进行组织。"
                ),

                callout(
                    "从这一章开始",
                    "你已经从“写 Python 代码”开始进入“组织 Python 项目”。这是从初学者走向真正开发的重要一步。"
                ),

                practice(
                    "综合练习：重构一个旧项目",
                    "选择前面写过的一个程序，把它拆成至少两个 Module，并使用 main() 作为程序入口。"
                ),

                practice(
                    "综合练习：建立自己的 tools Package",
                    "创建 tools package，加入 calculator.py、text.py 和 date.py，并在 main.py 中分别调用。"
                ),

                checklist([
                    "我理解什么是 Module",
                    "我知道一个 .py 文件可以成为 Module",
                    "我会使用 import",
                    "我会使用 from ... import",
                    "我理解 alias",
                    "我理解模块名称空间",
                    "我理解 Package",
                    "我知道如何从 Package 导入 Module",
                    "我理解 __name__",
                    "我会使用 if __name__ == '__main__'",
                    "我知道 python -m 的基本作用",
                    "我知道标准库和第三方 Package 的区别",
                    "我会使用 pip 安装 Package",
                    "我知道 requirements.txt 的作用",
                    "我理解虚拟环境",
                    "我会创建 .venv",
                    "我能组织一个基本的多文件 Python 项目"
                ]),

                note(
                    "下一章",
                    "下一章将进入 Python 标准库。你会开始真正认识 Python 自带的工具箱：pathlib、datetime、json、random、collections、itertools 等，并学习如何利用标准库减少重复造轮子。"
                )
            ]
        )

    ]
};


/* =========================================================
   默认导出
========================================================= */

export default chapter06;