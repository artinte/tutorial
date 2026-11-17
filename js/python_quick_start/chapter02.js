/* =========================================================
   PYTHON QUICK START
   chapter-02.js

   第 02 章：让程序做决定和重复工作
   ---------------------------------------------------------
   课程定位：

   第一章解决的是：

       Python 是什么？
       变量是什么？
       数据是什么？
       如何输入和输出？

   第二章开始真正理解：

       程序为什么会走不同的路线？
       程序为什么能够重复执行？
       程序什么时候应该停止？
       如何控制程序执行流程？

   本章重点：

       1. 比较运算
       2. 布尔值
       3. and / or / not
       4. if / elif / else
       5. for
       6. range()
       7. while
       8. break
       9. continue
       10. 循环 else
       11. 嵌套循环
       12. 综合控制流

   参考方向：

       - Python 官方文档
       - Python Tutorial / Control Flow
       - Python 官方 Built-in Types
       - Python Crash Course
       - Automate the Boring Stuff with Python
       - Effective Python

   注意：

       本文件为 Tutorial Studio 自有课程结构，
       不复制上述书籍原文。
========================================================= */


/* =========================================================
   HELPERS
   ========================================================= */

const lesson = (
    id,
    title,
    description,
    content = []
) => ({
    id,
    title,
    description,
    content
});


const paragraph = text => ({
    type: "paragraph",
    text
});


const code = (
    codeText,
    title = "示例代码",
    language = "python"
) => ({
    type: "code",
    language,
    title,
    code: codeText
});


const practice = (
    title,
    description,
    starterCode = ""
) => ({
    type: "practice",
    title,
    description,
    starterCode
});


const thinking = (
    title,
    description
) => ({
    type: "thinking",
    title,
    description
});


const note = (
    title,
    description
) => ({
    type: "note",
    title,
    description
});


const callout = (
    title,
    description
) => ({
    type: "callout",
    title,
    description
});


const concepts = (
    items
) => ({
    type: "concepts",
    items
});


const checklist = (
    items
) => ({
    type: "checklist",
    items
});


/* =========================================================
   CHAPTER 02
   控制流程
========================================================= */

export const chapter02 = {

    id: "chapter-02",

    number: "02",

    title: "让程序做决定和重复工作",

    englishTitle: "Control Flow",

    description:
        "学习 if、elif、else、for、while、break、continue，并真正理解 Python 程序是如何决定下一步做什么、如何重复执行以及如何提前结束的。for 和 while 不人为拆成两个章节，而是作为一个完整的控制流体系学习。",

    sections: [


        /* =================================================
           02-01
           比较与布尔逻辑
        ================================================= */

        {
            id: "py-02-01",

            title: "比较与布尔逻辑",

            description:
                "理解 True、False、比较运算符以及 and、or、not，为后面的 if 和循环打基础。你会学习如何让 Python 判断条件、组合多个条件，并理解短路求值、链式比较和真值测试。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "程序和人一样，经常需要做判断。例如：用户是否已经登录？年龄是否达到要求？成绩是否及格？库存是否还有商品？一个程序真正开始变得“聪明”，往往就是从能够根据条件做出不同选择开始的。"
                },


                {
                    type: "paragraph",

                    text:
                        "在 Python 中，这类判断最终经常会得到两个结果之一：True 或 False。True 表示条件成立，False 表示条件不成立。它们就是 Python 中最基本的布尔值。"
                },


                {
                    type: "heading",

                    text:
                        "什么是 True 和 False？"
                },


                {
                    type: "paragraph",

                    text:
                        "布尔值是 Python 中非常重要的一种数据类型，英文叫 bool。它只有两个基本值：True 和 False。注意这里的 T 和 F 必须大写，因为 True 和 False 是 Python 中专门表示布尔值的关键字。"
                },


                {
                    type: "animation",

                    title:
                        "一个条件是怎样变成 True 或 False 的？",

                    duration: 2600,

                    html:
                        `
                <div class="boolean-animation">

                    <div class="boolean-value boolean-left">
                        age
                    </div>

                    <div class="boolean-operator">
                        >=
                    </div>

                    <div class="boolean-value boolean-number">
                        18
                    </div>

                    <div class="boolean-equals">
                        →
                    </div>

                    <div class="boolean-result">
                        True
                    </div>

                </div>
                `,

                    css:
                        `
                .boolean-animation {
                    box-sizing: border-box;
                    min-height: 180px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .boolean-value,
                .boolean-result {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 72px;
                    height: 54px;
                    padding: 0 14px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #263544;
                    font-size: 18px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .boolean-operator {
                    color: #3776AB;
                    font-size: 20px;
                    font-weight: 700;
                    opacity: 0;
                }

                .boolean-equals {
                    color: #9aa8b5;
                    font-size: 22px;
                    opacity: 0;
                }

                .boolean-result {
                    min-width: 82px;
                    color: #16834b;
                    border-color: #cfe8da;
                    background: #f4fbf7;
                }
                `,

                    js:
                        `
                const left =
                    animationRoot.querySelector(
                        ".boolean-left"
                    );

                const operator =
                    animationRoot.querySelector(
                        ".boolean-operator"
                    );

                const number =
                    animationRoot.querySelector(
                        ".boolean-number"
                    );

                const arrow =
                    animationRoot.querySelector(
                        ".boolean-equals"
                    );

                const result =
                    animationRoot.querySelector(
                        ".boolean-result"
                    );


                setTimeout(() => {

                    left.style.opacity = "1";
                    left.style.transform =
                        "translateY(0)";
                    left.style.transition =
                        "all 300ms ease";

                }, 300);


                setTimeout(() => {

                    operator.style.opacity = "1";
                    operator.style.transition =
                        "opacity 250ms ease";

                }, 650);


                setTimeout(() => {

                    number.style.opacity = "1";
                    number.style.transform =
                        "translateY(0)";
                    number.style.transition =
                        "all 300ms ease";

                }, 900);


                setTimeout(() => {

                    arrow.style.opacity = "1";
                    arrow.style.transition =
                        "opacity 250ms ease";

                }, 1350);


                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "translateY(0)";
                    result.style.transition =
                        "all 300ms ease";

                }, 1700);
                `
                },


                {
                    type: "code",

                    language: "python",

                    title: "比较运算最基础的例子",

                    code:
                        `age = 20

print(age >= 18)
print(age == 20)
print(age != 30)
print(age < 10)`
                },


                {
                    type: "paragraph",

                    text:
                        "运行这些代码以后，每一个比较表达式都会得到一个布尔值。比如 age >= 18 的结果是 True，因为 20 确实大于等于 18；而 age < 10 的结果是 False，因为 20 并不小于 10。"
                },


                {
                    type: "concepts",

                    items: [

                        "True：表示真，条件成立",

                        "False：表示假，条件不成立",

                        "==：判断两个值是否相等",

                        "!=：判断两个值是否不相等",

                        ">：判断左边是否大于右边",

                        "<：判断左边是否小于右边",

                        ">=：判断左边是否大于或等于右边",

                        "<=：判断左边是否小于或等于右边"

                    ]
                },


                {
                    type: "heading",

                    text:
                        "= 和 == 千万不要混淆"
                },


                {
                    type: "paragraph",

                    text:
                        "这里有一个 Python 初学者非常容易犯的错误：把 = 和 == 搞混。它们看起来非常接近，但作用完全不同。一个是赋值，一个是比较。"
                },


                {
                    type: "animation",

                    title:
                        "赋值和比较到底有什么区别？",

                    duration: 3000,

                    html:
                        `
                <div class="assignment-animation">

                    <div class="assignment-row">

                        <div class="assignment-label">
                            x = 10
                        </div>

                        <div class="assignment-arrow">
                            →
                        </div>

                        <div class="assignment-box">
                            <span class="assignment-name">
                                x
                            </span>

                            <span class="assignment-value">
                                10
                            </span>
                        </div>

                    </div>


                    <div class="assignment-divider">
                    </div>


                    <div class="assignment-row">

                        <div class="assignment-label">
                            x == 10
                        </div>

                        <div class="assignment-arrow">
                            →
                        </div>

                        <div class="comparison-result">
                            True
                        </div>

                    </div>

                </div>
                `,

                    css:
                        `
                .assignment-animation {
                    box-sizing: border-box;
                    min-height: 220px;
                    padding: 24px 30px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 18px;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .assignment-row {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 14px;
                }

                .assignment-label {
                    min-width: 100px;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 16px;
                    font-weight: 600;
                    color: #263544;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .assignment-arrow {
                    color: #9aa8b5;
                    font-size: 20px;
                    opacity: 0;
                }

                .assignment-box {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 120px;
                    height: 48px;
                    padding: 0 14px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .assignment-name {
                    color: #3776AB;
                    font-weight: 700;
                }

                .assignment-value {
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                }

                .assignment-divider {
                    width: 160px;
                    height: 1px;
                    margin: 0 auto;
                    background: #e7edf2;
                    opacity: 0;
                }

                .comparison-result {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 76px;
                    height: 48px;
                    padding: 0 12px;
                    border: 1px solid #cfe8da;
                    border-radius: 8px;
                    background: #f4fbf7;
                    color: #16834b;
                    font-weight: 700;
                    opacity: 0;
                    transform: translateY(8px);
                }
                `,

                    js:
                        `
                const labels =
                    animationRoot.querySelectorAll(
                        ".assignment-label"
                    );

                const arrows =
                    animationRoot.querySelectorAll(
                        ".assignment-arrow"
                    );

                const box =
                    animationRoot.querySelector(
                        ".assignment-box"
                    );

                const divider =
                    animationRoot.querySelector(
                        ".assignment-divider"
                    );

                const result =
                    animationRoot.querySelector(
                        ".comparison-result"
                    );


                setTimeout(() => {

                    labels[0].style.opacity = "1";
                    labels[0].style.transform =
                        "translateY(0)";
                    labels[0].style.transition =
                        "all 300ms ease";

                }, 250);


                setTimeout(() => {

                    arrows[0].style.opacity = "1";
                    arrows[0].style.transition =
                        "opacity 250ms ease";

                }, 650);


                setTimeout(() => {

                    box.style.opacity = "1";
                    box.style.transform =
                        "translateY(0)";
                    box.style.transition =
                        "all 300ms ease";

                }, 900);


                setTimeout(() => {

                    divider.style.opacity = "1";
                    divider.style.transition =
                        "opacity 250ms ease";

                }, 1350);


                setTimeout(() => {

                    labels[1].style.opacity = "1";
                    labels[1].style.transform =
                        "translateY(0)";
                    labels[1].style.transition =
                        "all 300ms ease";

                }, 1550);


                setTimeout(() => {

                    arrows[1].style.opacity = "1";
                    arrows[1].style.transition =
                        "opacity 250ms ease";

                }, 1900);


                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "translateY(0)";
                    result.style.transition =
                        "all 300ms ease";

                }, 2200);
                `
                },


                {
                    type: "code",

                    language: "python",

                    title: "比较和赋值",

                    code:
                        `x = 10

print(x == 10)
print(x != 10)`
                },


                {
                    type: "callout",

                    title:
                        "一定要记住",

                    text:
                        "= 是赋值，== 是比较。x = 10 是把 10 放进变量 x；x == 10 是询问 x 里面是不是 10。"
                },


                {
                    type: "heading",

                    text:
                        "使用 and、or、not 组合条件"
                },


                {
                    type: "paragraph",

                    text:
                        "现实中的判断往往不会只有一个条件。例如，一个网站可能要求用户已经成年，并且已经购买了门票，才能进入某个活动。又或者，只要用户是管理员，或者拥有特殊权限，就允许执行某项操作。"
                },


                {
                    type: "animation",

                    title:
                        "多个条件是怎样组合起来的？",

                    duration: 3400,

                    html:
                        `
                <div class="logic-animation">

                    <div class="logic-title">
                        age >= 18
                    </div>

                    <div class="logic-operator">
                        AND
                    </div>

                    <div class="logic-title">
                        has_ticket
                    </div>

                    <div class="logic-arrow">
                        →
                    </div>

                    <div class="logic-result">
                        True
                    </div>

                </div>
                `,

                    css:
                        `
                .logic-animation {
                    box-sizing: border-box;
                    min-height: 180px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .logic-title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 105px;
                    height: 52px;
                    padding: 0 12px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 14px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .logic-operator {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 58px;
                    height: 34px;
                    border-radius: 6px;
                    background: #eef5fa;
                    color: #3776AB;
                    font-size: 12px;
                    font-weight: 700;
                    opacity: 0;
                }

                .logic-arrow {
                    color: #9aa8b5;
                    font-size: 20px;
                    opacity: 0;
                }

                .logic-result {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 76px;
                    height: 52px;
                    padding: 0 12px;
                    border: 1px solid #cfe8da;
                    border-radius: 8px;
                    background: #f4fbf7;
                    color: #16834b;
                    font-size: 16px;
                    font-weight: 700;
                    opacity: 0;
                    transform: translateY(8px);
                }
                `,

                    js:
                        `
                const conditions =
                    animationRoot.querySelectorAll(
                        ".logic-title"
                    );

                const operator =
                    animationRoot.querySelector(
                        ".logic-operator"
                    );

                const arrow =
                    animationRoot.querySelector(
                        ".logic-arrow"
                    );

                const result =
                    animationRoot.querySelector(
                        ".logic-result"
                    );


                setTimeout(() => {

                    conditions[0].style.opacity = "1";
                    conditions[0].style.transform =
                        "translateY(0)";
                    conditions[0].style.transition =
                        "all 300ms ease";

                }, 300);


                setTimeout(() => {

                    operator.style.opacity = "1";
                    operator.style.transition =
                        "opacity 250ms ease";

                }, 800);


                setTimeout(() => {

                    conditions[1].style.opacity = "1";
                    conditions[1].style.transform =
                        "translateY(0)";
                    conditions[1].style.transition =
                        "all 300ms ease";

                }, 1100);


                setTimeout(() => {

                    arrow.style.opacity = "1";
                    arrow.style.transition =
                        "opacity 250ms ease";

                }, 1700);


                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "translateY(0)";
                    result.style.transition =
                        "all 300ms ease";

                }, 2100);
                `
                },


                {
                    type: "code",

                    language: "python",

                    title: "and / or / not",

                    code:
                        `age = 20
has_ticket = True

print(age >= 18 and has_ticket)
print(age >= 18 or has_ticket)
print(not has_ticket)`
                },


                {
                    type: "concepts",

                    items: [

                        "A and B：A 和 B 都为真时，结果才为真",

                        "A or B：A 和 B 至少一个为真时，结果为真",

                        "not A：把 A 的真假结果反转",

                        "and 可以理解为“并且”",

                        "or 可以理解为“或者”",

                        "not 可以理解为“取反”"

                    ]
                },


                {
                    type: "heading",

                    text:
                        "什么是短路求值？"
                },


                {
                    type: "paragraph",

                    text:
                        "Python 中还有一个非常实用的特性，叫做短路求值。简单来说，如果 Python 已经能够确定整个表达式的结果，就不会继续计算后面的部分。"
                },


                {
                    type: "animation",

                    title:
                        "False and 后面的代码还会执行吗？",

                    duration: 3000,

                    html:
                        `
                <div class="short-circuit-animation">

                    <div class="short-value">
                        False
                    </div>

                    <div class="short-operator">
                        AND
                    </div>

                    <div class="short-function">
                        check()
                    </div>

                    <div class="short-arrow">
                        →
                    </div>

                    <div class="short-result">
                        False
                    </div>

                </div>
                `,

                    css:
                        `
                .short-circuit-animation {
                    box-sizing: border-box;
                    min-height: 180px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .short-value,
                .short-function,
                .short-result {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 76px;
                    height: 52px;
                    padding: 0 12px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 14px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .short-operator {
                    color: #3776AB;
                    font-size: 12px;
                    font-weight: 700;
                    opacity: 0;
                }

                .short-function {
                    min-width: 92px;
                    color: #9a5a00;
                    background: #fffaf0;
                    border-color: #f0dfb7;
                }

                .short-arrow {
                    color: #9aa8b5;
                    font-size: 20px;
                    opacity: 0;
                }

                .short-result {
                    color: #b34a4a;
                    background: #fff7f7;
                    border-color: #efd1d1;
                }
                `,

                    js:
                        `
                const value =
                    animationRoot.querySelector(
                        ".short-value"
                    );

                const operator =
                    animationRoot.querySelector(
                        ".short-operator"
                    );

                const functionBox =
                    animationRoot.querySelector(
                        ".short-function"
                    );

                const arrow =
                    animationRoot.querySelector(
                        ".short-arrow"
                    );

                const result =
                    animationRoot.querySelector(
                        ".short-result"
                    );


                setTimeout(() => {

                    value.style.opacity = "1";
                    value.style.transform =
                        "translateY(0)";
                    value.style.transition =
                        "all 300ms ease";

                }, 300);


                setTimeout(() => {

                    operator.style.opacity = "1";
                    operator.style.transition =
                        "opacity 250ms ease";

                }, 750);


                setTimeout(() => {

                    functionBox.style.opacity = "0.45";
                    functionBox.style.transform =
                        "translateY(0)";
                    functionBox.style.transition =
                        "all 300ms ease";

                }, 1100);


                setTimeout(() => {

                    arrow.style.opacity = "1";
                    arrow.style.transition =
                        "opacity 250ms ease";

                }, 1550);


                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "translateY(0)";
                    result.style.transition =
                        "all 300ms ease";

                }, 1950);
                `
                },


                {
                    type: "code",

                    language: "python",

                    title: "观察短路求值",

                    code:
                        `def check():
    print("check() 被执行")
    return True


print(False and check())

print(True or check())`
                },


                {
                    type: "paragraph",

                    text:
                        "运行这段代码时，你会发现 check() 并没有被执行。对于 False and check()，左边已经是 False，整个表达式不可能变成 True，所以 Python 不需要继续计算右边。"
                },


                {
                    type: "paragraph",

                    text:
                        "同样，对于 True or check()，左边已经是 True，整个表达式一定为 True，因此 Python 也不会继续执行 check()。这就是短路求值。"
                },


                {
                    type: "callout",

                    title:
                        "记住这个规律",

                    text:
                        "and 遇到左边 False 时可能提前结束；or 遇到左边 True 时可能提前结束。"
                },


                {
                    type: "heading",

                    text:
                        "Python 支持链式比较"
                },


                {
                    type: "paragraph",

                    text:
                        "Python 还有一个非常方便的语法：链式比较。比如我们想判断一个人的年龄是否同时满足“大于等于 18 岁”和“小于 60 岁”，可以直接写成 18 <= age < 60。"
                },


                {
                    type: "animation",

                    title:
                        "18 <= age < 60 是什么意思？",

                    duration: 3200,

                    html:
                        `
                <div class="chain-animation">

                    <div class="chain-number">
                        18
                    </div>

                    <div class="chain-operator">
                        ≤
                    </div>

                    <div class="chain-age">
                        age = 25
                    </div>

                    <div class="chain-operator">
                        <
                    </div>

                    <div class="chain-number">
                        60
                    </div>

                    <div class="chain-arrow">
                        →
                    </div>

                    <div class="chain-result">
                        True
                    </div>

                </div>
                `,

                    css:
                        `
                .chain-animation {
                    box-sizing: border-box;
                    min-height: 190px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    flex-wrap: wrap;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .chain-number,
                .chain-age,
                .chain-result {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 54px;
                    height: 48px;
                    padding: 0 10px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 14px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .chain-age {
                    min-width: 88px;
                    color: #3776AB;
                }

                .chain-operator {
                    color: #3776AB;
                    font-size: 18px;
                    font-weight: 700;
                    opacity: 0;
                }

                .chain-arrow {
                    color: #9aa8b5;
                    font-size: 20px;
                    opacity: 0;
                }

                .chain-result {
                    min-width: 68px;
                    color: #16834b;
                    background: #f4fbf7;
                    border-color: #cfe8da;
                }
                `,

                    js:
                        `
                const numbers =
                    animationRoot.querySelectorAll(
                        ".chain-number"
                    );

                const age =
                    animationRoot.querySelector(
                        ".chain-age"
                    );

                const operators =
                    animationRoot.querySelectorAll(
                        ".chain-operator"
                    );

                const arrow =
                    animationRoot.querySelector(
                        ".chain-arrow"
                    );

                const result =
                    animationRoot.querySelector(
                        ".chain-result"
                    );


                setTimeout(() => {

                    numbers[0].style.opacity = "1";
                    numbers[0].style.transform =
                        "translateY(0)";
                    numbers[0].style.transition =
                        "all 300ms ease";

                }, 250);


                setTimeout(() => {

                    operators[0].style.opacity = "1";
                    operators[0].style.transition =
                        "opacity 250ms ease";

                }, 650);


                setTimeout(() => {

                    age.style.opacity = "1";
                    age.style.transform =
                        "translateY(0)";
                    age.style.transition =
                        "all 300ms ease";

                }, 900);


                setTimeout(() => {

                    operators[1].style.opacity = "1";
                    operators[1].style.transition =
                        "opacity 250ms ease";

                }, 1350);


                setTimeout(() => {

                    numbers[1].style.opacity = "1";
                    numbers[1].style.transform =
                        "translateY(0)";
                    numbers[1].style.transition =
                        "all 300ms ease";

                }, 1600);


                setTimeout(() => {

                    arrow.style.opacity = "1";
                    arrow.style.transition =
                        "opacity 250ms ease";

                }, 2050);


                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "translateY(0)";
                    result.style.transition =
                        "all 300ms ease";

                }, 2350);
                `
                },


                {
                    type: "code",

                    language: "python",

                    title: "链式比较",

                    code:
                        `age = 25

print(18 <= age < 60)

score = 86

print(0 <= score <= 100)`
                },


                {
                    type: "paragraph",

                    text:
                        "这种写法非常接近数学中的表达方式，也符合 Python 强调可读性的设计思想。相比写成两个比较条件再使用 and，链式比较有时候会更加简洁。"
                },


                {
                    type: "heading",

                    text:
                        "什么是真值？"
                },


                {
                    type: "paragraph",

                    text:
                        "到这里，我们知道 True 和 False 是布尔值。但 Python 中还有一个很有意思的规则：很多其他类型的数据，也可以被 Python 判断成“真”或者“假”。这种判断叫做真值测试，也就是 Truth Value Testing。"
                },


                {
                    type: "animation",

                    title:
                        "不同的数据，也可以被判断成 True 或 False",

                    duration: 3600,

                    html:
                        `
                <div class="truth-animation">

                    <div class="truth-item truth-zero">

                        <div class="truth-value">
                            0
                        </div>

                        <div class="truth-arrow">
                            →
                        </div>

                        <div class="truth-result false">
                            False
                        </div>

                    </div>


                    <div class="truth-item truth-text">

                        <div class="truth-value">
                            "Python"
                        </div>

                        <div class="truth-arrow">
                            →
                        </div>

                        <div class="truth-result true">
                            True
                        </div>

                    </div>


                    <div class="truth-item truth-list">

                        <div class="truth-value">
                            []
                        </div>

                        <div class="truth-arrow">
                            →
                        </div>

                        <div class="truth-result false">
                            False
                        </div>

                    </div>

                </div>
                `,

                    css:
                        `
                .truth-animation {
                    box-sizing: border-box;
                    min-height: 230px;
                    padding: 24px 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .truth-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    width: 100%;
                }

                .truth-value,
                .truth-result {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 82px;
                    height: 40px;
                    padding: 0 12px;
                    border: 1px solid #dce4ec;
                    border-radius: 7px;
                    background: #ffffff;
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 13px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(6px);
                }

                .truth-arrow {
                    color: #9aa8b5;
                    font-size: 18px;
                    opacity: 0;
                }

                .truth-result.true {
                    color: #16834b;
                    background: #f4fbf7;
                    border-color: #cfe8da;
                }

                .truth-result.false {
                    color: #b34a4a;
                    background: #fff7f7;
                    border-color: #efd1d1;
                }
                `,

                    js:
                        `
                const items =
                    animationRoot.querySelectorAll(
                        ".truth-item"
                    );


                items.forEach(
                    (item, index) => {

                        const value =
                            item.querySelector(
                                ".truth-value"
                            );

                        const arrow =
                            item.querySelector(
                                ".truth-arrow"
                            );

                        const result =
                            item.querySelector(
                                ".truth-result"
                            );

                        const base =
                            300 +
                            index * 900;


                        setTimeout(() => {

                            value.style.opacity = "1";
                            value.style.transform =
                                "translateY(0)";
                            value.style.transition =
                                "all 280ms ease";

                        }, base);


                        setTimeout(() => {

                            arrow.style.opacity = "1";
                            arrow.style.transition =
                                "opacity 220ms ease";

                        }, base + 300);


                        setTimeout(() => {

                            result.style.opacity = "1";
                            result.style.transform =
                                "translateY(0)";
                            result.style.transition =
                                "all 280ms ease";

                        }, base + 520);

                    }
                );
                `
                },


                {
                    type: "paragraph",

                    text:
                        "一般来说，None、False、数字 0、空字符串以及空容器会被认为是假，而其他多数非空对象会被认为是真。我们可以使用 bool() 直接观察一个值的真值。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "观察 Python 的真值",

                    code:
                        `values = [
    0,
    1,
    "",
    "Python",
    [],
    [1, 2, 3],
    None
]

for value in values:
    print(repr(value), "=>", bool(value))`
                },


                {
                    type: "paragraph",

                    text:
                        "这也是为什么后面我们可以看到这样的代码：if username:。它并不一定要求 username 必须写成 True 或 False。只要 username 不是空字符串，Python 就可以把它判断为真。"
                },


                {
                    type: "heading",

                    text:
                        "这些知识为什么重要？"
                },


                {
                    type: "paragraph",

                    text:
                        "现在你可能会觉得，我们只是学了一些 True、False、>、<、and、or、not，好像都是非常简单的东西。但这些内容实际上是后面控制程序流程的基础。"
                },


                {
                    type: "animation",

                    title:
                        "从条件判断走向 if",

                    duration: 3300,

                    html:
                        `
                <div class="if-preview-animation">

                    <div class="if-condition">
                        age >= 18
                    </div>

                    <div class="if-arrow">
                        →
                    </div>

                    <div class="if-result">
                        True
                    </div>

                    <div class="if-arrow">
                        →
                    </div>

                    <div class="if-code">
                        执行代码
                    </div>

                </div>
                `,

                    css:
                        `
                .if-preview-animation {
                    box-sizing: border-box;
                    min-height: 190px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .if-condition,
                .if-result,
                .if-code {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 92px;
                    height: 52px;
                    padding: 0 14px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 14px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .if-result {
                    min-width: 70px;
                    color: #16834b;
                    background: #f4fbf7;
                    border-color: #cfe8da;
                }

                .if-code {
                    min-width: 110px;
                    color: #3776AB;
                    background: #f5f9fc;
                }

                .if-arrow {
                    color: #9aa8b5;
                    font-size: 20px;
                    opacity: 0;
                }
                `,

                    js:
                        `
                const condition =
                    animationRoot.querySelector(
                        ".if-condition"
                    );

                const arrows =
                    animationRoot.querySelectorAll(
                        ".if-arrow"
                    );

                const result =
                    animationRoot.querySelector(
                        ".if-result"
                    );

                const codeBox =
                    animationRoot.querySelector(
                        ".if-code"
                    );


                setTimeout(() => {

                    condition.style.opacity = "1";
                    condition.style.transform =
                        "translateY(0)";
                    condition.style.transition =
                        "all 300ms ease";

                }, 300);


                setTimeout(() => {

                    arrows[0].style.opacity = "1";
                    arrows[0].style.transition =
                        "opacity 250ms ease";

                }, 800);


                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "translateY(0)";
                    result.style.transition =
                        "all 300ms ease";

                }, 1050);


                setTimeout(() => {

                    arrows[1].style.opacity = "1";
                    arrows[1].style.transition =
                        "opacity 250ms ease";

                }, 1600);


                setTimeout(() => {

                    codeBox.style.opacity = "1";
                    codeBox.style.transform =
                        "translateY(0)";
                    codeBox.style.transition =
                        "all 300ms ease";

                }, 1900);
                `
                },


                {
                    type: "paragraph",

                    text:
                        "下一章学习 if 时，程序就会根据这些条件决定应该执行哪一段代码。再往后学习 while 和 for 时，我们也会不断遇到条件判断。可以说，布尔逻辑是程序进行决策的基础。"
                },


                {
                    type: "practice",

                    title:
                        "练习 13：年龄判断",

                    description:
                        "创建一个 age 变量，判断一个人是否达到成年年龄。要求分别使用比较运算和 if 语句完成。",

                    starterCode:
                        `age = 20

# 在这里完成你的代码
`
                },


                {
                    type: "practice",

                    title:
                        "练习 14：成绩与资格判断",

                    description:
                        "创建 score、attendance 两个变量。如果成绩不低于 60 且出勤率不低于 80%，输出“通过”；否则输出“未通过”。",

                    starterCode:
                        `score = 86
attendance = 90

# 在这里完成你的代码
`
                },


                {
                    type: "practice",

                    title:
                        "练习 15：多个条件",

                    description:
                        "判断一个数字是否同时满足：大于 10、小于 100，并且能够被 3 整除。",

                    starterCode:
                        `number = 36

# 在这里完成你的代码
`
                },


                {
                    type: "practice",

                    title:
                        "练习 16：登录条件",

                    description:
                        "创建 username 和 password。只有 username 为 admin 且 password 为 123456 时才输出“登录成功”。",

                    starterCode:
                        `username = "admin"
password = "123456"

# 在这里完成你的代码
`
                },


                {
                    type: "thinking",

                    title:
                        "想一想",

                    description:
                        "为什么 if 语句不要求条件一定写成 == True？例如 if age >= 18: 就已经足够了？如果把条件写成 if bool(age >= 18):，又会发生什么？"
                },


                {
                    type: "paragraph",

                    text:
                        "这一章的重点并不是背下所有比较运算符，而是建立一个非常重要的编程思维：程序可以根据条件判断当前发生了什么，然后根据判断结果决定下一步应该做什么。"
                },


                {
                    type: "paragraph",

                    text:
                        "当你能够理解 True 和 False，理解比较运算符，能够使用 and、or、not 组合条件以后，你就已经开始真正理解程序是怎样做决定的了。下一章，我们就把这些条件真正交给 if，让 Python 根据你的判断执行不同的代码。"
                }

            ]
        },


        /* =================================================
           02-02
           if / elif / else
        ================================================= */

        lesson(
            "py-02-02",

            "if / elif / else",

            "让程序根据不同条件选择不同的执行路径。学会 if、elif、else、缩进和条件嵌套，让程序第一次真正拥有根据情况做决定的能力。",

            [

                paragraph(
                    "到这里，你已经完成了一个非常重要的转变。前面我们学习了变量、数据、比较运算和布尔逻辑，现在程序终于可以真正开始“做决定”了。"
                ),

                paragraph(
                    "现实世界中的很多事情，本质上都是条件判断：如果下雨，就带伞；如果余额不足，就提示用户充值；如果考试成绩达到要求，就通过考试。程序也是一样，它需要根据当前的数据决定下一步应该执行什么。"
                ),

                {
                    type: "animation",

                    title:
                        "程序第一次学会做决定",

                    duration: 3200,

                    html:
                        `
                <div class="if-decision-animation">

                    <div class="if-input">
                        score = 86
                    </div>

                    <div class="if-arrow">
                        →
                    </div>

                    <div class="if-condition">
                        score >= 60 ?
                    </div>

                    <div class="if-arrow">
                        →
                    </div>

                    <div class="if-result">
                        True
                    </div>

                    <div class="if-arrow">
                        →
                    </div>

                    <div class="if-action">
                        执行代码
                    </div>

                </div>
                `,

                    css:
                        `
                .if-decision-animation {
                    box-sizing: border-box;
                    min-height: 200px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    flex-wrap: wrap;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .if-input,
                .if-condition,
                .if-result,
                .if-action {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 90px;
                    height: 50px;
                    padding: 0 13px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 13px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .if-condition {
                    min-width: 120px;
                    color: #3776AB;
                    background: #f5f9fc;
                }

                .if-result {
                    min-width: 65px;
                    color: #16834b;
                    background: #f4fbf7;
                    border-color: #cfe8da;
                }

                .if-action {
                    color: #3776AB;
                    background: #f5f9fc;
                }

                .if-arrow {
                    color: #9aa8b5;
                    font-size: 20px;
                    opacity: 0;
                }
                `,

                    js:
                        `
                const input =
                    animationRoot.querySelector(
                        ".if-input"
                    );

                const condition =
                    animationRoot.querySelector(
                        ".if-condition"
                    );

                const result =
                    animationRoot.querySelector(
                        ".if-result"
                    );

                const action =
                    animationRoot.querySelector(
                        ".if-action"
                    );

                const arrows =
                    animationRoot.querySelectorAll(
                        ".if-arrow"
                    );


                setTimeout(() => {

                    input.style.opacity = "1";
                    input.style.transform =
                        "translateY(0)";
                    input.style.transition =
                        "all 300ms ease";

                }, 250);


                setTimeout(() => {

                    arrows[0].style.opacity = "1";
                    arrows[0].style.transition =
                        "opacity 250ms ease";

                }, 650);


                setTimeout(() => {

                    condition.style.opacity = "1";
                    condition.style.transform =
                        "translateY(0)";
                    condition.style.transition =
                        "all 300ms ease";

                }, 900);


                setTimeout(() => {

                    arrows[1].style.opacity = "1";
                    arrows[1].style.transition =
                        "opacity 250ms ease";

                }, 1350);


                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "translateY(0)";
                    result.style.transition =
                        "all 300ms ease";

                }, 1600);


                setTimeout(() => {

                    arrows[2].style.opacity = "1";
                    arrows[2].style.transition =
                        "opacity 250ms ease";

                }, 2050);


                setTimeout(() => {

                    action.style.opacity = "1";
                    action.style.transform =
                        "translateY(0)";
                    action.style.transition =
                        "all 300ms ease";

                }, 2300);
                `
                },


                paragraph(
                    "if 语句会先检查一个条件。如果条件的结果是 True，就执行缩进后的代码；如果条件是 False，就跳过这一段代码。"
                ),


                code(
                    `score = 86

if score >= 60:
    print("考试通过")`,
                    "最简单的 if"
                ),


                paragraph(
                    "注意这里最后的冒号。Python 使用冒号告诉程序：接下来会开始一个新的代码块。而下面缩进的代码，就是这个 if 条件成立以后需要执行的内容。"
                ),


                {
                    type: "animation",

                    title:
                        "if 到底是怎样工作的？",

                    duration: 3000,

                    html:
                        `
                <div class="if-flow-animation">

                    <div class="if-flow-condition">
                        age >= 18
                    </div>

                    <div class="if-flow-arrow">
                        →
                    </div>

                    <div class="if-flow-true">
                        True
                    </div>

                    <div class="if-flow-arrow">
                        →
                    </div>

                    <div class="if-flow-code">
                        print("可以进入")
                    </div>

                </div>
                `,

                    css:
                        `
                .if-flow-animation {
                    box-sizing: border-box;
                    min-height: 180px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .if-flow-condition,
                .if-flow-true,
                .if-flow-code {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 105px;
                    height: 50px;
                    padding: 0 13px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 13px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .if-flow-true {
                    min-width: 65px;
                    color: #16834b;
                    background: #f4fbf7;
                    border-color: #cfe8da;
                }

                .if-flow-code {
                    min-width: 145px;
                    color: #3776AB;
                    background: #f5f9fc;
                }

                .if-flow-arrow {
                    color: #9aa8b5;
                    font-size: 20px;
                    opacity: 0;
                }
                `,

                    js:
                        `
                const condition =
                    animationRoot.querySelector(
                        ".if-flow-condition"
                    );

                const result =
                    animationRoot.querySelector(
                        ".if-flow-true"
                    );

                const codeBox =
                    animationRoot.querySelector(
                        ".if-flow-code"
                    );

                const arrows =
                    animationRoot.querySelectorAll(
                        ".if-flow-arrow"
                    );


                setTimeout(() => {

                    condition.style.opacity = "1";
                    condition.style.transform =
                        "translateY(0)";
                    condition.style.transition =
                        "all 300ms ease";

                }, 300);


                setTimeout(() => {

                    arrows[0].style.opacity = "1";
                    arrows[0].style.transition =
                        "opacity 250ms ease";

                }, 800);


                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "translateY(0)";
                    result.style.transition =
                        "all 300ms ease";

                }, 1050);


                setTimeout(() => {

                    arrows[1].style.opacity = "1";
                    arrows[1].style.transition =
                        "opacity 250ms ease";

                }, 1550);


                setTimeout(() => {

                    codeBox.style.opacity = "1";
                    codeBox.style.transform =
                        "translateY(0)";
                    codeBox.style.transition =
                        "all 300ms ease";

                }, 1800);
                `
                },


                paragraph(
                    "Python 使用缩进表示代码块。通常使用 4 个空格进行缩进。这里一定要注意：缩进不是单纯为了让代码看起来整齐，而是 Python 语法的一部分。"
                ),


                code(
                    `age = 20

if age >= 18:
    print("你已经成年了")
    print("可以继续执行这里的代码")

print("这句话不属于 if")`,
                    "理解缩进"
                ),


                paragraph(
                    "上面的两个 print 都属于 if，因为它们进行了相同层级的缩进。而最后一个 print 没有缩进，所以它属于 if 外面的代码。"
                ),


                {
                    type: "callout",

                    title:
                        "一个非常重要的习惯",

                    text:
                        "看到冒号以后，就要想到“下面可能会出现一个代码块”；看到缩进以后，就要想到“这段代码属于上面的结构”。"
                },


                {
                    type: "heading",

                    text:
                        "elif：继续检查其他条件"
                },


                paragraph(
                    "现实中的判断通常不只有一种情况。例如考试成绩可能是优秀、良好、及格或者不及格。这时候我们可以使用 elif，让 Python 在前一个条件不成立时继续检查下一个条件。"
                ),


                code(
                    `score = 86

if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")`,
                    "if / elif / else"
                ),


                {
                    type: "animation",

                    title:
                        "成绩判断会怎样一路向下检查？",

                    duration: 3600,

                    html:
                        `
                <div class="grade-flow-animation">

                    <div class="grade-item">
                        <span class="grade-condition">
                            score >= 90
                        </span>
                        <span class="grade-result">
                            False
                        </span>
                    </div>

                    <div class="grade-line">
                        ↓
                    </div>

                    <div class="grade-item">
                        <span class="grade-condition">
                            score >= 80
                        </span>
                        <span class="grade-result success">
                            True
                        </span>
                    </div>

                    <div class="grade-line">
                        ↓
                    </div>

                    <div class="grade-final">
                        良好
                    </div>

                </div>
                `,

                    css:
                        `
                .grade-flow-animation {
                    box-sizing: border-box;
                    min-height: 260px;
                    padding: 24px 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }

                .grade-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .grade-condition,
                .grade-result,
                .grade-final {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 42px;
                    padding: 0 14px;
                    border: 1px solid #dce4ec;
                    border-radius: 7px;
                    background: #ffffff;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 13px;
                    font-weight: 600;
                }

                .grade-condition {
                    color: #263544;
                }

                .grade-result {
                    color: #b34a4a;
                    background: #fff7f7;
                    border-color: #efd1d1;
                }

                .grade-result.success {
                    color: #16834b;
                    background: #f4fbf7;
                    border-color: #cfe8da;
                }

                .grade-line {
                    color: #9aa8b5;
                    font-size: 18px;
                    opacity: 0;
                }

                .grade-final {
                    min-width: 90px;
                    color: #3776AB;
                    background: #f5f9fc;
                    border-color: #d7e6f0;
                    opacity: 0;
                    transform: translateY(8px);
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }
                `,

                    js:
                        `
                const items =
                    animationRoot.querySelectorAll(
                        ".grade-item"
                    );

                const lines =
                    animationRoot.querySelectorAll(
                        ".grade-line"
                    );

                const final =
                    animationRoot.querySelector(
                        ".grade-final"
                    );


                setTimeout(() => {

                    items[0].style.opacity = "1";
                    items[0].style.transform =
                        "translateY(0)";
                    items[0].style.transition =
                        "all 300ms ease";

                }, 300);


                setTimeout(() => {

                    lines[0].style.opacity = "1";
                    lines[0].style.transition =
                        "opacity 220ms ease";

                }, 850);


                setTimeout(() => {

                    items[1].style.opacity = "1";
                    items[1].style.transform =
                        "translateY(0)";
                    items[1].style.transition =
                        "all 300ms ease";

                }, 1100);


                setTimeout(() => {

                    lines[1].style.opacity = "1";
                    lines[1].style.transition =
                        "opacity 220ms ease";

                }, 1650);


                setTimeout(() => {

                    final.style.opacity = "1";
                    final.style.transform =
                        "translateY(0)";
                    final.style.transition =
                        "all 300ms ease";

                }, 1900);
                `
                },


                paragraph(
                    "这里有一个非常重要的规则：一旦 if 或某一个 elif 条件成立，Python 就会执行对应的代码块，然后跳过后面的 elif 和 else。"
                ),


                paragraph(
                    "所以如果 score = 95，score >= 90 已经成立，程序输出“优秀”以后，就不会继续检查 score >= 80、score >= 60，也不会执行 else。"
                ),


                {
                    type: "concepts",

                    items: [

                        "if：第一个条件判断",

                        "elif：前面的条件不成立时继续判断",

                        "else：前面的所有条件都不成立时执行",

                        "一个 if 可以有多个 elif",

                        "else 是可选的",

                        "条件成立后会执行对应代码块，并跳过后面的分支",

                        "代码块通过缩进表示"

                    ]
                },


                {
                    type: "heading",

                    text:
                        "嵌套 if"
                },


                paragraph(
                    "条件判断还可以嵌套。也就是说，在一个 if 里面还可以继续写另一个 if。这在处理多个层级的条件时非常有用。"
                ),


                code(
                    `age = 22
has_id = True

if age >= 18:
    if has_id:
        print("可以进入")
    else:
        print("年龄符合，但缺少证件")
else:
    print("年龄不符合")`,
                    "嵌套 if"
                ),


                paragraph(
                    "这段代码的逻辑是先判断年龄。如果年龄符合要求，再继续判断有没有证件。这样就形成了两层判断。"
                ),


                {
                    type: "callout",

                    title:
                        "不要让嵌套越来越深",

                    text:
                        "嵌套 if 虽然可以解决问题，但如果层数太深，代码会越来越难读。很多时候，可以使用 and、or 等逻辑运算符把条件组合起来，让代码更加清晰。"
                },


                code(
                    `age = 22
has_id = True

if age >= 18 and has_id:
    print("可以进入")
else:
    print("不能进入")`,
                    "使用逻辑运算简化条件"
                ),


                {
                    type: "heading",

                    text:
                        "条件表达式"
                },


                paragraph(
                    "Python 还提供了一种把简单的 if / else 写成一行的方式，叫做条件表达式。它特别适合非常简单的二选一场景。"
                ),


                code(
                    `age = 20

message = "成年人" if age >= 18 else "未成年人"

print(message)`,
                    "条件表达式"
                ),


                paragraph(
                    "这句话可以理解成：如果 age >= 18 成立，就把“成年人”赋值给 message，否则就把“未成年人”赋值给 message。"
                ),


                note(
                    "学习建议",
                    "条件表达式适合非常简单的情况。如果条件复杂，优先使用普通的 if / else，不要为了少写几行代码而牺牲可读性。"
                ),


                {
                    type: "heading",

                    text:
                        "你已经开始真正控制程序了"
                },


                {
                    type: "paragraph",

                    text:
                        "如果你能走到这里，说明你已经跨过了 Python 学习中非常重要的一道门槛。前面的变量、字符串、数字、比较运算和布尔逻辑，看起来可能都是一个个零散的知识点，而 if / elif / else 会第一次把它们真正连接起来。"
                },


                {
                    type: "paragraph",

                    text:
                        "从这一刻开始，你写出的程序已经不再只是从第一行执行到最后一行。它可以根据不同的数据，选择不同的路径。数据不同，程序最终产生的结果也可能完全不同。"
                },


                {
                    type: "animation",

                    title:
                        "从“执行代码”到“选择路径”",

                    duration: 3000,

                    html:
                        `
                <div class="path-choice-animation">

                    <div class="path-start">
                        开始
                    </div>

                    <div class="path-arrow">
                        →
                    </div>

                    <div class="path-condition">
                        条件？
                    </div>

                    <div class="path-branch">

                        <div class="path-yes">
                            True
                        </div>

                        <div class="path-no">
                            False
                        </div>

                    </div>

                </div>
                `,

                    css:
                        `
                .path-choice-animation {
                    box-sizing: border-box;
                    min-height: 220px;
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .path-start,
                .path-condition {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 90px;
                    height: 48px;
                    padding: 0 14px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #263544;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .path-condition {
                    min-width: 100px;
                    color: #3776AB;
                    background: #f5f9fc;
                }

                .path-arrow {
                    color: #9aa8b5;
                    font-size: 20px;
                    opacity: 0;
                }

                .path-branch {
                    display: flex;
                    gap: 14px;
                }

                .path-yes,
                .path-no {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 76px;
                    height: 44px;
                    padding: 0 12px;
                    border-radius: 7px;
                    font-weight: 700;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .path-yes {
                    color: #16834b;
                    background: #f4fbf7;
                    border: 1px solid #cfe8da;
                }

                .path-no {
                    color: #b34a4a;
                    background: #fff7f7;
                    border: 1px solid #efd1d1;
                }
                `,

                    js:
                        `
                const start =
                    animationRoot.querySelector(
                        ".path-start"
                    );

                const condition =
                    animationRoot.querySelector(
                        ".path-condition"
                    );

                const arrow =
                    animationRoot.querySelector(
                        ".path-arrow"
                    );

                const yes =
                    animationRoot.querySelector(
                        ".path-yes"
                    );

                const no =
                    animationRoot.querySelector(
                        ".path-no"
                    );


                setTimeout(() => {

                    start.style.opacity = "1";
                    start.style.transform =
                        "translateY(0)";
                    start.style.transition =
                        "all 300ms ease";

                }, 300);


                setTimeout(() => {

                    arrow.style.opacity = "1";
                    arrow.style.transition =
                        "opacity 250ms ease";

                }, 750);


                setTimeout(() => {

                    condition.style.opacity = "1";
                    condition.style.transform =
                        "translateY(0)";
                    condition.style.transition =
                        "all 300ms ease";

                }, 1000);


                setTimeout(() => {

                    yes.style.opacity = "1";
                    yes.style.transform =
                        "translateY(0)";
                    yes.style.transition =
                        "all 300ms ease";

                }, 1600);


                setTimeout(() => {

                    no.style.opacity = "1";
                    no.style.transform =
                        "translateY(0)";
                    no.style.transition =
                        "all 300ms ease";

                }, 1900);
                `
                },


                paragraph(
                    "你现在已经不只是“在学习 Python 语法”了。你正在学习程序最核心的能力之一：根据条件选择下一步应该做什么。这个能力会一直贯穿后面的循环、函数、项目开发，甚至人工智能程序。"
                ),


                practice(
                    "练习 17：成绩评级",

                    "设置一个 0～100 的成绩，根据下面规则输出等级：90～100 为 A，80～89 为 B，70～79 为 C，60～69 为 D，低于 60 为 F。",

                    `score = 86

# 在这里完成你的代码
`
                ),


                practice(
                    "练习 18：BMI 分类",

                    "设置身高和体重，计算 BMI，并根据 BMI 输出一个简单分类。你可以自行设计分类边界。重点练习如何先计算数据，再使用 if / elif / else 做判断。",

                    `height = 1.75
weight = 65

# BMI = weight / (height * height)

# 在这里完成你的代码
`
                ),


                practice(
                    "练习 19：登录系统",

                    "模拟一个简单登录系统：用户名正确后继续检查密码；用户名或密码错误时给出不同提示。",

                    `username = "admin"
password = "123456"

# 在这里完成你的代码
`
                ),


                practice(
                    "练习 20：票价计算",

                    "根据年龄计算票价：儿童、成年人、老年人使用不同票价。要求至少使用 if / elif / else。",

                    `age = 25

# 在这里完成你的代码
`
                ),


                {
                    type: "callout",

                    title:
                        "恭喜你，已经走到这里了",

                    text:
                        "如果你已经能够自己写出 if、elif、else，并且理解缩进和条件执行，那么你已经完成了 Python 学习中一个非常重要的阶段。接下来代码会越来越有意思，因为程序终于可以根据不同情况做出不同的选择了。"
                },


                thinking(
                    "想一想",

                    "如果 score = 95，那么下面几个条件会执行几个？为什么 elif 后面的条件不会继续执行？如果把第一个条件改成 score >= 60，又会发生什么？"
                ),


                paragraph(
                    "下一步，我们还会让程序不断重复执行某些任务。你已经学会了让程序做选择，接下来就可以学习让程序做重复的事情。当“选择”和“重复”结合起来以后，你会发现程序真正开始拥有解决复杂问题的能力。"
                )


            ]
        ),


        /* =================================================
           02-03
           for
        ================================================= */

        lesson(
            "py-02-03",

            "for 循环",

            "理解 Python 的 for 并不是简单的“重复 N 次”，而是依次遍历一个可迭代对象中的元素。",

            [

                paragraph(
                    "上一章，我们学会了让程序根据条件做出不同选择。现在，我们继续向前一步：让程序把同一件事情自动处理很多次。很多初学者第一次看到 for，会把它理解成“重复执行几次”。这个理解并不完全准确。Python 的 for 更核心的含义是：从一个可迭代对象中依次取得元素，并对每一个元素执行一次循环体。"
                ),

                {
                    type: "animation",

                    title:
                        "for 循环到底在做什么？",

                    duration: 2600,

                    html:
                        `
                <div class="for-animation">

                    <div class="for-source">
                        <span class="for-label">数据</span>

                        <div class="for-items">
                            <span class="for-item">Alice</span>
                            <span class="for-item">Bob</span>
                            <span class="for-item">Charlie</span>
                        </div>
                    </div>

                    <div class="for-arrow">
                        ↓
                    </div>

                    <div class="for-current">
                        <span class="for-label">当前元素</span>
                        <strong class="for-value">Alice</strong>
                    </div>

                    <div class="for-arrow">
                        ↓
                    </div>

                    <div class="for-action">
                        print(name)
                    </div>

                    <div class="for-result">
                        Alice
                    </div>

                </div>
                `,

                    css:
                        `
                .for-animation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    padding: 20px;
                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;
                }

                .for-source {
                    text-align: center;
                }

                .for-label {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 12px;
                    color: #667085;
                }

                .for-items {
                    display: flex;
                    gap: 8px;
                }

                .for-item {
                    padding: 8px 12px;
                    border: 1px solid #d0d5dd;
                    border-radius: 8px;
                    background: #ffffff;
                    font-size: 14px;
                }

                .for-current {
                    min-width: 120px;
                    padding: 10px 18px;
                    border-radius: 10px;
                    background: #eef4ff;
                    text-align: center;
                }

                .for-value {
                    display: block;
                    font-size: 20px;
                }

                .for-arrow {
                    font-size: 20px;
                    color: #98a2b3;
                }

                .for-action {
                    padding: 10px 18px;
                    border-radius: 8px;
                    background: #f2f4f7;
                    font-family: monospace;
                }

                .for-result {
                    min-height: 24px;
                    font-weight: 600;
                }
                `,

                    js:
                        `
                const items =
                    animationRoot.querySelectorAll(
                        ".for-item"
                    );

                const value =
                    animationRoot.querySelector(
                        ".for-value"
                    );

                const result =
                    animationRoot.querySelector(
                        ".for-result"
                    );

                const values = [
                    "Alice",
                    "Bob",
                    "Charlie"
                ];

                let index = 0;

                function play() {

                    items.forEach(
                        item => {
                            item.style.opacity = "0.45";
                        }
                    );

                    items[index].style.opacity = "1";

                    value.textContent =
                        values[index];

                    result.textContent =
                        values[index];

                    index++;

                    if (index >= values.length) {
                        index = 0;
                    }

                }

                play();

                setInterval(
                    play,
                    800
                );
                `
                },

                paragraph(
                    "可以把 for 理解成一个非常自然的过程：拿出第一个元素，执行一次循环体；再拿出第二个元素，再执行一次；继续处理下一个元素，直到所有元素都处理完成。"
                ),

                code(
                    `names = ["Alice", "Bob", "Charlie"]

for name in names:
    print(name)`,
                    "遍历列表"
                ),

                paragraph(
                    "这里的 name 不是提前定义好的固定值。每次循环开始时，Python 都会把 names 中当前遍历到的元素赋给 name。因此第一次循环时 name 是 Alice，第二次是 Bob，第三次是 Charlie。"
                ),

                {
                    type: "animation",

                    title:
                        "name 的值会怎样一次次变化？",

                    duration: 2600,

                    html:
                        `
                <div class="for-value-animation">

                    <div class="for-code">
                        for name in names:
                    </div>

                    <div class="for-name-box">
                        <span>name =</span>
                        <strong class="name-value">
                            Alice
                        </strong>
                    </div>

                    <div class="for-step">
                        第 <strong class="step-value">1</strong> 次循环
                    </div>

                </div>
                `,

                    css:
                        `
                .for-value-animation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 14px;
                    padding: 24px;
                }

                .for-code {
                    padding: 10px 14px;
                    border-radius: 8px;
                    background: #f2f4f7;
                    font-family: monospace;
                }

                .for-name-box {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 18px;
                }

                .name-value {
                    min-width: 90px;
                    padding: 8px 14px;
                    border-radius: 8px;
                    background: #eef4ff;
                    text-align: center;
                }

                .for-step {
                    color: #667085;
                    font-size: 13px;
                }
                `,

                    js:
                        `
                const nameValue =
                    animationRoot.querySelector(
                        ".name-value"
                    );

                const stepValue =
                    animationRoot.querySelector(
                        ".step-value"
                    );

                const values = [
                    "Alice",
                    "Bob",
                    "Charlie"
                ];

                let index = 0;

                function update() {

                    nameValue.textContent =
                        values[index];

                    stepValue.textContent =
                        index + 1;

                    index++;

                    if (index >= values.length) {
                        index = 0;
                    }

                }

                update();

                setInterval(
                    update,
                    850
                );
                `
                },

                code(
                    `word = "Python"

for character in word:
    print(character)`,
                    "遍历字符串"
                ),

                paragraph(
                    "for 不只可以遍历列表。字符串本身也是可以被遍历的，所以 Python 会依次取得其中的每一个字符。"
                ),

                concepts([
                    "for 可以遍历列表",
                    "for 可以遍历字符串",
                    "for 可以遍历 tuple",
                    "for 可以遍历 set",
                    "for 可以遍历 dictionary",
                    "for 也可以遍历 range 等对象"
                ]),

                paragraph(
                    "这里有一个非常重要的概念：for 关注的不是“到底要重复多少次”，而是“我要依次处理哪些元素”。这也是 Python for 循环和一些其他语言中传统计数循环思维上的一个重要区别。"
                ),

                {
                    type: "animation",

                    title:
                        "for 的核心：一个一个处理元素",

                    duration: 2400,

                    html:
                        `
                <div class="for-process-animation">

                    <div class="process-row">
                        <span class="process-item">10</span>
                        <span class="process-item">20</span>
                        <span class="process-item">30</span>
                        <span class="process-item">40</span>
                    </div>

                    <div class="process-arrow">
                        ↓
                    </div>

                    <div class="process-current">
                        当前处理：
                        <strong class="process-value">
                            10
                        </strong>
                    </div>

                    <div class="process-status">
                        <span class="process-index">
                            1
                        </span>
                        /
                        4
                    </div>

                </div>
                `,

                    css:
                        `
                .for-process-animation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 14px;
                    padding: 20px;
                }

                .process-row {
                    display: flex;
                    gap: 8px;
                }

                .process-item {
                    padding: 8px 14px;
                    border: 1px solid #d0d5dd;
                    border-radius: 8px;
                }

                .process-current {
                    padding: 10px 18px;
                    border-radius: 8px;
                    background: #eef4ff;
                }

                .process-status {
                    color: #667085;
                    font-size: 13px;
                }
                `,

                    js:
                        `
                const items =
                    animationRoot.querySelectorAll(
                        ".process-item"
                    );

                const value =
                    animationRoot.querySelector(
                        ".process-value"
                    );

                const indexElement =
                    animationRoot.querySelector(
                        ".process-index"
                    );

                const values = [
                    "10",
                    "20",
                    "30",
                    "40"
                ];

                let index = 0;

                function update() {

                    items.forEach(
                        item => {
                            item.style.opacity = "0.45";
                        }
                    );

                    items[index].style.opacity = "1";

                    value.textContent =
                        values[index];

                    indexElement.textContent =
                        index + 1;

                    index++;

                    if (index >= values.length) {
                        index = 0;
                    }

                }

                update();

                setInterval(
                    update,
                    600
                );
                `
                },

                paragraph(
                    "如果需要按照数字范围进行循环，最常见的工具就是 range()。"
                ),

                code(
                    `for i in range(5):
    print(i)`,
                    "range(5)"
                ),

                paragraph(
                    "range(5) 会产生 0、1、2、3、4。注意它并不会产生 5。range 的结束位置 stop 永远不会包含在结果中。这个规则非常重要，因为以后你会经常看到 range()。"
                ),

                {
                    type: "animation",

                    title:
                        "为什么 range(5) 是 0 到 4？",

                    duration: 2600,

                    html:
                        `
                <div class="range-animation">

                    <div class="range-code">
                        range(5)
                    </div>

                    <div class="range-line">
                        <span class="range-number">0</span>
                        <span class="range-number">1</span>
                        <span class="range-number">2</span>
                        <span class="range-number">3</span>
                        <span class="range-number">4</span>
                        <span class="range-stop">5</span>
                    </div>

                    <div class="range-description">
                        <span class="range-result">
                            会被遍历
                        </span>

                        <span class="range-excluded">
                            5 不包含
                        </span>
                    </div>

                </div>
                `,

                    css:
                        `
                .range-animation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    padding: 22px;
                }

                .range-code {
                    padding: 8px 14px;
                    border-radius: 8px;
                    background: #f2f4f7;
                    font-family: monospace;
                    font-size: 16px;
                }

                .range-line {
                    display: flex;
                    gap: 6px;
                }

                .range-number,
                .range-stop {
                    min-width: 34px;
                    padding: 7px 5px;
                    border-radius: 7px;
                    text-align: center;
                    background: #eef4ff;
                }

                .range-stop {
                    background: #f2f4f7;
                    opacity: 0.55;
                }

                .range-description {
                    display: flex;
                    gap: 20px;
                    font-size: 13px;
                }

                .range-result {
                    color: #344054;
                }

                .range-excluded {
                    color: #98a2b3;
                }
                `,

                    js:
                        `
                const numbers =
                    animationRoot.querySelectorAll(
                        ".range-number"
                    );

                const stop =
                    animationRoot.querySelector(
                        ".range-stop"
                    );

                let index = 0;

                function update() {

                    numbers.forEach(
                        item => {
                            item.style.opacity = "0.45";
                        }
                    );

                    stop.style.opacity = "0.35";

                    if (index < numbers.length) {

                        numbers[index]
                            .style.opacity = "1";

                        index++;

                    } else {

                        index = 0;

                    }

                }

                update();

                setInterval(
                    update,
                    450
                );
                `
                },

                code(
                    `print(list(range(5)))
print(list(range(1, 6)))
print(list(range(2, 11, 2)))
print(list(range(10, 0, -1)))`,
                    "range 的 start / stop / step"
                ),

                paragraph(
                    "range() 最常见的写法有三种：range(stop)、range(start, stop) 和 range(start, stop, step)。可以把它理解成“从哪里开始，到哪里结束，每次走多大一步”。"
                ),

                concepts([
                    "range(stop)：从 0 开始，到 stop 之前结束",
                    "range(start, stop)：从 start 开始，到 stop 之前结束",
                    "range(start, stop, step)：可以指定每次变化的步长",
                    "stop 永远不会包含在结果中",
                    "step 可以为负数，因此可以倒着遍历"
                ]),

                {
                    type: "animation",

                    title:
                        "range(start, stop, step) 是怎样工作的？",

                    duration: 2600,

                    html:
                        `
                <div class="range-step-animation">

                    <div class="range-expression">
                        range(2, 11, 2)
                    </div>

                    <div class="range-sequence">
                        <span>2</span>
                        <span>4</span>
                        <span>6</span>
                        <span>8</span>
                        <span>10</span>
                    </div>

                    <div class="range-rule">
                        start = 2
                        &nbsp;&nbsp;
                        step = 2
                        &nbsp;&nbsp;
                        stop = 11
                    </div>

                </div>
                `,

                    css:
                        `
                .range-step-animation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    padding: 22px;
                }

                .range-expression {
                    padding: 9px 16px;
                    border-radius: 8px;
                    background: #f2f4f7;
                    font-family: monospace;
                    font-size: 16px;
                }

                .range-sequence {
                    display: flex;
                    gap: 8px;
                }

                .range-sequence span {
                    padding: 8px 13px;
                    border-radius: 8px;
                    background: #eef4ff;
                }

                .range-rule {
                    font-size: 13px;
                    color: #667085;
                }
                `,

                    js:
                        `
                const sequence =
                    animationRoot.querySelectorAll(
                        ".range-sequence span"
                    );

                let index = 0;

                function update() {

                    sequence.forEach(
                        item => {
                            item.style.opacity = "0.4";
                        }
                    );

                    if (index < sequence.length) {

                        sequence[index]
                            .style.opacity = "1";

                        index++;

                    } else {

                        index = 0;

                    }

                }

                update();

                setInterval(
                    update,
                    420
                );
                `
                },

                paragraph(
                    "for 循环还可以同时处理多个数据。例如使用 enumerate() 获取索引和元素。enumerate() 特别适合需要知道“当前是第几个元素”的场景。"
                ),

                code(
                    `names = ["Alice", "Bob", "Charlie"]

for index, name in enumerate(names, start=1):
    print(index, name)`,
                    "enumerate 与 for"
                ),

                {
                    type: "animation",

                    title:
                        "enumerate() 为什么方便？",

                    duration: 2400,

                    html:
                        `
                <div class="enumerate-animation">

                    <div class="enumerate-row">

                        <div class="enumerate-index">
                            1
                        </div>

                        <div class="enumerate-name">
                            Alice
                        </div>

                    </div>

                    <div class="enumerate-output">
                        1 Alice
                    </div>

                </div>
                `,

                    css:
                        `
                .enumerate-animation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 14px;
                    padding: 22px;
                }

                .enumerate-row {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }

                .enumerate-index {
                    width: 38px;
                    padding: 8px 0;
                    border-radius: 8px;
                    background: #eef4ff;
                    text-align: center;
                    font-weight: 600;
                }

                .enumerate-name {
                    padding: 8px 14px;
                    border-radius: 8px;
                    background: #f2f4f7;
                }

                .enumerate-output {
                    font-family: monospace;
                }
                `,

                    js:
                        `
                const index =
                    animationRoot.querySelector(
                        ".enumerate-index"
                    );

                const name =
                    animationRoot.querySelector(
                        ".enumerate-name"
                    );

                const output =
                    animationRoot.querySelector(
                        ".enumerate-output"
                    );

                const data = [
                    [1, "Alice"],
                    [2, "Bob"],
                    [3, "Charlie"]
                ];

                let current = 0;

                function update() {

                    index.textContent =
                        data[current][0];

                    name.textContent =
                        data[current][1];

                    output.textContent =
                        data[current][0] +
                        " " +
                        data[current][1];

                    current++;

                    if (current >= data.length) {
                        current = 0;
                    }

                }

                update();

                setInterval(
                    update,
                    800
                );
                `
                },

                paragraph(
                    "还可以使用 zip() 同时遍历多个序列。它会把多个序列中对应位置的元素组合起来，非常适合处理“名字和成绩”“商品和价格”这样的成对数据。"
                ),

                code(
                    `names = ["Alice", "Bob", "Charlie"]
scores = [95, 88, 92]

for name, score in zip(names, scores):
    print(f"{name}: {score}")`,
                    "zip 与 for"
                ),

                {
                    type: "animation",

                    title:
                        "zip() 怎样把两个列表配对？",

                    duration: 2500,

                    html:
                        `
                <div class="zip-animation">

                    <div class="zip-row">
                        <span>Alice</span>
                        <span>95</span>
                    </div>

                    <div class="zip-row">
                        <span>Bob</span>
                        <span>88</span>
                    </div>

                    <div class="zip-row">
                        <span>Charlie</span>
                        <span>92</span>
                    </div>

                    <div class="zip-output">
                        Alice → 95
                    </div>

                </div>
                `,

                    css:
                        `
                .zip-animation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 9px;
                    padding: 20px;
                }

                .zip-row {
                    display: flex;
                    gap: 10px;
                }

                .zip-row span {
                    min-width: 90px;
                    padding: 7px 10px;
                    border-radius: 7px;
                    background: #f2f4f7;
                    text-align: center;
                }

                .zip-output {
                    margin-top: 8px;
                    font-family: monospace;
                    font-weight: 600;
                }
                `,

                    js:
                        `
                const rows =
                    animationRoot.querySelectorAll(
                        ".zip-row"
                    );

                const output =
                    animationRoot.querySelector(
                        ".zip-output"
                    );

                const values = [
                    "Alice → 95",
                    "Bob → 88",
                    "Charlie → 92"
                ];

                let index = 0;

                function update() {

                    rows.forEach(
                        row => {
                            row.style.opacity = "0.4";
                        }
                    );

                    rows[index]
                        .style.opacity = "1";

                    output.textContent =
                        values[index];

                    index++;

                    if (index >= values.length) {
                        index = 0;
                    }

                }

                update();

                setInterval(
                    update,
                    800
                );
                `
                },

                paragraph(
                    "for 循环还可以嵌套。也就是说，一个 for 的循环体里面，还可以再放一个 for。这样就可以处理二维数据、表格以及一些需要逐行逐列处理的问题。"
                ),

                code(
                    `for row in range(1, 10):

    for column in range(1, row + 1):

        print(
            f"{column} × {row} = {column * row}",
            end="    "
        )

    print()`,
                    "嵌套 for：九九乘法表"
                ),

                {
                    type: "animation",

                    title:
                        "嵌套 for 是怎样一层一层执行的？",

                    duration: 2800,

                    html:
                        `
                <div class="nested-for-animation">

                    <div class="nested-title">
                        外层 row
                    </div>

                    <div class="nested-row">
                        <span class="nested-cell">1 × 1</span>
                        <span class="nested-cell">1 × 2</span>
                        <span class="nested-cell">2 × 2</span>
                    </div>

                    <div class="nested-description">
                        外层循环确定行，
                        内层循环处理这一行中的每一项。
                    </div>

                </div>
                `,

                    css:
                        `
                .nested-for-animation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 14px;
                    padding: 22px;
                    text-align: center;
                }

                .nested-title {
                    padding: 8px 14px;
                    border-radius: 8px;
                    background: #eef4ff;
                    font-weight: 600;
                }

                .nested-row {
                    display: flex;
                    gap: 7px;
                }

                .nested-cell {
                    padding: 7px 10px;
                    border-radius: 7px;
                    background: #f2f4f7;
                    font-family: monospace;
                }

                .nested-description {
                    max-width: 420px;
                    color: #667085;
                    font-size: 13px;
                    line-height: 1.7;
                }
                `,

                    js:
                        `
                const cells =
                    animationRoot.querySelectorAll(
                        ".nested-cell"
                    );

                let index = 0;

                function update() {

                    cells.forEach(
                        cell => {
                            cell.style.opacity = "0.4";
                        }
                    );

                    cells[index]
                        .style.opacity = "1";

                    index++;

                    if (index >= cells.length) {
                        index = 0;
                    }

                }

                update();

                setInterval(
                    update,
                    550
                );
                `
                },

                paragraph(
                    "理解嵌套循环时，可以把它想象成两层任务：外层循环决定当前处理哪一组数据，内层循环负责把这一组数据中的每一项依次处理完。九九乘法表就是一个非常典型的例子。"
                ),

                concepts([
                    "外层循环每执行一次，内层循环通常会完整执行一遍",
                    "嵌套循环适合处理二维数据和表格",
                    "嵌套层数越深，程序越难理解",
                    "初学阶段先掌握两层循环即可"
                ]),

                {
                    type: "callout",

                    title:
                        "一个非常重要的循环思维",

                    text:
                        "看到 for 的时候，不要只问“它要重复几次？”。更好的问题是：“它正在遍历什么？每一次拿到的元素是什么？拿到这个元素以后要做什么？”这三个问题，会帮助你真正理解 Python 的 for。"
                },

                paragraph(
                    "到这里，你已经掌握了 Python 中最重要的循环之一。你不仅知道如何重复执行代码，还开始理解“遍历数据”这个非常重要的编程思想。以后处理列表、文件、表格、数据分析结果，甚至机器学习数据集时，for 都会经常出现。"
                ),

                practice(
                    "练习 21：输出 1～100",

                    "使用 for 和 range() 输出 1 到 100。",

                    `# 在这里完成你的代码
`
                ),

                practice(
                    "练习 22：计算总和",

                    "使用 for 计算 1 到 100 的总和。不要直接使用 sum()，先练习循环累加。",

                    `total = 0

# 在这里完成你的代码

print(total)
`
                ),

                practice(
                    "练习 23：计算偶数和",

                    "计算 1～100 中所有偶数的总和。要求使用 for 和条件判断。",

                    `total = 0

# 在这里完成你的代码

print(total)
`
                ),

                practice(
                    "练习 24：九九乘法表",

                    "使用嵌套 for 输出完整的九九乘法表。",

                    `# 在这里完成你的代码
`
                ),

                practice(
                    "练习 25：统计成绩",

                    "遍历一个成绩列表，计算总分、平均分、最高分和最低分。",

                    `scores = [88, 92, 76, 95, 81, 67, 90]

# 在这里完成你的代码
`
                ),

                practice(
                    "练习 26：寻找指定数字",

                    "遍历列表，寻找第一个等于 50 的数字，并输出它的位置。",

                    `numbers = [12, 25, 31, 50, 66, 72]

# 在这里完成你的代码
`
                ),

                {
                    type: "callout",

                    title:
                        "恭喜你，程序已经开始自动工作了",

                    text:
                        "如果你已经能够自己写出 for 循环，并且理解列表中的元素是怎样一个一个进入循环体的，那么你已经跨过了 Python 学习中非常重要的一道门槛。以前，你需要一行一行地告诉程序做什么；现在，你已经可以告诉程序：“把这件事情，对这些数据全部做一遍。”这就是循环真正强大的地方。"
                },

                thinking(
                    "想一想",

                    "如果 names = [\"Alice\", \"Bob\", \"Charlie\"]，那么下面这段代码一共会执行几次 print()？每一次 name 的值分别是什么？如果列表增加到 1000 个名字，代码需要修改吗？为什么？"
                ),

                paragraph(
                    "现在，你已经学会了让程序做选择，也学会了让程序重复处理数据。接下来还会遇到一个更有意思的问题：如果循环进行到一半，我们发现某个条件满足了，能不能提前结束？或者某一次不想处理，能不能直接跳过去？这就是接下来 break 和 continue 要解决的问题。"
                )

            ]
        ),


        /* =================================================
           02-04
           while
        ================================================= */

        lesson(
            "py-02-04",

            "while 循环",

            "理解 while 的条件循环模型，学习循环计数、用户输入和避免无限循环。",

            [

                paragraph(
                    "for 通常适合遍历一组已有的数据，而 while 更适合表达“只要某个条件成立，就继续执行”。因此 while 特别适合用户输入、菜单程序、游戏以及需要等待某个条件发生的场景。"
                ),

                code(
                    `count = 1

while count <= 5:
    print(count)
    count += 1`,
                    "while 基础"
                ),

                paragraph(
                    "while 最重要的一件事情，是确保循环内部最终能够改变条件。否则程序可能永远不会离开循环，这就是常见的无限循环。"
                ),

                code(
                    `count = 1

while count <= 5:
    print(count)
    count += 1`,
                    "让循环条件最终失效"
                ),

                code(
                    `# 不要运行这段代码
#
# count = 1
#
# while count <= 5:
#     print(count)
#
# count 永远没有变化，
# 因此循环永远不会结束。`,
                    "典型无限循环"
                ),

                paragraph(
                    "while 非常适合处理“直到某件事情发生”为止的程序。比如不断要求用户输入，直到用户输入 quit。"
                ),

                code(
                    `while True:

    text = input("请输入内容，输入 quit 退出：")

    if text == "quit":
        break

    print("你输入的是：", text)`,
                    "while + break"
                ),

                paragraph(
                    "while 也经常和计数器一起使用。计数器是初学阶段必须掌握的一个重要模式。"
                ),

                code(
                    `count = 10

while count >= 1:

    print(count)

    count -= 1

print("开始！")`,
                    "倒计时"
                ),

                paragraph(
                    "需要特别注意：count += 1、count -= 1 等写法是在更新变量。while 本身不会自动改变变量。"
                ),

                concepts([
                    "先检查 while 条件",
                    "条件为 True 执行循环体",
                    "循环体执行完后重新检查条件",
                    "条件变成 False 后退出循环",
                    "循环内部通常需要改变某个状态",
                    "break 可以提前结束循环"
                ]),

                practice(
                    "练习 27：倒计时",

                    "使用 while 从 10 倒数到 1，然后输出“开始！”。",

                    `count = 10

# 在这里完成你的代码
`
                ),

                practice(
                    "练习 28：输入直到结束",

                    "不断让用户输入内容。如果输入 quit 就结束，否则输出用户输入的内容。",

                    `while True:

    text = input("请输入内容：")

    # 在这里完成你的代码
`
                ),

                practice(
                    "练习 29：猜数字",

                    "设置一个秘密数字，让用户不断输入数字。如果太大就提示“太大”，太小就提示“太小”，猜中后结束。",

                    `answer = 42

while True:

    guess = int(input("请输入数字："))

    # 在这里完成你的代码
`
                ),

                practice(
                    "练习 30：密码重试",

                    "设置正确密码，最多允许用户输入 3 次。如果输入正确就登录成功，否则达到次数后锁定。",

                    `correct_password = "python123"
attempts = 0

while attempts < 3:

    password = input("请输入密码：")

    # 在这里完成你的代码

    attempts += 1
`
                ),

                thinking(
                    "思考",

                    "什么时候应该使用 for，什么时候应该使用 while？如果你知道循环次数，和不知道循环次数时，通常分别会怎么选择？"
                )

            ]
        ),


        /* =================================================
           02-05
           break / continue
        ================================================= */

        lesson(
            "py-02-05",

            "break、continue 与循环控制",

            "学习如何提前结束循环、跳过当前迭代，以及使用 for...else / while...else 表达搜索结果。",

            [

                paragraph(
                    "循环并不意味着每一次都必须执行到最后。有时候我们已经找到了目标，就应该马上停止；有时候当前元素不需要处理，只需要跳过它继续处理下一个元素。break 和 continue 就是解决这两个问题的。"
                ),

                code(
                    `for number in range(1, 11):

    if number == 6:
        break

    print(number)`,
                    "break：提前结束"
                ),

                paragraph(
                    "break 会结束它所在的最近一层 for 或 while 循环。如果存在嵌套循环，break 只会跳出当前这一层。"
                ),

                code(
                    `for row in range(1, 4):

    for column in range(1, 6):

        if column == 3:
            break

        print(
            f"row={row}, column={column}"
        )`,
                    "嵌套循环中的 break"
                ),

                paragraph(
                    "continue 则完全不同。它不会结束整个循环，而是跳过本次循环剩余的代码，直接进入下一次迭代。"
                ),

                code(
                    `for number in range(1, 11):

    if number % 2 == 0:
        continue

    print(number)`,
                    "continue：跳过偶数"
                ),

                concepts([
                    "break：结束当前循环",
                    "continue：跳过当前迭代",
                    "break 后不会继续下一轮循环",
                    "continue 后会继续下一轮循环",
                    "嵌套循环中的 break 只影响最近的一层"
                ]),

                paragraph(
                    "break 和 continue 最常见的应用之一就是搜索。例如，在列表中寻找第一个满足条件的元素，找到之后就没有必要继续遍历。"
                ),

                code(
                    `numbers = [12, 25, 37, 49, 63, 72]

target = 49

for number in numbers:

    if number == target:
        print("找到：", number)
        break

    print("检查：", number)`,
                    "搜索并提前结束"
                ),

                paragraph(
                    "Python 还有一个很多初学者容易忽略的语法：for...else。这里的 else 并不是“for 没有执行”的意思，而是表示循环正常结束，并且没有因为 break 提前退出。"
                ),

                code(
                    `numbers = [2, 4, 6, 8, 10]

target = 7

for number in numbers:

    if number == target:
        print("找到了")
        break

else:
    print("没有找到")`,
                    "for...else"
                ),

                paragraph(
                    "这个结构非常适合搜索问题。只要找到目标就 break；如果整个循环跑完都没有 break，就执行 else。"
                ),

                code(
                    `numbers = [3, 5, 7, 11, 13]

target = 8

for number in numbers:

    if number == target:
        print("找到目标")
        break

else:
    print("遍历结束：没有找到目标")`,
                    "搜索模式"
                ),

                paragraph(
                    "for...else 也可以用来判断质数。这是 Python 官方 Tutorial 中非常经典的控制流示例。"
                ),

                code(
                    `number = 29

for divisor in range(2, number):

    if number % divisor == 0:
        print(
            number,
            "不是质数，",
            "可以被",
            divisor,
            "整除"
        )
        break

else:
    print(number, "是质数")`,
                    "for...else 判断质数"
                ),

                paragraph(
                    "while 同样可以使用 else。只要 while 没有因为 break 提前结束，而是因为条件变成 False 正常结束，else 就会执行。"
                ),

                code(
                    `count = 1

while count <= 5:

    print(count)

    count += 1

else:
    print("循环正常结束")`,
                    "while...else"
                ),

                practice(
                    "练习 31：寻找第一个满足条件的数字",

                    "在 1～100 中寻找第一个能同时被 7 和 9 整除的数字。找到后立即停止。",

                    `for number in range(1, 101):

    # 在这里完成你的代码
    pass
`
                ),

                practice(
                    "练习 32：寻找目标",

                    "给定一个列表和一个 target，使用 for + break 查找 target。如果找不到，使用 for...else 输出“没有找到”。",

                    `numbers = [12, 18, 25, 31, 47, 59]
target = 31

# 在这里完成你的代码
`
                ),

                practice(
                    "练习 33：只处理有效数据",

                    "给定一组数字，跳过所有负数，只处理正数，并计算正数总和。",

                    `numbers = [10, -5, 20, -3, 8, 15]

total = 0

for number in numbers:

    # 在这里完成你的代码
    pass

print("总和：", total)
`
                ),

                practice(
                    "练习 34：质数检测",

                    "使用 for...else 判断一个数字是否为质数。要求不要直接调用第三方库。",

                    `number = 97

# 在这里完成你的代码
`
                ),

                thinking(
                    "思考",

                    "如果把 for...else 中的 break 删除，else 为什么一定会执行？"
                )

            ]
        ),


        /* =================================================
           02-06
           综合控制流
        ================================================= */

        lesson(
            "py-02-06",

            "综合实战：把控制流组合起来",

            "把比较、条件、for、while、break、continue 和数据处理组合成真正可以运行的小程序。",

            [

                paragraph(
                    "真正写程序时，我们很少只使用一个控制流结构。实际程序通常会把 if、for、while、break、continue 组合起来。"
                ),

                paragraph(
                    "这一节不再单独讲新语法，而是开始训练程序设计能力：先想清楚程序需要做什么，再决定控制流程。"
                ),

                code(
                    `scores = [92, 58, 76, 88, 45, 100, 67]

passed = 0
failed = 0

for score in scores:

    if score < 0 or score > 100:
        print("发现非法成绩：", score)
        continue

    if score >= 60:
        passed += 1
    else:
        failed += 1

print("及格人数：", passed)
print("不及格人数：", failed)`,
                    "综合示例：成绩统计"
                ),

                paragraph(
                    "再看一个更加接近实际程序的例子：一个简单的命令行菜单。用户可以不断选择操作，直到主动退出。"
                ),

                code(
                    `while True:

    print()
    print("====== Python 小工具 ======")
    print("1. 查看欢迎信息")
    print("2. 计算 1 到 100 的总和")
    print("3. 输出 1 到 20 的偶数")
    print("4. 退出")

    choice = input("请选择：")

    if choice == "1":

        print("欢迎学习 Python！")

    elif choice == "2":

        total = 0

        for number in range(1, 101):
            total += number

        print("总和：", total)

    elif choice == "3":

        for number in range(1, 21):

            if number % 2 != 0:
                continue

            print(number)

    elif choice == "4":

        print("程序结束。")
        break

    else:

        print("无效选项，请重新输入。")`,
                    "综合实战：命令行菜单"
                ),

                callout(
                    "程序设计思维",

                    "看到一个问题时，不要马上开始写代码。先问自己：需要判断吗？需要重复吗？什么时候停止？哪些情况应该跳过？这些问题实际上就是在设计控制流程。"
                ),

                paragraph(
                    "最后完成一个真正的小程序：猜数字游戏。这个程序会综合使用变量、输入、比较、if、while、break 和计数。"
                ),

                code(
                    `import random

answer = random.randint(1, 100)

attempts = 0
max_attempts = 7

print("猜数字游戏")
print("我已经想好了一个 1～100 的数字。")
print(f"你最多有 {max_attempts} 次机会。")

while attempts < max_attempts:

    text = input("请输入你的猜测：")

    if not text.isdigit():
        print("请输入一个整数。")
        continue

    guess = int(text)

    attempts += 1

    if guess == answer:

        print(
            f"恭喜你，猜中了！"
            f"一共用了 {attempts} 次。"
        )

        break

    elif guess < answer:

        print("太小了。")

    else:

        print("太大了。")

else:

    print()
    print("机会已经用完。")
    print("正确答案是：", answer)`,
                    "综合实战：猜数字游戏"
                ),

                practice(
                    "练习 35：升级猜数字",

                    "在上面的猜数字游戏基础上增加功能：记录最佳成绩、允许用户重新开始、显示剩余次数，并在输入非法内容时不给程序造成错误。",

                    `import random

while True:

    answer = random.randint(1, 100)
    attempts = 0
    max_attempts = 7

    print()
    print("====== 猜数字游戏 ======")

    # 在这里完成游戏

    again = input("再玩一次？(y/n)：")

    if again.lower() != "y":
        break
`
                ),

                practice(
                    "练习 36：数字统计器",

                    "让用户不断输入数字。输入 quit 后结束。程序最后输出：输入数字的个数、总和、平均值、最大值和最小值。",

                    `numbers = []

while True:

    text = input(
        "请输入数字，输入 quit 结束："
    )

    if text.lower() == "quit":
        break

    # 在这里完成你的代码

print("输入数量：", len(numbers))

# 在这里继续完成统计
`
                ),

                practice(
                    "练习 37：简单 ATM",

                    "实现一个简单 ATM：初始余额为 1000 元。用户可以选择查询余额、存款、取款、退出。取款金额不能超过余额，输入金额必须大于 0。",

                    `balance = 1000

while True:

    print()
    print("====== ATM ======")
    print("1. 查询余额")
    print("2. 存款")
    print("3. 取款")
    print("4. 退出")

    choice = input("请选择：")

    # 在这里完成你的代码
`
                ),

                practice(
                    "练习 38：FizzBuzz",

                    "输出 1～100。如果数字能被 3 整除，输出 Fizz；能被 5 整除，输出 Buzz；同时能被 3 和 5 整除，输出 FizzBuzz；否则输出数字本身。",

                    `for number in range(1, 101):

    # 在这里完成你的代码
    pass
`
                )

            ]
        ),


        /* =================================================
           02-07
           常见错误
        ================================================= */

        lesson(
            "py-02-07",

            "控制流中的常见错误",

            "集中处理初学者最容易遇到的循环和条件判断问题。",

            [

                paragraph(
                    "控制流语法本身并不复杂，但它非常容易产生逻辑错误。很多 Bug 并不是 Python 语法写错，而是程序运行了，但是结果和我们想的不一样。"
                ),

                concepts([
                    "把 = 和 == 混淆",
                    "if 条件写反",
                    "range() 的 stop 不包含在范围内",
                    "while 中忘记更新循环变量",
                    "break 放错位置",
                    "continue 放错位置",
                    "嵌套循环层级理解错误",
                    "循环边界少一次或多一次",
                    "把 and / or 的逻辑关系写错"
                ]),

                code(
                    `# 问题：
# 输出 1 到 5

for number in range(1, 5):
    print(number)

# 实际只会输出：
# 1
# 2
# 3
# 4`,
                    "错误示例：range 边界"
                ),

                paragraph(
                    "range(1, 5) 的结束值 5 不会被包含，因此如果希望输出 1～5，应该使用 range(1, 6)。"
                ),

                code(
                    `for number in range(1, 6):
    print(number)`,
                    "修正"
                ),

                code(
                    `count = 1

while count <= 5:

    print(count)

    # 忘记：
    # count += 1`,
                    "错误示例：无限循环"
                ),

                paragraph(
                    "实际开发中，遇到循环问题时，可以先打印循环变量，观察它到底有没有按照预期变化。"
                ),

                code(
                    `count = 1

while count <= 5:

    print("DEBUG:", count)

    count += 1`,
                    "使用 print 调试循环"
                ),

                practice(
                    "练习 39：修复 range",

                    "下面代码本来想输出 1～10，但是少输出了 10。请修复它。",

                    `for number in range(1, 10):
    print(number)
`
                ),

                practice(
                    "练习 40：修复 while",

                    "下面代码存在无限循环问题，请修改它，让程序输出 1～5 后停止。",

                    `count = 1

while count <= 5:

    print(count)

    # 修复这里
`
                ),

                practice(
                    "练习 41：修复逻辑",

                    "下面代码想判断一个数字是否在 10～20 之间，但逻辑存在问题。请修改。",

                    `number = 15

if number >= 10 or number <= 20:
    print("在范围内")
else:
    print("不在范围内")
`
                )

            ]
        ),


        /* =================================================
           02-08
           本章总结
        ================================================= */

        lesson(
            "py-02-08",

            "本章总结与挑战",

            "把控制流知识整理成自己的思维模型，并完成一个综合挑战。",

            [

                paragraph(
                    "第二章是 Python 入门阶段非常重要的一章。第一章让你能够让 Python 执行代码，而这一章开始让你决定代码应该什么时候执行、执行多少次以及什么时候停止。"
                ),

                concepts([
                    "比较运算产生 True / False",
                    "and / or / not 组合条件",
                    "if / elif / else 选择执行路径",
                    "for 遍历可迭代对象",
                    "range() 产生数字序列",
                    "while 根据条件重复执行",
                    "break 提前结束循环",
                    "continue 跳过当前迭代",
                    "for...else 可以表达搜索失败",
                    "while...else 可以处理正常结束",
                    "嵌套循环可以解决二维或多层重复任务"
                ]),

                checklist([
                    "我能正确区分 = 和 ==",
                    "我能使用 and / or / not",
                    "我理解 Python 的真值测试",
                    "我能写 if / elif / else",
                    "我理解 range() 的 stop 不包含规则",
                    "我能使用 for 遍历列表和字符串",
                    "我能使用 while 写条件循环",
                    "我知道什么时候使用 break",
                    "我知道什么时候使用 continue",
                    "我能理解 for...else",
                    "我能够分析一个简单程序的执行流程"
                ]),

                callout(
                    "最终挑战",

                    "不要照抄前面的例子。自己完成一个“学生成绩分析器”。"
                ),

                paragraph(
                    "程序要求：准备一组学生成绩，例如 [92, 58, 76, 88, 45, 100, 67]。程序需要遍历所有成绩，过滤非法数据，统计有效成绩数量、总分、平均分、最高分、最低分、及格人数和不及格人数。最后根据平均分给出整体评价。"
                ),

                practice(
                    "最终挑战：学生成绩分析器",

                    "要求尽量使用本章学习的控制流。不要直接调用现成的 max()、min()、sum() 完成全部工作，而是练习使用循环自己完成统计。",

                    `scores = [
    92,
    58,
    76,
    88,
    45,
    100,
    67
]

total = 0
count = 0
passed = 0
failed = 0

highest = None
lowest = None

for score in scores:

    # 1. 检查非法数据


    # 2. 更新总分和数量


    # 3. 判断及格


    # 4. 更新最高分


    # 5. 更新最低分


# 6. 计算平均分


# 7. 输出最终报告
`
                ),

                paragraph(
                    "完成这个挑战之后，你应该能够开始阅读大量简单 Python 程序。下一章会进入一个非常重要的主题：函数。"
                ),

                callout(
                    "下一章",

                    "第三章：函数——把程序组织起来。我们会开始学习如何设计函数、传递参数、返回结果、理解作用域，并使用函数完成真正的小型程序。"
                )

            ]
        )

    ]
};