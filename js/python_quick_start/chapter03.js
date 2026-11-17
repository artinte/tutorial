/* =========================================================
   PYTHON QUICK START
   chapter03.js

   第三章：函数：把程序组织起来
   Functions
   ---------------------------------------------------------
   本章目标：

   1. 理解为什么需要函数
   2. 掌握 def / return
   3. 理解参数、实参、默认参数、关键字参数
   4. 理解局部作用域与全局作用域
   5. 学会设计职责清晰的函数
   6. 初步理解 *args / **kwargs
   7. 了解递归
   8. 使用函数组织完整的小程序

   注意：
   本章虽然开始学习函数，但不会过早追求复杂抽象。
   核心目标是：

       把一大段程序
       ↓
       拆成几个清晰的小任务
       ↓
       用函数连接起来

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
        code: content
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


function lesson(id, title, description, content) {
    return {
        id,
        title,
        description,
        content
    };
}


/* =========================================================
   CHAPTER 03
========================================================= */

export const chapter03 = {

    id: "chapter-03",

    number: "03",

    title: "函数：把程序组织起来",

    englishTitle: "Functions",

    description:
        "函数提前出现。真正开始学习如何组织程序、复用代码、传递数据和返回结果。函数是从“写语法”进入“写程序”的关键一步。",

    sections: [

        /* =====================================================
           03-01
        ===================================================== */

        lesson(
            "py-03-01",
            "为什么需要函数？",
            "理解函数解决的真正问题：重复、复杂和难以维护。",
            [

                paragraph(
                    "前两章我们已经可以写出包含变量、条件和循环的程序。但是当程序越来越长时，一个新的问题会出现：代码开始重复，逻辑开始混在一起，修改一个地方可能还要修改很多地方。函数就是解决这个问题的重要工具。"
                ),

                paragraph(
                    "函数可以理解为一个被命名的任务。我们把完成某件事情所需要的代码放进函数里，然后通过函数名调用它。这样，同一个任务就不需要反复复制代码。"
                ),

                code(
                    `def say_hello():
    print("Hello!")


say_hello()
say_hello()
say_hello()`,

                    "第一个函数"
                ),

                paragraph(
                    "def 是定义函数的关键字。say_hello 是函数名。括号 () 表示这个函数暂时不需要外部数据。冒号后面的缩进代码，就是函数真正执行的内容。"
                ),

                code(
                    `def show_message():
    print("Python")
    print("is")
    print("fun")


show_message()`,

                    "一个函数可以包含多条语句"
                ),

                concepts([
                    "def 用来定义函数",
                    "函数名应该表达函数要完成的任务",
                    "() 用来放参数",
                    ": 表示函数代码块开始",
                    "缩进代码属于函数主体",
                    "定义函数不会自动执行函数主体",
                    "调用函数时才会执行函数中的代码"
                ]),

                code(
                    `def test():
    print("函数开始执行")


print("第一步")

test()

print("第三步")`,

                    "定义与调用是两件事"
                ),

                paragraph(
                    "注意：def 本身不是在执行函数，而是在创建一个函数。只有写出 test() 这样的调用语句之后，函数内部的代码才会真正运行。"
                ),

                code(
                    `def print_line():
    print("--------------------")


print_line()
print("Python")
print_line()`,

                    "重复使用函数"
                ),

                practice(
                    "练习 24：封装问候",
                    "编写 hello() 函数，每次调用都输出一条问候语。至少调用 3 次。",

                    `def hello():
    print("你好，欢迎学习 Python")


hello()
hello()
hello()`
                ),

                practice(
                    "练习 25：打印标题",
                    "编写 print_title() 函数，输出一个简单的课程标题区域。",

                    `def print_title():
    print("====================")
    print("Python 快速入门")
    print("====================")


print_title()`
                ),

                practice(
                    "练习 26：重复输出",
                    "编写一个函数，用来输出三行分隔线和标题，观察函数如何减少重复代码。",

                    `def show_section_title():
    print("--------------------")
    print("函数练习")
    print("--------------------")


show_section_title()`
                ),

                note(
                    "函数的第一个价值",
                    "函数最直接的价值不是“代码更短”，而是“代码有名字”。当一段代码被赋予一个清晰的名字以后，阅读程序的人可以直接理解这段代码负责什么。"
                )

            ]
        ),


        /* =====================================================
           03-02
        ===================================================== */

        lesson(
            "py-03-02",
            "参数与返回值",
            "真正掌握函数的输入和输出。",
            [

                paragraph(
                    "如果一个函数只能完成完全固定的任务，那么它的复用能力仍然有限。真正有价值的函数通常可以接收数据，并把处理后的结果返回出去。参数解决输入问题，return 解决输出问题。"
                ),

                code(
                    `def add(a, b):
    return a + b


result = add(10, 20)

print(result)`,

                    "参数与返回值"
                ),

                paragraph(
                    "这里的 a 和 b 是参数。调用 add(10, 20) 时，10 和 20 会分别传给 a 和 b。return 把计算结果交给调用者。"
                ),

                code(
                    `def square(number):
    return number * number


result1 = square(5)
result2 = square(10)

print(result1)
print(result2)`,

                    "函数返回计算结果"
                ),

                code(
                    `def calculate_area(width, height):
    return width * height


area = calculate_area(12, 8)

print("面积：", area)`,

                    "用函数表达一个任务"
                ),

                concepts([
                    "参数是函数接收的数据",
                    "调用函数时传入的具体值叫实参",
                    "return 把结果交给调用者",
                    "return 会结束当前函数的执行",
                    "函数可以没有参数",
                    "函数也可以没有返回值",
                    "返回值可以继续参与后面的计算"
                ]),

                code(
                    `def multiply(a, b):
    result = a * b
    return result


value = multiply(6, 7)

print(value)
print(value + 10)
print(value * 2)`,

                    "返回值可以继续使用"
                ),

                code(
                    `def check_age(age):
    if age >= 18:
        return "成年人"

    return "未成年人"


print(check_age(20))
print(check_age(15))`,

                    "条件中的 return"
                ),

                paragraph(
                    "return 不一定只能放在函数最后。只要函数已经得到需要的结果，就可以提前返回。"
                ),

                code(
                    `def get_level(score):
    if score >= 90:
        return "优秀"

    if score >= 80:
        return "良好"

    if score >= 60:
        return "及格"

    return "不及格"


print(get_level(95))
print(get_level(82))
print(get_level(68))
print(get_level(40))`,

                    "多个返回路径"
                ),

                code(
                    `def divide(a, b):
    if b == 0:
        return None

    return a / b


print(divide(10, 2))
print(divide(10, 0))`,

                    "特殊情况也可以通过返回值表达"
                ),

                note(
                    "return 与 print 不一样",
                    "print() 是把内容显示到屏幕上，而 return 是把结果交给调用者。真正需要被其他代码继续使用的计算结果，通常应该使用 return。"
                ),

                code(
                    `def add(a, b):
    print(a + b)


result = add(10, 20)

print("result =", result)`,

                    "为什么不能把 print 当成 return"
                ),

                paragraph(
                    "上面的程序会打印 30，但 result 实际上是 None。因为 add() 没有使用 return。"
                ),

                code(
                    `def add(a, b):
    return a + b


result = add(10, 20)

print("result =", result)`,

                    "正确返回结果"
                ),

                practice(
                    "练习 27：计算平均值",
                    "写一个 average(a, b, c) 函数，返回三个数字的平均值。",

                    `def average(a, b, c):
    return (a + b + c) / 3


result = average(80, 90, 100)

print(result)`
                ),

                practice(
                    "练习 28：最大值",
                    "自己实现一个函数，返回三个数字中的最大值。先不要直接使用 max()，尝试使用 if。",

                    `def maximum(a, b, c):
    largest = a

    if b > largest:
        largest = b

    if c > largest:
        largest = c

    return largest


print(maximum(10, 30, 20))`
                ),

                practice(
                    "练习 29：判断质数",
                    "写 is_prime(number)，判断一个数字是否为质数。可以使用 for 循环和 return。",

                    `def is_prime(number):

    if number < 2:
        return False

    for i in range(2, number):
        if number % i == 0:
            return False

    return True


print(is_prime(7))
print(is_prime(12))
print(is_prime(97))`
                ),

                thinking(
                    "思考",
                    "如果一个函数计算出了结果，但调用者还需要继续使用这个结果，那么应该使用 print 还是 return？为什么？"
                )

            ]
        ),


        /* =====================================================
           03-03
        ===================================================== */

        lesson(
            "py-03-03",
            "默认参数与关键字参数",
            "让函数更加灵活，同时保持调用代码清晰。",
            [

                paragraph(
                    "函数参数不一定都必须由调用者提供。我们可以给参数设置默认值。如果调用者没有传入这个参数，Python 就使用默认值。"
                ),

                code(
                    `def greet(name, language="中文"):

    if language == "中文":
        return f"你好，{name}"

    return f"Hello, {name}"


print(greet("Alice"))
print(greet("Alice", language="English"))`,

                    "默认参数与关键字参数"
                ),

                paragraph(
                    "第一次调用没有提供 language，因此使用默认值“中文”。第二次调用明确写出 language=\"English\"，因此使用调用者提供的值。"
                ),

                code(
                    `def create_message(name, prefix="你好"):

    return f"{prefix}，{name}"


print(create_message("Alice"))
print(create_message("Bob", "欢迎"))
print(create_message("Charlie", prefix="Hello"))`,

                    "位置参数与关键字参数"
                ),

                concepts([
                    "位置参数按照参数出现顺序传值",
                    "关键字参数明确指定参数名",
                    "默认参数可以减少重复传值",
                    "关键字参数可以提高调用代码的可读性",
                    "默认参数应该放在必填参数之后"
                ]),

                code(
                    `def introduce(name, age, city="北京"):
    print("姓名：", name)
    print("年龄：", age)
    print("城市：", city)


introduce("Alice", 20)
introduce("Bob", 25, "上海")
introduce("Charlie", 30, city="深圳")`,

                    "混合使用参数"
                ),

                paragraph(
                    "函数调用时，位置参数通常放在前面，关键字参数可以让调用者明确表达每个值对应什么。"
                ),

                code(
                    `def calculate_price(price, quantity=1, discount=0):

    subtotal = price * quantity
    total = subtotal * (1 - discount)

    return total


print(calculate_price(100))
print(calculate_price(100, 3))
print(calculate_price(100, 3, 0.1))
print(calculate_price(
    price=100,
    quantity=3,
    discount=0.1
))`,

                    "订单计算"
                ),

                practice(
                    "练习 30：订单函数",
                    "编写 create_order(product, quantity=1, discount=0) 函数，返回订单的最终价格。",

                    `def create_order(product, quantity=1, discount=0):

    price = 100

    subtotal = price * quantity
    total = subtotal * (1 - discount)

    return {
        "product": product,
        "quantity": quantity,
        "total": total
    }


order = create_order(
    "Python 教程",
    quantity=3,
    discount=0.2
)

print(order)`
                ),

                code(
                    `def connect_database(
    host="localhost",
    port=3306,
    username="root"
):

    print("服务器：", host)
    print("端口：", port)
    print("用户：", username)


connect_database()

connect_database(
    host="127.0.0.1",
    port=5432
)`,

                    "默认参数的实际应用"
                ),

                note(
                    "默认参数的设计思想",
                    "默认值应该代表一个合理、常用的默认行为。这样调用者只需要修改真正需要修改的部分，而不必每次重复传入所有参数。"
                ),

                paragraph(
                    "参数越多，函数调用越容易变得难以阅读。因此在实际项目中，关键字参数不仅方便，而且能够帮助代码表达意图。"
                ),

                thinking(
                    "思考",
                    "下面两种调用方式，哪一种更容易理解？为什么？",

                    "calculate_price(100, 5, 0.2)\ncalculate_price(price=100, quantity=5, discount=0.2)"
                )

            ]
        ),


        /* =====================================================
           03-04
        ===================================================== */

        lesson(
            "py-03-04",
            "作用域",
            "理解局部变量、全局变量以及函数内部的数据。",
            [

                paragraph(
                    "函数带来了一个非常重要的概念：作用域。简单来说，变量并不是在程序的任何地方都可以随意访问。变量在哪里创建，会影响它在哪里可以被使用。"
                ),

                code(
                    `x = 100


def test():

    x = 20

    print("函数内部：", x)


test()

print("函数外部：", x)`,

                    "局部变量"
                ),

                paragraph(
                    "函数内部创建的 x 是局部变量。它不会自动覆盖函数外部的 x。函数内部和函数外部可以存在同名变量，但它们并不是同一个变量。"
                ),

                code(
                    `name = "Alice"


def show():

    name = "Bob"

    print("函数内部：", name)


show()

print("函数外部：", name)`,

                    "同名变量"
                ),

                concepts([
                    "函数内部创建的变量通常属于局部作用域",
                    "函数外部创建的变量可以成为全局变量",
                    "局部变量通常只在函数内部使用",
                    "函数调用结束后，局部变量的生命周期也随之结束",
                    "尽量减少对全局变量的依赖"
                ]),

                code(
                    `def calculate():

    price = 100
    quantity = 3

    return price * quantity


result = calculate()

print(result)

# print(price)
# 上面这一行如果取消注释，
# 会因为 price 是函数内部变量而无法直接访问。`,

                    "局部变量的边界"
                ),

                paragraph(
                    "在函数内部使用参数和局部变量，通常比大量依赖全局变量更容易维护。函数应该尽量通过参数接收数据，通过返回值交出结果。"
                ),

                code(
                    `total = 100


def add_tax(price):

    tax = price * 0.13

    return price + tax


result = add_tax(total)

print(result)`,

                    "参数与局部变量配合"
                ),

                paragraph(
                    "如果确实需要修改全局变量，可以使用 global，但初学阶段不应该依赖它来组织程序。很多时候，把数据通过参数传入，再通过 return 返回，会让程序结构更加清晰。"
                ),

                code(
                    `count = 0


def increase():

    global count

    count += 1


increase()
increase()
increase()

print(count)`,

                    "global 示例"
                ),

                note(
                    "为什么不推荐滥用 global？",
                    "如果很多函数都直接修改同一个全局变量，那么程序中的数据流会变得难以追踪。一个函数可能悄悄改变另一个函数依赖的数据，调试会越来越困难。"
                ),

                code(
                    `def increase(count):
    count += 1
    return count


count = 0

count = increase(count)
count = increase(count)
count = increase(count)

print(count)`,

                    "更容易维护的写法"
                ),

                paragraph(
                    "这里没有修改全局变量，而是把 count 作为输入传入，再把新的 count 返回出来。虽然代码看起来多了一点，但数据如何流动非常清楚。"
                ),

                thinking(
                    "思考",
                    "如果一个函数需要使用某个外部变量，你更倾向于把它作为参数传进去，还是直接让函数读取全局变量？为什么？"
                ),

                practice(
                    "练习 31：作用域实验",
                    "创建一个全局变量和一个函数内部的同名局部变量，观察它们的区别。然后尝试把局部变量改成参数。",

                    `message = "外部消息"


def show_message():
    message = "内部消息"
    print(message)


show_message()

print(message)`
                )

            ]
        ),


        /* =====================================================
           03-05
        ===================================================== */

        lesson(
            "py-03-05",
            "函数设计",
            "从“会写函数”进一步进入“写好函数”。",
            [

                paragraph(
                    "会定义函数只是开始。真正进入实际开发后，更重要的问题是：一个函数到底应该负责什么？参数应该是什么？返回值应该是什么？函数应该多大？"
                ),

                concepts([
                    "一个函数尽量只负责一个明确任务",
                    "参数应该表达函数需要什么",
                    "返回值应该表达函数产生什么",
                    "避免一个函数承担过多职责",
                    "给函数起有意义的名字",
                    "尽量避免隐藏的副作用",
                    "让函数容易测试和重复使用"
                ]),

                code(
                    `def calculate_total(price, quantity, discount=0):

    subtotal = price * quantity
    total = subtotal * (1 - discount)

    return total


print(calculate_total(100, 3))
print(calculate_total(100, 3, 0.2))`,

                    "拆分逻辑"
                ),

                paragraph(
                    "这个函数只负责计算订单金额。它不负责打印页面、不负责保存文件、不负责发送网络请求。职责越明确，函数越容易复用。"
                ),

                code(
                    `def calculate_subtotal(price, quantity):
    return price * quantity


def calculate_discount(subtotal, discount):
    return subtotal * (1 - discount)


subtotal = calculate_subtotal(100, 3)
total = calculate_discount(subtotal, 0.2)

print("小计：", subtotal)
print("最终价格：", total)`,

                    "把复杂任务拆成多个函数"
                ),

                paragraph(
                    "一个大任务通常可以继续拆成几个更小的任务。这样做并不是为了让代码看起来更复杂，而是让每个部分都有明确职责。"
                ),

                code(
                    `def calculate_average(scores):

    total = 0

    for score in scores:
        total += score

    return total / len(scores)


scores = [80, 90, 75, 95]

average = calculate_average(scores)

print("平均分：", average)`,

                    "函数接收数据并处理数据"
                ),

                code(
                    `def is_passed(score):

    if score >= 60:
        return True

    return False


scores = [45, 60, 72, 88]

for score in scores:

    if is_passed(score):
        print(score, "及格")
    else:
        print(score, "不及格")`,

                    "函数与循环组合"
                ),

                paragraph(
                    "注意这里已经出现了一个非常重要的编程思想：函数本身不一定完成整个程序，它可以成为更大程序中的一个零件。"
                ),

                code(
                    `def get_grade(score):

    if score >= 90:
        return "A"

    if score >= 80:
        return "B"

    if score >= 70:
        return "C"

    if score >= 60:
        return "D"

    return "F"


scores = [95, 82, 76, 63, 48]

for score in scores:

    grade = get_grade(score)

    print(score, "=>", grade)`,

                    "让主程序更容易阅读"
                ),

                paragraph(
                    "如果把所有判断都写在循环里面，主程序会越来越长。把“成绩转换为等级”单独变成 get_grade() 后，主程序几乎可以直接读成自然语言。"
                ),

                code(
                    `def format_price(price):

    return f"¥{price:,.2f}"


prices = [99, 1280, 35678.5]

for price in prices:
    print(format_price(price))`,

                    "函数也可以负责格式化"
                ),

                note(
                    "好函数的一个重要标准",
                    "看到函数名时，应该大致能够猜到它做什么。如果必须打开函数内部几十行代码才能知道它的作用，那么函数名或者函数职责通常需要重新考虑。"
                ),

                paragraph(
                    "函数名称通常使用小写字母和下划线，例如 calculate_total、get_grade、format_price。这是 Python 社区非常常见的命名风格。"
                ),

                code(
                    `def calculate_total(price, quantity):
    return price * quantity


def get_grade(score):
    if score >= 60:
        return "及格"

    return "不及格"


def format_price(price):
    return f"¥{price:.2f}"


price = calculate_total(99, 3)
grade = get_grade(82)

print(format_price(price))
print(grade)`,

                    "多个函数协作"
                ),

                practice(
                    "练习 32：重构",
                    "把一个 30 行左右的计算程序拆成多个小函数。建议至少拆成：输入数据处理、计算、结果格式化三个部分。",

                    `def calculate_total(price, quantity):
    return price * quantity


def format_price(price):
    return f"¥{price:.2f}"


total = calculate_total(99, 3)

print(format_price(total))`
                ),

                practice(
                    "练习 33：成绩分析",
                    "编写 get_grade(score)、is_passed(score)、calculate_average(scores) 三个函数，然后分析一组成绩。",

                    `def get_grade(score):

    if score >= 90:
        return "A"

    if score >= 80:
        return "B"

    if score >= 70:
        return "C"

    if score >= 60:
        return "D"

    return "F"


def is_passed(score):
    return score >= 60


def calculate_average(scores):

    total = 0

    for score in scores:
        total += score

    return total / len(scores)


scores = [95, 82, 76, 63, 48]

print("平均分：", calculate_average(scores))

for score in scores:

    print(
        score,
        get_grade(score),
        is_passed(score)
    )`
                ),

                practice(
                    "练习 34：购物车计算",
                    "设计一个函数计算商品小计，再设计一个函数计算折扣后的最终价格。",

                    `def calculate_subtotal(price, quantity):
    return price * quantity


def apply_discount(subtotal, discount):
    return subtotal * (1 - discount)


subtotal = calculate_subtotal(120, 4)

total = apply_discount(
    subtotal,
    0.15
)

print("小计：", subtotal)
print("最终价格：", total)`
                ),

                thinking(
                    "思考",
                    "下面两个函数哪个更容易复用？为什么？",

                    "一个函数同时负责读取数据、计算、打印、保存文件。\n\n另一个函数只负责计算，并通过 return 返回结果。"
                )

            ]
        ),


        /* =====================================================
           03-06
        ===================================================== */

        lesson(
            "py-03-06",
            "实战：用函数组织一个完整程序",
            "第一次使用函数组织一个完整的小程序。",
            [

                paragraph(
                    "前面的例子都是一个个独立的小任务。现在把第二章学习的变量、条件、循环，与本章学习的函数组合起来，真正组织一个完整的小程序。"
                ),

                paragraph(
                    "我们先从经典的猜数字游戏开始。为了方便直接运行，下面先提供一个不依赖 input() 的自动演示版本。之后再给出真正的交互版本。"
                ),

                code(
                    `import random


def check_guess(guess, answer):

    if guess == answer:
        return "正确"

    if guess < answer:
        return "太小"

    return "太大"


answer = 42

guesses = [20, 60, 35, 45, 42]

for guess in guesses:

    result = check_guess(
        guess,
        answer
    )

    print(
        "猜测：",
        guess,
        "结果：",
        result
    )

    if result == "正确":
        print("猜中了！")
        break`,

                    "函数化猜数字逻辑"
                ),

                paragraph(
                    "这里把“判断猜测结果”独立成了 check_guess()。主程序只负责组织流程。这样以后如果游戏规则改变，只需要修改对应函数。"
                ),

                code(
                    `import random


def generate_answer():

    return random.randint(1, 100)


def check_guess(guess, answer):

    if guess == answer:
        return "correct"

    if guess < answer:
        return "small"

    return "large"


answer = generate_answer()

guesses = [10, 30, 50, 70, 90]

for guess in guesses:

    result = check_guess(
        guess,
        answer
    )

    print("猜测：", guess)

    if result == "correct":
        print("猜对了！")
        break

    elif result == "small":
        print("太小了")

    else:
        print("太大了")

print("答案：", answer)`,

                    "拆分游戏逻辑"
                ),

                paragraph(
                    "真正的交互版本可以使用 input()。如果你的运行环境支持标准输入，可以直接运行下面的版本。"
                ),

                code(
                    `import random


def play_game():

    answer = random.randint(1, 100)

    attempts = 0

    while True:

        guess = int(
            input("请输入数字：")
        )

        attempts += 1

        if guess == answer:

            print("猜对了！")
            print("尝试次数：", attempts)

            break

        if guess < answer:
            print("太小了")

        else:
            print("太大了")


play_game()`,

                    "交互版猜数字游戏"
                ),

                paragraph(
                    "接下来进一步升级：把游戏规则拆成多个函数。这样以后增加“重新开始”“最多次数”“成绩”等功能会更加容易。"
                ),

                code(
                    `def check_guess(guess, answer):

    if guess == answer:
        return "correct"

    if guess < answer:
        return "small"

    return "large"


def calculate_score(attempts):

    score = 100 - attempts * 10

    if score < 0:
        score = 0

    return score


answer = 37

guesses = [
    10,
    20,
    30,
    37
]

attempts = 0

for guess in guesses:

    attempts += 1

    result = check_guess(
        guess,
        answer
    )

    print(
        "第",
        attempts,
        "次：",
        guess
    )

    if result == "correct":

        score = calculate_score(
            attempts
        )

        print("猜对了！")
        print("得分：", score)

        break

    elif result == "small":

        print("太小了")

    else:

        print("太大了")`,

                    "加入成绩系统"
                ),

                concepts([
                    "一个完整程序可以由多个函数组成",
                    "函数之间可以通过参数传递数据",
                    "函数之间可以通过 return 返回结果",
                    "主程序负责组织流程",
                    "具体任务交给独立函数完成",
                    "拆分函数后，程序更容易修改和测试"
                ]),

                practice(
                    "练习 35：升级猜数字",
                    "增加最多尝试次数、重新开始以及成绩统计功能。",

                    `def check_guess(guess, answer):

    if guess == answer:
        return "correct"

    if guess < answer:
        return "small"

    return "large"


def calculate_score(attempts):

    score = 100 - attempts * 10

    if score < 0:
        score = 0

    return score


answer = 50

guesses = [20, 30, 40, 50]

attempts = 0

for guess in guesses:

    attempts += 1

    result = check_guess(
        guess,
        answer
    )

    if result == "correct":

        print("猜对了！")

        score = calculate_score(
            attempts
        )

        print("得分：", score)

        break

    print("继续尝试：", guess)`
                ),

                practice(
                    "练习 36：成绩分析器",
                    "使用多个函数完成一个成绩分析程序：计算平均分、最高分、最低分、及格人数，并输出成绩等级。",

                    `def calculate_average(scores):

    total = 0

    for score in scores:
        total += score

    return total / len(scores)


def find_max(scores):

    largest = scores[0]

    for score in scores:

        if score > largest:
            largest = score

    return largest


def find_min(scores):

    smallest = scores[0]

    for score in scores:

        if score < smallest:
            smallest = score

    return smallest


def count_passed(scores):

    count = 0

    for score in scores:

        if score >= 60:
            count += 1

    return count


scores = [
    95,
    88,
    76,
    64,
    58,
    91,
    72
]


print(
    "平均分：",
    calculate_average(scores)
)

print(
    "最高分：",
    find_max(scores)
)

print(
    "最低分：",
    find_min(scores)
)

print(
    "及格人数：",
    count_passed(scores)
)`
                ),

                callout(
                    "本章核心",
                    "函数不是为了让代码看起来高级，而是为了让程序变得可以理解、可以复用、可以修改。真正开始写稍微复杂一点的程序以后，函数会成为组织代码最重要的工具之一。"
                ),

                checklist([
                    "我知道如何使用 def 定义函数",
                    "我知道如何调用函数",
                    "我理解参数和实参的区别",
                    "我知道 return 的作用",
                    "我知道 print 和 return 的区别",
                    "我会使用默认参数",
                    "我会使用关键字参数",
                    "我理解局部变量和全局变量",
                    "我能把一个大任务拆成多个函数",
                    "我知道函数应该尽量保持职责清晰",
                    "我可以使用函数组织一个完整的小程序"
                ]),

                note(
                    "下一章预告",
                    "函数解决了程序的组织问题，但函数之间还需要处理大量数据。下一章将进入 Python 最重要的数据结构：列表、元组、字典和集合。"
                )

            ]
        )

    ]
};


/* =========================================================
   默认导出
========================================================= */

export default chapter03;