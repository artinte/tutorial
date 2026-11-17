/* =========================================================
   PYTHON QUICK START
   chapter11.js

   第十一章：Pythonic 数据处理

   核心思想：

   Pythonic 不只是“写得短”。

   更重要的是：

       1. 用合适的数据结构表达数据
       2. 用迭代处理数据
       3. 尽量按需产生数据
       4. 把数据处理组织成清晰的数据管道
       5. 让程序可以处理远大于内存的数据

   本章特别加入：

       List Comprehension
       Dict Comprehension
       Set Comprehension
       enumerate
       zip
       any / all
       sorted / key
       iterator
       iter / next
       generator
       yield
       generator expression
       数据管道
       Dataset 思想
       PyTorch Dataset
       PyTorch DataLoader
       batch
       shuffle
       collate
       数据预加载
       mini-batch training

   核心案例：

       从一个简单的数据集开始，

       手动构建：
           数据读取
           数据清洗
           数据转换
           batch
           迭代

       最后进入：

           PyTorch Dataset
                  ↓
           DataLoader
                  ↓
           batch
                  ↓
           model
                  ↓
           loss
                  ↓
           backward
                  ↓
           optimizer

   本章并不是完整的深度学习课程。

   它的目的，是让学习者理解：

       “为什么深度学习代码里的
        DataLoader、Dataset、yield、
        batch 和 iteration 会这样设计？”

   学完本章后，可以继续阅读：

       深度学习基础教程
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


const chapter11 = {

    id: "chapter-11",

    number: "11",

    title: "Pythonic 数据处理",

    englishTitle: "Comprehensions & Iteration",

    description:
        "从列表推导式一路学习到迭代器、生成器和数据管道，并通过 PyTorch Dataset、DataLoader 和一个完整的 mini-batch 训练示例，理解 Python 数据处理与深度学习数据加载之间的联系。",

    sections: [

        /* =====================================================
           11-01
        ===================================================== */

        lesson(
            "py-11-01",
            "什么是 Pythonic？",
            "理解 Pythonic 数据处理背后的思想，而不只是记住几种写法。",
            [

                paragraph(
                    "Pythonic 并不是简单地把代码写得更短。更重要的是使用符合 Python 思维的方式表达程序意图。"
                ),

                paragraph(
                    "在数据处理中，一个非常重要的思想是：不要总是先创建大量中间结果，而应该尽可能直接表达“我要对这批数据做什么”。"
                ),

                code(
                    `numbers = [1, 2, 3, 4, 5]

squares = []

for number in numbers:
    squares.append(number * number)

print(squares)`,
                    "传统写法"
                ),

                code(
                    `numbers = [1, 2, 3, 4, 5]

squares = [
    number * number
    for number in numbers
]

print(squares)`,
                    "Pythonic 写法"
                ),

                concepts([
                    "代码应该表达意图",
                    "数据处理应该尽量清晰",
                    "不是所有短代码都更好",
                    "复杂逻辑应该优先保证可读性",
                    "迭代是 Python 数据处理的重要基础"
                ]),

                callout(
                    "本章真正要学的东西",
                    "推导式只是入口。本章真正重要的是理解 Python 如何处理一批数据，以及为什么“一个一个产生数据”的方式非常重要。"
                ),

                thinking(
                    "思考",
                    "如果数据有 10 个元素，list 和 generator 的差别不明显。如果数据有 1000 万个元素呢？"
                )
            ]
        ),


        /* =====================================================
           11-02
        ===================================================== */

        lesson(
            "py-11-02",
            "List Comprehension",
            "使用列表推导式进行映射、过滤和组合。",
            [

                code(
                    `numbers = [1, 2, 3, 4, 5]

squares = [
    number * number
    for number in numbers
]

print(squares)`,
                    "列表推导式"
                ),

                code(
                    `numbers = range(1, 11)

even_numbers = [
    number
    for number in numbers
    if number % 2 == 0
]

print(even_numbers)`,
                    "过滤"
                ),

                code(
                    `names = ["alice", "bob", "charlie"]

names = [
    name.upper()
    for name in names
]

print(names)`,
                    "转换"
                ),

                paragraph(
                    "列表推导式可以理解为：遍历一组数据，对每一个元素进行转换，并根据需要过滤元素，最后生成一个新的列表。"
                ),

                diagram(
                    "List Comprehension",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>原始数据</strong>
                            <span>1, 2, 3, 4, 5</span>
                        </div>

                        <div class="diagram-arrow">↓ 遍历</div>

                        <div class="diagram-box">
                            <strong>转换 / 过滤</strong>
                            <span>x → x²</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>新列表</strong>
                            <span>1, 4, 9, 16, 25</span>
                        </div>
                    </div>
                    `,
                    "列表推导式本质上仍然是在遍历数据。"
                ),

                practice(
                    "练习 85：平方数",
                    "生成 1～100 的平方数列表。"
                ),

                practice(
                    "练习 86：过滤",
                    "生成 1～100 中所有能被 3 整除的数字。"
                ),

                practice(
                    "练习 87：文本清洗",
                    "将一组字符串去除两端空白，并过滤掉空字符串。"
                )
            ]
        ),


        /* =====================================================
           11-03
        ===================================================== */

        lesson(
            "py-11-03",
            "Dict / Set Comprehension",
            "使用推导式构造字典和集合。",
            [

                code(
                    `numbers = range(1, 6)

squares = {
    number: number * number
    for number in numbers
}

print(squares)`,
                    "Dict Comprehension"
                ),

                code(
                    `words = [
    "python",
    "java",
    "python",
    "rust"
]

lengths = {
    word: len(word)
    for word in words
}

print(lengths)`,
                    "字典推导式"
                ),

                code(
                    `numbers = [1, 2, 2, 3, 3, 4]

unique_even = {
    number
    for number in numbers
    if number % 2 == 0
}

print(unique_even)`,
                    "Set Comprehension"
                ),

                paragraph(
                    "这些写法的核心仍然没有改变：遍历数据、转换数据、过滤数据，只是最终的数据结构不同。"
                ),

                concepts([
                    "[] → list comprehension",
                    "{} + key:value → dict comprehension",
                    "{} → set comprehension",
                    "推导式适合表达简单的数据转换",
                    "逻辑过于复杂时应该使用普通 for 循环"
                ]),

                practice(
                    "练习 88：成绩映射",
                    "把学生姓名和成绩两个列表转换成一个 name → score 字典。"
                ),

                practice(
                    "练习 89：数据去重",
                    "使用集合推导式提取一组数据中的所有偶数。"
                )
            ]
        ),


        /* =====================================================
           11-04
        ===================================================== */

        lesson(
            "py-11-04",
            "enumerate、zip 与数据对齐",
            "学习处理多组相关数据的 Pythonic 方法。",
            [

                code(
                    `names = [
    "Alice",
    "Bob",
    "Charlie"
]

for index, name in enumerate(
    names,
    start=1
):
    print(index, name)`,
                    "enumerate"
                ),

                paragraph(
                    "enumerate 会在遍历数据时同时提供元素和索引，比自己维护一个 index 变量更加清晰。"
                ),

                code(
                    `names = [
    "Alice",
    "Bob",
    "Charlie"
]

scores = [
    95,
    88,
    91
]

for name, score in zip(
    names,
    scores
):
    print(name, score)`,
                    "zip"
                ),

                paragraph(
                    "zip 可以把多组数据按照位置配对起来。"
                ),

                diagram(
                    "zip 数据对齐",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>names</strong>
                            <span>Alice</span>
                            <span>Bob</span>
                            <span>Charlie</span>
                        </div>

                        <div class="diagram-arrow">＋</div>

                        <div class="diagram-box">
                            <strong>scores</strong>
                            <span>95</span>
                            <span>88</span>
                            <span>91</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>pairs</strong>
                            <span>(Alice, 95)</span>
                            <span>(Bob, 88)</span>
                            <span>(Charlie, 91)</span>
                        </div>
                    </div>
                    `,
                    "zip 的核心是把多个可迭代对象按位置组合起来。"
                ),

                practice(
                    "练习 90：成绩报告",
                    "使用 enumerate 和 zip 生成带序号的完整成绩报告。"
                ),

                practice(
                    "练习 91：商品表",
                    "将商品名称、价格、库存三个列表组合成商品数据。"
                )
            ]
        ),


        /* =====================================================
           11-05
        ===================================================== */

        lesson(
            "py-11-05",
            "any、all、sorted 与 key",
            "进一步理解 Python 对数据集合的处理方式。",
            [

                code(
                    `scores = [88, 91, 76, 95]

print(any(
    score >= 90
    for score in scores
))

print(all(
    score >= 60
    for score in scores
))`,
                    "any / all"
                ),

                paragraph(
                    "any 用于判断“是否至少有一个满足条件”，all 用于判断“是否全部满足条件”。"
                ),

                code(
                    `students = [
    ("Alice", 95),
    ("Bob", 82),
    ("Charlie", 91)
]

students = sorted(
    students,
    key=lambda student: student[1],
    reverse=True
)

print(students)`,
                    "sorted + key"
                ),

                paragraph(
                    "key 参数非常重要。它告诉 sorted：应该根据对象的哪一部分进行排序。"
                ),

                concepts([
                    "any：存在一个满足条件",
                    "all：全部满足条件",
                    "sorted：生成排序后的新序列",
                    "key：告诉 Python 如何比较对象",
                    "这些工具可以减少大量手写循环"
                ]),

                practice(
                    "练习 92：成绩检查",
                    "判断一个班级是否所有学生都及格，以及是否有人达到优秀。"
                ),

                practice(
                    "练习 93：商品排序",
                    "按照价格、库存或者商品名称对商品列表进行排序。"
                )
            ]
        ),


        /* =====================================================
           11-06
        ===================================================== */

        lesson(
            "py-11-06",
            "Iterable 与 Iterator",
            "真正理解“可迭代对象”和“迭代器”。",
            [

                paragraph(
                    "列表、字符串、元组、字典、集合、range 等对象都可以被 for 循环遍历。这样的对象称为 iterable（可迭代对象）。"
                ),

                code(
                    `numbers = [10, 20, 30]

for number in numbers:
    print(number)`,
                    "Iterable"
                ),

                paragraph(
                    "而 iterator（迭代器）是一种能够逐个提供元素的对象。它会记住当前遍历到什么位置。"
                ),

                code(
                    `numbers = [10, 20, 30]

iterator = iter(numbers)

print(next(iterator))
print(next(iterator))
print(next(iterator))`,
                    "iter / next"
                ),

                diagram(
                    "Iterator 的工作方式",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>[10, 20, 30]</strong>
                            <span>原始数据</span>
                        </div>

                        <div class="diagram-arrow">iter()</div>

                        <div class="diagram-box">
                            <strong>Iterator</strong>
                            <span>当前位置：0</span>
                        </div>

                        <div class="diagram-arrow">next()</div>

                        <div class="diagram-box">
                            <strong>10 → 20 → 30</strong>
                            <span>一个一个产生</span>
                        </div>
                    </div>
                    `,
                    "迭代器会逐个提供数据，而不是要求调用方一次拿到全部数据。"
                ),

                paragraph(
                    "当 iterator 没有更多数据时，next() 会抛出 StopIteration。for 循环实际上帮我们处理了这个过程。"
                ),

                code(
                    `numbers = iter([10, 20, 30])

while True:

    try:
        number = next(numbers)
        print(number)

    except StopIteration:
        break`,
                    "for 循环背后的思想"
                ),

                callout(
                    "重要",
                    "理解 iterator，是理解 generator、DataLoader 以及很多数据处理系统的关键。"
                )
            ]
        ),


        /* =====================================================
           11-07
        ===================================================== */

        lesson(
            "py-11-07",
            "生成器：需要的时候再产生数据",
            "理解 yield 和惰性计算。",
            [

                paragraph(
                    "生成器（Generator）是一种非常重要的迭代器。它不会一次性计算所有结果，而是在需要下一个结果时继续执行。"
                ),

                code(
                    `def numbers():

    for i in range(5):
        yield i


for number in numbers():
    print(number)`,
                    "Generator"
                ),

                diagram(
                    "Generator",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Generator</strong>
                            <span>yield 0</span>
                        </div>

                        <div class="diagram-arrow">next()</div>

                        <div class="diagram-box">
                            <strong>继续执行</strong>
                            <span>yield 1</span>
                        </div>

                        <div class="diagram-arrow">next()</div>

                        <div class="diagram-box">
                            <strong>继续执行</strong>
                            <span>yield 2</span>
                        </div>
                    </div>
                    `,
                    "yield 会暂停函数执行，下一次 next() 时从暂停的位置继续。"
                ),

                code(
                    `def huge_numbers():

    number = 0

    while True:
        yield number
        number += 1


numbers = huge_numbers()

print(next(numbers))
print(next(numbers))
print(next(numbers))`,
                    "无限生成器"
                ),

                paragraph(
                    "这个生成器理论上可以不断产生数字，但程序并不需要提前创建一个无限大的列表。"
                ),

                practice(
                    "练习 94：百万数字",
                    "分别使用 list 和 generator 生成大量数字，观察两种方式在思维上的区别。"
                ),

                thinking(
                    "思考",
                    "如果数据来自一个 100 GB 的文件，而计算机内存只有 16 GB，你还能够使用 list 一次性读取全部数据吗？"
                )
            ]
        ),


        /* =====================================================
           11-08
        ===================================================== */

        lesson(
            "py-11-08",
            "数据管道：从读取到处理",
            "把迭代器和生成器提升到工程层面。",
            [

                paragraph(
                    "真实的数据处理通常不是一步完成的。一个数据源可能需要经过读取、清洗、转换、过滤和批处理，最后才进入业务逻辑。"
                ),

                diagram(
                    "数据管道",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>数据源</strong>
                            <span>文件 / 网络 / 数据库</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>读取</strong>
                            <span>一个一个获取</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>清洗</strong>
                            <span>过滤无效数据</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>转换</strong>
                            <span>变成目标格式</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>业务处理</strong>
                            <span>训练 / 分析 / 保存</span>
                        </div>
                    </div>
                    `,
                    "大型数据系统通常会把数据处理拆成多个阶段。"
                ),

                code(
                    `def read_numbers():

    for number in range(20):
        yield number


def filter_even(numbers):

    for number in numbers:

        if number % 2 == 0:
            yield number


def square(numbers):

    for number in numbers:
        yield number * number


numbers = read_numbers()

numbers = filter_even(numbers)

numbers = square(numbers)


for number in numbers:
    print(number)`,
                    "生成器数据管道"
                ),

                paragraph(
                    "这里没有一次性创建大量中间列表。数据会沿着管道向前流动，需要一个结果时才继续计算。"
                ),

                callout(
                    "这就是惰性计算",
                    "很多大型数据处理系统的核心思想并不是“尽快生成所有数据”，而是“在需要的时候产生刚好需要的数据”。"
                ),

                practice(
                    "练习 95：文本数据管道",
                    "设计 read_lines、clean_lines、filter_lines 三个生成器，让文本逐层处理。"
                )
            ]
        ),


        /* =====================================================
           11-09
        ===================================================== */

        lesson(
            "py-11-09",
            "从 Python Iterator 到 PyTorch Dataset",
            "理解深度学习中的数据加载为什么建立在迭代思想之上。",
            [

                paragraph(
                    "到了这里，我们可以开始看一个真实工程中的例子：深度学习的数据加载。"
                ),

                paragraph(
                    "训练模型的时候，数据集可能包含几千、几百万甚至更多样本。通常不会把所有样本一次性全部处理成训练 batch，然后全部放进内存。"
                ),

                paragraph(
                    "更常见的做法是：数据集负责描述“如何取得一个样本”，数据加载器负责不断取得样本、打乱数据、组成 batch，然后交给训练循环。"
                ),

                diagram(
                    "深度学习数据流",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Dataset</strong>
                            <span>如何取得一个样本</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>DataLoader</strong>
                            <span>迭代 / shuffle / batch</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Batch</strong>
                            <span>x, y</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Training Loop</strong>
                            <span>model → loss → backward</span>
                        </div>
                    </div>
                    `,
                    "Dataset 和 DataLoader 把数据处理与模型训练连接起来。"
                ),

                paragraph(
                    "先看一个最小的 Dataset。"
                ),

                code(
                    `import torch
from torch.utils.data import Dataset


class NumberDataset(Dataset):

    def __init__(self):
        self.x = torch.arange(10).float()
        self.y = self.x * 2

    def __len__(self):
        return len(self.x)

    def __getitem__(self, index):
        return self.x[index], self.y[index]


dataset = NumberDataset()

print(len(dataset))
print(dataset[0])
print(dataset[5])`,
                    "PyTorch Dataset"
                ),

                paragraph(
                    "这里的关键不是 PyTorch 语法本身，而是它与前面学到的思想高度一致：Dataset 能够根据 index 提供一个样本。"
                ),

                concepts([
                    "__len__：数据集有多少样本",
                    "__getitem__：如何取得第 index 个样本",
                    "Dataset：描述数据集本身",
                    "DataLoader：负责把样本组织成训练所需要的迭代过程"
                ]),

                callout(
                    "连接前面的知识",
                    "你刚刚学习的 Python 特殊方法 __len__、__getitem__、迭代器和生成器，现在开始真正进入一个大型 Python 框架。"
                )
            ]
        ),


        /* =====================================================
           11-10
        ===================================================== */

        lesson(
            "py-11-10",
            "DataLoader：批处理、打乱与数据预加载",
            "理解 PyTorch DataLoader 为什么是训练数据管道的重要组成部分。",
            [

                paragraph(
                    "Dataset 通常描述“一个样本是什么”，而 DataLoader 更关注“训练时如何不断把这些样本送给模型”。"
                ),

                code(
                    `import torch
from torch.utils.data import (
    Dataset,
    DataLoader
)


class NumberDataset(Dataset):

    def __init__(self):
        self.x = torch.arange(
            20
        ).float()

        self.y = self.x * 2

    def __len__(self):
        return len(self.x)

    def __getitem__(self, index):
        return (
            self.x[index],
            self.y[index]
        )


dataset = NumberDataset()

loader = DataLoader(
    dataset,
    batch_size=4,
    shuffle=True
)


for x, y in loader:

    print("x:", x)
    print("y:", y)`,
                    "DataLoader"
                ),

                paragraph(
                    "注意这里发生了一件重要的事情：我们并没有手动创建每一个 batch。DataLoader 在迭代过程中不断提供 batch。"
                ),

                diagram(
                    "Batch",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Dataset</strong>
                            <span>0 1 2 3 4 5 6 7 ...</span>
                        </div>

                        <div class="diagram-arrow">DataLoader</div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>Batch 1</strong>
                                <span>4 samples</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Batch 2</strong>
                                <span>4 samples</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Batch 3</strong>
                                <span>4 samples</span>
                            </div>
                        </div>
                    `,
                    "batch_size 决定每次提供多少样本。"
                ),

                concepts([
                    "batch_size：每个 batch 包含多少样本",
                    "shuffle：每轮训练前是否打乱样本顺序",
                    "num_workers：是否使用多个进程加载数据",
                    "collate_fn：如何把多个样本组织成 batch",
                    "DataLoader 本质上提供一个可迭代的数据流"
                ]),

                paragraph(
                    "在真正的大型数据集上，数据加载可能还包括磁盘读取、图片解码、文本处理、数据增强等工作。因此数据加载器往往不仅仅是“帮你切 batch”。"
                ),

                callout(
                    "训练性能中的关键问题",
                    "如果 GPU 很快，但 CPU、磁盘或数据预处理太慢，GPU 可能会等待数据。此时模型本身可能并不是瓶颈，数据管道才是瓶颈。"
                ),

                practice(
                    "练习 96：观察 batch",
                    "修改 batch_size 和 shuffle，观察每个 batch 中的数据发生了什么变化。"
                )
            ]
        ),


        /* =====================================================
           11-11
        ===================================================== */

        lesson(
            "py-11-11",
            "一个完整的 PyTorch 训练例子",
            "把 Dataset、DataLoader、batch 和训练循环连接起来。",
            [

                paragraph(
                    "现在做一个非常小的训练任务：让模型学习一个简单的线性关系。"
                ),

                paragraph(
                    "这个例子故意不使用复杂神经网络，因为本节重点不是模型，而是观察数据从 Dataset 到 DataLoader，再进入训练循环的全过程。"
                ),

                diagram(
                    "完整训练流程",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>原始数据</strong>
                            <span>x, y</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Dataset</strong>
                            <span>单个样本</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>DataLoader</strong>
                            <span>mini-batch</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Model</strong>
                            <span>prediction</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Loss</strong>
                            <span>error</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Backward</strong>
                            <span>gradient</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Optimizer</strong>
                            <span>update</span>
                        </div>
                    </div>
                    `,
                    "训练循环的核心结构。"
                ),

                code(
                    `import torch
from torch import nn
from torch.utils.data import (
    Dataset,
    DataLoader
)


class NumberDataset(Dataset):

    def __init__(self):

        self.x = torch.arange(
            0,
            100
        ).float().unsqueeze(1)

        self.y = (
            self.x * 3 + 2
        )

    def __len__(self):
        return len(self.x)

    def __getitem__(self, index):
        return (
            self.x[index],
            self.y[index]
        )


dataset = NumberDataset()

loader = DataLoader(
    dataset,
    batch_size=16,
    shuffle=True
)


model = nn.Linear(1, 1)

loss_fn = nn.MSELoss()

optimizer = torch.optim.SGD(
    model.parameters(),
    lr=0.0001
)


for epoch in range(20):

    for x, y in loader:

        prediction = model(x)

        loss = loss_fn(
            prediction,
            y
        )

        optimizer.zero_grad()

        loss.backward()

        optimizer.step()

    print(
        epoch,
        loss.item()
    )`,
                    "完整训练例子"
                ),

                paragraph(
                    "仔细观察这个例子。真正负责训练的核心代码其实非常短：模型计算、计算 loss、反向传播、更新参数。"
                ),

                paragraph(
                    "而在模型之前，我们花了不少代码定义 Dataset、取得样本、创建 DataLoader、设置 batch_size 和 shuffle。这正是实际深度学习项目中经常出现的情况：数据处理部分往往比“调用模型”复杂得多。"
                ),

                callout(
                    "非常重要的工程认识",
                    "深度学习并不是“写几行 model() 就结束了”。真实项目中，数据读取、清洗、转换、采样、batch、缓存、预加载和数据增强都可能成为主要工作。"
                ),

                concepts([
                    "Dataset 负责定义样本",
                    "DataLoader 负责组织样本",
                    "batch 是训练的基本数据单位之一",
                    "训练循环不断从 DataLoader 获取 batch",
                    "模型只处理当前 batch",
                    "数据管道和模型是两个可以独立优化的部分"
                ])
            ]
        ),


        /* =====================================================
           11-12
        ===================================================== */

        lesson(
            "py-11-12",
            "数据预加载为什么重要？",
            "从 Python 迭代器理解深度学习训练中的数据瓶颈。",
            [

                paragraph(
                    "在训练神经网络时，GPU 可能非常擅长矩阵计算，但原始数据通常存储在磁盘、数据库或者网络存储中。"
                ),

                paragraph(
                    "如果每次模型准备计算时才开始读取文件、解码图片、处理文本，那么 GPU 可能需要等待数据准备完成。"
                ),

                diagram(
                    "没有数据预加载",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>读取数据</strong>
                                <span>等待</span>
                            </div>

                            <div class="diagram-box">
                                <strong>预处理</strong>
                                <span>等待</span>
                            </div>

                            <div class="diagram-box">
                                <strong>GPU</strong>
                                <span>等待</span>
                            </div>
                        </div>
                    `,
                    "数据处理太慢时，计算设备可能处于等待状态。"
                ),

                diagram(
                    "数据管道并行",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>Worker 1</strong>
                                <span>准备 Batch N+1</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Worker 2</strong>
                                <span>准备 Batch N+2</span>
                            </div>

                            <div class="diagram-box">
                                <strong>GPU</strong>
                                <span>计算 Batch N</span>
                            </div>
                        </div>
                    `,
                    "数据准备和模型计算可以在一定程度上形成流水线。"
                ),

                paragraph(
                    "这就是为什么 DataLoader 提供了 num_workers 等机制。实际工程中还会涉及 pin_memory、prefetch、缓存、数据增强等更深入的优化问题。"
                ),

                paragraph(
                    "这些内容已经开始进入深度学习工程，而不只是 Python 基础。"
                ),

                callout(
                    "进一步学习",
                    "如果你想继续理解 Dataset、DataLoader、GPU、训练循环、CNN、Transformer、优化器以及完整的深度学习训练流程，可以继续阅读本课程的“深度学习基础教程”。"
                ),

                thinking(
                    "思考",
                    "如果模型每个 batch 只需要 20ms，而数据准备需要 100ms，那么真正的瓶颈在哪里？应该优先优化模型还是数据管道？"
                )
            ]
        ),


        /* =====================================================
           11-13
        ===================================================== */

        lesson(
            "py-11-13",
            "从数据管道到真实数据集",
            "把前面学习的迭代思想应用到文件、图片和大型数据集。",
            [

                paragraph(
                    "现在回头看前面的文件处理、MNIST 和生成器，会发现它们其实可以串成一条完整的数据处理思想。"
                ),

                diagram(
                    "真实数据处理链",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>磁盘</strong>
                            <span>文件 / 图片 / 二进制</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>读取</strong>
                            <span>bytes / text</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>解析</strong>
                            <span>结构化数据</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>清洗 / 转换</strong>
                            <span>Python objects / tensors</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Batch</strong>
                            <span>mini-batch</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>模型 / 分析</strong>
                            <span>计算结果</span>
                        </div>
                    </div>
                    `,
                    "从文件到模型，本质上是一条数据管道。"
                ),

                paragraph(
                    "你在第 8 章解析 MNIST 时已经做过类似的事情：读取二进制文件、解析 header、读取像素数据、转换成 Python 数据结构。"
                ),

                paragraph(
                    "现在再加入 iterator、generator 和 DataLoader，就可以进一步思考：是不是没有必要一次性把整个数据集全部转换完成？"
                ),

                code(
                    `def load_samples(files):

    for file in files:

        sample = read_sample(file)

        sample = clean(sample)

        sample = transform(sample)

        yield sample


for sample in load_samples(files):

    process(sample)`,
                    "按需处理数据"
                ),

                callout(
                    "核心思想",
                    "数据规模越大，“一次性全部处理”越危险。迭代器和生成器让我们能够把数据处理过程拆成连续的数据流。"
                ),

                practice(
                    "练习 97：MNIST 数据流",
                    "尝试设计一个生成器，让它逐个读取 MNIST 样本，而不是一次性创建所有样本对象。"
                )
            ]
        ),


        /* =====================================================
           11-14
        ===================================================== */

        lesson(
            "py-11-14",
            "什么时候应该使用 List，什么时候应该使用 Generator？",
            "建立真正的工程判断，而不是盲目追求惰性计算。",
            [

                paragraph(
                    "生成器并不是永远优于 list。它们解决的是不同的问题。"
                ),

                concepts([
                    "数据很小，而且需要多次访问 → list 往往更简单",
                    "需要随机访问第 N 个元素 → list 通常更方便",
                    "数据量很大 → generator 可能更合适",
                    "数据只需要遍历一次 → generator 很有价值",
                    "数据来自文件或网络流 → generator 很自然",
                    "需要保存全部结果 → list 更直接"
                ]),

                code(
                    `numbers = [
    number * number
    for number in range(100)
]

print(numbers[50])`,
                    "List：可以随机访问"
                ),

                code(
                    `numbers = (
    number * number
    for number in range(100000000)
)

for number in numbers:

    if number > 1000:
        print(number)
        break`,
                    "Generator：按需产生"
                ),

                paragraph(
                    "这里 generator 并没有提前创建 1 亿个结果。程序真正需要多少，就计算多少。"
                ),

                diagram(
                    "List vs Generator",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>List</strong>
                                <span>全部计算</span>
                                <span>全部保存</span>
                                <span>可以重复访问</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Generator</strong>
                                <span>按需计算</span>
                                <span>逐个产生</span>
                                <span>适合数据流</span>
                            </div>
                        </div>
                    `,
                    "选择哪一种方式取决于数据规模和访问方式。"
                ),

                thinking(
                    "工程判断",
                    "一个 CSV 文件只有 500 行，和一个 CSV 文件有 5 亿行，你会使用完全相同的数据读取方式吗？"
                )
            ]
        ),


        /* =====================================================
           11-15
        ===================================================== */

        lesson(
            "py-11-15",
            "综合实践：构建一个小型数据管道",
            "综合使用推导式、生成器、batch 和统计。",
            [

                paragraph(
                    "最后做一个不依赖 PyTorch 的小型数据管道，先用纯 Python 理解思想。"
                ),

                code(
                    `def read_scores():

    data = [
        ("Alice", 95),
        ("Bob", 81),
        ("Charlie", 67),
        ("David", 92),
        ("Eva", 55),
        ("Frank", 88)
    ]

    for item in data:
        yield item


def filter_passed(records):

    for name, score in records:

        if score >= 60:
            yield name, score


def add_grade(records):

    for name, score in records:

        if score >= 90:
            grade = "A"

        elif score >= 80:
            grade = "B"

        elif score >= 70:
            grade = "C"

        else:
            grade = "D"

        yield {
            "name": name,
            "score": score,
            "grade": grade
        }


records = read_scores()

records = filter_passed(records)

records = add_grade(records)


for record in records:
    print(record)`,
                    "完整数据管道"
                ),

                paragraph(
                    "注意：每一个阶段都没有负责所有事情。"
                ),

                concepts([
                    "read_scores：负责产生数据",
                    "filter_passed：负责过滤",
                    "add_grade：负责转换",
                    "for：负责消费最终结果",
                    "每个阶段都可以独立修改"
                ]),

                paragraph(
                    "这就是数据管道思想。它和前面 PyTorch Dataset → DataLoader → Training Loop 的结构有很强的相似性。"
                ),

                practice(
                    "练习 98：加入统计",
                    "在数据管道最后增加统计逻辑，计算平均分、最高分、最低分和各等级人数。"
                ),

                practice(
                    "练习 99：加入 batch",
                    "自己实现一个 batch_generator，每次返回固定数量的数据。"
                ),

                code(
                    `def batch_generator(
    iterable,
    batch_size
):

    batch = []

    for item in iterable:

        batch.append(item)

        if len(batch) == batch_size:
            yield batch
            batch = []

    if batch:
        yield batch


numbers = range(10)

for batch in batch_generator(
    numbers,
    3
):
    print(batch)`,
                    "手写 Batch Generator"
                ),

                paragraph(
                    "现在你已经可以看到 DataLoader 的核心思想：从一个数据源持续获得样本，再按照 batch_size 组织成一批一批的数据。真正的框架会在这个基础上增加 shuffle、多进程加载、collate、预取等大量工程能力。"
                )
            ]
        ),


        /* =====================================================
           11-16
        ===================================================== */

        lesson(
            "py-11-16",
            "从 Python 数据处理进入深度学习",
            "总结本章，并把 Python 基础连接到后续的深度学习学习路径。",
            [

                paragraph(
                    "到这里，我们已经从最简单的列表推导式，一路走到了生成器、数据管道和 PyTorch DataLoader。看起来知识跨度很大，但它们实际上围绕着同一个问题：如何处理数据。"
                ),

                diagram(
                    "本章知识地图",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Comprehension</strong>
                            <span>转换数据</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Iterable</strong>
                            <span>遍历数据</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Iterator</strong>
                            <span>逐个获取</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Generator</strong>
                            <span>按需产生</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Data Pipeline</strong>
                            <span>连续处理</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Dataset / DataLoader</strong>
                            <span>深度学习数据加载</span>
                        </div>
                    </div>
                    `,
                    "从 Python 基础走向真实数据工程。"
                ),

                concepts([
                    "推导式解决简洁的数据转换问题",
                    "enumerate 和 zip 让遍历更加清晰",
                    "Iterable 描述一个可以被遍历的数据源",
                    "Iterator 负责逐个提供数据",
                    "Generator 用 yield 实现按需产生数据",
                    "数据管道把多个处理阶段连接起来",
                    "Dataset 描述深度学习中的样本集合",
                    "DataLoader 把样本组织成训练需要的 batch",
                    "训练循环不断消费这些 batch"
                ]),

                callout(
                    "一个非常重要的认识",
                    "当你看到深度学习代码中的 for batch in dataloader 时，不要把它当成一个神秘的框架语法。它背后依然是 Python 的迭代思想。"
                ),

                paragraph(
                    "而在真实的深度学习项目中，模型本身往往只是整个系统的一部分。数据读取、清洗、预处理、数据增强、batch、采样、缓存、GPU 数据传输以及训练监控，同样非常重要。"
                ),

                paragraph(
                    "如果你已经理解了本章的数据处理思想，那么继续学习深度学习时，就不会只停留在“调用一个模型函数”这一层，而能够进一步理解训练系统为什么这样组织。"
                ),

                callout(
                    "继续学习：深度学习基础",
                    "接下来可以进入“深度学习基础教程”，进一步学习 Tensor、神经网络、反向传播、损失函数、优化器、CNN、Transformer、Dataset、DataLoader、GPU 训练以及完整的深度学习项目。"
                ),

                checklist([
                    "我理解什么是 Pythonic 数据处理",
                    "我会使用 list comprehension",
                    "我会使用 dict / set comprehension",
                    "我理解 enumerate 和 zip",
                    "我理解 any、all 和 sorted",
                    "我知道 iterable 和 iterator 的区别",
                    "我理解 iter() 和 next()",
                    "我理解 yield",
                    "我理解 generator 的惰性计算",
                    "我能设计简单的数据管道",
                    "我理解 batch 的意义",
                    "我理解 Dataset 的基本职责",
                    "我理解 DataLoader 的基本职责",
                    "我知道 shuffle 和 batch_size 是做什么的",
                    "我理解数据加载可能成为训练瓶颈",
                    "我能够读懂一个基本的 PyTorch 训练循环"
                ]),

                paragraph(
                    "下一章将进入更可靠的 Python 工程实践：测试、类型标注、代码质量以及如何让越来越大的 Python 程序保持可维护。"
                )
            ]
        )
    ]
};


export { chapter11 };

export default chapter11;