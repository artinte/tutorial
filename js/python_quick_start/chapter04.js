/* =========================================================
   PYTHON QUICK START
   chapter04.js

   第四章：Python 数据结构
   ---------------------------------------------------------
   课程目标：

   1. 理解 Python 中最常见的数据结构
   2. 掌握 list / tuple / dict / set
   3. 理解索引、切片、遍历、修改
   4. 学会使用常见数据结构方法
   5. 能够组合使用嵌套数据结构
   6. 为后面的文件、数据处理、项目实战打基础

   说明：

   本章继续使用课程统一的内容结构：

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


/* =========================================================
   数据结构图
========================================================= */

/**
 * 数据结构图
 *
 * main.js 后续可以统一处理：
 *
 * block.type === "diagram"
 *
 * block.title
 * block.description
 * block.html
 *
 * 这里使用 HTML + CSS，而不是图片。
 *
 * 优点：
 * 1. 高清
 * 2. 可以响应式缩放
 * 3. 不依赖外部图片
 * 4. 后续可以增加 hover / 点击交互
 * 5. 与教程整体 HTML 体系一致
 */
function diagram(title, html, description = "") {
    return {
        type: "diagram",
        title,
        description,
        html
    };
}


/* =========================================================
   Lesson
========================================================= */

function lesson(id, title, description, content) {
    return {
        id,
        title,
        description,
        content
    };
}


/* =========================================================
   第四章
========================================================= */

export const chapter04 = {

    id: "chapter-04",

    number: 4,

    title: "Python 数据结构",

    englishTitle: "Python Data Structures",

    description:
        "学习 List、Tuple、Dictionary、Set，以及如何使用嵌套数据结构组织真实世界的数据。",

    sections: [

        /* =================================================
           01
        ================================================= */

        lesson(
            "py-04-01",

            "List：最常用的数据容器",

            "理解列表、索引、切片、遍历和修改。",

            [

                paragraph(
                    "程序经常需要同时保存很多数据。例如一组学生成绩、一组商品、一组城市名称，或者一周每天的温度。如果每个数据都使用一个变量保存，程序很快就会变得难以维护。"
                ),

                code(
`score1 = 88
score2 = 92
score3 = 76
score4 = 95

print(score1)
print(score2)
print(score3)
print(score4)`,
                    "没有数据结构时"
                ),

                paragraph(
                    "Python 最常用的数据容器之一就是 list（列表）。列表可以把多个值放到同一个变量中，而且列表中的元素可以按照位置访问，也可以增加、删除和修改。"
                ),

                code(
`scores = [88, 92, 76, 95]

print(scores)

print(scores[0])
print(scores[1])
print(scores[2])
print(scores[3])`,
                    "创建 List"
                ),

                paragraph(
                    "列表中的每一个元素都有一个位置编号，这个编号叫做索引（index）。Python 的索引从 0 开始，而不是从 1 开始。"
                ),

                diagram(
                    "List 的索引结构",
                    `
<div class="ds-diagram list-index-diagram">

    <div class="ds-code-line">
        numbers = [10, 20, 30, 40]
    </div>

    <div class="ds-index-row">
        <span>索引</span>
        <b>0</b>
        <b>1</b>
        <b>2</b>
        <b>3</b>
    </div>

    <div class="ds-value-row">
        <span>值</span>
        <strong>10</strong>
        <strong>20</strong>
        <strong>30</strong>
        <strong>40</strong>
    </div>

    <div class="ds-index-row negative">
        <span>负索引</span>
        <b>-4</b>
        <b>-3</b>
        <b>-2</b>
        <b>-1</b>
    </div>

</div>
                    `,
                    "正索引从 0 开始；负索引从 -1 开始。"
                ),

                code(
`numbers = [10, 20, 30, 40]

print(numbers[0])
print(numbers[1])

print(numbers[-1])
print(numbers[-2])`,
                    "正索引与负索引"
                ),

                paragraph(
                    "负索引非常方便。-1 表示最后一个元素，-2 表示倒数第二个元素。"
                ),

                code(
`names = ["Alice", "Bob", "Charlie", "David"]

print(names[-1])
print(names[-2])`,
                    "访问最后几个元素"
                ),

                paragraph(
                    "除了访问元素，还可以直接修改列表中的元素。"
                ),

                code(
`names = ["Alice", "Bob", "Charlie"]

names[1] = "Ben"

print(names)`,
                    "修改 List"
                ),

                paragraph(
                    "List 是可变（mutable）的数据结构。这意味着创建之后仍然可以修改它。"
                ),

                callout(
                    "重要概念",
                    "List 的核心特点可以概括为：有顺序、有索引、可以重复、可以修改。"
                ),

                paragraph(
                    "列表还支持切片（slice）。切片可以一次取得列表中的一部分数据。基本形式是 start:stop:step，其中 stop 不包含在结果中。"
                ),

                diagram(
                    "List 切片",
                    `
<div class="ds-diagram slice-diagram">

    <div class="slice-expression">
        numbers[1:4]
    </div>

    <div class="slice-boxes">
        <span>10</span>
        <span class="selected">20</span>
        <span class="selected">30</span>
        <span class="selected">40</span>
        <span>50</span>
    </div>

    <div class="slice-index">
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
    </div>

    <div class="slice-arrow">
        取索引 1、2、3，不包含 4
    </div>

</div>
                    `,
                    "切片的 stop 位置永远不包含在结果中。"
                ),

                code(
`numbers = [10, 20, 30, 40, 50]

print(numbers[1:4])
print(numbers[:3])
print(numbers[2:])
print(numbers[::2])
print(numbers[::-1])`,
                    "List 切片"
                ),

                paragraph(
                    "切片不仅可以取中间一段，还可以通过省略 start 或 stop 来表示从开头取到某个位置，或者从某个位置取到结尾。step 则控制步长。"
                ),

                code(
`numbers = [0, 1, 2, 3, 4, 5, 6, 7]

print(numbers[:4])
print(numbers[4:])
print(numbers[::2])
print(numbers[1::2])
print(numbers[::-1])`,
                    "不同切片方式"
                ),

                paragraph(
                    "列表最常见的操作之一就是遍历。for 循环可以依次访问列表中的每个元素。"
                ),

                code(
`names = ["Alice", "Bob", "Charlie"]

for name in names:
    print(name)`,
                    "遍历 List"
                ),

                paragraph(
                    "可以把列表理解成一个有顺序的“盒子集合”。索引负责告诉 Python：我要取第几个盒子；切片负责告诉 Python：我要取哪一段盒子；for 循环则负责依次打开这些盒子。"
                ),

                concepts([
                    "List：有序的数据集合",
                    "索引从 0 开始",
                    "负索引从 -1 开始",
                    "List 可以修改",
                    "切片可以获取一部分数据",
                    "for 可以遍历 List"
                ]),

                practice(
                    "练习 1：访问列表元素",
                    "创建一个包含 5 个城市名称的列表，分别打印第一个城市、最后一个城市和中间的城市。",
`cities = ["Beijing", "Shanghai", "Shenzhen", "Hangzhou", "Chengdu"]

# 在这里完成代码
`
                ),

                practice(
                    "练习 2：列表切片",
                    "创建一个 1 到 10 的列表，分别打印前 3 个数字、后 3 个数字以及所有偶数。",
`numbers = list(range(1, 11))

# 在这里完成代码
`
                ),

                thinking(
                    "思考",
                    "为什么 Python 的列表索引从 0 开始，而不是从 1 开始？这种设计对于切片有什么好处？"
                )
            ]
        ),


        /* =================================================
           02
        ================================================= */

        lesson(
            "py-04-02",

            "List 方法：让列表真正工作起来",

            "掌握 append、insert、remove、pop、sort、reverse 等常见操作。",

            [

                paragraph(
                    "真正写程序时，我们不会只读取列表，还会不断增加、删除、排序和统计数据。Python 为 List 提供了大量内置方法。"
                ),

                paragraph(
                    "最常见的方法之一是 append()，它会把一个元素添加到列表末尾。"
                ),

                code(
`tasks = ["学习 Python", "写代码"]

tasks.append("做练习")

print(tasks)`,
                    "append()"
                ),

                paragraph(
                    "如果希望把元素插入到指定位置，可以使用 insert()。"
                ),

                code(
`numbers = [10, 30, 40]

numbers.insert(1, 20)

print(numbers)`,
                    "insert()"
                ),

                paragraph(
                    "删除元素时，可以根据值删除，也可以根据索引删除。remove() 删除指定值，pop() 删除指定位置并返回被删除的元素。"
                ),

                code(
`names = ["Alice", "Bob", "Charlie", "David"]

names.remove("Bob")

print(names)`,
                    "remove()"
                ),

                code(
`names = ["Alice", "Bob", "Charlie"]

removed = names.pop(1)

print("删除的是：", removed)
print("现在的列表：", names)`,
                    "pop()"
                ),

                paragraph(
                    "如果 pop() 不传参数，它默认删除最后一个元素。这个特性在实现“栈”结构时非常常见。"
                ),

                code(
`stack = []

stack.append("A")
stack.append("B")
stack.append("C")

print(stack)

item = stack.pop()

print("取出：", item)
print("剩余：", stack)`,
                    "使用 List 模拟栈"
                ),

                paragraph(
                    "列表还可以排序。sort() 会直接修改原来的列表，而 sorted() 会创建一个新的排序结果。"
                ),

                code(
`numbers = [5, 2, 9, 1, 7]

numbers.sort()

print(numbers)`,
                    "sort()"
                ),

                code(
`numbers = [5, 2, 9, 1, 7]

result = sorted(numbers)

print("原列表：", numbers)
print("排序结果：", result)`,
                    "sorted()"
                ),

                paragraph(
                    "这是一个非常重要的区别：sort() 修改原列表；sorted() 返回一个新的列表。"
                ),

                code(
`names = ["Charlie", "Alice", "David", "Bob"]

names.sort()

print(names)

names.reverse()

print(names)`,
                    "sort() + reverse()"
                ),

                paragraph(
                    "除了这些方法，还经常使用 len()、sum()、max()、min() 来统计列表。"
                ),

                code(
`scores = [88, 92, 76, 95, 84]

print("人数：", len(scores))
print("总分：", sum(scores))
print("最高分：", max(scores))
print("最低分：", min(scores))
print("平均分：", sum(scores) / len(scores))`,
                    "List 数据统计"
                ),

                paragraph(
                    "列表还可以判断某个元素是否存在。in 和 not in 是非常常用的成员运算符。"
                ),

                code(
`names = ["Alice", "Bob", "Charlie"]

print("Alice" in names)
print("David" in names)
print("David" not in names)`,
                    "成员判断"
                ),

                paragraph(
                    "index() 可以找到元素第一次出现的位置，count() 可以统计某个值出现了多少次。"
                ),

                code(
`numbers = [1, 2, 3, 2, 4, 2, 5]

print(numbers.index(3))
print(numbers.count(2))`,
                    "index() 与 count()"
                ),

                paragraph(
                    "实际开发中，经常需要把多个列表操作组合起来。例如先筛选数据，再排序，再取前几名。"
                ),

                code(
`scores = [72, 95, 88, 61, 97, 84, 90]

passed = []

for score in scores:
    if score >= 60:
        passed.append(score)

passed.sort(reverse=True)

print("及格成绩：", passed)
print("最高三名：", passed[:3])`,
                    "综合使用 List"
                ),

                concepts([
                    "append()：末尾添加",
                    "insert()：指定位置插入",
                    "remove()：按值删除",
                    "pop()：按位置删除并返回元素",
                    "sort()：原地排序",
                    "sorted()：生成新的排序结果",
                    "reverse()：反转列表",
                    "index()：查找位置",
                    "count()：统计出现次数"
                ]),

                practice(
                    "练习 3：管理购物车",
                    "创建一个购物车列表，完成添加商品、删除商品、排序并打印最终结果。",
`cart = ["键盘", "鼠标"]

# 添加商品
cart.append("显示器")
cart.append("耳机")

# 删除一个商品
cart.remove("鼠标")

# 排序
cart.sort()

print(cart)
`
                ),

                practice(
                    "练习 4：计算成绩",
                    "给定一组成绩，计算总分、平均分、最高分和最低分，并按照从高到低排序。",
`scores = [88, 76, 92, 65, 98, 84, 91]

# 在这里完成代码
`
                ),

                note(
                    "小心",
                    "remove() 如果找不到目标元素会产生 ValueError。实际程序中，删除之前经常先使用 in 判断元素是否存在。"
                )
            ]
        ),


        /* =================================================
           03
        ================================================= */

        lesson(
            "py-04-03",

            "Tuple：不可变的数据序列",

            "理解 tuple 与 list 的区别，并掌握元组解包。",

            [

                paragraph(
                    "Tuple（元组）和 List 很像，同样可以保存多个有顺序的数据。但是 Tuple 创建之后不能修改其中的元素。"
                ),

                code(
`point = (100, 200)

print(point)
print(point[0])
print(point[1])`,
                    "创建 Tuple"
                ),

                paragraph(
                    "如果尝试修改 Tuple，会产生 TypeError。"
                ),

                code(
`point = (100, 200)

# 取消注释后会报错
# point[0] = 300`,
                    "Tuple 不可修改"
                ),

                diagram(
                    "List 与 Tuple",
                    `
<div class="ds-diagram compare-diagram">

    <div class="compare-card">
        <div class="compare-title">List</div>
        <div class="compare-symbol">[ ]</div>
        <div class="compare-feature">有序</div>
        <div class="compare-feature">可以修改</div>
        <div class="compare-feature">适合动态数据</div>
    </div>

    <div class="compare-vs">VS</div>

    <div class="compare-card">
        <div class="compare-title">Tuple</div>
        <div class="compare-symbol">( )</div>
        <div class="compare-feature">有序</div>
        <div class="compare-feature">不能修改</div>
        <div class="compare-feature">适合固定数据</div>
    </div>

</div>
                    `,
                    "两者都保存有序数据，但可变性不同。"
                ),

                paragraph(
                    "例如一个二维坐标点，通常可以表示为 (x, y)。坐标属于一个整体，而且创建之后通常不希望被随意修改，这种场景就非常适合 Tuple。"
                ),

                code(
`point = (120, 80)

x = point[0]
y = point[1]

print("x =", x)
print("y =", y)`,
                    "坐标示例"
                ),

                paragraph(
                    "Tuple 最方便的特性之一是解包（unpacking）。可以直接把 Tuple 中的数据分别赋值给多个变量。"
                ),

                code(
`point = (120, 80)

x, y = point

print(x)
print(y)`,
                    "Tuple 解包"
                ),

                paragraph(
                    "实际上，解包并不只适用于 Tuple。只要一个对象包含多个可以依次取得的值，就经常可以使用这种方式。"
                ),

                code(
`user = ("Alice", 18, "Python")

name, age, skill = user

print(name)
print(age)
print(skill)`,
                    "多个变量解包"
                ),

                paragraph(
                    "交换两个变量时，Python 也可以利用这种特性。"
                ),

                code(
`a = 10
b = 20

a, b = b, a

print(a)
print(b)`,
                    "变量交换"
                ),

                paragraph(
                    "函数也可以返回多个值。Python 实际上会把这些返回值组合成一个 Tuple。"
                ),

                code(
`def get_user():
    return "Alice", 18, "Beijing"


name, age, city = get_user()

print(name)
print(age)
print(city)`,
                    "函数返回多个值"
                ),

                concepts([
                    "Tuple 使用圆括号表示",
                    "Tuple 有顺序",
                    "Tuple 不可以修改",
                    "Tuple 支持索引和切片",
                    "Tuple 可以进行解包",
                    "函数可以返回多个值"
                ]),

                practice(
                    "练习 5：坐标",
                    "创建一个包含 x、y、z 三个坐标的 Tuple，然后通过解包得到三个变量。",
`point = (100, 200, 300)

# 在这里完成代码
`
                ),

                thinking(
                    "什么时候使用 Tuple？",
                    "如果一组数据代表一个固定结构，并且不希望代码中的其他部分随意修改它，那么 Tuple 往往比 List 更合适。"
                )
            ]
        ),


        /* =================================================
           04
        ================================================= */

        lesson(
            "py-04-04",

            "Dictionary：键值结构",

            "理解 key-value 数据结构，并掌握 get、items、keys、values 等操作。",

            [

                paragraph(
                    "现实世界中的很多数据并不是简单的“第几个元素”。例如一个用户有姓名、年龄、城市、邮箱等属性。此时如果使用 list，就必须记住每个位置代表什么。"
                ),

                code(
`user = ["Alice", 18, "Beijing"]

print(user[0])
print(user[1])
print(user[2])`,
                    "List 表示用户"
                ),

                paragraph(
                    "这种方式不够直观。Dictionary（字典）可以使用一个 key（键）对应一个 value（值）。"
                ),

                diagram(
                    "Dictionary：Key → Value",
                    `
<div class="ds-diagram dictionary-diagram">

    <div class="dict-row">
        <div class="dict-key">name</div>
        <div class="dict-arrow">→</div>
        <div class="dict-value">Alice</div>
    </div>

    <div class="dict-row">
        <div class="dict-key">age</div>
        <div class="dict-arrow">→</div>
        <div class="dict-value">18</div>
    </div>

    <div class="dict-row">
        <div class="dict-key">city</div>
        <div class="dict-arrow">→</div>
        <div class="dict-value">Beijing</div>
    </div>

</div>
                    `,
                    "Dictionary 的核心思想就是：通过 key 找到对应的 value。"
                ),

                code(
`user = {
    "name": "Alice",
    "age": 18,
    "city": "Beijing"
}

print(user["name"])
print(user["age"])
print(user["city"])`,
                    "创建 Dictionary"
                ),

                paragraph(
                    "Dictionary 的 key 通常是字符串，也可以是其他满足要求的不可变对象。最常见的场景就是使用字符串描述数据字段。"
                ),

                paragraph(
                    "字典中的值可以修改，也可以新增新的 key。"
                ),

                code(
`user = {
    "name": "Alice",
    "age": 18
}

user["age"] = 19
user["city"] = "Shanghai"

print(user)`,
                    "修改和新增"
                ),

                paragraph(
                    "如果直接使用不存在的 key，会产生 KeyError。实际开发中，如果某个字段可能不存在，可以使用 get()。"
                ),

                code(
`user = {
    "name": "Alice",
    "age": 18
}

print(user.get("name"))
print(user.get("city"))
print(user.get("city", "Unknown"))`,
                    "get()"
                ),

                paragraph(
                    "keys() 可以得到所有键，values() 可以得到所有值，items() 则可以同时得到 key 和 value。"
                ),

                code(
`user = {
    "name": "Alice",
    "age": 18,
    "city": "Beijing"
}

print(user.keys())
print(user.values())
print(user.items())`,
                    "keys / values / items"
                ),

                paragraph(
                    "遍历 Dictionary 时，最推荐的方式之一就是使用 items()。"
                ),

                code(
`user = {
    "name": "Alice",
    "age": 18,
    "city": "Beijing"
}

for key, value in user.items():
    print(key, "=", value)`,
                    "遍历 Dictionary"
                ),

                paragraph(
                    "Dictionary 非常适合做统计。例如统计一组单词出现的次数。"
                ),

                code(
`words = ["python", "java", "python", "go", "python", "java"]

counter = {}

for word in words:
    if word not in counter:
        counter[word] = 0

    counter[word] += 1

print(counter)`,
                    "频率统计"
                ),

                paragraph(
                    "这类“key → value”的结构在数据分析、配置文件、API 数据、数据库结果等场景中非常常见。"
                ),

                diagram(
                    "四种常见数据结构",
                    `
<div class="ds-diagram structures-overview">

    <div class="structure-card">
        <div class="structure-name">List</div>
        <div class="structure-symbol">[ ]</div>
        <div class="structure-description">
            有序<br>
            可修改<br>
            按位置访问
        </div>
    </div>

    <div class="structure-card">
        <div class="structure-name">Tuple</div>
        <div class="structure-symbol">( )</div>
        <div class="structure-description">
            有序<br>
            不可修改<br>
            固定结构
        </div>
    </div>

    <div class="structure-card">
        <div class="structure-name">Dictionary</div>
        <div class="structure-symbol">{ }</div>
        <div class="structure-description">
            Key → Value<br>
            按键访问<br>
            适合描述对象
        </div>
    </div>

    <div class="structure-card">
        <div class="structure-name">Set</div>
        <div class="structure-symbol">{ }</div>
        <div class="structure-description">
            元素唯一<br>
            自动去重<br>
            集合运算
        </div>
    </div>

</div>
                    `,
                    "选择哪种数据结构，取决于你需要表达什么样的数据关系。"
                ),

                concepts([
                    "Dictionary 使用 key-value 保存数据",
                    "通过 key 获取 value",
                    "可以修改已有 value",
                    "可以新增 key",
                    "get() 可以安全读取可能不存在的 key",
                    "items() 适合遍历 key 和 value",
                    "Dictionary 非常适合描述结构化对象"
                ]),

                practice(
                    "练习 6：学生信息",
                    "创建一个学生 Dictionary，包含姓名、年龄、成绩和城市，并把所有字段打印出来。",
`student = {
    "name": "Tom",
    "age": 16,
    "score": 92,
    "city": "Taipei"
}

# 在这里完成代码
`
                ),

                practice(
                    "练习 7：统计单词",
                    "统计列表中每个单词出现的次数。",
`words = [
    "python",
    "java",
    "python",
    "go",
    "python",
    "java",
    "rust"
]

# 在这里完成统计
`
                ),

                thinking(
                    "思考",
                    "如果一个用户有 20 个属性，使用 user[0]、user[1]……访问数据会发生什么问题？Dictionary 解决了什么问题？"
                )
            ]
        ),


        /* =================================================
           05
        ================================================= */

        lesson(
            "py-04-05",

            "Set：集合与去重",

            "理解集合的唯一性，并掌握去重、交集、并集和差集。",

            [

                paragraph(
                    "Set（集合）最大的特点之一是：元素不会重复。它特别适合处理“哪些元素出现过”“两个集合有哪些共同元素”这样的任务。"
                ),

                code(
`numbers = {1, 2, 3, 4}

print(numbers)`,
                    "创建 Set"
                ),

                paragraph(
                    "如果创建集合时提供了重复元素，重复值会被自动去掉。"
                ),

                code(
`numbers = {1, 2, 2, 3, 3, 3, 4}

print(numbers)`,
                    "Set 自动去重"
                ),

                paragraph(
                    "因此，如果一个列表中存在很多重复元素，可以非常方便地使用 set() 进行去重。"
                ),

                code(
`names = [
    "Alice",
    "Bob",
    "Alice",
    "Charlie",
    "Bob"
]

unique_names = set(names)

print(unique_names)`,
                    "List → Set"
                ),

                paragraph(
                    "集合可以使用 add() 添加元素，也可以使用 remove() 或 discard() 删除元素。"
                ),

                code(
`colors = {"red", "green"}

colors.add("blue")

print(colors)

colors.remove("green")

print(colors)`,
                    "Set 基本操作"
                ),

                paragraph(
                    "remove() 如果元素不存在会产生 KeyError，而 discard() 不会。因此当你不确定元素是否存在时，discard() 更安全。"
                ),

                code(
`numbers = {1, 2, 3}

numbers.discard(10)

print(numbers)`,
                    "discard()"
                ),

                paragraph(
                    "Set 真正强大的地方在于集合运算。两个集合可以求并集、交集和差集。"
                ),

                diagram(
                    "Set 集合关系",
                    `
<div class="ds-diagram set-diagram">

    <div class="set-circle set-left">
        <span>A</span>
        <small>Python</small>
    </div>

    <div class="set-circle set-right">
        <span>B</span>
        <small>Java</small>
    </div>

    <div class="set-center">
        共同元素
    </div>

</div>
                    `,
                    "两个集合重叠的部分就是交集。"
                ),

                code(
`python_users = {"Alice", "Bob", "Charlie"}
java_users = {"Bob", "Charlie", "David"}

print("交集：", python_users & java_users)
print("并集：", python_users | java_users)
print("Python 独有：", python_users - java_users)
print("Java 独有：", java_users - python_users)`,
                    "集合运算"
                ),

                paragraph(
                    "交集表示两个集合共同拥有的元素；并集表示两个集合中的全部元素；差集表示只属于某一个集合的元素。"
                ),

                paragraph(
                    "集合在数据清洗、标签系统、权限系统、用户分析等场景中非常有用。"
                ),

                code(
`frontend = {"Alice", "Bob", "Charlie"}
backend = {"Bob", "Charlie", "David"}

fullstack = frontend & backend

print("同时掌握前后端：", fullstack)`,
                    "实际应用"
                ),

                concepts([
                    "Set 中的元素具有唯一性",
                    "set() 可以快速去重",
                    "add() 添加元素",
                    "remove() 删除元素",
                    "discard() 安全删除",
                    "& 表示交集",
                    "| 表示并集",
                    "- 表示差集"
                ]),

                practice(
                    "练习 8：列表去重",
                    "将下面的列表转换成没有重复元素的结果。",
`numbers = [
    1, 2, 2, 3, 4, 4,
    5, 5, 5, 6
]

# 在这里完成去重
`
                ),

                practice(
                    "练习 9：共同用户",
                    "找出同时使用 Python 和 Java 的用户。",
`python_users = {
    "Alice",
    "Bob",
    "Charlie",
    "David"
}

java_users = {
    "Bob",
    "Charlie",
    "Eve"
}

# 在这里完成代码
`
                ),

                thinking(
                    "什么时候使用 Set？",
                    "当你关心的是“有哪些不同的元素”或者“两个数据集合之间有什么关系”，Set 往往比 List 更合适。"
                )
            ]
        ),


        /* =================================================
           06
        ================================================= */

        lesson(
            "py-04-06",

            "嵌套数据结构：真实程序的数据长什么样",

            "学习 List、Dictionary、Tuple、Set 的组合使用，为真实项目中的 JSON、API 和数据处理打基础。",

            [

                paragraph(
                    "到目前为止，我们分别学习了 List、Tuple、Dictionary 和 Set。但真实项目中的数据通常不会只使用一种数据结构。"
                ),

                paragraph(
                    "例如一个电商系统可能有很多订单，每个订单又有订单号、用户信息、商品列表、金额等数据。这时就需要把多个数据结构组合起来。"
                ),

                diagram(
                    "嵌套数据结构",
                    `
<div class="ds-diagram nested-diagram">

    <div class="nested-root">
        orders
    </div>

    <div class="nested-line"></div>

    <div class="nested-list">
        <div class="nested-item">
            <strong>Order 1</strong>

            <div class="nested-fields">
                <span>id → 1001</span>
                <span>user → Alice</span>
                <span>total → 299</span>
            </div>
        </div>

        <div class="nested-item">
            <strong>Order 2</strong>

            <div class="nested-fields">
                <span>id → 1002</span>
                <span>user → Bob</span>
                <span>total → 599</span>
            </div>
        </div>
    </div>

</div>
                    `,
                    "真实项目中经常出现“List 里面放 Dictionary，Dictionary 里面又放 List”的结构。"
                ),

                paragraph(
                    "最常见的一种形式就是：List 中保存多个 Dictionary。"
                ),

                code(
`students = [
    {
        "name": "Alice",
        "age": 18,
        "score": 92
    },
    {
        "name": "Bob",
        "age": 17,
        "score": 86
    },
    {
        "name": "Charlie",
        "age": 18,
        "score": 95
    }
]

print(students[0]["name"])
print(students[1]["score"])`,
                    "List + Dictionary"
                ),

                paragraph(
                    "可以通过多层索引访问深层数据。"
                ),

                code(
`students = [
    {
        "name": "Alice",
        "scores": [90, 95, 88]
    },
    {
        "name": "Bob",
        "scores": [80, 86, 91]
    }
]

print(students[0]["scores"][1])
print(students[1]["scores"][2])`,
                    "List + Dictionary + List"
                ),

                paragraph(
                    "这已经非常接近真实的数据处理工作了。很多 API 返回的数据、JSON 文件和数据库查询结果，本质上都可以理解成类似的嵌套结构。"
                ),

                paragraph(
                    "例如我们可以计算每个学生的平均成绩。"
                ),

                code(
`students = [
    {
        "name": "Alice",
        "scores": [90, 95, 88]
    },
    {
        "name": "Bob",
        "scores": [80, 86, 91]
    },
    {
        "name": "Charlie",
        "scores": [95, 92, 97]
    }
]

for student in students:

    scores = student["scores"]

    average = sum(scores) / len(scores)

    print(
        student["name"],
        "平均分：",
        round(average, 2)
    )`,
                    "处理嵌套数据"
                ),

                paragraph(
                    "还可以继续增加筛选逻辑，例如只找平均分超过 90 的学生。"
                ),

                code(
`students = [
    {
        "name": "Alice",
        "scores": [90, 95, 88]
    },
    {
        "name": "Bob",
        "scores": [80, 86, 91]
    },
    {
        "name": "Charlie",
        "scores": [95, 92, 97]
    }
]

for student in students:

    scores = student["scores"]

    average = sum(scores) / len(scores)

    if average >= 90:
        print(
            student["name"],
            "平均分：",
            round(average, 2)
        )`,
                    "筛选嵌套数据"
                ),

                paragraph(
                    "再来看一个更接近实际业务的商品数据。"
                ),

                code(
`products = [
    {
        "name": "Keyboard",
        "price": 299,
        "tags": {"office", "wireless"}
    },
    {
        "name": "Mouse",
        "price": 99,
        "tags": {"office", "wireless"}
    },
    {
        "name": "Monitor",
        "price": 1299,
        "tags": {"office", "4k"}
    }
]

for product in products:

    print(
        product["name"],
        product["price"],
        product["tags"]
    )`,
                    "List + Dictionary + Set"
                ),

                paragraph(
                    "注意：这里已经同时出现了 List、Dictionary 和 Set。Python 数据结构真正强大的地方，并不是分别掌握四种容器，而是能够根据数据特点把它们组合起来。"
                ),

                paragraph(
                    "下面再看一个订单系统的例子。"
                ),

                code(
`orders = [
    {
        "id": 1001,
        "user": "Alice",
        "items": [
            {"name": "Keyboard", "price": 299},
            {"name": "Mouse", "price": 99}
        ]
    },
    {
        "id": 1002,
        "user": "Bob",
        "items": [
            {"name": "Monitor", "price": 1299}
        ]
    }
]

for order in orders:

    total = 0

    for item in order["items"]:
        total += item["price"]

    print(
        "订单：",
        order["id"],
        "用户：",
        order["user"],
        "总价：",
        total
    )`,
                    "订单数据"
                ),

                paragraph(
                    "这个例子非常值得认真理解。最外层是 List，因为我们有多个订单；每个订单是 Dictionary，因为订单包含多个字段；items 又是一个 List，因为一个订单可能包含多个商品；每个商品又是 Dictionary。"
                ),

                diagram(
                    "订单数据结构",
                    `
<div class="ds-diagram tree-diagram">

    <div class="tree-root">
        orders
        <small>List</small>
    </div>

    <div class="tree-branch"></div>

    <div class="tree-node">
        <strong>order</strong>
        <small>Dictionary</small>

        <div class="tree-children">

            <span>
                id
                <b>1001</b>
            </span>

            <span>
                user
                <b>Alice</b>
            </span>

            <span>
                items
                <b>List</b>
            </span>

        </div>
    </div>

    <div class="tree-branch"></div>

    <div class="tree-node small-node">
        <strong>item</strong>
        <small>Dictionary</small>

        <div class="tree-children">

            <span>
                name
                <b>Keyboard</b>
            </span>

            <span>
                price
                <b>299</b>
            </span>

        </div>
    </div>

</div>
                    `,
                    "理解嵌套结构的关键，是从最外层开始，一层一层看清楚每一层是什么数据结构。"
                ),

                paragraph(
                    "当你第一次看到复杂 JSON 数据时，不要试图一次看懂所有内容。先问三个问题：最外层是什么？当前这一层是什么？我想拿到的数据藏在哪一层？"
                ),

                callout(
                    "一个非常重要的思维方式",
                    "处理复杂数据时，不要死记索引。先判断每一层的数据结构，再决定使用索引、key、循环还是集合运算。"
                ),

                practice(
                    "练习 10：学生成绩系统",
                    "遍历下面的学生数据，计算每个学生的平均分，并输出平均分最高的学生。",
`students = [
    {
        "name": "Alice",
        "scores": [90, 92, 88]
    },
    {
        "name": "Bob",
        "scores": [82, 85, 91]
    },
    {
        "name": "Charlie",
        "scores": [95, 97, 94]
    }
]

# 在这里完成代码
`
                ),

                practice(
                    "练习 11：商品统计",
                    "计算所有商品的总价格，并找出价格最高的商品。",
`products = [
    {"name": "Keyboard", "price": 299},
    {"name": "Mouse", "price": 99},
    {"name": "Monitor", "price": 1299},
    {"name": "Headphones", "price": 499}
]

# 在这里完成代码
`
                ),

                practice(
                    "练习 12：订单统计",
                    "统计所有订单的总销售额。",
`orders = [
    {
        "id": 1001,
        "items": [
            {"name": "Keyboard", "price": 299},
            {"name": "Mouse", "price": 99}
        ]
    },
    {
        "id": 1002,
        "items": [
            {"name": "Monitor", "price": 1299}
        ]
    },
    {
        "id": 1003,
        "items": [
            {"name": "Headphones", "price": 499},
            {"name": "Mouse", "price": 99}
        ]
    }
]

# 在这里完成代码
`
                ),

                thinking(
                    "数据结构思维",
                    "看到一个复杂数据时，第一件事不是写代码，而是先画出它的结构：外层是什么？里面是什么？每个字段是什么类型？"
                ),

                checklist([
                    "我能创建和修改 List",
                    "我理解正索引和负索引",
                    "我会使用 List 切片",
                    "我会使用 append、insert、remove、pop",
                    "我理解 sort 和 sorted 的区别",
                    "我理解 Tuple 与 List 的区别",
                    "我会使用 Tuple 解包",
                    "我能创建和遍历 Dictionary",
                    "我理解 key-value",
                    "我会使用 get、keys、values、items",
                    "我知道 Set 可以自动去重",
                    "我会进行交集、并集和差集运算",
                    "我能处理 List + Dictionary 等嵌套结构"
                ]),

                note(
                    "下一章",
                    "掌握数据结构之后，下一步就是专门处理文本。下一章将学习字符串、字符串方法、格式化、切片、查找、替换以及文本处理。"
                )
            ]
        )

    ]
};


/* =========================================================
   默认导出
========================================================= */

export default chapter04;