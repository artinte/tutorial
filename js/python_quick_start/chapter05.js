/* =========================================================
   PYTHON QUICK START
   chapter05.js

   第五章：字符串与文本处理
   ---------------------------------------------------------
   课程目标：

   1. 理解 Python 字符串的本质
   2. 掌握字符串索引与切片
   3. 理解字符串不可变性
   4. 掌握常见字符串方法
   5. 掌握 f-string 格式化
   6. 学会进行文本清洗
   7. 学会进行文本统计
   8. 使用 List / Dict / Set 处理字符串
   9. 通过简单算法题巩固前四章知识
   10. 完成一个综合文本分析项目

   本章涉及：

   paragraph
   code
   practice
   thinking
   note
   callout
   concepts
   checklist
   diagram
========================================================= */


/* =========================================================
   内容辅助函数
========================================================= */

function paragraph(text) {
    return {
        type: "paragraph",
        text
    };
}


function code(content, title = "") {
    return {
        type: "code",
        title,
        content
    };
}


function practice(title, description, starterCode = "") {
    return {
        type: "practice",
        title,
        description,
        starterCode
    };
}


function thinking(title, description) {
    return {
        type: "thinking",
        title,
        description
    };
}


function note(title, content) {
    return {
        type: "note",
        title,
        content
    };
}


function callout(title, content) {
    return {
        type: "callout",
        title,
        content
    };
}


function concepts(items) {
    return {
        type: "concepts",
        items
    };
}


function checklist(items) {
    return {
        type: "checklist",
        items
    };
}


function diagram(title, html, description = "") {
    return {
        type: "diagram",
        title,
        description,
        html
    };
}


function lesson(id, title, description, content) {
    return {
        id,
        title,
        description,
        content
    };
}


/* =========================================================
   第五章
========================================================= */

export const chapter05 = {

    id: "chapter-05",

    number: "05",

    title: "字符串与文本处理",

    englishTitle: "Strings and Text",

    description:
        "深入理解字符串、索引、切片、格式化、常用方法以及文本分析，并通过字符串算法练习巩固前面学过的 Python 基础。",

    sections: [

        /* =================================================
           01
        ================================================= */

        lesson(
            "py-05-01",

            "字符串索引与切片",

            "理解字符串的基本结构，掌握索引、切片和反向访问。",

            [

                paragraph(
                    "字符串（string）是 Python 中最常见的数据类型之一。姓名、标题、文件名、URL、代码、新闻、聊天内容，本质上都可以表示成字符串。"
                ),

                code(
                    `name = "Python"

print(name)

print(type(name))`,
                    "创建字符串"
                ),

                paragraph(
                    "Python 字符串可以使用单引号或双引号创建。两者在大多数情况下没有本质区别。"
                ),

                code(
                    `name1 = "Python"
name2 = 'Python'

print(name1)
print(name2)`,
                    "单引号与双引号"
                ),

                paragraph(
                    "字符串中的每一个字符都有自己的位置，也就是索引。索引从 0 开始。"
                ),

                diagram(
                    "字符串索引",
                    `
<div class="ds-diagram string-index-diagram">

    <div class="ds-code-line">
        text = "Python"
    </div>

    <div class="ds-index-row">
        <span>索引</span>
        <b>0</b>
        <b>1</b>
        <b>2</b>
        <b>3</b>
        <b>4</b>
        <b>5</b>
    </div>

    <div class="ds-value-row">
        <span>字符</span>
        <strong>P</strong>
        <strong>y</strong>
        <strong>t</strong>
        <strong>h</strong>
        <strong>o</strong>
        <strong>n</strong>
    </div>

    <div class="ds-index-row negative">
        <span>负索引</span>
        <b>-6</b>
        <b>-5</b>
        <b>-4</b>
        <b>-3</b>
        <b>-2</b>
        <b>-1</b>
    </div>

</div>
                    `,
                    "字符串和 List 一样，也可以通过索引访问单个元素。"
                ),

                code(
                    `text = "Python"

print(text[0])
print(text[1])
print(text[2])

print(text[-1])
print(text[-2])`,
                    "字符串索引"
                ),

                paragraph(
                    "字符串也支持切片。切片的规则和 List 基本一致：start 包含，stop 不包含。"
                ),

                code(
                    `text = "Python"

print(text[0:2])
print(text[2:5])
print(text[:3])
print(text[3:])
print(text[::-1])`,
                    "字符串切片"
                ),

                paragraph(
                    "因此，前面学过的 List 切片规则，在字符串上同样适用。"
                ),

                code(
                    `text = "ABCDEFGHIJ"

print(text[0:5])
print(text[5:])
print(text[::2])
print(text[1::2])
print(text[::-1])`,
                    "更多切片"
                ),

                paragraph(
                    "字符串和 List 有一个非常重要的区别：字符串是不可变（immutable）的。也就是说，不能直接修改某一个字符。"
                ),

                code(
                    `text = "Python"

# 下面的代码会产生 TypeError
# text[0] = "J"`,
                    "字符串不可变"
                ),

                paragraph(
                    "如果希望修改字符串，通常需要创建一个新的字符串。"
                ),

                code(
                    `text = "Python"

text = "J" + text[1:]

print(text)`,
                    "创建新的字符串"
                ),

                paragraph(
                    "字符串可以使用 len() 获取长度。"
                ),

                code(
                    `text = "Python"

print(len(text))`,
                    "字符串长度"
                ),

                paragraph(
                    "Python 字符串支持 Unicode，因此可以直接处理中文等非 ASCII 文本。"
                ),

                code(
                    `text = "你好，Python"

print(text)
print(len(text))
print(text[0])
print(text[-1])`,
                    "中文字符串"
                ),

                concepts([
                    "字符串是一组有顺序的字符",
                    "索引从 0 开始",
                    "支持负索引",
                    "支持切片",
                    "字符串是不可变对象",
                    "len() 可以获取字符串长度",
                    "Python 字符串支持 Unicode"
                ]),

                practice(
                    "练习 40：反转字符串",
                    "给定一个字符串，输出它的反转结果。先尝试使用切片完成。",
                    `text = "Python"

# 在这里完成代码
`
                ),

                practice(
                    "练习 41：提取信息",
                    "给定一个固定格式的字符串，例如 user-2026-python，从中提取用户名、年份和语言。",
                    `text = "user-2026-python"

# 在这里完成代码
`
                ),

                practice(
                    "练习 42：获取文件扩展名",
                    "给定一个文件名，例如 report.pdf，提取文件的扩展名。",
                    `filename = "report.pdf"

# 在这里完成代码
`
                ),

                thinking(
                    "思考",
                    "为什么字符串不能直接修改某一个字符？如果字符串是可变的，会带来哪些潜在问题？"
                )
            ]
        ),


        /* =================================================
           02
        ================================================= */

        lesson(
            "py-05-02",

            "常用字符串方法",

            "掌握 split、join、strip、replace、find、count 等高频字符串操作。",

            [

                paragraph(
                    "字符串真正强大的地方，不只是索引和切片，而是 Python 提供的大量字符串方法。"
                ),

                paragraph(
                    "strip() 可以删除字符串两端的空白字符。它特别适合进行用户输入和文本数据清洗。"
                ),

                code(
                    `text = "   Python   "

print(text)
print(text.strip())`,
                    "strip()"
                ),

                paragraph(
                    "lstrip() 只删除左侧空白，rstrip() 只删除右侧空白。"
                ),

                code(
                    `text = "   Python   "

print(text.lstrip())
print(text.rstrip())`,
                    "lstrip / rstrip"
                ),

                paragraph(
                    "replace() 可以把字符串中的一部分内容替换成另一部分内容。"
                ),

                code(
                    `text = "I like Java"

text = text.replace("Java", "Python")

print(text)`,
                    "replace()"
                ),

                paragraph(
                    "replace() 不会修改原字符串，而是返回一个新的字符串。"
                ),

                code(
                    `text = "hello world"

result = text.replace("world", "Python")

print(text)
print(result)`,
                    "replace() 返回新字符串"
                ),

                paragraph(
                    "split() 可以把一个字符串按照指定分隔符拆成 List。"
                ),

                code(
                    `text = "Python,Java,Go"

languages = text.split(",")

print(languages)`,
                    "split()"
                ),

                paragraph(
                    "如果不指定参数，split() 默认按照空白字符进行分割。"
                ),

                code(
                    `text = "Python Java Go Rust"

languages = text.split()

print(languages)`,
                    "split() 默认行为"
                ),

                paragraph(
                    "join() 则正好相反。它可以把多个字符串连接成一个字符串。"
                ),

                code(
                    `languages = ["Python", "Java", "Go"]

result = " / ".join(languages)

print(result)`,
                    "join()"
                ),

                diagram(
                    "split 与 join",
                    `
<div class="ds-diagram split-join-diagram">

    <div class="split-box">
        Python,Java,Go
    </div>

    <div class="diagram-arrow">
        split(",") ↓
    </div>

    <div class="split-list">
        <span>Python</span>
        <span>Java</span>
        <span>Go</span>
    </div>

    <div class="diagram-arrow">
        join(" / ") ↑
    </div>

    <div class="split-box result">
        Python / Java / Go
    </div>

</div>
                    `,
                    "split 负责拆分，join 负责重新组合。"
                ),

                paragraph(
                    "find() 可以查找子字符串第一次出现的位置。如果找不到，则返回 -1。"
                ),

                code(
                    `text = "Python is powerful"

print(text.find("Python"))
print(text.find("power"))
print(text.find("Java"))`,
                    "find()"
                ),

                paragraph(
                    "index() 也可以查找位置，但如果找不到目标，会抛出异常。"
                ),

                code(
                    `text = "Python is powerful"

print(text.index("Python"))

# 下面会产生 ValueError
# print(text.index("Java"))`,
                    "find 与 index"
                ),

                paragraph(
                    "count() 可以统计某个子字符串出现的次数。"
                ),

                code(
                    `text = "banana"

print(text.count("a"))
print(text.count("na"))`,
                    "count()"
                ),

                paragraph(
                    "startswith() 和 endswith() 可以判断字符串是否以某个内容开始或结束。"
                ),

                code(
                    `filename = "report.pdf"

print(filename.startswith("report"))
print(filename.endswith(".pdf"))
print(filename.endswith(".png"))`,
                    "startswith / endswith"
                ),

                paragraph(
                    "字符串还有很多用于判断内容的方法，例如 isdigit()、isalpha()、isalnum()、isspace()。"
                ),

                code(
                    `print("123".isdigit())
print("Python".isalpha())
print("Python123".isalnum())
print("   ".isspace())`,
                    "字符串判断"
                ),

                concepts([
                    "strip()：删除两端空白",
                    "replace()：替换内容",
                    "split()：字符串 → List",
                    "join()：List → 字符串",
                    "find()：查找位置",
                    "count()：统计次数",
                    "startswith()：判断开头",
                    "endswith()：判断结尾",
                    "isdigit()：判断数字",
                    "isalpha()：判断字母"
                ]),

                practice(
                    "练习 43：文本清洗",
                    "清理一段包含多余空格和特殊字符的文本。",
                    `text = "   Hello, Python!!!   "

# 要求：
# 1. 去掉两端空格
# 2. 去掉 !!!
# 3. 输出最终结果
`
                ),

                practice(
                    "练习 44：CSV 数据拆分",
                    "将一行简单的 CSV 数据拆分成字段。",
                    `line = "Alice,18,Beijing,Python"

# 在这里完成代码
`
                ),

                practice(
                    "练习 45：文件类型判断",
                    "判断文件名是 PDF、PNG、JPG 还是其他类型。",
                    `filename = "report.pdf"

# 在这里完成代码
`
                ),

                note(
                    "实际开发",
                    "split、join、strip、replace 是 Python 文本处理里非常高频的四个方法。后面处理 CSV、日志、配置文件、用户输入时会反复使用。"
                )
            ]
        ),


        /* =================================================
           03
        ================================================= */

        lesson(
            "py-05-03",

            "字符串格式化与 f-string",

            "掌握现代 Python 中最常用的字符串格式化方式。",

            [

                paragraph(
                    "程序经常需要把变量插入到字符串中。例如生成用户欢迎语、日志、报告和提示信息。"
                ),

                code(
                    `name = "Alice"
age = 18

print("姓名：", name)
print("年龄：", age)`,
                    "基础拼接"
                ),

                paragraph(
                    "可以使用 + 连接字符串，但变量较多时会越来越难读。"
                ),

                code(
                    `name = "Alice"
city = "Beijing"
language = "Python"

message = (
    "姓名：" + name +
    "，城市：" + city +
    "，语言：" + language
)

print(message)`,
                    "字符串拼接"
                ),

                paragraph(
                    "Python 推荐使用 f-string。只需要在字符串前加 f，然后在大括号中放入变量或表达式。"
                ),

                code(
                    `name = "Alice"
age = 18

message = f"我是 {name}，今年 {age} 岁。"

print(message)`,
                    "f-string"
                ),

                paragraph(
                    "大括号里面不仅可以放变量，也可以放表达式。"
                ),

                code(
                    `price = 299
quantity = 3

message = f"总价：{price * quantity} 元"

print(message)`,
                    "f-string 表达式"
                ),

                paragraph(
                    "数字还可以进行格式控制。例如保留两位小数。"
                ),

                code(
                    `price = 19.9999

print(f"{price:.2f}")`,
                    "数字格式化"
                ),

                paragraph(
                    "百分比也可以使用格式说明符。"
                ),

                code(
                    `rate = 0.856

print(f"{rate:.1%}")`,
                    "百分比格式化"
                ),

                paragraph(
                    "f-string 在生成日志、报告、调试信息时非常方便。"
                ),

                code(
                    `name = "Alice"
score = 95
rank = 3

print(
    f"学生 {name} 的成绩是 {score} 分，"
    f"排名第 {rank} 名。"
)`,
                    "生成报告"
                ),

                practice(
                    "练习 46：个人信息",
                    "使用 f-string 输出一个格式完整的个人信息。",
                    `name = "Tom"
age = 16
city = "Taipei"
score = 92

# 输出：
# Tom，16 岁，来自 Taipei，成绩 92 分。
`
                ),

                practice(
                    "练习 47：商品价格",
                    "使用 f-string 计算商品总价，并保留两位小数。",
                    `name = "Keyboard"
price = 299.5
quantity = 3

# 在这里完成代码
`
                ),

                concepts([
                    "f-string 是现代 Python 推荐的字符串格式化方式",
                    "变量可以直接放入 {}",
                    "{} 中可以写表达式",
                    "可以使用格式说明符控制数字显示",
                    "f-string 非常适合生成报告和日志"
                ])
            ]
        ),


        /* =================================================
           04
        ================================================= */

        lesson(
            "py-05-04",

            "文本清洗与标准化",

            "学习如何把现实世界中混乱的文本转换成统一的数据。",

            [

                paragraph(
                    "现实世界的数据往往并不干净。用户可能输入多余空格、大小写不一致、不同格式的电话号码，或者把同一个词写成不同形式。"
                ),

                code(
                    `names = [
    " Alice ",
    "alice",
    " ALICE",
    "Bob ",
    " bob"
]

for name in names:
    print(name)`,
                    "原始数据"
                ),

                paragraph(
                    "处理文本时，一个常见思路是先 strip，再统一大小写。"
                ),

                code(
                    `names = [
    " Alice ",
    "alice",
    " ALICE",
    "Bob ",
    " bob"
]

cleaned = []

for name in names:

    name = name.strip()
    name = name.lower()

    cleaned.append(name)

print(cleaned)`,
                    "标准化文本"
                ),

                paragraph(
                    "lower() 可以转换成小写，upper() 可以转换成大写，title() 可以把单词首字母转换成大写。"
                ),

                code(
                    `text = "Hello Python World"

print(text.lower())
print(text.upper())
print(text.title())`,
                    "大小写转换"
                ),

                paragraph(
                    "如果我们想消除大小写造成的差异，可以统一使用 lower()。"
                ),

                code(
                    `keyword = "Python"

texts = [
    "I like Python",
    "PYTHON is powerful",
    "python is easy"
]

for text in texts:

    if keyword.lower() in text.lower():
        print("找到 Python：", text)`,
                    "忽略大小写搜索"
                ),

                paragraph(
                    "文本标准化通常不是一步完成，而是多个步骤组合起来。"
                ),

                code(
                    `text = "   Hello, PYTHON!!!   "

text = text.strip()
text = text.lower()
text = text.replace("!!!", "")

print(text)`,
                    "多步骤清洗"
                ),

                paragraph(
                    "还可以把一段文本拆成单词，然后过滤掉不需要的内容。"
                ),

                code(
                    `text = "Python is powerful and Python is easy"

words = text.lower().split()

print(words)`,
                    "文本拆词"
                ),

                paragraph(
                    "结合 Set，可以快速得到不重复的单词。"
                ),

                code(
                    `text = "Python is powerful and Python is easy"

words = text.lower().split()

unique_words = set(words)

print(unique_words)`,
                    "提取唯一单词"
                ),

                practice(
                    "练习 48：用户名标准化",
                    "将下面的用户名全部转换成统一的小写格式，并删除两端空格。",
                    `users = [
    " Alice ",
    "BOB",
    " Charlie",
    "alice "
]

# 在这里完成代码
`
                ),

                practice(
                    "练习 49：关键词搜索",
                    "不区分大小写，判断一组文章中哪些文章包含 Python。",
                    `articles = [
    "Python is easy to learn.",
    "Java is also popular.",
    "PYTHON is widely used.",
    "Rust is fast."
]

# 在这里完成代码
`
                ),

                thinking(
                    "数据清洗为什么重要？",
                    "如果同一个用户可能写成 Alice、alice、 ALICE，那么程序会不会把他们当成三个不同的人？文本标准化就是在解决这类问题。"
                )
            ]
        ),


        /* =================================================
           05
        ================================================= */

        lesson(
            "py-05-05",

            "文本统计：把字符串变成数据",

            "使用 List、Dictionary 和 Set 对文本进行统计分析。",

            [

                paragraph(
                    "字符串本身只是文本，但经过统计以后，它就变成了可以分析的数据。"
                ),

                paragraph(
                    "最简单的统计是字符数量。"
                ),

                code(
                    `text = "Python"

print("字符数：", len(text))`,
                    "字符数量"
                ),

                paragraph(
                    "如果要统计多个字符出现的次数，可以使用 Dictionary。"
                ),

                code(
                    `text = "banana"

counter = {}

for char in text:

    if char not in counter:
        counter[char] = 0

    counter[char] += 1

print(counter)`,
                    "字符频率统计"
                ),

                diagram(
                    "字符频率统计",
                    `
<div class="ds-diagram frequency-diagram">

    <div class="frequency-source">
        banana
    </div>

    <div class="frequency-arrow">
        ↓
    </div>

    <div class="frequency-grid">

        <div>
            <strong>b</strong>
            <span>1</span>
        </div>

        <div>
            <strong>a</strong>
            <span>3</span>
        </div>

        <div>
            <strong>n</strong>
            <span>2</span>
        </div>

    </div>

</div>
                    `,
                    "Dictionary 可以把“字符”映射到“出现次数”。"
                ),

                paragraph(
                    "统计单词的思路完全一样。先 split 成单词，再使用 Dictionary 统计。"
                ),

                code(
                    `text = "python is easy and python is powerful"

words = text.lower().split()

counter = {}

for word in words:

    if word not in counter:
        counter[word] = 0

    counter[word] += 1

print(counter)`,
                    "单词频率统计"
                ),

                paragraph(
                    "我们还可以统计文本中的行数。"
                ),

                code(
                    `text = """Python
Java
Go
Rust"""

lines = text.splitlines()

print("行数：", len(lines))`,
                    "行数统计"
                ),

                paragraph(
                    "splitlines() 是处理多行文本时非常实用的方法。"
                ),

                paragraph(
                    "现在把前面学过的知识组合起来，我们可以做一个简单的文本分析器。"
                ),

                code(
                    `text = """
Python is easy to learn.
Python is powerful.
Python is popular.
"""

lines = text.strip().splitlines()

words = text.lower().split()

unique_words = set(words)

print("行数：", len(lines))
print("单词数：", len(words))
print("不同单词数：", len(unique_words))`,
                    "简单文本分析"
                ),

                practice(
                    "练习 50：字数统计",
                    "统计一段文本的字符数、单词数和行数。",
                    `text = """
Python is easy.
Python is powerful.
Python is popular.
"""

# 在这里完成代码
`
                ),

                practice(
                    "练习 51：关键词统计",
                    "统计指定关键词在文本中出现的次数，不区分大小写。",
                    `text = """
Python is easy.
Python is powerful.
Python is popular.
"""

keyword = "python"

# 在这里完成代码
`
                ),

                practice(
                    "练习 52：词频统计",
                    "统计文本中每个单词出现的次数。",
                    `text = """
python java python go
java python rust go
"""

# 在这里完成代码
`
                ),

                concepts([
                    "字符串可以转换成 List",
                    "List 可以转换成 Set",
                    "Dictionary 可以用于统计频率",
                    "splitlines() 可以处理多行文本",
                    "文本处理本质上经常是多个数据结构的组合"
                ])
            ]
        ),


        /* =================================================
           06
        ================================================= */

        lesson(
            "py-05-06",

            "字符串算法：从 API 到真正解决问题",

            "通过简单字符串算法重新练习循环、条件、List、Set、Dictionary 和函数。",

            [

                paragraph(
                    "前面几节主要学习的是 Python 已经提供给我们的字符串能力。但真正学习编程，不能只停留在“调用方法”。"
                ),

                paragraph(
                    "我们还需要学会：面对一个问题，自己设计解决方案。字符串题就是非常适合初学者练习算法思维的一类题目。"
                ),

                callout(
                    "本节目标",
                    "不是为了刷很多 LeetCode，而是利用几个经典的简单字符串问题，把前四章学过的循环、条件、函数、List、Dictionary、Set 真正串起来。"
                ),

                /* -----------------------------------------
                   算法 1
                ----------------------------------------- */

                paragraph(
                    "第一个问题非常简单：判断一个字符串是不是回文。所谓回文，就是正着读和反着读一样，例如 level、madam。"
                ),

                code(
                    `def is_palindrome(text):

    return text == text[::-1]


print(is_palindrome("level"))
print(is_palindrome("python"))
print(is_palindrome("madam"))`,
                    "算法 1：回文字符串"
                ),

                paragraph(
                    "这个问题使用了前面刚学过的字符串切片。"
                ),

                practice(
                    "算法练习 1：回文判断",
                    "实现一个函数，判断给定字符串是否为回文。可以先使用切片完成，然后尝试不用切片。"
                ),

                /* -----------------------------------------
                   算法 2
                ----------------------------------------- */

                paragraph(
                    "第二个问题：统计一个字符串中某个字符出现了多少次。"
                ),

                code(
                    `def count_char(text, target):

    count = 0

    for char in text:

        if char == target:
            count += 1

    return count


print(count_char("banana", "a"))
print(count_char("python", "o"))`,
                    "算法 2：字符统计"
                ),

                paragraph(
                    "这个问题看起来简单，但它非常重要，因为它让我们重新练习了“遍历 + 条件 + 计数器”。"
                ),

                /* -----------------------------------------
                   算法 3
                ----------------------------------------- */

                paragraph(
                    "第三个问题：判断两个字符串是否为字母异位词（anagram）。例如 listen 和 silent，它们包含完全相同的字母，只是顺序不同。"
                ),

                code(
                    `def is_anagram(a, b):

    return sorted(a) == sorted(b)


print(is_anagram("listen", "silent"))
print(is_anagram("python", "java"))`,
                    "算法 3：字母异位词"
                ),

                paragraph(
                    "这个版本使用 sorted()，非常简洁。然后我们再用 Dictionary 自己实现一次。"
                ),

                code(
                    `def char_count(text):

    counter = {}

    for char in text:

        if char not in counter:
            counter[char] = 0

        counter[char] += 1

    return counter


def is_anagram(a, b):

    return char_count(a) == char_count(b)


print(is_anagram("listen", "silent"))
print(is_anagram("python", "java"))`,
                    "使用 Dictionary 实现"
                ),

                /* -----------------------------------------
                   算法 4
                ----------------------------------------- */

                paragraph(
                    "第四个问题：找出字符串中第一个只出现一次的字符。"
                ),

                code(
                    `def first_unique_char(text):

    counter = {}

    for char in text:
        counter[char] = counter.get(char, 0) + 1

    for char in text:

        if counter[char] == 1:
            return char

    return None


print(first_unique_char("leetcode"))
print(first_unique_char("aabbcc"))
print(first_unique_char("python"))`,
                    "算法 4：第一个不重复字符"
                ),

                paragraph(
                    "这里出现了一个非常值得学习的算法套路：先统计，再遍历。第一遍遍历负责建立信息，第二遍遍历负责根据这些信息找到答案。"
                ),

                diagram(
                    "两遍扫描思维",
                    `
<div class="ds-diagram algorithm-two-pass">

    <div class="algorithm-step">
        <span>第一次遍历</span>
        <strong>统计信息</strong>
        <small>Dictionary</small>
    </div>

    <div class="algorithm-arrow">
        →
    </div>

    <div class="algorithm-step">
        <span>第二次遍历</span>
        <strong>寻找答案</strong>
        <small>根据统计结果</small>
    </div>

</div>
                    `,
                    "先收集信息，再利用信息解决问题。"
                ),

                /* -----------------------------------------
                   算法 5
                ----------------------------------------- */

                paragraph(
                    "第五个问题：找出两个字符串的公共字符。这个问题可以使用 Set。"
                ),

                code(
                    `def common_chars(a, b):

    return set(a) & set(b)


print(common_chars("python", "phone"))
print(common_chars("abc", "xyz"))`,
                    "算法 5：公共字符"
                ),

                paragraph(
                    "这个例子很好地说明了：算法不一定需要复杂代码，关键是选择合适的数据结构。"
                ),

                /* -----------------------------------------
                   算法 6
                ----------------------------------------- */

                paragraph(
                    "再来看一个稍微经典一点的问题：最长公共前缀。"
                ),

                code(
                    `def longest_common_prefix(words):

    if not words:
        return ""

    prefix = words[0]

    for word in words[1:]:

        while not word.startswith(prefix):

            prefix = prefix[:-1]

            if not prefix:
                return ""

    return prefix


words = [
    "flower",
    "flow",
    "flight"
]

print(longest_common_prefix(words))`,
                    "算法 6：最长公共前缀"
                ),

                paragraph(
                    "这个问题开始要求我们把字符串切片、循环、条件和函数组合起来。"
                ),

                practice(
                    "算法练习 2：最长公共前缀",
                    "给定多个字符串，找出它们共同拥有的最长前缀。",
                    `words = [
    "interview",
    "internet",
    "internal"
]

# 在这里完成代码
`
                ),

                /* -----------------------------------------
                   算法 7
                ----------------------------------------- */

                paragraph(
                    "最后做一个非常适合初学者的字符串压缩问题。例如：aaabbc → a3b2c1。"
                ),

                code(
                    `def compress(text):

    if not text:
        return ""

    result = []

    count = 1

    for i in range(1, len(text)):

        if text[i] == text[i - 1]:
            count += 1

        else:
            result.append(text[i - 1] + str(count))
            count = 1

    result.append(text[-1] + str(count))

    return "".join(result)


print(compress("aaabbc"))
print(compress("aabbbaaa"))`,
                    "算法 7：字符串压缩"
                ),

                paragraph(
                    "这个题非常值得练习，因为它综合使用了：循环、索引、条件、List、字符串拼接和函数。"
                ),

                practice(
                    "算法练习 3：字符串压缩",
                    "实现字符串压缩。例如 aaabbc → a3b2c1。",
                    `text = "aaabbc"

# 在这里完成代码
`
                ),

                concepts([
                    "算法不等于复杂代码",
                    "选择合适的数据结构非常重要",
                    "计数问题经常使用 Dictionary",
                    "去重和集合关系经常使用 Set",
                    "顺序处理问题经常使用循环",
                    "先统计、再寻找答案是常见算法套路",
                    "字符串切片可以解决很多基础问题"
                ]),

                note(
                    "LeetCode 思维",
                    "从这里开始，你已经可以逐渐接触 LeetCode Easy。不要追求刷题数量，重点是学会把题目转换成：输入是什么、输出是什么、需要什么数据结构、需要几次遍历。"
                )
            ]
        ),


        /* =================================================
           07
        ================================================= */

        lesson(
            "py-05-07",

            "综合项目：文本分析器",

            "把字符串、List、Dictionary、Set、循环和函数组合起来，完成一个小型文本分析程序。",

            [

                paragraph(
                    "现在我们把这一章学过的内容组合起来，做一个真正的小项目：文本分析器。"
                ),

                paragraph(
                    "我们的程序将完成以下任务："
                ),

                concepts([
                    "统计文本行数",
                    "统计字符数量",
                    "统计单词数量",
                    "统计不同单词数量",
                    "统计单词频率",
                    "寻找出现次数最多的单词",
                    "统计指定关键词",
                    "输出简单分析报告"
                ]),

                code(
                    `text = """
Python is easy to learn.
Python is powerful.
Python is popular.
Python is used in data science.
"""

print(text)`,
                    "准备文本"
                ),

                paragraph(
                    "第一步，先清理文本。"
                ),

                code(
                    `clean_text = text.strip()

print(clean_text)`,
                    "清理文本"
                ),

                paragraph(
                    "第二步，把文本拆成行。"
                ),

                code(
                    `lines = clean_text.splitlines()

print("行数：", len(lines))`,
                    "统计行数"
                ),

                paragraph(
                    "第三步，把文本拆成单词。"
                ),

                code(
                    `words = clean_text.lower().split()

print("单词数：", len(words))`,
                    "统计单词"
                ),

                paragraph(
                    "第四步，使用 Set 得到不同单词。"
                ),

                code(
                    `unique_words = set(words)

print("不同单词数：", len(unique_words))`,
                    "统计不同单词"
                ),

                paragraph(
                    "第五步，使用 Dictionary 统计词频。"
                ),

                code(
                    `counter = {}

for word in words:

    counter[word] = counter.get(word, 0) + 1

print(counter)`,
                    "统计词频"
                ),

                paragraph(
                    "然后可以找到出现次数最多的单词。"
                ),

                code(
                    `most_common_word = None
most_common_count = 0

for word, count in counter.items():

    if count > most_common_count:

        most_common_word = word
        most_common_count = count


print(
    "出现最多：",
    most_common_word,
    most_common_count
)`,
                    "寻找最高频单词"
                ),

                paragraph(
                    "最后，把这些结果组织成一个函数。"
                ),

                code(
                    `def analyze_text(text):

    text = text.strip()

    lines = text.splitlines()

    words = text.lower().split()

    unique_words = set(words)

    counter = {}

    for word in words:
        counter[word] = counter.get(word, 0) + 1

    most_common_word = None
    most_common_count = 0

    for word, count in counter.items():

        if count > most_common_count:
            most_common_word = word
            most_common_count = count

    return {
        "lines": len(lines),
        "words": len(words),
        "unique_words": len(unique_words),
        "counter": counter,
        "most_common_word": most_common_word,
        "most_common_count": most_common_count
    }


text = """
Python is easy to learn.
Python is powerful.
Python is popular.
Python is used in data science.
"""

result = analyze_text(text)

print("行数：", result["lines"])
print("单词数：", result["words"])
print("不同单词：", result["unique_words"])
print(
    "最高频单词：",
    result["most_common_word"]
)`,
                    "完整文本分析器"
                ),

                callout(
                    "这就是前四章开始产生的效果",
                    "这个小项目同时使用了变量、字符串、条件、循环、函数、List、Dictionary 和 Set。你已经不是在孤立地学习语法，而是在组合这些工具解决问题。"
                ),

                practice(
                    "综合练习：升级文本分析器",
                    "给文本分析器增加以下功能：统计指定关键词、忽略标点符号、显示最高频的 3 个单词。",
                    `def analyze_text(text):

    # 在这里继续完善
    pass


text = """
Python is easy to learn.
Python is powerful.
Python is popular.
Python is used in data science.
"""

result = analyze_text(text)

print(result)
`
                ),

                checklist([
                    "我理解字符串索引",
                    "我会使用字符串切片",
                    "我理解字符串不可变",
                    "我会使用 strip、split、join、replace",
                    "我会使用 find 和 count",
                    "我会使用 startswith 和 endswith",
                    "我会使用 lower 和 upper",
                    "我会使用 f-string",
                    "我能进行文本清洗",
                    "我能统计字符和单词",
                    "我会使用 Dictionary 做频率统计",
                    "我会使用 Set 做去重",
                    "我能解决基础字符串算法题",
                    "我理解两遍扫描的基本思路",
                    "我能完成一个简单文本分析器"
                ]),

                note(
                    "下一章",
                    "下一章将进入模块、Package 和 Python 环境。你会开始学习如何把越来越大的程序拆成多个文件，并理解 import、模块、第三方库以及虚拟环境。"
                )
            ]
        )

    ]
};


/* =========================================================
   默认导出
========================================================= */

export default chapter05;