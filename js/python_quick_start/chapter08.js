/* =========================================================
   PYTHON QUICK START
   chapter08.js

   第八章：文件、JSON 与 CSV

   核心思想：

   Python 不只是处理变量。

   真正的程序需要不断：

       读取数据
          ↓
       理解数据格式
          ↓
       转换数据
          ↓
       处理数据
          ↓
       保存数据

   本章从普通文本文件开始，
   一直走到 MNIST 二进制数据集。

   学习目标：

   1. 掌握文本文件读写
   2. 理解 encoding
   3. 理解文本与二进制的区别
   4. 掌握 JSON / CSV
   5. 使用 pathlib 自动处理文件
   6. 理解 struct
   7. 自己解析 MNIST IDX 文件
   8. 理解“文件格式本质上是字节协议”
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


const chapter08 = {

    id: "chapter-08",

    number: "08",

    title: "文件、JSON、CSV 与真实数据",

    englishTitle: "Files and Data",

    description:
        "让 Python 开始处理真实世界的数据。从文本文件、JSON、CSV 到二进制文件与 MNIST 数据集，理解数据如何被保存、读取、解析和转换。",


    sections: [


        /* =====================================================
           01
        ===================================================== */

        lesson(
            "py-08-01",

            "程序为什么需要文件？",

            "理解变量和文件之间的区别，以及程序为什么必须和外部数据打交道。",

            [

                paragraph(
                    "前面的章节中，我们处理的数据大部分都存在 Python 程序的变量里。但是变量有一个明显的问题：程序结束之后，内存中的数据通常也就消失了。"
                ),

                paragraph(
                    "真实程序需要长期保存数据。例如学习记录、用户信息、配置文件、日志、图片、模型数据、数据库备份等。于是程序必须和文件系统建立联系。"
                ),

                diagram(
                    "内存与文件",
                    `
                    <div class="data-storage-diagram">

                        <div class="storage-box">
                            <strong>Python 程序</strong>
                            <span>变量 / list / dict</span>
                        </div>

                        <div class="storage-arrow">
                            ↕
                        </div>

                        <div class="storage-box highlight">
                            <strong>文件</strong>
                            <span>长期保存的数据</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "可以把程序运行时的变量理解成“工作台”，而文件则更像“仓库”。程序从文件中取数据，处理完成后，再把结果保存回文件。"
                ),

                concepts([
                    "变量：程序运行期间的数据",
                    "文件：可以长期保存的数据",
                    "读取：从文件进入程序",
                    "写入：从程序保存到文件",
                    "文件格式：规定数据应该如何组织"
                ]),

                thinking(
                    "如果没有文件会怎么样？",
                    "程序每次启动都必须重新创建所有数据。用户信息、配置、学习记录等都无法长期保存。"
                ),

                practice(
                    "练习 58：生活中的数据",
                    "列出 5 种你每天使用的软件会保存到文件或其他持久化存储中的数据，并思考这些数据为什么不能只放在变量里。"
                )

            ]
        ),


        /* =====================================================
           02
        ===================================================== */

        lesson(
            "py-08-02",

            "读取文本文件",

            "让 Python 从硬盘读取真正存在的数据。",

            [

                paragraph(
                    "最简单的文件就是文本文件。Python 使用内置的 open() 函数打开文件，然后可以读取其中的内容。"
                ),

                code(
                    `with open("hello.txt", "r", encoding="utf-8") as file:
    content = file.read()

print(content)`,
                    "读取整个文件"
                ),

                paragraph(
                    "这里有几个重要概念：文件路径、打开模式、字符编码，以及 with 语句。"
                ),

                diagram(
                    "读取文件的过程",
                    `
                    <div class="file-read-flow">

                        <div class="file-flow-step">
                            <strong>hello.txt</strong>
                            <span>磁盘上的文件</span>
                        </div>

                        <div class="file-flow-arrow">→</div>

                        <div class="file-flow-step">
                            <strong>open()</strong>
                            <span>建立文件对象</span>
                        </div>

                        <div class="file-flow-arrow">→</div>

                        <div class="file-flow-step highlight">
                            <strong>read()</strong>
                            <span>读取内容</span>
                        </div>

                        <div class="file-flow-arrow">→</div>

                        <div class="file-flow-step">
                            <strong>Python 字符串</strong>
                            <span>程序开始处理</span>
                        </div>

                    </div>
                    `
                ),

                code(
                    `with open("hello.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())`,
                    "逐行读取"
                ),

                paragraph(
                    "对于大文件，逐行处理通常比一次性 read() 更合适，因为程序不需要同时把整个文件内容放进内存。"
                ),

                concepts([
                    "r：读取模式",
                    "w：写入模式",
                    "a：追加模式",
                    "encoding：指定文本编码",
                    "with：自动管理文件资源"
                ]),

                note(
                    "为什么经常看到 with open(...)？",
                    "因为文件属于需要管理的资源。with 可以让文件在使用结束后正确关闭，代码也更加清晰。"
                ),

                practice(
                    "练习 59：统计文本",
                    "读取一个文本文件，统计字符数、行数和非空行数。"
                ),

                practice(
                    "练习 60：逐行分析",
                    "逐行读取一个文本文件，找出最长的一行。"
                )

            ]
        ),


        /* =====================================================
           03
        ===================================================== */

        lesson(
            "py-08-03",

            "写入文件与文件模式",

            "让 Python 不只是读取数据，还可以生成新的数据。",

            [

                code(
                    `with open("result.txt", "w", encoding="utf-8") as file:
    file.write("Python 学习记录")
    file.write("\\n今天学习了文件操作。")`,
                    "写入文件"
                ),

                paragraph(
                    "w 模式会写入文件。如果文件已经存在，原来的内容可能会被覆盖。因此在写文件时必须明确自己需要的是覆盖还是追加。"
                ),

                code(
                    `with open("learning.log", "a", encoding="utf-8") as file:
    file.write("完成了第八章学习。\\n")`,
                    "追加内容"
                ),

                diagram(
                    "文件打开模式",
                    `
                    <div class="file-mode-diagram">

                        <div class="file-mode-card">
                            <strong>r</strong>
                            <span>read</span>
                            <small>读取</small>
                        </div>

                        <div class="file-mode-card">
                            <strong>w</strong>
                            <span>write</span>
                            <small>覆盖写入</small>
                        </div>

                        <div class="file-mode-card">
                            <strong>a</strong>
                            <span>append</span>
                            <small>追加写入</small>
                        </div>

                        <div class="file-mode-card">
                            <strong>b</strong>
                            <span>binary</span>
                            <small>二进制模式</small>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "文件模式还可以组合。例如 rb 表示以二进制方式读取，wb 表示以二进制方式写入。后面解析 MNIST 时就会真正使用到它们。"
                ),

                practice(
                    "练习 61：学习日志",
                    "写一个程序，把每次学习记录追加到 learning.log 文件中。"
                ),

                practice(
                    "练习 62：成绩报告",
                    "把一组学生成绩计算结果保存到 report.txt。"
                ),

                thinking(
                    "为什么程序不能总是使用 w？",
                    "因为 w 会覆盖已有文件。真实程序必须明确数据是新建、覆盖还是追加，否则很容易造成数据丢失。"
                )

            ]
        ),


        /* =====================================================
           04
        ===================================================== */

        lesson(
            "py-08-04",

            "文本编码：字符到底是什么？",

            "理解 UTF-8、bytes 和 str，为后面的二进制数据解析打基础。",

            [

                paragraph(
                    "当我们写下“Python”“你好”“你好世界”时，计算机最终保存的并不是抽象的汉字，而是一串字节。编码负责规定字符如何转换成字节。"
                ),

                diagram(
                    "字符串与字节",
                    `
                    <div class="encoding-diagram">

                        <div class="encoding-box">
                            <strong>Python 字符串</strong>
                            <span>"你好"</span>
                            <small>str</small>
                        </div>

                        <div class="encoding-arrow">↓ encode()</div>

                        <div class="encoding-box highlight">
                            <strong>字节</strong>
                            <span>bytes</span>
                            <small>计算机保存的数据</small>
                        </div>

                        <div class="encoding-arrow">↑ decode()</div>

                        <div class="encoding-box">
                            <strong>Python 字符串</strong>
                            <span>"你好"</span>
                            <small>str</small>
                        </div>

                    </div>
                    `
                ),

                code(
                    `text = "你好，Python"

data = text.encode("utf-8")

print(data)
print(type(data))`,
                    "字符串编码成 bytes"
                ),

                code(
                    `data = "你好".encode("utf-8")

text = data.decode("utf-8")

print(text)`,
                    "bytes 解码成字符串"
                ),

                paragraph(
                    "这一区别非常重要：str 是文本，bytes 是字节序列。文本文件通常需要编码和解码，而二进制文件则通常直接处理 bytes。"
                ),

                concepts([
                    "str：Python 中的文本",
                    "bytes：字节序列",
                    "encode：str → bytes",
                    "decode：bytes → str",
                    "UTF-8：现代程序中非常常见的文本编码"
                ]),

                callout(
                    "为什么现在学习编码？",
                    "因为下一步我们将读取 MNIST。MNIST 不是文本文件，而是二进制数据。理解 str 与 bytes 的区别后，解析二进制文件会容易很多。"
                ),

                practice(
                    "练习 63：观察字节",
                    "分别对英文和中文字符串使用 UTF-8 编码，观察它们产生的 bytes 有什么区别。"
                )

            ]
        ),


        /* =====================================================
           05
        ===================================================== */

        lesson(
            "py-08-05",

            "JSON：保存结构化数据",

            "理解现代程序中最常见的数据交换格式之一。",

            [

                paragraph(
                    "文本文件可以保存一段文字，但真实程序经常需要保存结构化数据，例如用户、商品、课程、配置和 API 返回结果。JSON 就非常适合这种场景。"
                ),

                code(
                    `import json

data = {
    "name": "Alice",
    "age": 20,
    "courses": [
        "Python",
        "Math"
    ]
}

text = json.dumps(
    data,
    ensure_ascii=False,
    indent=2
)

print(text)`,
                    "Python 对象 → JSON"
                ),

                code(
                    `import json

text = '''
{
    "name": "Alice",
    "age": 20
}
'''

data = json.loads(text)

print(data["name"])
print(data["age"])`,
                    "JSON → Python 对象"
                ),

                code(
                    `import json

data = {
    "name": "Alice",
    "scores": [90, 85, 92]
}

with open(
    "student.json",
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        data,
        file,
        ensure_ascii=False,
        indent=2
    )`,
                    "保存 JSON 文件"
                ),

                diagram(
                    "JSON 数据流",
                    `
                    <div class="json-flow">

                        <div class="json-flow-box">
                            <strong>dict / list</strong>
                            <span>Python 数据</span>
                        </div>

                        <div class="json-flow-arrow">→</div>

                        <div class="json-flow-box highlight">
                            <strong>JSON</strong>
                            <span>文本格式</span>
                        </div>

                        <div class="json-flow-arrow">→</div>

                        <div class="json-flow-box">
                            <strong>其他程序</strong>
                            <span>Web / 服务 / 文件</span>
                        </div>

                    </div>
                    `
                ),

                concepts([
                    "dumps：对象 → JSON 字符串",
                    "loads：JSON 字符串 → Python 对象",
                    "dump：对象 → JSON 文件",
                    "load：JSON 文件 → Python 对象"
                ]),

                practice(
                    "练习 64：用户数据",
                    "创建一个包含姓名、年龄、爱好和课程列表的字典，将它保存为 JSON，然后再次读取。"
                ),

                practice(
                    "练习 65：配置文件",
                    "创建一个 config.json，保存程序名称、版本号、窗口宽度和窗口高度。"
                )

            ]
        ),


        /* =====================================================
           06
        ===================================================== */

        lesson(
            "py-08-06",

            "CSV：处理表格数据",

            "理解 CSV 的结构，并使用标准库处理真实的表格数据。",

            [

                paragraph(
                    "如果 JSON 更像“树状结构”，那么 CSV 更像“表格”。学生成绩、商品价格、销售记录等数据经常可以用 CSV 表示。"
                ),

                code(
                    `import csv

with open(
    "students.csv",
    encoding="utf-8"
) as file:

    reader = csv.DictReader(file)

    for row in reader:
        print(row)`,
                    "读取 CSV"
                ),

                code(
                    `import csv

rows = [
    {
        "name": "Alice",
        "score": 92
    },
    {
        "name": "Bob",
        "score": 85
    }
]

with open(
    "scores.csv",
    "w",
    newline="",
    encoding="utf-8"
) as file:

    writer = csv.DictWriter(
        file,
        fieldnames=["name", "score"]
    )

    writer.writeheader()
    writer.writerows(rows)`,
                    "写入 CSV"
                ),

                diagram(
                    "CSV 的结构",
                    `
                    <div class="csv-diagram">

                        <div class="csv-row header">
                            <span>name</span>
                            <span>score</span>
                            <span>class</span>
                        </div>

                        <div class="csv-row">
                            <span>Alice</span>
                            <span>92</span>
                            <span>A</span>
                        </div>

                        <div class="csv-row">
                            <span>Bob</span>
                            <span>85</span>
                            <span>A</span>
                        </div>

                        <div class="csv-row">
                            <span>Charlie</span>
                            <span>96</span>
                            <span>B</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "CSV 看起来非常简单，但真实数据经常存在缺失值、额外空格、编码问题和格式错误。因此，处理 CSV 的关键不仅是读取，还包括数据清洗。"
                ),

                practice(
                    "练习 66：成绩统计",
                    "读取成绩 CSV，计算平均分、最高分和最低分。"
                ),

                practice(
                    "练习 67：数据清洗",
                    "读取一个包含姓名和成绩的 CSV，去掉姓名两端的空格，并跳过成绩为空的记录。"
                )

            ]
        ),


        /* =====================================================
           07
        ===================================================== */

        lesson(
            "py-08-07",

            "文件系统自动化",

            "让 Python 自动处理成百上千个文件。",

            [

                paragraph(
                    "文件处理真正有价值的地方，是自动化。如果只有一个文件，手工操作也许还能接受；如果一个目录里有 10,000 个文件，Python 就会变得非常有价值。"
                ),

                code(
                    `from pathlib import Path

root = Path("images")

for path in root.iterdir():

    if path.is_file():
        print(path.name)`,
                    "扫描目录"
                ),

                code(
                    `from pathlib import Path

root = Path("project")

python_files = list(
    root.rglob("*.py")
)

for path in python_files:
    print(path)`,
                    "递归寻找 Python 文件"
                ),

                code(
                    `from pathlib import Path

root = Path("images")

for path in root.iterdir():

    if path.suffix.lower() == ".jpg":
        new_name = path.with_suffix(".jpeg")
        print(path, "→", new_name)`,
                    "批量生成目标路径"
                ),

                diagram(
                    "文件自动化",
                    `
                    <div class="automation-diagram">

                        <div class="automation-source">
                            <strong>一个目录</strong>
                            <span>大量文件</span>
                        </div>

                        <div class="automation-arrow">↓</div>

                        <div class="automation-process">
                            <strong>Python</strong>
                            <span>扫描 → 判断 → 分类 → 处理</span>
                        </div>

                        <div class="automation-arrow">↓</div>

                        <div class="automation-result">
                            <strong>自动完成</strong>
                            <span>整理 / 重命名 / 统计 / 报告</span>
                        </div>

                    </div>
                    `
                ),

                practice(
                    "练习 68：文件整理器",
                    "把一个目录中的图片、文档、视频按照扩展名分类到不同目录。"
                ),

                practice(
                    "练习 69：文件统计器",
                    "统计一个项目中 .py、.js、.html、.css、.json 文件分别有多少个。"
                ),

                thinking(
                    "为什么 Python 很适合自动化？",
                    "文件系统本身具有大量重复操作，而 Python 擅长表达“遍历 → 判断 → 处理”的过程。"
                )

            ]
        ),


        /* =====================================================
           08
        ===================================================== */

        lesson(
            "py-08-08",

            "二进制文件：文件不一定是文本",

            "从文本文件进入真正的二进制数据，为 MNIST 做准备。",

            [

                paragraph(
                    "到目前为止，我们接触的大多数文件都是可以直接打开阅读的文本。但是图片、音频、视频、压缩包以及很多数据集都不是普通文本。"
                ),

                paragraph(
                    "这些文件通常以二进制格式保存。Python 可以使用 rb 模式读取原始字节。"
                ),

                code(
                    `with open("data.bin", "rb") as file:
    data = file.read(16)

print(data)
print(type(data))
print(len(data))`,
                    "读取二进制数据"
                ),

                diagram(
                    "文本文件与二进制文件",
                    `
                    <div class="binary-vs-text">

                        <div class="binary-column">

                            <div class="binary-title">
                                文本文件
                            </div>

                            <div class="binary-example">
                                hello<br>
                                Python<br>
                                123
                            </div>

                            <div class="binary-description">
                                可以按照字符解释
                            </div>

                        </div>

                        <div class="binary-column highlight">

                            <div class="binary-title">
                                二进制文件
                            </div>

                            <div class="binary-bytes">
                                00 00 08 03<br>
                                00 00 00 01<br>
                                28 00 28 00
                            </div>

                            <div class="binary-description">
                                必须按照文件格式解释
                            </div>

                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "二进制文件并不是“没有意义的 0 和 1”。它通常有自己的格式规范。例如某些字节表示版本，某些字节表示长度，后面的字节表示真正的数据。"
                ),

                callout(
                    "关键思想",
                    "解析二进制文件，本质上就是：按照文件格式的规定，把一串 bytes 解释成数字、文本、数组或其他数据结构。"
                ),

                concepts([
                    "rb：二进制读取",
                    "wb：二进制写入",
                    "bytes：字节序列",
                    "二进制格式：规定字节应该如何解释",
                    "解析：按照格式把 bytes 转换成有意义的数据"
                ]),

                practice(
                    "练习 70：观察二进制",
                    "创建一个简单的二进制文件，读取其中的 bytes，并观察不同整数对应的字节表示。"
                )

            ]
        ),


        /* =====================================================
           09
        ===================================================== */

        lesson(
            "py-08-09",

            "struct：把字节解释成数字",

            "学习 Python 标准库中的 struct，为真正解析二进制数据做准备。",

            [

                paragraph(
                    "如果一个文件中的前 4 个字节代表一个整数，我们应该怎样把这 4 个 bytes 转换成 Python 中的 int？这就是 struct 模块擅长解决的问题之一。"
                ),

                code(
                    `import struct

data = struct.pack(">I", 2051)

print(data)
print(len(data))`,
                    "整数 → bytes"
                ),

                code(
                    `import struct

data = bytes([0, 0, 8, 3])

number = struct.unpack(">I", data)[0]

print(number)`,
                    "bytes → 整数"
                ),

                paragraph(
                    "这里的 >I 是一个格式描述。它告诉 struct：按照特定的字节顺序，把数据解释成一个无符号整数。"
                ),

                diagram(
                    "struct 的工作方式",
                    `
                    <div class="struct-diagram">

                        <div class="struct-box">
                            <strong>4 bytes</strong>
                            <span>00 00 08 03</span>
                        </div>

                        <div class="struct-arrow">→</div>

                        <div class="struct-box highlight">
                            <strong>struct.unpack()</strong>
                            <span>按照格式解释</span>
                        </div>

                        <div class="struct-arrow">→</div>

                        <div class="struct-box">
                            <strong>Python int</strong>
                            <span>2051</span>
                        </div>

                    </div>
                    `
                ),

                concepts([
                    "pack：Python 数据 → bytes",
                    "unpack：bytes → Python 数据",
                    "格式字符串描述数据布局",
                    "二进制解析的核心就是“按照约定解释字节”"
                ]),

                note(
                    "不要急着背格式字符",
                    "现在最重要的是理解 struct 的思想。后面的 MNIST 会告诉你一个真实数据集是如何使用这种固定格式保存数据的。"
                ),

                practice(
                    "练习 71：解析整数",
                    "构造一个包含多个整数的 bytes 数据，然后使用 struct.unpack 解析出来。"
                ),

                thinking(
                    "文件格式是什么？",
                    "如果发送者和接收者都同意“前 4 个字节表示长度，接下来表示数据”，这套约定本身就是一种数据格式。"
                )

            ]
        ),


        /* =====================================================
           10
        ===================================================== */

        lesson(
            "py-08-10",

            "MNIST：第一次面对真实二进制数据集",

            "不依赖 NumPy、PyTorch 等第三方库，仅使用 Python 标准库解析 MNIST。",

            [

                paragraph(
                    "现在进入本章真正的挑战：MNIST。MNIST 是机器学习领域非常经典的手写数字数据集，但我们现在并不是要训练神经网络。"
                ),

                paragraph(
                    "我们的任务更基础，也更重要：理解一个真实数据集是怎样被保存的，并使用 Python 自己把它解析出来。"
                ),

                paragraph(
                    "MNIST 的图像文件和标签文件使用一种叫 IDX 的二进制格式。文件开头包含一些描述数据结构的信息，后面才是真正的数据。"
                ),

                diagram(
                    "MNIST 数据结构",
                    `
                    <div class="mnist-overview">

                        <div class="mnist-file-card">

                            <div class="mnist-file-title">
                                train-images.idx3-ubyte
                            </div>

                            <div class="mnist-file-content">
                                <div>Magic Number</div>
                                <div>Image Count</div>
                                <div>Rows</div>
                                <div>Columns</div>
                                <div class="pixel-area">
                                    Pixel Data...
                                </div>
                            </div>

                        </div>

                        <div class="mnist-link">↔</div>

                        <div class="mnist-file-card">

                            <div class="mnist-file-title">
                                train-labels.idx1-ubyte
                            </div>

                            <div class="mnist-file-content">
                                <div>Magic Number</div>
                                <div>Label Count</div>
                                <div class="pixel-area">
                                    Label Data...
                                </div>
                            </div>

                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "对于图像文件，文件头会告诉我们：有多少张图像、每张图像有多少行、多少列。之后就是大量像素值。"
                ),

                paragraph(
                    "对于标签文件，则包含标签数量以及每张图片对应的数字标签。"
                ),

                concepts([
                    "MNIST 图像通常表示为 28 × 28 像素",
                    "每个像素使用一个字节表示灰度值",
                    "标签表示对应的数字类别",
                    "数据不是 CSV，而是紧凑的二进制格式",
                    "解析必须遵守 IDX 文件格式"
                ]),

                callout(
                    "为什么这一节重要？",
                    "前面我们一直在学习“读取文件”。现在开始真正学习“理解文件格式”。这是从普通文件操作走向数据工程、图像处理和机器学习数据处理的重要一步。"
                ),

                practice(
                    "练习 72：寻找 MNIST 文件",
                    "准备 MNIST 的图像文件和标签文件。先不要写解析程序，只使用 rb 读取文件前几十个字节，观察文件开头。"
                )

            ]
        ),


        /* =====================================================
           11
        ===================================================== */

        lesson(
            "py-08-11",

            "解析 MNIST 文件头",

            "使用 struct 读取 MNIST 的 IDX 文件头。",

            [

                paragraph(
                    "MNIST 的 IDX 文件使用固定格式。对于图像文件，我们首先需要读取文件头，然后得到图像数量、行数和列数。"
                ),

                code(
                    `import struct

with open(
    "train-images-idx3-ubyte",
    "rb"
) as file:

    magic, count, rows, cols = struct.unpack(
        ">IIII",
        file.read(16)
    )

print("magic:", magic)
print("count:", count)
print("rows:", rows)
print("cols:", cols)`,
                    "读取 MNIST 图像文件头"
                ),

                paragraph(
                    "这里一次读取了 16 个字节，并按照 4 个无符号整数解释。"
                ),

                diagram(
                    "MNIST 图像文件头",
                    `
                    <div class="mnist-header">

                        <div class="mnist-header-item">
                            <strong>4 bytes</strong>
                            <span>Magic Number</span>
                        </div>

                        <div class="mnist-header-item">
                            <strong>4 bytes</strong>
                            <span>Image Count</span>
                        </div>

                        <div class="mnist-header-item">
                            <strong>4 bytes</strong>
                            <span>Rows</span>
                        </div>

                        <div class="mnist-header-item">
                            <strong>4 bytes</strong>
                            <span>Columns</span>
                        </div>

                        <div class="mnist-header-data">
                            ↓
                            <br>
                            Pixel Data
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "当我们知道 rows 和 cols 后，就知道每张图片需要多少个像素字节。对于 28 × 28 图像，每张图片有 784 个像素。"
                ),

                code(
                    `rows = 28
cols = 28

pixels_per_image = rows * cols

print(pixels_per_image)`,
                    "计算单张图像大小"
                ),

                practice(
                    "练习 73：验证文件头",
                    "读取 MNIST 图像文件头，并检查 magic number、图像数量、rows 和 cols 是否符合预期。"
                ),

                practice(
                    "练习 74：解析标签文件头",
                    "按照同样的方法读取 MNIST 标签文件的 magic number 和标签数量。"
                ),

                thinking(
                    "为什么先读文件头？",
                    "因为程序必须先知道后面的数据应该如何解释。文件头就像数据文件自己的“说明书”。"
                )

            ]
        ),


        /* =====================================================
           12
        ===================================================== */

        lesson(
            "py-08-12",

            "纯 Python 解析一张 MNIST 图片",

            "把原始像素 bytes 转换成 Python 中可以处理的图像数据。",

            [

                paragraph(
                    "现在我们已经知道图像文件的结构。接下来读取一张图片：先读取 784 个像素字节，再把它们转换成二维的 28 × 28 数据。"
                ),

                code(
                    `import struct

with open(
    "train-images-idx3-ubyte",
    "rb"
) as file:

    magic, count, rows, cols = struct.unpack(
        ">IIII",
        file.read(16)
    )

    pixels = file.read(rows * cols)

print("图片数量：", count)
print("尺寸：", rows, "x", cols)
print("像素数量：", len(pixels))`,
                    "读取第一张图片"
                ),

                paragraph(
                    "pixels 本身是 bytes。它里面的每一个元素都对应一个像素的灰度值。我们可以进一步把它转换成二维列表。"
                ),

                code(
                    `image = [
    list(
        pixels[row * cols:(row + 1) * cols]
    )
    for row in range(rows)
]

print(len(image))
print(len(image[0]))`,
                    "bytes → 二维像素数组"
                ),

                diagram(
                    "28 × 28 MNIST 图像",
                    `
                    <div class="mnist-grid">

                        <div class="mnist-grid-label">
                            28 columns
                        </div>

                        <div class="mnist-pixel-grid">
                            ${Array.from(
                        { length: 196 },
                        (_, i) => {
                            const value =
                                (i % 17 === 0 ||
                                    i % 23 === 0 ||
                                    i > 70 && i < 125)
                                    ? "1"
                                    : "0";

                            return `
                                        <span class="mnist-pixel">
                                            ${value}
                                        </span>
                                    `;
                        }
                    ).join("")}
                        </div>

                        <div class="mnist-grid-label">
                            28 rows × 28 columns = 784 pixels
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "这里发生了一个非常重要的数据转换：磁盘上的 bytes → Python 数据结构。之后的程序就不必再关心文件格式，而可以直接处理 image 这个二维结构。"
                ),

                concepts([
                    "原始数据：bytes",
                    "解析结果：二维 list",
                    "每个元素：一个像素值",
                    "一张 MNIST 图片：28 × 28 = 784 个像素"
                ]),

                practice(
                    "练习 75：读取第 N 张图片",
                    "修改程序，让它能够跳过前面的图片，读取指定编号的 MNIST 图像。"
                )

            ]
        ),


        /* =====================================================
           13
        ===================================================== */

        lesson(
            "py-08-13",

            "把 MNIST 图像打印到终端",

            "不用任何图像库，直接把像素数据转换成 ASCII 图像。",

            [

                paragraph(
                    "现在我们已经获得了一张 28 × 28 的像素数组。即使没有 Pillow、NumPy 等第三方库，我们也可以把它可视化。"
                ),

                paragraph(
                    "最简单的方法是把像素灰度值映射成字符。例如接近 0 的像素显示为空格，较亮的像素显示为 #。"
                ),

                code(
                    `def pixel_to_char(value):
    if value < 50:
        return " "
    if value < 100:
        return "."
    if value < 150:
        return "*"
    if value < 200:
        return "O"

    return "#"


for row in image:
    line = "".join(
        pixel_to_char(pixel)
        for pixel in row
    )

    print(line)`,
                    "ASCII 图像"
                ),

                diagram(
                    "像素 → 字符",
                    `
                    <div class="ascii-scale">

                        <div class="ascii-scale-item">
                            <span>0</span>
                            <strong>空白</strong>
                        </div>

                        <div class="ascii-scale-item">
                            <span>50</span>
                            <strong>.</strong>
                        </div>

                        <div class="ascii-scale-item">
                            <span>100</span>
                            <strong>*</strong>
                        </div>

                        <div class="ascii-scale-item">
                            <span>150</span>
                            <strong>O</strong>
                        </div>

                        <div class="ascii-scale-item">
                            <span>255</span>
                            <strong>#</strong>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "这一步非常有意义：我们没有使用任何机器学习框架，也没有使用图像处理库，只通过 Python 的基础数据结构、循环和文件解析，就把原始二进制数据变成了人可以观察的图像。"
                ),

                practice(
                    "练习 76：改进 ASCII 图像",
                    "调整字符映射，让 MNIST 手写数字显示得更加清晰。"
                ),

                practice(
                    "练习 77：打印多张图片",
                    "连续读取前 5 张 MNIST 图片，并依次打印出来。"
                ),

                thinking(
                    "机器看到的数字是什么？",
                    "对程序而言，它并不是“数字 7 的图片”，而只是一个 28 × 28 的数值矩阵。真正的识别需要进一步建立数据和类别之间的关系。"
                )

            ]
        ),


        /* =====================================================
           14
        ===================================================== */

        lesson(
            "py-08-14",

            "读取 MNIST 标签并建立图像—标签关系",

            "理解数据集为什么通常由多个文件共同组成。",

            [

                paragraph(
                    "一张 MNIST 图片只有像素数据。要知道它代表哪个数字，还需要标签文件。"
                ),

                code(
                    `import struct

with open(
    "train-labels-idx1-ubyte",
    "rb"
) as file:

    magic, count = struct.unpack(
        ">II",
        file.read(8)
    )

    labels = file.read(count)

print("标签数量：", count)
print("前 10 个标签：", list(labels[:10]))`,
                    "读取 MNIST 标签"
                ),

                paragraph(
                    "现在可以把第 0 张图片和第 0 个标签配对，第 1 张图片和第 1 个标签配对，以此类推。"
                ),

                diagram(
                    "MNIST 图像与标签",
                    `
                    <div class="mnist-pairing">

                        <div class="mnist-sample">
                            <strong>Image 0</strong>
                            <span>28 × 28 pixels</span>
                        </div>

                        <div class="pair-arrow">→</div>

                        <div class="mnist-label">
                            <strong>Label 0</strong>
                            <span>7</span>
                        </div>

                        <div class="mnist-sample">
                            <strong>Image 1</strong>
                            <span>28 × 28 pixels</span>
                        </div>

                        <div class="pair-arrow">→</div>

                        <div class="mnist-label">
                            <strong>Label 1</strong>
                            <span>2</span>
                        </div>

                        <div class="mnist-sample">
                            <strong>Image 2</strong>
                            <span>28 × 28 pixels</span>
                        </div>

                        <div class="pair-arrow">→</div>

                        <div class="mnist-label">
                            <strong>Label 2</strong>
                            <span>1</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "这就是数据集最基本的思想：数据本身和描述数据的数据往往需要对应起来。"
                ),

                practice(
                    "练习 78：检查对应关系",
                    "读取第一张图片和第一张标签，打印图片的 ASCII 图像，并在顶部打印它对应的标签。"
                ),

                practice(
                    "练习 79：统计标签",
                    "统计 MNIST 数据集中数字 0 到 9 分别出现了多少次。可以使用前面学过的 Counter。"
                ),

                concepts([
                    "图像文件：保存输入数据",
                    "标签文件：保存目标类别",
                    "相同索引：表示同一个样本",
                    "数据集通常由多个互相对应的数据组成"
                ])

            ]
        ),


        /* =====================================================
           15
        ===================================================== */

        lesson(
            "py-08-15",

            "综合项目：自己写一个 MNIST 数据读取器",

            "把文件、bytes、struct、循环、列表、Counter 和 JSON 全部组合起来。",

            [

                paragraph(
                    "现在完成本章真正的综合项目：不使用 NumPy、Pillow、PyTorch 等第三方库，只使用 Python 本身提供的能力，写一个最小 MNIST 数据读取器。"
                ),

                paragraph(
                    "它至少应该能够：读取图像文件、读取标签文件、验证文件头、获得图片数量、读取指定图片、获得标签，并生成统计报告。"
                ),

                diagram(
                    "MNIST Reader",
                    `
                    <div class="mnist-reader">

                        <div class="reader-file">
                            <strong>IDX 文件</strong>
                            <span>原始 bytes</span>
                        </div>

                        <div class="reader-arrow">↓</div>

                        <div class="reader-stage">
                            <strong>struct</strong>
                            <span>解析文件头</span>
                        </div>

                        <div class="reader-arrow">↓</div>

                        <div class="reader-stage">
                            <strong>bytes</strong>
                            <span>读取原始数据</span>
                        </div>

                        <div class="reader-arrow">↓</div>

                        <div class="reader-stage">
                            <strong>Python 数据结构</strong>
                            <span>list / int</span>
                        </div>

                        <div class="reader-arrow">↓</div>

                        <div class="reader-result">
                            <strong>图像 + 标签</strong>
                            <span>可以被程序使用</span>
                        </div>

                    </div>
                    `
                ),

                code(
                    `import struct
from collections import Counter


def read_images(path):

    with open(path, "rb") as file:

        magic, count, rows, cols = struct.unpack(
            ">IIII",
            file.read(16)
        )

        images = []

        for _ in range(count):

            pixels = file.read(rows * cols)

            if len(pixels) != rows * cols:
                raise ValueError(
                    "图像数据不完整"
                )

            image = [
                list(
                    pixels[
                        row * cols:
                        (row + 1) * cols
                    ]
                )
                for row in range(rows)
            ]

            images.append(image)

        return {
            "magic": magic,
            "count": count,
            "rows": rows,
            "cols": cols,
            "images": images
        }


def read_labels(path):

    with open(path, "rb") as file:

        magic, count = struct.unpack(
            ">II",
            file.read(8)
        )

        labels = file.read(count)

        if len(labels) != count:
            raise ValueError(
                "标签数据不完整"
            )

        return {
            "magic": magic,
            "count": count,
            "labels": list(labels)
        }


print("MNIST Reader")`,
                    "MNIST 数据读取器"
                ),

                paragraph(
                    "上面的代码还可以继续完善。例如加入 magic number 检查、只读取指定图片、避免一次性加载全部图片、生成 JSON 统计报告等。"
                ),

                practice(
                    "练习 80：验证 Magic Number",
                    "增加检查逻辑，如果 MNIST 图像文件的 magic number 不正确，就抛出 ValueError。"
                ),

                practice(
                    "练习 81：读取指定图片",
                    "让读取器支持 image_index 参数，只读取指定编号的图片，而不是一次加载整个数据集。"
                ),

                practice(
                    "练习 82：标签统计",
                    "使用 Counter 统计 0～9 每个数字出现的次数。"
                ),

                practice(
                    "练习 83：生成数据报告",
                    "使用 JSON 保存一份 MNIST 数据报告，包括样本数量、图片尺寸、标签分布和生成时间。"
                ),

                practice(
                    "练习 84：ASCII 浏览器",
                    "制作一个简单的 MNIST 浏览器，通过 image_index 查看不同图片，并在终端打印 ASCII 图像和对应标签。"
                ),

                practice(
                    "练习 85：进一步优化",
                    "不要一次把全部 MNIST 图片加载到内存。设计一个按索引读取图片的方法，只读取需要的那一张。"
                ),

                checklist([
                    "我知道变量和文件的区别",
                    "我会使用 with open() 读取和写入文件",
                    "我理解 r、w、a、rb 等文件模式",
                    "我理解 str 和 bytes 的区别",
                    "我理解 UTF-8 编码的基本概念",
                    "我会使用 json 保存结构化数据",
                    "我会使用 csv 处理表格数据",
                    "我会使用 pathlib 自动扫描文件",
                    "我知道什么是二进制文件",
                    "我理解 struct 的基本用途",
                    "我知道文件格式本质上是一套数据解释规则",
                    "我可以读取 MNIST IDX 文件头",
                    "我可以把 MNIST 像素数据转换成 Python 数据结构",
                    "我可以把像素打印成 ASCII 图像",
                    "我理解图像与标签之间的对应关系",
                    "我能够组合多个标准库完成真实数据解析"
                ]),

                callout(
                    "这一章真正学到的是什么？",
                    "不是 open()、json.load() 或 struct.unpack() 这些函数本身，而是第一次完整经历了“文件 → 原始字节 → 文件格式 → 解析 → Python 数据结构 → 数据分析”的全过程。"
                ),

                note(
                    "下一章",
                    "下一章进入异常处理与调试。因为真实数据永远不会完美：文件可能不存在、数据可能损坏、格式可能错误。程序必须学会发现问题、报告问题，并在可控的情况下处理问题。"
                )

            ]
        )

    ]
};


export { chapter08 };

export default chapter08;