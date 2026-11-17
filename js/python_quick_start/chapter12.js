/* =========================================================
   PYTHON QUICK START
   chapter12.js

   第十二章：Python 设计模式与程序架构

   核心思想：

   当程序越来越大以后：

       “能运行”
       
   已经远远不够。

   真正的问题开始变成：

       谁负责什么？
       对象之间如何协作？
       如何降低耦合？
       如何替换一个模块而不修改整个系统？
       如何让代码容易测试？
       如何让未来增加功能时不需要到处改代码？

   本章重点：

       软件设计
       Separation of Concerns
       Single Responsibility
       High Cohesion
       Low Coupling
       Composition
       Dependency Injection

       Strategy Pattern
       Factory Pattern
       Adapter Pattern
       Facade Pattern
       Observer Pattern
       Singleton Pattern

       MVC
       MVP

       Repository
       Service
       Controller / Presenter

       依赖关系
       接口思想
       可测试设计
       小型项目架构

   注意：

       本章不是设计模式大全。

       重点不是：

           “记住多少种 Pattern”

       而是：

           “遇到什么问题，
            为什么需要这样的结构？”

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


const chapter12 = {

    id: "chapter-12",

    number: "12",

    title: "Python 设计模式与程序架构",

    englishTitle: "Design Patterns & Software Architecture",

    description:
        "从“代码能够运行”进入“代码能够长期维护”。学习职责分离、低耦合、组合、依赖注入，以及 Strategy、Factory、Adapter、Facade、Observer、Singleton、MVC、MVP 等经典设计思想。",

    sections: [

        /* =====================================================
           12-01
        ===================================================== */

        lesson(
            "py-12-01",
            "当程序开始变复杂",
            "理解为什么需要软件设计。",
            [

                paragraph(
                    "前面的章节里，我们已经学会了函数、数据结构、模块、对象、组合和数据管道。对于几十行或者几百行的程序，这些知识通常已经足够。"
                ),

                paragraph(
                    "但真实项目可能拥有几十个模块、几百个函数、几十个类。此时真正困难的问题不再是“Python 语法怎么写”，而是“代码应该放在哪里”。"
                ),

                code(
                    `def create_user():
    ...


def save_user():
    ...


def send_email():
    ...


def create_order():
    ...


def pay_order():
    ...


def generate_report():
    ...


def send_sms():
    ...


def export_pdf():
    ...`,
                    "功能越来越多"
                ),

                paragraph(
                    "如果所有功能都堆在一个文件中，代码很快就会变得难以理解。修改一个功能，还可能意外影响另外几个功能。"
                ),

                diagram(
                    "程序复杂度增长",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>小程序</strong>
                            <span>几个函数</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>中型程序</strong>
                            <span>多个模块</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>大型程序</strong>
                            <span>大量对象与依赖</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>架构问题</strong>
                            <span>谁负责什么？</span>
                        </div>
                    </div>
                    `,
                    "程序越大，结构本身就越重要。"
                ),

                callout(
                    "本章的核心问题",
                    "我们不是为了学习几个漂亮的 class，而是要学习如何让越来越复杂的程序依然可以理解、修改和扩展。"
                ),

                thinking(
                    "思考",
                    "如果一个函数同时负责读取数据库、计算业务逻辑、发送邮件和生成 HTML，它出了问题，你会从哪里开始排查？"
                )
            ]
        ),


        /* =====================================================
           12-02
        ===================================================== */

        lesson(
            "py-12-02",
            "职责分离：一个模块到底应该负责什么？",
            "理解 Separation of Concerns 和 Single Responsibility。",
            [

                paragraph(
                    "一个非常重要的软件设计原则是职责分离（Separation of Concerns）。简单来说，就是不要让完全不同的问题混在一起。"
                ),

                code(
                    `class UserService:

    def register(self, name):

        # 创建用户
        user = {
            "name": name
        }

        # 保存数据库
        save_to_database(user)

        # 发送邮件
        send_email(
            name,
            "欢迎注册"
        )

        # 写日志
        write_log(
            "user created"
        )

        return user`,
                    "职责过多"
                ),

                paragraph(
                    "这个类表面上叫 UserService，但实际上承担了用户业务、数据库、邮件和日志四种不同职责。"
                ),

                diagram(
                    "职责分离",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>UserService</strong>
                                <span>用户业务</span>
                            </div>

                            <div class="diagram-box">
                                <strong>UserRepository</strong>
                                <span>数据保存</span>
                            </div>

                            <div class="diagram-box">
                                <strong>EmailService</strong>
                                <span>邮件</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Logger</strong>
                                <span>日志</span>
                            </div>
                        </div>
                    `,
                    "每个模块负责一个相对清晰的领域。"
                ),

                concepts([
                    "一个模块应该有清晰的职责",
                    "修改数据库实现不应该影响用户业务",
                    "更换邮件服务不应该影响订单逻辑",
                    "日志系统应该可以独立变化",
                    "职责越清晰，代码越容易测试"
                ]),

                callout(
                    "不是越小越好",
                    "职责分离并不意味着把每一行代码都拆成一个 class。真正重要的是让模块边界有意义。"
                ),

                practice(
                    "练习 100：拆分 UserService",
                    "把一个同时负责用户业务、数据库、邮件和日志的类重新设计成多个职责清晰的对象。"
                )
            ]
        ),


        /* =====================================================
           12-03
        ===================================================== */

        lesson(
            "py-12-03",
            "高内聚与低耦合",
            "理解优秀程序结构背后的两个重要概念。",
            [

                paragraph(
                    "设计程序时经常会听到两个词：高内聚（High Cohesion）和低耦合（Low Coupling）。"
                ),

                paragraph(
                    "高内聚意味着一个模块内部的代码都围绕一个比较明确的问题展开。低耦合意味着模块之间不要互相依赖太多内部细节。"
                ),

                diagram(
                    "高内聚",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>PaymentService</strong>
                            <span>创建支付</span>
                            <span>查询支付</span>
                            <span>取消支付</span>
                            <span>支付状态</span>
                        </div>
                    `,
                    "一个模块内部的功能围绕同一个领域。"
                ),

                diagram(
                    "低耦合",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>OrderService</strong>
                            </div>

                            <div class="diagram-arrow">→</div>

                            <div class="diagram-box">
                                <strong>Payment Interface</strong>
                            </div>
                        </div>
                    `,
                    "调用方依赖稳定的能力，而不是依赖具体实现细节。"
                ),

                paragraph(
                    "低耦合的价值非常明显：如果支付服务从支付宝换成其他支付方式，订单系统不应该需要大规模修改。"
                ),

                thinking(
                    "思考",
                    "如果 OrderService 里面写死了 AlipayClient，那么以后增加 WeChatPay 时需要修改多少代码？"
                )
            ]
        ),


        /* =====================================================
           12-04
        ===================================================== */

        lesson(
            "py-12-04",
            "依赖注入：不要在对象内部创建一切",
            "理解 Dependency Injection 的核心思想。",
            [

                paragraph(
                    "一个常见的坏设计是：一个对象自己创建它所需要的所有依赖。这样看起来简单，但会导致强耦合。"
                ),

                code(
                    `class OrderService:

    def __init__(self):

        self.payment = AlipayPayment()
        self.email = EmailService()
        self.logger = FileLogger()`,
                    "强耦合"
                ),

                paragraph(
                    "OrderService 现在知道具体使用了 AlipayPayment、EmailService 和 FileLogger。"
                ),

                code(
                    `class OrderService:

    def __init__(
        self,
        payment,
        email,
        logger
    ):
        self.payment = payment
        self.email = email
        self.logger = logger`,
                    "依赖注入"
                ),

                diagram(
                    "Dependency Injection",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>Payment</strong>
                            </div>

                            <div class="diagram-box">
                                <strong>Email</strong>
                            </div>

                            <div class="diagram-box">
                                <strong>Logger</strong>
                            </div>
                        </div>

                        <div class="diagram-arrow">↓ 注入</div>

                        <div class="diagram-box">
                            <strong>OrderService</strong>
                            <span>只依赖能力</span>
                        </div>
                    `,
                    "依赖由外部提供，而不是对象自己创建。"
                ),

                paragraph(
                    "这样做还有一个非常重要的好处：测试时可以传入假的对象。"
                ),

                code(
                    `class FakePayment:

    def pay(self, amount):
        print("测试支付:", amount)


service = OrderService(
    FakePayment(),
    FakeEmail(),
    FakeLogger()
)`,
                    "测试替换依赖"
                ),

                callout(
                    "设计思想",
                    "不要让业务对象决定所有基础设施。让外部决定使用什么实现，再把依赖交给业务对象。"
                )
            ]
        ),


        /* =====================================================
           12-05
        ===================================================== */

        lesson(
            "py-12-05",
            "Strategy Pattern：把变化的算法拿出去",
            "理解最实用的设计模式之一。",
            [

                paragraph(
                    "假设一个订单系统有多种折扣方式。如果所有逻辑都写在一个函数里，很容易出现越来越长的 if / elif。"
                ),

                code(
                    `def calculate_discount(
    price,
    discount_type
):

    if discount_type == "vip":
        return price * 0.8

    elif discount_type == "coupon":
        return price - 20

    elif discount_type == "festival":
        return price * 0.7

    return price`,
                    "大量条件分支"
                ),

                paragraph(
                    "如果折扣规则不断增加，这个函数会越来越复杂。Strategy Pattern 的思路是：把每一种算法变成一个独立对象。"
                ),

                code(
                    `class VipDiscount:

    def calculate(self, price):
        return price * 0.8


class CouponDiscount:

    def calculate(self, price):
        return price - 20


class FestivalDiscount:

    def calculate(self, price):
        return price * 0.7


class Order:

    def __init__(self, discount):
        self.discount = discount

    def total(self, price):
        return self.discount.calculate(price)


order = Order(
    VipDiscount()
)

print(
    order.total(100)
)`,
                    "Strategy Pattern"
                ),

                diagram(
                    "Strategy",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>VipDiscount</strong>
                                <span>calculate()</span>
                            </div>

                            <div class="diagram-box">
                                <strong>CouponDiscount</strong>
                                <span>calculate()</span>
                            </div>

                            <div class="diagram-box">
                                <strong>FestivalDiscount</strong>
                                <span>calculate()</span>
                            </div>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Order</strong>
                            <span>只调用 calculate()</span>
                        </div>
                    `,
                    "算法可以被替换，而调用方不需要修改。"
                ),

                callout(
                    "什么时候使用？",
                    "当一个问题有多种实现，而且这些实现需要经常替换时，Strategy 非常有价值。"
                ),

                practice(
                    "练习 101：支付策略",
                    "设计 Alipay、WeChatPay、BankTransfer 三种支付策略，让 CheckoutService 不关心具体支付方式。"
                )
            ]
        ),


        /* =====================================================
           12-06
        ===================================================== */

        lesson(
            "py-12-06",
            "Factory Pattern：把对象创建集中起来",
            "理解为什么对象创建本身也可能成为复杂问题。",
            [

                paragraph(
                    "当程序中到处出现具体 class 的创建代码时，调用方会逐渐依赖大量具体实现。"
                ),

                code(
                    `if payment_type == "alipay":
    payment = AlipayPayment()

elif payment_type == "wechat":
    payment = WeChatPayment()

elif payment_type == "bank":
    payment = BankPayment()`,
                    "创建逻辑散落"
                ),

                paragraph(
                    "Factory 的核心思想是把“创建什么对象”集中到一个地方。"
                ),

                code(
                    `class PaymentFactory:

    @staticmethod
    def create(payment_type):

        if payment_type == "alipay":
            return AlipayPayment()

        if payment_type == "wechat":
            return WeChatPayment()

        if payment_type == "bank":
            return BankPayment()

        raise ValueError(
            "Unknown payment type"
        )`,
                    "Factory"
                ),

                code(
                    `payment = PaymentFactory.create(
    "alipay"
)

payment.pay(100)`,
                    "使用 Factory"
                ),

                paragraph(
                    "Factory 并不是必须存在。只有当对象创建逻辑本身变得复杂，或者调用方不应该知道具体实现时，Factory 才真正有价值。"
                ),

                thinking(
                    "思考",
                    "如果一个类只有一行 __init__，创建它也不复杂，你是否真的需要为它建立一个 Factory？"
                )
            ]
        ),


        /* =====================================================
           12-07
        ===================================================== */

        lesson(
            "py-12-07",
            "Adapter Pattern：让不同接口能够合作",
            "解决第三方库或旧系统接口不一致的问题。",
            [

                paragraph(
                    "真实项目经常需要同时使用多个外部系统，而不同系统的 API 往往并不一致。"
                ),

                code(
                    `class Alipay:

    def create_payment(self, amount):
        print("支付宝:", amount)


class WeChatPay:

    def make_order(self, money):
        print("微信:", money)`,
                    "两个不同接口"
                ),

                paragraph(
                    "如果业务层直接使用它们，就需要知道两套 API。"
                ),

                code(
                    `class WeChatAdapter:

    def __init__(self, wechat):
        self.wechat = wechat

    def pay(self, amount):
        self.wechat.make_order(amount)`,
                    "Adapter"
                ),

                diagram(
                    "Adapter",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>OrderService</strong>
                            <span>pay(amount)</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>统一接口</strong>
                            <span>pay()</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>WeChat API</strong>
                            <span>make_order()</span>
                        </div>
                    `,
                    "Adapter 把一个接口转换成另一个接口。"
                ),

                callout(
                    "实际工程非常常见",
                    "第三方 API、旧系统、SDK、数据库驱动等接口不一致时，Adapter 可以让业务代码保持稳定。"
                ),

                practice(
                    "练习 102：文件存储 Adapter",
                    "设计 LocalStorage 和 CloudStorage，并通过统一的 save() 接口让业务层使用它们。"
                )
            ]
        ),


        /* =====================================================
           12-08
        ===================================================== */

        lesson(
            "py-12-08",
            "Facade Pattern：给复杂系统一个简单入口",
            "学习如何隐藏内部复杂性。",
            [

                paragraph(
                    "有时候一个系统内部非常复杂，但使用者只需要完成一个简单动作。此时可以提供一个 Facade（外观）。"
                ),

                code(
                    `class Inventory:

    def check(self, product):
        ...


class Payment:

    def pay(self, amount):
        ...


class Shipping:

    def create_order(self, address):
        ...


class OrderFacade:

    def __init__(
        self,
        inventory,
        payment,
        shipping
    ):
        self.inventory = inventory
        self.payment = payment
        self.shipping = shipping

    def place_order(
        self,
        product,
        amount,
        address
    ):

        self.inventory.check(product)

        self.payment.pay(amount)

        self.shipping.create_order(
            address
        )`,
                    "Facade"
                ),

                paragraph(
                    "调用方只需要知道 place_order()，不需要知道库存、支付、物流之间具体如何协作。"
                ),

                diagram(
                    "Facade",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Client</strong>
                            <span>place_order()</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>OrderFacade</strong>
                            <span>统一入口</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>Inventory</strong>
                            </div>

                            <div class="diagram-box">
                                <strong>Payment</strong>
                            </div>

                            <div class="diagram-box">
                                <strong>Shipping</strong>
                            </div>
                        </div>
                    `,
                    "Facade 隐藏多个子系统的复杂协作。"
                ),

                thinking(
                    "思考",
                    "如果一个用户只想完成“购买商品”，是否应该要求他自己依次调用库存、支付和物流三个系统？"
                )
            ]
        ),


        /* =====================================================
           12-09
        ===================================================== */

        lesson(
            "py-12-09",
            "Observer Pattern：事件与通知",
            "理解对象之间如何通过事件进行松耦合通信。",
            [

                paragraph(
                    "有些系统中，一个事件发生以后，需要通知多个对象。例如订单支付成功后，可能需要发送邮件、更新库存、记录日志。"
                ),

                code(
                    `class EmailListener:

    def update(self, event):
        print("发送邮件:", event)


class LogListener:

    def update(self, event):
        print("记录日志:", event)


class EventBus:

    def __init__(self):
        self.listeners = []

    def subscribe(self, listener):
        self.listeners.append(listener)

    def publish(self, event):

        for listener in self.listeners:
            listener.update(event)`,
                    "Observer / Event"
                ),

                code(
                    `bus = EventBus()

bus.subscribe(
    EmailListener()
)

bus.subscribe(
    LogListener()
)

bus.publish(
    "payment_success"
)`,
                    "发布事件"
                ),

                diagram(
                    "Observer",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>EventBus</strong>
                            <span>payment_success</span>
                        </div>

                        <div class="diagram-arrow">↙　↘</div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>EmailListener</strong>
                            </div>

                            <div class="diagram-box">
                                <strong>LogListener</strong>
                            </div>
                        </div>
                    `,
                    "一个事件可以通知多个观察者。"
                ),

                paragraph(
                    "Observer 是事件驱动系统的重要思想。现代 Web 应用、GUI、消息系统以及很多异步架构中都可以看到类似概念。"
                ),

                practice(
                    "练习 103：订单事件",
                    "设计 order_created、payment_success、order_shipped 三种事件，并让不同 Listener 响应不同事件。"
                )
            ]
        ),


        /* =====================================================
           12-10
        ===================================================== */

        lesson(
            "py-12-10",
            "Singleton：全局只有一个实例",
            "理解 Singleton，同时认识它为什么容易被滥用。",
            [

                paragraph(
                    "Singleton 的目标非常简单：某个对象在整个程序中只允许存在一个实例。"
                ),

                paragraph(
                    "例如某些情况下，程序可能希望共享一个配置中心、日志管理器或者资源管理器。"
                ),

                code(
                    `class Config:

    _instance = None

    def __new__(cls):

        if cls._instance is None:
            cls._instance = super().__new__(
                cls
            )

        return cls._instance


a = Config()
b = Config()

print(a is b)`,
                    "Singleton"
                ),

                diagram(
                    "Singleton",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Config</strong>
                            <span>唯一实例</span>
                        </div>

                        <div class="diagram-arrow">↙　↘</div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>a</strong>
                            </div>

                            <div class="diagram-box">
                                <strong>b</strong>
                            </div>
                        </div>

                        <div class="diagram-arrow">↘　↙</div>

                        <div class="diagram-box">
                            <strong>同一个对象</strong>
                        </div>
                    `,
                    "多个引用指向同一个实例。"
                ),

                callout(
                    "非常重要：Singleton 不是万能药",
                    "Singleton 会引入全局状态，使测试、并发和依赖关系变得更加复杂。很多情况下，显式创建一个对象并通过依赖注入传递它，比 Singleton 更清晰。"
                ),

                paragraph(
                    "因此学习 Singleton 的真正价值，并不是“以后所有管理器都写成 Singleton”，而是理解全局共享状态为什么危险。"
                ),

                thinking(
                    "设计问题",
                    "如果一个 Logger 可以普通创建，然后把同一个实例传给需要它的服务，是否还一定需要 Singleton？"
                )
            ]
        ),


        /* =====================================================
           12-11
        ===================================================== */

        lesson(
            "py-12-11",
            "MVC：把应用分成不同职责",
            "从设计模式进入应用架构。",
            [

                paragraph(
                    "当程序继续变大，仅仅拆几个 class 可能仍然不够。我们还需要考虑整个应用的结构。"
                ),

                paragraph(
                    "MVC 是经典的应用架构思想之一：Model、View、Controller。"
                ),

                diagram(
                    "MVC",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>View</strong>
                                <span>界面</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Controller</strong>
                                <span>协调输入</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Model</strong>
                                <span>数据 / 业务</span>
                            </div>
                        </div>

                        <div class="diagram-arrow">↔</div>

                        <div class="diagram-box">
                            <strong>应用程序</strong>
                            <span>职责分离</span>
                        </div>
                    `,
                    "MVC 通过职责分离组织应用程序。"
                ),

                concepts([
                    "Model：数据和核心业务状态",
                    "View：展示信息",
                    "Controller：接收输入并协调流程",
                    "核心思想仍然是职责分离"
                ]),

                paragraph(
                    "MVC 并不是某种 Python 专属技术，而是一种可以迁移到很多语言和框架的架构思想。"
                ),

                thinking(
                    "思考",
                    "如果一个网页请求进入系统后，数据库查询、业务计算和 HTML 输出全部写在同一个函数中，会产生什么问题？"
                )
            ]
        ),


        /* =====================================================
           12-12
        ===================================================== */

        lesson(
            "py-12-12",
            "MVP：让界面与业务真正分开",
            "理解 Model、View、Presenter 如何协作。",
            [

                paragraph(
                    "对于教程、桌面程序、GUI 工具以及一些交互式应用，MVP（Model-View-Presenter）是一个非常值得理解的架构。"
                ),

                paragraph(
                    "MVP 的一个重要思想是：View 尽量负责显示，Presenter 负责协调界面背后的业务逻辑。"
                ),

                diagram(
                    "MVP",
                    `
                    <div class="object-diagram">
                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>View</strong>
                                <span>显示界面</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Presenter</strong>
                                <span>业务协调</span>
                            </div>

                            <div class="diagram-box">
                                <strong>Model</strong>
                                <span>数据 / 业务</span>
                            </div>
                        </div>

                        <div class="diagram-arrow">
                            View ↔ Presenter ↔ Model
                        </div>
                    `,
                    "Presenter 成为 View 与 Model 之间的协调者。"
                ),

                code(
                    `class UserModel:

    def get_user(self):
        return {
            "name": "Alice",
            "score": 95
        }


class UserView:

    def show_user(self, user):
        print(
            user["name"],
            user["score"]
        )


class UserPresenter:

    def __init__(
        self,
        model,
        view
    ):
        self.model = model
        self.view = view

    def load_user(self):

        user = self.model.get_user()

        self.view.show_user(user)


model = UserModel()

view = UserView()

presenter = UserPresenter(
    model,
    view
)

presenter.load_user()`,
                    "MVP 示例"
                ),

                paragraph(
                    "这个结构最大的价值在于：如果 View 从命令行改成 GUI、Web 页面或者其他界面，核心 Model 和 Presenter 不需要全部重写。"
                ),

                callout(
                    "和你正在做的教程系统很接近",
                    "一个复杂的编辑器、教程系统或者数据工具，同样可以把界面展示、用户操作协调和核心数据模型拆开。"
                ),

                practice(
                    "练习 104：成绩管理 MVP",
                    "设计 StudentModel、StudentView、StudentPresenter，实现查询学生、显示学生和修改成绩。"
                )
            ]
        ),


        /* =====================================================
           12-13
        ===================================================== */

        lesson(
            "py-12-13",
            "Repository 与 Service：真实项目里的常见分层",
            "从设计模式进入更接近实际工程的项目结构。",
            [

                paragraph(
                    "在实际 Python 项目中，经常会看到 Repository、Service、Controller 等名字。它们并不一定是严格的设计模式，而是一种非常常见的职责划分方式。"
                ),

                diagram(
                    "常见业务分层",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>Controller / API</strong>
                            <span>接收请求</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Service</strong>
                            <span>业务逻辑</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Repository</strong>
                            <span>数据访问</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>Database</strong>
                            <span>数据存储</span>
                        </div>
                    `,
                    "不同层承担不同职责。"
                ),

                code(
                    `class UserRepository:

    def find_by_id(self, user_id):
        ...


class UserService:

    def __init__(self, repository):
        self.repository = repository

    def get_user(self, user_id):

        user = self.repository.find_by_id(
            user_id
        )

        if user is None:
            raise ValueError(
                "用户不存在"
            )

        return user`,
                    "Service + Repository"
                ),

                paragraph(
                    "UserService 不需要知道数据库使用 SQLite、PostgreSQL 还是其他存储。它只需要一个可以查找用户的 Repository。"
                ),

                concepts([
                    "Controller：处理外部请求",
                    "Service：处理业务规则",
                    "Repository：负责数据访问",
                    "Model：表达业务数据",
                    "基础设施可以替换，而业务逻辑尽量保持稳定"
                ]),

                callout(
                    "不要迷信分层",
                    "一个只有几十行的小程序没有必要强行创建五层架构。架构是为了控制复杂度，而不是为了制造文件。"
                )
            ]
        ),


        /* =====================================================
           12-14
        ===================================================== */

        lesson(
            "py-12-14",
            "设计模式不是背诵题",
            "学习什么时候应该使用模式，什么时候不应该使用。",
            [

                paragraph(
                    "设计模式最大的误区就是：看到一个模式，就想办法把程序套进去。"
                ),

                code(
                    `class User:

    def __init__(self, name):
        self.name = name`,
                    "简单问题"
                ),

                paragraph(
                    "如果一个程序只有一个 User 类，就没有必要为了“体现 Factory Pattern”而增加 UserFactory、UserBuilder、UserManager 等大量结构。"
                ),

                concepts([
                    "先发现问题，再考虑模式",
                    "先保证简单，再处理真正出现的复杂度",
                    "组合通常比深层继承更加灵活",
                    "依赖注入可以降低耦合",
                    "模式应该帮助理解代码，而不是增加理解成本"
                ]),

                diagram(
                    "模式的正确使用方式",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>遇到问题</strong>
                            <span>代码难以扩展</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>分析变化点</strong>
                            <span>什么经常变化？</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>选择设计</strong>
                            <span>Strategy / Factory / Adapter...</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>保持简单</strong>
                            <span>不要过度设计</span>
                        </div>
                    `,
                    "模式应该解决问题，而不是制造问题。"
                ),

                thinking(
                    "设计判断",
                    "如果使用一个设计模式后，代码从 30 行增加到 300 行，但未来并没有任何扩展需求，这个模式是否真的值得？"
                ),

                callout(
                    "高级开发者的能力",
                    "真正成熟的程序员不仅知道什么时候使用设计模式，也知道什么时候不要使用设计模式。"
                )
            ]
        ),


        /* =====================================================
           12-15
        ===================================================== */

        lesson(
            "py-12-15",
            "综合项目：设计一个可扩展的应用",
            "把职责分离、依赖注入和设计模式组合起来。",
            [

                paragraph(
                    "最后设计一个简单的订单系统。需求看起来很普通，但我们故意让它具有多个变化点。"
                ),

                concepts([
                    "不同支付方式",
                    "不同折扣策略",
                    "日志系统",
                    "订单数据保存",
                    "事件通知",
                    "未来可能更换数据库"
                ]),

                diagram(
                    "最终架构",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>OrderController</strong>
                            <span>接收操作</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>OrderService</strong>
                            <span>业务逻辑</span>
                        </div>

                        <div class="diagram-row">
                            <div class="diagram-box">
                                <strong>DiscountStrategy</strong>
                            </div>

                            <div class="diagram-box">
                                <strong>Payment</strong>
                            </div>

                            <div class="diagram-box">
                                <strong>Repository</strong>
                            </div>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>EventBus</strong>
                            <span>通知其他系统</span>
                        </div>
                    `,
                    "多个简单组件组合成一个完整应用。"
                ),

                code(
                    `class OrderService:

    def __init__(
        self,
        payment,
        discount,
        repository,
        event_bus
    ):
        self.payment = payment
        self.discount = discount
        self.repository = repository
        self.event_bus = event_bus

    def create_order(
        self,
        price
    ):

        final_price = (
            self.discount.calculate(
                price
            )
        )

        self.payment.pay(
            final_price
        )

        order = {
            "price": price,
            "total": final_price
        }

        self.repository.save(
            order
        )

        self.event_bus.publish(
            "order_created"
        )

        return order`,
                    "组合多个设计思想"
                ),

                paragraph(
                    "注意 OrderService 并不知道具体使用哪个支付系统，也不知道数据保存在哪里，更不知道事件最终由谁处理。"
                ),

                paragraph(
                    "这些东西都是通过依赖注入交给它的。这就是前面学习的职责分离、组合、Strategy、Repository、Observer 等思想真正组合起来的结果。"
                ),

                practice(
                    "练习 105：扩展订单系统",
                    "增加新的支付方式、新的折扣策略、新的存储方式和新的事件监听器，要求尽量不要修改 OrderService 本身。"
                ),

                thinking(
                    "最终设计问题",
                    "如果新增一种支付方式必须修改 OrderService，那么你的设计哪里还存在耦合？"
                )
            ]
        ),


        /* =====================================================
           12-16
        ===================================================== */

        lesson(
            "py-12-16",
            "本章总结：从写代码到设计系统",
            "建立面向工程的 Python 思维。",
            [

                paragraph(
                    "这一章真正学习的不是几个设计模式的名字，而是一种面对复杂程序的方法。"
                ),

                diagram(
                    "Python 工程思维",
                    `
                    <div class="object-diagram">
                        <div class="diagram-box">
                            <strong>函数</strong>
                            <span>解决局部问题</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>对象</strong>
                            <span>组织状态与行为</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>组合</strong>
                            <span>组织对象</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>模块</strong>
                            <span>组织代码</span>
                        </div>

                        <div class="diagram-arrow">↓</div>

                        <div class="diagram-box">
                            <strong>架构</strong>
                            <span>组织整个系统</span>
                        </div>
                    `,
                    "程序设计是逐层解决复杂度。"
                ),

                concepts([
                    "职责分离",
                    "高内聚",
                    "低耦合",
                    "组合优先",
                    "依赖注入",
                    "Strategy：封装可变化的算法",
                    "Factory：集中复杂对象创建",
                    "Adapter：统一不同接口",
                    "Facade：隐藏复杂子系统",
                    "Observer：通过事件进行松耦合通信",
                    "Singleton：控制唯一实例，但需要谨慎使用",
                    "MVC：应用职责分离",
                    "MVP：让界面与业务逻辑分离",
                    "Repository / Service：常见业务分层"
                ]),

                checklist([
                    "我知道为什么程序需要架构",
                    "我理解职责分离",
                    "我理解高内聚和低耦合",
                    "我理解组合优先的思想",
                    "我理解依赖注入",
                    "我知道 Strategy 解决什么问题",
                    "我知道 Factory 解决什么问题",
                    "我知道 Adapter 解决什么问题",
                    "我知道 Facade 解决什么问题",
                    "我理解 Observer / Event 的思想",
                    "我理解 Singleton 的价值和风险",
                    "我理解 MVC",
                    "我理解 MVP",
                    "我能够设计简单的 Service / Repository",
                    "我知道设计模式不能为了使用而使用"
                ]),

                callout(
                    "本章最重要的一句话",
                    "好的代码不是把功能全部写出来，而是让未来的人——包括未来的自己——能够继续修改它。"
                ),

                paragraph(
                    "到这里，Python 基础已经开始从“学习语言”进入“学习如何使用语言构建软件”。接下来可以继续进入自动化、数据处理、Web、人工智能等真实应用领域。"
                )
            ]
        )
    ]
};


export { chapter12 };

export default chapter12;