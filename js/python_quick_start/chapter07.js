/* =========================================================
   PYTHON QUICK START
   chapter07.js

   第七章：Python 标准库

   核心思想：

   不背标准库 API。

   真正需要建立的是：

   1. 标准库是什么
   2. 标准库如何按问题领域组织
   3. 遇到问题应该去哪里找
   4. 如何阅读模块文档
   5. 如何组合多个标准库解决真实问题

   ---------------------------------------------------------
   Python 标准库不是“函数列表”。

   它更像：

       Python
          │
          ├── 文件与目录
          ├── 时间与日期
          ├── 数据格式
          ├── 数据结构
          ├── 文本处理
          ├── 数学与统计
          ├── 迭代与函数工具
          ├── 系统与运行环境
          ├── 网络
          ├── 并发
          └── 开发辅助

   学习目标：

   不是记住所有模块。

   而是：

       “我知道这个问题应该去哪里找。”
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


const chapter07 = {

    id: "chapter-07",

    number: "07",

    title: "Python 标准库",

    englishTitle: "The Python Standard Library",

    description:
        "不要把标准库学成函数大全。本章从整体视角理解 Python 标准库：它解决什么问题、如何按领域组织、如何查找和组合工具，以及如何利用标准库完成真实任务。",


    sections: [

        /* =====================================================
           01
        ===================================================== */

        lesson(
            "py-07-01",

            "标准库是什么？",

            "先不要记函数。先理解 Python 为什么自带这么多工具，以及“标准库”到底意味着什么。",

            [

                paragraph(
                    "学习 Python 到这里，你已经可以自己编写函数、组织数据结构、处理字符串、读写文件，并把程序拆分成多个模块。接下来会遇到一个非常现实的问题：很多事情其实不应该从零开始写。"
                ),

                paragraph(
                    "例如，你想计算平方根、处理日期、扫描目录、读取 JSON、统计词频、匹配文本、生成随机数据、处理命令行参数。Python 本身已经提供了大量经过长期使用和维护的工具。"
                ),

                paragraph(
                    "这些随 Python 一起提供的模块和包，构成了 Python 标准库（The Python Standard Library）。"
                ),

                diagram(
                    "Python 的三层工具世界",
                    `
                    <div class="stdlib-layer-diagram">

                        <div class="stdlib-layer">
                            <div class="stdlib-layer-title">你的程序</div>
                            <div class="stdlib-layer-desc">
                                你自己编写的业务代码
                            </div>
                        </div>

                        <div class="stdlib-arrow">↓</div>

                        <div class="stdlib-layer stdlib-highlight">
                            <div class="stdlib-layer-title">
                                Python 标准库
                            </div>
                            <div class="stdlib-layer-desc">
                                随 Python 提供的通用工具
                            </div>

                            <div class="stdlib-tags">
                                <span>pathlib</span>
                                <span>json</span>
                                <span>datetime</span>
                                <span>collections</span>
                                <span>re</span>
                                <span>itertools</span>
                            </div>
                        </div>

                        <div class="stdlib-arrow">↓</div>

                        <div class="stdlib-layer">
                            <div class="stdlib-layer-title">
                                Python 运行时
                            </div>
                            <div class="stdlib-layer-desc">
                                Python 本身提供的语言与运行环境
                            </div>
                        </div>

                    </div>
                    `
                ),

                callout(
                    "一个重要观念",
                    "标准库不是 Python 的“附加插件”。它是 Python 生态的重要组成部分。学习 Python 的过程中，真正重要的不是把标准库里的函数全部背下来，而是逐渐建立一张“工具地图”。"
                ),

                concepts([
                    "标准库：随 Python 提供的模块和包",
                    "第三方库：需要额外安装的 Python 包",
                    "自己的代码：针对具体业务编写的程序",
                    "标准库解决大量通用问题",
                    "真正重要的是建立问题 → 工具的映射"
                ]),

                code(
                    `# 不需要自己实现一个 JSON 解析器
import json

data = json.loads('{"name": "Alice", "age": 18}')

print(data["name"])
print(data["age"])`,
                    "标准库已经解决的问题"
                ),

                thinking(
                    "思考：为什么不应该重新造轮子？",
                    "如果 Python 已经提供了一个成熟的工具，那么自己重新实现通常意味着更多代码、更多测试工作以及更多潜在错误。专业开发中，知道什么时候复用已有工具，本身就是一种能力。"
                ),

                practice(
                    "练习 51：寻找标准库",
                    "下面这些问题，你觉得应该优先寻找哪个标准库？不要查函数名，只判断领域：计算平方根、读取 JSON、处理日期、扫描目录、统计词频、匹配文本。"
                )

            ]
        ),


        /* =====================================================
           02
        ===================================================== */

        lesson(
            "py-07-02",

            "不要背函数：建立标准库地图",

            "从“记 API”升级到“按问题寻找工具”。这是学习标准库最重要的一步。",

            [

                paragraph(
                    "标准库非常大。即使是经验丰富的 Python 开发者，也不会试图记住每一个函数、参数和类。更合理的方法是记住不同模块解决什么类型的问题。"
                ),

                paragraph(
                    "例如，当你看到“路径”这个问题时，会想到 pathlib；看到“JSON”时，会想到 json；看到“正则表达式”时，会想到 re；看到“词频统计”时，会想到 collections。具体函数叫什么，可以在需要的时候查文档。"
                ),

                diagram(
                    "问题 → 标准库",
                    `
                    <div class="stdlib-map">

                        <div class="stdlib-map-column">
                            <div class="stdlib-map-title">我遇到的问题</div>

                            <div class="stdlib-map-item">处理文件路径</div>
                            <div class="stdlib-map-item">处理日期</div>
                            <div class="stdlib-map-item">读取 JSON</div>
                            <div class="stdlib-map-item">统计频率</div>
                            <div class="stdlib-map-item">匹配文本</div>
                            <div class="stdlib-map-item">生成随机数据</div>
                            <div class="stdlib-map-item">遍历目录</div>
                        </div>

                        <div class="stdlib-map-arrow">
                            →
                        </div>

                        <div class="stdlib-map-column">
                            <div class="stdlib-map-title">想到的模块</div>

                            <div class="stdlib-map-item strong">pathlib</div>
                            <div class="stdlib-map-item strong">datetime</div>
                            <div class="stdlib-map-item strong">json</div>
                            <div class="stdlib-map-item strong">collections</div>
                            <div class="stdlib-map-item strong">re</div>
                            <div class="stdlib-map-item strong">random</div>
                            <div class="stdlib-map-item strong">pathlib</div>
                        </div>

                    </div>
                    `
                ),

                concepts([
                    "路径 → pathlib",
                    "文件系统与环境 → os",
                    "程序参数与解释器环境 → sys",
                    "日期时间 → datetime",
                    "JSON → json",
                    "CSV → csv",
                    "正则表达式 → re",
                    "词频和计数 → collections",
                    "统计 → statistics",
                    "数学 → math",
                    "随机与抽样 → random",
                    "高效迭代 → itertools",
                    "函数工具 → functools"
                ]),

                note(
                    "不要追求“全记住”",
                    "标准库的正确学习方式更接近地图导航：知道目的地属于哪个区域，到了以后再看具体道路。"
                ),

                practice(
                    "练习 52：标准库地图",
                    "为下面的问题选择合适的标准库领域：扫描目录、读取 JSON、计算平均值、查找文本模式、处理日期、统计元素出现次数。"
                ),

                practice(
                    "练习 53：反向思考",
                    "看到 pathlib、json、datetime、re、collections 这些名字时，分别说出它们主要解决什么问题。"
                ),

                thinking(
                    "为什么经验丰富的程序员仍然查文档？",
                    "因为软件开发中的知识不是“永远记住所有 API”，而是知道问题在哪里、如何搜索、如何验证，以及如何阅读官方文档。"
                )

            ]
        ),


        /* =====================================================
           03
        ===================================================== */

        lesson(
            "py-07-03",

            "如何阅读标准库文档",

            "真正掌握标准库的方法，是学会从模块名称进入文档，再找到需要的工具。",

            [

                paragraph(
                    "当你需要一个标准库功能时，不应该首先问自己：“这个函数是不是叫 xxx？”更好的思路是先明确问题，再寻找模块。"
                ),

                paragraph(
                    "例如，你想完成“找出某个目录下所有 Python 文件”。你首先知道这是一个文件路径和目录遍历问题，因此可以从 pathlib 开始。"
                ),

                code(
                    `from pathlib import Path

root = Path("project")

for path in root.glob("*.py"):
    print(path)`,
                    "从问题找到工具"
                ),

                paragraph(
                    "如果你不知道 glob 的参数，也没有关系。查看 pathlib 的官方文档，确认 glob 的行为、参数以及返回值。"
                ),

                diagram(
                    "标准库学习路径",
                    `
                    <div class="stdlib-workflow">

                        <div class="stdlib-step">
                            <span class="stdlib-step-number">1</span>
                            <strong>明确问题</strong>
                            <small>我到底要完成什么？</small>
                        </div>

                        <div class="stdlib-workflow-arrow">→</div>

                        <div class="stdlib-step">
                            <span class="stdlib-step-number">2</span>
                            <strong>判断领域</strong>
                            <small>文件？时间？文本？数据？</small>
                        </div>

                        <div class="stdlib-workflow-arrow">→</div>

                        <div class="stdlib-step">
                            <span class="stdlib-step-number">3</span>
                            <strong>找到模块</strong>
                            <small>例如 pathlib / json / re</small>
                        </div>

                        <div class="stdlib-workflow-arrow">→</div>

                        <div class="stdlib-step">
                            <span class="stdlib-step-number">4</span>
                            <strong>查文档</strong>
                            <small>确认 API 与参数</small>
                        </div>

                        <div class="stdlib-workflow-arrow">→</div>

                        <div class="stdlib-step">
                            <span class="stdlib-step-number">5</span>
                            <strong>小实验</strong>
                            <small>先写最小可运行代码</small>
                        </div>

                    </div>
                    `
                ),

                callout(
                    "专业开发者的工作方式",
                    "记住模块解决什么问题，比记住几十个函数名更有价值。具体 API 可以查，但问题分类能力需要自己建立。"
                ),

                code(
                    `from pathlib import Path

path = Path("data/example.txt")

print("存在：", path.exists())
print("文件：", path.is_file())
print("目录：", path.is_dir())
print("名称：", path.name)
print("后缀：", path.suffix)`,
                    "通过实验理解 API"
                ),

                practice(
                    "练习 54：查文档解决问题",
                    "尝试不用搜索具体代码，只先找到 pathlib，然后查找“列出目录内容”的 API，再写一个最小示例。"
                ),

                thinking(
                    "API 是需要背的吗？",
                    "常用 API 会自然熟悉，但不要把“记 API”当作学习标准库的目标。真正的能力是：遇到问题 → 找到模块 → 查到 API → 写出最小实验 → 组合进程序。"
                )

            ]
        ),


        /* =====================================================
           04
        ===================================================== */

        lesson(
            "py-07-04",

            "文件系统：pathlib 与 os",

            "文件系统是标准库中最值得掌握的领域之一。重点不是背函数，而是理解 Python 如何描述文件和目录。",

            [

                paragraph(
                    "程序经常需要处理文件：读取配置、寻找图片、遍历目录、创建输出文件夹、判断文件是否存在。现代 Python 中，pathlib 是处理路径的重要工具。"
                ),

                paragraph(
                    "可以把 Path 理解成一个“路径对象”。它不仅保存路径文本，还提供了大量与文件系统操作相关的方法。"
                ),

                code(
                    `from pathlib import Path

project = Path("project")

print(project)
print(project.exists())
print(project.resolve())`,
                    "Path 对象"
                ),

                code(
                    `from pathlib import Path

root = Path("data")

for path in root.iterdir():
    print(path)`,
                    "遍历目录"
                ),

                code(
                    `from pathlib import Path

root = Path("data")

for path in root.rglob("*.json"):
    print(path)`,
                    "递归寻找文件"
                ),

                diagram(
                    "文件系统视角",
                    `
                    <div class="filesystem-diagram">

                        <div class="fs-folder">
                            <div class="fs-name">project/</div>

                            <div class="fs-folder">
                                <div class="fs-name">data/</div>

                                <div class="fs-file">users.json</div>
                                <div class="fs-file">orders.json</div>
                            </div>

                            <div class="fs-folder">
                                <div class="fs-name">images/</div>

                                <div class="fs-file">logo.png</div>
                                <div class="fs-file">cover.jpg</div>
                            </div>

                            <div class="fs-file">main.py</div>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "os 仍然非常重要。它提供了与操作系统环境相关的能力，例如环境变量、当前工作目录以及底层系统接口。"
                ),

                code(
                    `import os

print(os.getcwd())

print(os.environ.get("PATH"))`,
                    "访问操作系统环境"
                ),

                note(
                    "pathlib 与 os 的关系",
                    "pathlib 更适合表达现代 Python 程序中的路径操作；os 则更偏向操作系统环境和系统接口。两者不是简单的“谁替代谁”。"
                ),

                practice(
                    "练习 55：目录分析器",
                    "编写程序扫描一个目录，统计其中有多少个 .py、.json、.txt 文件。"
                ),

                practice(
                    "练习 56：项目文件检查器",
                    "给定一个项目目录，检查 README.md、requirements.txt 和 src 目录是否存在。"
                )

            ]
        ),


        /* =====================================================
           05
        ===================================================== */

        lesson(
            "py-07-05",

            "数据交换：json 与 csv",

            "程序很少只处理自己内部的数据。标准库提供了大量数据交换工具，其中 JSON 和 CSV 是非常重要的两个领域。",

            [

                paragraph(
                    "当程序需要把数据保存下来，或者和其他程序交换数据时，就需要一种共同的数据格式。JSON 和 CSV 是实际开发中非常常见的格式。"
                ),

                diagram(
                    "程序内部数据与外部文件",
                    `
                    <div class="data-format-diagram">

                        <div class="data-format-box">
                            <strong>Python 对象</strong>
                            <small>dict / list / str / int</small>
                        </div>

                        <div class="data-format-arrow">↔</div>

                        <div class="data-format-box highlight">
                            <strong>JSON</strong>
                            <small>适合结构化数据交换</small>
                        </div>

                        <div class="data-format-arrow">↔</div>

                        <div class="data-format-box">
                            <strong>其他程序</strong>
                            <small>Web / 服务 / 配置</small>
                        </div>

                    </div>
                    `
                ),

                code(
                    `import json

user = {
    "name": "Alice",
    "age": 18,
    "courses": ["Python", "Math"]
}

text = json.dumps(user, ensure_ascii=False)

print(text)`,
                    "Python 对象 → JSON"
                ),

                code(
                    `import json

text = '{"name": "Alice", "age": 18}'

user = json.loads(text)

print(user["name"])
print(user["age"])`,
                    "JSON → Python 对象"
                ),

                code(
                    `import json

data = {
    "name": "Alice",
    "scores": [90, 85, 92]
}

with open("student.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)`,
                    "保存 JSON 文件"
                ),

                paragraph(
                    "CSV 则更适合表格型数据。例如学生成绩、商品列表、销售记录等。标准库中的 csv 模块可以帮助我们读取和写入这类数据。"
                ),

                code(
                    `import csv

rows = [
    ["name", "score"],
    ["Alice", 92],
    ["Bob", 85],
    ["Charlie", 96]
]

with open("scores.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(rows)`,
                    "写入 CSV"
                ),

                concepts([
                    "JSON：结构化、层级化的数据",
                    "CSV：表格型、行列式的数据",
                    "json.dumps：Python 对象转换成 JSON 字符串",
                    "json.loads：JSON 字符串转换成 Python 对象",
                    "json.dump：写入 JSON 文件",
                    "csv：处理表格数据"
                ]),

                practice(
                    "练习 57：学生数据",
                    "创建一个包含多名学生姓名、年龄和成绩的列表，将它保存为 JSON。"
                ),

                practice(
                    "练习 58：成绩 CSV",
                    "读取一个 CSV 成绩表，计算所有学生的平均分。"
                )

            ]
        ),


        /* =====================================================
           06
        ===================================================== */

        lesson(
            "py-07-06",

            "文本处理：re 与字符串工具",

            "当普通字符串方法不够用时，正则表达式提供了另一种描述文本模式的方法。",

            [

                paragraph(
                    "前面的章节已经学习过大量字符串方法，例如 split、replace、find、startswith 和 endswith。很多日常文本处理其实已经可以用这些方法解决。"
                ),

                paragraph(
                    "但是，当问题变成“寻找符合某种模式的文本”时，正则表达式（Regular Expression）会非常有用。Python 标准库通过 re 模块提供正则表达式支持。"
                ),

                diagram(
                    "字符串处理的层次",
                    `
                    <div class="text-tools-diagram">

                        <div class="text-tool-card">
                            <strong>第一层</strong>
                            <span>字符串方法</span>
                            <small>split / replace / find</small>
                        </div>

                        <div class="text-tool-arrow">→</div>

                        <div class="text-tool-card">
                            <strong>第二层</strong>
                            <span>结构化处理</span>
                            <small>列表 / 字典 / 循环</small>
                        </div>

                        <div class="text-tool-arrow">→</div>

                        <div class="text-tool-card highlight">
                            <strong>第三层</strong>
                            <span>模式匹配</span>
                            <small>re</small>
                        </div>

                    </div>
                    `
                ),

                code(
                    `import re

text = "联系邮箱：alice@example.com"

pattern = r"[\\w.-]+@[\\w.-]+"

match = re.search(pattern, text)

if match:
    print(match.group())`,
                    "寻找文本模式"
                ),

                code(
                    `import re

text = """
Alice: 18
Bob: 20
Charlie: 19
"""

numbers = re.findall(r"\\d+", text)

print(numbers)`,
                    "寻找所有数字"
                ),

                paragraph(
                    "正则表达式非常强大，但也容易写得复杂。因此一个重要原则是：如果普通字符串方法已经足够清晰，就不要为了使用 re 而使用 re。"
                ),

                note(
                    "工具选择原则",
                    "能用简单字符串操作解决的问题，优先保持简单；只有当问题确实是“模式匹配”时，再考虑正则表达式。"
                ),

                practice(
                    "练习 59：邮箱提取",
                    "从一段文本中提取可能出现的邮箱地址。"
                ),

                practice(
                    "练习 60：日志分析",
                    "从日志文本中找出所有数字状态码，例如 200、404、500。"
                ),

                thinking(
                    "为什么正则表达式不是越复杂越好？",
                    "代码首先应该服务于理解和维护。如果一个简单的 split 就可以完成任务，那么复杂的正则表达式反而降低了程序可读性。"
                )

            ]
        ),


        /* =====================================================
           07
        ===================================================== */

        lesson(
            "py-07-07",

            "collections：标准库如何补强数据结构",

            "标准库并不只是提供独立函数，它还会补充 Python 基础数据结构，让常见问题表达得更加自然。",

            [

                paragraph(
                    "Python 已经有 list、tuple、dict、set 四种非常重要的数据结构。但真实开发中，有些问题会反复出现，例如计数、队列、带默认值的字典等。"
                ),

                paragraph(
                    "collections 模块就是标准库中专门解决这类问题的一个重要工具箱。"
                ),

                code(
                    `from collections import Counter

words = [
    "python",
    "java",
    "python",
    "go",
    "python",
    "java"
]

counter = Counter(words)

print(counter)
print(counter["python"])
print(counter.most_common(2))`,
                    "Counter：计数"
                ),

                code(
                    `from collections import defaultdict

scores = defaultdict(list)

scores["Alice"].append(90)
scores["Alice"].append(95)
scores["Bob"].append(88)

print(dict(scores))`,
                    "defaultdict：减少初始化代码"
                ),

                code(
                    `from collections import deque

queue = deque()

queue.append("A")
queue.append("B")
queue.append("C")

print(queue.popleft())
print(queue.popleft())`,
                    "deque：高效队列"
                ),

                diagram(
                    "collections 的思路",
                    `
                    <div class="collections-diagram">

                        <div class="collections-item">
                            <strong>Counter</strong>
                            <span>我想统计“出现了多少次”</span>
                        </div>

                        <div class="collections-item">
                            <strong>defaultdict</strong>
                            <span>我不想反复判断 key 是否存在</span>
                        </div>

                        <div class="collections-item">
                            <strong>deque</strong>
                            <span>我需要高效地从两端进出数据</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "注意：collections 不是为了替代 list 和 dict，而是在常见场景中提供更合适的抽象。"
                ),

                practice(
                    "练习 61：词频统计",
                    "统计一段文本中每个单词出现的次数，并找出出现次数最多的 5 个单词。"
                ),

                practice(
                    "练习 62：任务队列",
                    "使用 deque 模拟一个简单任务队列：不断加入任务，然后从队首依次取出。"
                ),

                concepts([
                    "Counter：计数和频率统计",
                    "defaultdict：带默认值的字典",
                    "deque：双端队列",
                    "collections 的价值在于表达常见数据处理模式"
                ])

            ]
        ),


        /* =====================================================
           08
        ===================================================== */

        lesson(
            "py-07-08",

            "itertools 与 functools：处理程序中的“重复模式”",

            "标准库还有一类工具，不是为了某一个业务，而是为了让程序中的通用计算模式更加简洁。",

            [

                paragraph(
                    "当程序开始变复杂后，你会发现很多代码其实是在反复处理“遍历”“组合”“累积”“转换”“缓存”等模式。Python 标准库提供了 itertools 和 functools 等模块来帮助解决这些问题。"
                ),

                paragraph(
                    "这一部分不要求你现在记住所有工具。你需要先知道：Python 标准库里存在专门处理这些问题的工具。以后遇到类似场景，可以回来查。"
                ),

                code(
                    `from itertools import combinations

items = ["A", "B", "C", "D"]

for pair in combinations(items, 2):
    print(pair)`,
                    "itertools：组合"
                ),

                code(
                    `from itertools import chain

a = [1, 2]
b = [3, 4]

for value in chain(a, b):
    print(value)`,
                    "itertools：连接迭代对象"
                ),

                code(
                    `from functools import reduce

numbers = [1, 2, 3, 4]

result = reduce(
    lambda a, b: a + b,
    numbers
)

print(result)`,
                    "functools：累积计算"
                ),

                note(
                    "现在不需要背",
                    "itertools 和 functools 的学习重点是认识它们解决的问题。真正遇到排列、组合、迭代器组合、缓存等需求时，再查具体 API。"
                ),

                diagram(
                    "标准库中的抽象层",
                    `
                    <div class="stdlib-abstraction">

                        <div class="abstraction-level">
                            <strong>基础语言</strong>
                            <span>for / if / function</span>
                        </div>

                        <div class="abstraction-arrow">↓</div>

                        <div class="abstraction-level">
                            <strong>数据结构</strong>
                            <span>list / dict / set / tuple</span>
                        </div>

                        <div class="abstraction-arrow">↓</div>

                        <div class="abstraction-level highlight">
                            <strong>标准库抽象</strong>
                            <span>itertools / functools / collections</span>
                        </div>

                        <div class="abstraction-arrow">↓</div>

                        <div class="abstraction-level">
                            <strong>业务程序</strong>
                            <span>组合这些工具解决真实问题</span>
                        </div>

                    </div>
                    `
                ),

                practice(
                    "练习 63：两两组合",
                    "给定一组学生姓名，使用 itertools 找出所有两两组合。"
                ),

                thinking(
                    "为什么标准库需要提供这些高级工具？",
                    "因为很多程序反复出现相同的计算模式。标准库把这些模式封装起来，让代码可以表达“我要做什么”，而不是重复编写底层细节。"
                )

            ]
        ),


        /* =====================================================
           09
        ===================================================== */

        lesson(
            "py-07-09",

            "数学、随机、统计：不要自己实现基础工具",

            "理解 math、random、statistics 的共同意义：标准库已经为大量通用计算提供了可靠实现。",

            [

                paragraph(
                    "math、random 和 statistics 看起来是三个不同模块，但从更高层看，它们都属于“通用计算工具”。"
                ),

                code(
                    `import math

print(math.sqrt(25))
print(math.floor(3.8))
print(math.ceil(3.2))
print(math.pi)`,
                    "math：数学工具"
                ),

                code(
                    `import statistics

numbers = [10, 20, 30, 40, 50]

print(statistics.mean(numbers))
print(statistics.median(numbers))`,
                    "statistics：统计工具"
                ),

                code(
                    `import random

items = ["A", "B", "C", "D"]

print(random.choice(items))`,
                    "random：随机工具"
                ),

                paragraph(
                    "这里最值得注意的不是记住 sqrt、floor、ceil、mean、median、choice 这些名字，而是理解：标准库已经把大量常见问题包装成可以直接使用的工具。"
                ),

                callout(
                    "一个程序员的习惯",
                    "当你准备自己实现一个数学算法、随机抽样算法或者统计计算时，先问一句：Python 标准库是否已经提供了成熟工具？"
                ),

                practice(
                    "练习 64：成绩报告",
                    "使用 statistics 对一组成绩计算平均值和中位数，再输出最高分和最低分。"
                ),

                practice(
                    "练习 65：随机模拟",
                    "模拟抛硬币 1000 次，统计正面和反面分别出现多少次。"
                )

            ]
        ),


        /* =====================================================
           10
        ===================================================== */

        lesson(
            "py-07-10",

            "datetime：时间不是一个数字",

            "时间处理看似简单，实际上包含日期、时间、时区、时间间隔等多个概念。",

            [

                paragraph(
                    "初学者经常把时间理解成一个数字，例如“2026 年 10 月 5 日”。但程序中的时间远不只是一个数字。它涉及日期、时刻、时间间隔、格式化以及时区等概念。"
                ),

                code(
                    `from datetime import datetime

now = datetime.now()

print(now)
print(now.year)
print(now.month)
print(now.day)`,
                    "当前日期和时间"
                ),

                code(
                    `from datetime import date, timedelta

today = date.today()

tomorrow = today + timedelta(days=1)

print("今天：", today)
print("明天：", tomorrow)`,
                    "日期与时间间隔"
                ),

                code(
                    `from datetime import datetime

text = "2026-10-05"

value = datetime.strptime(
    text,
    "%Y-%m-%d"
)

print(value)`,
                    "文本 → 日期时间"
                ),

                diagram(
                    "时间问题的几个维度",
                    `
                    <div class="datetime-diagram">

                        <div class="datetime-card">
                            <strong>date</strong>
                            <span>哪一天？</span>
                        </div>

                        <div class="datetime-card">
                            <strong>datetime</strong>
                            <span>哪一天的几点？</span>
                        </div>

                        <div class="datetime-card">
                            <strong>timedelta</strong>
                            <span>相差多长时间？</span>
                        </div>

                        <div class="datetime-card">
                            <strong>timezone</strong>
                            <span>在哪个时区？</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "当程序涉及国际化、服务器、数据库或者跨地区用户时，时间和时区会变得更加重要。这里先建立概念，不要求一次掌握所有时间 API。"
                ),

                practice(
                    "练习 66：日期计算",
                    "计算某个日期之后 30 天是哪一天。"
                ),

                practice(
                    "练习 67：日期解析",
                    "把字符串“2026-12-25”转换成日期对象，并计算距离今天还有多少天。"
                )

            ]
        ),


        /* =====================================================
           11
        ===================================================== */

        lesson(
            "py-07-11",

            "sys：程序运行在哪里？",

            "标准库不仅处理数据，也可以让程序了解自己的运行环境。",

            [

                paragraph(
                    "一个 Python 程序并不是漂浮在空中的。它运行在操作系统、Python 解释器和进程环境中。sys 模块提供了一些与 Python 运行时有关的信息和接口。"
                ),

                code(
                    `import sys

print(sys.version)
print(sys.platform)`,
                    "查看 Python 运行环境"
                ),

                code(
                    `import sys

print("命令行参数：")

for argument in sys.argv:
    print(argument)`,
                    "命令行参数"
                ),

                diagram(
                    "Python 程序的运行环境",
                    `
                    <div class="runtime-diagram">

                        <div class="runtime-box">
                            <strong>操作系统</strong>
                            <span>Windows / Linux / macOS</span>
                        </div>

                        <div class="runtime-arrow">↓</div>

                        <div class="runtime-box">
                            <strong>Python 解释器</strong>
                            <span>sys / os 等运行环境信息</span>
                        </div>

                        <div class="runtime-arrow">↓</div>

                        <div class="runtime-box highlight">
                            <strong>你的程序</strong>
                            <span>main.py</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "sys 适合让程序了解 Python 自身以及程序启动时的环境信息。os 则更偏向操作系统和进程环境。两者经常一起出现。"
                ),

                practice(
                    "练习 68：命令行信息",
                    "运行一个 Python 文件，输出 Python 版本、平台信息以及传入的命令行参数。"
                ),

                thinking(
                    "为什么程序需要知道自己的环境？",
                    "真实软件可能运行在开发电脑、服务器、容器或者不同操作系统上。程序有时需要根据运行环境决定文件路径、配置或者行为。"
                )

            ]
        ),


        /* =====================================================
           12
        ===================================================== */

        lesson(
            "py-07-12",

            "标准库不是孤立的：真正强大的是组合",

            "标准库真正的价值往往不是某一个模块，而是多个模块组合起来解决完整问题。",

            [

                paragraph(
                    "现实中的任务通常不会只需要一个模块。例如，一个“分析项目目录”的程序可能同时需要 pathlib 扫描文件、json 读取配置、collections 统计数据、datetime 生成报告时间。"
                ),

                diagram(
                    "标准库组合",
                    `
                    <div class="stdlib-composition">

                        <div class="composition-center">
                            <strong>项目分析器</strong>
                            <span>一个真实任务</span>
                        </div>

                        <div class="composition-item top">
                            <strong>pathlib</strong>
                            <span>找到文件</span>
                        </div>

                        <div class="composition-item left">
                            <strong>json</strong>
                            <span>读取配置</span>
                        </div>

                        <div class="composition-item right">
                            <strong>collections</strong>
                            <span>统计数据</span>
                        </div>

                        <div class="composition-item bottom">
                            <strong>datetime</strong>
                            <span>生成时间信息</span>
                        </div>

                    </div>
                    `
                ),

                code(
                    `from pathlib import Path
from collections import Counter
from datetime import datetime

root = Path(".")

files = list(root.rglob("*.py"))

suffixes = Counter(
    path.suffix
    for path in files
)

print("分析时间：", datetime.now())
print("Python 文件数量：", len(files))
print("文件类型：", suffixes)`,
                    "组合多个标准库"
                ),

                paragraph(
                    "这才是标准库真正值得学习的地方：不同模块各自负责一个领域，然后通过 Python 的基础语言能力把它们组合起来。"
                ),

                callout(
                    "从“函数思维”升级到“工具箱思维”",
                    "不要问“标准库里有哪些函数”。应该问“我的问题属于哪个领域？有哪些成熟工具可以组合？”"
                ),

                practice(
                    "练习 69：文件统计器",
                    "扫描一个项目目录，统计不同文件后缀的数量，并输出分析时间。"
                ),

                practice(
                    "练习 70：JSON + pathlib",
                    "扫描一个目录中的所有 JSON 文件，读取它们并统计其中出现的对象数量。"
                )

            ]
        ),


        /* =====================================================
           13
        ===================================================== */

        lesson(
            "py-07-13",

            "标准库的“地图”：现在应该认识哪些模块？",

            "不要求全部学习，但要知道标准库大致覆盖哪些领域。",

            [

                paragraph(
                    "到这里，你不需要把标准库全部学完。实际上，标准库本身非常庞大。当前阶段更重要的是建立一张可以不断扩展的地图。"
                ),

                diagram(
                    "Python 标准库地图",
                    `
                    <div class="stdlib-overview">

                        <div class="stdlib-overview-group">
                            <div class="overview-title">文件与系统</div>
                            <span>pathlib</span>
                            <span>os</span>
                            <span>sys</span>
                            <span>shutil</span>
                        </div>

                        <div class="stdlib-overview-group">
                            <div class="overview-title">数据格式</div>
                            <span>json</span>
                            <span>csv</span>
                            <span>configparser</span>
                        </div>

                        <div class="stdlib-overview-group">
                            <div class="overview-title">日期与时间</div>
                            <span>datetime</span>
                            <span>zoneinfo</span>
                            <span>time</span>
                        </div>

                        <div class="stdlib-overview-group">
                            <div class="overview-title">数据结构</div>
                            <span>collections</span>
                            <span>heapq</span>
                            <span>bisect</span>
                        </div>

                        <div class="stdlib-overview-group">
                            <div class="overview-title">文本处理</div>
                            <span>re</span>
                            <span>textwrap</span>
                            <span>string</span>
                        </div>

                        <div class="stdlib-overview-group">
                            <div class="overview-title">计算</div>
                            <span>math</span>
                            <span>statistics</span>
                            <span>decimal</span>
                        </div>

                        <div class="stdlib-overview-group">
                            <div class="overview-title">迭代与函数</div>
                            <span>itertools</span>
                            <span>functools</span>
                            <span>operator</span>
                        </div>

                        <div class="stdlib-overview-group">
                            <div class="overview-title">网络与并发</div>
                            <span>urllib</span>
                            <span>socket</span>
                            <span>asyncio</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "这张地图不是考试范围。它更像一张城市地图：你不需要记住每一条街，但以后遇到问题时，你知道应该去哪个区域寻找答案。"
                ),

                concepts([
                    "pathlib：路径与文件系统",
                    "os：操作系统接口",
                    "sys：Python 运行环境",
                    "json / csv：数据交换",
                    "datetime / zoneinfo：时间",
                    "collections：常见数据结构",
                    "re：文本模式匹配",
                    "math / statistics：数学与统计",
                    "itertools / functools：通用计算模式",
                    "urllib / socket：网络基础",
                    "asyncio：异步程序"
                ]),

                note(
                    "以后继续扩展",
                    "当你学习 Web、数据分析、自动化、网络编程或并发编程时，会不断遇到新的标准库模块。现在只需要知道它们存在，以及大概属于哪个领域。"
                ),

                practice(
                    "练习 71：建立自己的标准库地图",
                    "选择 10 个标准库模块，为每个模块写一句“它主要解决什么问题”。"
                )

            ]
        ),


        /* =====================================================
           14
        ===================================================== */

        lesson(
            "py-07-14",

            "标准库与第三方库有什么区别？",

            "理解 Python 生态的边界：什么时候用标准库，什么时候安装第三方包？",

            [

                paragraph(
                    "Python 世界里有大量第三方库，例如 requests、numpy、pandas、FastAPI 等。它们和标准库的一个重要区别是：通常需要通过包管理工具额外安装。"
                ),

                diagram(
                    "Python 工具生态",
                    `
                    <div class="python-ecosystem">

                        <div class="ecosystem-layer">
                            <strong>你的项目</strong>
                            <span>业务代码</span>
                        </div>

                        <div class="ecosystem-connector">↓</div>

                        <div class="ecosystem-columns">

                            <div class="ecosystem-column standard">
                                <strong>标准库</strong>
                                <span>Python 自带</span>
                                <small>pathlib</small>
                                <small>json</small>
                                <small>datetime</small>
                                <small>re</small>
                            </div>

                            <div class="ecosystem-column third">
                                <strong>第三方库</strong>
                                <span>额外安装</span>
                                <small>requests</small>
                                <small>numpy</small>
                                <small>pandas</small>
                                <small>FastAPI</small>
                            </div>

                        </div>

                        <div class="ecosystem-connector">↓</div>

                        <div class="ecosystem-layer">
                            <strong>Python 运行环境</strong>
                            <span>解释器 + 操作系统</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "例如，如果只需要读取 JSON，通常没有必要安装第三方 JSON 库，因为 Python 标准库已经提供 json 模块。"
                ),

                paragraph(
                    "但如果要进行大型矩阵计算、数据分析或者 Web 开发，第三方生态可能会提供远比标准库更专业的工具。"
                ),

                concepts([
                    "标准库：优先解决通用基础问题",
                    "第三方库：提供更专业、更丰富的能力",
                    "不要为了简单任务随意增加依赖",
                    "也不要为了避免依赖而重复造轮子",
                    "选择工具时要考虑功能、成熟度和项目需求"
                ]),

                thinking(
                    "什么时候应该安装第三方库？",
                    "当标准库无法很好解决问题，或者专业领域已经存在成熟生态时，使用第三方库通常更合理。"
                ),

                practice(
                    "练习 72：工具选择",
                    "分别思考：读取 JSON、矩阵运算、数据分析、Web API、路径处理。哪些问题标准库已经很好地覆盖？哪些通常会使用第三方库？"
                )

            ]
        ),


        /* =====================================================
           15
        ===================================================== */

        lesson(
            "py-07-15",

            "综合项目：项目文件分析器",

            "把 pathlib、collections、json、datetime 等标准库组合起来，完成一个真正的小工具。",

            [

                paragraph(
                    "最后我们不再单独练习某一个函数，而是完成一个真正的小程序：项目文件分析器。"
                ),

                paragraph(
                    "程序接收一个项目目录，扫描其中的 Python、JSON、HTML、CSS、JavaScript 等文件，并统计文件类型和数量，同时生成一份 JSON 报告。"
                ),

                diagram(
                    "项目文件分析器架构",
                    `
                    <div class="project-analyzer">

                        <div class="analyzer-input">
                            <strong>项目目录</strong>
                            <span>project/</span>
                        </div>

                        <div class="analyzer-arrow">↓</div>

                        <div class="analyzer-tools">

                            <div>
                                <strong>pathlib</strong>
                                <span>扫描文件</span>
                            </div>

                            <div>
                                <strong>collections</strong>
                                <span>统计类型</span>
                            </div>

                            <div>
                                <strong>datetime</strong>
                                <span>记录时间</span>
                            </div>

                        </div>

                        <div class="analyzer-arrow">↓</div>

                        <div class="analyzer-output">
                            <strong>JSON 报告</strong>
                            <span>report.json</span>
                        </div>

                    </div>
                    `
                ),

                code(
                    `from pathlib import Path
from collections import Counter
from datetime import datetime
import json


def analyze_project(root):
    root = Path(root)

    files = [
        path
        for path in root.rglob("*")
        if path.is_file()
    ]

    extensions = Counter(
        path.suffix.lower() or "[no extension]"
        for path in files
    )

    return {
        "generated_at": datetime.now().isoformat(),
        "total_files": len(files),
        "extensions": dict(extensions)
    }


report = analyze_project(".")

print(json.dumps(
    report,
    ensure_ascii=False,
    indent=2
))`,
                    "项目文件分析器"
                ),

                paragraph(
                    "注意这个程序并没有大量代码。它真正有价值的地方，是多个标准库模块各自承担一个明确职责：pathlib 负责找到文件，Counter 负责统计，datetime 负责时间信息，json 负责数据交换。"
                ),

                callout(
                    "这就是标准库的真正价值",
                    "标准库最强大的地方不是某一个函数，而是大量成熟的小工具可以组合起来，共同构成一个完整程序。"
                ),

                practice(
                    "练习 73：增加文件大小",
                    "在分析器中增加总文件大小统计。"
                ),

                practice(
                    "练习 74：增加最大文件",
                    "找出项目中最大的 5 个文件，并加入报告。"
                ),

                practice(
                    "练习 75：增加目录统计",
                    "统计项目中不同目录下分别有多少文件。"
                ),

                practice(
                    "练习 76：保存 JSON 报告",
                    "把最终分析结果保存到 report.json，而不是只打印到终端。"
                ),

                practice(
                    "练习 77：扩展分析器",
                    "增加对 Python 文件的统计，例如统计项目中一共有多少个 .py 文件。"
                ),

                checklist([
                    "我知道什么是 Python 标准库",
                    "我理解标准库不是函数大全",
                    "我可以根据问题寻找对应模块",
                    "我知道如何查官方文档确认 API",
                    "我理解 pathlib 与 os 的大致职责",
                    "我知道 json 和 csv 解决什么问题",
                    "我知道 re 用来解决什么问题",
                    "我知道 collections 为什么存在",
                    "我知道 itertools 和 functools 属于什么领域",
                    "我理解标准库和第三方库的区别",
                    "我可以组合多个标准库完成一个小项目"
                ]),

                note(
                    "下一章",
                    "下一章将进入文件、JSON 与 CSV 的更深入实践。这里建立的是“标准库地图”，后面会在真实项目中不断回来使用这些工具。"
                )

            ]
        )

    ]
};


export { chapter07 };

export default chapter07;