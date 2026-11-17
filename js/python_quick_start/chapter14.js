/* =========================================================
   PYTHON QUICK START
   chapter14.js

   第 14 章：Python 数据科学基础

   NumPy + Matplotlib

   本章定位：

   从 Python 原生数据结构进入科学计算。

   重点不是记忆 API，而是理解：

   Python List
        ↓
   NumPy ndarray
        ↓
   向量化计算
        ↓
   多维数组
        ↓
   Shape
        ↓
   Indexing / Slicing
        ↓
   Broadcasting
        ↓
   Statistics
        ↓
   Random Data
        ↓
   Machine Learning Data
        ↓
   Matplotlib Visualization

   本章结束后，为机器学习、深度学习中的：

   X
   y
   batch
   feature
   matrix
   tensor

   打下基础。
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


export const chapter14 = {

    id: "chapter-14",

    number: "14",

    title: "Python 数据科学基础",

    englishTitle: "NumPy & Matplotlib",

    description:
        "从 Python 原生数据结构进入科学计算。系统学习 NumPy 数组、向量化计算、矩阵、索引、切片、广播、统计、随机数以及 Matplotlib 可视化，为后面的机器学习和深度学习建立数值计算基础。",

    sections: [


        /* =====================================================
           01
        ===================================================== */

        lesson(
            "py-14-01",

            "为什么机器学习需要 NumPy？",

            "先理解问题，再学习工具。NumPy 并不是为了替代 Python，而是为大量数值计算提供更适合的数据结构和计算方式。",

            [

                paragraph(
                    "在前面的章节中，我们已经可以使用 Python 的 list 保存一组数字。对于少量数据，这完全没有问题。"
                ),

                code(
                    `scores = [72, 85, 91, 68, 94]

print(scores)

print(sum(scores) / len(scores))`,
                    "Python List"
                ),

                paragraph(
                    "但是机器学习面对的通常不是几个数字，而可能是几十万、几百万甚至更大的数值集合。更重要的是，这些数字往往具有明确的结构。"
                ),

                diagram(
                    "从一个数字到数据矩阵",

                    `
                    <div class="diagram-grid">

                        <div class="diagram-node">
                            标量
                            <small>42</small>
                        </div>

                        <div class="diagram-node">
                            向量
                            <small>[1, 2, 3]</small>
                        </div>

                        <div class="diagram-node">
                            矩阵
                            <small>3 × 4</small>
                        </div>

                        <div class="diagram-node">
                            多维数组
                            <small>batch × channel × height × width</small>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "NumPy 最核心的对象是 ndarray，也就是 N-dimensional array。它可以把数据组织成一维、二维甚至更高维的数组，并提供大量针对数组的高效数值计算。"
                ),

                code(
                    `import numpy as np


scores = np.array([
    72, 85, 91, 68, 94
])

print(scores)

print(scores.mean())`,
                    "第一个 NumPy 数组"
                ),

                concepts([
                    "ndarray：NumPy 的核心数组对象",
                    "shape：数组的形状",
                    "ndim：数组有多少个维度",
                    "size：数组中有多少个元素",
                    "dtype：数组元素的数据类型"
                ]),

                practice(
                    "练习 96：第一次观察 ndarray",

                    "创建一个 NumPy 数组，并分别查看它的 shape、ndim、size 和 dtype。"
                )
            ]
        ),


        /* =====================================================
           02
        ===================================================== */

        lesson(
            "py-14-02",

            "ndarray：真正理解 NumPy 的核心",

            "NumPy 的学习核心不是记住函数，而是理解 ndarray 是什么。",

            [

                code(
                    `import numpy as np


x = np.array([
    [1, 2, 3],
    [4, 5, 6]
])


print(x)

print("shape:", x.shape)
print("ndim:", x.ndim)
print("size:", x.size)
print("dtype:", x.dtype)`,
                    "观察二维数组"
                ),

                diagram(
                    "二维 ndarray",

                    `
                    <div class="diagram-table">

                        <div>1</div>
                        <div>2</div>
                        <div>3</div>

                        <div>4</div>
                        <div>5</div>
                        <div>6</div>

                    </div>
                    `,

                    "这个数组的 shape 是 (2, 3)，表示 2 行、3 列。"
                ),

                paragraph(
                    "在机器学习中，shape 是非常重要的概念。很多程序报错并不是因为算法错了，而是因为数据的 shape 不符合预期。"
                ),

                code(
                    `X = np.array([
    [18, 170],
    [20, 175],
    [25, 180]
])


print(X.shape)`,
                    "机器学习中的二维数据"
                ),

                paragraph(
                    "这里可以把每一行理解成一个样本，把每一列理解成一个特征。"
                ),

                diagram(
                    "机器学习中的 X",

                    `
                    <div class="diagram-table">

                        <div>年龄</div>
                        <div>身高</div>

                        <div>18</div>
                        <div>170</div>

                        <div>20</div>
                        <div>175</div>

                        <div>25</div>
                        <div>180</div>

                    </div>
                    `,

                    "3 个样本 × 2 个特征"
                ),

                callout(
                    "非常重要",

                    "以后进入机器学习，你会经常看到 X.shape、y.shape、batch.shape。现在理解 shape，后面的机器学习会轻松很多。"
                )
            ]
        ),


        /* =====================================================
           03
        ===================================================== */

        lesson(
            "py-14-03",

            "创建 NumPy 数组",

            "学习几种最常见的数据创建方式，并理解它们分别适合什么场景。",

            [

                code(
                    `import numpy as np


a = np.array([1, 2, 3])

b = np.zeros(5)

c = np.ones(5)

d = np.arange(0, 10)

e = np.arange(0, 1, 0.2)

f = np.linspace(0, 1, 6)


print(a)
print(b)
print(c)
print(d)
print(e)
print(f)`,
                    "常见数组创建方式"
                ),

                paragraph(
                    "这些函数并不是让你背下来，而是逐渐建立一个感觉：NumPy 可以非常方便地生成具有规律的数值数据。"
                ),

                concepts([
                    "np.array()：从已有数据创建数组",
                    "np.zeros()：创建全 0 数组",
                    "np.ones()：创建全 1 数组",
                    "np.arange()：按照步长生成数据",
                    "np.linspace()：在区间内均匀生成数据"
                ]),

                practice(
                    "练习 97：生成实验数据",

                    "生成 0 到 10 之间等间距的 11 个数字，并观察它们的 shape。"
                )
            ]
        ),


        /* =====================================================
           04
        ===================================================== */

        lesson(
            "py-14-04",

            "索引与切片：和 Python 很像，但能力更强",

            "NumPy 保留了 Python 序列的索引思想，同时增加了多维数组索引。",

            [

                code(
                    `import numpy as np


x = np.array([
    10, 20, 30, 40, 50
])


print(x[0])
print(x[-1])

print(x[1:4])`,
                    "一维数组"
                ),

                code(
                    `x = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])


print(x[0, 0])

print(x[1, 2])

print(x[0])

print(x[:, 1])

print(x[0:2, 1:3])`,
                    "二维数组索引"
                ),

                diagram(
                    "二维数组坐标",

                    `
                    <div class="diagram-table">

                        <div>1</div>
                        <div>2</div>
                        <div>3</div>

                        <div>4</div>
                        <div>5</div>
                        <div>6</div>

                        <div>7</div>
                        <div>8</div>
                        <div>9</div>

                    </div>
                    `,

                    "x[row, column]：第一个索引选择行，第二个索引选择列。"
                ),

                practice(
                    "练习 98：提取矩阵",

                    "创建一个 4×4 数组，分别提取第一行、最后一列、中间 2×2 区域。"
                )
            ]
        ),


        /* =====================================================
           05
        ===================================================== */

        lesson(
            "py-14-05",

            "向量化：不要什么事情都写 for 循环",

            "这是 NumPy 最重要的思想之一：让数组运算表达数学运算。",

            [

                code(
                    `import numpy as np


x = np.array([
    1, 2, 3, 4, 5
])


print(x * 2)

print(x + 10)

print(x ** 2)`,
                    "数组运算"
                ),

                paragraph(
                    "如果使用 Python list，我们通常需要自己写循环。但 NumPy 可以直接对整个数组执行运算。"
                ),

                code(
                    `x = np.array([
    1, 2, 3, 4, 5
])


y = x * 2


print(y)`,
                    "向量化"
                ),

                paragraph(
                    "这不仅让代码更接近数学表达式，也通常能够利用 NumPy 底层经过优化的数值计算实现。"
                ),

                diagram(
                    "向量化思维",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            [1, 2, 3, 4]
                        </div>

                        <div class="diagram-arrow">× 2 →</div>

                        <div class="diagram-node">
                            [2, 4, 6, 8]
                        </div>

                    </div>
                    `
                ),

                practice(
                    "练习 99：向量化计算",

                    "创建一个包含 1 到 10 的数组，计算每个数字的平方、平方根以及加 100 后的结果。尽量不要写 Python for 循环。"
                )
            ]
        ),


        /* =====================================================
           06
        ===================================================== */

        lesson(
            "py-14-06",

            "矩阵运算：机器学习真正开始出现",

            "理解矩阵，不需要马上学习复杂线性代数，但需要知道数据为什么会变成矩阵。",

            [

                paragraph(
                    "机器学习中的数据通常可以表示为矩阵。假设有 100 个样本，每个样本有 5 个特征，那么 X 可以表示成一个 100×5 的矩阵。"
                ),

                code(
                    `import numpy as np


X = np.array([
    [1, 2],
    [3, 4],
    [5, 6]
])


W = np.array([
    [0.5],
    [1.0]
])


y = X @ W


print(y)`,
                    "矩阵乘法"
                ),

                paragraph(
                    "这里的 @ 是矩阵乘法。后面的机器学习模型会大量进行类似的矩阵运算。"
                ),

                diagram(
                    "机器学习中的矩阵关系",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            X
                            <small>样本 × 特征</small>
                        </div>

                        <div class="diagram-arrow"> @ </div>

                        <div class="diagram-node">
                            W
                            <small>特征 × 权重</small>
                        </div>

                        <div class="diagram-arrow"> = </div>

                        <div class="diagram-node">
                            y
                            <small>预测结果</small>
                        </div>

                    </div>
                    `
                ),

                callout(
                    "机器学习连接",

                    "你现在看到的 X @ W 并不是一个孤立的 NumPy 技巧。它是后面理解线性回归、神经网络和深度学习计算过程的重要基础。"
                ),

                practice(
                    "练习 100：手算一次矩阵乘法",

                    "创建两个形状兼容的二维数组，使用 @ 完成矩阵乘法，并观察输入和输出的 shape。"
                )
            ]
        ),


        /* =====================================================
           07
        ===================================================== */

        lesson(
            "py-14-07",

            "Broadcasting：数组为什么可以直接相加？",

            "理解 NumPy 最容易让初学者困惑、但又非常重要的机制之一。",

            [

                code(
                    `import numpy as np


x = np.array([
    [1, 2, 3],
    [4, 5, 6]
])


bias = np.array([
    10, 20, 30
])


print(x + bias)`,
                    "Broadcasting"
                ),

                paragraph(
                    "这里 x 的 shape 是 (2, 3)，bias 的 shape 是 (3,)。NumPy 会根据广播规则，让 bias 参与每一行的计算。"
                ),

                diagram(
                    "广播",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            [10, 20, 30]
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-node">
                            [10, 20, 30]
                            <small>[10, 20, 30]</small>
                            <small>[10, 20, 30]</small>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "广播并不是简单地真的复制数组，而是 NumPy 根据形状规则解释运算。理解 broadcasting 后，很多机器学习代码会突然变得容易阅读。"
                ),

                practice(
                    "练习 101：理解广播",

                    "创建一个 3×3 数组，再创建一个长度为 3 的数组，尝试相加。然后改变第二个数组的 shape，观察哪些情况可以广播。"
                )
            ]
        ),


        /* =====================================================
           08
        ===================================================== */

        lesson(
            "py-14-08",

            "统计：从数组中获得信息",

            "机器学习之前，必须先学会观察数据。",

            [

                code(
                    `import numpy as np


scores = np.array([
    72, 85, 91, 68, 94, 88
])


print("mean:", scores.mean())
print("max:", scores.max())
print("min:", scores.min())
print("std:", scores.std())
print("sum:", scores.sum())`,
                    "基本统计"
                ),

                paragraph(
                    "NumPy 可以沿着指定 axis 进行统计。理解 axis 对后面的机器学习和数据处理非常重要。"
                ),

                code(
                    `X = np.array([
    [10, 20],
    [20, 30],
    [30, 40]
])


print(X.mean(axis=0))

print(X.mean(axis=1))`,
                    "axis"
                ),

                diagram(
                    "axis 的直觉",

                    `
                    <div class="diagram-grid">

                        <div class="diagram-node">
                            axis=0
                            <small>按列统计</small>
                        </div>

                        <div class="diagram-node">
                            axis=1
                            <small>按行统计</small>
                        </div>

                    </div>
                    `
                ),

                practice(
                    "练习 102：分析特征",

                    "创建一个“样本 × 特征”的数组，分别计算每个特征的平均值和每个样本的平均值。"
                )
            ]
        ),


        /* =====================================================
           09
        ===================================================== */

        lesson(
            "py-14-09",

            "布尔索引：像数据库查询一样筛选数据",

            "NumPy 不只是计算，还可以非常方便地筛选数据。",

            [

                code(
                    `import numpy as np


scores = np.array([
    55, 72, 91, 63, 88, 97
])


mask = scores >= 80

print(mask)

print(scores[mask])`,
                    "布尔索引"
                ),

                paragraph(
                    "mask 本身也是一个数组。它告诉 NumPy 每个位置是否满足条件。"
                ),

                code(
                    `X = np.array([
    [18, 170],
    [20, 175],
    [25, 180],
    [30, 165]
])


mask = X[:, 1] >= 170

print(X[mask])`,
                    "按照条件筛选样本"
                ),

                practice(
                    "练习 103：筛选数据",

                    "创建一个包含年龄和身高的数据集，只保留身高大于等于 170 的样本。"
                )
            ]
        ),


        /* =====================================================
           10
        ===================================================== */

        lesson(
            "py-14-10",

            "随机数：机器学习中的数据从哪里来？",

            "理解 NumPy 随机数，并用它生成实验数据。",

            [

                code(
                    `import numpy as np


rng = np.random.default_rng(42)


print(
    rng.random(5)
)

print(
    rng.integers(
        0,
        10,
        size=10
    )
)`,
                    "NumPy 随机数"
                ),

                paragraph(
                    "这里使用 default_rng() 创建随机数生成器，并显式指定 seed。固定 seed 可以让实验结果具有可重复性。"
                ),

                code(
                    `rng = np.random.default_rng(42)


X = rng.normal(
    loc=0,
    scale=1,
    size=(100, 2)
)


print(X.shape)

print(X[:5])`,
                    "生成实验数据"
                ),

                concepts([
                    "随机数据可以用于测试算法",
                    "seed 可以让实验可重复",
                    "normal distribution 是机器学习中常见的数据分布",
                    "随机数生成是实验和模拟的重要工具"
                ]),

                practice(
                    "练习 104：生成一个数据集",

                    "生成 1000 个二维随机样本，并计算两个特征的平均值和标准差。"
                )
            ]
        ),


        /* =====================================================
           11
        ===================================================== */

        lesson(
            "py-14-11",

            "从数据到图：为什么需要 Matplotlib？",

            "数字可以告诉你结果，但图形往往能让你直接看到数据的结构。",

            [

                paragraph(
                    "如果一个数据集中有 10,000 个数字，仅仅 print 出来几乎没有意义。我们需要一种方式把数据转换成可以观察的视觉结构。"
                ),

                code(
                    `import matplotlib.pyplot as plt


x = [1, 2, 3, 4, 5]

y = [2, 4, 3, 7, 8]


plt.plot(x, y)

plt.show()`,
                    "第一张折线图"
                ),

                paragraph(
                    "Matplotlib 的核心思想并不复杂：准备数据 → 创建图形 → 添加信息 → 显示或保存。"
                ),

                diagram(
                    "数据可视化流程",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            数据
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Figure
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Axes
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            图表
                        </div>

                    </div>
                    `
                )
            ]
        ),


        /* =====================================================
           12
        ===================================================== */

        lesson(
            "py-14-12",

            "Matplotlib：折线图、散点图与柱状图",

            "掌握机器学习前最常用的几种可视化方式。",

            [

                code(
                    `import matplotlib.pyplot as plt


x = [1, 2, 3, 4, 5]

y = [2, 5, 3, 8, 7]


plt.plot(
    x,
    y,
    marker="o"
)

plt.xlabel("Epoch")

plt.ylabel("Loss")

plt.title("Training Loss")

plt.show()`,
                    "折线图"
                ),

                code(
                    `import numpy as np
import matplotlib.pyplot as plt


rng = np.random.default_rng(42)


x = rng.normal(
    0,
    1,
    100
)

y = rng.normal(
    0,
    1,
    100
)


plt.scatter(x, y)

plt.xlabel("Feature 1")

plt.ylabel("Feature 2")

plt.title("Scatter Plot")

plt.show()`,
                    "散点图"
                ),

                code(
                    `import matplotlib.pyplot as plt


labels = [
    "A",
    "B",
    "C",
    "D"
]

values = [
    82,
    91,
    73,
    88
]


plt.bar(
    labels,
    values
)

plt.ylabel("Score")

plt.title("Scores")

plt.show()`,
                    "柱状图"
                ),

                concepts([
                    "折线图：观察变化趋势",
                    "散点图：观察两个变量之间的关系",
                    "柱状图：比较不同类别",
                    "直方图：观察数值分布"
                ]),

                practice(
                    "练习 105：选择合适的图",

                    "给定一组成绩、一天中的温度变化和两个特征的数据，分别选择最合适的图表进行可视化。"
                )
            ]
        ),


        /* =====================================================
           13
        ===================================================== */

        lesson(
            "py-14-13",

            "用 Matplotlib 观察数据分布",

            "进入机器学习之前，先学会问数据问题。",

            [

                code(
                    `import numpy as np
import matplotlib.pyplot as plt


rng = np.random.default_rng(42)


scores = rng.normal(
    75,
    10,
    1000
)


plt.hist(
    scores,
    bins=30
)

plt.xlabel("Score")

plt.ylabel("Count")

plt.title("Score Distribution")

plt.show()`,
                    "直方图"
                ),

                paragraph(
                    "直方图可以帮助我们观察数据集中在哪里、是否分散、是否存在异常值，以及数据大致呈现什么分布。"
                ),

                thinking(
                    "数据科学思维",

                    "如果两个机器学习模型准确率都是 90%，但一个模型的错误集中在少数样本上，另一个模型的错误平均分布，你觉得它们真的完全一样吗？"
                ),

                practice(
                    "练习 106：观察数据分布",

                    "生成一组随机数据，分别使用不同均值和标准差生成两个分布，并画出直方图进行比较。"
                )
            ]
        ),


        /* =====================================================
           14
        ===================================================== */

        lesson(
            "py-14-14",

            "用 NumPy + Matplotlib 做一次完整数据分析",

            "第一次把数值计算和可视化组合起来。",

            [

                paragraph(
                    "现在不再分别练习 NumPy 和 Matplotlib，而是完成一次完整的数据分析流程。"
                ),

                code(
                    `import numpy as np
import matplotlib.pyplot as plt


rng = np.random.default_rng(42)


hours = rng.uniform(
    1,
    10,
    100
)


noise = rng.normal(
    0,
    5,
    100
)


scores = (
    hours * 8
    + noise
)


print(
    "平均学习时间:",
    hours.mean()
)

print(
    "平均成绩:",
    scores.mean()
)`,
                    "生成实验数据"
                ),

                code(
                    `plt.scatter(
    hours,
    scores
)

plt.xlabel(
    "Study Hours"
)

plt.ylabel(
    "Score"
)

plt.title(
    "Study Hours vs Score"
)

plt.show()`,
                    "观察变量关系"
                ),

                paragraph(
                    "现在我们已经完成了一个最简单的数据科学流程：生成数据 → 统计数据 → 可视化数据 → 观察变量之间的关系。"
                ),

                thinking(
                    "继续思考",

                    "从散点图中，你能不能判断学习时间和成绩之间是否存在关系？如果存在，这种关系能不能用一个数学模型描述？"
                ),

                callout(
                    "机器学习入口",

                    "这个问题已经非常接近机器学习：如果我们知道输入 X 和结果 y，能不能让程序自动学习 X 与 y 之间的关系？"
                ),

                practice(
                    "练习 107：寻找数据关系",

                    "生成两个具有不同关系的数据集，例如线性关系和随机关系，并分别画出散点图。观察它们有什么区别。"
                )
            ]
        ),


        /* =====================================================
           15
        ===================================================== */

        lesson(
            "py-14-15",

            "机器学习中的 X、y、Feature 与 Target",

            "正式把 NumPy 和机器学习的数据结构连接起来。",

            [

                paragraph(
                    "机器学习中最常见的一种数据表达方式是：X 表示输入特征，y 表示目标结果。"
                ),

                code(
                    `import numpy as np


X = np.array([
    [1, 20],
    [2, 25],
    [3, 30],
    [4, 35]
])


y = np.array([
    42,
    50,
    61,
    70
])


print("X shape:", X.shape)

print("y shape:", y.shape)`,
                    "X 与 y"
                ),

                diagram(
                    "机器学习数据",

                    `
                    <div class="diagram-grid">

                        <div class="diagram-node">
                            X
                            <small>输入特征</small>
                            <small>samples × features</small>
                        </div>

                        <div class="diagram-node">
                            y
                            <small>目标值</small>
                            <small>samples</small>
                        </div>

                    </div>
                    `
                ),

                concepts([
                    "Sample：一个样本",
                    "Feature：描述样本的特征",
                    "Target：希望模型预测的目标",
                    "X：通常保存输入特征",
                    "y：通常保存目标值"
                ]),

                paragraph(
                    "例如预测房价时，X 可以包含面积、房间数量、楼层等特征，而 y 可以是房价。"
                ),

                practice(
                    "练习 108：构造机器学习数据",

                    "设计一个简单的数据集，例如房屋面积、房间数量和价格，并分别构造 X 和 y。"
                )
            ]
        ),


        /* =====================================================
           16
        ===================================================== */

        lesson(
            "py-14-16",

            "训练过程可视化：Loss 为什么要画出来？",

            "第一次用 Matplotlib 观察模型训练过程，为后面的机器学习和深度学习做准备。",

            [

                paragraph(
                    "机器学习训练通常不是一次完成的，而是不断调整参数，让损失函数逐渐下降。"
                ),

                code(
                    `import matplotlib.pyplot as plt


epochs = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10
]


loss = [
    2.8,
    2.1,
    1.7,
    1.35,
    1.1,
    0.92,
    0.78,
    0.69,
    0.61,
    0.56
]


plt.plot(
    epochs,
    loss,
    marker="o"
)

plt.xlabel("Epoch")

plt.ylabel("Loss")

plt.title("Training Loss")

plt.show()`,
                    "观察训练 Loss"
                ),

                paragraph(
                    "如果 Loss 总体下降，通常说明模型正在学习。但如果 Loss 一直不下降、剧烈震荡或者训练集 Loss 很低而验证集 Loss 很高，就需要进一步分析。"
                ),

                diagram(
                    "训练曲线",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            Epoch 1
                            <small>Loss 高</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Epoch 10
                            <small>Loss 降低</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            模型逐渐学习
                        </div>

                    </div>
                    `
                ),

                callout(
                    "连接深度学习",

                    "以后学习 PyTorch 时，你会经常看到训练 Loss、验证 Loss、Accuracy 等曲线。Matplotlib 会成为观察训练过程的重要工具。"
                ),

                practice(
                    "练习 109：绘制训练曲线",

                    "自己构造一组逐渐下降的 Loss 数据，并绘制训练曲线。然后再构造一组震荡的数据，比较两张图。"
                )
            ]
        ),


        /* =====================================================
           17
        ===================================================== */

        lesson(
            "py-14-17",

            "综合项目：用 NumPy 实现一个简单的线性模型",

            "不要急着使用机器学习框架。先用 NumPy 理解一个最简单模型到底在计算什么。",

            [

                paragraph(
                    "我们已经知道 X、y、矩阵乘法和可视化。现在把它们组合起来。"
                ),

                paragraph(
                    "假设我们希望建立一个最简单的模型："
                ),

                code(
                    `y = X * w + b`,
                    "线性模型"
                ),

                paragraph(
                    "其中 w 是权重，b 是偏置。我们暂时不使用 sklearn 或 PyTorch，而是直接使用 NumPy 进行预测。"
                ),

                code(
                    `import numpy as np


X = np.array([
    1,
    2,
    3,
    4,
    5
])


y = np.array([
    3,
    5,
    7,
    9,
    11
])


w = 2

b = 1


prediction = X * w + b


print(prediction)`,
                    "线性模型预测"
                ),

                paragraph(
                    "现在模型实际上已经可以产生预测了。下一步的问题就是：如果 w 和 b 一开始不知道，如何自动找到它们？"
                ),

                thinking(
                    "机器学习真正的问题",

                    "如果程序不知道正确的 w 和 b，我们能不能定义一个“错误有多大”的指标，然后不断调整 w 和 b，让错误越来越小？"
                ),

                diagram(
                    "从 NumPy 进入机器学习",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            X
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            模型
                            <small>w, b</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            prediction
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Loss
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            调整参数
                        </div>

                    </div>
                    `
                ),

                practice(
                    "项目练习 110：NumPy 线性回归实验",

                    "使用 NumPy 构造一组带噪声的线性数据，手动尝试不同的 w 和 b，计算预测误差，并使用 Matplotlib 绘制真实数据和预测直线。"
                )
            ]
        ),


        /* =====================================================
           18
        ===================================================== */

        lesson(
            "py-14-18",

            "NumPy 到 Tensor：为什么深度学习又需要另一套数据结构？",

            "理解 NumPy ndarray 与深度学习 Tensor 之间的关系。",

            [

                paragraph(
                    "到了这里，你可能会产生一个问题：既然 NumPy 已经可以进行矩阵计算，为什么 PyTorch 还需要 Tensor？"
                ),

                paragraph(
                    "这是一个非常好的问题。NumPy 解决了科学计算中的大量数组问题，而深度学习框架需要进一步支持自动求导、GPU 加速、模型训练以及更完整的计算图体系。"
                ),

                diagram(
                    "数据结构的发展",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            Python List
                            <small>通用数据</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            NumPy ndarray
                            <small>科学计算</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            PyTorch Tensor
                            <small>深度学习</small>
                        </div>

                    </div>
                    `
                ),

                code(
                    `import numpy as np


x = np.array([
    [1, 2],
    [3, 4]
])


print(x.shape)`,
                    "NumPy 数据"
                ),

                code(
                    `import torch


x = torch.tensor([
    [1, 2],
    [3, 4]
])


print(x.shape)`,
                    "PyTorch Tensor",
                    "python"
                ),

                paragraph(
                    "两者在很多基本数组操作上有相似之处，但 PyTorch Tensor 进一步服务于深度学习训练。"
                ),

                callout(
                    "下一步",

                    "如果你准备继续学习机器学习和深度学习，现在已经具备了非常重要的一层基础：你知道数据是什么、shape 是什么、矩阵是什么、如何计算、如何观察数据，以及训练过程为什么需要可视化。"
                )
            ]
        ),


        /* =====================================================
           19
        ===================================================== */

        lesson(
            "py-14-19",

            "本章总结：数据科学真正开始了",

            "把 NumPy 和 Matplotlib 放回整个 Python 学习体系中。",

            [

                diagram(
                    "Python → 数据科学 → 机器学习",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            Python
                            <small>程序设计</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            NumPy
                            <small>数值计算</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Matplotlib
                            <small>数据可视化</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Machine Learning
                            <small>从数据学习</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Deep Learning
                            <small>神经网络</small>
                        </div>

                    </div>
                    `
                ),

                checklist([
                    "理解 NumPy ndarray",
                    "理解 shape、ndim、size、dtype",
                    "能够创建 NumPy 数组",
                    "掌握一维和二维数组索引",
                    "掌握切片",
                    "理解向量化计算",
                    "理解矩阵乘法",
                    "理解 Broadcasting",
                    "掌握基本统计计算",
                    "能够使用布尔索引筛选数据",
                    "能够生成随机实验数据",
                    "能够使用 Matplotlib 绘图",
                    "能够使用散点图观察变量关系",
                    "能够使用直方图观察数据分布",
                    "能够绘制训练 Loss 曲线",
                    "理解机器学习中的 X 和 y",
                    "理解 Feature 与 Target",
                    "理解 NumPy 与 Tensor 的关系"
                ]),

                paragraph(
                    "从这里开始，Python 的学习方向会发生明显变化。前面的章节主要解决“如何写程序”，而接下来的机器学习内容开始解决另一个问题："
                ),

                callout(
                    "真正的问题",

                    "如果我们拥有大量数据，能不能让程序自己从数据中找到规律？"
                ),

                paragraph(
                    "这就是机器学习真正要解决的问题。"
                ),

                paragraph(
                    "如果你准备继续深入，可以进一步学习 Pandas 数据分析，然后进入机器学习基础；如果目标是深度学习，则可以继续学习 PyTorch、Dataset、DataLoader、训练循环、神经网络和 GPU 计算。"
                )
            ]
        )

    ]
};


export default chapter14;