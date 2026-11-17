/* =========================================================
   PYTHON QUICK START
   chapter09.js

   第九章：异常处理与调试

   核心思想：

   真正的程序一定会遇到错误。

   学习重点不是：

       “如何让程序永远不出错”

   而是：

       1. 看懂错误
       2. 找到错误
       3. 判断错误属于什么类型
       4. 处理可以预期的问题
       5. 让真正的问题暴露出来
       6. 用工具系统地定位 Bug
       7. 让程序更加可靠

   本章覆盖：

       SyntaxError
       Exception
       traceback
       try / except
       else / finally
       raise
       自定义异常
       assert
       logging
       调试方法
       pdb
       unittest
       Bug 类型
       防御式编程
       综合 Debug 项目
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


const chapter09 = {

    id: "chapter-09",

    number: "09",

    title: "异常处理与调试",

    englishTitle: "Exceptions & Debugging",

    description:
        "真正的程序一定会出错。学习理解错误、阅读 traceback、处理异常、主动验证程序状态、记录运行信息以及系统地定位 Bug，让 Python 程序从“能运行”走向“可靠”。",


    sections: [


        /* =====================================================
           01
        ===================================================== */

        lesson(
            "py-09-01",

            "程序为什么会出错？",

            "先建立正确的错误观：Bug 不是异常情况，而是软件开发的一部分。",

            [

                paragraph(
                    "初学编程时，人很容易把错误理解成“我写错了，所以程序坏了”。但在真实软件开发中，错误是程序开发过程中的正常组成部分。"
                ),

                paragraph(
                    "程序可能面对错误的输入、缺失的文件、网络问题、数据格式变化、第三方服务异常，甚至开发者自己的逻辑错误。"
                ),

                diagram(
                    "程序运行中的错误来源",
                    `
                    <div class="error-source-diagram">

                        <div class="error-source">
                            <strong>代码错误</strong>
                            <span>Syntax / Logic</span>
                        </div>

                        <div class="error-source">
                            <strong>输入错误</strong>
                            <span>用户 / 数据</span>
                        </div>

                        <div class="error-source">
                            <strong>环境错误</strong>
                            <span>文件 / 权限 / 系统</span>
                        </div>

                        <div class="error-source">
                            <strong>外部错误</strong>
                            <span>网络 / 服务 / API</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "因此专业程序员并不是“不犯错误的人”，而是能够快速判断错误性质、定位原因，并决定应该修复、处理还是让错误继续暴露的人。"
                ),

                callout(
                    "一个重要转变",
                    "不要把“程序报错”理解成失败。报错本身就是程序提供的信息。真正的问题是：你有没有能力读懂它。"
                ),

                concepts([
                    "语法错误：代码无法被 Python 正确解析",
                    "运行时异常：程序运行过程中出现异常情况",
                    "逻辑错误：程序运行了，但结果不正确",
                    "环境错误：程序依赖的文件、权限或系统条件不存在",
                    "外部错误：网络、服务或其他程序出现问题"
                ]),

                practice(
                    "练习 63：错误分类",
                    "分别举一个 SyntaxError、运行时异常和逻辑错误的例子，并解释三者有什么不同。"
                )

            ]
        ),


        /* =====================================================
           02
        ===================================================== */

        lesson(
            "py-09-02",

            "认识 Python 错误",

            "学会区分 SyntaxError、Exception 和逻辑错误。",

            [

                paragraph(
                    "Python 中最先需要认识的是：不是所有错误都属于同一种类型。不同错误需要完全不同的处理方式。"
                ),

                code(
                    `# SyntaxError

if True
    print("hello")`,
                    "语法错误"
                ),

                code(
                    `# NameError

print(username)`,
                    "NameError"
                ),

                code(
                    `# TypeError

print("10" + 5)`,
                    "TypeError"
                ),

                code(
                    `# ValueError

number = int("hello")`,
                    "ValueError"
                ),

                code(
                    `# ZeroDivisionError

result = 10 / 0`,
                    "ZeroDivisionError"
                ),

                code(
                    `# IndexError

items = [1, 2, 3]

print(items[10])`,
                    "IndexError"
                ),

                code(
                    `# KeyError

user = {
    "name": "Alice"
}

print(user["age"])`,
                    "KeyError"
                ),

                diagram(
                    "常见异常",
                    `
                    <div class="exception-map">

                        <div class="exception-card">
                            <strong>ValueError</strong>
                            <span>值不符合要求</span>
                        </div>

                        <div class="exception-card">
                            <strong>TypeError</strong>
                            <span>类型使用错误</span>
                        </div>

                        <div class="exception-card">
                            <strong>IndexError</strong>
                            <span>索引不存在</span>
                        </div>

                        <div class="exception-card">
                            <strong>KeyError</strong>
                            <span>字典键不存在</span>
                        </div>

                        <div class="exception-card">
                            <strong>FileNotFoundError</strong>
                            <span>文件不存在</span>
                        </div>

                        <div class="exception-card">
                            <strong>ZeroDivisionError</strong>
                            <span>除数为零</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "不要只记异常名字。更重要的是看到异常后能够反问：程序当时在做什么？输入是什么？这个值为什么不符合预期？"
                ),

                practice(
                    "练习 64：错误侦探",
                    "运行几段故意出错的代码，为每段代码记录异常类型、错误位置以及你认为的根本原因。"
                ),

                practice(
                    "练习 65：制造不同异常",
                    "自己编写至少 5 段代码，分别制造 ValueError、TypeError、IndexError、KeyError 和 ZeroDivisionError。"
                )

            ]
        ),


        /* =====================================================
           03
        ===================================================== */

        lesson(
            "py-09-03",

            "如何阅读 traceback",

            "不要只看最后一行。学习从 traceback 反向定位问题。",

            [

                paragraph(
                    "第一次看到 traceback 时，它可能看起来像一大段难懂的信息。实际上 traceback 是 Python 给开发者提供的一条“错误路线图”。"
                ),

                code(
                    `def calculate():
    numbers = [10, 20, 30]
    return numbers[10]


def main():
    return calculate()


main()`,
                    "观察 traceback"
                ),

                paragraph(
                    "traceback 通常会告诉你：调用链经过了哪些函数、错误发生在哪个文件和哪一行，以及最后发生了什么异常。"
                ),

                diagram(
                    "Traceback 的阅读方向",
                    `
                    <div class="traceback-diagram">

                        <div class="traceback-step">
                            <strong>main()</strong>
                            <span>调用 calculate()</span>
                        </div>

                        <div class="traceback-arrow">↓</div>

                        <div class="traceback-step">
                            <strong>calculate()</strong>
                            <span>访问列表</span>
                        </div>

                        <div class="traceback-arrow">↓</div>

                        <div class="traceback-step highlight">
                            <strong>numbers[10]</strong>
                            <span>真正出错的位置</span>
                        </div>

                        <div class="traceback-arrow">↓</div>

                        <div class="traceback-error">
                            <strong>IndexError</strong>
                            <span>最终异常类型</span>
                        </div>

                    </div>
                    `
                ),

                callout(
                    "阅读 traceback 的方法",
                    "先找到最后一行的异常类型，再向上看最后一个属于你自己代码的文件和行号，最后沿着调用链理解程序为什么走到了那里。"
                ),

                concepts([
                    "异常类型",
                    "异常消息",
                    "文件名",
                    "行号",
                    "函数调用链",
                    "最后一个属于自己代码的位置"
                ]),

                practice(
                    "练习 66：Traceback 阅读器",
                    "运行一个包含三层函数调用的错误程序，不修改代码，先只根据 traceback 找出最终错误发生在哪一行。"
                ),

                thinking(
                    "为什么不要直接看第一行？",
                    "调用链可能非常长。真正需要重点关注的是异常最终发生的位置，以及程序为什么会走到那里。"
                )

            ]
        ),


        /* =====================================================
           04
        ===================================================== */

        lesson(
            "py-09-04",

            "try / except",

            "让程序面对可以预期的异常。",

            [

                paragraph(
                    "如果一个错误属于程序运行过程中可以预期的情况，那么我们可以使用 try / except 对它进行处理。"
                ),

                code(
                    `try:
    number = int("hello")
except ValueError:
    print("这不是一个有效的数字。")`,
                    "捕获 ValueError"
                ),

                paragraph(
                    "异常处理最重要的原则之一是：**捕获你真正知道如何处理的异常。**"
                ),

                code(
                    `try:
    number = int("hello")
except ValueError:
    print("输入格式不正确。")`,
                    "推荐：明确捕获"
                ),

                code(
                    `try:
    number = int("hello")
except Exception:
    print("发生错误。")`,
                    "不要滥用 Exception"
                ),

                diagram(
                    "try / except",
                    `
                    <div class="try-except-diagram">

                        <div class="try-block">
                            <strong>try</strong>
                            <span>尝试执行可能失败的代码</span>
                        </div>

                        <div class="try-arrow">↓</div>

                        <div class="try-branch">

                            <div class="try-success">
                                <strong>没有异常</strong>
                                <span>继续执行</span>
                            </div>

                            <div class="try-error">
                                <strong>发生异常</strong>
                                <span>进入 except</span>
                            </div>

                        </div>

                    </div>
                    `
                ),

                practice(
                    "练习 67：安全转换",
                    "编写一个函数，将字符串转换成整数。如果转换失败，返回 None。"
                ),

                practice(
                    "练习 68：安全除法",
                    "编写一个函数执行除法。当除数为 0 时，返回一个合理结果或提示。"
                ),

                thinking(
                    "为什么不应该捕获所有异常？",
                    "如果把所有错误都吞掉，真正的程序 Bug 也会被隐藏。异常处理应该解决“已知且可处理的问题”，而不是让所有错误消失。"
                )

            ]
        ),


        /* =====================================================
           05
        ===================================================== */

        lesson(
            "py-09-05",

            "else 与 finally",

            "理解完整的异常处理结构。",

            [

                paragraph(
                    "try / except 还可以配合 else 和 finally。它们分别表达不同的程序语义。"
                ),

                code(
                    `try:
    number = int("123")

except ValueError:
    print("转换失败")

else:
    print("转换成功：", number)`,
                    "else"
                ),

                code(
                    `file = None

try:
    file = open(
        "data.txt",
        encoding="utf-8"
    )

    content = file.read()

except FileNotFoundError:
    print("文件不存在")

finally:
    if file is not None:
        file.close()`,
                    "finally"
                ),

                diagram(
                    "完整异常流程",
                    `
                    <div class="exception-flow">

                        <div class="exception-flow-block">
                            <strong>try</strong>
                            <span>执行可能失败的代码</span>
                        </div>

                        <div class="exception-flow-arrow">↓</div>

                        <div class="exception-flow-branches">

                            <div>
                                <strong>异常</strong>
                                <span>except</span>
                            </div>

                            <div>
                                <strong>成功</strong>
                                <span>else</span>
                            </div>

                        </div>

                        <div class="exception-flow-arrow">↓</div>

                        <div class="exception-flow-finally">
                            <strong>finally</strong>
                            <span>无论如何都执行</span>
                        </div>

                    </div>
                    `
                ),

                concepts([
                    "try：尝试执行",
                    "except：处理指定异常",
                    "else：没有异常时执行",
                    "finally：无论是否异常都执行"
                ]),

                paragraph(
                    "实际开发中，with 通常比手动 finally 关闭文件更清晰。但理解 finally 依然非常重要，因为它体现了资源清理的思想。"
                ),

                practice(
                    "练习 69：文件处理",
                    "设计一个程序读取文件：文件存在时处理内容，不存在时提示错误，并思考哪些清理工作应该放在 finally。"
                )

            ]
        ),


        /* =====================================================
           06
        ===================================================== */

        lesson(
            "py-09-06",

            "raise：主动让程序报告错误",

            "异常不只是 Python 自动产生的，也可以由程序主动抛出。",

            [

                paragraph(
                    "有时候程序虽然没有发生 Python 层面的错误，但输入的数据已经不符合业务规则。这时候程序可以主动 raise 一个异常。"
                ),

                code(
                    `def set_age(age):

    if age < 0:
        raise ValueError(
            "年龄不能小于 0"
        )

    return age`,
                    "主动抛出异常"
                ),

                code(
                    `def divide(a, b):

    if b == 0:
        raise ValueError(
            "除数不能为 0"
        )

    return a / b`,
                    "验证参数"
                ),

                paragraph(
                    "raise 的意义不是“让程序崩溃”，而是明确告诉调用者：当前输入或者状态不符合函数要求。调用者可以决定是否捕获这个异常。"
                ),

                diagram(
                    "异常的传播",
                    `
                    <div class="raise-flow">

                        <div class="raise-function">
                            <strong>函数</strong>
                            <span>发现无效状态</span>
                        </div>

                        <div class="raise-arrow">↓ raise</div>

                        <div class="raise-error">
                            <strong>ValueError</strong>
                            <span>携带错误信息</span>
                        </div>

                        <div class="raise-arrow">↓</div>

                        <div class="raise-caller">
                            <strong>调用者</strong>
                            <span>决定处理还是继续抛出</span>
                        </div>

                    </div>
                    `
                ),

                practice(
                    "练习 70：数据验证",
                    "为一个成绩函数添加验证：成绩必须在 0～100 之间，否则 raise ValueError。"
                ),

                practice(
                    "练习 71：参数验证",
                    "编写一个函数创建用户，要求用户名不能为空，年龄不能为负数。"
                ),

                thinking(
                    "为什么函数应该主动验证参数？",
                    "越靠近错误发生的位置发现问题，越容易定位。如果一个无效数据一路传到程序深处才出错，调试成本会大很多。"
                )

            ]
        ),


        /* =====================================================
           07
        ===================================================== */

        lesson(
            "py-09-07",

            "自定义异常",

            "当项目变大后，让错误拥有清晰的业务语义。",

            [

                paragraph(
                    "Python 提供了很多内置异常，但真实项目有时需要表达更具体的业务错误。例如库存不足、账户余额不足、课程不存在等。"
                ),

                code(
                    `class InsufficientStockError(Exception):
    pass


def buy(stock, quantity):

    if quantity > stock:
        raise InsufficientStockError(
            "库存不足"
        )

    return stock - quantity


print(buy(10, 3))`,
                    "自定义异常"
                ),

                code(
                    `class InvalidScoreError(ValueError):
    pass


def set_score(score):

    if not 0 <= score <= 100:
        raise InvalidScoreError(
            "成绩必须在 0 到 100 之间"
        )

    return score`,
                    "继承已有异常"
                ),

                paragraph(
                    "自定义异常的意义是让调用者可以根据业务语义进行处理，而不是所有问题都只能通过一个模糊的 ValueError 表达。"
                ),

                diagram(
                    "异常层次",
                    `
                    <div class="custom-exception-tree">

                        <div class="exception-root">
                            Exception
                        </div>

                        <div class="exception-tree-line">↓</div>

                        <div class="exception-middle">
                            ValueError
                        </div>

                        <div class="exception-tree-line">↓</div>

                        <div class="exception-custom">
                            InvalidScoreError
                        </div>

                    </div>
                    `
                ),

                practice(
                    "练习 72：库存异常",
                    "创建 InsufficientStockError，并让购买函数在库存不足时抛出它。"
                ),

                practice(
                    "练习 73：用户异常",
                    "为用户注册系统创建一个 InvalidUsernameError。"
                )

            ]
        ),


        /* =====================================================
           08
        ===================================================== */

        lesson(
            "py-09-08",

            "assert：验证程序自己的假设",

            "区分用户输入验证和开发阶段的程序内部检查。",

            [

                paragraph(
                    "assert 用于表达程序开发者认为应该成立的条件。如果条件不成立，Python 会抛出 AssertionError。"
                ),

                code(
                    `def average(numbers):

    assert len(numbers) > 0

    return sum(numbers) / len(numbers)


print(average([10, 20, 30]))`,
                    "assert"
                ),

                paragraph(
                    "assert 和 raise 并不是完全相同的用途。raise 更适合明确处理程序运行中的业务条件；assert 更适合表达开发者对程序内部状态的假设。"
                ),

                code(
                    `def get_first(items):

    assert items, "列表不能为空"

    return items[0]`,
                    "检查内部假设"
                ),

                diagram(
                    "raise 与 assert",
                    `
                    <div class="assert-compare">

                        <div class="assert-card">
                            <strong>raise</strong>
                            <span>业务条件 / 输入验证</span>
                            <small>“这个输入不合法”</small>
                        </div>

                        <div class="assert-card highlight">
                            <strong>assert</strong>
                            <span>开发者假设</span>
                            <small>“这里按设计应该成立”</small>
                        </div>

                    </div>
                    `
                ),

                note(
                    "不要把 assert 当作所有输入验证工具",
                    "用户输入、文件数据和外部数据通常应该使用明确的验证逻辑与 raise，而不是依赖 assert。"
                ),

                practice(
                    "练习 74：程序状态",
                    "为一个排序函数增加内部条件检查，确保输入满足你设计的前提。"
                )

            ]
        ),


        /* =====================================================
           09
        ===================================================== */

        lesson(
            "py-09-09",

            "调试的核心：不是乱改代码",

            "建立真正的 Debug 方法。",

            [

                paragraph(
                    "很多初学者遇到 Bug 后会开始不断修改代码，希望“改到它不报错为止”。这种方法通常会让问题越来越复杂。"
                ),

                paragraph(
                    "调试应该是一个有步骤的调查过程。"
                ),

                diagram(
                    "Debug 工作流",
                    `
                    <div class="debug-workflow">

                        <div class="debug-step">
                            <strong>1</strong>
                            <span>复现</span>
                            <small>让 Bug 稳定出现</small>
                        </div>

                        <div class="debug-arrow">→</div>

                        <div class="debug-step">
                            <strong>2</strong>
                            <span>观察</span>
                            <small>输入是什么？</small>
                        </div>

                        <div class="debug-arrow">→</div>

                        <div class="debug-step">
                            <strong>3</strong>
                            <span>缩小</span>
                            <small>问题在哪一段？</small>
                        </div>

                        <div class="debug-arrow">→</div>

                        <div class="debug-step">
                            <strong>4</strong>
                            <span>验证</span>
                            <small>假设是否成立？</small>
                        </div>

                        <div class="debug-arrow">→</div>

                        <div class="debug-step highlight">
                            <strong>5</strong>
                            <span>修复</span>
                            <small>改最少的代码</small>
                        </div>

                        <div class="debug-arrow">→</div>

                        <div class="debug-step">
                            <strong>6</strong>
                            <span>回归</span>
                            <small>确认没有引入新问题</small>
                        </div>

                    </div>
                    `
                ),

                concepts([
                    "先复现问题",
                    "记录触发条件",
                    "确认输入",
                    "检查中间变量",
                    "缩小问题范围",
                    "提出假设",
                    "验证假设",
                    "修改最少的代码",
                    "重新运行",
                    "检查是否产生新的问题"
                ]),

                callout(
                    "Debug 的本质",
                    "调试不是猜，而是不断减少未知信息。"
                ),

                practice(
                    "练习 75：Bug 调查",
                    "给你一段错误程序，不允许立即修改代码。第一步只允许你打印或观察输入和中间结果，然后写出你认为最可能的问题。"
                ),

                thinking(
                    "为什么“改一行试试”不是好的调试方法？",
                    "因为你不知道问题为什么消失，也无法确认修改是否真正解决了根因。好的调试应该建立在证据上。"
                )

            ]
        ),


        /* =====================================================
           10
        ===================================================== */

        lesson(
            "py-09-10",

            "print Debugging：最简单但非常有效",

            "理解如何通过观察中间状态定位逻辑错误。",

            [

                paragraph(
                    "调试工具很多，但最简单的工具仍然非常有价值：观察程序在关键位置到底得到了什么。"
                ),

                code(
                    `def calculate_total(prices):

    total = 0

    for price in prices:

        print("当前价格：", price)
        print("当前 total：", total)

        total += price

    print("最终 total：", total)

    return total


calculate_total([10, 20, 30])`,
                    "观察中间状态"
                ),

                paragraph(
                    "如果程序最终结果不正确，可以观察每一步的数据变化，从而判断错误究竟发生在哪一次循环。"
                ),

                code(
                    `def find_max(numbers):

    current_max = 0

    for number in numbers:

        if number > current_max:
            current_max = number

    return current_max


print(find_max([-10, -5, -20]))`,
                    "一个逻辑 Bug"
                ),

                paragraph(
                    "上面的程序没有 SyntaxError，也不一定抛出异常，但结果可能错误。这就是逻辑 Bug。"
                ),

                practice(
                    "练习 76：修复最大值",
                    "找出上面 find_max() 在全部为负数时出现错误的原因，并修改它。"
                ),

                practice(
                    "练习 77：循环 Debug",
                    "写一个统计成绩的程序，故意加入一个错误，然后通过打印中间变量找到问题。"
                )

            ]
        ),


        /* =====================================================
           11
        ===================================================== */

        lesson(
            "py-09-11",

            "断点与 pdb",

            "从 print 调试进入真正的交互式调试。",

            [

                paragraph(
                    "当程序很小时，print 已经足够。但当程序有几十个函数、多个模块和复杂的数据流时，到处写 print 会变得非常混乱。"
                ),

                paragraph(
                    "Python 标准库提供了 pdb，这是一个交互式调试器。它可以让程序在指定位置暂停，然后检查变量、继续执行或者逐步运行。"
                ),

                code(
                    `import pdb


def calculate(a, b):

    result = a + b

    pdb.set_trace()

    return result


print(calculate(10, 20))`,
                    "进入 pdb"
                ),

                concepts([
                    "断点：让程序暂停在指定位置",
                    "查看变量：检查当前状态",
                    "单步执行：一步一步观察程序",
                    "继续运行：离开当前断点继续执行",
                    "调试器：帮助开发者观察程序运行过程"
                ]),

                diagram(
                    "调试器的视角",
                    `
                    <div class="debugger-view">

                        <div class="debugger-code">
                            <div>line 10</div>
                            <div>line 11</div>
                            <div class="current-line">→ line 12</div>
                            <div>line 13</div>
                            <div>line 14</div>
                        </div>

                        <div class="debugger-panel">
                            <strong>Variables</strong>
                            <span>a = 10</span>
                            <span>b = 20</span>
                            <span>result = 30</span>
                        </div>

                    </div>
                    `
                ),

                note(
                    "IDE 中的调试器",
                    "PyCharm、VS Code 等开发工具通常提供图形化断点和变量查看界面。它们本质上是在帮助你完成与 pdb 类似的调试工作。"
                ),

                practice(
                    "练习 78：断点调试",
                    "给一个包含多个函数调用的程序设置断点，观察变量在不同函数中的变化。"
                ),

                thinking(
                    "为什么断点比大量 print 更好？",
                    "因为断点允许你在程序运行过程中动态观察状态，而不需要为了调试永久修改代码。"
                )

            ]
        ),


        /* =====================================================
           12
        ===================================================== */

        lesson(
            "py-09-12",

            "logging：让程序自己留下线索",

            "从开发阶段 Debug 进入真实程序运行时的日志系统。",

            [

                paragraph(
                    "print 非常适合临时调试，但正式程序通常需要 logging。日志可以记录程序什么时候运行、做了什么、出现了什么问题。"
                ),

                code(
                    `import logging

logging.basicConfig(
    level=logging.INFO
)

logging.info("程序开始")

value = 20

logging.info(
    "当前 value = %s",
    value
)`,
                    "基础 logging"
                ),

                code(
                    `import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s "
           "%(levelname)s "
           "%(message)s"
)

logging.info("开始处理数据")
logging.warning("发现缺失数据")
logging.error("读取文件失败")`,
                    "不同日志级别"
                ),

                diagram(
                    "日志级别",
                    `
                    <div class="logging-levels">

                        <div class="log-level">
                            <strong>DEBUG</strong>
                            <span>详细调试信息</span>
                        </div>

                        <div class="log-level">
                            <strong>INFO</strong>
                            <span>正常运行信息</span>
                        </div>

                        <div class="log-level">
                            <strong>WARNING</strong>
                            <span>值得注意的问题</span>
                        </div>

                        <div class="log-level">
                            <strong>ERROR</strong>
                            <span>发生错误</span>
                        </div>

                        <div class="log-level">
                            <strong>CRITICAL</strong>
                            <span>严重问题</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "日志和异常处理是两件不同的事情。异常描述“程序发生了什么问题”，日志则帮助开发者记录“程序运行过程中发生了什么”。两者经常一起使用。"
                ),

                practice(
                    "练习 79：程序日志",
                    "给一个文件处理程序增加 logging，记录开始处理、处理成功、文件不存在以及异常情况。"
                ),

                practice(
                    "练习 80：日志分析",
                    "读取一份日志文件，统计 INFO、WARNING 和 ERROR 分别出现了多少次。"
                )

            ]
        ),


        /* =====================================================
           13
        ===================================================== */

        lesson(
            "py-09-13",

            "常见 Bug：程序不报错也可能是错的",

            "学习识别真正危险的逻辑错误。",

            [

                paragraph(
                    "异常并不是唯一的问题。很多 Bug 不会产生任何 traceback。程序可以正常运行，却得到错误结果。"
                ),

                code(
                    `# Bug 1：边界条件

numbers = [10, 20, 30]

for i in range(len(numbers) - 1):
    print(numbers[i])`,
                    "边界错误"
                ),

                code(
                    `# Bug 2：可变对象

items = []

result = items

result.append("Python")

print(items)`,
                    "对象引用问题"
                ),

                code(
                    `# Bug 3：默认值理解错误

def add_item(item, items=[]):

    items.append(item)

    return items


print(add_item("A"))
print(add_item("B"))`,
                    "可变默认参数"
                ),

                code(
                    `# Bug 4：浮点数比较

value = 0.1 + 0.2

print(value == 0.3)`,
                    "浮点数问题"
                ),

                diagram(
                    "Bug 的冰山",
                    `
                    <div class="bug-iceberg">

                        <div class="bug-visible">
                            <strong>看到的</strong>
                            <span>Traceback / 报错</span>
                        </div>

                        <div class="bug-hidden">
                            <strong>更大的部分</strong>
                            <span>错误结果 / 边界条件 / 数据假设 / 状态问题</span>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "真正困难的 Bug 往往不是“程序崩溃”，而是程序悄悄产生错误结果。"
                ),

                practice(
                    "练习 81：Bug 修复",
                    "找出上面 4 个程序中的问题，并分别解释为什么程序可能不符合预期。"
                ),

                practice(
                    "练习 82：边界条件",
                    "设计一个函数，分别测试空列表、一个元素、两个元素和大量元素，寻找边界问题。"
                )

            ]
        ),


        /* =====================================================
           14
        ===================================================== */

        lesson(
            "py-09-14",

            "测试：如何防止 Bug 再回来？",

            "从“修复 Bug”进一步走向“验证修复”。",

            [

                paragraph(
                    "如果你修复了一个 Bug，却没有测试，很可能过几天修改另一部分代码时，这个 Bug 又重新出现。"
                ),

                paragraph(
                    "测试的核心思想是：给程序准备明确的输入，并检查它是否产生预期结果。"
                ),

                code(
                    `def add(a, b):
    return a + b


assert add(2, 3) == 5
assert add(-1, 1) == 0`,
                    "最简单的测试"
                ),

                code(
                    `import unittest


def add(a, b):
    return a + b


class TestAdd(unittest.TestCase):

    def test_positive(self):
        self.assertEqual(
            add(2, 3),
            5
        )

    def test_negative(self):
        self.assertEqual(
            add(-1, 1),
            0
        )


if __name__ == "__main__":
    unittest.main()`,
                    "unittest"
                ),

                diagram(
                    "测试与 Debug",
                    `
                    <div class="testing-debug-loop">

                        <div class="testing-step">
                            <strong>发现 Bug</strong>
                        </div>

                        <div class="testing-arrow">→</div>

                        <div class="testing-step">
                            <strong>修复</strong>
                        </div>

                        <div class="testing-arrow">→</div>

                        <div class="testing-step highlight">
                            <strong>加入测试</strong>
                        </div>

                        <div class="testing-arrow">→</div>

                        <div class="testing-step">
                            <strong>以后自动验证</strong>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "一个非常重要的开发习惯是：修复一个容易复发的 Bug 后，考虑为它增加一个测试。"
                ),

                practice(
                    "练习 83：测试计算函数",
                    "为 add、subtract、multiply、divide 编写 unittest。"
                ),

                practice(
                    "练习 84：测试边界条件",
                    "为一个计算平均值的函数测试空列表、单元素列表和正常列表。"
                ),

                thinking(
                    "为什么测试不是“写完程序之后才做”？",
                    "测试不仅用于最终检查，也可以帮助开发者设计更清晰的函数接口和行为。"
                )

            ]
        ),


        /* =====================================================
           15
        ===================================================== */

        lesson(
            "py-09-15",

            "防御式编程：让错误尽早暴露",

            "建立更加可靠的程序设计习惯。",

            [

                paragraph(
                    "所谓防御式编程，不是让程序到处写 try/except，而是主动考虑：哪些输入可能不合法？哪些状态不应该出现？哪些外部条件可能失败？"
                ),

                diagram(
                    "错误越早发现越容易处理",
                    `
                    <div class="defensive-programming">

                        <div class="defensive-stage">
                            <strong>输入边界</strong>
                            <span>立即验证</span>
                        </div>

                        <div class="defensive-arrow">→</div>

                        <div class="defensive-stage">
                            <strong>函数边界</strong>
                            <span>检查参数</span>
                        </div>

                        <div class="defensive-arrow">→</div>

                        <div class="defensive-stage">
                            <strong>数据处理</strong>
                            <span>保持假设成立</span>
                        </div>

                        <div class="defensive-arrow">→</div>

                        <div class="defensive-stage highlight">
                            <strong>输出</strong>
                            <span>验证结果</span>
                        </div>

                    </div>
                    `
                ),

                code(
                    `def calculate_average(scores):

    if not scores:
        raise ValueError(
            "scores 不能为空"
        )

    for score in scores:

        if not 0 <= score <= 100:
            raise ValueError(
                "成绩必须在 0～100 之间"
            )

    return sum(scores) / len(scores)`,
                    "防御式设计"
                ),

                concepts([
                    "尽早验证输入",
                    "明确函数前置条件",
                    "不要让无效数据继续传播",
                    "错误信息应该清晰",
                    "只处理真正知道如何处理的异常",
                    "关键逻辑应该有测试"
                ]),

                practice(
                    "练习 85：成绩系统",
                    "完善一个成绩分析函数：检查列表不能为空、成绩必须在 0～100、输入必须是数字，并为这些条件编写测试。"
                )

            ]
        ),


        /* =====================================================
           16
        ===================================================== */

        lesson(
            "py-09-16",

            "综合 Debug 项目：修复一个真正有问题的程序",

            "把 traceback、异常、日志、测试和调试思维全部组合起来。",

            [

                paragraph(
                    "最后不再学习新的语法，而是做一次真正的 Debug。下面的程序故意包含多个不同类型的问题。"
                ),

                code(
                    `import json


def load_scores(path):

    with open(path) as file:
        data = json.load(file)

    return data["scores"]


def average(scores):

    total = 0

    for score in scores:
        total += score

    return total / len(scores)


def main():

    scores = load_scores(
        "scores.json"
    )

    print(
        "平均分：",
        average(scores)
    )


main()`,
                    "Bug 程序"
                ),

                paragraph(
                    "现在不要立即修改。先问自己：这个程序有哪些潜在问题？"
                ),

                concepts([
                    "文件可能不存在",
                    "JSON 可能格式错误",
                    "scores 键可能不存在",
                    "scores 可能不是列表",
                    "scores 可能为空",
                    "成绩可能超出范围",
                    "数据类型可能不正确",
                    "程序没有日志",
                    "没有测试"
                ]),

                diagram(
                    "Debug 调查路线",
                    `
                    <div class="debug-investigation">

                        <div class="investigation-step">
                            <strong>① 复现</strong>
                            <span>准备输入数据</span>
                        </div>

                        <div class="investigation-step">
                            <strong>② 阅读 traceback</strong>
                            <span>确定第一处异常</span>
                        </div>

                        <div class="investigation-step">
                            <strong>③ 检查输入</strong>
                            <span>JSON 内容是否符合预期</span>
                        </div>

                        <div class="investigation-step">
                            <strong>④ 修复边界</strong>
                            <span>处理空数据和非法成绩</span>
                        </div>

                        <div class="investigation-step">
                            <strong>⑤ 加日志</strong>
                            <span>记录关键过程</span>
                        </div>

                        <div class="investigation-step">
                            <strong>⑥ 写测试</strong>
                            <span>防止 Bug 回归</span>
                        </div>

                    </div>
                    `
                ),

                practice(
                    "练习 86：修复文件错误",
                    "让程序在 scores.json 不存在时给出清晰提示，而不是直接产生难以理解的 traceback。"
                ),

                practice(
                    "练习 87：修复数据错误",
                    "验证 scores 是否存在、是否为空，以及每个成绩是否处于 0～100。"
                ),

                practice(
                    "练习 88：增加自定义异常",
                    "创建 InvalidScoreError，让非法成绩拥有明确的异常类型。"
                ),

                practice(
                    "练习 89：增加 logging",
                    "记录程序开始读取文件、读取成功、开始计算以及出现错误等信息。"
                ),

                practice(
                    "练习 90：增加 unittest",
                    "为 average() 编写测试，包括正常数据、空列表以及非法成绩。"
                ),

                practice(
                    "练习 91：完整重构",
                    "将程序修改成一个更加可靠的成绩分析器，并保持 main() 简洁。"
                ),

                callout(
                    "真正的 Debug 能力",
                    "当你能够面对一个陌生程序，不慌张地复现问题、阅读 traceback、提出假设、验证假设、修改代码、增加测试，你就开始真正拥有 Debug 能力了。"
                ),

                checklist([
                    "我能区分 SyntaxError、运行时异常和逻辑错误",
                    "我能阅读 traceback",
                    "我知道如何使用 try / except",
                    "我理解 else 和 finally",
                    "我会使用 raise 主动报告错误",
                    "我知道什么时候可以使用自定义异常",
                    "我理解 assert 的用途",
                    "我知道 print 可以帮助观察程序状态",
                    "我知道如何使用 pdb / IDE 调试器",
                    "我知道 logging 和 print 的区别",
                    "我能识别常见逻辑 Bug",
                    "我知道测试为什么重要",
                    "我理解防御式编程",
                    "我能够系统地进行 Debug",
                    "我能够修复一个包含多个问题的真实程序"
                ]),

                note(
                    "下一章",
                    "下一章进入类与面向对象。你会开始学习如何把数据和操作这些数据的行为组织成自己的对象，从而构建更复杂的 Python 程序。"
                )

            ]
        )

    ]
};


export { chapter09 };

export default chapter09;