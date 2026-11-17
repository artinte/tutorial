/* =========================================================
   PYTHON QUICK START
   chapter10.js

   第十章：类与面向对象

   核心思想：

   面向对象不是：

       “把代码全部写进 class”

   更重要的是：

       1. 如何把数据和行为组织起来
       2. 一个对象应该负责什么
       3. 对象之间如何协作
       4. 如何通过组合构建复杂系统
       5. 如何使用委托降低复杂度
       6. 什么时候使用继承
       7. 如何理解多态
       8. 如何设计一个职责清晰的类

   本章重点：

       Object
       Class
       Instance
       __init__
       self
       Instance Attribute
       Method
       Encapsulation
       Composition
       Delegation
       Inheritance
       Polymorphism
       dataclass
       classmethod
       staticmethod
       Special Methods
       Class Attribute
       Object Design
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


const chapter10 = {

    id: "chapter-10",

    number: "10",

    title: "类与面向对象",

    englishTitle: "Classes & Object-Oriented Programming",

    description:
        "从对象、状态和行为开始理解面向对象。重点学习组合、委托、多态和职责设计，而不是把继承当成面向对象的全部。最终通过订单系统理解如何使用对象构建真实程序。",

    sections: [

        /* =====================================================
           10-01
        ===================================================== */

        lesson(
            "py-10-01",
            "什么是对象？",
            "不要先记 class 语法，而是先理解对象到底解决了什么问题。",
            [

                paragraph(
                    "前面的章节中，我们已经学习了变量、列表、字典、函数以及模块。它们已经可以完成很多程序，但当程序越来越复杂时，一个新的问题会出现：数据和处理这些数据的代码开始散落在不同地方。"
                ),

                paragraph(
                    "面向对象提供了一种组织程序的方法：把一组相关的数据和操作这些数据的行为放到一起，形成一个对象。"
                ),

                concepts([
                    "对象通常拥有自己的状态（state）",
                    "对象通常提供操作自己状态的方法（behavior）",
                    "多个对象可以互相协作",
                    "复杂系统可以由多个简单对象组合而成"
                ]),

                code(
                    `student_name = "Alice"
student_score = 95

def show_student(name, score):
    print(name, score)

show_student(student_name, student_score)`,
                    "没有对象时"
                ),

                code(
                    `class Student:

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def show(self):
        print(self.name, self.score)


student = Student("Alice", 95)

student.show()`,
                    "使用对象"
                ),

                paragraph(
                    "这里真正发生的变化并不是“代码变长了”，而是我们把 Student 相关的数据和行为放到了同一个概念里。"
                ),

                diagram(
                    "对象的基本结构",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Student 对象</strong>
                            <span>name = Alice</span>
                            <span>score = 95</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>行为</strong>
                            <span>show()</span>
                            <span>update_score()</span>
                        </div>
                    </div>
                    `,
                    "对象可以理解为状态与行为的组合。"
                ),

                thinking(
                    "思考",
                    "如果一个程序中同时存在 user_name、user_email、user_age，以及十几个处理用户的函数，代码越来越难维护，你会如何重新组织它？"
                ),

                practice(
                    "练习 67：创建 Student",
                    "创建一个 Student 类，保存姓名和成绩，并提供一个显示学生信息的方法。"
                )
            ]
        ),


        /* =====================================================
           10-02
        ===================================================== */

        lesson(
            "py-10-02",
            "class、实例与 self",
            "理解类和对象之间的关系。",
            [

                paragraph(
                    "class 可以理解为创建对象的“定义”。真正运行时，我们通常会根据这个定义创建一个个独立的实例。"
                ),

                code(
                    `class Dog:

    def bark(self):
        print("汪汪")


dog1 = Dog()
dog2 = Dog()

print(dog1)
print(dog2)`,
                    "创建两个实例"
                ),

                paragraph(
                    "dog1 和 dog2 都来自 Dog，但它们是两个不同的对象。类描述“这类对象有什么能力”，实例则代表某一个具体对象。"
                ),

                diagram(
                    "Class 与 Instance",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Dog class</strong>
                            <span>定义：如何创建 Dog</span>
                            <span>方法：bark()</span>
                        </div>

                        <div class="diagram-arrow">↙　↘</div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>dog1</strong>
                                <span>实例 1</span>
                            </div>

                            <div class="diagram-box">
                                <strong>dog2</strong>
                                <span>实例 2</span>
                            </div>
                        </div>
                    </div>
                    `,
                    "一个 class 可以创建多个独立实例。"
                ),

                code(
                    `class Dog:

    def bark(self):
        print("汪汪")


dog = Dog()

dog.bark()`,
                    "self"
                ),

                paragraph(
                    "self 指向当前正在操作的实例。因此 self.name 表示“这个对象自己的 name”。"
                ),

                code(
                    `class Student:

    def show(self):
        print(self)


student = Student()

student.show()`,
                    "self 指向当前实例"
                ),

                note(
                    "不要把 self 当成关键字",
                    "self 是 Python 社区约定的参数名称。它不是特殊关键字，但实例方法通常应该把当前实例作为第一个参数，并按照约定写成 self。"
                ),

                practice(
                    "练习 68：两个学生",
                    "创建两个 Student 实例，让它们拥有不同的姓名和成绩，并观察它们为什么互不影响。"
                )
            ]
        ),


        /* =====================================================
           10-03
        ===================================================== */

        lesson(
            "py-10-03",
            "__init__ 与对象状态",
            "学习对象如何保存自己的数据。",
            [

                paragraph(
                    "__init__ 是实例创建之后用于初始化对象状态的方法。最常见的用途就是把创建对象时传入的数据保存到实例属性中。"
                ),

                code(
                    `class Student:

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def show(self):
        print(self.name, self.score)


student = Student("Alice", 95)

student.show()`,
                    "实例属性"
                ),

                paragraph(
                    "self.name 和 self.score 都属于这个具体的 Student 实例。"
                ),

                code(
                    `student1 = Student("Alice", 95)
student2 = Student("Bob", 82)

student1.score = 98

print(student1.score)
print(student2.score)`,
                    "每个实例拥有自己的状态"
                ),

                diagram(
                    "两个独立对象",
                    `
                    <div class="diagram-row">
                        <div class="diagram-box">
                            <strong>student1</strong>
                            <span>name = Alice</span>
                            <span>score = 98</span>
                        </div>

                        <div class="diagram-box">
                            <strong>student2</strong>
                            <span>name = Bob</span>
                            <span>score = 82</span>
                        </div>
                    </div>
                    `,
                    "修改一个实例不会自动修改另一个实例。"
                ),

                practice(
                    "练习 69：学生成绩系统",
                    "增加 age、courses 和多个成绩，并编写计算平均分的方法。"
                ),

                thinking(
                    "思考",
                    "如果一个 Student 有 name、age、scores、school 四个属性，你认为哪些属于学生自己的状态？哪些可能属于整个学校？"
                )
            ]
        ),


        /* =====================================================
           10-04
        ===================================================== */

        lesson(
            "py-10-04",
            "方法：让对象拥有行为",
            "对象不仅保存数据，还应该负责与这些数据直接相关的行为。",
            [

                paragraph(
                    "如果一个对象只是一个装数据的容器，那么它并没有充分发挥面向对象的价值。真正重要的是：让对象负责与自身状态直接相关的行为。"
                ),

                code(
                    `class BankAccount:

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            return False

        self.balance -= amount
        return True

    def show_balance(self):
        print(self.balance)


account = BankAccount("Alice", 1000)

account.deposit(500)
account.withdraw(200)

account.show_balance()`,
                    "银行账户"
                ),

                paragraph(
                    "deposit() 和 withdraw() 都直接操作账户状态，因此把它们放在 BankAccount 中非常自然。"
                ),

                concepts([
                    "数据属于谁？",
                    "谁应该负责修改这些数据？",
                    "这个行为是否高度依赖对象自己的状态？",
                    "如果把行为放到外部函数，会不会产生大量参数传递？"
                ]),

                practice(
                    "练习 70：购物车",
                    "创建 ShoppingCart，实现添加商品、删除商品、计算总价和清空购物车。"
                ),

                practice(
                    "练习 71：播放器",
                    "创建 MusicPlayer，实现 play、pause、stop 和当前播放状态。"
                )
            ]
        ),


        /* =====================================================
           10-05
        ===================================================== */

        lesson(
            "py-10-05",
            "封装：对象应该负责什么？",
            "真正理解面向对象设计中的职责。",
            [

                paragraph(
                    "封装并不只是“把属性写进 class”。更重要的是：一个对象应该对自己的内部状态负责，并通过清晰的行为与外部协作。"
                ),

                code(
                    `class BankAccount:

    def __init__(self, balance=0):
        self.balance = balance

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("金额必须大于 0")

        if amount > self.balance:
            raise ValueError("余额不足")

        self.balance -= amount`,
                    "让对象保护自己的状态"
                ),

                paragraph(
                    "如果所有代码都可以随意修改对象内部状态，那么对象的规则很容易被破坏。"
                ),

                code(
                    `account = BankAccount(1000)

account.withdraw(200)

print(account.balance)`,
                    "通过对象行为修改状态"
                ),

                callout(
                    "一个重要的设计问题",
                    "不要只问“这个变量放在哪里？”，更应该问：“谁应该负责维护这个变量始终处于正确状态？”"
                ),

                thinking(
                    "思考",
                    "订单的 total_price 如果可以被任何地方随意修改，会发生什么？是否应该让 Order 自己负责计算总价？"
                )
            ]
        ),


        /* =====================================================
           10-06
        ===================================================== */

        lesson(
            "py-10-06",
            "组合：对象拥有对象",
            "理解比继承更加常用的对象组织方式。",
            [

                paragraph(
                    "组合（Composition）是面向对象设计中非常重要的思想：一个对象内部保存其他对象，并通过这些对象完成工作。"
                ),

                paragraph(
                    "例如，一个订单通常包含多个订单项；一个购物车包含多个商品；一个播放器可以拥有一个音频设备；一个学校可以包含多个学生。"
                ),

                diagram(
                    "组合关系",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Order</strong>
                            <span>order_id</span>
                            <span>customer</span>
                            <span>items</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>OrderItem</strong>
                                <span>product</span>
                                <span>quantity</span>
                            </div>

                            <div class="diagram-box">
                                <strong>OrderItem</strong>
                                <span>product</span>
                                <span>quantity</span>
                            </div>

                            <div class="diagram-box">
                                <strong>OrderItem</strong>
                                <span>product</span>
                                <span>quantity</span>
                            </div>
                        </div>
                    </div>
                    `,
                    "一个复杂对象可以由多个简单对象组合而成。"
                ),

                code(
                    `class Product:

    def __init__(self, name, price):
        self.name = name
        self.price = price


class OrderItem:

    def __init__(self, product, quantity):
        self.product = product
        self.quantity = quantity

    def subtotal(self):
        return self.product.price * self.quantity


class Order:

    def __init__(self):
        self.items = []

    def add_item(self, item):
        self.items.append(item)

    def total(self):
        return sum(
            item.subtotal()
            for item in self.items
        )


book = Product("Python Book", 50)

item = OrderItem(book, 2)

order = Order()
order.add_item(item)

print(order.total())`,
                    "Order 组合多个对象"
                ),

                paragraph(
                    "这里没有使用继承，但我们已经构建出了一个相对真实的系统。Order 不需要知道 Product 的所有细节，它只需要与 OrderItem 协作。"
                ),

                callout(
                    "非常重要",
                    "很多真实项目的复杂性，主要不是通过越来越深的继承树解决的，而是通过多个职责清晰的对象组合起来解决的。"
                ),

                practice(
                    "练习 72：购物车组合",
                    "设计 Product、CartItem、ShoppingCart 三个类，让 ShoppingCart 通过组合管理多个 CartItem。"
                )
            ]
        ),


        /* =====================================================
           10-07
        ===================================================== */

        lesson(
            "py-10-07",
            "委托：不要什么事情都自己做",
            "理解对象之间如何通过协作降低复杂度。",
            [

                paragraph(
                    "组合进一步发展，就会产生一个非常重要的思想：委托（Delegation）。"
                ),

                paragraph(
                    "一个对象不需要亲自完成所有工作。如果另一对象更适合完成某件事情，就把工作交给它。"
                ),

                code(
                    `class EmailSender:

    def send(self, address, message):
        print("发送邮件")
        print(address)
        print(message)


class UserService:

    def __init__(self, email_sender):
        self.email_sender = email_sender

    def register(self, email):
        print("创建用户")

        self.email_sender.send(
            email,
            "欢迎注册"
        )


sender = EmailSender()

service = UserService(sender)

service.register("alice@example.com")`,
                    "委托"
                ),

                diagram(
                    "对象之间的协作",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>UserService</strong>
                            <span>负责用户业务</span>
                        </div>

                        <div class="diagram-arrow">→ 委托</div>

                        <div class="diagram-box">
                            <strong>EmailSender</strong>
                            <span>负责发送邮件</span>
                        </div>
                    </div>
                    `,
                    "UserService 不需要知道邮件发送的全部实现细节。"
                ),

                paragraph(
                    "这种设计的好处是职责更加清晰。UserService 负责用户业务，EmailSender 负责邮件发送。"
                ),

                thinking(
                    "思考",
                    "如果以后不想发送真实邮件，而是把邮件记录到日志文件中，UserService 是否应该被迫修改？"
                ),

                practice(
                    "练习 73：日志服务",
                    "创建 Logger 类，让其他对象通过组合和委托的方式记录日志。"
                )
            ]
        ),


        /* =====================================================
           10-08
        ===================================================== */

        lesson(
            "py-10-08",
            "继承：什么时候真的需要？",
            "理解继承的价值，同时避免为了复用代码而滥用继承。",
            [

                paragraph(
                    "继承当然是面向对象的重要机制，但它并不是代码复用的唯一方式。"
                ),

                paragraph(
                    "当两个类型之间存在稳定、明确的“是一种（is-a）”关系时，继承通常比较自然。"
                ),

                code(
                    `class Animal:

    def speak(self):
        print("动物发出声音")


class Dog(Animal):

    def speak(self):
        print("汪汪")


class Cat(Animal):

    def speak(self):
        print("喵喵")`,
                    "继承"
                ),

                diagram(
                    "继承关系",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Animal</strong>
                            <span>共同接口</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>Dog</strong>
                                <span>Animal 的一种</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Cat</strong>
                                <span>Animal 的一种</span>
                            </div>
                        </div>
                    `,
                    "继承描述的是一种类型关系。"
                ),

                paragraph(
                    "但如果两个对象只是“需要一起工作”，并不意味着它们应该存在继承关系。"
                ),

                code(
                    `class Engine:

    def start(self):
        print("发动机启动")


class Car:

    def __init__(self):
        self.engine = Engine()

    def start(self):
        self.engine.start()
        print("汽车启动")`,
                    "组合而不是继承"
                ),

                callout(
                    "判断标准",
                    "“Car 是一种 Engine”显然不成立，因此 Car 不应该继承 Engine。Car 拥有一个 Engine，这就是组合。"
                ),

                concepts([
                    "is-a：通常考虑继承",
                    "has-a：通常考虑组合",
                    "uses-a：通常考虑委托或依赖",
                    "不要为了复用几行代码就建立继承关系"
                ]),

                practice(
                    "练习 74：图形系统",
                    "设计 Shape、Circle、Rectangle。先思考哪些关系应该使用继承，哪些关系应该使用组合。"
                )
            ]
        ),


        /* =====================================================
           10-09
        ===================================================== */

        lesson(
            "py-10-09",
            "多态：面向共同能力编程",
            "理解为什么调用方不一定需要知道具体对象类型。",
            [

                paragraph(
                    "多态可以理解为：不同对象可以提供相同的接口，而调用方只关心“它能做什么”，不必关心“它具体是什么类型”。"
                ),

                code(
                    `class Dog:

    def speak(self):
        return "汪汪"


class Cat:

    def speak(self):
        return "喵喵"


animals = [
    Dog(),
    Cat()
]

for animal in animals:
    print(animal.speak())`,
                    "多态"
                ),

                paragraph(
                    "这里的循环根本不需要判断：if animal is Dog、if animal is Cat。它只需要知道：这个对象可以调用 speak()。"
                ),

                diagram(
                    "共同接口",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>Dog</strong>
                                <span>speak()</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Cat</strong>
                                <span>speak()</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Robot</strong>
                                <span>speak()</span>
                            </div>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>调用方</strong>
                            <span>只调用 speak()</span>
                        </div>
                    </div>
                    `,
                    "调用方依赖能力，而不是具体类型。"
                ),

                paragraph(
                    "这也是 Python 鸭子类型（Duck Typing）思想的重要体现：如果一个对象能够提供我们需要的行为，那么通常就可以使用它。"
                ),

                code(
                    `class FileLogger:

    def write(self, message):
        print("写入文件:", message)


class ConsoleLogger:

    def write(self, message):
        print("控制台:", message)


def save_log(logger, message):
    logger.write(message)


save_log(
    ConsoleLogger(),
    "程序启动"
)

save_log(
    FileLogger(),
    "程序结束"
)`,
                    "鸭子类型"
                ),

                practice(
                    "练习 75：统一支付接口",
                    "设计 Alipay、WeChatPay、BankPay，让它们都提供 pay(amount) 方法，再编写一个不关心具体支付类型的 checkout() 函数。"
                )
            ]
        ),


        /* =====================================================
           10-10
        ===================================================== */

        lesson(
            "py-10-10",
            "dataclass：数据对象的现代写法",
            "理解 Python 为常见对象模型提供的简化工具。",
            [

                paragraph(
                    "有些类的主要任务就是保存数据。例如 Student、Product、Point、User。对于这种情况，Python 提供了 dataclasses。"
                ),

                code(
                    `from dataclasses import dataclass


@dataclass
class Student:

    name: str
    score: float


student = Student(
    "Alice",
    95
)

print(student)`,
                    "dataclass"
                ),

                paragraph(
                    "dataclass 可以自动生成一些常见的对象方法，让数据模型更加简洁。"
                ),

                code(
                    `from dataclasses import dataclass


@dataclass
class Product:

    name: str
    price: float
    stock: int


product = Product(
    "Keyboard",
    299,
    20
)

print(product.name)
print(product.price)`,
                    "数据模型"
                ),

                concepts([
                    "适合表达主要由数据组成的对象",
                    "可以配合类型标注",
                    "减少大量样板代码",
                    "并不意味着所有 class 都应该改成 dataclass"
                ]),

                practice(
                    "练习 76：创建 Product",
                    "使用 dataclass 创建商品模型，加入 name、price、stock。"
                )
            ]
        ),


        /* =====================================================
           10-11
        ===================================================== */

        lesson(
            "py-10-11",
            "实例方法、类方法与静态方法",
            "理解不同类型的方法到底属于谁。",
            [

                paragraph(
                    "Python 中常见的方法可以分为实例方法、类方法和静态方法。重点不是背装饰器，而是理解它们需要什么上下文。"
                ),

                code(
                    `class Student:

    school = "Python Academy"

    def __init__(self, name):
        self.name = name

    def show(self):
        print(self.name)

    @classmethod
    def show_school(cls):
        print(cls.school)

    @staticmethod
    def add(a, b):
        return a + b


student = Student("Alice")

student.show()

Student.show_school()

print(Student.add(10, 20))`,
                    "三种方法"
                ),

                concepts([
                    "实例方法：需要当前实例 self",
                    "类方法：需要当前类 cls",
                    "静态方法：不依赖实例或类状态",
                    "选择方法类型时应该根据实际职责，而不是为了使用装饰器"
                ]),

                paragraph(
                    "在日常 Python 开发中，实例方法和普通函数非常常见。classmethod 和 staticmethod 是解决特定设计问题的工具，不需要为了“面向对象”而强行使用。"
                ),

                practice(
                    "练习 77：工厂方法",
                    "为 User 类设计一个 classmethod，从字典数据创建 User 对象。"
                )
            ]
        ),


        /* =====================================================
           10-12
        ===================================================== */

        lesson(
            "py-10-12",
            "特殊方法：让对象融入 Python",
            "理解 __str__、__len__、__eq__ 等特殊方法。",
            [

                paragraph(
                    "Python 的对象模型非常强大。我们可以通过特殊方法，让自己创建的对象表现得像 Python 内置对象一样。"
                ),

                code(
                    `class Book:

    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    def __str__(self):
        return self.title

    def __len__(self):
        return self.pages


book = Book(
    "Python Book",
    300
)

print(book)
print(len(book))`,
                    "特殊方法"
                ),

                paragraph(
                    "这里 print(book) 会调用 __str__，而 len(book) 会调用 __len__。"
                ),

                code(
                    `class Point:

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return (
            self.x == other.x
            and self.y == other.y
        )


p1 = Point(1, 2)
p2 = Point(1, 2)

print(p1 == p2)`,
                    "__eq__"
                ),

                concepts([
                    "__str__：对象的字符串表示",
                    "__repr__：对象更适合调试的表示",
                    "__len__：支持 len()",
                    "__eq__：定义 == 的行为",
                    "__lt__：定义 < 的行为",
                    "__contains__：支持 in"
                ]),

                thinking(
                    "思考",
                    "为什么 Python 不要求我们调用 book.get_length()，而可以直接使用 len(book)？"
                ),

                practice(
                    "练习 78：设计 Point",
                    "为 Point 增加 __str__ 和 __eq__，让它能够自然地打印和比较。"
                )
            ]
        ),


        /* =====================================================
           10-13
        ===================================================== */

        lesson(
            "py-10-13",
            "类属性与实例属性",
            "理解共享数据和独立数据之间的区别。",
            [

                paragraph(
                    "实例属性属于某一个对象，而类属性通常属于整个类，可以被多个实例共享。"
                ),

                code(
                    `class Student:

    school = "Python Academy"

    def __init__(self, name):
        self.name = name


alice = Student("Alice")
bob = Student("Bob")

print(alice.name)
print(bob.name)

print(alice.school)
print(bob.school)`,
                    "类属性"
                ),

                diagram(
                    "类属性与实例属性",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Student class</strong>
                            <span>school = Python Academy</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>Alice</strong>
                                <span>name = Alice</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Bob</strong>
                                <span>name = Bob</span>
                            </div>
                        </div>
                    `,
                    "实例数据独立，类属性可以共享。"
                ),

                paragraph(
                    "需要特别注意可变对象作为类属性时可能产生的共享状态问题。"
                ),

                code(
                    `class Team:

    members = []


a = Team()
b = Team()

a.members.append("Alice")

print(b.members)`,
                    "共享可变类属性的问题"
                ),

                callout(
                    "经验",
                    "如果数据应该属于每一个实例，就应该在 __init__ 中初始化实例属性，而不是随意放在 class 级别。"
                )
            ]
        ),


        /* =====================================================
           10-14
        ===================================================== */

        lesson(
            "py-10-14",
            "如何设计一个好类？",
            "从“会写 class”进入真正的对象设计。",
            [

                paragraph(
                    "写出一个 class 并不困难。困难的是：到底应该设计几个类？每个类负责什么？哪些功能应该放进去？"
                ),

                concepts([
                    "一个类应该有比较清晰的职责",
                    "不要让一个类同时负责数据库、网络、界面、业务和日志",
                    "优先考虑组合，再考虑继承",
                    "让对象之间通过清晰接口协作",
                    "避免为了封装而增加无意义的 class",
                    "如果函数和普通数据结构已经足够清晰，就不必强行使用 class"
                ]),

                diagram(
                    "复杂系统的组织方式",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>UserService</strong>
                                <span>用户业务</span>
                            </div>

                            <div class="diagram-box">
                                <strong>OrderService</strong>
                                <span>订单业务</span>
                            </div>

                            <div class="diagram-box">
                                <strong>PaymentService</strong>
                                <span>支付业务</span>
                            </div>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>Repository</strong>
                                <span>数据访问</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Logger</strong>
                                <span>日志</span>
                            </div>
                        </div>
                    `,
                    "复杂程序可以通过多个职责清晰的对象组合起来。"
                ),

                paragraph(
                    "一个非常有用的问题是：如果删除某个类，其他代码是否立刻全部崩溃？如果答案是肯定的，说明它可能承担了太多职责，或者系统耦合过高。"
                ),

                thinking(
                    "设计问题",
                    "一个 User 类同时负责用户资料、发送邮件、保存数据库、生成 PDF、发送短信。你觉得这是一个好设计吗？为什么？"
                ),

                callout(
                    "不要过度设计",
                    "面向对象不是让程序拥有越多 class 越高级。真正好的设计，是让程序结构能够帮助人理解和修改代码。"
                )
            ]
        ),


        /* =====================================================
           10-15
        ===================================================== */

        lesson(
            "py-10-15",
            "综合项目：订单系统",
            "使用组合、委托和多态构建一个小型真实系统。",
            [

                paragraph(
                    "现在把本章的知识组合起来，设计一个简单订单系统。"
                ),

                paragraph(
                    "系统至少包含 Product、OrderItem、Order、Payment 等不同职责。重点不是代码量，而是思考每个对象应该负责什么。"
                ),

                diagram(
                    "订单系统结构",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Order</strong>
                            <span>管理订单</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>Product</strong>
                                <span>商品信息</span>
                            </div>

                            <div class="diagram-box">
                                <strong>OrderItem</strong>
                                <span>数量与小计</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Payment</strong>
                                <span>支付行为</span>
                            </div>
                        </div>
                    `,
                    "通过组合构建订单系统。"
                ),

                code(
                    `from dataclasses import dataclass


@dataclass
class Product:

    name: str
    price: float


@dataclass
class OrderItem:

    product: Product
    quantity: int

    def subtotal(self):
        return (
            self.product.price
            * self.quantity
        )


class Order:

    def __init__(self):
        self.items = []

    def add_item(self, item):
        self.items.append(item)

    def total(self):
        return sum(
            item.subtotal()
            for item in self.items
        )


class ConsolePayment:

    def pay(self, amount):
        print(
            f"支付 {amount:.2f} 元"
        )


class CheckoutService:

    def __init__(self, payment):
        self.payment = payment

    def checkout(self, order):
        total = order.total()

        self.payment.pay(total)


book = Product(
    "Python Book",
    59.9
)

item = OrderItem(
    book,
    2
)

order = Order()

order.add_item(item)

payment = ConsolePayment()

checkout = CheckoutService(payment)

checkout.checkout(order)`,
                    "订单系统"
                ),

                paragraph(
                    "这个例子非常值得仔细观察：Order 不负责支付，CheckoutService 不负责计算商品价格，Product 不负责订单管理。每个对象只承担自己的职责，然后通过组合协作。"
                ),

                concepts([
                    "Product：描述商品",
                    "OrderItem：描述订单中的商品及数量",
                    "Order：管理订单项目",
                    "Payment：负责支付",
                    "CheckoutService：协调结算流程"
                ]),

                practice(
                    "练习 79：扩展订单系统",
                    "增加折扣、库存检查、优惠券、不同支付方式等功能，并尽量保持每个类职责清晰。"
                )
            ]
        ),


        /* =====================================================
           10-16
        ===================================================== */

        lesson(
            "py-10-16",
            "面向对象设计练习",
            "通过多个小问题训练“组合还是继承”的判断能力。",
            [

                paragraph(
                    "这一节不再重点考察 class 语法，而是考察设计判断。"
                ),

                practice(
                    "练习 80：汽车系统",
                    "Car、Engine、Wheel、GPS 之间应该如何组织？哪些关系应该使用组合？"
                ),

                practice(
                    "练习 81：游戏角色",
                    "Player、Weapon、Inventory、Skill 之间应该如何组合？不要急着使用继承。"
                ),

                practice(
                    "练习 82：通知系统",
                    "EmailNotifier、SMSNotifier、ConsoleNotifier 都提供 send()。设计一个不关心具体通知方式的 NotificationService。"
                ),

                practice(
                    "练习 83：图形系统",
                    "Circle、Rectangle、Triangle 是否应该继承 Shape？如果需要，应该共享什么接口？"
                ),

                practice(
                    "练习 84：文件处理系统",
                    "设计 TextFile、CSVFile、JSONFile，思考哪些行为应该共享，哪些行为应该组合或委托给其他对象。"
                ),

                thinking(
                    "最终问题",
                    "如果你发现自己正在创建一个五层甚至十层的继承树，是否应该停下来重新考虑组合？"
                ),

                checklist([
                    "我知道什么是 class 和 instance",
                    "我理解对象的状态与行为",
                    "我知道 __init__ 和 self 的作用",
                    "我能够设计基本的实例方法",
                    "我理解封装和职责",
                    "我理解组合（Composition）",
                    "我理解委托（Delegation）",
                    "我知道什么时候可以使用继承",
                    "我理解多态和鸭子类型",
                    "我知道 dataclass 适合解决什么问题",
                    "我理解实例属性与类属性",
                    "我知道特殊方法如何让对象融入 Python",
                    "我开始能够从系统角度设计对象"
                ]),

                callout(
                    "本章最重要的一句话",
                    "面向对象的核心不是“继承”，而是如何把复杂系统拆成职责清晰、能够相互协作的对象。"
                ),

                paragraph(
                    "下一章将进入 Pythonic 数据处理。前面我们已经学习了列表、字典、函数和对象，接下来将进一步学习如何使用推导式、迭代器、生成器等机制，以更加符合 Python 思维的方式处理数据。"
                )
            ]
        )
    ]
};


export { chapter10 };

export default chapter10;