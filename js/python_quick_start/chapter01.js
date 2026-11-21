/* =========================================================
   PYTHON QUICK START
   chapter01.js

   第 01 章：开始使用 Python
   ---------------------------------------------------------
   目标：

   这一章不是让学生背 Python 语法。

   而是建立最基本的 Python 心智模型：

   1. Python 程序是什么
   2. Python 如何执行代码
   3. print() 如何输出
   4. 注释是什么
   5. 变量是什么
   6. 什么是对象
   7. 什么是数据类型
   8. 什么是表达式
   9. 什么是运算符
   10. 如何读取用户输入
   11. 为什么 input() 得到的是字符串
   12. 如何进行类型转换
   13. 如何使用 f-string
   14. 如何把这些知识组合成小程序

   内容参考方向：

   - Python 官方 Tutorial
   - Python 官方语言参考
   - Python 官方 Built-in Functions
   - Python Crash Course
   - Automate the Boring Stuff with Python
   - Effective Python

   注意：
   本课程内容为 Tutorial Studio 自有课程结构，
   不复制上述资料原文。
========================================================= */


/* =========================================================
   CHAPTER META
========================================================= */

export const chapter01 = {

    id: "chapter-01",

    number: "01",

    title: "开始使用 Python",

    englishTitle: "Getting Started with Python",

    description:
        "从 Python 程序、print() 和变量开始，逐步理解对象、数据类型、表达式、字符串、输入、类型转换和 f-string，并通过多个可以直接运行的小程序完成第一次 Python 实战。",

    objectives: [

        "理解 Python 程序和解释器",

        "能够在本地或在线环境中运行 Python 代码",

        "理解缩进和代码块",

        "能够阅读常见错误信息",

        "理解变量与赋值",

        "理解 Python 对象和基本数据类型",

        "掌握 int、float、str、bool、None",

        "掌握基本算术运算",

        "掌握字符串索引和切片",

        "理解程序如何获得外部数据",

        "理解字符串与数字之间的区别",

        "掌握 int()、float()、str() 等基本转换",

        "掌握 f-string",

        "能够编写结构清晰的小程序"

    ],


    sections: [

        /* =================================================
           01-01
        ================================================= */

        {
            id: "py-01-01",

            title: "Python 到底是什么？",

            description:
                "先认识 Python 从哪里来、它为什么会出现，再完成第一次运行，理解缩进、代码块和常见错误。把“看懂概念”和“真正运行代码”连接起来，为后面的语法学习建立一个完整起点。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "如果你第一次接触 Python，可能会有一个很自然的问题：Python 到底是什么？它和我们平时使用的 Word、浏览器、手机 App 又有什么不同？更重要的是，为什么今天有这么多编程语言，我们还要专门学习 Python？"
                },


                {
                    type: "paragraph",

                    text:
                        "简单来说，Python 是一种编程语言。它提供了一套人可以理解和书写的规则，让我们能够告诉计算机应该做什么。我们写下来的这些代码，就是程序的源代码；计算机则通过相应的运行环境理解这些代码，并按照程序的要求完成工作。"
                },


                {
                    type: "heading",

                    text:
                        "Python 从哪里来？"
                },


                {
                    type: "paragraph",

                    text:
                        "Python 并不是最近几年因为人工智能才出现的语言。它诞生于 1980 年代末，由荷兰程序员 Guido van Rossum 开始设计。1991 年，Python 的第一个公开版本发布。"
                },


                {
                    type: "paragraph",

                    text:
                        "在 Python 出现之前，程序员已经拥有了很多成熟的编程语言。但很多语言更强调计算机底层的执行效率，程序员往往需要写出比较复杂的代码才能完成一件并不复杂的事情。Guido van Rossum 希望设计一种更加容易阅读、容易学习，同时又足够强大的语言。"
                },


                {
                    type: "paragraph",

                    text:
                        "Python 的设计从一开始就非常重视代码的可读性。它不希望程序员为了完成一个简单任务，就必须写大量与问题本身无关的代码。这种设计思想后来成为 Python 最重要的特点之一：让程序尽可能接近人的思考方式。"
                },


                {
                    type: "paragraph",

                    text:
                        "Python 这个名字也很有意思。它并不是因为这种语言和蛇有什么关系，而是来自 Guido van Rossum 喜爱的英国喜剧团体 Monty Python。因此，Python 的官方文档和社区中经常可以看到一些与 Monty Python 有关的幽默元素。"
                },


                {
                    type: "heading",

                    text:
                        "Python 为什么越来越流行？"
                },


                {
                    type: "paragraph",

                    text:
                        "Python 并不是一开始就统治整个编程世界。它经历了很长时间的发展，逐渐进入 Web 开发、系统管理、科学计算、数据分析、自动化等领域。随着第三方库和开发工具越来越丰富，Python 能够完成的事情也越来越多。"
                },


                {
                    type: "paragraph",

                    text:
                        "后来，数据科学、机器学习和人工智能快速发展，大量相关工具开始使用 Python。NumPy、pandas、Matplotlib、PyTorch 等工具，让 Python 不再只是一个适合写小脚本的语言，而逐渐成为数据分析、科学计算和人工智能领域的重要工具。"
                },


                {
                    type: "paragraph",

                    text:
                        "今天我们学习 Python，并不意味着以后只能做 Python 开发。恰恰相反，Python 很适合作为学习编程的第一门语言，因为它能够让初学者把更多注意力放在程序本身，而不是被大量复杂的语法细节分散精力。"
                },


                {
                    type: "callout",

                    title:
                        "一个重要的认识",

                    text:
                        "学习 Python 的目的，不是记住几百个函数，也不是背完所有语法。真正重要的是学会把一个现实问题拆解成计算机可以执行的一系列步骤。"
                },


                {
                    type: "heading",

                    text:
                        "Python 和我们写下来的代码是什么关系？"
                },


                {
                    type: "paragraph",

                    text:
                        "接下来，我们把刚才比较抽象的概念具体化。假设我们写下这样一行代码：print(\"Hello, Python!\")。这行文字本身就是 Python 源代码。它还没有产生任何结果，只是我们告诉 Python：请把一段文字输出出来。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "第一个 Python 程序",

                    code:
                        `print("Hello, Python!")
print("这是我的第一个 Python 程序。")
print(2026)`
                },


                {
                    type: "paragraph",

                    text:
                        "当程序运行以后，Python 会读取这些代码，并按照 Python 的规则执行。第一行要求输出 Hello, Python!，第二行要求输出一段中文，第三行则要求输出数字 2026。最终，我们会在运行结果中看到对应的三行内容。"
                },


                {
                    type: "paragraph",

                    text:
                        "这里可以先建立一个非常重要的认识：我们写的是源代码，Python 运行环境负责理解和执行这些代码，而屏幕上出现的文字则是程序运行产生的结果。以后学习变量、条件判断、循环和函数时，我们实际上一直都在重复这个过程：写代码、运行、观察结果。"
                },


                {
                    type: "concepts",

                    items: [

                        "源代码：我们写下来的 Python 程序",

                        "Python 解释器：负责读取并执行 Python 代码的程序",

                        "语句：程序中的一条指令",

                        "表达式：可以计算出一个值的代码",

                        "变量：程序中用于引用数据的名字",

                        "函数：可以重复调用的一段代码"

                    ]
                },


                {
                    type: "paragraph",

                    text:
                        "你上面看到的 Python 代码，也是按照这个过程运行的。你修改代码以后点击运行，代码会被发送到 Python 运行服务，由 Python 环境执行，再把执行结果返回到页面上。"
                },


                {
                    type: "paragraph",

                    text:
                        "所以后面的学习不会只是阅读代码。你会不断经历一个循环：先理解一个概念，再自己写几行代码，运行它，观察发生了什么，然后修改代码重新运行。编程真正有意思的地方，也正是在这个不断尝试和反馈的过程中。"
                },


                {
                    type: "heading",

                    level: 3,

                    text:
                        "第一次真正运行 Python"
                },

                {
                    type: "paragraph",

                    text:
                        "学习 Python 最重要的动作不是继续往下读，而是亲手运行一段代码。你可以直接使用本页的在线运行器，也可以在自己的电脑上安装 Python 3.10 或更高版本。在线运行器适合快速验证，本地环境适合保存项目、安装第三方库和调试完整程序。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "第一个程序",

                    code:
                        `print("Hello, Python!")
print("这是我的第一个程序")`
                },

                {
                    type: "paragraph",

                    text:
                        "如果在自己电脑上运行，可以把代码保存为 first_program.py，然后在文件所在目录打开终端。先确认 Python 已安装，再执行这个文件。"
                },

                {
                    type: "code",

                    language: "bash",

                    runnable: false,

                    title: "在终端运行 Python 文件",

                    code:
                        `python --version
python first_program.py`
                },

                {
                    type: "paragraph",

                    text:
                        "不同系统的命令可能略有差异：Windows 上如果 python 命令不可用，可以尝试 py first_program.py；macOS 或 Linux 上通常可以使用 python3 first_program.py。关键是先确认自己运行的是 Python 3，而不是旧版本。"
                },

                {
                    type: "attention",

                    title: "在线运行器和本地 Python 不完全一样",

                    text:
                        "在线运行器不需要安装，打开页面就能执行代码，但它运行在服务器提供的受限环境中。本地 Python 由你自己控制，可以保存文件、安装依赖、读取本地资源。初学阶段可以先用在线运行器验证语法，再逐步过渡到本地项目。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "缩进不是排版，是 Python 语法"
                },

                {
                    type: "paragraph",

                    text:
                        "在 Python 中，缩进决定哪些语句属于同一个代码块。通常使用 4 个空格作为一级缩进。不要在同一份代码里混用 Tab 和空格，否则很容易出现 IndentationError。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "观察缩进",

                    code:
                        `if True:
    print("这一行属于 if 代码块")
print("这一行不属于 if 代码块")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里出现了 if，下一章会正式学习条件判断。现在不需要掌握 if 的全部规则，只需要先观察：缩进不同的两行 print()，在程序结构中的位置并不相同。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "遇到报错，先看最后一行"
                },

                {
                    type: "concepts",

                    items: [
                        "SyntaxError：括号、引号、冒号等符号没有正确配对。",
                        "IndentationError：缩进层级不一致，或者混用了 Tab 和空格。",
                        "NameError：使用了没有定义过的变量名或函数名。",
                        "TypeError：对数据执行了不适合该类型的操作。"
                    ]
                },

                {
                    type: "paragraph",

                    text:
                        "Python 的报错并不是在否定你，而是在告诉你程序走到哪里、遇到了什么问题。先看最后一行的错误类型，再往上看它指出的代码行号，通常就能定位大部分入门问题。"
                },




                {
                    type: "practice",

                    title: "练习 1：第一次运行 Python",

                    description:
                        "修改下面的程序，让它输出你的姓名、城市、年龄以及一句你想对未来的自己说的话。至少输出 4 行。",

                    starterCode:
                        `print("姓名：")
print("城市：")
print("年龄：")
print("给未来的自己：")`
                },


                {
                    type: "thinking",

                    title: "想一想",

                    description:
                        "如果把 print(\"Hello\") 和 print(\"Python\") 写成两条语句，程序会按照什么顺序执行？如果交换它们的位置，输出结果会不会发生变化？"
                },


                {
                    type: "paragraph",

                    text:
                        "到这里，你不需要记住 Python 的所有历史，也不需要马上掌握大量语法。你只需要先记住一件事：Python 是一种帮助我们把想法转换成计算机可以执行步骤的工具。接下来，我们就从最基本的 Python 语法开始，一步一步看看这些代码到底是怎样工作的。"
                }

            ]
        },


        /* =================================================
           01-02
        ================================================= */

        {
            id: "py-01-02",

            title: "print()：让程序输出信息",

            description:
                "深入认识 print()，学习一次输出多个值、换行、分隔符以及基本输出控制。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "上一节中，我们已经让 Python 第一次运行起来了。接下来，我们开始认识一个非常重要、也非常常用的函数：print()。"
                },

                {
                    type: "paragraph",

                    text:
                        "如果把一个程序看成一个正在工作的机器，那么我们不仅需要让它计算，还需要知道它计算出了什么。print() 就是 Python 提供给我们的一个非常直接的方式：让程序把信息输出出来。"
                },

                {
                    type: "paragraph",

                    text:
                        "你会在后面的学习中反复看到 print()。调试程序时，我们可以用它观察变量的值；学习新的语法时，可以用它检查程序运行的结果；编写一个小程序时，也可以用它把最终结果展示给用户。"
                },


                {
                    type: "heading",

                    level: 3,

                    text: "最简单的输出"
                },

                {
                    type: "paragraph",

                    text:
                        "最简单的 print() 用法，就是把一个值放进括号里。Python 执行这条语句以后，就会把这个值显示在输出区域。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "输出一段文字",

                    code:
                        `print("Hello Python")
print("你好，Python")
print("我正在学习编程")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的 \"Hello Python\"、\"你好，Python\" 和 \"我正在学习编程\" 都是字符串。字符串就是一段文本，我们会在后面的课程中专门学习它。现在你只需要知道：把文本放在引号里面，就可以让 Python 把这段文本输出出来。"
                },

                {
                    type: "attention",

                    title: "注意",

                    description:
                        "print() 的括号不能省略，字符串两边的引号也不能随意删除。print(\"Hello\") 和 print(Hello) 对 Python 来说是完全不同的写法。"
                },


                {
                    type: "heading",

                    level: 3,

                    text: "print() 不只能输出文字"
                },

                {
                    type: "paragraph",

                    text:
                        "print() 不只能输出字符串。它也可以输出数字、变量以及其他 Python 对象。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "输出数字",

                    code:
                        `print(10)
print(3.14)
print(2026)`
                },

                {
                    type: "paragraph",

                    text:
                        "注意数字没有放在引号里面。print(10) 输出的是数字 10，而 print(\"10\") 输出的是字符串 \"10\"。虽然它们显示出来看起来一样，但它们在 Python 中属于不同的数据类型。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "文字和数字",

                    code:
                        `print("年龄：")
print(20)

print("今年是")
print(2026)`
                },

                {
                    type: "paragraph",

                    text:
                        "这种写法当然可以工作，但如果我们希望把文字和数据放在同一行，就需要让 print() 一次输出多个值。"


                },


                {
                    type: "heading",

                    level: 3,

                    text: "一次输出多个值"
                },

                {
                    type: "paragraph",

                    text:
                        "print() 可以同时接收多个值。只需要在括号里面使用逗号，把它们分开即可。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "一次输出多个值",

                    code:
                        `name = "Alice"
age = 20

print(name, age)
print("姓名：", name)
print("年龄：", age)`
                },

                {
                    type: "paragraph",

                    text:
                        "运行这段代码，你会发现多个值出现在了同一行，而且不同值之间默认会有一个空格。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "默认的空格",

                    code:
                        `print("Python", "JavaScript", "HTML")
print("A", "B", "C")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的逗号并不是让 Python 输出一个逗号。它的作用是告诉 print()：这里有多个需要输出的值。print() 会按照一定的规则把这些值组合起来。"
                },


                {
                    type: "heading",

                    level: 3,

                    text: "sep：控制值之间的分隔符"
                },

                {
                    type: "paragraph",

                    text:
                        "刚才我们看到，print() 默认会使用一个空格分隔多个值。如果我们不希望使用空格，就可以使用 sep 参数。"
                },

                {
                    type: "paragraph",

                    text:
                        "sep 是 separator 的缩写，可以理解为“分隔符”。它决定 print() 在多个值之间放什么内容。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "sep 参数",

                    code:
                        `print("2026", "10", "05", sep="-")
print("Python", "JavaScript", "HTML", sep=" | ")
print("A", "B", "C", sep="---")`
                },

                {
                    type: "paragraph",

                    text:
                        "例如第一条语句会把三个值用短横线连接起来。原本的三个值之间不是空格，而变成了 \"-\"。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "sep 的效果",

                    code:
                        `print("2026", "10", "05")
print("2026", "10", "05", sep="-")

print("姓名", "Alice")
print("姓名", "Alice", sep="：")`
                },

                {
                    type: "paragraph",

                    text:
                        "这说明 sep 并不会改变我们真正输出的值，它只是改变这些值之间如何连接。"
                },


                {
                    type: "heading",

                    level: 3,

                    text: "end：控制输出结束的位置"
                },

                {
                    type: "paragraph",

                    text:
                        "除了控制值与值之间的分隔方式，print() 还可以控制一条输出结束以后发生什么。"
                },

                {
                    type: "paragraph",

                    text:
                        "默认情况下，print() 输出完成以后会换行。也就是说，下一次 print() 会从下一行开始。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "默认会换行",

                    code:
                        `print("Hello")
print("Python")
print("World")`
                },

                {
                    type: "paragraph",

                    text:
                        "如果希望输出结束以后不要换行，可以使用 end 参数。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "end 参数",

                    code:
                        `print("Hello", end=" ")
print("Python")

print("A", end="")
print("B", end="")
print("C")`
                },

                {
                    type: "paragraph",

                    text:
                        "在第一组代码中，end=\" \" 表示输出 Hello 后不要换行，而是在结尾放一个空格，所以第二个 print() 会继续出现在同一行。"
                },

                {
                    type: "paragraph",

                    text:
                        "第二组代码中，end=\"\" 表示什么都不添加。因此三个 print() 会连续输出，最终得到 ABC。"
                },


                {
                    type: "heading",

                    level: 3,

                    text: "sep 和 end 有什么区别？"
                },

                {
                    type: "paragraph",

                    text:
                        "现在可以把 sep 和 end 放在一起比较。它们控制的是 print() 的两个不同位置。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "两个参数的区别",

                    code:
                        `print("A", "B", "C", sep="-")
print("Hello", end=" ")
print("Python")`
                },

                {
                    type: "paragraph",

                    text:
                        "sep 控制的是一次 print() 内部，多个值之间的内容；end 控制的是这一次 print() 输出完成以后，结尾添加什么内容。"
                },

                {
                    type: "diagram",

                    title: "print() 的输出结构",

                    description:
                        "理解 sep 和 end 的位置，可以帮助你更容易记住它们的作用。",

                    html: `
                <div class="preface-flow">

                    <div class="preface-flow-item">
                        <strong>值</strong>
                        <span>"A"</span>
                    </div>

                    <div class="preface-flow-arrow">
                        sep
                    </div>

                    <div class="preface-flow-item">
                        <strong>值</strong>
                        <span>"B"</span>
                    </div>

                    <div class="preface-flow-arrow">
                        sep
                    </div>

                    <div class="preface-flow-item">
                        <strong>值</strong>
                        <span>"C"</span>
                    </div>

                    <div class="preface-flow-arrow">
                        end
                    </div>

                </div>
            `
                },


                {
                    type: "heading",

                    level: 3,

                    text: "把它们组合起来"
                },

                {
                    type: "paragraph",

                    text:
                        "当我们同时使用多个值、sep 和 end 时，就可以对输出结果进行更加精细的控制。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "组合使用",

                    code:
                        `name = "Alice"
city = "Taipei"
age = 20

print("姓名", name, sep="：")
print("城市", city, sep="：")
print("年龄", age, sep="：")

print("Python", end=" → ")
print("数据处理", end=" → ")
print("机器学习")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里已经开始出现一个非常重要的编程思想：同一个函数并不一定只有一种固定的使用方式。通过参数，我们可以告诉函数，希望它按照什么方式完成工作。"
                },

                {
                    type: "note",

                    title: "现在先记住这三个规则",

                    description:
                        "print(value)：输出一个值；print(a, b)：一次输出多个值；sep 和 end：分别控制值之间的分隔方式，以及输出结束后的内容。"
                },


                {
                    type: "think",

                    title: "想一想",

                    description:
                        "如果把 print(\"Hello Python\") 拆开写成两条语句，分别是 print(\"Hello\") 和 print(\"Python\")，Python 会按照什么顺序执行这两条语句？如果交换它们的位置，输出结果会发生什么变化？"
                },


                {
                    type: "practice",

                    title: "练习 1：制作标题",

                    description:
                        "使用 print() 输出一个简单的个人主页标题。要求至少使用一次 sep 或 end。",

                    starterCode:
                        `print("==========")
print("我的 Python 主页")
print("==========")`
                },


                {
                    type: "practice",

                    title: "练习 2：输出一张表格",

                    description:
                        "使用 print() 输出三行商品信息，每行包含商品名称、价格和数量。尝试使用 sep=\" | \"。",

                    starterCode:
                        `print("商品", "价格", "数量", sep=" | ")
print("Python书", 59.9, 2, sep=" | ")
print("键盘", 199, 1, sep=" | ")`
                },


                {
                    type: "practice",

                    title: "练习 3：制作个人信息卡",

                    description:
                        "使用 print() 输出姓名、城市、年龄和职业。要求每一项都使用“标签 + 数据”的形式，并至少使用一次 sep。",

                    starterCode:
                        `name = "Alice"
city = "Taipei"
age = 20
job = "Student"

print("姓名", name, sep="：")
print("城市", city, sep="：")
print("年龄", age, sep="：")
print("职业", job, sep="：")`
                },


                {
                    type: "paragraph",

                    text:
                        "到这里，你已经不只是知道 print()“可以输出东西”了。你已经开始理解函数、参数以及程序输出之间的关系。"
                },

                {
                    type: "paragraph",

                    text:
                        "在后面的课程中，我们会越来越频繁地使用 print() 来观察程序运行的过程。尤其是在学习变量、条件判断、循环和函数时，print() 会成为一个非常有用的工具。"
                },

                {
                    type: "callout",

                    title: "这一节真正需要掌握的",

                    content:
                        "print() 可以输出文本、数字和变量；多个值可以同时输出；sep 控制值之间的分隔符；end 控制输出结束后的内容。更重要的是，开始习惯通过运行程序和观察输出结果来理解代码。"
                }

            ]
        },


        /* =================================================
           01-03
        ================================================= */

        {
            id: "py-01-03",

            title: "注释：给代码写说明",

            description:
                "理解注释为什么存在，以及如何使用单行注释、代码说明和文档字符串，让程序更容易阅读和维护。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "程序不仅是写给计算机执行的，也是写给人阅读的。当代码越来越长，仅仅依靠代码本身，往往很难快速理解它为什么这样写。注释就是程序员留在代码中的说明文字。"
                },


                {
                    type: "paragraph",

                    text:
                        "Python 执行程序时，会忽略以 # 开头的单行注释。因此，注释不会参与程序的计算，也不会改变正常的执行结果。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "最简单的注释",

                    code:
                        `# 这是一个注释

print("Hello Python")

# Python 会执行上面的 print
# 但不会执行这些注释文字`
                },


                {
                    type: "attention",

                    title: "注意",

                    description:
                        "注释不会被 Python 当作普通代码执行。以 # 开头的内容通常只用于帮助程序员理解代码。"
                },


                {
                    type: "paragraph",

                    text:
                        "最常见的注释方式是在代码前面使用 #。如果一行代码后面还有注释，也可以把 # 写在代码后面。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "行尾注释",

                    code:
                        `name = "Alice"      # 用户姓名
age = 20              # 用户年龄

print(name)
print(age)`
                },


                {
                    type: "paragraph",

                    text:
                        "注释最重要的价值不是解释代码“做了什么”，而是在必要的时候解释代码“为什么这样做”。如果代码本身已经非常清楚，就没有必要再写一条完全重复的注释。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "什么是重复注释",

                    code:
                        `# 定义年龄
age = 20

# 判断年龄是否大于等于 18
is_adult = age >= 18

# 输出结果
print(is_adult)`
                },


                {
                    type: "paragraph",

                    text:
                        "上面的注释并没有错，但它们几乎只是把代码翻译成中文。更有价值的注释，应该告诉阅读代码的人一些仅靠代码不容易看出来的信息。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "解释为什么这样写",

                    code:
                        `price = 99.9
quantity = 3

# 新用户首次购买可以享受 8 折优惠
discount = 0.8

total = price * quantity * discount

print(total)`
                },


                {
                    type: "thinking",

                    title: "想一想",

                    text:
                        "如果把上面的注释删除，程序还能正常运行吗？如果答案是可以，那么注释对程序本身有什么作用？"
                },


                {
                    type: "paragraph",

                    text:
                        "注释还可以暂时关闭一小段代码。把代码前面加上 # 后，Python 就不会执行这一行。这种方式有时被称为“注释掉代码”。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "暂时关闭代码",

                    code:
                        `print("开始运行")

# print("这一行暂时不运行")

print("程序结束")`
                },


                {
                    type: "attention",

                    title: "不要滥用注释掉的代码",

                    description:
                        "开发过程中可以暂时注释掉代码进行测试，但长期保留大量已经不用的代码会让程序越来越难阅读。如果确定不再需要，通常应该直接删除。"
                },


                {
                    type: "paragraph",

                    text:
                        "除了使用 # 写普通注释，Python 还经常使用三引号字符串来编写多行说明。特别是在函数、类和模块中，这种字符串可以作为文档字符串，也就是 docstring。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "函数中的 docstring",

                    code:
                        `def greet(name):
    """
    根据姓名生成一条问候语。
    """
    return f"你好，{name}！"


print(greet("Alice"))`
                },


                {
                    type: "paragraph",

                    text:
                        "docstring 与普通 # 注释的用途并不完全相同。普通注释主要用于解释代码，而 docstring 通常用于描述函数、类或者模块的用途，让其他程序员知道这个对象是做什么的。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "描述函数的作用",

                    code:
                        `def calculate_total(price, quantity):
    """
    根据商品单价和数量计算总价。
    """
    return price * quantity


total = calculate_total(99, 3)

print(total)`
                },


                {
                    type: "paragraph",

                    text:
                        "函数的 docstring 还可以通过 __doc__ 访问。这也是它和普通注释的一个重要区别。普通 # 注释不会成为 Python 对象的一部分，而 docstring 可以被程序读取。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "读取 docstring",

                    code:
                        `def greet(name):
    """
    返回一条问候语。
    """
    return f"你好，{name}！"


print(greet.__doc__)`
                },


                {
                    type: "concepts",

                    items: [
                        "普通注释：使用 #，主要帮助程序员理解代码。",
                        "行尾注释：写在代码后面，用于补充说明。",
                        "docstring：使用字符串描述函数、类或模块。",
                        "好注释：重点解释代码为什么这样设计。",
                        "坏注释：只是机械重复代码已经表达出来的信息。"
                    ]
                },


                {
                    type: "note",

                    title: "记住这一点",

                    description:
                        "注释的目标不是让代码看起来更“复杂”，而是让未来的自己和其他程序员更容易理解代码。代码越清楚，需要解释的地方反而越少。"
                },


                {
                    type: "practice",

                    title: "练习 4：给程序加注释",

                    description:
                        "给下面程序增加 3 条有意义的注释。不要只是写“定义变量”“计算结果”“输出结果”这种重复代码的注释。尝试解释这个程序中的业务规则或计算目的。",

                    starterCode:
                        `price = 99.9
quantity = 3
discount = 0.8

total = price * quantity * discount

print(total)`
                },


                {
                    type: "practice",

                    title: "练习 5：编写一个带 docstring 的函数",

                    description:
                        "创建一个 calculate_average() 函数，接收两个数字并返回它们的平均值。为函数添加一段简短的 docstring，然后调用函数并输出结果。",

                    starterCode:
                        `def calculate_average(a, b):
    """
    在这里写函数说明
    """
    return (a + b) / 2


result = calculate_average(80, 90)

print(result)`
                },


                {
                    type: "practice",

                    title: "练习 6：区分注释和代码",

                    description:
                        "观察下面的程序，尝试判断哪些内容会被 Python 执行，哪些内容只是给程序员看的说明。然后运行程序验证你的判断。",

                    starterCode:
                        `# 计算两个数字的和

a = 10
b = 20

# result 保存最终计算结果
result = a + b

# print 用于显示结果
print(result)`
                },


                {
                    type: "thinking",

                    title: "最后想一想",

                    text:
                        "如果一段代码必须写很多注释才能让别人看懂，那么问题一定是“注释写得不够多”吗？有没有可能应该先把代码本身改得更加清楚？"
                },


                {
                    type: "callout",

                    title: "本节小结",

                    text:
                        "注释是程序员和程序员之间沟通的一种方式。使用 # 可以编写普通注释，使用 docstring 可以描述函数、类和模块。写注释时，不要机械翻译代码，而应该优先解释代码背后的原因、规则和设计意图。"
                }

            ]
        },


        /* =================================================
           01-04
        ================================================= */

        {
            id: "py-01-04",

            title: "变量与赋值",

            description:
                "理解为什么程序需要变量，认识变量、对象、赋值和内存之间的关系，建立 Python 最重要的基础心智模型之一。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "前面我们已经学会了如何让 Python 输出文字和数字。但是，一个真正的程序不会只输出固定的数据。程序通常需要记住很多信息，例如用户的名字、年龄、商品价格、游戏分数以及计算过程中的结果。"
                },


                {
                    type: "paragraph",

                    text:
                        "如果每次使用数据都把具体内容直接写在代码里，程序会越来越难修改。因此，我们需要一种办法给数据起一个名字。这个名字，就是变量名。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "没有变量会怎么样？",

                    code:
                        `print("Alice")
print("Alice")
print("Alice")`
                },


                {
                    type: "paragraph",

                    text:
                        "如果我们以后想把 Alice 改成 Bob，就需要找到所有出现 Alice 的地方并进行修改。变量可以让我们只保存一次数据，然后在程序的其他地方重复使用它。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "使用变量",

                    code:
                        `name = "Alice"

print(name)
print(name)
print(name)`
                },


                {
                    type: "paragraph",

                    text:
                        "这里的 name 就是一个变量名。我们可以把它理解成程序里的一个名字，而 \"Alice\" 是这个名字当前关联的数据。"
                },


                {
                    type: "attention",

                    title: "先记住变量是什么",

                    description:
                        "初学阶段，可以先把变量理解成“给数据起的一个名字”。以后我们会逐渐看到，Python 的变量并不是一个简单的盒子，而是一个指向对象的名字。"
                },


                {
                    type: "paragraph",

                    text:
                        "那么，执行 name = \"Alice\" 的时候，Python 到底做了什么？可以先用一个非常简单的模型理解：Python 在内存中准备好表示 \"Alice\" 的数据，然后让名字 name 与这个数据建立关联。"
                },


                {
                    type: "animation",

                    title: "变量赋值发生了什么？",

                    duration: 2400,

                    html:
                        `
                <div class="variable-animation">

                    <div class="va-code">
                        <span class="va-code-keyword">
                            name
                        </span>

                        <span class="va-code-operator">
                            =
                        </span>

                        <span class="va-code-value">
                            "Alice"
                        </span>
                    </div>


                    <div class="va-flow">

                        <div class="va-variable-box">

                            <div class="va-box-label">
                                变量名
                            </div>

                            <div class="va-box-value">
                                name
                            </div>

                        </div>


                        <div class="va-arrow">
                            →
                        </div>


                        <div class="va-memory-box">

                            <div class="va-box-label">
                                内存中的对象
                            </div>

                            <div class="va-object-type">
                                str
                            </div>

                            <div class="va-object-value">
                                "Alice"
                            </div>

                        </div>

                    </div>


                    <div class="va-explanation">

                        <div class="va-step">

                            <strong>①</strong>

                            Python 看到变量名
                            <b>name</b>

                        </div>


                        <div class="va-step">

                            <strong>②</strong>

                            Python 准备字符串对象
                            <b>"Alice"</b>

                        </div>


                        <div class="va-step">

                            <strong>③</strong>

                            让变量
                            <b>name</b>
                            与这个对象建立关联

                        </div>


                        <div class="va-step">

                            <strong>④</strong>

                            以后使用
                            <b>name</b>
                            时，Python 就可以找到这个对象

                        </div>

                    </div>

                </div>
                `,

                    css:
                        `
                .variable-animation {

                    box-sizing: border-box;

                    width: 100%;

                    padding: 24px;

                    background: #f7f9fc;

                    border: 1px solid #dce4ec;

                    border-radius: 8px;

                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        sans-serif;

                }


                .va-code {

                    display: inline-flex;

                    align-items: center;

                    gap: 8px;

                    padding: 10px 14px;

                    margin-bottom: 28px;

                    background: #202833;

                    border-radius: 6px;

                    color: #ffffff;

                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;

                    font-size: 14px;

                }


                .va-code-keyword {

                    color: #8ecbff;

                }


                .va-code-operator {

                    color: #ffffff;

                }


                .va-code-value {

                    color: #b7e4a8;

                }


                .va-flow {

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 18px;

                    min-height: 150px;

                }


                .va-variable-box,
                .va-memory-box {

                    box-sizing: border-box;

                    min-width: 150px;

                    padding: 16px;

                    background: #ffffff;

                    border: 1px solid #ccd7e2;

                    border-radius: 8px;

                    text-align: center;

                    box-shadow:
                        0 4px 14px rgba(
                            30,
                            50,
                            70,
                            0.06
                        );

                }


                .va-memory-box {

                    min-width: 190px;

                }


                .va-box-label {

                    margin-bottom: 8px;

                    color: #7a8794;

                    font-size: 11px;

                }


                .va-box-value {

                    color: #1f2d3d;

                    font-size: 18px;

                    font-weight: 600;

                }


                .va-object-type {

                    margin-bottom: 5px;

                    color: #7c8b99;

                    font-size: 11px;

                }


                .va-object-value {

                    color: #2563eb;

                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;

                    font-size: 18px;

                    font-weight: 600;

                }


                .va-arrow {

                    color: #7d8b99;

                    font-size: 26px;

                }


                .va-explanation {

                    display: grid;

                    gap: 8px;

                    margin-top: 22px;

                }


                .va-step {

                    padding: 9px 12px;

                    background: #ffffff;

                    border-radius: 5px;

                    color: #596776;

                    font-size: 12px;

                    line-height: 1.7;

                }


                .va-step strong {

                    margin-right: 5px;

                    color: #2563eb;

                }


                .va-step b {

                    color: #1f2d3d;

                }


                @media (max-width: 600px) {

                    .variable-animation {

                        padding: 16px;

                    }


                    .va-flow {

                        flex-direction: column;

                        gap: 10px;

                    }


                    .va-arrow {

                        transform: rotate(90deg);

                    }


                    .va-variable-box,
                    .va-memory-box {

                        width: 100%;

                    }

                }
                `,

                    js:
                        `
                const animation =
                    animationRoot.querySelector(
                        ".variable-animation"
                    );

                if (animation) {

                    const steps =
                        animation.querySelectorAll(
                            ".va-step"
                        );

                    steps.forEach(
                        (step, index) => {

                            step.style.opacity = "0";

                            step.style.transform =
                                "translateY(8px)";

                            setTimeout(
                                () => {

                                    step.style.transition =
                                        "all 0.4s ease";

                                    step.style.opacity = "1";

                                    step.style.transform =
                                        "translateY(0)";

                                },
                                300 + index * 500
                            );

                        }
                    );

                }
                `
                },


                {
                    type: "paragraph",

                    text:
                        "这里暂时不需要记住复杂的内存原理。你只需要知道：程序运行时，数据需要存放在计算机的内存中，而变量提供了一个方便的名字，让我们能够找到并使用这些数据。"
                },


                {
                    type: "note",

                    title: "关于内存",

                    description:
                        "可以把内存简单理解成程序运行时存放数据的地方。变量并不是数据本身，而是程序访问数据时使用的名字。"
                },


                {
                    type: "paragraph",

                    text:
                        "接下来再看 =。Python 中的 = 叫做赋值运算符。它和数学中的等号并不完全一样。写成 name = \"Alice\"，并不是在问“name 是否等于 Alice”，而是在告诉 Python：让 name 关联到 \"Alice\"。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "赋值不是数学等号",

                    code:
                        `age = 20

print(age)`
                },


                {
                    type: "paragraph",

                    text:
                        "赋值通常可以理解成一个从右向左发生的过程。Python 会先得到右边的值，再让左边的变量名与这个值建立关联。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "先计算，再赋值",

                    code:
                        `price = 100
quantity = 3

total = price * quantity

print(total)`
                },


                {
                    type: "paragraph",

                    text:
                        "执行 total = price * quantity 时，Python 会先找到 price 和 quantity 当前对应的数据，计算 100 × 3，得到 300，然后让 total 与计算得到的结果建立关联。"
                },


                {
                    type: "animation",
                    title: "total = price * quantity",
                    duration: 1600,

                    html:
                        `
                <div class="assignment-animation">

                    <div class="aa-code">
                        total = price * quantity
                    </div>


                    <div class="aa-row">

                        <div class="aa-item">
                            <div class="aa-name">
                                price
                            </div>

                            <div class="aa-value">
                                100
                            </div>
                        </div>


                        <div class="aa-symbol">
                            ×
                        </div>


                        <div class="aa-item">
                            <div class="aa-name">
                                quantity
                            </div>

                            <div class="aa-value">
                                3
                            </div>
                        </div>


                        <div class="aa-symbol">
                            =
                        </div>


                        <div class="aa-item aa-result">
                            <div class="aa-name">
                                total
                            </div>

                            <div class="aa-value">
                                300
                            </div>
                        </div>

                    </div>


                    <div class="aa-caption">
                        先找到数据 → 计算 → 得到结果 → 让 total 关联结果
                    </div>

                </div>
                `,

                    css:
                        `
                .assignment-animation {

                    box-sizing: border-box;

                    width: 100%;

                    padding: 24px;

                    background: #f7f9fc;

                    border: 1px solid #dce4ec;

                    border-radius: 8px;

                }


                .aa-code {

                    margin-bottom: 24px;

                    padding: 11px 14px;

                    background: #202833;

                    border-radius: 6px;

                    color: #ffffff;

                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;

                    font-size: 13px;

                }


                .aa-row {

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 12px;

                    flex-wrap: wrap;

                }


                .aa-item {

                    min-width: 82px;

                    padding: 12px;

                    background: #ffffff;

                    border: 1px solid #d5dee7;

                    border-radius: 7px;

                    text-align: center;

                }


                .aa-name {

                    margin-bottom: 5px;

                    color: #7a8794;

                    font-size: 11px;

                }


                .aa-value {

                    color: #1f2d3d;

                    font-size: 18px;

                    font-weight: 600;

                }


                .aa-symbol {

                    color: #8492a0;

                    font-size: 20px;

                }


                .aa-result {

                    border-color: #9dbce0;

                    background: #f2f7ff;

                }


                .aa-caption {

                    margin-top: 20px;

                    text-align: center;

                    color: #687786;

                    font-size: 12px;

                }


                @media (max-width: 600px) {

                    .aa-row {

                        gap: 8px;

                    }

                    .aa-item {

                        min-width: 65px;

                    }

                }
                `,

                    js:
                        `
                const box =
                    animationRoot.querySelector(
                        ".assignment-animation"
                    );

                if (box) {

                    const items =
                        box.querySelectorAll(
                            ".aa-item"
                        );

                    items.forEach(
                        (item, index) => {

                            item.style.opacity = "0";

                            setTimeout(
                                () => {

                                    item.style.transition =
                                        "opacity 0.4s ease";

                                    item.style.opacity = "1";

                                },
                                index * 400
                            );

                        }
                    );

                }
                `
                },


                {
                    type: "paragraph",

                    text:
                        "变量最大的价值之一，是让程序可以在运行过程中保存不断变化的数据。变量保存的数据发生变化时，我们可以让变量重新关联到新的数据。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "变量可以重新赋值",

                    code:
                        `score = 60

print(score)

score = 90

print(score)`
                },


                {
                    type: "paragraph",

                    text:
                        "这里不是把数字 60 直接“变成”90，而是变量 score 原来关联 60，后来又重新关联到了 90。对于初学者来说，可以先把它理解成：变量的指向发生了变化。"
                },


                {
                    type: "animation",
                    title: "重新赋值",
                    duration: 1800,

                    html:
                        `
                <div class="rebind-animation">

                    <div class="ra-code">
                        score = 60
                    </div>


                    <div class="ra-stage">

                        <div class="ra-variable">
                            score
                        </div>

                        <div class="ra-arrow">
                            →
                        </div>

                        <div class="ra-value">
                            60
                        </div>

                    </div>


                    <div class="ra-code second">
                        score = 90
                    </div>


                    <div class="ra-stage">

                        <div class="ra-variable">
                            score
                        </div>

                        <div class="ra-arrow">
                            →
                        </div>

                        <div class="ra-value new">
                            90
                        </div>

                    </div>

                </div>
                `,

                    css:
                        `
                .rebind-animation {

                    padding: 24px;

                    background: #f7f9fc;

                    border: 1px solid #dce4ec;

                    border-radius: 8px;

                }


                .ra-code {

                    display: inline-block;

                    margin-bottom: 14px;

                    padding: 8px 12px;

                    background: #202833;

                    border-radius: 5px;

                    color: #ffffff;

                    font-family: monospace;

                    font-size: 13px;

                }


                .ra-code.second {

                    margin-top: 24px;

                }


                .ra-stage {

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 14px;

                }


                .ra-variable,
                .ra-value {

                    min-width: 90px;

                    padding: 12px;

                    background: #ffffff;

                    border: 1px solid #d5dee7;

                    border-radius: 6px;

                    text-align: center;

                    color: #263544;

                    font-weight: 600;

                }


                .ra-value.new {

                    background: #f2f7ff;

                    border-color: #9dbce0;

                }


                .ra-arrow {

                    color: #8492a0;

                    font-size: 22px;

                }
                `,

                    js:
                        `
                const root =
                    animationRoot.querySelector(
                        ".rebind-animation"
                    );

                if (root) {

                    const second =
                        root.querySelector(
                            ".second"
                        );

                    second.style.opacity = "0";

                    setTimeout(
                        () => {

                            second.style.transition =
                                "opacity 0.5s ease";

                            second.style.opacity = "1";

                        },
                        900
                    );

                }
                `
                },


                {
                    type: "paragraph",

                    text:
                        "变量也可以参与计算。执行 x = x + 5 时，Python 会先读取 x 当前的值，再进行加法，最后把新的结果重新赋给 x。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "变量参与计算",

                    code:
                        `x = 10

print(x)

x = x + 5

print(x)

x = x * 2

print(x)`
                },


                {
                    type: "thinking",

                    title: "想一想",

                    text:
                        "执行 x = x + 5 时，右边的 x 和左边的 x 是同一个变量吗？Python 为什么可以先读取 x，再把新的结果重新赋给 x？"
                },


                {
                    type: "paragraph",

                    text:
                        "变量并不只能保存数字，也可以保存字符串、布尔值以及以后会学习到的列表、字典、函数和其他对象。Python 会根据实际数据决定它是什么类型，因此我们不需要提前告诉 Python 这个变量只能保存哪一种类型的数据。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "变量可以保存不同类型的数据",

                    code:
                        `name = "Alice"
age = 20
height = 1.68
is_student = True

print(name)
print(age)
print(height)
print(is_student)`
                },


                {
                    type: "paragraph",

                    text:
                        "这也是 Python 比较方便的地方。我们可以直接创建变量，不需要像一些编程语言那样先写一大段类型声明。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "查看变量的类型",

                    code:
                        `name = "Alice"
age = 20
height = 1.68
is_student = True

print(type(name))
print(type(age))
print(type(height))
print(type(is_student))`
                },


                {
                    type: "paragraph",

                    text:
                        "一个变量在程序运行过程中也可以重新关联到其他类型的数据。例如，x 一开始关联一个整数，之后也可以重新关联一个字符串。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "变量可以重新绑定",

                    code:
                        `x = 100

print(x)
print(type(x))

x = "Hello"

print(x)
print(type(x))`
                },


                {
                    type: "attention",

                    title: "变量不是固定的盒子",

                    description:
                        "初学时可以把变量想象成一个装数据的盒子，这个比喻很好理解。但随着学习深入，你会发现更准确的说法是：变量名与对象建立关联。变量可以重新绑定到另一个对象。"
                },


                {
                    type: "paragraph",

                    text:
                        "Python 还允许多个变量同时赋值。这种写法非常方便，也能帮助我们理解“多个名字可以分别关联不同对象”。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "多个变量",

                    code:
                        `x = 10
y = 20

print(x)
print(y)

x = x + 5

print(x)
print(y)`
                },


                {
                    type: "code",

                    language: "python",

                    title: "同时赋值",

                    code:
                        `a = 10
b = 20

a, b = b, a

print(a)
print(b)`
                },


                {
                    type: "paragraph",

                    text:
                        "a, b = b, a 看起来有一点特别。可以先把它理解成 Python 会先取得右边的两个值，再把它们分别赋给左边的两个变量，因此不需要我们自己创建一个临时变量。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "变量交换",

                    code:
                        `a = 10
b = 20

a, b = b, a

print("a =", a)
print("b =", b)`
                },


                {
                    type: "paragraph",

                    text:
                        "变量名也需要遵守一定的规则。一般来说，变量名应该能够表达它保存的数据含义。看到 total、price、username 这样的名字，其他程序员通常能够快速知道它们大概表示什么。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "好的变量名",

                    code:
                        `username = "Alice"
age = 20
product_price = 99.9
total_price = product_price * 3

print(username)
print(total_price)`
                },


                {
                    type: "attention",

                    title: "变量命名建议",

                    description:
                        "变量名尽量表达含义。不要为了省几个字符，把 name 写成 n、total_price 写成 tp。代码短一点并不一定更容易理解。"
                },


                {
                    type: "code",

                    language: "python",

                    title: "变量名的基本规则",

                    code:
                        `user_name = "Alice"
age2 = 20
total_price = 99.9

# 下面这些写法不推荐或不能使用

# 2age = 20
# user-name = "Alice"
# class = "Python"`
                },


                {
                    type: "concepts",

                    items: [

                        "变量：程序中用于访问数据的名字。",

                        "对象：程序运行时实际存在的数据。",

                        "内存：程序运行时保存数据的地方。",

                        "赋值：让变量名与某个对象建立关联。",

                        "=：赋值运算符，不是数学意义上的等号。",

                        "重新赋值：让变量重新关联到另一个对象。",

                        "Python 不需要提前声明变量类型。",

                        "变量名应该尽量表达数据的含义。"

                    ]
                },


                {
                    type: "note",

                    title: "这一节真正要理解的东西",

                    description:
                        "暂时不要纠结 Python 内部复杂的内存管理。现在只需要建立一个简单模型：数据运行时会存在于内存中，变量是我们访问这些数据的名字，而赋值就是让变量与数据建立关联。"
                },


                {
                    type: "practice",

                    title: "练习 5：个人信息",

                    description:
                        "创建 name、age、city、height 四个变量，并分别保存你的姓名、年龄、城市和身高，然后把它们打印出来。",

                    starterCode:
                        `name = ""
age = 0
city = ""
height = 0.0

print(name)
print(age)
print(city)
print(height)`
                },


                {
                    type: "practice",

                    title: "练习 6：计算总价",

                    description:
                        "创建 price 和 quantity 两个变量，计算商品总价，并把计算结果保存到 total 变量中。",

                    starterCode:
                        `price = 99.9
quantity = 3

# 在这里创建 total

print(total)`
                },


                {
                    type: "practice",

                    title: "练习 7：修改变量",

                    description:
                        "让 score 先保存 60，然后把它重新赋值为 90，最后输出修改后的结果。",

                    starterCode:
                        `score = 60

print(score)

# 在这里重新赋值

print(score)`
                },


                {
                    type: "practice",

                    title: "练习 8：交换变量",

                    description:
                        "让 a 最终变成 20，b 最终变成 10。尝试使用 Python 的同时赋值完成交换。",

                    starterCode:
                        `a = 10
b = 20

# 在这里完成交换

print("a =", a)
print("b =", b)`
                },


                {
                    type: "thinking",

                    title: "最后想一想",

                    text:
                        "如果程序没有变量，只能把所有数据直接写进代码里，那么当程序越来越复杂时，会发生什么？为什么变量会成为几乎所有程序都离不开的工具？"
                },


                {
                    type: "callout",

                    title: "本节小结",

                    text:
                        "变量让程序能够记住和重复使用数据。执行 name = \"Alice\" 时，可以先理解为 Python 在内存中准备数据，并让变量名 name 与这个对象建立关联。变量可以重新赋值，也可以参与计算。理解“变量名 → 对象 → 内存”这条基本关系，是继续学习 Python 的重要基础。"
                }

            ]
        },


        /* =================================================
           01-05
        ================================================= */

        {
            id: "py-01-05",

            title: "对象与数据类型",

            description:
                "理解 Python 中的数据并不是简单的“变量盒子”，而是对象；变量名可以引用不同类型的对象。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "前面我们已经看到，变量可以保存数字、文字以及 True、False 等不同的数据。现在我们进一步看看：这些数据在 Python 里面到底是什么？"
                },

                {
                    type: "paragraph",

                    text:
                        "Python 中的数据都是对象。对象可以理解成程序运行时实际存在的数据实体。一个对象具有自己的类型和值，而它的类型决定了它可以进行哪些操作。"
                },

                {
                    type: "paragraph",

                    text:
                        "例如，18 是一个整数对象，19.9 是一个浮点数对象，\"Python\" 是一个字符串对象，而 True 是一个布尔对象。它们的类型不同，因此 Python 对它们能够执行的操作也不同。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "查看数据的类型",

                    code:
                        `age = 18
price = 19.9
name = "Python"
is_student = True

print(type(age))
print(type(price))
print(type(name))
print(type(is_student))`
                },

                {
                    type: "paragraph",

                    text:
                        "运行这段代码，你会看到 int、float、str 和 bool。type() 可以帮助我们查看一个对象属于什么类型。"
                },

                {
                    type: "note",

                    title: "这里先不要被“类型”吓到",

                    description:
                        "你现在不需要背很多类型。初学阶段先记住：整数通常是 int，小数通常是 float，文字通常是 str，True 和 False 是 bool。随着学习继续，你会自然遇到更多类型。"
                },

                {
                    type: "paragraph",

                    text:
                        "那么，变量本身有没有固定类型呢？Python 和一些需要提前声明类型的语言不太一样。一个变量名可以先引用一个整数对象，之后又引用一个字符串对象。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "变量可以引用不同类型",

                    code:
                        `value = 100

print(value)
print(type(value))

value = "Python"

print(value)
print(type(value))

value = True

print(value)
print(type(value))`
                },

                {
                    type: "paragraph",

                    text:
                        "注意一个非常重要的概念：这里并不是变量 value 自己从 int 变成了 str，再变成 bool。更准确地说，是 value 这个名字先后引用了不同类型的对象。"
                },

                {
                    type: "animation",

                    title: "变量与对象的关系",

                    duration: 1400,

                    html:
                        `
                <div class="object-reference-animation">

                    <div class="ora-row">

                        <div class="ora-name">
                            value
                        </div>

                        <div class="ora-arrow">
                            →
                        </div>

                        <div class="ora-object">
                            <div class="ora-type">
                                int
                            </div>

                            <div class="ora-value">
                                100
                            </div>
                        </div>

                    </div>

                    <div class="ora-change">
                        重新赋值
                    </div>

                    <div class="ora-row ora-second">

                        <div class="ora-name">
                            value
                        </div>

                        <div class="ora-arrow">
                            →
                        </div>

                        <div class="ora-object new">
                            <div class="ora-type">
                                str
                            </div>

                            <div class="ora-value">
                                "Python"
                            </div>
                        </div>

                    </div>

                </div>
                `,

                    css:
                        `
                .object-reference-animation {
                    box-sizing: border-box;
                    width: 100%;
                    min-height: 170px;
                    padding: 24px;
                }

                .ora-row {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 14px;
                }

                .ora-name,
                .ora-object {
                    box-sizing: border-box;
                    min-width: 100px;
                    padding: 10px 16px;
                    border: 1px solid #d8e1ea;
                    border-radius: 6px;
                    background: #ffffff;
                    text-align: center;
                }

                .ora-name {
                    color: #263544;
                    font-weight: 600;
                }

                .ora-type {
                    margin-bottom: 4px;
                    color: #7b8794;
                    font-size: 11px;
                }

                .ora-value {
                    color: #263544;
                    font-weight: 600;
                }

                .ora-arrow {
                    color: #8a98a8;
                    font-size: 18px;
                }

                .ora-change {
                    margin: 14px 0;
                    text-align: center;
                    color: #8a98a8;
                    font-size: 11px;
                }

                .ora-object.new {
                    opacity: 0;
                    transform: translateY(8px);
                }

                @media (max-width: 600px) {

                    .object-reference-animation {
                        padding: 18px 12px;
                    }

                    .ora-name,
                    .ora-object {
                        min-width: 86px;
                        padding: 9px 12px;
                    }

                }
                `,

                    js:
                        `
                const root =
                    animationRoot.querySelector(
                        ".object-reference-animation"
                    );

                if (root) {

                    const object =
                        root.querySelector(
                            ".ora-object.new"
                        );

                    if (object) {

                        setTimeout(
                            () => {

                                object.style.transition =
                                    "all 0.5s ease";

                                object.style.opacity = "1";

                                object.style.transform =
                                    "translateY(0)";

                            },
                            900
                        );

                    }

                }
                `
                },

                {
                    type: "paragraph",

                    text:
                        "这也是 Python 被称为动态类型语言的重要原因之一。写 Python 代码时，通常不需要在变量创建之前声明“这个变量只能保存整数”或者“这个变量只能保存字符串”。"
                },

                {
                    type: "attention",

                    title: "动态类型 ≠ Python 没有类型",

                    description:
                        "Python 并不是没有类型，也不是等到程序结束才知道类型。对象在运行时始终具有自己的类型。所谓动态类型，主要是指变量名不需要提前声明一个固定类型，它可以在运行过程中引用不同类型的对象。"
                },

                {
                    type: "paragraph",

                    text:
                        "所以，这里最好不要简单理解成“Python 会自动推导变量的类型”。更准确的说法是：对象本身具有类型，Python 在程序运行时可以知道这个对象是什么类型；变量名只是用来引用对象。"
                },

                {
                    type: "paragraph",

                    text:
                        "这和一些静态类型语言的思路不同。在某些语言中，你需要明确写出变量的类型，例如 int、float 或 String。Python 通常不要求你在变量名前面写这些类型。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "Python 不要求这样声明变量",

                    code:
                        `age = 18
name = "Python"

print(type(age))
print(type(name))`
                },

                {
                    type: "paragraph",

                    text:
                        "Python 会根据运行时对象本身来处理这些数据。对于刚开始学习 Python 的你来说，这是一件好事：暂时不需要花大量时间记忆类型声明规则，可以先专注于程序本身。"
                },

                {
                    type: "concepts",

                    items: [

                        "int：整数对象，例如 18、100、-5",

                        "float：浮点数对象，例如 3.14、19.9",

                        "str：字符串对象，例如 \"Python\"",

                        "bool：布尔对象，只包含 True 和 False",

                        "NoneType：None 所属的类型，表示没有值",

                        "变量名：程序中用于引用对象的名字"

                    ]
                },

                {
                    type: "paragraph",

                    text:
                        "到这里，我们已经知道了 int 和 float 这些类型。不过，如果你对计算机底层有一点兴趣，还可以继续问一个问题：18 和 19.9 到底是怎样存进计算机内存里的？"
                },

                {
                    type: "callout",

                    title: "兴趣：int 和 float 是怎么表示的？",

                    text:
                        "计算机最终使用二进制保存和处理数据。整数和浮点数采用的表示方式并不完全一样。Python 的 int 可以表示非常大的整数，并不是简单固定占用 4 个或 8 个字节；而 Python 的 float 通常使用双精度浮点数来表示，并遵循 IEEE 754 浮点数标准。",

                    link: {
                        content:
                            "IEEE 754 — Floating-Point Arithmetic",

                        url:
                            "https://standards.ieee.org/ieee/754/6210/"
                    }
                },

                {
                    type: "paragraph",

                    text:
                        "例如，整数 18 在计算机底层可以表示成二进制形式。对于 float 来说，情况会更有意思：很多十进制小数无法用二进制有限、精确地表示，因此计算机只能保存一个非常接近它的值。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "为什么 0.1 + 0.2 不是 0.3？",

                    code:
                        `print(0.1 + 0.2)

print(
    0.1 + 0.2 == 0.3
)`
                },

                {
                    type: "paragraph",

                    text:
                        "你可能会看到 0.30000000000000004，以及 False。这里并不是 Python 算错了，而是浮点数的二进制表示存在精度限制。0.1、0.2 和 0.3 这样的十进制小数，在计算机内部并不能都被精确表示。"
                },

                {
                    type: "note",

                    title: "现在只需要把它当成一个兴趣知识",

                    description:
                        "暂时不需要学习 IEEE 754 的全部规则，也不需要记住浮点数的二进制结构。知道计算机表示数字时存在范围和精度问题就已经足够。以后学习科学计算、数据分析或者金融计算时，我们还会再次遇到它。"
                },

                {
                    type: "paragraph",

                    text:
                        "如果你以后想继续深入，可以沿着这条路线学习：二进制 → 整数表示 → 浮点数 → IEEE 754 → Python 对象模型 → CPython 中的 int 和 float。"
                },

                {
                    type: "practice",

                    title: "练习 7：类型实验室",

                    description:
                        "创建至少 8 个变量，覆盖 int、float、str、bool、None，然后使用 type() 检查类型。再尝试让同一个变量依次引用不同类型的对象。",

                    starterCode:
                        `number = 100
price = 19.9
name = "Python"
is_ready = True
result = None

print(type(number))
print(type(price))
print(type(name))
print(type(is_ready))
print(type(result))

value = 100
print(type(value))

value = "Python"
print(type(value))

value = True
print(type(value))`
                }

            ]
        },


        /* =================================================
           01-06
        ================================================= */

        {
            id: "py-01-06",

            title: "整数、浮点数与布尔值",

            description:
                "深入认识 Python 最常见的数字和逻辑类型，理解 int、float、bool 和 None 分别表示什么，以及它们在程序中的实际作用。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "上一节我们认识了 Python 的对象和类型。现在开始认识几种最常见、也最基础的数据类型：整数、浮点数、布尔值和 None。它们几乎会出现在所有 Python 程序中。"
                },

                {
                    type: "paragraph",

                    text:
                        "例如，一个购物程序需要记录商品数量和价格，一个登录系统需要记录用户是否登录，一个搜索程序需要表示“有没有找到结果”。这些信息看起来不同，但 Python 都可以用不同类型的对象来表示。"
                },

                {
                    type: "callout",

                    title: "先记住一个核心概念",

                    text:
                        "数据类型决定了一个值是什么，以及这个值通常可以参与什么样的操作。10 是整数，19.99 是浮点数，True 是布尔值，而 None 表示当前没有值。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "一、整数 int"
                },

                {
                    type: "paragraph",

                    text:
                        "整数就是没有小数部分的数字。正数、负数和 0 都属于整数。在 Python 中，整数类型叫做 int。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "整数 int",

                    code:
                        `a = 10
b = -5
c = 0

print(a)
print(b)
print(c)

print(type(a))`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的 10、-5 和 0 都是 int 类型。整数非常适合表示数量、次数、编号、积分、年龄等不需要小数的值。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "整数可以进行数学运算",

                    code:
                        `apples = 5
oranges = 3

total = apples + oranges
difference = apples - oranges
product = apples * oranges

print(total)
print(difference)
print(product)`
                },

                {
                    type: "paragraph",

                    text:
                        "Python 可以直接对整数进行加、减、乘等运算。变量保存的是对象，而运算会产生新的结果。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "整数除法需要注意",

                    code:
                        `a = 10
b = 3

print(a / b)
print(a // b)
print(a % b)`
                },

                {
                    type: "paragraph",

                    text:
                        "这里出现了三个不同的运算。/ 表示普通除法，结果通常是浮点数；// 表示整除，得到商的整数部分；% 表示取余，也就是除法之后剩下多少。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "整除与取余",

                    code:
                        `minutes = 135

hours = minutes // 60
remaining_minutes = minutes % 60

print(hours)
print(remaining_minutes)`
                },

                {
                    type: "paragraph",

                    text:
                        "这种写法在实际程序中非常常见。例如把 135 分钟转换成小时和剩余分钟，就可以使用 // 和 %。"
                },

                {
                    type: "callout",

                    title: "小提示：Python 的 int 不只是 32 位或 64 位",

                    text:
                        "在很多编程语言中，整数通常有固定的存储范围。而 Python 的 int 可以表示非常大的整数，只要计算机内存允许，它就可以继续扩展。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "二、浮点数 float"
                },

                {
                    type: "paragraph",

                    text:
                        "浮点数是带有小数部分的数字。在 Python 中，浮点数类型叫做 float。价格、温度、距离、比例等数据，经常需要使用浮点数。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "浮点数 float",

                    code:
                        `price = 19.99
temperature = 26.5

print(price)
print(temperature)

print(type(price))`
                },

                {
                    type: "paragraph",

                    text:
                        "19.99 和 26.5 都是 float。和 int 一样，float 也可以参与数学运算。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "浮点数运算",

                    code:
                        `price = 19.99
quantity = 3

total = price * quantity

print(total)
print(type(total))`
                },

                {
                    type: "paragraph",

                    text:
                        "这里 price 和 quantity 分别表示价格和数量。两者相乘之后得到商品总价。因为 price 是 float，所以计算结果也是浮点数。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "为什么 0.1 + 0.2 不是正好等于 0.3？"
                },

                {
                    type: "paragraph",

                    text:
                        "如果你第一次看到下面的结果，可能会觉得很奇怪："
                },

                {
                    type: "code",

                    language: "python",

                    title: "一个经典的浮点数问题",

                    code:
                        `result = 0.1 + 0.2

print(result)
print(result == 0.3)`
                },

                {
                    type: "paragraph",

                    text:
                        "你可能希望结果是 0.3，并且比较结果是 True。但实际运行时，可能会看到类似 0.30000000000000004 的结果，并且最后的比较是 False。"
                },

                {
                    type: "paragraph",

                    text:
                        "这不是 Python 算错了，而是计算机通常使用二进制来表示浮点数。很多我们可以用十进制准确写出的数字，在二进制中无法被有限位数精确表示，因此保存时只能使用一个非常接近的值。"
                },

                {
                    type: "callout",

                    title: "兴趣：float 为什么会有这种现象？",

                    text:
                        "Python 的 float 通常使用双精度浮点数来表示，并遵循 IEEE 754 浮点数标准。理解这一点后，就能明白为什么某些十进制小数在计算机内部并不能被完全精确地保存。",

                    link: {
                        content:
                            "IEEE 754",

                        url:
                            "https://standards.ieee.org/ieee/754/6210/"
                    }
                },

                {
                    type: "paragraph",

                    text:
                        "这也是为什么在涉及金额、金融计算等对精度要求很高的场景时，不能简单地认为所有 float 计算都可以直接用于精确金额计算。后面学习更多 Python 工具时，我们还会遇到 Decimal 等专门处理精确十进制计算的工具。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "三、布尔值 bool"
                },

                {
                    type: "paragraph",

                    text:
                        "布尔值用于表示一种非常简单的状态：是或者不是、真或者假、成立或者不成立。在 Python 中，布尔类型叫做 bool，只有两个值：True 和 False。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "布尔值 bool",

                    code:
                        `is_logged_in = True
is_admin = False

print(is_logged_in)
print(is_admin)

print(type(is_logged_in))`
                },

                {
                    type: "paragraph",

                    text:
                        "注意 True 和 False 的首字母必须大写。它们不是字符串，所以不要写成 \"True\" 或 \"False\"。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "bool 和字符串不是一回事",

                    code:
                        `a = True
b = "True"

print(type(a))
print(type(b))`
                },

                {
                    type: "paragraph",

                    text:
                        "a 保存的是一个 bool 对象，而 b 保存的是一个字符串对象。虽然它们打印出来看起来很像，但它们的类型完全不同。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "布尔值通常来自判断"
                },

                {
                    type: "paragraph",

                    text:
                        "在实际程序中，我们很少只是手动写 True 或 False。更常见的情况是，让 Python 根据一个条件进行判断，然后得到一个布尔值。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "比较运算会得到 bool",

                    code:
                        `age = 20

print(age >= 18)
print(age < 18)
print(age == 20)
print(age != 20)`
                },

                {
                    type: "paragraph",

                    text:
                        "这些表达式的结果都是 bool。比如 age >= 18 的意思是“age 是否大于等于 18”。Python 判断之后会得到 True 或 False。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "保存判断结果",

                    code:
                        `age = 20

is_adult = age >= 18

print(is_adult)`
                },

                {
                    type: "paragraph",

                    text:
                        "这就是 bool 在真实程序中的典型用法：先计算一个条件，再把结果保存到变量中。变量名通常也会使用 is、has、can 等形式，让代码读起来更像自然语言。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "多个条件",

                    code:
                        `age = 20
has_ticket = True

can_enter = age >= 18 and has_ticket

print(can_enter)`
                },

                {
                    type: "paragraph",

                    text:
                        "这里使用了 and。只有年龄满足要求并且拥有门票时，can_enter 才会是 True。布尔值正是程序进行逻辑判断的基础。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "四、None：暂时没有值"
                },

                {
                    type: "paragraph",

                    text:
                        "除了数字和 True、False，Python 还有一个非常重要的特殊值：None。None 通常用来表示“没有值”“还没有结果”或者“当前不存在一个有效对象”。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "None",

                    code:
                        `result = None

print(result)
print(type(result))`
                },

                {
                    type: "paragraph",

                    text:
                        "None 有自己的类型，叫做 NoneType。它不是 0，不是空字符串，也不是 False。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "None 和其他值不同",

                    code:
                        `a = None
b = 0
c = ""
d = False

print(a)
print(b)
print(c)
print(d)

print(type(a))
print(type(b))
print(type(c))
print(type(d))`
                },

                {
                    type: "paragraph",

                    text:
                        "这四个变量虽然都可以表示某种“没有内容”或“没有状态”的感觉，但它们实际上代表完全不同的东西。0 是一个整数，\"\" 是一个空字符串，False 是一个布尔值，而 None 表示没有值。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "None 在实际程序中非常常见"
                },

                {
                    type: "code",

                    language: "python",

                    title: "表示还没有搜索结果",

                    code:
                        `last_search = None

print(last_search)

last_search = "Python"

print(last_search)`
                },

                {
                    type: "paragraph",

                    text:
                        "例如，一个搜索功能刚刚启动时，还没有任何搜索结果，就可以先把 last_search 设置为 None。等用户真正搜索之后，再把结果保存进去。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "表示还没有设置",

                    code:
                        `selected_user = None

print(selected_user)

selected_user = "Alice"

print(selected_user)`
                },

                {
                    type: "paragraph",

                    text:
                        "这种写法在程序开发中非常常见。None 经常表示一个变量当前还没有真正的数据。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "五、四种类型放在一起看"
                },

                {
                    type: "code",

                    language: "python",

                    title: "同一个程序中的不同类型",

                    code:
                        `age = 18
price = 29.9
is_member = True
coupon = None

print(age)
print(price)
print(is_member)
print(coupon)

print(type(age))
print(type(price))
print(type(is_member))
print(type(coupon))`
                },

                {
                    type: "paragraph",

                    text:
                        "在一个真实程序中，这些类型往往会同时出现。age 表示数量型数据，price 表示带小数的数据，is_member 表示一个状态，而 coupon 表示当前是否存在优惠券信息。"
                },

                {
                    type: "callout",

                    title: "可以这样理解",

                    text:
                        "int 更像“多少”；float 更像“多少但允许小数”；bool 更像“是不是”；None 更像“目前没有”。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "六、类型转换"
                },

                {
                    type: "paragraph",

                    text:
                        "不同类型之间有时需要进行转换。例如，用户输入的数据通常是字符串，但我们可能需要把它转换成整数进行计算。Python 提供了 int()、float()、str() 和 bool() 等函数完成常见的类型转换。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "字符串转换成整数",

                    code:
                        `age_text = "18"

age = int(age_text)

print(age)
print(type(age))`
                },

                {
                    type: "paragraph",

                    text:
                        "这里原来的 \"18\" 是字符串，经过 int() 转换之后，得到真正的整数 18。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "整数转换成浮点数",

                    code:
                        `price = 20

price_float = float(price)

print(price_float)
print(type(price_float))`
                },

                {
                    type: "code",

                    language: "python",

                    title: "数字转换成字符串",

                    code:
                        `score = 100

message = str(score)

print(message)
print(type(message))`
                },

                {
                    type: "paragraph",

                    text:
                        "类型转换非常重要，因为程序中的数据经常来自不同来源。例如网页输入、文件、数据库和用户操作，都可能产生不同类型的数据。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "七、一个容易混淆的问题"
                },

                {
                    type: "paragraph",

                    text:
                        "不要把“变量是什么类型”和“变量当前引用的对象是什么类型”混为一谈。Python 是动态类型语言，变量名本身不需要提前声明固定类型。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "变量可以重新引用不同类型的对象",

                    code:
                        `value = 10
print(value)
print(type(value))

value = "Python"
print(value)
print(type(value))

value = True
print(value)
print(type(value))`
                },

                {
                    type: "paragraph",

                    text:
                        "这里 value 先引用一个 int 对象，然后又引用一个 str 对象，最后又引用一个 bool 对象。变量名没有被永久绑定成某一种类型。真正拥有类型的是对象。"
                },

                {
                    type: "callout",

                    title: "这一点非常重要",

                    text:
                        "动态类型并不意味着 Python 没有类型。恰恰相反，Python 中的对象都有明确的类型，只是变量名不需要像一些静态类型语言那样提前声明一个固定类型。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "八、实际场景：建立一个用户状态"
                },

                {
                    type: "paragraph",

                    text:
                        "现在把前面学到的几种类型组合起来。假设我们正在开发一个网站，需要记录一个用户的基本状态。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "用户状态",

                    code:
                        `username = "Alice"
age = 20
points = 150
is_logged_in = True
is_admin = False
last_search = None

print(username)
print(age)
print(points)
print(is_logged_in)
print(is_admin)
print(last_search)`
                },

                {
                    type: "paragraph",

                    text:
                        "这个例子里同时出现了字符串、整数、布尔值和 None。现实中的程序并不是只使用一种数据类型，而是把不同类型的数据组合起来描述一个完整的对象或状态。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "九、小结"
                },

                {
                    type: "checklist",

                    items: [
                        "int 表示整数，例如 10、-5、0。",
                        "float 表示浮点数，例如 19.99、26.5。",
                        "bool 只有 True 和 False 两个值，用于表示真假和程序状态。",
                        "None 通常表示当前没有值、没有结果或尚未设置。",
                        "比较表达式通常会产生 bool。",
                        "int()、float()、str()、bool() 可以进行常见的类型转换。",
                        "Python 是动态类型语言，但 Python 中的对象依然拥有明确的类型。",
                        "float 通常使用双精度浮点数表示，因此某些十进制小数无法被二进制完全精确表示。"
                    ]
                },

                {
                    type: "practice",

                    title: "练习 8：建立用户状态",

                    description:
                        "创建几个变量表示用户是否登录、是否管理员、当前积分以及最后一次搜索结果。合理使用 bool、int 和 None。然后打印这些变量以及它们的类型。",

                    starterCode:
                        `is_logged_in = False
is_admin = False
points = 0
last_search = None

print(is_logged_in)
print(is_admin)
print(points)
print(last_search)

print(type(is_logged_in))
print(type(is_admin))
print(type(points))
print(type(last_search))`
                },

                {
                    type: "practice",

                    title: "练习 9：计算购物车金额",

                    description:
                        "创建 price 和 quantity 两个变量，分别表示商品价格和购买数量。计算总价，并观察计算结果是什么类型。",

                    starterCode:
                        `price = 29.9
quantity = 3

total = price * quantity

print(total)
print(type(total))`
                },

                {
                    type: "practice",

                    title: "练习 10：判断是否可以进入",

                    description:
                        "创建 age 和 has_ticket 两个变量。如果用户年龄大于等于 18 岁，并且拥有门票，就可以进入。请创建一个布尔变量 can_enter 保存最终结果。",

                    starterCode:
                        `age = 20
has_ticket = True

can_enter = age >= 18 and has_ticket

print(can_enter)`
                }

            ]
        },


        /* =================================================
           01-07
        ================================================= */

        {
            id: "py-01-07",

            title: "运算符与表达式",

            description:
                "学习 Python 中最基本的算术运算，理解运算符、表达式和结果之间的关系，并开始建立程序计算过程的思维。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "前面我们已经认识了变量、整数、浮点数和布尔值。现在，我们让这些数据真正“动起来”。Python 最重要的能力之一，就是根据我们写出的表达式进行计算，并产生新的结果。"
                },

                {
                    type: "paragraph",

                    text:
                        "例如，10 + 20 会产生 30，price * quantity 会产生商品总价，而 age >= 18 会产生 True 或 False。这些能够计算出结果的代码，就是表达式。"
                },

                {
                    type: "callout",

                    title: "一个非常重要的概念",

                    text:
                        "表达式（expression）就是一段能够产生一个结果的代码。运算符负责描述“怎么计算”，操作数则是参与计算的数据。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "一、什么是运算符？"
                },

                {
                    type: "paragraph",

                    text:
                        "运算符可以理解成告诉 Python“要做什么”的符号。例如 + 表示加法，- 表示减法，* 表示乘法。参与运算的数据叫做操作数。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "最简单的表达式",

                    code:
                        `10 + 20

10 - 3

10 * 5`
                },

                {
                    type: "paragraph",

                    text:
                        "这些代码没有保存到变量中，但 Python 依然可以计算它们。每一个表达式都会产生一个结果。"
                },

                {
                    type: "animation",

                    title:
                        "表达式是怎么产生结果的？",

                    duration: 1800,

                    html:
                        `
                <div class="expression-animation">

                    <div class="expression-title">
                        Python 计算
                    </div>

                    <div class="expression-row">

                        <div class="expression-item">
                            10
                        </div>

                        <div class="expression-operator">
                            +
                        </div>

                        <div class="expression-item">
                            20
                        </div>

                        <div class="expression-arrow">
                            →
                        </div>

                        <div class="expression-result">
                            30
                        </div>

                    </div>

                </div>
                `,

                    css:
                        `
                .expression-animation {
                    box-sizing: border-box;
                    min-height: 170px;
                    padding: 34px 24px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .expression-title {
                    margin-bottom: 22px;
                    color: #7b8794;
                    font-size: 12px;
                    font-weight: 600;
                }

                .expression-row {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .expression-item,
                .expression-result,
                .expression-operator {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 48px;
                    height: 48px;
                    padding: 0 12px;
                    border-radius: 8px;
                    background: #ffffff;
                    border: 1px solid #dce4ec;
                    color: #263544;
                    font-size: 18px;
                    font-weight: 600;
                }

                .expression-operator {
                    min-width: 32px;
                    border: none;
                    background: transparent;
                    color: #3776AB;
                }

                .expression-arrow {
                    color: #9aa8b5;
                    font-size: 22px;
                    opacity: 0;
                    transform: translateX(-8px);
                }

                .expression-result {
                    color: #3776AB;
                    opacity: 0;
                    transform: scale(0.8);
                }
                `,

                    js:
                        `
                const arrow =
                    animationRoot.querySelector(
                        ".expression-arrow"
                    );

                const result =
                    animationRoot.querySelector(
                        ".expression-result"
                    );

                setTimeout(() => {

                    arrow.style.opacity = "1";
                    arrow.style.transform =
                        "translateX(0)";
                    arrow.style.transition =
                        "all 300ms ease";

                }, 500);

                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "scale(1)";
                    result.style.transition =
                        "all 400ms ease";

                }, 1000);
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "二、Python 的基本算术运算"
                },

                {
                    type: "paragraph",

                    text:
                        "Python 提供了一组非常直观的算术运算符。它们和我们在数学中接触到的运算非常接近，但其中有几个运算符值得特别注意。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "基本算术",

                    code:
                        `a = 10
b = 3

print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)`
                },

                {
                    type: "concepts",

                    items: [

                        "+：加法",

                        "-：减法",

                        "*：乘法",

                        "/：普通除法，结果通常为 float",

                        "//：整除，得到整除后的结果",

                        "%：取余数",

                        "**：幂运算"

                    ]
                },

                {
                    type: "paragraph",

                    text:
                        "其中 /、// 和 % 很值得认真理解。它们都和“除法”有关，但得到的结果完全不同。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "普通除法 /"
                },

                {
                    type: "code",

                    language: "python",

                    title: "普通除法",

                    code:
                        `print(10 / 3)
print(10 / 2)

print(type(10 / 3))
print(type(10 / 2))`
                },

                {
                    type: "paragraph",

                    text:
                        "在 Python 中，/ 表示普通除法。即使两个整数能够整除，结果通常也会是 float。例如 10 / 2 得到 5.0，而不是整数 5。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "整除 //"
                },

                {
                    type: "code",

                    language: "python",

                    title: "整除",

                    code:
                        `print(10 // 3)
print(10 // 2)

print(17 // 5)`
                },

                {
                    type: "paragraph",

                    text:
                        "// 可以理解为“除法以后只保留整除结果”。例如 17 除以 5，结果是 3 余 2，所以 17 // 5 得到 3。"
                },

                {
                    type: "animation",

                    title:
                        "17 ÷ 5 到底发生了什么？",

                    duration: 2200,

                    html:
                        `
                <div class="division-animation">

                    <div class="division-expression">
                        17 ÷ 5
                    </div>

                    <div class="division-groups">

                        <div class="division-group">
                            <span>5</span>
                            <span>5</span>
                            <span>5</span>
                        </div>

                        <div class="division-group">
                            <span>2</span>
                        </div>

                    </div>

                    <div class="division-result">
                        3 组，余 2
                    </div>

                </div>
                `,

                    css:
                        `
                .division-animation {
                    box-sizing: border-box;
                    min-height: 190px;
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .division-expression {
                    margin-bottom: 20px;
                    color: #263544;
                    font-size: 18px;
                    font-weight: 600;
                }

                .division-groups {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    justify-content: center;
                }

                .division-group {
                    display: flex;
                    gap: 5px;
                    padding: 8px;
                    border-radius: 7px;
                    border: 1px solid #dce4ec;
                    background: #ffffff;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .division-group span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 30px;
                    height: 30px;
                    border-radius: 5px;
                    background: #eef4f8;
                    color: #3776AB;
                    font-size: 13px;
                    font-weight: 600;
                }

                .division-result {
                    margin-top: 18px;
                    color: #3776AB;
                    font-size: 13px;
                    font-weight: 600;
                    opacity: 0;
                }
                `,

                    js:
                        `
                const groups =
                    animationRoot.querySelectorAll(
                        ".division-group"
                    );

                const result =
                    animationRoot.querySelector(
                        ".division-result"
                    );

                groups.forEach(
                    (group, index) => {

                        setTimeout(() => {

                            group.style.opacity = "1";
                            group.style.transform =
                                "translateY(0)";
                            group.style.transition =
                                "all 300ms ease";

                        }, 500 + index * 350);

                    }
                );

                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transition =
                        "opacity 300ms ease";

                }, 1700);
                `
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "取余 %"
                },

                {
                    type: "paragraph",

                    text:
                        "% 不关心商是多少，而关心除法之后“还剩多少”。这在很多实际问题中非常有用。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "取余",

                    code:
                        `print(10 % 3)
print(17 % 5)
print(20 % 4)`
                },

                {
                    type: "paragraph",

                    text:
                        "例如 17 除以 5，可以完整分成 3 组，每组 5 个，最后还剩 2 个，所以 17 % 5 的结果是 2。"
                },

                {
                    type: "paragraph",

                    text:
                        "取余经常用于判断一个数字是否能够被另一个数字整除。例如判断一个数字是不是偶数，就可以检查它除以 2 后的余数是不是 0。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "判断奇偶数",

                    code:
                        `number = 10

print(number % 2 == 0)`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "幂运算 **"
                },

                {
                    type: "code",

                    language: "python",

                    title: "幂运算",

                    code:
                        `print(2 ** 3)
print(5 ** 2)
print(10 ** 0)`
                },

                {
                    type: "paragraph",

                    text:
                        "** 表示幂运算。2 ** 3 就是 2 的 3 次方，也就是 2 × 2 × 2。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "三、表达式会产生结果"
                },

                {
                    type: "paragraph",

                    text:
                        "理解运算符之后，更重要的是理解“表达式”。表达式可以看成一个计算过程：Python 执行它之后，会得到一个结果。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "表达式",

                    code:
                        `10 + 20

price = 100
quantity = 3

total = price * quantity

print(total)`
                },

                {
                    type: "paragraph",

                    text:
                        "price * quantity 本身就是一个表达式。它先读取 price 和 quantity 当前引用的对象，然后执行乘法，最后得到 300。"
                },

                {
                    type: "animation",

                    title:
                        "变量 → 运算 → 结果",

                    duration: 2200,

                    html:
                        `
                <div class="calculation-animation">

                    <div class="calculation-card price">
                        <span class="calculation-label">
                            price
                        </span>
                        <strong>100</strong>
                    </div>

                    <div class="calculation-symbol">
                        ×
                    </div>

                    <div class="calculation-card quantity">
                        <span class="calculation-label">
                            quantity
                        </span>
                        <strong>3</strong>
                    </div>

                    <div class="calculation-symbol arrow">
                        →
                    </div>

                    <div class="calculation-card total">
                        <span class="calculation-label">
                            total
                        </span>
                        <strong>300</strong>
                    </div>

                </div>
                `,

                    css:
                        `
                .calculation-animation {
                    box-sizing: border-box;
                    min-height: 180px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .calculation-card {
                    width: 92px;
                    padding: 14px 10px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    text-align: center;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .calculation-label {
                    display: block;
                    margin-bottom: 6px;
                    color: #7b8794;
                    font-size: 11px;
                }

                .calculation-card strong {
                    color: #263544;
                    font-size: 20px;
                }

                .calculation-symbol {
                    color: #3776AB;
                    font-size: 20px;
                    font-weight: 600;
                    opacity: 0;
                }

                .calculation-card.total {
                    border-color: #cbddea;
                }

                .calculation-card.total strong {
                    color: #3776AB;
                }
                `,

                    js:
                        `
                const price =
                    animationRoot.querySelector(
                        ".calculation-card.price"
                    );

                const quantity =
                    animationRoot.querySelector(
                        ".calculation-card.quantity"
                    );

                const symbols =
                    animationRoot.querySelectorAll(
                        ".calculation-symbol"
                    );

                const total =
                    animationRoot.querySelector(
                        ".calculation-card.total"
                    );

                setTimeout(() => {

                    price.style.opacity = "1";
                    price.style.transform =
                        "translateY(0)";
                    price.style.transition =
                        "all 300ms ease";

                }, 300);

                setTimeout(() => {

                    quantity.style.opacity = "1";
                    quantity.style.transform =
                        "translateY(0)";
                    quantity.style.transition =
                        "all 300ms ease";

                }, 700);

                setTimeout(() => {

                    symbols[0].style.opacity = "1";
                    symbols[0].style.transition =
                        "opacity 250ms ease";

                }, 1050);

                setTimeout(() => {

                    symbols[1].style.opacity = "1";
                    symbols[1].style.transition =
                        "opacity 250ms ease";

                }, 1350);

                setTimeout(() => {

                    total.style.opacity = "1";
                    total.style.transform =
                        "translateY(0)";
                    total.style.transition =
                        "all 350ms ease";

                }, 1700);
                `
                },

                {
                    type: "code",

                    language: "python",

                    title: "把表达式保存起来",

                    code:
                        `price = 100
quantity = 3

total = price * quantity

print(total)

discount = 0.8

final_price = total * discount

print(final_price)`
                },

                {
                    type: "paragraph",

                    text:
                        "这里实际上发生了两次计算。第一次计算 price * quantity，得到 300，并把结果保存到 total。第二次计算 total * discount，得到最终价格 240。"
                },

                {
                    type: "paragraph",

                    text:
                        "这也是程序和普通计算器非常相似的地方：我们可以把一个计算过程拆成多个步骤，并使用变量保存中间结果，让程序更容易理解和修改。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "四、运算优先级"
                },

                {
                    type: "paragraph",

                    text:
                        "当一个表达式中出现多个运算符时，Python 需要知道先计算哪一部分。这就是运算优先级。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "运算优先级",

                    code:
                        `result1 = 2 + 3 * 4
result2 = (2 + 3) * 4

print(result1)
print(result2)`
                },

                {
                    type: "paragraph",

                    text:
                        "第一行不是从左到右简单计算。乘法的优先级高于加法，所以 Python 会先计算 3 * 4，然后再加 2，结果是 14。"
                },

                {
                    type: "animation",

                    title:
                        "为什么 2 + 3 × 4 等于 14？",

                    duration: 2400,

                    html:
                        `
                <div class="priority-animation">

                    <div class="priority-expression">
                        <span class="normal-part">2 + </span>
                        <span class="priority-part">3 × 4</span>
                    </div>

                    <div class="priority-step">
                        先计算 3 × 4
                    </div>

                    <div class="priority-result">
                        2 + 12 = 14
                    </div>

                </div>
                `,

                    css:
                        `
                .priority-animation {
                    box-sizing: border-box;
                    min-height: 190px;
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .priority-expression {
                    color: #263544;
                    font-size: 22px;
                    font-weight: 600;
                }

                .priority-part {
                    color: #3776AB;
                }

                .priority-step {
                    margin-top: 22px;
                    padding: 7px 13px;
                    border-radius: 5px;
                    background: #eef4f8;
                    color: #3776AB;
                    font-size: 12px;
                    opacity: 0;
                    transform: translateY(6px);
                }

                .priority-result {
                    margin-top: 14px;
                    color: #263544;
                    font-size: 16px;
                    font-weight: 600;
                    opacity: 0;
                    transform: scale(0.9);
                }
                `,

                    js:
                        `
                const step =
                    animationRoot.querySelector(
                        ".priority-step"
                    );

                const result =
                    animationRoot.querySelector(
                        ".priority-result"
                    );

                setTimeout(() => {

                    step.style.opacity = "1";
                    step.style.transform =
                        "translateY(0)";
                    step.style.transition =
                        "all 300ms ease";

                }, 700);

                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "scale(1)";
                    result.style.transition =
                        "all 400ms ease";

                }, 1500);
                `
                },

                {
                    type: "paragraph",

                    text:
                        "如果你希望明确告诉 Python 哪一部分应该先计算，可以使用括号。括号不仅可以改变计算顺序，也可以让代码更加容易阅读。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "使用括号明确计算顺序",

                    code:
                        `result1 = 2 + 3 * 4
result2 = (2 + 3) * 4

print(result1)
print(result2)`
                },

                {
                    type: "callout",

                    title: "实际编程中的建议",

                    text:
                        "即使你记得运算符优先级，也建议在复杂表达式中适当使用括号。括号可以让代码的意图更加清楚，也能减少阅读和修改代码时产生误解的可能。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "五、运算结果也有类型"
                },

                {
                    type: "paragraph",

                    text:
                        "表达式产生的不只是一个数字，它产生的结果同样具有类型。理解这一点非常重要。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "观察运算结果的类型",

                    code:
                        `print(10 + 3)
print(type(10 + 3))

print(10 / 3)
print(type(10 / 3))

print(10 == 3)
print(type(10 == 3))`
                },

                {
                    type: "paragraph",

                    text:
                        "10 + 3 得到整数，10 / 3 得到浮点数，而 10 == 3 是一个比较表达式，因此得到的是布尔值 False。"
                },

                {
                    type: "callout",

                    title: "把这一点记住",

                    text:
                        "表达式 → 产生结果 → 结果本身也有类型。程序其实就是不断地对数据进行计算、转换和组合。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "六、把运算和现实问题联系起来"
                },

                {
                    type: "paragraph",

                    text:
                        "学习运算符最好的方式，不是死记符号，而是把它们放到真实问题中。购物、时间转换、统计数据、游戏积分、文件大小等问题，都可以转换成数学表达式。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "购物计算",

                    code:
                        `price = 29.9
quantity = 5
discount = 0.8

total = price * quantity
final_price = total * discount

print("原价：", total)
print("折后：", final_price)`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的程序其实就是把现实中的购物过程转换成数学计算：单价 × 数量 = 原价，原价 × 折扣 = 折后价格。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "七、另一个非常实用的例子：时间转换"
                },

                {
                    type: "paragraph",

                    text:
                        "假设我们有一个总秒数 3661，现在希望把它转换成小时、分钟和秒。这个问题正好可以使用 // 和 %。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "秒数转换",

                    code:
                        `total_seconds = 3661

hours = total_seconds // 3600

remaining_seconds = total_seconds % 3600

minutes = remaining_seconds // 60

seconds = remaining_seconds % 60

print(hours, "小时")
print(minutes, "分钟")
print(seconds, "秒")`
                },

                {
                    type: "paragraph",

                    text:
                        "第一步用 // 计算完整的小时数；第二步用 % 得到除去小时以后剩余的秒数；然后继续计算分钟和最后剩余的秒数。"
                },

                {
                    type: "animation",

                    title:
                        "3661 秒是怎么拆开的？",

                    duration: 2800,

                    html:
                        `
                <div class="time-animation">

                    <div class="time-total">
                        3661 秒
                    </div>

                    <div class="time-flow">

                        <div class="time-item hours">
                            <strong>1</strong>
                            <span>小时</span>
                        </div>

                        <div class="time-plus">
                            +
                        </div>

                        <div class="time-item minutes">
                            <strong>1</strong>
                            <span>分钟</span>
                        </div>

                        <div class="time-plus">
                            +
                        </div>

                        <div class="time-item seconds">
                            <strong>1</strong>
                            <span>秒</span>
                        </div>

                    </div>

                </div>
                `,

                    css:
                        `
                .time-animation {
                    box-sizing: border-box;
                    min-height: 190px;
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .time-total {
                    margin-bottom: 24px;
                    color: #263544;
                    font-size: 20px;
                    font-weight: 600;
                }

                .time-flow {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .time-item {
                    min-width: 72px;
                    padding: 10px 12px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    text-align: center;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .time-item strong {
                    display: block;
                    color: #3776AB;
                    font-size: 20px;
                }

                .time-item span {
                    display: block;
                    margin-top: 3px;
                    color: #7b8794;
                    font-size: 11px;
                }

                .time-plus {
                    color: #9aa8b5;
                    font-size: 18px;
                    opacity: 0;
                }
                `,

                    js:
                        `
                const items =
                    animationRoot.querySelectorAll(
                        ".time-item"
                    );

                const pluses =
                    animationRoot.querySelectorAll(
                        ".time-plus"
                    );

                items.forEach(
                    (item, index) => {

                        setTimeout(() => {

                            item.style.opacity = "1";
                            item.style.transform =
                                "translateY(0)";
                            item.style.transition =
                                "all 300ms ease";

                        }, 500 + index * 600);

                    }
                );

                pluses.forEach(
                    (plus, index) => {

                        setTimeout(() => {

                            plus.style.opacity = "1";
                            plus.style.transition =
                                "opacity 250ms ease";

                        }, 800 + index * 600);

                    }
                );
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "八、写程序时的一个重要思维"
                },

                {
                    type: "paragraph",

                    text:
                        "看到一个现实问题时，可以尝试把它拆成几个简单的计算步骤。不要一开始就想着写一大段复杂代码，而是先问自己：我有哪些数据？我要计算什么？每一步会得到什么结果？"
                },

                {
                    type: "code",

                    language: "python",

                    title: "把问题拆成步骤",

                    code:
                        `price = 29.9
quantity = 5
discount = 0.8

total = price * quantity
final_price = total * discount

print("商品总价：", total)
print("最终价格：", final_price)`
                },

                {
                    type: "paragraph",

                    text:
                        "这种“先拆问题，再写表达式”的思维，会贯穿整个 Python 学习过程。以后学习条件判断、循环、函数甚至数据分析时，我们仍然会不断使用这种方法。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "九、小结"
                },

                {
                    type: "checklist",

                    items: [

                        "运算符告诉 Python 应该进行什么操作。",

                        "表达式是一段能够产生结果的代码。",

                        "+、-、*、/ 是最基本的算术运算符。",

                        "// 用于整除，% 用于取得余数。",

                        "** 用于幂运算。",

                        "复杂表达式可以使用括号明确计算顺序。",

                        "表达式产生的结果本身也具有类型。",

                        "比较表达式通常会产生 bool 类型。",

                        "现实问题可以拆解成多个计算步骤。",

                        "编程的重要思维之一，就是把现实问题转换成数据和表达式。"

                    ]
                },

                {
                    type: "practice",

                    title: "练习 9：购物计算",

                    description:
                        "一个商品价格为 29.9 元，购买 5 个，打 8 折。计算原价和折后价格。",

                    starterCode:
                        `price = 29.9
quantity = 5
discount = 0.8

total = 0
final_price = 0

print("原价：", total)
print("折后：", final_price)`
                },

                {
                    type: "practice",

                    title: "练习 10：秒数转换",

                    description:
                        "给定总秒数，把它转换成“小时、分钟、秒”。例如 3661 秒应该得到 1 小时 1 分钟 1 秒。",

                    starterCode:
                        `total_seconds = 3661

hours = 0
minutes = 0
seconds = 0

print(hours, "小时")
print(minutes, "分钟")
print(seconds, "秒")`
                },

                {
                    type: "practice",

                    title: "练习 11：判断一个数字是不是偶数",

                    description:
                        "创建一个 number 变量，使用取余运算判断它是否能够被 2 整除，并把结果保存到 is_even 变量中。",

                    starterCode:
                        `number = 18

is_even = False

print(is_even)`
                }

            ]
        },


        /* =================================================
           01-08
        ================================================= */

        {
            id: "py-01-08",

            title: "编码和字符串基础",

            description:
                "从文本编码的发展历史出发，理解 ASCII、GB 系列、Unicode 和 UTF-8，并掌握 Python 中字符串的基本操作与实际应用。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "我们每天都会处理大量文字：用户名、文章、搜索关键词、文件内容、网页、聊天消息……在 Python 中，这些文本通常都会以字符串（str）的形式出现。"
                },

                {
                    type: "paragraph",

                    text:
                        "这一节我们先简单了解一个有趣的问题：计算机是怎么保存文字的？然后把重点放回 Python 字符串本身。你不需要成为编码专家，也不需要记住各种编码标准，只需要知道它们为什么出现，以及今天我们为什么经常看到 UTF-8。"
                },

                {
                    type: "callout",

                    title: "这一节真正要学什么？",

                    text:
                        "编码的历史只需要理解基本概念。真正需要掌握的是字符串的使用：创建、长度、清洗、替换、搜索和判断。这些操作会在以后处理用户输入、文件、网页和数据时反复出现。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "一、计算机最开始并不认识文字"
                },

                {
                    type: "paragraph",

                    text:
                        "从计算机底层来看，计算机处理的是数字和二进制数据。可是人类需要使用 A、B、C，也需要使用中文、日文、韩文以及各种符号。于是，一个非常自然的问题出现了：数字和文字之间应该怎样对应？"
                },

                {
                    type: "paragraph",

                    text:
                        "所谓字符编码，可以简单理解成一套“对应规则”：给每个字符一个数字编号，然后计算机就可以用数字来表示这个字符。"
                },

                {
                    type: "animation",

                    title:
                        "文字是怎样变成计算机可以处理的数据的？",

                    duration: 2300,

                    html:
                        `
                <div class="encoding-animation">

                    <div class="encoding-character">
                        A
                    </div>

                    <div class="encoding-arrow">
                        →
                    </div>

                    <div class="encoding-number">
                        65
                    </div>

                    <div class="encoding-arrow">
                        →
                    </div>

                    <div class="encoding-binary">
                        01000001
                    </div>

                </div>
                `,

                    css:
                        `
                .encoding-animation {
                    box-sizing: border-box;
                    min-height: 180px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 14px;
                }

                .encoding-character,
                .encoding-number,
                .encoding-binary {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 70px;
                    height: 54px;
                    padding: 0 12px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    color: #263544;
                    font-size: 18px;
                    font-weight: 600;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .encoding-number {
                    color: #3776AB;
                }

                .encoding-binary {
                    min-width: 110px;
                    color: #3776AB;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 14px;
                }

                .encoding-arrow {
                    color: #9aa8b5;
                    font-size: 20px;
                    opacity: 0;
                }
                `,

                    js:
                        `
                const character =
                    animationRoot.querySelector(
                        ".encoding-character"
                    );

                const number =
                    animationRoot.querySelector(
                        ".encoding-number"
                    );

                const binary =
                    animationRoot.querySelector(
                        ".encoding-binary"
                    );

                const arrows =
                    animationRoot.querySelectorAll(
                        ".encoding-arrow"
                    );

                setTimeout(() => {

                    character.style.opacity = "1";
                    character.style.transform =
                        "translateY(0)";
                    character.style.transition =
                        "all 300ms ease";

                }, 300);

                setTimeout(() => {

                    arrows[0].style.opacity = "1";
                    arrows[0].style.transition =
                        "opacity 250ms ease";

                }, 700);

                setTimeout(() => {

                    number.style.opacity = "1";
                    number.style.transform =
                        "translateY(0)";
                    number.style.transition =
                        "all 300ms ease";

                }, 950);

                setTimeout(() => {

                    arrows[1].style.opacity = "1";
                    arrows[1].style.transition =
                        "opacity 250ms ease";

                }, 1350);

                setTimeout(() => {

                    binary.style.opacity = "1";
                    binary.style.transform =
                        "translateY(0)";
                    binary.style.transition =
                        "all 300ms ease";

                }, 1600);
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "二、ASCII：最早期的通用尝试"
                },

                {
                    type: "paragraph",

                    text:
                        "早期计算机主要在英语环境中发展，因此最初需要解决的问题并没有今天这么复杂：只要能够表示英文字母、数字和一些常见符号，就已经可以满足大量需求。"
                },

                {
                    type: "paragraph",

                    text:
                        "ASCII（American Standard Code for Information Interchange，美国信息交换标准代码）就是非常经典的一套字符编码。它为英文字母、数字和常见控制字符规定了对应的数字。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "ASCII 中的字符",

                    code:
                        `print(ord("A"))
print(ord("B"))
print(ord("a"))
print(ord("0"))`
                },

                {
                    type: "paragraph",

                    text:
                        "Python 的 ord() 函数可以得到一个字符对应的 Unicode 码点。对于 ASCII 范围内的字符，它和 ASCII 编号是一致的。"
                },

                {
                    type: "paragraph",

                    text:
                        "ASCII 对英文非常方便，但它有一个明显的问题：世界上并不只有英文。中文、日文、韩文、阿拉伯文等文字显然无法靠这一套有限的字符集合完整表示。"
                },

                {
                    type: "callout",

                    title: "ASCII 的历史意义",

                    text:
                        "ASCII 并不是“错误的编码”，它解决了当时非常现实的问题。真正的问题是：随着计算机走向世界，它能够表示的字符太少了。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "三、中文来了：GB 系列编码"
                },

                {
                    type: "paragraph",

                    text:
                        "随着计算机进入中文环境，仅仅支持英文显然不够。于是，不同国家和地区开始设计适合自己语言的字符编码方案。"
                },

                {
                    type: "paragraph",

                    text:
                        "在中文环境中，我们会遇到 GB2312、GBK、GB18030 等编码。它们可以理解为中文计算机发展过程中逐步扩展和完善的字符编码体系。"
                },

                {
                    type: "paragraph",

                    text:
                        "这些编码解决了非常实际的问题：让计算机能够保存、显示和交换大量中文字符。"
                },

                {
                    type: "animation",

                    title:
                        "编码为什么越来越多？",

                    duration: 2500,

                    html:
                        `
                <div class="encoding-history-animation">

                    <div class="history-item ascii">
                        <strong>ASCII</strong>
                        <span>英文</span>
                    </div>

                    <div class="history-arrow">
                        →
                    </div>

                    <div class="history-item gb">
                        <strong>GB 系列</strong>
                        <span>中文环境</span>
                    </div>

                    <div class="history-arrow">
                        →
                    </div>

                    <div class="history-item unicode">
                        <strong>Unicode</strong>
                        <span>全球文字</span>
                    </div>

                </div>
                `,

                    css:
                        `
                .encoding-history-animation {
                    box-sizing: border-box;
                    min-height: 190px;
                    padding: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }

                .history-item {
                    width: 100px;
                    padding: 14px 10px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #ffffff;
                    text-align: center;
                    opacity: 0;
                    transform: translateY(8px);
                }

                .history-item strong {
                    display: block;
                    color: #263544;
                    font-size: 14px;
                }

                .history-item span {
                    display: block;
                    margin-top: 6px;
                    color: #7b8794;
                    font-size: 11px;
                }

                .history-item.unicode strong {
                    color: #3776AB;
                }

                .history-arrow {
                    color: #9aa8b5;
                    font-size: 20px;
                    opacity: 0;
                }
                `,

                    js:
                        `
                const items =
                    animationRoot.querySelectorAll(
                        ".history-item"
                    );

                const arrows =
                    animationRoot.querySelectorAll(
                        ".history-arrow"
                    );

                items.forEach(
                    (item, index) => {

                        setTimeout(() => {

                            item.style.opacity = "1";
                            item.style.transform =
                                "translateY(0)";
                            item.style.transition =
                                "all 300ms ease";

                        }, 300 + index * 700);

                    }
                );

                arrows.forEach(
                    (arrow, index) => {

                        setTimeout(() => {

                            arrow.style.opacity = "1";
                            arrow.style.transition =
                                "opacity 250ms ease";

                        }, 650 + index * 700);

                    }
                );
                `
                },

                {
                    type: "paragraph",

                    text:
                        "这里有一个非常重要的历史背景：不同地区出现不同编码以后，计算机之间交换文本就可能出现兼容问题。同一个数字，在不同编码规则下可能代表完全不同的字符。"
                },

                {
                    type: "callout",

                    title: "你可能见过的“乱码”",

                    text:
                        "如果一个文件使用某种编码保存，却使用另一种编码读取，原本正确的文字就可能变成一堆奇怪的字符。这就是我们常说的“乱码”。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "四、Unicode：希望世界文字有一套共同标准"
                },

                {
                    type: "paragraph",

                    text:
                        "随着互联网和全球软件的发展，仅仅让不同国家分别使用自己的编码显然不够。程序和数据需要跨平台、跨国家、跨语言交换。"
                },

                {
                    type: "paragraph",

                    text:
                        "于是 Unicode 出现了。它的目标非常简单：为世界上各种文字和符号建立一个统一的字符集合，让不同语言可以在同一个体系中表示。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "Python 中查看字符码点",

                    code:
                        `print(ord("A"))
print(ord("中"))
print(ord("你"))

print(chr(65))
print(chr(20013))`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的 ord() 可以得到字符对应的 Unicode 码点，而 chr() 可以根据一个码点得到对应的字符。你可以把 Unicode 码点理解成字符在统一字符体系中的编号。"
                },

                {
                    type: "callout",

                    title: "一个容易混淆的地方",

                    text:
                        "Unicode 和 UTF-8 不是同一个东西。Unicode 更像是一套统一的字符编号体系，而 UTF-8 是把这些字符编码成字节的一种方式。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "五、UTF-8：互联网时代非常重要的编码方式"
                },

                {
                    type: "paragraph",

                    text:
                        "Unicode 解决了“字符应该统一编号”的问题，但计算机真正保存和传输数据时，最终还是需要使用字节。于是就需要一种具体的编码方式，把 Unicode 字符转换成字节。"
                },

                {
                    type: "paragraph",

                    text:
                        "UTF-8 就是其中最重要的一种。它可以表示 Unicode 中的大量字符，同时对 ASCII 字符保持良好的兼容性，因此非常适合互联网、网页、文件和程序之间的数据交换。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "字符串与 UTF-8",

                    code:
                        `text = "Python 中文"

data = text.encode("utf-8")

print(text)
print(data)

print(type(text))
print(type(data))`
                },

                {
                    type: "paragraph",

                    text:
                        "这里第一次出现了一个很重要的区别：Python 中的 str 是字符串，而 encode() 可以把字符串编码成 bytes。字符串更接近我们平时理解的“文字”，bytes 则是计算机实际处理的字节数据。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "从 bytes 解码回来",

                    code:
                        `text = "Python 中文"

data = text.encode("utf-8")

result = data.decode("utf-8")

print(result)`
                },

                {
                    type: "paragraph",

                    text:
                        "encode() 可以理解成“把字符串编码成字节”，decode() 则是“把字节按照指定编码方式解码成字符串”。"
                },

                {
                    type: "callout",

                    title: "实际开发中需要记住多少？",

                    text:
                        "对于初学者来说，不需要深入研究编码算法。只需要记住：Python 的 str 用来处理文本，bytes 用来处理字节数据；UTF-8 是今天非常常见的文本编码方式。遇到文件、网络请求或乱码问题时，再进一步理解编码和解码即可。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "六、回到 Python：字符串是什么？"
                },

                {
                    type: "paragraph",

                    text:
                        "了解了文字编码的历史之后，我们回到真正需要掌握的内容：字符串。字符串用于表示文本，是 Python 中使用频率非常高的数据类型。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "创建字符串",

                    code:
                        `name = "Alice"
language = 'Python'

print(name)
print(language)

print(type(name))`
                },

                {
                    type: "paragraph",

                    text:
                        "Python 可以使用单引号或双引号创建字符串。两者在这里没有本质区别，实际编程时选择一种保持代码风格统一即可。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "七、字符串的长度"
                },

                {
                    type: "paragraph",

                    text:
                        "字符串最常见的操作之一，就是计算它有多长。Python 提供了 len() 函数。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "字符串长度",

                    code:
                        `text = "Python"

print(len(text))`
                },

                {
                    type: "paragraph",

                    text:
                        "len() 返回字符串包含的字符数量。对于 Python 初学阶段，可以先把它理解成“这个字符串有多少个字符”。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "中文字符串",

                    code:
                        `text = "你好 Python"

print(len(text))`
                },

                {
                    type: "paragraph",

                    text:
                        "Python 的字符串可以直接处理中文等 Unicode 文本。对于日常字符串操作，你不需要先把中文转换成某种特殊格式。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "八、字符串清洗"
                },

                {
                    type: "paragraph",

                    text:
                        "现实中的文本通常并不干净。用户可能多输入几个空格，大小写可能不统一，甚至可能需要把某些词替换成另外的内容。因此，字符串方法在实际项目中非常重要。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "常用字符串方法",

                    code:
                        `text = "  Python Programming  "

print(text.upper())
print(text.lower())
print(text.strip())
print(text.replace("Python", "JavaScript"))`
                },

                {
                    type: "paragraph",

                    text:
                        "upper() 可以把字母转换成大写，lower() 可以转换成小写，strip() 可以删除字符串两端的空白，而 replace() 可以把指定文本替换成新的文本。"
                },

                {
                    type: "concepts",

                    items: [

                        "len()：获取长度",

                        "upper()：转换为大写",

                        "lower()：转换为小写",

                        "strip()：删除两端空白",

                        "replace()：替换文本",

                        "startswith()：判断开头",

                        "endswith()：判断结尾",

                        "in：判断是否包含某个内容"

                    ]
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "九、判断字符串内容"
                },

                {
                    type: "paragraph",

                    text:
                        "除了修改字符串，我们还经常需要判断一个字符串是不是符合某种条件。例如，它是不是以某个词开头？是不是以某个后缀结尾？有没有包含某个关键词？"
                },

                {
                    type: "code",

                    language: "python",

                    title: "判断字符串内容",

                    code:
                        `text = "Python"

print(text.startswith("Py"))
print(text.endswith("on"))
print("thon" in text)
print("Java" in text)`
                },

                {
                    type: "paragraph",

                    text:
                        "这些操作都会产生 True 或 False，因此它们可以直接用于后面要学习的条件判断。"
                },

                {
                    type: "animation",

                    title:
                        "字符串也可以进行判断",

                    duration: 2200,

                    html:
                        `
                <div class="string-check-animation">

                    <div class="string-value">
                        Python
                    </div>

                    <div class="string-check">
                        "thon" in text
                    </div>

                    <div class="string-result">
                        True
                    </div>

                </div>
                `,

                    css:
                        `
                .string-check-animation {
                    box-sizing: border-box;
                    min-height: 180px;
                    padding: 30px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .string-value {
                    color: #263544;
                    font-size: 20px;
                    font-weight: 600;
                }

                .string-check {
                    margin-top: 16px;
                    padding: 7px 12px;
                    border-radius: 5px;
                    background: #eef4f8;
                    color: #3776AB;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 12px;
                    opacity: 0;
                }

                .string-result {
                    margin-top: 14px;
                    color: #3776AB;
                    font-size: 18px;
                    font-weight: 600;
                    opacity: 0;
                    transform: scale(0.8);
                }
                `,

                    js:
                        `
                const check =
                    animationRoot.querySelector(
                        ".string-check"
                    );

                const result =
                    animationRoot.querySelector(
                        ".string-result"
                    );

                setTimeout(() => {

                    check.style.opacity = "1";
                    check.style.transition =
                        "opacity 300ms ease";

                }, 600);

                setTimeout(() => {

                    result.style.opacity = "1";
                    result.style.transform =
                        "scale(1)";
                    result.style.transition =
                        "all 350ms ease";

                }, 1300);
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "十、字符串操作的真正用途"
                },

                {
                    type: "paragraph",

                    text:
                        "学习字符串方法不是为了记住一堆函数名称，而是为了以后能够处理真实的数据。例如用户输入、网页标题、文件名、搜索关键词、日志、文章内容等，本质上都是文本。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "清洗用户输入",

                    code:
                        `username = "   Alice   "

username = username.strip()

print(username)`
                },

                {
                    type: "code",

                    language: "python",

                    title: "统一大小写",

                    code:
                        `keyword = "Python"

print(keyword.lower())
print(keyword.upper())`
                },

                {
                    type: "code",

                    language: "python",

                    title: "判断关键词",

                    code:
                        `text = "Python is powerful"

print("Python" in text)
print("Java" in text)`
                },

                {
                    type: "paragraph",

                    text:
                        "这些看起来都只是非常简单的小操作，但真实的软件系统每天都在大量执行类似的文本处理。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "十一、关于编码，你现在真正需要记住什么？"
                },

                {
                    type: "checklist",

                    items: [

                        "ASCII 是早期非常重要的字符编码，主要面向英文字符和常见符号。",

                        "随着计算机进入不同语言环境，出现了各种地区性的编码方案，例如中文环境中的 GB 系列。",

                        "不同编码之间不兼容时，可能出现乱码。",

                        "Unicode 试图建立一个统一的全球字符体系。",

                        "UTF-8 是一种将 Unicode 字符编码成字节的方式，也是今天非常常见的编码方式。",

                        "Python 的 str 用来表示文本，bytes 用来表示字节数据。",

                        "encode() 可以把字符串编码成 bytes，decode() 可以把 bytes 解码成字符串。",

                        "日常 Python 编程中，大多数时候直接使用 str 就可以，不需要手动处理编码。"

                    ]
                },

                {
                    type: "callout",

                    title: "历史只需要理解到这里",

                    text:
                        "你现在不需要记住 ASCII、GBK、GB18030、Unicode、UTF-8 的具体编码规则。真正遇到文件读取、网络请求、乱码等问题时，再深入学习编码和解码即可。现在最重要的是熟练使用 Python 字符串。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "十二、小结"
                },

                {
                    type: "paragraph",

                    text:
                        "字符串是 Python 中非常重要的数据类型。编码解决的是“计算机如何表示和交换文字”的问题，而字符串操作解决的是“程序如何使用这些文字”的问题。"
                },

                {
                    type: "paragraph",

                    text:
                        "从现在开始，你会越来越频繁地处理文本。不要把字符串理解成只能 print() 出来的一段文字，它实际上是程序处理用户输入、文件、网页、搜索、数据和信息的重要基础。"
                },

                {
                    type: "practice",

                    title: "练习 11：文本清洗",

                    description:
                        "清理下面的用户输入：去掉两端空格，并把 Python 改成大写。",

                    starterCode:
                        `text = "   python is powerful   "

# 在这里完成清洗

print(text)`
                },

                {
                    type: "practice",

                    title: "练习 12：文本统计",

                    description:
                        "统计一段固定文本的字符长度，并判断其中是否包含 Python。",

                    starterCode:
                        `text = "Python 让内容创作更高效"

print("长度：", len(text))
print("是否包含 Python：", "Python" in text)`
                },

                {
                    type: "practice",

                    title: "练习 13：用户名清洗",

                    description:
                        "用户输入的用户名可能带有多余空格，并且大小写不统一。请先删除两端空格，再把用户名转换成小写。",

                    starterCode:
                        `username = "   Alice   "

# 在这里完成清洗

print(username)`
                }

            ]
        },


        /* =================================================
           01-09
        ================================================= */

        {
            id: "py-01-09",

            title: "字符串索引与切片",

            description:
                "理解字符串其实是一个有顺序的字符序列，掌握正索引、负索引、切片和步长，为后面的列表、元组等序列操作打下基础。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "前面我们已经学会了如何创建字符串，也学习了 len()、replace()、startswith()、in 等常用操作。接下来要解决一个非常重要的问题：如果一个字符串里有很多字符，我们怎样准确地取出其中某一个字符，或者取出其中的一部分？"
                },

                {
                    type: "paragraph",

                    text:
                        "Python 提供了两种非常重要的操作：索引（index）和切片（slice）。索引可以取出一个位置上的字符，切片则可以取出一段连续的字符。"
                },

                {
                    type: "callout",

                    title: "这一节要掌握什么？",

                    text:
                        "这一节不只是记住 text[0]、text[1:4] 这样的写法，更重要的是理解 Python 是怎样给字符串中的每一个字符编号的，以及 start、stop、step 三个参数分别控制什么。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "一、字符串是有顺序的"
                },

                {
                    type: "paragraph",

                    text:
                        "字符串不是一整块无法拆分的数据。对于 Python 来说，字符串可以看成是一串按照顺序排列的字符。例如字符串 Python 实际上包含 6 个字符：P、y、t、h、o、n。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "一个字符串包含多个字符",

                    code:
                        `text = "Python"

print(text)

print(len(text))`
                },

                {
                    type: "paragraph",

                    text:
                        "len(text) 的结果是 6，因为 Python 这个字符串中一共有 6 个字符。既然这些字符是按照顺序排列的，那么我们就需要一种方法表示每个字符的位置。这个位置就是索引。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "二、什么是索引？"
                },

                {
                    type: "paragraph",

                    text:
                        "索引可以简单理解为字符的位置编号。Python 的索引从 0 开始，而不是从 1 开始。"
                },

                {
                    type: "paragraph",

                    text:
                        "因此，对于字符串 Python，第一个字符 P 的索引是 0，第二个字符 y 的索引是 1，第三个字符 t 的索引是 2，以此类推。"
                },

                {
                    type: "animation",

                    title:
                        "字符串的索引从 0 开始",

                    duration:
                        3000,

                    html:
                        `
                <div class="string-index-animation">

                    <div class="string-index-word">
                        <span class="index-char">P</span>
                        <span class="index-char">y</span>
                        <span class="index-char">t</span>
                        <span class="index-char">h</span>
                        <span class="index-char">o</span>
                        <span class="index-char">n</span>
                    </div>

                    <div class="string-index-numbers">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                    </div>

                    <div class="string-index-label">
                        正索引
                    </div>

                </div>
                `,

                    css:
                        `
                .string-index-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 38px 24px;
                    text-align: center;
                    background: #ffffff;
                }

                .string-index-word,
                .string-index-numbers {
                    display: flex;
                    justify-content: center;
                    gap: 0;
                }

                .index-char,
                .string-index-numbers span {
                    box-sizing: border-box;
                    width: 48px;
                    text-align: center;
                }

                .index-char {
                    color: #263544;
                    font-size: 26px;
                    font-weight: 600;
                }

                .string-index-numbers {
                    margin-top: 12px;
                    color: #3776ab;
                    font-size: 15px;
                    font-weight: 700;
                }

                .string-index-label {
                    margin-top: 18px;
                    color: #7b8794;
                    font-size: 12px;
                }

                .index-char.active {
                    transform: translateY(-5px);
                    color: #3776ab;
                }

                .string-index-numbers span.active {
                    color: #3776ab;
                    transform: scale(1.2);
                }
                `,

                    js:
                        `
                const chars =
                    animationRoot.querySelectorAll(
                        ".index-char"
                    );

                const indexes =
                    animationRoot.querySelectorAll(
                        ".string-index-numbers span"
                    );

                let current = 0;

                function highlight() {

                    chars.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );

                    indexes.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );

                    if (
                        current >= chars.length
                    ) {
                        return;
                    }

                    chars[current]
                        .classList.add("active");

                    indexes[current]
                        .classList.add("active");

                    current++;

                    setTimeout(
                        highlight,
                        420
                    );
                }

                highlight();
                `
                },

                {
                    type: "code",

                    language: "python",

                    title: "使用索引访问字符",

                    code:
                        `text = "Python"

print(text[0])
print(text[1])
print(text[2])
print(text[3])
print(text[4])
print(text[5])`
                },

                {
                    type: "paragraph",

                    text:
                        "text[0] 表示取出索引为 0 的字符，也就是第一个字符。text[1] 表示第二个字符。这里最容易出现的错误就是把索引和人的自然计数方式混在一起：人通常从第 1 个开始数，而 Python 从索引 0 开始。"
                },

                {
                    type: "note",

                    title: "记住这一点",

                    description:
                        "索引是位置编号，不是第几个。Python 的第一个字符，索引是 0。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "三、为什么索引从 0 开始？"
                },

                {
                    type: "paragraph",

                    text:
                        "刚开始学习 Python 时，索引从 0 开始可能会觉得奇怪。你可以先把它理解成一种约定：第一个元素的位置偏移量是 0，第二个元素相对于第一个元素向后移动了 1 个位置，因此索引是 1。"
                },

                {
                    type: "paragraph",

                    text:
                        "现在不需要深入研究计算机底层地址和内存，只需要形成一个稳定的习惯：看到 text[0]，就知道它表示第一个字符。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "四、负索引：从字符串末尾开始数"
                },

                {
                    type: "paragraph",

                    text:
                        "除了从左边开始编号，Python 还提供了负索引。负索引从字符串的最后一个字符开始向前数。"
                },

                {
                    type: "animation",

                    title:
                        "正索引和负索引",

                    duration:
                        3000,

                    html:
                        `
                <div class="negative-index-animation">

                    <div class="negative-word">

                        <span>P</span>
                        <span>y</span>
                        <span>t</span>
                        <span>h</span>
                        <span>o</span>
                        <span>n</span>

                    </div>

                    <div class="negative-row positive-row">

                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>

                    </div>

                    <div class="negative-row negative-row">

                        <span>-6</span>
                        <span>-5</span>
                        <span>-4</span>
                        <span>-3</span>
                        <span>-2</span>
                        <span>-1</span>

                    </div>

                    <div class="negative-label">
                        正索引 ←　　→ 负索引
                    </div>

                </div>
                `,

                    css:
                        `
                .negative-index-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 36px 20px;
                    text-align: center;
                    background: #ffffff;
                }

                .negative-word,
                .negative-row {
                    display: flex;
                    justify-content: center;
                }

                .negative-word span,
                .negative-row span {
                    width: 58px;
                    text-align: center;
                }

                .negative-word span {
                    color: #263544;
                    font-size: 25px;
                    font-weight: 600;
                }

                .positive-row {
                    margin-top: 12px;
                    color: #3776ab;
                    font-weight: 700;
                }

                .negative-row {
                    margin-top: 9px;
                    color: #7b8794;
                    font-size: 13px;
                }

                .negative-row span.active {
                    color: #3776ab;
                    font-weight: 700;
                    transform: scale(1.15);
                }

                .negative-label {
                    margin-top: 18px;
                    color: #7b8794;
                    font-size: 12px;
                }
                `,

                    js:
                        `
                const negativeIndexes =
                    animationRoot.querySelectorAll(
                        ".negative-row span"
                    );

                let index = 5;

                function highlight() {

                    negativeIndexes.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );

                    if (
                        index < 0
                    ) {
                        return;
                    }

                    negativeIndexes[index]
                        .classList.add("active");

                    index--;

                    setTimeout(
                        highlight,
                        420
                    );
                }

                highlight();
                `
                },

                {
                    type: "code",

                    language: "python",

                    title: "负索引",

                    code:
                        `text = "Python"

print(text[-1])
print(text[-2])
print(text[-3])

print(text[-6])`
                },

                {
                    type: "paragraph",

                    text:
                        "text[-1] 表示最后一个字符，text[-2] 表示倒数第二个字符。因此，当我们只关心字符串末尾的数据时，负索引非常方便。"
                },

                {
                    type: "callout",

                    title: "正索引和负索引",

                    text:
                        "对于 Python 这个长度为 6 的字符串，正索引范围是 0 到 5，负索引范围是 -6 到 -1。最后一个字符既可以写成 text[5]，也可以写成 text[-1]。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "五、索引越界"
                },

                {
                    type: "paragraph",

                    text:
                        "索引必须落在有效范围内。如果字符串长度是 6，那么正索引最大只能是 5。如果访问不存在的位置，Python 会产生 IndexError。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "索引越界",

                    code:
                        `text = "Python"

print(text[5])

# print(text[6])`
                },

                {
                    type: "paragraph",

                    text:
                        "实际编程时，如果你不确定字符串是否足够长，可以先使用 len() 获取长度，再决定访问哪个位置。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "六、什么是切片？"
                },

                {
                    type: "paragraph",

                    text:
                        "索引解决的是“取一个字符”的问题。切片解决的是“取一段字符”的问题。"
                },

                {
                    type: "paragraph",

                    text:
                        "切片使用一对方括号，并在里面写 start 和 stop。基本形式是 sequence[start:stop]。"
                },

                {
                    type: "animation",

                    title:
                        "切片：从 start 到 stop，但不包含 stop",

                    duration:
                        2800,

                    html:
                        `
                <div class="slice-animation">

                    <div class="slice-word">

                        <span>P</span>
                        <span>y</span>
                        <span>t</span>
                        <span>h</span>
                        <span>o</span>
                        <span>n</span>

                    </div>

                    <div class="slice-index">

                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>

                    </div>

                    <div class="slice-range">
                        text[1:4]
                    </div>

                    <div class="slice-result">
                        yth
                    </div>

                </div>
                `,

                    css:
                        `
                .slice-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 34px 20px;
                    text-align: center;
                    background: #ffffff;
                }

                .slice-word,
                .slice-index {
                    display: flex;
                    justify-content: center;
                }

                .slice-word span,
                .slice-index span {
                    width: 50px;
                    text-align: center;
                }

                .slice-word span {
                    color: #263544;
                    font-size: 25px;
                    font-weight: 600;
                }

                .slice-index {
                    margin-top: 10px;
                    color: #7b8794;
                    font-size: 13px;
                }

                .slice-word span.selected {
                    color: #3776ab;
                    transform: translateY(-4px);
                }

                .slice-range {
                    margin-top: 18px;
                    color: #3776ab;
                    font-family: Consolas, monospace;
                    font-size: 15px;
                    font-weight: 700;
                }

                .slice-result {
                    margin-top: 10px;
                    color: #263544;
                    font-size: 17px;
                    font-weight: 600;
                    opacity: 0;
                }

                .slice-result.show {
                    opacity: 1;
                }
                `,

                    js:
                        `
                const chars =
                    animationRoot.querySelectorAll(
                        ".slice-word span"
                    );

                const result =
                    animationRoot.querySelector(
                        ".slice-result"
                    );

                chars.forEach(
                    (char, index) => {

                        if (
                            index >= 1 &&
                            index < 4
                        ) {

                            setTimeout(
                                () => {
                                    char.classList.add(
                                        "selected"
                                    );
                                },
                                index * 300
                            );

                        }

                    }
                );

                setTimeout(
                    () => {
                        result.classList.add(
                            "show"
                        );
                    },
                    1600
                );
                `
                },

                {
                    type: "code",

                    language: "python",

                    title: "基本切片",

                    code:
                        `text = "Python"

print(text[0:2])
print(text[0:4])
print(text[2:6])`
                },

                {
                    type: "paragraph",

                    text:
                        "text[0:2] 表示从索引 0 开始，一直到索引 2 之前。因此得到的是 Py，而不是 Pyt。这里有一个非常重要的规则：start 包含，stop 不包含。"
                },

                {
                    type: "note",

                    title: "切片最重要的规则",

                    description:
                        "text[start:stop] 中，start 会被包含，stop 不会被包含。也可以把它理解成左闭右开：[start, stop)。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "七、省略 start 和 stop"
                },

                {
                    type: "paragraph",

                    text:
                        "切片非常方便的一点是，start 和 stop 都可以省略。省略 start 表示从开头开始，省略 stop 表示一直取到结尾。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "省略切片参数",

                    code:
                        `text = "Python"

print(text[:3])
print(text[3:])
print(text[:])`
                },

                {
                    type: "paragraph",

                    text:
                        "text[:3] 表示从开头取到索引 3 之前；text[3:] 表示从索引 3 一直取到字符串末尾；text[:] 则表示整个字符串。"
                },

                {
                    type: "animation",

                    title:
                        "切片范围可以从开头或结尾开始",

                    duration:
                        2600,

                    html:
                        `
                <div class="slice-short-animation">

                    <div class="slice-short-word">

                        <span>P</span>
                        <span>y</span>
                        <span>t</span>
                        <span>h</span>
                        <span>o</span>
                        <span>n</span>

                    </div>

                    <div class="slice-short-code">
                        text[:3]
                    </div>

                    <div class="slice-short-result">
                        Pyt
                    </div>

                </div>
                `,

                    css:
                        `
                .slice-short-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 34px 20px;
                    text-align: center;
                    background: #ffffff;
                }

                .slice-short-word {
                    display: flex;
                    justify-content: center;
                }

                .slice-short-word span {
                    width: 50px;
                    color: #263544;
                    font-size: 25px;
                    font-weight: 600;
                }

                .slice-short-word span.active {
                    color: #3776ab;
                    transform: translateY(-4px);
                }

                .slice-short-code {
                    margin-top: 18px;
                    color: #3776ab;
                    font-family: Consolas, monospace;
                    font-weight: 700;
                }

                .slice-short-result {
                    margin-top: 9px;
                    color: #263544;
                    opacity: 0;
                }

                .slice-short-result.show {
                    opacity: 1;
                }
                `,

                    js:
                        `
                const chars =
                    animationRoot.querySelectorAll(
                        ".slice-short-word span"
                    );

                const result =
                    animationRoot.querySelector(
                        ".slice-short-result"
                    );

                [0, 1, 2].forEach(
                    (index) => {

                        setTimeout(
                            () => {

                                chars[index]
                                    .classList.add(
                                        "active"
                                    );

                            },
                            index * 300
                        );

                    }
                );

                setTimeout(
                    () => {
                        result.classList.add(
                            "show"
                        );
                    },
                    1300
                );
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "八、切片的第三个参数：step"
                },

                {
                    type: "paragraph",

                    text:
                        "切片实际上不只有 start 和 stop 两个参数。完整形式是 sequence[start:stop:step]。第三个参数 step 表示每次向前移动多少个位置。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "步长",

                    code:
                        `text = "Python"

print(text[::2])
print(text[1::2])
print(text[::-1])`
                },

                {
                    type: "paragraph",

                    text:
                        "text[::2] 表示从头开始，每隔一个字符取一个。text[1::2] 表示从索引 1 开始，每隔一个字符取一个。"
                },

                {
                    type: "animation",

                    title:
                        "step = 2：每隔一个字符取一个",

                    duration:
                        2600,

                    html:
                        `
                <div class="step-animation">

                    <div class="step-word">

                        <span>P</span>
                        <span>y</span>
                        <span>t</span>
                        <span>h</span>
                        <span>o</span>
                        <span>n</span>

                    </div>

                    <div class="step-index">

                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>

                    </div>

                    <div class="step-code">
                        text[::2]
                    </div>

                    <div class="step-result">
                        Pto
                    </div>

                </div>
                `,

                    css:
                        `
                .step-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 34px 20px;
                    text-align: center;
                    background: #ffffff;
                }

                .step-word,
                .step-index {
                    display: flex;
                    justify-content: center;
                }

                .step-word span,
                .step-index span {
                    width: 50px;
                    text-align: center;
                }

                .step-word span {
                    color: #263544;
                    font-size: 25px;
                    font-weight: 600;
                }

                .step-index {
                    margin-top: 10px;
                    color: #7b8794;
                    font-size: 13px;
                }

                .step-word span.active {
                    color: #3776ab;
                    transform: translateY(-4px);
                }

                .step-code {
                    margin-top: 18px;
                    color: #3776ab;
                    font-family: Consolas, monospace;
                    font-weight: 700;
                }

                .step-result {
                    margin-top: 9px;
                    color: #263544;
                    opacity: 0;
                }

                .step-result.show {
                    opacity: 1;
                }
                `,

                    js:
                        `
                const chars =
                    animationRoot.querySelectorAll(
                        ".step-word span"
                    );

                const indexes = [
                    0,
                    2,
                    4
                ];

                const result =
                    animationRoot.querySelector(
                        ".step-result"
                    );

                indexes.forEach(
                    (index, position) => {

                        setTimeout(
                            () => {

                                chars[index]
                                    .classList.add(
                                        "active"
                                    );

                            },
                            position * 400
                        );

                    }
                );

                setTimeout(
                    () => {
                        result.classList.add(
                            "show"
                        );
                    },
                    1500
                );
                `
                },

                {
                    type: "paragraph",

                    text:
                        "step 还可以是负数。最常见的例子就是 text[::-1]，它表示从后向前读取字符串，因此可以非常方便地得到一个反转后的字符串。"
                },

                {
                    type: "animation",

                    title:
                        "负步长：从后向前",

                    duration:
                        2600,

                    html:
                        `
                <div class="reverse-animation">

                    <div class="reverse-word">

                        <span>P</span>
                        <span>y</span>
                        <span>t</span>
                        <span>h</span>
                        <span>o</span>
                        <span>n</span>

                    </div>

                    <div class="reverse-code">
                        text[::-1]
                    </div>

                    <div class="reverse-result">
                        nohtyP
                    </div>

                </div>
                `,

                    css:
                        `
                .reverse-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 34px 20px;
                    text-align: center;
                    background: #ffffff;
                }

                .reverse-word {
                    display: flex;
                    justify-content: center;
                }

                .reverse-word span {
                    width: 50px;
                    color: #263544;
                    font-size: 25px;
                    font-weight: 600;
                }

                .reverse-word span.active {
                    color: #3776ab;
                    transform: translateY(-4px);
                }

                .reverse-code {
                    margin-top: 18px;
                    color: #3776ab;
                    font-family: Consolas, monospace;
                    font-weight: 700;
                }

                .reverse-result {
                    margin-top: 9px;
                    color: #263544;
                    font-weight: 600;
                    opacity: 0;
                }

                .reverse-result.show {
                    opacity: 1;
                }
                `,

                    js:
                        `
                const chars =
                    animationRoot.querySelectorAll(
                        ".reverse-word span"
                    );

                const result =
                    animationRoot.querySelector(
                        ".reverse-result"
                    );

                const order = [
                    5,
                    4,
                    3,
                    2,
                    1,
                    0
                ];

                order.forEach(
                    (index, position) => {

                        setTimeout(
                            () => {

                                chars[index]
                                    .classList.add(
                                        "active"
                                    );

                            },
                            position * 250
                        );

                    }
                );

                setTimeout(
                    () => {
                        result.classList.add(
                            "show"
                        );
                    },
                    1700
                );
                `
                },

                {
                    type: "callout",

                    title:
                        "切片的完整形式",

                    text:
                        "sequence[start:stop:step]。start 决定从哪里开始，stop 决定在哪里结束（不包含 stop），step 决定每次移动多少个位置。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "九、索引和切片有什么区别？"
                },

                {
                    type: "paragraph",

                    text:
                        "可以把索引理解成“拿一个”，把切片理解成“拿一段”。索引最终得到的是一个字符，而切片得到的是一个新的字符串。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "索引和切片",

                    code:
                        `text = "Python"

character = text[1]
part = text[1:4]

print(character)
print(part)`
                },

                {
                    type: "concepts",

                    items: [
                        {
                            title: "索引",

                            description:
                                "使用一个位置编号访问单个字符，例如 text[0]。"
                        },
                        {
                            title: "负索引",

                            description:
                                "从字符串末尾开始访问，例如 text[-1] 表示最后一个字符。"
                        },
                        {
                            title: "切片",

                            description:
                                "使用 start:stop 取得一段字符串，start 包含，stop 不包含。"
                        },
                        {
                            title: "步长",

                            description:
                                "使用 step 控制切片每次移动多少个位置。"
                        }
                    ]
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "十、切片在实际程序中的应用"
                },

                {
                    type: "paragraph",

                    text:
                        "索引和切片并不是为了做字符串游戏。在实际程序中，我们经常需要从一段文本中提取固定格式的信息。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "提取年份",

                    code:
                        `date = "2026-10-06"

year = date[:4]
month = date[5:7]
day = date[8:]

print("年份：", year)
print("月份：", month)
print("日期：", day)`
                },

                {
                    type: "paragraph",

                    text:
                        "类似的操作在处理日期、文件名、编号、账号、商品编码等数据时非常常见。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "处理用户名",

                    code:
                        `username = "python_student"

prefix = username[:6]
suffix = username[-7:]

print(prefix)
print(suffix)`
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "十一、一个重要细节：字符串不能直接修改"
                },

                {
                    type: "paragraph",

                    text:
                        "字符串支持索引和切片，但字符串本身不能通过索引直接修改。也就是说，下面这种写法是不允许的。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "字符串不能通过索引直接修改",

                    code:
                        `text = "Python"

# text[0] = "J"`
                },

                {
                    type: "paragraph",

                    text:
                        "如果我们想得到一个修改后的字符串，通常需要创建一个新的字符串。例如，可以通过切片和字符串拼接完成。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "通过创建新字符串完成修改",

                    code:
                        `text = "Python"

text = "J" + text[1:]

print(text)`
                },

                {
                    type: "callout",

                    title: "为什么要知道这个？",

                    text:
                        "索引和切片可以读取字符串，但不能直接修改字符串中的某一个字符。理解这一点，可以避免以后学习字符串处理时产生很多困惑。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "十二、把索引和切片放在一起理解"
                },

                {
                    type: "paragraph",

                    text:
                        "现在回头看 Python 这个字符串，我们已经可以从多个方向理解它：可以通过正索引从左向右访问，也可以通过负索引从右向左访问，还可以使用切片一次取得一段字符。"
                },

                {
                    type: "animation",

                    title:
                        "一个字符串的完整索引体系",

                    duration:
                        3200,

                    html:
                        `
                <div class="full-index-animation">

                    <div class="full-row full-negative">

                        <span>-6</span>
                        <span>-5</span>
                        <span>-4</span>
                        <span>-3</span>
                        <span>-2</span>
                        <span>-1</span>

                    </div>

                    <div class="full-row full-word">

                        <span>P</span>
                        <span>y</span>
                        <span>t</span>
                        <span>h</span>
                        <span>o</span>
                        <span>n</span>

                    </div>

                    <div class="full-row full-positive">

                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>

                    </div>

                    <div class="full-expression">
                        text[1:5]
                    </div>

                    <div class="full-result">
                        ytho
                    </div>

                </div>
                `,

                    css:
                        `
                .full-index-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 34px 20px;
                    text-align: center;
                    background: #ffffff;
                }

                .full-row {
                    display: flex;
                    justify-content: center;
                }

                .full-row span {
                    width: 55px;
                    text-align: center;
                }

                .full-negative {
                    color: #8a96a3;
                    font-size: 12px;
                }

                .full-word {
                    margin-top: 9px;
                    color: #263544;
                    font-size: 25px;
                    font-weight: 600;
                }

                .full-positive {
                    margin-top: 9px;
                    color: #3776ab;
                    font-size: 13px;
                    font-weight: 700;
                }

                .full-expression {
                    margin-top: 19px;
                    color: #3776ab;
                    font-family: Consolas, monospace;
                    font-weight: 700;
                }

                .full-result {
                    margin-top: 9px;
                    color: #263544;
                    font-weight: 600;
                    opacity: 0;
                }

                .full-result.show {
                    opacity: 1;
                }

                .full-word span.active {
                    color: #3776ab;
                    transform: translateY(-4px);
                }
                `,

                    js:
                        `
                const chars =
                    animationRoot.querySelectorAll(
                        ".full-word span"
                    );

                const result =
                    animationRoot.querySelector(
                        ".full-result"
                    );

                const selected = [
                    1,
                    2,
                    3,
                    4
                ];

                selected.forEach(
                    (index, position) => {

                        setTimeout(
                            () => {

                                chars[index]
                                    .classList.add(
                                        "active"
                                    );

                            },
                            position * 280
                        );

                    }
                );

                setTimeout(
                    () => {

                        result.classList.add(
                            "show"
                        );

                    },
                    1500
                );
                `
                },

                {
                    type: "checklist",

                    title: "本节重点",

                    items: [
                        "字符串中的字符按照顺序排列，每个字符都有自己的索引。",
                        "Python 的索引从 0 开始。",
                        "正索引从左向右，负索引从右向左。",
                        "text[-1] 表示最后一个字符。",
                        "text[start:stop] 中 start 包含，stop 不包含。",
                        "可以省略 start 或 stop。",
                        "text[start:stop:step] 可以通过 step 控制移动间隔。",
                        "step 为 -1 时可以从后向前读取字符串。",
                        "索引可以读取单个字符，切片可以读取一段字符串。",
                        "字符串不能通过索引直接修改。"
                    ]
                },

                {
                    type: "practice",

                    title: "练习 13：提取信息",

                    description:
                        "从字符串中分别取出前 3 个字符、最后 3 个字符，并生成反转字符串。",

                    starterCode:
                        `text = "TutorialStudio"

first_three = ""
last_three = ""
reversed_text = ""

print(first_three)
print(last_three)
print(reversed_text)`
                },

                {
                    type: "practice",

                    title: "练习 14：判断回文",

                    description:
                        "判断一个字符串反过来以后是否和原字符串相同。例如 level 是回文字符串。",

                    starterCode:
                        `text = "level"

reversed_text = text[::-1]

print("原字符串：", text)
print("反转字符串：", reversed_text)
print("是否回文：", text == reversed_text)`
                },

                {
                    type: "practice",

                    title: "练习 15：提取日期",

                    description:
                        "给定一个 YYYY-MM-DD 格式的日期字符串，分别提取年份、月份和日期。",

                    starterCode:
                        `date = "2026-10-06"

year = ""
month = ""
day = ""

print("年份：", year)
print("月份：", month)
print("日期：", day)`
                },

                {
                    type: "practice",

                    title: "练习 16：提取用户名",

                    description:
                        "给定一个用户名字符串，分别取出前 4 个字符、最后 4 个字符，并判断用户名是否是回文字符串。",

                    starterCode:
                        `username = "level"

first_four = ""
last_four = ""
is_palindrome = False

print("前 4 个字符：", first_four)
print("后 4 个字符：", last_four)
print("是否回文：", is_palindrome)`
                }

            ]
        },


        /* =================================================
           01-10
        ================================================= */

        {
            id: "py-01-10",

            title: "input()：让程序和用户交互",

            description:
                "让程序从用户获取数据，理解 input() 的工作方式，并第一次写出能够根据用户输入产生不同结果的程序。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "到目前为止，我们写的大多数程序都是自己准备好数据，然后让 Python 执行。例如，我们可以把 name = \"Alice\" 直接写进程序里。但真正的软件通常不能只处理程序员提前写好的数据，而是需要让用户告诉程序自己想做什么。"
                },

                {
                    type: "paragraph",

                    text:
                        "例如，登录程序需要用户输入账号和密码；计算器需要用户输入数字；问卷程序需要用户填写答案。Python 提供了 input() 函数，让程序可以从用户那里获取输入。"
                },

                {
                    type: "attention",

                    title: "特别提醒：本网站的 Python 运行环境",

                    description:
                        "本课程中的 Python 代码是在服务器端的受限运行环境中执行的。为了防止恶意代码影响服务器，运行环境关闭了很多需要直接访问操作系统、终端或进行交互式输入的功能，其中包括 input()。因此，下面的 input() 示例主要用于学习 Python 语法和程序设计思想，在当前网站的在线运行器中可能无法正常等待你输入。遇到这种情况不是你的代码写错了。"
                },

                {
                    type: "paragraph",

                    text:
                        "在自己的电脑上安装 Python 后，直接运行 .py 文件时，input() 是可以正常使用的。也就是说，我们需要区分“Python 本身支持什么”和“当前网站为了安全允许什么”。"
                },

                {
                    type: "callout",

                    title: "理解一个重要概念",

                    text:
                        "Python 支持 input()，但服务器端的安全运行环境可以选择禁止 input()。程序语言的能力和运行环境允许的能力，并不是完全相同的事情。"
                },

                {
                    type: "callout",

                    title: "本章只有这一节使用 input()",

                    text:
                        "从下一节开始，本章所有示例、实战和练习都使用固定数据，保证可以直接在在线运行器中运行。这里专门讲 input()，是为了帮助你理解交互式程序的工作方式；在本地 Python 环境中运行这些示例时，再把固定数据替换成 input()。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "一、最简单的 input()"
                },

                {
                    type: "paragraph",

                    text:
                        "input() 的作用非常直接：让程序读取用户输入的一行文本。最简单的写法是直接调用 input()。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "读取用户输入",

                    code:
                        `name = input("请输入你的名字：")

print("你好，", name)`
                },

                {
                    type: "paragraph",

                    text:
                        "程序运行到 input() 时，会显示括号里的提示文字，然后等待用户输入。用户输入内容并按下回车后，input() 会把这段内容交给程序。"
                },

                {
                    type: "animation",

                    title:
                        "input() 是怎样工作的？",

                    duration:
                        3000,

                    html:
                        `
                <div class="input-flow-animation">

                    <div class="input-flow-program">
                        input("请输入你的名字：")
                    </div>

                    <div class="input-flow-arrow">
                        ↓
                    </div>

                    <div class="input-flow-user">
                        用户输入：Alice
                    </div>

                    <div class="input-flow-arrow">
                        ↓
                    </div>

                    <div class="input-flow-result">
                        name = "Alice"
                    </div>

                </div>
                `,

                    css:
                        `
                .input-flow-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 30px 20px;
                    background: #ffffff;
                    text-align: center;
                }

                .input-flow-program,
                .input-flow-user,
                .input-flow-result {
                    display: inline-block;
                    padding: 10px 16px;
                    border: 1px solid #dce4ec;
                    border-radius: 7px;
                    color: #263544;
                    font-family:
                        Consolas,
                        monospace;
                    font-size: 13px;
                    background: #f7f9fc;
                }

                .input-flow-user {
                    color: #3776ab;
                }

                .input-flow-result {
                    color: #263544;
                }

                .input-flow-arrow {
                    margin: 8px 0;
                    color: #8a96a3;
                    font-size: 18px;
                    opacity: 0;
                }

                .input-flow-animation.active
                    .input-flow-arrow {
                    opacity: 1;
                }
                `,

                    js:
                        `
                const arrows =
                    animationRoot.querySelectorAll(
                        ".input-flow-arrow"
                    );

                setTimeout(
                    () => {
                        arrows[0]
                            .style.opacity = "1";
                    },
                    600
                );

                setTimeout(
                    () => {
                        arrows[1]
                            .style.opacity = "1";
                    },
                    1500
                );
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "二、input() 返回什么？"
                },

                {
                    type: "paragraph",

                    text:
                        "这里有一个非常重要的知识点：input() 返回的是字符串。无论用户输入看起来像什么，Python 默认都会把输入内容作为字符串返回。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "input() 返回字符串",

                    code:
                        `age = input("请输入年龄：")

print(age)
print(type(age))`
                },

                {
                    type: "paragraph",

                    text:
                        "如果用户输入 18，input() 得到的并不是整数 18，而是字符串 \"18\"。这一区别非常重要，因为字符串和数字可以进行的操作并不一样。"
                },

                {
                    type: "animation",

                    title:
                        "输入 18，并不等于得到整数 18",

                    duration:
                        2600,

                    html:
                        `
                <div class="input-type-animation">

                    <div class="input-type-user">
                        用户输入：18
                    </div>

                    <div class="input-type-arrow">
                        ↓
                    </div>

                    <div class="input-type-string">
                        "18"
                    </div>

                    <div class="input-type-label">
                        str
                    </div>

                </div>
                `,

                    css:
                        `
                .input-type-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 32px 20px;
                    text-align: center;
                    background: #ffffff;
                }

                .input-type-user,
                .input-type-string {
                    display: inline-block;
                    padding: 10px 18px;
                    border-radius: 7px;
                    border: 1px solid #dce4ec;
                    background: #f7f9fc;
                    color: #263544;
                    font-family:
                        Consolas,
                        monospace;
                    font-size: 15px;
                }

                .input-type-string {
                    color: #3776ab;
                    font-weight: 600;
                }

                .input-type-arrow {
                    margin: 8px 0;
                    color: #8a96a3;
                    font-size: 18px;
                }

                .input-type-label {
                    margin-top: 9px;
                    color: #7b8794;
                    font-size: 12px;
                }
                `,

                    js:
                        `
                const stringBox =
                    animationRoot.querySelector(
                        ".input-type-string"
                    );

                stringBox.style.opacity = "0";

                setTimeout(
                    () => {
                        stringBox.style.opacity = "1";
                    },
                    800
                );
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "三、为什么输入的数字还是字符串？"
                },

                {
                    type: "paragraph",

                    text:
                        "想象一下用户在键盘上输入了一串字符：1 和 8。对于 input() 来说，它首先接收到的是用户输入的文本，而不是一个已经完成数学意义解析的整数。"
                },

                {
                    type: "paragraph",

                    text:
                        "因此，input() 会返回字符串 \"18\"。如果程序需要把它当成数字使用，就需要主动进行类型转换。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "把输入转换成整数",

                    code:
                        `age = input("请输入年龄：")

age = int(age)

print(age)
print(type(age))`
                },

                {
                    type: "paragraph",

                    text:
                        "这里实际上发生了两步操作：第一步，input() 得到字符串；第二步，int() 尝试把这个字符串转换成整数。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "也可以直接写在一起",

                    code:
                        `age = int(
    input("请输入年龄：")
)

print(age + 1)`
                },

                {
                    type: "callout",

                    title: "非常常见的写法",

                    text:
                        "int(input(...)) 可以理解为：先获取用户输入，再把输入的字符串转换成整数。这种写法以后会非常常见。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "四、字符串不能直接当数字计算"
                },

                {
                    type: "code",

                    language: "python",

                    title: "字符串和数字不能直接相加",

                    code:
                        `age = input("请输入年龄：")

# 下面这一行会出错
# print(age + 1)

print("你输入的是：", age)`
                },

                {
                    type: "paragraph",

                    text:
                        "如果用户输入 18，那么 age 实际上保存的是字符串 \"18\"。字符串和整数不是同一种类型，因此不能直接执行 \"18\" + 1 这样的运算。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "正确的写法",

                    code:
                        `age = input("请输入年龄：")

age = int(age)

print("明年你将是：", age + 1, "岁")`
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "五、input() 不一定只输入数字"
                },

                {
                    type: "paragraph",

                    text:
                        "虽然我们经常用 input() 获取年龄、数量等数字，但 input() 本身并不知道用户准备输入什么。它可以读取名字、城市、职业、商品名称等各种文本。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "读取不同类型的信息",

                    code:
                        `name = input("姓名：")
city = input("城市：")
job = input("职业：")

print("姓名：", name)
print("城市：", city)
print("职业：", job)`
                },

                {
                    type: "paragraph",

                    text:
                        "这些内容本身就是文本，因此不需要转换成 int。什么时候需要转换，取决于程序后面要对数据做什么。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "六、input() 和变量结合起来"
                },

                {
                    type: "paragraph",

                    text:
                        "input() 真正有用的地方，是可以把用户输入保存到变量中。这样后面的程序就可以继续使用用户提供的数据。"
                },

                {
                    type: "animation",

                    title:
                        "用户输入 → 变量 → 程序继续执行",

                    duration:
                        3000,

                    html:
                        `
                <div class="input-variable-animation">

                    <div class="input-variable-step">
                        用户输入
                        <strong>Alice</strong>
                    </div>

                    <div class="input-variable-arrow">
                        ↓
                    </div>

                    <div class="input-variable-step">
                        name
                        <strong>"Alice"</strong>
                    </div>

                    <div class="input-variable-arrow">
                        ↓
                    </div>

                    <div class="input-variable-step">
                        print("你好，", name)
                    </div>

                </div>
                `,

                    css:
                        `
                .input-variable-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 30px 20px;
                    background: #ffffff;
                    text-align: center;
                }

                .input-variable-step {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 15px;
                    border: 1px solid #dce4ec;
                    border-radius: 7px;
                    background: #f7f9fc;
                    color: #263544;
                    font-family:
                        Consolas,
                        monospace;
                    font-size: 13px;
                }

                .input-variable-step strong {
                    color: #3776ab;
                }

                .input-variable-arrow {
                    margin: 8px 0;
                    color: #8a96a3;
                    font-size: 18px;
                }
                `,

                    js:
                        `
                const steps =
                    animationRoot.querySelectorAll(
                        ".input-variable-step"
                    );

                steps.forEach(
                    step => {
                        step.style.opacity = "0.35";
                    }
                );

                steps.forEach(
                    (step, index) => {

                        setTimeout(
                            () => {
                                step.style.opacity = "1";
                            },
                            index * 750
                        );

                    }
                );
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "七、输入之后还可以继续处理"
                },

                {
                    type: "paragraph",

                    text:
                        "用户输入的数据并不是程序的终点。通常我们会先读取输入，然后进行判断、计算、转换或者格式化，最后得到程序结果。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "根据年龄计算结果",

                    code:
                        `age = int(
    input("请输入年龄：")
)

next_age = age + 1

print(
    "明年你将是：",
    next_age,
    "岁"
)`
                },

                {
                    type: "paragraph",

                    text:
                        "这已经开始接近真正程序的结构了：获取数据 → 保存数据 → 处理数据 → 输出结果。后面学习条件判断和循环以后，这种结构会越来越常见。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "八、输入数字时要注意类型转换"
                },

                {
                    type: "code",

                    language: "python",

                    title: "整数输入",

                    code:
                        `count = int(
    input("数量：")
)

print(count * 2)`
                },

                {
                    type: "code",

                    language: "python",

                    title: "小数输入",

                    code:
                        `price = float(
    input("价格：")
)

print(price * 2)`
                },

                {
                    type: "paragraph",

                    text:
                        "如果需要输入整数，可以使用 int()；如果需要输入带小数的数字，可以使用 float()。但要注意，如果用户输入的内容不能转换成对应类型，Python 会产生错误。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "输入必须符合预期格式",

                    code:
                        `age = int(
    input("请输入年龄：")
)

print(age)`
                },

                {
                    type: "paragraph",

                    text:
                        "例如用户输入 abc，就无法转换成整数。现在我们还没有学习异常处理，因此暂时只需要知道：类型转换不是万能的，输入内容必须符合程序预期。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "九、从 input() 理解程序的交互过程"
                },

                {
                    type: "paragraph",

                    text:
                        "到这里，我们可以把一个简单的交互式程序理解成一个完整的过程：程序提出问题，用户提供数据，程序保存数据，然后继续执行。"
                },

                {
                    type: "image",

                    alt:
                        "Python 输入处理流程",

                    html:
                        `
                <div class="input-process-figure">

                    <div>
                        程序
                    </div>

                    <div class="input-process-arrow">
                        ↓
                    </div>

                    <div>
                        input()
                    </div>

                    <div class="input-process-arrow">
                        ↓
                    </div>

                    <div>
                        用户输入
                    </div>

                    <div class="input-process-arrow">
                        ↓
                    </div>

                    <div>
                        变量
                    </div>

                    <div class="input-process-arrow">
                        ↓
                    </div>

                    <div>
                        程序处理
                    </div>

                </div>
                `,

                    css:
                        `
                .input-process-figure {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 28px 20px;
                    background: #ffffff;
                    text-align: center;
                    color: #263544;
                    font-size: 13px;
                }

                .input-process-figure > div:not(
                    .input-process-arrow
                ) {
                    display: inline-block;
                    min-width: 130px;
                    padding: 9px 14px;
                    border: 1px solid #dce4ec;
                    border-radius: 7px;
                    background: #f7f9fc;
                }

                .input-process-arrow {
                    margin: 6px 0;
                    color: #8a96a3;
                }
                `,

                    caption:
                        "一个简单的交互式程序通常经历：获取输入、保存数据、处理数据、输出结果。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "十、为什么网站上的 input() 不能使用？"
                },

                {
                    type: "paragraph",

                    text:
                        "这一点需要特别说明。你现在看到的 Python 代码不是直接在自己的电脑终端中运行，而是发送到服务器，由服务器上的 Python 运行环境执行。"
                },

                {
                    type: "paragraph",

                    text:
                        "如果服务器允许任意代码直接访问终端、操作系统资源或者等待交互式输入，就可能给服务器带来安全风险。因此，我们的在线 Python 运行器会运行在受限制的环境中，并主动关闭一些高风险或不适合服务器端执行的功能。"
                },

                {
                    type: "attention",

                    title: "再次提醒：input() 在本网站中不能作为在线练习运行",

                    description:
                        "学习 input() 的代码没有问题，但当前服务器端 Python Runner 已经关闭了 input()。因此，不要因为这里的示例无法等待输入，就认为 Python 的 input() 不能使用。你可以把这些代码复制到自己的电脑 Python 环境中运行。"
                },

                {
                    type: "callout",

                    title: "Python 本身 ≠ 当前运行环境",

                    text:
                        "Python 是一门编程语言，运行环境则决定程序能够访问哪些资源。为了服务器安全，本课程的在线运行器会限制部分功能。这是 Web 在线执行代码时非常重要的安全设计。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "十一、把多个输入组合起来"
                },

                {
                    type: "code",

                    language: "python",

                    title: "个人信息程序",

                    code:
                        `name = input("姓名：")
city = input("城市：")
job = input("职业：")

print()
print("个人信息")
print("姓名：", name)
print("城市：", city)
print("职业：", job)`
                },

                {
                    type: "paragraph",

                    text:
                        "这个程序已经具备了一个非常基本的交互式程序结构：先向用户提出问题，再把用户的回答保存到变量中，最后把这些数据组织起来输出。"
                },

                {
                    type: "checklist",

                    title: "本节重点",

                    items: [
                        "input() 用来获取用户输入。",
                        "input() 默认返回字符串。",
                        "用户输入的 18 得到的是字符串 \"18\"，不是整数 18。",
                        "需要进行数学计算时，可以使用 int() 或 float() 进行类型转换。",
                        "input() 获取的数据可以保存到变量中。",
                        "输入数据之后，可以继续进行计算、判断和处理。",
                        "用户输入必须符合程序预期的格式，否则类型转换可能失败。",
                        "Python 本身支持 input()，但运行环境可以限制 input()。",
                        "本课程使用服务器端 Python Runner，为了安全关闭了 input() 等部分功能。",
                        "在线运行器无法使用 input() 不代表 Python 本身不支持 input()。"
                    ]
                },

                {
                    type: "practice",

                    title: "练习 15：个人信息程序",

                    description:
                        "分别读取姓名、城市和职业，然后输出完整介绍。注意：本网站的在线运行器已经关闭 input()，因此可以先阅读并理解代码，再复制到本地 Python 环境运行。",

                    starterCode:
                        `name = input("姓名：")
city = input("城市：")
job = input("职业：")

print("个人信息")
print("姓名：", name)
print("城市：", city)
print("职业：", job)`
                },

                {
                    type: "practice",

                    title: "练习 16：年龄计算",

                    description:
                        "读取用户年龄，将输入转换成整数，然后计算明年年龄。注意：input() 在本网站的在线运行器中不可用。",

                    starterCode:
                        `age = int(
    input("请输入年龄：")
)

next_age = age + 1

print("明年你将是：", next_age, "岁")`
                }

            ]
        },


        /* =================================================
           01-11
        ================================================= */

        {
            id: "py-01-11",

            title: "类型转换",

            description:
                "理解为什么需要类型转换，掌握 int()、float()、str()、bool() 等基本类型转换，并学会根据数据的用途选择合适的类型。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "前面我们已经认识了 int、float、str、bool 等基本数据类型。不同类型的数据可以进行的操作并不完全相同。例如，数字可以进行数学运算，字符串主要用于表示文本。"
                },

                {
                    type: "paragraph",

                    text:
                        "但是在实际程序中，我们经常会遇到这样的情况：数据本身没有错，只是它当前的类型不适合接下来要做的操作。这时候，就需要进行类型转换。"
                },

                {
                    type: "callout",

                    title: "类型转换到底是为了解决什么？",

                    text:
                        "类型转换的核心不是“把数据变一下”，而是让数据变成适合当前操作的类型。例如字符串 \"18\" 不能直接参与 age + 1 这样的数学运算，就需要先把它转换成整数 18。"
                },

                {
                    type: "animation",

                    title:
                        "同样的数据，不同的类型意味着不同的用途",

                    duration:
                        2800,

                    html:
                        `
                <div class="type-conversion-animation">

                    <div class="type-conversion-box">

                        <div class="type-conversion-value">
                            "18"
                        </div>

                        <div class="type-conversion-type">
                            str
                        </div>

                    </div>

                    <div class="type-conversion-arrow">
                        →
                    </div>

                    <div class="type-conversion-box">

                        <div class="type-conversion-value">
                            18
                        </div>

                        <div class="type-conversion-type">
                            int
                        </div>

                    </div>

                    <div class="type-conversion-use">
                        可以参与数学运算
                    </div>

                </div>
                `,

                    css:
                        `
                .type-conversion-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 34px 20px;
                    background: #ffffff;
                    text-align: center;
                }

                .type-conversion-box {
                    display: inline-block;
                    min-width: 90px;
                    padding: 11px 15px;
                    border: 1px solid #dce4ec;
                    border-radius: 7px;
                    background: #f7f9fc;
                    vertical-align: middle;
                }

                .type-conversion-value {
                    color: #263544;
                    font-family: Consolas, monospace;
                    font-size: 17px;
                    font-weight: 600;
                }

                .type-conversion-type {
                    margin-top: 5px;
                    color: #7b8794;
                    font-size: 11px;
                }

                .type-conversion-arrow {
                    display: inline-block;
                    margin: 0 14px;
                    color: #3776ab;
                    font-size: 20px;
                    vertical-align: middle;
                }

                .type-conversion-use {
                    margin-top: 18px;
                    color: #3776ab;
                    font-size: 12px;
                }
                `,

                    js:
                        `
                const boxes =
                    animationRoot.querySelectorAll(
                        ".type-conversion-box"
                    );

                const use =
                    animationRoot.querySelector(
                        ".type-conversion-use"
                    );

                boxes[1].style.opacity = "0.25";
                use.style.opacity = "0";

                setTimeout(
                    () => {
                        boxes[1].style.opacity = "1";
                    },
                    700
                );

                setTimeout(
                    () => {
                        use.style.opacity = "1";
                    },
                    1500
                );
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "一、为什么需要类型转换？"
                },

                {
                    type: "paragraph",

                    text:
                        "最简单的例子就是字符串和数字。看起来 \"18\" 和 18 很像，但它们实际上是两种完全不同的数据。前者是字符串，后者是整数。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "字符串 18 和整数 18",

                    code:
                        `text = "18"
number = 18

print(text)
print(number)

print(type(text))
print(type(number))`
                },

                {
                    type: "paragraph",

                    text:
                        "text 保存的是字符串 \"18\"，number 保存的是整数 18。它们打印出来看起来很接近，但 Python 对它们的处理方式不同。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "类型不同，运算结果也不同",

                    code:
                        `text = "18"
number = 18

print(text + "2")
print(number + 2)`
                },

                {
                    type: "paragraph",

                    text:
                        "第一行是字符串拼接，得到 \"182\"；第二行是整数加法，得到 20。这就是为什么我们必须关注数据类型。"
                },

                {
                    type: "callout",

                    title: "一个非常重要的思维方式",

                    text:
                        "看到一个数据时，不仅要问“它是什么值”，还要问“它是什么类型”。值决定数据表示什么，类型决定它可以怎样被处理。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "二、str()、int()、float() 是什么？"
                },

                {
                    type: "paragraph",

                    text:
                        "Python 提供了一些非常常用的类型转换函数。最基础的三个就是 str()、int() 和 float()。"
                },

                {
                    type: "concepts",

                    items: [

                        {
                            title: "int()",

                            description:
                                "把符合条件的数据转换成整数。"
                        },

                        {
                            title: "float()",

                            description:
                                "把符合条件的数据转换成浮点数。"
                        },

                        {
                            title: "str()",

                            description:
                                "把数据转换成字符串。"
                        },

                        {
                            title: "bool()",

                            description:
                                "根据数据的真假规则得到 True 或 False。"
                        }

                    ]
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "三、字符串转换成整数"
                },

                {
                    type: "paragraph",

                    text:
                        "当我们手里有一个表示整数的字符串时，可以使用 int() 把它转换成真正的整数。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "字符串转整数",

                    code:
                        `age_text = "18"

age = int(age_text)

print(age)
print(type(age))

print(age + 1)`
                },

                {
                    type: "paragraph",

                    text:
                        "int(age_text) 会创建一个整数，并把转换后的结果保存到 age。之后 age 就可以正常参与数学运算。"
                },

                {
                    type: "animation",

                    title:
                        "int()：把数字文本转换成整数",

                    duration:
                        2600,

                    html:
                        `
                <div class="int-animation">

                    <div class="int-animation-value">
                        "18"
                    </div>

                    <div class="int-animation-label">
                        str
                    </div>

                    <div class="int-animation-arrow">
                        int()
                    </div>

                    <div class="int-animation-value result">
                        18
                    </div>

                    <div class="int-animation-label">
                        int
                    </div>

                </div>
                `,

                    css:
                        `
                .int-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 32px 20px;
                    background: #ffffff;
                    text-align: center;
                }

                .int-animation-value {
                    display: inline-block;
                    padding: 10px 16px;
                    border: 1px solid #dce4ec;
                    border-radius: 7px;
                    background: #f7f9fc;
                    color: #263544;
                    font-family: Consolas, monospace;
                    font-size: 16px;
                }

                .int-animation-value.result {
                    color: #3776ab;
                    opacity: 0;
                }

                .int-animation-label {
                    display: inline-block;
                    margin: 0 10px;
                    color: #7b8794;
                    font-size: 11px;
                }

                .int-animation-arrow {
                    display: inline-block;
                    margin: 0 12px;
                    color: #3776ab;
                    font-family: Consolas, monospace;
                    font-weight: 700;
                }
                `,

                    js:
                        `
                const result =
                    animationRoot.querySelector(
                        ".int-animation-value.result"
                    );

                setTimeout(
                    () => {
                        result.style.opacity = "1";
                    },
                    800
                );
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "四、字符串转换成浮点数"
                },

                {
                    type: "paragraph",

                    text:
                        "如果字符串表示的是带小数的数字，可以使用 float() 进行转换。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "字符串转浮点数",

                    code:
                        `price_text = "19.99"

price = float(price_text)

print(price)
print(type(price))

print(price * 2)`
                },

                {
                    type: "paragraph",

                    text:
                        "转换完成以后，price 就是 float 类型，可以参与浮点数计算。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "int 和 float 的区别",

                    code:
                        `number_a = int("18")
number_b = float("18.5")

print(number_a)
print(type(number_a))

print(number_b)
print(type(number_b))`
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "五、数字转换成字符串"
                },

                {
                    type: "paragraph",

                    text:
                        "类型转换并不只是把字符串转换成数字。有时候我们反过来也需要把数字转换成字符串。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "数字转字符串",

                    code:
                        `age = 18

text = str(age)

print(text)
print(type(text))`
                },

                {
                    type: "paragraph",

                    text:
                        "str(age) 会得到字符串 \"18\"。这种转换在生成文本、拼接字符串以及组织输出内容时非常常见。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "把数字放进文本",

                    code:
                        `age = 18

message = "我的年龄是 " + str(age)

print(message)`
                },

                {
                    type: "paragraph",

                    text:
                        "这里必须使用 str(age)，因为字符串只能和字符串进行这种拼接。如果直接把整数 age 和字符串相加，就会产生类型错误。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "六、bool()：把数据转换成布尔值"
                },

                {
                    type: "paragraph",

                    text:
                        "除了 int()、float() 和 str()，Python 还有一个非常重要的转换函数 bool()。它可以根据 Python 的真假规则，把一个值转换成 True 或 False。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "bool() 的基本例子",

                    code:
                        `print(bool(1))
print(bool(0))

print(bool("hello"))
print(bool(""))

print(bool(100))
print(bool(None))`
                },

                {
                    type: "paragraph",

                    text:
                        "在 Python 中，0、空字符串、None 等值通常会被视为假，而非空字符串以及大多数非零数字会被视为真。"
                },

                {
                    type: "note",

                    title: "先记住常见情况",

                    description:
                        "这一阶段可以先记住：bool(0) 是 False，bool(1) 是 True，bool(\"\") 是 False，bool(\"hello\") 是 True。更完整的真假规则会在条件判断章节中进一步学习。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "七、类型转换不是随便转换"
                },

                {
                    type: "paragraph",

                    text:
                        "并不是任何数据都可以直接转换成任何类型。转换函数需要能够理解原来的数据，否则就会产生异常。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "无法转换的字符串",

                    code:
                        `text = "abc"

# 下面这一行无法把 abc 转换成整数
# number = int(text)

print(text)`
                },

                {
                    type: "paragraph",

                    text:
                        "例如 int(\"abc\") 没有合理的整数结果，因此 Python 会产生异常。这里先记住这个现象即可，异常处理会在后面的章节系统学习。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "可以转换的情况",

                    code:
                        `print(int("18"))
print(int("-5"))

print(float("19.99"))
print(float("3.14"))`
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "八、不要把类型转换理解成“改变原来的数据”"
                },

                {
                    type: "paragraph",

                    text:
                        "调用 int()、float() 或 str() 时，可以把它理解成根据原来的值创建一个符合目标类型的新结果。原来的变量不会因为调用转换函数而自动改变。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "转换结果需要保存",

                    code:
                        `text = "18"

int(text)

print(text)
print(type(text))`
                },

                {
                    type: "paragraph",

                    text:
                        "上面的 int(text) 虽然执行了转换，但我们没有保存转换结果，所以 text 仍然是字符串。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "保存转换后的结果",

                    code:
                        `text = "18"

number = int(text)

print(text)
print(type(text))

print(number)
print(type(number))`
                },

                {
                    type: "callout",

                    title: "转换后的结果在哪里？",

                    text:
                        "int(text) 的结果需要保存到变量中，或者直接用于后面的表达式。类型转换函数不会偷偷改变原来的变量。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "九、类型转换不只用于用户输入"
                },

                {
                    type: "paragraph",

                    text:
                        "类型转换经常出现在读取外部数据之后，但类型转换本身并不是为了某一种输入方式而存在的。只要数据的类型不符合计算要求，就可能需要转换。"
                },

                {
                    type: "paragraph",

                    text:
                        "在真实程序中，数据可能来自很多地方：文件、数据库、网络接口、用户界面、配置文件、程序计算结果等。只要数据的类型和当前操作不匹配，就可能需要进行类型转换。"
                },

                {
                    type: "image",

                    alt:
                        "类型转换在程序中的位置",

                    html:
                        `
                <div class="conversion-source-figure">

                    <div class="conversion-source-item">
                        文本
                    </div>

                    <div class="conversion-source-arrow">
                        →
                    </div>

                    <div class="conversion-source-item active">
                        类型转换
                    </div>

                    <div class="conversion-source-arrow">
                        →
                    </div>

                    <div class="conversion-source-item">
                        数字
                    </div>

                    <div class="conversion-source-arrow">
                        →
                    </div>

                    <div class="conversion-source-item">
                        计算
                    </div>

                </div>
                `,

                    css:
                        `
                .conversion-source-figure {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 28px 15px;
                    background: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    flex-wrap: wrap;
                    color: #263544;
                    font-size: 13px;
                }

                .conversion-source-item {
                    padding: 9px 13px;
                    border: 1px solid #dce4ec;
                    border-radius: 7px;
                    background: #f7f9fc;
                }

                .conversion-source-item.active {
                    color: #3776ab;
                    border-color: #cbddea;
                    font-weight: 600;
                }

                .conversion-source-arrow {
                    color: #8a96a3;
                    font-size: 16px;
                }
                `,

                    caption:
                        "类型转换可以发生在程序处理数据的任何阶段，并不只和用户输入有关。"
                },

                {
                    type: "attention",

                    title: "本课程在线运行器的特别说明",

                    description:
                        "为了降低服务器端执行 Python 代码的安全风险，本课程的在线运行环境关闭了需要交互式终端或访问系统资源的功能。因此，本节示例使用已经存在的变量和固定数据，代码可以直接在在线运行器中学习和测试。"
                },

                {
                    type: "paragraph",

                    text:
                        "这也是实际开发中很重要的一种思路：如果一个功能不是当前知识点的重点，就不要让它成为运行代码的额外依赖。本节真正要学习的是类型转换，因此我们直接使用 age_text = \"18\"、price_text = \"19.99\" 这样的数据来演示。"
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "十、类型转换的实际应用"
                },

                {
                    type: "paragraph",

                    text:
                        "现在我们把前面的知识组合起来。假设程序中已经获得了一些文本数据，我们可以根据实际用途把它转换成数字，再进行计算。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "年龄计算",

                    code:
                        `birth_year_text = "2000"

birth_year = int(birth_year_text)

current_year = 2026

age = current_year - birth_year

print("出生年份：", birth_year)
print("年龄大约是：", age)`
                },

                {
                    type: "code",

                    language: "python",

                    title: "购物计算器",

                    code:
                        `price_text = "19.99"
quantity_text = "3"

price = float(price_text)
quantity = int(quantity_text)

total = price * quantity

print("商品价格：", price)
print("购买数量：", quantity)
print("总价：", total)`
                },

                {
                    type: "paragraph",

                    text:
                        "注意，这里的数据原本都是字符串，但我们根据后面的用途分别把它们转换成了 float 和 int。price 需要参与带小数的价格计算，因此使用 float；quantity 表示整数数量，因此使用 int。"
                },

                {
                    type: "animation",

                    title:
                        "根据数据用途选择类型",

                    duration:
                        3000,

                    html:
                        `
                <div class="conversion-choice-animation">

                    <div class="conversion-choice-item">
                        <div class="conversion-choice-value">
                            "19.99"
                        </div>
                        <div class="conversion-choice-label">
                            商品价格
                        </div>
                        <div class="conversion-choice-type">
                            float
                        </div>
                    </div>

                    <div class="conversion-choice-item">
                        <div class="conversion-choice-value">
                            "3"
                        </div>
                        <div class="conversion-choice-label">
                            购买数量
                        </div>
                        <div class="conversion-choice-type">
                            int
                        </div>
                    </div>

                </div>
                `,

                    css:
                        `
                .conversion-choice-animation {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 30px 20px;
                    display: flex;
                    justify-content: center;
                    gap: 24px;
                    background: #ffffff;
                }

                .conversion-choice-item {
                    min-width: 125px;
                    padding: 13px;
                    border: 1px solid #dce4ec;
                    border-radius: 8px;
                    background: #f7f9fc;
                    text-align: center;
                }

                .conversion-choice-value {
                    color: #263544;
                    font-family: Consolas, monospace;
                    font-weight: 600;
                }

                .conversion-choice-label {
                    margin-top: 7px;
                    color: #7b8794;
                    font-size: 11px;
                }

                .conversion-choice-type {
                    margin-top: 7px;
                    color: #3776ab;
                    font-size: 12px;
                    font-weight: 700;
                }
                `,

                    js:
                        `
                const items =
                    animationRoot.querySelectorAll(
                        ".conversion-choice-item"
                    );

                items.forEach(
                    item => {
                        item.style.opacity = "0.35";
                    }
                );

                setTimeout(
                    () => {
                        items[0].style.opacity = "1";
                    },
                    500
                );

                setTimeout(
                    () => {
                        items[1].style.opacity = "1";
                    },
                    1200
                );
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text:
                        "十一、类型转换的基本规律"
                },

                {
                    type: "paragraph",

                    text:
                        "学习类型转换时，不需要一开始就记住所有可能的转换规则。先掌握最常见的几种：字符串形式的整数可以转换成 int，字符串形式的小数可以转换成 float，数字可以转换成 str，很多值可以转换成 bool。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "常见类型转换",

                    code:
                        `print(int("18"))
print(float("19.99"))

print(str(2026))
print(str(3.14))

print(bool(0))
print(bool(1))
print(bool("")) 
print(bool("Python"))`
                },

                {
                    type: "checklist",

                    title: "本节重点",

                    items: [
                        "类型决定数据可以进行什么样的操作。",
                        "类型转换的目的，是让数据变成适合当前操作的类型。",
                        "int() 可以把符合条件的数据转换成整数。",
                        "float() 可以把符合条件的数据转换成浮点数。",
                        "str() 可以把数据转换成字符串。",
                        "bool() 可以根据 Python 的真假规则得到 True 或 False。",
                        "字符串 \"18\" 和整数 18 是不同的数据类型。",
                        "类型转换的结果需要保存，或者直接用于后续表达式。",
                        "不是所有数据都可以成功转换，例如 int(\"abc\") 会产生异常。",
                        "类型转换并不只用于用户输入，数据可以来自很多不同来源。",
                        "本课程示例使用固定数据，以便代码可以直接在服务器端安全运行。"
                    ]
                },

                {
                    type: "practice",

                    title: "练习 16：年龄计算器",

                    description:
                        "将字符串形式的出生年份转换成整数，然后计算近似年龄。本练习使用固定数据，可以直接在在线运行器中执行。",

                    starterCode:
                        `birth_year_text = "2000"

birth_year = 0

current_year = 2026

age = current_year - birth_year

print("你的年龄大约是：", age)`
                },

                {
                    type: "practice",

                    title: "练习 17：BMI 计算器",

                    description:
                        "将字符串形式的身高和体重转换成浮点数，根据 BMI = weight / height² 计算 BMI。本练习使用固定数据。",

                    starterCode:
                        `height_text = "1.75"
weight_text = "65"

height = 0
weight = 0

bmi = weight / (height ** 2)

print("BMI：", bmi)`
                },

                {
                    type: "practice",

                    title: "练习 18：圆面积",

                    description:
                        "将字符串形式的半径转换成浮点数，然后计算圆面积。本练习使用固定数据，可以直接在在线运行器中执行。",

                    starterCode:
                        `import math

radius_text = "5"

radius = 0

area = math.pi * radius ** 2

print("圆面积：", area)`
                }

            ]
        },

        /* =================================================
           01-12
        ================================================= */

        {
            id: "py-01-12",

            title: "f-string：让输出更漂亮",

            description:
                "理解为什么需要字符串格式化，掌握 f-string 的基本写法，以及数字、百分比、对齐、宽度、正负号、千位分隔符等常见格式化方法，并学会生成真实的数据报告。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "前面我们已经学习了字符串、变量、表达式和类型转换。到这里，程序已经可以完成计算，也可以把结果输出到屏幕上。但是很快你会发现一个新的问题：程序算出来的数据，怎样才能以清晰、整齐、适合人阅读的方式显示出来？"
                },

                {
                    type: "paragraph",

                    text:
                        "例如，一个程序计算出了商品名称、价格、数量、销售额和完成率。如果只是简单地使用 print() 输出数据，程序当然可以工作，但最终显示出来的内容可能不够整齐，也很难控制数字应该保留几位小数、百分比应该显示成什么样子，以及多个数据应该怎样对齐。"
                },

                {
                    type: "callout",

                    title: "为什么需要字符串格式化？",

                    text:
                        "程序不仅需要“算对数据”，还需要“把数据说清楚”。字符串格式化就是解决这个问题的：把程序中的变量和计算结果按照指定的规则组织成适合人阅读的文本。"
                },

                {
                    type: "paragraph",

                    text:
                        "字符串格式化并不是 Python 特有的需求。几乎所有编程语言都需要解决类似的问题。例如价格需要显示两位小数，完成率需要显示百分号，大数字需要加入千位分隔符，表格中的数据需要对齐。"
                },

                {
                    type: "heading",

                    level: 2,

                    text: "一、f-string 是什么？"
                },

                {
                    type: "paragraph",

                    text:
                        "f-string 是 Python 中非常常用的一种字符串格式化方式。它的基本写法是在字符串前面加一个 f，然后在字符串中的花括号 {} 里放入变量或者表达式。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "最基本的 f-string",

                    code:
                        `name = "Alice"
age = 20

message = f"我叫{name}，今年{age}岁。"

print(message)`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的 {name} 和 {age} 会被 Python 替换成对应变量的值。因此最终输出的是一段普通文本。"
                },

                {
                    type: "animation",

                    title: "f-string 是怎样工作的？",

                    duration: 1800,

                    html:
                        `
                <div class="fstring-flow">

                    <div class="fstring-source">
                        f"我叫{name}，今年{age}岁。"
                    </div>

                    <div class="fstring-arrow">
                        ↓
                    </div>

                    <div class="fstring-result">
                        我叫 Alice，今年 20 岁。
                    </div>

                </div>
                `,

                    css:
                        `
                .fstring-flow {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 32px 20px;
                    background: #ffffff;
                    text-align: center;
                }

                .fstring-source {
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 17px;
                }

                .fstring-arrow {
                    margin: 15px 0;
                    color: #3776ab;
                    font-size: 22px;
                }

                .fstring-result {
                    color: #3776ab;
                    font-size: 17px;
                    font-weight: 600;
                }
                `,

                    js:
                        `
                const result =
                    animationRoot.querySelector(
                        ".fstring-result"
                    );

                result.style.opacity = "0";
                result.style.transform =
                    "translateY(8px)";

                setTimeout(() => {

                    result.style.transition =
                        "opacity 0.4s ease, transform 0.4s ease";

                    result.style.opacity = "1";
                    result.style.transform =
                        "translateY(0)";

                }, 500);
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text: "二、f-string 和字符串拼接有什么区别？"
                },

                {
                    type: "paragraph",

                    text:
                        "在学习 f-string 之前，我们已经可以使用 + 把多个字符串连接起来。这种方法叫字符串拼接。它没有错，但当变量越来越多时，代码会变得比较繁琐。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "字符串拼接",

                    code:
                        `name = "Alice"
age = 20

message = (
    "我叫" +
    name +
    "，今年" +
    str(age) +
    "岁。"
)

print(message)`
                },

                {
                    type: "paragraph",

                    text:
                        "这里还有一个问题：age 是整数，而字符串只能和字符串进行 + 拼接，所以我们需要先使用 str(age) 把整数转换成字符串。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "使用 f-string",

                    code:
                        `name = "Alice"
age = 20

message = f"我叫{name}，今年{age}岁。"

print(message)`
                },

                {
                    type: "paragraph",

                    text:
                        "f-string 不需要我们手动把 age 转换成字符串。更重要的是，它让代码的结构更接近最终显示的结果：文字写文字，变量直接放在对应的位置。"
                },

                {
                    type: "callout",

                    title: "什么时候使用 f-string？",

                    text:
                        "只要你需要把变量或计算结果放进一段文本中，f-string 通常都是非常自然的选择。尤其是在生成提示信息、日志、报告、表格和数据摘要时非常常见。"
                },

                {
                    type: "heading",

                    level: 2,

                    text: "三、{} 里面可以放什么？"
                },

                {
                    type: "paragraph",

                    text:
                        "f-string 最基本的功能是把变量放进 {}。但是花括号中的内容并不只限于变量，还可以放表达式。Python 会先计算表达式，再把结果放进字符串。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "花括号中放变量",

                    code:
                        `name = "Python"
version = 3.14

print(f"语言：{name}")
print(f"版本：{version}")`
                },

                {
                    type: "code",

                    language: "python",

                    title: "花括号中放表达式",

                    code:
                        `price = 19.9
quantity = 3

print(f"总价：{price * quantity} 元")`
                },

                {
                    type: "code",

                    language: "python",

                    title: "更多表达式",

                    code:
                        `a = 10
b = 3

print(f"加法：{a + b}")
print(f"乘法：{a * b}")
print(f"平方：{a ** 2}")
print(f"是否相等：{a == b}")`
                },

                {
                    type: "paragraph",

                    text:
                        "虽然 {} 中可以写表达式，但并不意味着所有复杂计算都应该直接写进去。如果表达式很长，最好先计算出结果，再放入 f-string。这样代码更容易阅读和维护。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "复杂计算先保存结果",

                    code:
                        `price = 19.9
quantity = 3

total = price * quantity

print(f"商品价格：{price}")
print(f"购买数量：{quantity}")
print(f"总价：{total}")`
                },

                {
                    type: "heading",

                    level: 2,

                    text: "四、数字格式化"
                },

                {
                    type: "paragraph",

                    text:
                        "前面的例子已经可以把数字放进字符串，但是直接显示数字时，Python 会使用默认的显示方式。实际程序中，我们经常希望自己决定数字应该怎样显示。"
                },

                {
                    type: "paragraph",

                    text:
                        "例如价格通常需要保留两位小数，百分比需要显示百分号，大数字需要使用千位分隔符。这些都属于数字格式化。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "基本数字格式化",

                    code:
                        `price = 19.9999

print(f"默认：{price}")
print(f"保留两位小数：{price:.2f}")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的 : 表示“接下来指定格式”。.2f 是一种格式说明符，其中 .2 表示保留两位小数，f 表示按照浮点数格式显示。"
                },

                {
                    type: "image",

                    alt:
                        "f-string 数字格式说明示意图",

                    html:
                        `
                <div class="format-figure">

                    <div class="format-code">
                        {price:.2f}
                    </div>

                    <div class="format-parts">

                        <div class="format-item">
                            <strong>price</strong>
                            <span>数据</span>
                        </div>

                        <div class="format-item">
                            <strong>:</strong>
                            <span>开始格式化</span>
                        </div>

                        <div class="format-item">
                            <strong>.2</strong>
                            <span>两位小数</span>
                        </div>

                        <div class="format-item">
                            <strong>f</strong>
                            <span>浮点数</span>
                        </div>

                    </div>

                </div>
                `,

                    css:
                        `
                .format-figure {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 30px 20px;
                    background: #ffffff;
                    text-align: center;
                }

                .format-code {
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 20px;
                    font-weight: 600;
                }

                .format-parts {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 22px;
                }

                .format-item {
                    min-width: 72px;
                    padding: 9px 12px;
                    border:
                        1px solid #dce4ec;
                    border-radius: 6px;
                }

                .format-item strong {
                    display: block;
                    color: #3776ab;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 13px;
                }

                .format-item span {
                    display: block;
                    margin-top: 5px;
                    color: #7b8794;
                    font-size: 10px;
                }
                `,

                    caption:
                        "格式说明符位于冒号 : 后面，用来控制数据最终显示的形式。"
                },

                {
                    type: "heading",

                    level: 2,

                    text: "五、小数位数"
                },

                {
                    type: "paragraph",

                    text:
                        "控制小数位数是最常见的格式化需求之一。金额、平均成绩、测量数据等通常不需要显示很多位小数。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "控制小数位数",

                    code:
                        `number = 3.1415926

print(f"{number:.0f}")
print(f"{number:.1f}")
print(f"{number:.2f}")
print(f"{number:.3f}")`
                },

                {
                    type: "paragraph",

                    text:
                        ".0f、.1f、.2f、.3f 分别表示保留 0、1、2、3 位小数。Python 会按照指定的精度进行显示和四舍五入。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "金额通常保留两位小数",

                    code:
                        `price = 29.9
quantity = 3

total = price * quantity

print(f"单价：{price:.2f} 元")
print(f"总价：{total:.2f} 元")`
                },

                {
                    type: "heading",

                    level: 2,

                    text: "六、百分比格式化"
                },

                {
                    type: "paragraph",

                    text:
                        "程序中经常使用 0 到 1 之间的小数表示比例。例如 0.856 表示 85.6%。如果直接显示 0.856，用户需要自己进行换算。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "把小数显示成百分比",

                    code:
                        `rate = 0.856

print(f"完成率：{rate:.1%}")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的 % 会把小数按照百分比显示，.1 表示保留一位小数。因此 0.856 最终会显示为 85.6%。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "控制百分比小数位",

                    code:
                        `rate = 0.856

print(f"{rate:.0%}")
print(f"{rate:.1%}")
print(f"{rate:.2%}")`
                },

                {
                    type: "animation",

                    title: "百分比格式化",

                    duration: 1600,

                    html:
                        `
                <div class="percent-flow">

                    <div class="percent-source">
                        0.856
                    </div>

                    <div class="percent-arrow">
                        ↓
                    </div>

                    <div class="percent-result">
                        85.6%
                    </div>

                </div>
                `,

                    css:
                        `
                .percent-flow {
                    box-sizing: border-box;
                    width: 100%;
                    padding: 28px 20px;
                    background: #ffffff;
                    text-align: center;
                }

                .percent-source {
                    color: #263544;
                    font-family:
                        "SFMono-Regular",
                        Consolas,
                        monospace;
                    font-size: 22px;
                }

                .percent-arrow {
                    margin: 12px 0;
                    color: #3776ab;
                    font-size: 20px;
                }

                .percent-result {
                    color: #3776ab;
                    font-size: 22px;
                    font-weight: 600;
                }
                `,

                    js:
                        `
                const result =
                    animationRoot.querySelector(
                        ".percent-result"
                    );

                result.style.opacity = "0";
                result.style.transform =
                    "scale(0.94)";

                setTimeout(() => {

                    result.style.transition =
                        "opacity 0.35s ease, transform 0.35s ease";

                    result.style.opacity = "1";
                    result.style.transform =
                        "scale(1)";

                }, 500);
                `
                },

                {
                    type: "heading",

                    level: 2,

                    text: "七、宽度"
                },

                {
                    type: "paragraph",

                    text:
                        "除了控制小数位数，f-string 还可以指定一个字段的最小宽度。例如，我们希望一列数字至少占 10 个字符的位置，就可以使用 :10 这样的格式。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "设置字段宽度",

                    code:
                        `name = "Python"

print(f"|{name}|")
print(f"|{name:10}|")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的 10 表示字段至少占 10 个字符的位置。如果实际内容不足 10 个字符，Python 会自动使用空格补足。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "宽度不足时自动补空格",

                    code:
                        `a = "A"
b = "Python"
c = "Programming"

print(f"|{a:12}|")
print(f"|{b:12}|")
print(f"|{c:12}|")`
                },

                {
                    type: "paragraph",

                    text:
                        "宽度并不是把内容强制截断成指定长度，而是规定一个“至少需要占用多少空间”的宽度。如果内容本身超过这个宽度，它仍然会完整显示。"
                },

                {
                    type: "heading",

                    level: 2,

                    text: "八、对齐"
                },

                {
                    type: "paragraph",

                    text:
                        "有了宽度之后，我们还需要决定内容应该放在这块空间的左边、中间还是右边。f-string 提供了非常简单的对齐方式。"
                },

                {
                    type: "paragraph",

                    text:
                        "< 表示左对齐，> 表示右对齐，^ 表示居中。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "左对齐、右对齐和居中",

                    code:
                        `name = "Python"

print(f"|{name:<12}|")
print(f"|{name:>12}|")
print(f"|{name:^12}|")`
                },

                {
                    type: "image",

                    alt: "f-string 字段对齐示意图",

                    html:
                        `
        <div class="align-figure">

            <div class="align-row">
                <span class="align-label">左对齐</span>
                <div class="align-box left">
                    Python
                </div>
            </div>

            <div class="align-row">
                <span class="align-label">居中</span>
                <div class="align-box center">
                    Python
                </div>
            </div>

            <div class="align-row">
                <span class="align-label">右对齐</span>
                <div class="align-box right">
                    Python
                </div>
            </div>

        </div>
        `,

                    css:
                        `
        .align-figure {
            box-sizing: border-box;
            width: 100%;
            padding: 24px 20px;
            background: #ffffff;
        }

        .align-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            margin: 8px 0;
        }

        .align-label {
            width: 48px;
            color: #7b8794;
            font-size: 11px;
            text-align: right;
        }

        .align-box {
            box-sizing: border-box;
            width: 180px;
            padding: 8px 12px;
            border: 1px solid #dce4ec;
            border-radius: 5px;
            color: #3776ab;
            font-family:
                "SFMono-Regular",
                Consolas,
                monospace;
        }

        .align-box.left {
            text-align: left;
        }

        .align-box.center {
            text-align: center;
        }

        .align-box.right {
            text-align: right;
        }
        `,

                    caption:
                        "字段宽度确定显示区域，对齐方式决定内容在区域中的位置。"
                },

                {
                    type: "paragraph",

                    text:
                        "宽度和对齐经常一起使用。例如制作命令行表格时，文字通常左对齐，数字通常右对齐，这样多行数据看起来会非常整齐。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "制作简单表格",

                    code:
                        `name1 = "Alice"
name2 = "Bob"
name3 = "Charlie"

score1 = 95
score2 = 88
score3 = 92

print(f"{'姓名':<12}{'成绩':>6}")
print(f"{name1:<12}{score1:>6}")
print(f"{name2:<12}{score2:>6}")
print(f"{name3:<12}{score3:>6}")`
                },

                {
                    type: "heading",

                    level: 2,

                    text: "九、正负号"
                },

                {
                    type: "paragraph",

                    text:
                        "在财务数据、统计数据和科学计算中，我们有时希望正数也明确显示 + 号，而不是只显示负数的 - 号。f-string 可以使用 + 控制正负号显示。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "显示正负号",

                    code:
                        `change1 = 12.5
change2 = -8.3
change3 = 0

print(f"{change1:+.1f}")
print(f"{change2:+.1f}")
print(f"{change3:+.1f}")`
                },

                {
                    type: "paragraph",

                    text:
                        "输出会分别显示 +12.5、-8.3 和 +0.0。这样在查看涨跌、收入变化、温度变化等数据时，正负方向会更加明确。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "股票涨跌示例",

                    code:
                        `price_change = 6.25

print(f"今日涨跌：{price_change:+.2f}%")`
                },

                {
                    type: "paragraph",

                    text:
                        "如果不希望正数显示 + 号，也可以使用默认方式。这个格式主要用于需要明确表达“增加还是减少”的场景。"
                },

                {
                    type: "heading",

                    level: 2,

                    text: "十、千位分隔符"
                },

                {
                    type: "paragraph",

                    text:
                        "当数字很大时，例如人口数量、销售额、资产规模等，一长串数字不容易阅读。f-string 可以使用逗号自动添加千位分隔符。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "千位分隔符",

                    code:
                        `population = 1411750000

print(f"人口：{population:,}")`
                },

                {
                    type: "paragraph",

                    text:
                        "1411750000 会显示成 1,411,750,000。数字本身并没有发生变化，只是显示方式发生了变化。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "金额同时格式化",

                    code:
                        `sales = 1234567.891

print(f"销售额：{sales:,.2f} 元")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里同时使用了两个格式规则：逗号负责千位分隔，.2f 负责保留两位小数。因此最终可以得到类似 1,234,567.89 元这样的结果。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "正负号、千位和小数一起使用",

                    code:
                        `change = 1234567.891

print(f"{change:+,.2f}")`
                },

                {
                    type: "paragraph",

                    text:
                        "这说明 f-string 的格式规则是可以组合使用的。实际开发中，我们经常把宽度、对齐、正负号、千位分隔和小数位数组合起来。"
                },

                {
                    type: "heading",

                    level: 2,

                    text: "十一、日期和时间格式化"
                },

                {
                    type: "paragraph",

                    text:
                        "f-string 不只可以格式化数字，也可以格式化日期和时间。Python 的 datetime 模块提供了日期和时间对象，f-string 可以通过格式说明符控制它们的显示方式。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "格式化日期",

                    code:
                        `from datetime import datetime

now = datetime.now()

print(f"日期：{now:%Y-%m-%d}")
print(f"时间：{now:%H:%M:%S}")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的 %Y 表示四位年份，%m 表示月份，%d 表示日期；%H 表示小时，%M 表示分钟，%S 表示秒。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "生成报告时间",

                    code:
                        `from datetime import datetime

now = datetime.now()

print(
    f"报告生成时间："
    f"{now:%Y-%m-%d %H:%M:%S}"
)`
                },

                {
                    type: "paragraph",

                    text:
                        "日期格式化在日志、报表、文件名、订单记录和数据分析程序中非常常见。初学阶段不需要一次记住所有日期格式，只需要知道 datetime 对象也可以通过 f-string 控制显示方式即可。"
                },

                {
                    type: "callout",

                    title: "日期格式先记住这几个",

                    text:
                        "%Y：四位年份；%m：月份；%d：日期；%H：小时；%M：分钟；%S：秒。以后遇到更复杂的日期格式，再查表即可。"
                },

                {
                    type: "heading",

                    level: 2,

                    text: "十二、把这些格式化功能组合起来"
                },

                {
                    type: "paragraph",

                    text:
                        "前面每一个格式化功能都很简单，但真正写程序时，我们通常会把它们组合起来。例如一份销售报告可能同时需要商品名称、数量、金额、增长率和生成时间。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "综合格式化",

                    code:
                        `from datetime import datetime

product = "Python 教程"
price = 49.9
quantity = 128
growth = 0.126

total = price * quantity
now = datetime.now()

print("========== 销售报告 ==========")
print(f"商品：{product}")
print(f"单价：{price:.2f} 元")
print(f"数量：{quantity:,}")
print(f"销售额：{total:,.2f} 元")
print(f"增长率：{growth:+.1%}")
print(f"生成时间：{now:%Y-%m-%d %H:%M:%S}")
print("==============================")`
                },

                {
                    type: "paragraph",

                    text:
                        "现在我们已经把前面学习的很多知识组合起来了：变量保存数据，表达式完成计算，datetime 提供时间数据，而 f-string 负责把这些数据整理成最终的文本报告。"
                },

                {
                    type: "image",

                    alt:
                        "f-string 格式化数据报告示意图",

                    html:
                        `
                <div class="report-figure">

                    <div class="report-title">
                        销售报告
                    </div>

                    <div class="report-line">
                        <span>商品</span>
                        <strong>Python 教程</strong>
                    </div>

                    <div class="report-line">
                        <span>单价</span>
                        <strong>49.90 元</strong>
                    </div>

                    <div class="report-line">
                        <span>数量</span>
                        <strong>128</strong>
                    </div>

                    <div class="report-line">
                        <span>销售额</span>
                        <strong>6,387.20 元</strong>
                    </div>

                    <div class="report-line">
                        <span>增长率</span>
                        <strong>+12.6%</strong>
                    </div>

                </div>
                `,

                    css:
                        `
                .report-figure {
                    box-sizing: border-box;
                    width: min(100%, 520px);
                    margin: 0 auto;
                    padding: 22px 26px;
                    background: #ffffff;
                }

                .report-title {
                    margin-bottom: 16px;
                    padding-bottom: 10px;
                    border-bottom:
                        1px solid #e1e7ed;
                    color: #263544;
                    font-size: 16px;
                    font-weight: 600;
                    text-align: center;
                }

                .report-line {
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    padding: 7px 0;
                    color: #7b8794;
                    font-size: 12px;
                }

                .report-line strong {
                    color: #263544;
                    font-weight: 500;
                }
                `
                    ,

                    caption:
                        "f-string 可以把计算结果、数字格式和日期时间组合成完整、清晰的数据报告。"
                },

                {
                    type: "heading",

                    level: 2,

                    text: "十三、一个重要原则：数据和显示分开"
                },

                {
                    type: "paragraph",

                    text:
                        "学习 f-string 时，需要建立一个很重要的习惯：数据负责保存和计算，格式化负责最终显示。不要为了让输出看起来漂亮，就提前把数字变成字符串。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "先计算，再格式化",

                    code:
                        `price = 19.99
quantity = 3

total = price * quantity

print(type(total))

print(f"总价：{total:.2f} 元")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里 total 仍然是数字，所以后面还可以继续进行数学运算。只有在输出的时候，我们才使用 .2f 控制它显示两位小数。"
                },

                {
                    type: "callout",

                    title: "不要把“显示格式”误认为“数据类型”",

                    text:
                        "19.90 是一种显示方式，而不是一种新的数字类型。程序内部仍然可以保存数字 19.9，需要显示时再使用 f-string 控制格式。"
                },

                {
                    type: "heading",

                    level: 2,

                    text: "十四、f-string 常见格式速查"
                },

                {
                    type: "code",

                    language: "text",

                    title: "常见格式",

                    code:
                        `:.2f       保留两位小数
:.1%       百分比，保留一位小数
:,         千位分隔符
:+.2f      显示正负号，并保留两位小数
:<12       宽度 12，左对齐
:>12       宽度 12，右对齐
:^12       宽度 12，居中

%Y         四位年份
%m         两位月份
%d         两位日期
%H         小时
%M         分钟
%S         秒`
                },

                {
                    type: "checklist",

                    title: "本节应该掌握",

                    items: [
                        "理解为什么程序需要字符串格式化",
                        "理解 f-string 和字符串拼接的区别",
                        "掌握 f\"...{变量}...\" 的基本写法",
                        "知道 {} 中可以放变量",
                        "知道 {} 中可以放表达式",
                        "掌握数字格式化的基本方法",
                        "掌握 .2f 等小数位数格式",
                        "掌握百分比格式",
                        "理解字段宽度的作用",
                        "掌握左对齐、右对齐和居中",
                        "知道如何显示正负号",
                        "掌握千位分隔符",
                        "知道 datetime 可以配合 f-string 格式化",
                        "能够使用 f-string 制作简单的数据报告",
                        "理解数据保存和数据显示应该分开"
                    ]
                },

                {
                    type: "practice",

                    title: "练习 19：成绩报告",

                    description:
                        "使用已经给出的学生信息，计算平均分，并使用 f-string 输出一份整齐的成绩报告。平均分保留两位小数。",

                    starterCode:
                        `name = "Alice"

math_score = 92
english_score = 86
python_score = 95

average = (
    math_score +
    english_score +
    python_score
) / 3

print("========== 成绩报告 ==========")
print(f"姓名：{name}")
print(f"数学：{math_score:.2f}")
print(f"英语：{english_score:.2f}")
print(f"Python：{python_score:.2f}")
print(f"平均分：{average:.2f}")
print("==============================")`
                },

                {
                    type: "practice",

                    title: "练习 20：商品销售报告",

                    description:
                        "根据商品名称、单价和购买数量计算销售额。要求商品名称正常显示，数量使用千位分隔符，金额保留两位小数。",

                    starterCode:
                        `product = "Python 教程"
price = 49.9
quantity = 128

total = price * quantity

print("========== 销售报告 ==========")
print(f"商品：{product}")
print(f"单价：{price:.2f} 元")
print(f"数量：{quantity:,}")
print(f"销售额：{total:,.2f} 元")
print("==============================")`
                },

                {
                    type: "practice",

                    title: "练习 21：学习进度报告",

                    description:
                        "使用 f-string 输出课程学习进度。完成章节数为 8，总章节数为 15。要求同时显示完成数量、百分比，并显示正负变化。",

                    starterCode:
                        `completed = 8
total = 15

rate = completed / total
change = 3

print("========== 学习进度 ==========")
print(f"已完成：{completed} / {total}")
print(f"完成率：{rate:.1%}")
print(f"本周增加：{change:+d} 章")
print("==============================")`
                },

                {
                    type: "practice",

                    title: "练习 22：综合数据报告",

                    description:
                        "完成一份综合数据报告。要求使用 f-string 同时处理商品名称、价格、数量、销售额、增长率和当前时间。",

                    starterCode:
                        `from datetime import datetime

product = "Python 教程"
price = 49.9
quantity = 128
growth = 0.126

total = price * quantity
now = datetime.now()

print("========== 数据报告 ==========")
print(f"商品：{product}")
print(f"单价：{price:.2f} 元")
print(f"数量：{quantity:,}")
print(f"销售额：{total:,.2f} 元")
print(f"增长率：{growth:+.1%}")
print(f"生成时间：{now:%Y-%m-%d %H:%M:%S}")
print("==============================")`
                }

            ]
        },


        /* =================================================
           01-13
        ================================================= */

        {
            id: "py-01-13",

            title: "实战：个人信息卡",

            description:
                "把变量、类型转换和 f-string 组合起来，完成第一个完整的小程序。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "前面的知识都是一个一个学习的：变量负责保存数据，类型决定数据是什么，类型转换让不同类型的数据可以参与运算，f-string 则负责把数据漂亮地输出出来。现在，我们把这些知识组合起来，完成一个真正的小程序。"
                },

                {
                    type: "callout",

                    title: "这一次，我们开始像程序员一样组织程序",

                    text:
                        "一个完整的小程序通常不是只解决一个语法问题，而是先准备数据，再处理数据，最后把结果展示出来。个人信息卡虽然简单，但已经包含了一个程序最基本的结构：数据 → 处理 → 输出。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "一、先想清楚程序需要什么数据"
                },

                {
                    type: "paragraph",

                    text:
                        "如果我们要制作一张个人信息卡，首先要决定需要保存哪些信息。例如姓名和城市是文本，年龄是整数，身高可以使用浮点数。不同的数据应该使用合适的类型保存。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "设计数据",

                    code:
                        `name = "Alice"
city = "Taipei"
age = 20
height = 1.68

print(name)
print(city)
print(age)
print(height)`
                },

                {
                    type: "animation",

                    title: "数据进入程序",

                    duration: 2200,

                    html:
                        `
<div class="info-flow">

    <div class="info-data">
        <span class="info-value">Alice</span>
        <span class="info-type">str</span>
    </div>

    <div class="info-arrow">→</div>

    <div class="info-box">
        <span class="info-name">name</span>
        <span class="info-value">Alice</span>
    </div>

    <div class="info-arrow">→</div>

    <div class="info-card-preview">
        <span>姓名：Alice</span>
    </div>

</div>
`,

                    css:
                        `
.info-flow {
    box-sizing: border-box;
    width: 100%;
    min-height: 150px;
    padding: 28px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    background: #ffffff;
}

.info-data,
.info-box,
.info-card-preview {
    box-sizing: border-box;
    min-width: 110px;
    padding: 12px 14px;
    border: 1px solid #dce4ec;
    border-radius: 7px;
    background: #f8fafc;
    text-align: center;
}

.info-data,
.info-box {
    opacity: 0;
    transform: translateY(8px);
}

.info-value {
    display: block;
    color: #263544;
    font-size: 14px;
    font-weight: 600;
}

.info-type {
    display: block;
    margin-top: 5px;
    color: #7b8794;
    font-size: 11px;
}

.info-name {
    display: block;
    color: #3776ab;
    font-size: 12px;
    font-weight: 600;
}

.info-arrow {
    color: #9aa7b4;
    font-size: 18px;
    opacity: 0;
}

.info-card-preview {
    color: #344454;
    font-size: 12px;
    opacity: 0;
}
`,

                    js:
                        `
const data =
    animationRoot.querySelector(
        ".info-data"
    );

const box =
    animationRoot.querySelector(
        ".info-box"
    );

const arrows =
    animationRoot.querySelectorAll(
        ".info-arrow"
    );

const preview =
    animationRoot.querySelector(
        ".info-card-preview"
    );

setTimeout(() => {
    data.style.opacity = "1";
    data.style.transform = "translateY(0)";
    data.style.transition =
        "opacity .35s ease, transform .35s ease";
}, 200);

setTimeout(() => {
    arrows[0].style.opacity = "1";
    arrows[0].style.transition =
        "opacity .3s ease";
}, 650);

setTimeout(() => {
    box.style.opacity = "1";
    box.style.transform = "translateY(0)";
    box.style.transition =
        "opacity .35s ease, transform .35s ease";
}, 900);

setTimeout(() => {
    arrows[1].style.opacity = "1";
    arrows[1].style.transition =
        "opacity .3s ease";
}, 1350);

setTimeout(() => {
    preview.style.opacity = "1";
    preview.style.transition =
        "opacity .35s ease";
}, 1600);
`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "二、用变量准备一份示例数据"
                },

                {
                    type: "paragraph",

                    text:
                        "为了让代码在在线运行器中可以直接运行，这里先把姓名、城市、年龄和身高写成固定数据。固定数据并不意味着程序不真实：它仍然是后面计算和格式化输出的真实输入，只是先跳过了从键盘读取这一步。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "获取并转换数据",

                    code:
                        `name = "Alice"
city = "Taipei"

age = 20
height = 1.68`
                },

                {
                    type: "attention",

                    title: "文本和数字要区分",

                    text:
                        "姓名和城市是文本，年龄是整数，身高是浮点数。即使数据是固定写好的，也要为它选择合适的类型。类型选错，后面的计算或格式化就可能得不到预期结果。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "三、用 f-string 组织输出"
                },

                {
                    type: "paragraph",

                    text:
                        "数据准备好之后，下一步就是把它们展示出来。f-string 可以直接把变量放进字符串中，而且还可以控制数字的显示格式。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "使用 f-string 输出",

                    code:
                        `print(f"姓名：{name}")
print(f"城市：{city}")
print(f"年龄：{age}")
print(f"身高：{height:.2f} m")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里的 {height:.2f} 不只是输出 height，还告诉 Python：把这个浮点数按照保留两位小数的方式显示。"
                },

                {
                    type: "image",

                    alt:
                        "个人信息卡的数据和输出关系",

                    html:
                        `
<div class="profile-card-demo">

    <div class="profile-card-title">
        我的个人信息
    </div>

    <div class="profile-card-row">
        <span>姓名</span>
        <strong>Alice</strong>
    </div>

    <div class="profile-card-row">
        <span>城市</span>
        <strong>Taipei</strong>
    </div>

    <div class="profile-card-row">
        <span>年龄</span>
        <strong>20</strong>
    </div>

    <div class="profile-card-row">
        <span>身高</span>
        <strong>1.68 m</strong>
    </div>

</div>
`,

                    css:
                        `
.profile-card-demo {
    box-sizing: border-box;
    width: min(100%, 420px);
    margin: 0 auto;
    padding: 22px 24px;
    border: 1px solid #dce4ec;
    border-radius: 10px;
    background: #ffffff;
}

.profile-card-title {
    margin-bottom: 14px;
    color: #263544;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
}

.profile-card-row {
    display: flex;
    justify-content: space-between;
    padding: 9px 0;
    border-top: 1px solid #edf1f5;
    color: #7b8794;
    font-size: 12px;
}

.profile-card-row strong {
    color: #344454;
    font-weight: 500;
}
`,

                    caption:
                        "程序中的变量经过格式化后，最终可以组织成清晰的信息卡。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "四、把几个知识点组合起来"
                },

                {
                    type: "paragraph",

                    text:
                        "现在把前面学过的内容放在一起：变量负责保存数据，类型负责描述数据，计算负责处理数据，f-string 负责组织最终输出。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "个人信息卡：完整版本",

                    code:
                        `name = "Alice"
city = "Taipei"
age = 20
height = 1.68

print()
print("================================")
print("          个人信息卡")
print("================================")
print(f"姓名：{name}")
print(f"城市：{city}")
print(f"年龄：{age}")
print(f"身高：{height:.2f} m")
print("================================")`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "五、数据不一定来自键盘"
                },

                {
                    type: "paragraph",

                    text:
                        "真实程序的数据可能来自文件、网络接口、数据库、传感器，也可能来自用户输入。键盘输入只是其中一种来源，并不是程序获得数据的唯一方式。本章统一使用固定数据，是为了让示例稳定、可复现，并且可以直接在在线运行器中执行。"
                },

                {
                    type: "animation",

                    title: "一个完整程序的基本流程",

                    duration: 2600,

                    html:
                        `
<div class="program-flow">

    <div class="program-step step-data">
        <span class="program-number">1</span>
        <strong>准备数据</strong>
        <small>变量 / 固定数据</small>
    </div>

    <div class="program-arrow">→</div>

    <div class="program-step step-process">
        <span class="program-number">2</span>
        <strong>处理数据</strong>
        <small>类型转换 / 计算</small>
    </div>

    <div class="program-arrow">→</div>

    <div class="program-step step-output">
        <span class="program-number">3</span>
        <strong>输出结果</strong>
        <small>f-string / print()</small>
    </div>

</div>
`,

                    css:
                        `
.program-flow {
    box-sizing: border-box;
    width: 100%;
    padding: 28px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: #ffffff;
}

.program-step {
    box-sizing: border-box;
    width: 150px;
    min-height: 88px;
    padding: 13px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
    opacity: 0.25;
    transform: translateY(6px);
}

.program-number {
    display: block;
    margin-bottom: 6px;
    color: #3776ab;
    font-size: 11px;
}

.program-step strong {
    display: block;
    color: #344454;
    font-size: 13px;
    font-weight: 600;
}

.program-step small {
    display: block;
    margin-top: 5px;
    color: #8a96a3;
    font-size: 10px;
}

.program-arrow {
    color: #a2adb8;
    font-size: 18px;
    opacity: 0.2;
}
`,

                    js:
                        `
const steps =
    animationRoot.querySelectorAll(
        ".program-step"
    );

const arrows =
    animationRoot.querySelectorAll(
        ".program-arrow"
    );

steps.forEach(step => {
    step.style.transition =
        "opacity .4s ease, transform .4s ease";
});

arrows.forEach(arrow => {
    arrow.style.transition =
        "opacity .3s ease";
});

setTimeout(() => {
    steps[0].style.opacity = "1";
    steps[0].style.transform =
        "translateY(0)";
}, 200);

setTimeout(() => {
    arrows[0].style.opacity = "1";
}, 700);

setTimeout(() => {
    steps[1].style.opacity = "1";
    steps[1].style.transform =
        "translateY(0)";
}, 950);

setTimeout(() => {
    arrows[1].style.opacity = "1";
}, 1450);

setTimeout(() => {
    steps[2].style.opacity = "1";
    steps[2].style.transform =
        "translateY(0)";
}, 1700);
`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "六、拆开来看，其实只有三个阶段"
                },

                {
                    type: "concepts",

                    items: [

                        {
                            title: "准备数据",

                            text:
                                "使用变量保存姓名、城市、年龄、身高等数据。"
                        },

                        {
                            title: "处理数据",

                            text:
                                "根据需要进行类型转换、计算或其他处理。"
                        },

                        {
                            title: "输出结果",

                            text:
                                "使用 print() 和 f-string 把数据组织成用户容易阅读的形式。"
                        }

                    ]
                },

                {
                    type: "paragraph",

                    text:
                        "这三个阶段会反复出现在后面的 Python 程序中。以后程序越来越复杂，但很多时候仍然可以先问自己：数据从哪里来？需要怎样处理？最后应该怎样展示？"
                },

                {
                    type: "callout",

                    title: "一个重要的编程习惯",

                    text:
                        "不要急着写代码。先把程序需要的数据列出来，再决定每个数据应该使用什么类型，最后再考虑如何处理和输出。这样写程序通常会更加清晰。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "七、升级：让信息卡更完整"
                },

                {
                    type: "paragraph",

                    text:
                        "现在我们已经完成了第一个完整的小程序。下一步可以继续增加字段，例如职业、兴趣、今年的目标、个人简介等。重点不是增加代码量，而是练习把更多变量组织成一个完整的输出结果。"
                },

                {
                    type: "practice",

                    title: "练习 20：升级个人信息卡",

                    description:
                        "增加职业、兴趣爱好、今年目标等字段，并让最终输出看起来像一张真正的信息卡。建议继续使用变量和 f-string，不需要引入新的语法。",

                    starterCode:
                        `name = "Alice"
city = "Taipei"
age = 20
job = "学生"
hobby = "Python"
goal = "完成第一个 Python 项目"

print()
print("================================")
print("          我的个人信息")
print("================================")

print(f"姓名：{name}")
print(f"城市：{city}")
print(f"年龄：{age}")
print(f"职业：{job}")
print(f"兴趣：{hobby}")
print(f"目标：{goal}")

print("================================")`
                },

                {
                    type: "practice",

                    title: "练习 21：个人成绩卡",

                    description:
                        "创建姓名、数学成绩、英语成绩和 Python 成绩四个变量，计算平均分，并使用 f-string 输出成绩卡。平均分保留两位小数。",

                    starterCode:
                        `name = "Alice"

math_score = 92
english_score = 88
python_score = 95

average = (
    math_score +
    english_score +
    python_score
) / 3

print("========== 成绩卡 ==========")
print(f"姓名：{name}")
print(f"数学：{math_score}")
print(f"英语：{english_score}")
print(f"Python：{python_score}")
print(f"平均分：{average:.2f}")
print("============================")`
                },

                {
                    type: "practice",

                    title: "练习 22：个人账户信息",

                    description:
                        "创建用户名、余额、消费金额等变量，计算消费后的余额，并使用 f-string 输出一份账户信息。余额和消费金额保留两位小数。",

                    starterCode:
                        `username = "Alice"
balance = 2580.50
expense = 368.80

remaining = balance - expense

print("========== 账户信息 ==========")
print(f"用户名：{username}")
print(f"原余额：{balance:.2f} 元")
print(f"本次消费：{expense:.2f} 元")
print(f"剩余余额：{remaining:.2f} 元")
print("==============================")`
                },

                {
                    type: "checklist",

                    items: [

                        "能够使用变量保存一组相关数据",

                        "知道什么时候需要 int() 和 float()",

                        "知道文本和数字是不同类型",

                        "能够使用 f-string 输出变量",

                        "能够使用 f-string 控制小数位数",

                        "能够把多个知识点组合成一个完整的小程序",

                        "能够按照“数据 → 处理 → 输出”的思路分析程序"

                    ]
                }

            ]
        },


        /* =================================================
           01-14
        ================================================= */

        {
            id: "py-01-14",

            title: "实战：购物计算器",

            description:
                "把数字、变量、类型转换、运算和 f-string 组合起来，完成一个真正的小型购物计算器。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "上一节我们制作了个人信息卡，这一节继续做一个更有实际意义的小程序：购物计算器。它不再只是把数据打印出来，而是需要根据商品价格和数量进行计算，然后把计算结果整理成清晰的购物明细。"
                },

                {
                    type: "callout",

                    title: "这一次，我们开始真正处理数据",

                    text:
                        "购物计算器的核心流程非常简单：先准备商品数据，再计算小计、折扣和最终价格，最后把结果输出出来。这个过程已经非常接近真实程序的基本工作方式。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "一、先从一个商品开始"
                },

                {
                    type: "paragraph",

                    text:
                        "先不要急着加入折扣。我们只处理一个商品：商品名称是字符串，单价是浮点数，购买数量是整数。总价则通过“单价 × 数量”计算得到。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "准备购物数据",

                    code:
                        `product = "Python 编程书"
price = 59.9
quantity = 2

total = price * quantity

print(product)
print(price)
print(quantity)
print(total)`
                },

                {
                    type: "animation",

                    title: "商品价格如何变成总价",

                    duration: 2200,

                    html:
                        `
<div class="shopping-flow">

    <div class="shopping-value">
        <span class="shopping-number">59.90</span>
        <span class="shopping-label">单价</span>
    </div>

    <div class="shopping-symbol">×</div>

    <div class="shopping-value">
        <span class="shopping-number">2</span>
        <span class="shopping-label">数量</span>
    </div>

    <div class="shopping-symbol">=</div>

    <div class="shopping-result">
        <span class="shopping-number">119.80</span>
        <span class="shopping-label">总价</span>
    </div>

</div>
`,

                    css:
                        `
.shopping-flow {
    box-sizing: border-box;
    width: 100%;
    min-height: 150px;
    padding: 28px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    background: #ffffff;
}

.shopping-value,
.shopping-result {
    box-sizing: border-box;
    min-width: 92px;
    padding: 14px 12px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
}

.shopping-result {
    background: #f4f8fb;
}

.shopping-number {
    display: block;
    color: #263544;
    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
    font-size: 15px;
    font-weight: 600;
}

.shopping-label {
    display: block;
    margin-top: 5px;
    color: #7b8794;
    font-size: 10px;
}

.shopping-symbol {
    color: #9aa7b4;
    font-size: 18px;
    opacity: 0;
}
`,

                    js:
                        `
const symbols =
    animationRoot.querySelectorAll(
        ".shopping-symbol"
    );

const result =
    animationRoot.querySelector(
        ".shopping-result"
    );

symbols.forEach(symbol => {
    symbol.style.transition =
        "opacity .3s ease";
});

setTimeout(() => {
    symbols[0].style.opacity = "1";
}, 500);

setTimeout(() => {
    symbols[1].style.opacity = "1";
}, 950);

setTimeout(() => {
    result.style.opacity = "1";
    result.style.transform =
        "scale(1.03)";

    result.style.transition =
        "opacity .35s ease, transform .35s ease";
}, 1300);

setTimeout(() => {
    result.style.transform =
        "scale(1)";
}, 1700);
`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "二、先把商品数据写进变量"
                },

                {
                    type: "paragraph",

                    text:
                        "购物计算器暂时不从键盘读取数据，而是先把商品名称、单价和购买数量写进变量。这样每次运行的结果都一致，便于观察计算过程。真实项目里，这些值可能来自商品页面、订单系统或用户输入。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "获取商品信息",

                    code:
                        `product = "Python 编程书"
price = 59.9
quantity = 2

total = price * quantity

print(f"商品：{product}")
print(f"总价：{total:.2f} 元")`
                },

                {
                    type: "attention",

                    title: "价格和数量的类型",

                    text:
                        "单价适合用浮点数保存，购买数量适合用整数保存。选对类型之后，price * quantity 才能得到符合预期的总价。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "三、计算商品小计"
                },

                {
                    type: "paragraph",

                    text:
                        "现在加入购买数量。一个商品的小计就是单价乘以数量。这里没有新的语法，重点是把前面学过的变量和算术运算组合起来。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "计算小计",

                    code:
                        `price = 59.9
quantity = 2

subtotal = price * quantity

print(f"单价：{price:.2f} 元")
print(f"数量：{quantity}")
print(f"小计：{subtotal:.2f} 元")`
                },

                {
                    type: "image",

                    alt:
                        "购物计算器的价格计算关系",

                    html:
                        `
<div class="price-calc-figure">

    <div class="price-calc-item">
        <span class="price-calc-label">单价</span>
        <strong>59.90 元</strong>
    </div>

    <div class="price-calc-symbol">×</div>

    <div class="price-calc-item">
        <span class="price-calc-label">数量</span>
        <strong>2</strong>
    </div>

    <div class="price-calc-symbol">=</div>

    <div class="price-calc-item result">
        <span class="price-calc-label">小计</span>
        <strong>119.80 元</strong>
    </div>

</div>
`,

                    css:
                        `
.price-calc-figure {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    background: #ffffff;
}

.price-calc-item {
    box-sizing: border-box;
    min-width: 105px;
    padding: 14px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
}

.price-calc-item.result {
    background: #f4f8fb;
}

.price-calc-label {
    display: block;
    margin-bottom: 6px;
    color: #7b8794;
    font-size: 10px;
}

.price-calc-item strong {
    color: #344454;
    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
    font-size: 14px;
    font-weight: 600;
}

.price-calc-symbol {
    color: #9aa7b4;
    font-size: 18px;
}
`,

                    caption:
                        "购物计算器最基本的计算关系：单价 × 数量 = 小计。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "四、加入折扣"
                },

                {
                    type: "paragraph",

                    text:
                        "现实中的购物通常还会有折扣。例如 0.8 可以表示八折，0.9 可以表示九折。最终价格可以使用“小计 × 折扣”计算。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "计算折后价格",

                    code:
                        `subtotal = 119.8
discount = 0.8

final_price = subtotal * discount

print(f"原价：{subtotal:.2f} 元")
print(f"折扣：{discount:.0%}")
print(f"折后：{final_price:.2f} 元")`
                },

                {
                    type: "paragraph",

                    text: "这里的 discount = 0.8 是程序内部使用的数值，而 f-string 中的 {discount:.0%} 可以把它显示成 80%。"
                },

                {
                    type: "animation",

                    title: "折扣是怎样影响价格的",

                    duration: 2400,

                    html:
                        `
<div class="discount-flow">

    <div class="discount-price">
        <span>原价</span>
        <strong>119.80 元</strong>
    </div>

    <div class="discount-operation">
        <span>×</span>
        <small>80%</small>
    </div>

    <div class="discount-price final">
        <span>折后</span>
        <strong>95.84 元</strong>
    </div>

</div>
`,

                    css:
                        `
.discount-flow {
    box-sizing: border-box;
    width: 100%;
    min-height: 145px;
    padding: 28px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background: #ffffff;
}

.discount-price {
    min-width: 130px;
    padding: 15px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
}

.discount-price span {
    display: block;
    margin-bottom: 6px;
    color: #7b8794;
    font-size: 10px;
}

.discount-price strong {
    color: #344454;
    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
    font-size: 14px;
}

.discount-price.final {
    opacity: 0;
    transform: translateY(8px);
}

.discount-operation {
    color: #3776ab;
    text-align: center;
}

.discount-operation span {
    display: block;
    font-size: 18px;
}

.discount-operation small {
    display: block;
    margin-top: 4px;
    color: #7b8794;
    font-size: 10px;
    opacity: 0;
}
`,

                    js:
                        `
const finalPrice =
    animationRoot.querySelector(
        ".discount-price.final"
    );

const operation =
    animationRoot.querySelector(
        ".discount-operation small"
    );

finalPrice.style.transition =
    "opacity .4s ease, transform .4s ease";

operation.style.transition =
    "opacity .3s ease";

setTimeout(() => {
    operation.style.opacity = "1";
}, 700);

setTimeout(() => {
    finalPrice.style.opacity = "1";
    finalPrice.style.transform =
        "translateY(0)";
}, 1200);
`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "五、计算节省了多少钱"
                },

                {
                    type: "paragraph",

                    text:
                        "知道原价和折后价格之后，还可以计算这次购物节省了多少钱。这里再次使用减法。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "计算节省金额",

                    code:
                        `subtotal = 119.8
final_price = 95.84

saved = subtotal - final_price

print(f"节省：{saved:.2f} 元")`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "六、把所有计算组合起来"
                },

                {
                    type: "paragraph",

                    text:
                        "现在已经有了三个核心计算：单价 × 数量得到小计，小计 × 折扣得到最终价格，小计 - 最终价格得到节省金额。把它们组合起来，就得到了一个完整的购物计算器。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "完整购物计算器",

                    code:
                        `product = "Python 编程书"
price = 59.9
quantity = 2
discount = 0.8

subtotal = price * quantity
final_price = subtotal * discount
saved = subtotal - final_price

print()
print("========== 购物明细 ==========")
print(f"商品：{product}")
print(f"单价：{price:.2f} 元")
print(f"数量：{quantity}")
print("------------------------------")
print(f"原价：{subtotal:.2f} 元")
print(f"折扣：{discount:.0%}")
print(f"折后：{final_price:.2f} 元")
print(f"节省：{saved:.2f} 元")
print("==============================")`
                },

                {
                    type: "animation",

                    title: "完整购物计算流程",

                    duration: 2800,

                    html:
                        `
<div class="shop-program-flow">

    <div class="shop-step">
        <span class="shop-step-number">1</span>
        <strong>商品数据</strong>
        <small>价格 / 数量</small>
    </div>

    <div class="shop-arrow">→</div>

    <div class="shop-step">
        <span class="shop-step-number">2</span>
        <strong>计算小计</strong>
        <small>价格 × 数量</small>
    </div>

    <div class="shop-arrow">→</div>

    <div class="shop-step">
        <span class="shop-step-number">3</span>
        <strong>应用折扣</strong>
        <small>小计 × 折扣</small>
    </div>

    <div class="shop-arrow">→</div>

    <div class="shop-step">
        <span class="shop-step-number">4</span>
        <strong>输出结果</strong>
        <small>f-string</small>
    </div>

</div>
`,

                    css:
                        `
.shop-program-flow {
    box-sizing: border-box;
    width: 100%;
    padding: 28px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    background: #ffffff;
    overflow-x: auto;
}

.shop-step {
    flex: 0 0 120px;
    min-height: 82px;
    padding: 12px 9px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
    opacity: .25;
    transform: translateY(7px);
}

.shop-step-number {
    display: block;
    margin-bottom: 5px;
    color: #3776ab;
    font-size: 10px;
}

.shop-step strong {
    display: block;
    color: #344454;
    font-size: 12px;
    font-weight: 600;
}

.shop-step small {
    display: block;
    margin-top: 5px;
    color: #8a96a3;
    font-size: 9px;
}

.shop-arrow {
    flex: 0 0 auto;
    color: #a2adb8;
    font-size: 16px;
    opacity: .2;
}
`,

                    js:
                        `
const steps =
    animationRoot.querySelectorAll(
        ".shop-step"
    );

const arrows =
    animationRoot.querySelectorAll(
        ".shop-arrow"
    );

steps.forEach(step => {
    step.style.transition =
        "opacity .35s ease, transform .35s ease";
});

arrows.forEach(arrow => {
    arrow.style.transition =
        "opacity .25s ease";
});

steps.forEach((step, index) => {

    setTimeout(() => {

        step.style.opacity = "1";
        step.style.transform =
            "translateY(0)";

        if (arrows[index]) {
            setTimeout(() => {
                arrows[index].style.opacity =
                    "1";
            }, 250);
        }

    }, 250 + index * 550);

});
`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "七、网站环境下的可运行版本"
                },

                {
                    type: "paragraph",

                    text:
                        "下面把测试数据写进变量，继续完成折扣、节省金额和完整购物明细的计算。这样依然可以完整练习变量、计算和 f-string。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "可直接运行的版本",

                    code:
                        `product = "Python 编程书"
price = 59.9
quantity = 2
discount = 0.8

subtotal = price * quantity
final_price = subtotal * discount
saved = subtotal - final_price

print("========== 购物明细 ==========")
print(f"商品：{product}")
print(f"单价：{price:.2f} 元")
print(f"数量：{quantity}")
print("------------------------------")
print(f"原价：{subtotal:.2f} 元")
print(f"折扣：{discount:.0%}")
print(f"折后：{final_price:.2f} 元")
print(f"节省：{saved:.2f} 元")
print("==============================")`
                },

                {
                    type: "concepts",

                    items: [

                        {
                            title: "变量",

                            text:
                                "保存商品名称、单价、数量和折扣等数据。"
                        },

                        {
                            title: "类型",

                            text:
                                "商品名称使用 str，价格使用 float，数量使用 int。"
                        },

                        {
                            title: "运算",

                            text:
                                "通过乘法、减法完成小计、折后价格和节省金额的计算。"
                        },

                        {
                            title: "格式化",

                            text:
                                "使用 f-string 控制价格的小数位数，并把折扣显示成百分比。"
                        }

                    ]
                },

                {
                    type: "callout",

                    title: "注意：程序中的数据和显示格式是两回事",

                    text:
                        "例如 discount = 0.8 是程序内部真正保存的数值，而 f\"{discount:.0%}\" 只是把这个数值显示成 80%。程序计算时使用数据本身，展示给用户时再决定它应该长什么样。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "八、升级：从一个商品变成购物车"
                },

                {
                    type: "paragraph",

                    text:
                        "真正的购物车通常不会只有一个商品。下一步可以增加第二个商品，分别计算两个商品的小计，再把它们相加得到购物车总价。"
                },

                {
                    type: "practice",

                    title: "练习 21：升级购物车",

                    description:
                        "增加第二个商品。分别计算两个商品的小计，再计算购物车原价、统一折扣、折后价格和节省金额。先使用固定数据完成程序。",

                    starterCode:
                        `product1 = "Python 编程书"
price1 = 59.9
quantity1 = 2

product2 = "Python 练习册"
price2 = 29.9
quantity2 = 3

discount = 0.9

subtotal1 = price1 * quantity1
subtotal2 = price2 * quantity2

subtotal = subtotal1 + subtotal2
final_price = subtotal * discount
saved = subtotal - final_price

print()
print("========== 购物清单 ==========")
print(f"{product1}：{price1:.2f} × {quantity1}")
print(f"{product2}：{price2:.2f} × {quantity2}")
print("------------------------------")
print(f"原价：{subtotal:.2f} 元")
print(f"折扣：{discount:.0%}")
print(f"折后：{final_price:.2f} 元")
print(f"节省：{saved:.2f} 元")
print("==============================")`
                },

                {
                    type: "practice",

                    title: "练习 22：满减计算器",

                    description:
                        "假设购物满 200 元减 30 元。创建商品金额 subtotal，判断是否达到满减金额，并计算最终需要支付的金额。",

                    starterCode:
                        `subtotal = 258.80
threshold = 200
reduction = 30

final_price = subtotal

print(f"商品原价：{subtotal:.2f} 元")

# 如果满足满减条件，
# 请把 final_price 修改为减去 reduction 后的价格

print(f"最终价格：{final_price:.2f} 元")`
                },

                {
                    type: "practice",

                    title: "练习 23：制作购物小票",

                    description:
                        "使用固定数据制作一张完整的小票。至少包含商品名称、数量、单价、小计、折扣、最终价格和节省金额。尽量使用 f-string 让输出整齐。",

                    starterCode:
                        `product1 = "Python 编程书"
price1 = 59.9
quantity1 = 2

product2 = "Python 练习册"
price2 = 29.9
quantity2 = 1

discount = 0.85

subtotal1 = price1 * quantity1
subtotal2 = price2 * quantity2

subtotal = subtotal1 + subtotal2
final_price = subtotal * discount
saved = subtotal - final_price

print("================================")
print("            购物小票")
print("================================")

# 在这里完成小票输出

print("================================")`
                },

                {
                    type: "checklist",

                    items: [

                        "能够使用变量保存商品数据",

                        "能够区分字符串、整数和浮点数",

                        "能够使用乘法和减法完成实际计算",

                        "理解小计、折扣、最终价格之间的关系",

                        "能够使用 f-string 格式化金额",

                        "能够使用百分比格式化折扣",

                        "能够把多个计算步骤组合成一个完整程序",

                        "能够把一个商品扩展成多个商品"

                    ]
                }

            ]
        },


        /* =================================================
           01-15
        ================================================= */

        {
            id: "py-01-15",

            title: "实战：BMI 计算器",

            description:
                "综合使用变量、类型转换、数学表达式和 f-string，完成一个完整的 BMI 计算程序。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "前面我们已经做过个人信息卡和购物计算器。这一次继续做一个更接近真实计算程序的项目：BMI 计算器。它需要读取身高和体重，按照数学公式进行计算，再把结果整理成一份清晰的报告。"
                },

                {
                    type: "callout",

                    title: "这一课重点不是 BMI，而是“把公式写成程序”",

                    text:
                        "很多实际程序的核心工作都是把现实中的计算规则转换成代码。BMI 只是一个简单例子。以后遇到价格计算、时间换算、面积计算、统计分析等问题，也可以使用同样的思路。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "一、先看懂 BMI 公式"
                },

                {
                    type: "paragraph",

                    text:
                        "BMI 的计算公式很简单：体重除以身高的平方。这里体重使用公斤，身高使用米。"
                },

                {
                    type: "image",

                    alt:
                        "BMI 计算公式示意图",

                    html:
                        `
<div class="bmi-formula-figure">

    <div class="bmi-formula-title">
        BMI 计算公式
    </div>

    <div class="bmi-formula">
        <span class="bmi-result">BMI</span>
        <span class="bmi-equal">=</span>

        <span class="bmi-fraction">
            <span class="bmi-top">体重（kg）</span>
            <span class="bmi-line"></span>
            <span class="bmi-bottom">身高（m）²</span>
        </span>
    </div>

</div>
`,

                    css:
                        `
.bmi-formula-figure {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 20px;
    background: #ffffff;
    text-align: center;
}

.bmi-formula-title {
    margin-bottom: 18px;
    color: #7b8794;
    font-size: 11px;
}

.bmi-formula {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #263544;
    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
}

.bmi-result {
    color: #3776ab;
    font-size: 20px;
    font-weight: 600;
}

.bmi-equal {
    color: #8a96a3;
    font-size: 18px;
}

.bmi-fraction {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    min-width: 150px;
}

.bmi-top,
.bmi-bottom {
    padding: 4px 10px;
    font-size: 13px;
}

.bmi-line {
    width: 100%;
    height: 1px;
    background: #aeb8c2;
}
`,

                    caption:
                        "BMI = 体重（kg）÷ 身高（m）的平方。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "二、把数学公式写成 Python"
                },

                {
                    type: "paragraph",

                    text:
                        "Python 使用 ** 表示幂运算。因此，数学公式中的“身高的平方”可以写成 height ** 2。然后使用 / 完成除法。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "把公式写成代码",

                    code:
                        `height = 1.75
weight = 65

bmi = weight / (height ** 2)

print(bmi)`
                },

                {
                    type: "animation",

                    title: "数学公式变成程序表达式",

                    duration: 2400,

                    html:
                        `
<div class="bmi-flow">

    <div class="bmi-flow-box">
        <span>体重</span>
        <strong>65</strong>
    </div>

    <div class="bmi-flow-symbol">÷</div>

    <div class="bmi-flow-box">
        <span>身高²</span>
        <strong>1.75²</strong>
    </div>

    <div class="bmi-flow-symbol">=</div>

    <div class="bmi-flow-result">
        <span>BMI</span>
        <strong>21.22</strong>
    </div>

</div>
`,

                    css:
                        `
.bmi-flow {
    box-sizing: border-box;
    width: 100%;
    min-height: 150px;
    padding: 28px 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: #ffffff;
}

.bmi-flow-box,
.bmi-flow-result {
    min-width: 90px;
    padding: 13px 10px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
}

.bmi-flow-box span,
.bmi-flow-result span {
    display: block;
    margin-bottom: 5px;
    color: #7b8794;
    font-size: 10px;
}

.bmi-flow-box strong,
.bmi-flow-result strong {
    color: #344454;
    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
    font-size: 14px;
}

.bmi-flow-result {
    opacity: 0;
    transform: translateY(8px);
}

.bmi-flow-symbol {
    color: #a0abb5;
    font-size: 18px;
    opacity: 0;
}
`,

                    js:
                        `
const symbols =
    animationRoot.querySelectorAll(
        ".bmi-flow-symbol"
    );

const result =
    animationRoot.querySelector(
        ".bmi-flow-result"
    );

symbols.forEach(symbol => {
    symbol.style.transition =
        "opacity .3s ease";
});

result.style.transition =
    "opacity .4s ease, transform .4s ease";

setTimeout(() => {
    symbols[0].style.opacity = "1";
}, 500);

setTimeout(() => {
    symbols[1].style.opacity = "1";
}, 950);

setTimeout(() => {
    result.style.opacity = "1";
    result.style.transform =
        "translateY(0)";
}, 1350);
`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "三、为什么要使用 float()"
                },

                {
                    type: "paragraph",

                    text:
                        "身高和体重通常不是整数。例如身高可能是 1.75 米，体重可能是 65.5 公斤，所以这里需要使用 float() 保存小数。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "把文本转换成浮点数",

                    code:
                        `height_text = "1.75"
weight_text = "65.5"

height = float(height_text)
weight = float(weight_text)

print(height)
print(weight)
print(type(height))
print(type(weight))`
                },

                {
                    type: "attention",

                    title: "为什么不能直接计算？",

                    text:
                        "如果数据是字符串，例如 \"1.75\" 和 \"65.5\"，它们不能直接参与 BMI 的除法运算。需要先用 float() 转成浮点数，再参与计算。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "四、完整 BMI 计算"
                },

                {
                    type: "paragraph",

                    text:
                        "现在把数据准备、类型转换和数学公式组合起来。这里先使用固定数据完成在线版本，便于直接运行和检查结果。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "BMI 计算器",

                    code:
                        `height = 1.75
weight = 65.5

bmi = weight / (height ** 2)

print()
print("========== BMI ==========")
print(f"身高：{height:.2f} m")
print(f"体重：{weight:.2f} kg")
print(f"BMI：{bmi:.2f}")
print("=========================")`
                },

                {
                    type: "paragraph",

                    text:
                        "这里可以看到一个完整程序已经出现了：先获取数据，再转换类型，然后计算 BMI，最后使用 f-string 把结果格式化输出。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "五、把计算过程拆成几个变量"
                },

                {
                    type: "paragraph",

                    text:
                        "虽然可以直接把公式写成一行，但把中间结果保存下来通常更容易阅读和调试。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "拆开计算过程",

                    code:
                        `height = 1.75
weight = 65

height_squared = height ** 2

bmi = weight / height_squared

print(f"身高平方：{height_squared:.2f}")
print(f"BMI：{bmi:.2f}")`
                },

                {
                    type: "callout",

                    title: "变量不只是用来保存最终结果",

                    text:
                        "变量也可以保存计算过程中的中间结果。给中间结果起一个有意义的名字，通常可以让程序更容易理解。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "六、为什么 BMI 要保留两位小数？"
                },

                {
                    type: "paragraph",

                    text:
                        "BMI 通常不是整数。计算结果可能是 21.224489...。程序内部可以保留更精确的数值，但显示给用户时可以使用 :.2f，只展示两位小数。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "控制小数位数",

                    code:
                        `bmi = 21.2244897959

print(bmi)
print(f"{bmi:.2f}")`
                },

                {
                    type: "image",

                    alt:
                        "BMI 数值和显示格式的区别",

                    html:
                        `
<div class="bmi-format-figure">

    <div class="bmi-format-row">
        <span class="bmi-format-label">程序中的数值</span>
        <code>21.2244897959</code>
    </div>

    <div class="bmi-format-arrow">
        ↓  :.2f
    </div>

    <div class="bmi-format-row display">
        <span class="bmi-format-label">显示给用户</span>
        <code>21.22</code>
    </div>

</div>
`,

                    css:
                        `
.bmi-format-figure {
    box-sizing: border-box;
    width: 100%;
    padding: 25px 18px;
    background: #ffffff;
}

.bmi-format-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 10px;
}

.bmi-format-label {
    width: 105px;
    color: #7b8794;
    font-size: 11px;
    text-align: right;
}

.bmi-format-row code {
    padding: 7px 10px;
    border-radius: 5px;
    background: #f3f6f9;
    color: #344454;
    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
    font-size: 12px;
}

.bmi-format-arrow {
    margin: 4px 0;
    color: #3776ab;
    font-size: 11px;
    text-align: center;
}
`,

                    caption:
                        "程序可以保存更精确的数值，f-string 决定最终如何显示。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "七、制作一份 BMI 报告"
                },

                {
                    type: "paragraph",

                    text:
                        "前面的程序已经能够完成计算，现在把姓名、年龄、身高、体重和 BMI 放到一起，制作成一份完整报告。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "BMI 报告",

                    code:
                        `name = "Alice"
age = 25
height = 1.68
weight = 60

bmi = weight / (height ** 2)

print()
print("========== BMI 报告 ==========")
print(f"姓名：{name}")
print(f"年龄：{age}")
print(f"身高：{height:.2f} m")
print(f"体重：{weight:.2f} kg")
print(f"BMI：{bmi:.2f}")
print("==============================")`
                },

                {
                    type: "image",

                    alt:
                        "BMI 报告示例",

                    html:
                        `
<div class="bmi-report">

    <div class="bmi-report-title">
        BMI 报告
    </div>

    <div class="bmi-report-row">
        <span>姓名</span>
        <strong>Alice</strong>
    </div>

    <div class="bmi-report-row">
        <span>年龄</span>
        <strong>25</strong>
    </div>

    <div class="bmi-report-row">
        <span>身高</span>
        <strong>1.68 m</strong>
    </div>

    <div class="bmi-report-row">
        <span>体重</span>
        <strong>60.00 kg</strong>
    </div>

    <div class="bmi-report-result">
        <span>BMI</span>
        <strong>21.26</strong>
    </div>

</div>
`,

                    css:
                        `
.bmi-report {
    box-sizing: border-box;
    width: min(100%, 420px);
    margin: 0 auto;
    padding: 20px 22px;
    border: 1px solid #dce4ec;
    border-radius: 10px;
    background: #ffffff;
}

.bmi-report-title {
    margin-bottom: 12px;
    color: #263544;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
}

.bmi-report-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-top: 1px solid #edf1f5;
    color: #7b8794;
    font-size: 12px;
}

.bmi-report-row strong {
    color: #344454;
    font-weight: 500;
}

.bmi-report-result {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    padding: 12px 0 2px;
    border-top: 1px solid #dce4ec;
}

.bmi-report-result span {
    color: #7b8794;
    font-size: 12px;
}

.bmi-report-result strong {
    color: #3776ab;
    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
    font-size: 18px;
}
`,

                    caption:
                        "通过变量、数学表达式和 f-string，把计算结果整理成一份完整报告。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "八、网站环境下的可运行版本"
                },

                {
                    type: "paragraph",

                    text:
                        "下面把整段 BMI 计算拆开，观察每个中间变量如何得到最终结果。真实程序的数据可能来自健康档案、表单或设备，不一定来自键盘输入。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "可直接运行的版本",

                    code:
                        `name = "Alice"
age = 25
height = 1.68
weight = 60

bmi = weight / (height ** 2)

print()
print("========== BMI 报告 ==========")
print(f"姓名：{name}")
print(f"年龄：{age}")
print(f"身高：{height:.2f} m")
print(f"体重：{weight:.2f} kg")
print(f"BMI：{bmi:.2f}")
print("==============================")`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "九、暂时不要做健康诊断"
                },

                {
                    type: "paragraph",

                    text:
                        "这一课我们只学习如何把公式写成程序，以及如何格式化计算结果。这里暂时不根据 BMI 数值判断健康状况。后面学习 if 条件判断以后，就可以让程序根据不同条件执行不同代码。"
                },

                {
                    type: "animation",

                    title: "下一步：让程序学会判断",

                    duration: 2200,

                    html:
                        `
<div class="bmi-next-flow">

    <div class="bmi-next-value">
        <span>BMI</span>
        <strong>21.26</strong>
    </div>

    <div class="bmi-next-arrow">
        →
    </div>

    <div class="bmi-next-condition">
        <span>条件判断</span>
        <small>if / elif / else</small>
    </div>

    <div class="bmi-next-arrow">
        →
    </div>

    <div class="bmi-next-result">
        <span>不同结果</span>
        <small>根据条件执行</small>
    </div>

</div>
`,

                    css:
                        `
.bmi-next-flow {
    box-sizing: border-box;
    width: 100%;
    min-height: 150px;
    padding: 28px 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: #ffffff;
}

.bmi-next-value,
.bmi-next-condition,
.bmi-next-result {
    box-sizing: border-box;
    min-width: 105px;
    padding: 13px 10px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
}

.bmi-next-value span,
.bmi-next-condition span,
.bmi-next-result span {
    display: block;
    color: #7b8794;
    font-size: 10px;
}

.bmi-next-value strong {
    display: block;
    margin-top: 5px;
    color: #3776ab;
    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
    font-size: 15px;
}

.bmi-next-condition small,
.bmi-next-result small {
    display: block;
    margin-top: 5px;
    color: #8a96a3;
    font-size: 9px;
}

.bmi-next-arrow {
    color: #a2adb8;
    font-size: 18px;
    opacity: 0;
}
`,

                    js:
                        `
const arrows =
    animationRoot.querySelectorAll(
        ".bmi-next-arrow"
    );

arrows.forEach(arrow => {
    arrow.style.transition =
        "opacity .3s ease";
});

setTimeout(() => {
    arrows[0].style.opacity = "1";
}, 650);

setTimeout(() => {
    arrows[1].style.opacity = "1";
}, 1300);
`
                },

                {
                    type: "concepts",

                    items: [

                        {
                            title: "准备数据",

                            text:
                                "使用变量保存姓名、年龄、身高和体重等数据。"
                        },

                        {
                            title: "类型转换",

                            text:
                                "使用 float() 把字符串形式的身高和体重转换成浮点数。"
                        },

                        {
                            title: "数学表达式",

                            text:
                                "使用 ** 完成平方运算，再使用 / 完成除法。"
                        },

                        {
                            title: "格式化输出",

                            text:
                                "使用 f-string 和 :.2f 控制 BMI、身高和体重的显示格式。"
                        }

                    ]
                },

                {
                    type: "callout",

                    title: "这就是“公式 → 程序”的基本方法",

                    text:
                        "拿到一个现实问题时，可以先写出数学公式，再把公式中的每个数据对应到 Python 变量，最后使用 Python 的运算符把公式表达出来。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "十、综合练习"
                },

                {
                    type: "practice",

                    title: "练习 24：完整 BMI 报告",

                    description:
                        "创建姓名、年龄、身高和体重变量，计算 BMI，并输出一份完整报告。BMI 保留两位小数。先使用固定数据完成。",

                    starterCode:
                        `name = "Alice"
age = 25
height = 1.68
weight = 60

# 计算 BMI

print()
print("========== BMI 报告 ==========")

# 输出姓名、年龄、身高、体重和 BMI

print("==============================")`
                },

                {
                    type: "practice",

                    title: "练习 25：BMI 数据转换",

                    description:
                        "假设身高和体重来自文本数据。将它们转换成 float，然后完成 BMI 计算。",

                    starterCode:
                        `name = "Bob"
height_text = "1.75"
weight_text = "72.5"

# 将文本转换成数字


# 计算 BMI


print(f"姓名：{name}")
print(f"身高：{height:.2f} m")
print(f"体重：{weight:.2f} kg")
print(f"BMI：{bmi:.2f}")`
                },

                {
                    type: "practice",

                    title: "练习 26：BMI 计算器升级",

                    description:
                        "在前面的程序基础上增加一个“身高平方”变量，让计算过程更加清晰，并输出完整报告。",

                    starterCode:
                        `name = "Charlie"
age = 30
height = 1.72
weight = 68

# 计算身高的平方


# 计算 BMI


print("========== BMI 报告 ==========")
print(f"姓名：{name}")
print(f"年龄：{age}")
print(f"身高：{height:.2f} m")
print(f"体重：{weight:.2f} kg")
print(f"BMI：{bmi:.2f}")
print("==============================")`
                },

                {
                    type: "checklist",

                    items: [

                        "能够把数学公式转换成 Python 表达式",

                        "理解 ** 表示幂运算",

                        "能够使用 float() 转换小数数据",

                        "能够使用变量保存中间计算结果",

                        "能够使用 f-string 控制小数位数",

                        "能够把多个知识点组合成完整程序",

                        "理解程序中的数据和最终显示格式可以分开",

                        "知道下一步可以使用 if 让程序根据条件做出不同反应"

                    ]
                }

            ]
        },


        /* =================================================
           01-16
        ================================================= */

        {
            id: "py-01-16",

            title: "综合练习：你的第一个 Python 小程序",

            description:
                "完成第一阶段综合挑战，把前面学过的 Python 基础知识真正组合成一个完整程序。",

            content: [

                {
                    type: "paragraph",

                    text:
                        "恭喜你走到这里。到现在为止，你已经不只是看过一些 Python 语法，而是已经真正接触了编写程序所需要的几个基本环节：保存数据、处理数据、计算结果，以及把结果展示给用户。"
                },

                {
                    type: "callout",

                    title: "🎉 恭喜你，已经走到第一阶段的终点",

                    text:
                        "如果你能够理解前面的课程，并且能够自己完成简单的练习，那么你已经具备了独立编写简单 Python 程序的基础。不要小看这一点——很多真正的程序，最开始就是从变量、计算和输出这些看似简单的东西组合起来的。"
                },

                {
                    type: "paragraph",

                    text:
                        "接下来这一节，不再按照“先讲一个知识点，再马上给你一个答案”的方式学习。你需要自己分析问题、决定需要哪些变量、写出计算过程，然后组织最终输出。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "一、最终挑战：个人消费预算计算器"
                },

                {
                    type: "paragraph",

                    text:
                        "假设你正在制作一个简单的个人财务工具。用户需要输入本月的预算，以及房租、交通、餐饮、娱乐和其他支出。程序需要计算总支出、剩余预算以及预算使用率。"
                },

                {
                    type: "image",

                    alt:
                        "个人消费预算计算流程",

                    html:
                        `
<div class="budget-flow">

    <div class="budget-step">
        <span class="budget-number">01</span>
        <strong>输入数据</strong>
        <small>预算 / 各项支出</small>
    </div>

    <div class="budget-arrow">→</div>

    <div class="budget-step">
        <span class="budget-number">02</span>
        <strong>计算总支出</strong>
        <small>房租 + 交通 + 餐饮...</small>
    </div>

    <div class="budget-arrow">→</div>

    <div class="budget-step">
        <span class="budget-number">03</span>
        <strong>计算剩余</strong>
        <small>预算 - 总支出</small>
    </div>

    <div class="budget-arrow">→</div>

    <div class="budget-step">
        <span class="budget-number">04</span>
        <strong>输出报告</strong>
        <small>f-string</small>
    </div>

</div>
`,

                    css:
                        `
.budget-flow {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #ffffff;
    overflow-x: auto;
}

.budget-step {
    box-sizing: border-box;
    flex: 0 0 125px;
    min-height: 88px;
    padding: 13px 10px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
}

.budget-number {
    display: block;
    margin-bottom: 6px;
    color: #3776ab;
    font-size: 10px;
    font-weight: 600;
}

.budget-step strong {
    display: block;
    color: #344454;
    font-size: 12px;
    font-weight: 600;
}

.budget-step small {
    display: block;
    margin-top: 5px;
    color: #8a96a3;
    font-size: 9px;
}

.budget-arrow {
    flex: 0 0 auto;
    color: #a2adb8;
    font-size: 17px;
}
`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "二、先不要写代码，先分析问题"
                },

                {
                    type: "paragraph",

                    text:
                        "面对一个新的程序问题，第一反应不应该是马上写代码。先把问题拆开，看看程序需要哪些数据，以及最后需要计算什么。"
                },

                {
                    type: "concepts",

                    items: [

                        {
                            title: "需要哪些数据？",

                            text:
                                "本月预算、房租、交通、餐饮、娱乐和其他支出。"
                        },

                        {
                            title: "这些数据是什么类型？",

                            text:
                                "这些金额可能包含小数，因此可以使用 float 保存。"
                        },

                        {
                            title: "需要计算什么？",

                            text:
                                "总支出、剩余预算以及预算使用率。"
                        },

                        {
                            title: "最后需要输出什么？",

                            text:
                                "把预算、支出、剩余金额和使用率整理成一份清晰的报告。"
                        }

                    ]
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "三、把问题转换成公式"
                },

                {
                    type: "paragraph",

                    text:
                        "确定数据以后，再把现实问题转换成数学关系。这样写代码时就不会一边想问题、一边想语法。"
                },

                {
                    type: "code",

                    language: "python",

                    title: "先写出计算关系",

                    code:
                        `total = rent + transport + food + entertainment + other

remaining = budget - total

usage = total / budget`
                },

                {
                    type: "animation",

                    title: "预算数据如何一步一步变成结果",

                    duration: 2800,

                    html:
                        `
<div class="budget-calc-animation">

    <div class="budget-calc-group">

        <div class="budget-mini">
            <span>房租</span>
            <strong>3000</strong>
        </div>

        <div class="budget-plus">+</div>

        <div class="budget-mini">
            <span>餐饮</span>
            <strong>1500</strong>
        </div>

        <div class="budget-plus">+</div>

        <div class="budget-mini">
            <span>交通</span>
            <strong>500</strong>
        </div>

    </div>

    <div class="budget-equals">↓</div>

    <div class="budget-total">
        <span>总支出</span>
        <strong>5000 元</strong>
    </div>

</div>
`,

                    css:
                        `
.budget-calc-animation {
    box-sizing: border-box;
    width: 100%;
    min-height: 170px;
    padding: 28px 14px;
    background: #ffffff;
    text-align: center;
}

.budget-calc-group {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.budget-mini {
    min-width: 82px;
    padding: 10px 8px;
    border: 1px solid #dce4ec;
    border-radius: 7px;
    background: #f8fafc;
}

.budget-mini span {
    display: block;
    color: #7b8794;
    font-size: 9px;
}

.budget-mini strong {
    display: block;
    margin-top: 4px;
    color: #344454;
    font-size: 12px;
}

.budget-plus {
    color: #a0abb5;
    font-size: 15px;
}

.budget-equals {
    margin: 12px 0;
    color: #9aa7b4;
    font-size: 16px;
}

.budget-total {
    display: inline-block;
    min-width: 130px;
    padding: 11px 16px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f4f8fb;
}

.budget-total span {
    display: block;
    color: #7b8794;
    font-size: 10px;
}

.budget-total strong {
    display: block;
    margin-top: 5px;
    color: #3776ab;
    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
    font-size: 14px;
}
`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "四、开始挑战"
                },

                {
                    type: "paragraph",

                    text:
                        "下面给你一个程序框架。不要急着寻找答案。先根据前面学过的知识，把 total、remaining 和 usage 计算出来，然后运行程序检查结果。"
                },

                {
                    type: "practice",

                    title: "最终挑战：个人消费预算计算器",

                    description:
                        "尽量不要直接看答案。你需要自己完成三个计算：总支出、剩余预算和预算使用率。完成后，再尝试优化最终输出。",

                    starterCode:
                        `print("========== 个人消费预算 ==========")

budget = 5000.0
rent = 1800.0
transport = 300.0
food = 1200.0
entertainment = 400.0
other = 200.0

# 计算总支出


# 计算剩余预算


# 计算预算使用率


print()
print("========== 消费报告 ==========")
print(f"预算：{budget:.2f} 元")
print(f"总支出：{total:.2f} 元")
print(f"剩余：{remaining:.2f} 元")
print(f"预算使用率：{usage:.1%}")
print("==============================")`
                },

                {
                    type: "attention",

                    title: "本章的练习统一使用固定数据",

                    text:
                        "为了让每个练习都能直接运行、反复检查，本章所有实战和挑战都使用写在代码里的固定数据。真实项目中，数据可能来自文件、接口、数据库或用户输入；等你熟悉基本结构后，再学习如何接入这些数据来源。"
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "五、不要只满足于“能运行”"
                },

                {
                    type: "paragraph",

                    text:
                        "程序能够运行只是第一步。真正值得练习的是：你能不能看懂自己的代码？能不能发现变量之间的关系？能不能让输出更加清晰？"
                },

                {
                    type: "practice",

                    title: "挑战升级：增加储蓄目标",

                    description:
                        "增加一个“本月储蓄目标”，先从预算中扣除储蓄目标，再计算真正可以用于消费的金额。",

                    starterCode:
                        `budget = 6000.0
saving_goal = 1500.0

rent = 1800.0
food = 1200.0
transport = 300.0
other = 400.0

# 计算总支出


# 计算扣除储蓄目标后可消费的金额


# 计算最终剩余金额


print()
print("========== 月度预算报告 ==========")
print(f"预算：{budget:.2f} 元")
print(f"储蓄目标：{saving_goal:.2f} 元")
print(f"可消费金额：{available:.2f} 元")
print(f"实际支出：{total_expense:.2f} 元")
print(f"最终剩余：{remaining:.2f} 元")
print("==================================")`
                },

                {
                    type: "practice",

                    title: "挑战升级：制作更漂亮的报告",

                    description:
                        "在不改变计算逻辑的情况下，重新设计输出格式。可以增加标题、分隔线、百分比，或者增加你认为有用的信息。",

                    starterCode:
                        `budget = 6000.0
rent = 1800.0
food = 1200.0
transport = 300.0
entertainment = 400.0
other = 200.0

total = (
    rent +
    food +
    transport +
    entertainment +
    other
)

remaining = budget - total
usage = total / budget

# 尝试自己设计一份完整的消费报告


`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "六、回头看看：你已经学会了什么？"
                },

                {
                    type: "paragraph",

                    text:
                        "第一章一路学下来，你实际上已经完成了一条非常完整的学习路线。最开始，你只是让 Python 输出一句话；现在，你已经能够面对一个实际问题，分析数据、建立变量、进行计算，并输出最终结果。"
                },

                {
                    type: "concepts",

                    items: [

                        {
                            title: "输出",

                            text:
                                "使用 print() 把程序结果展示出来。"
                        },

                        {
                            title: "变量",

                            text:
                                "使用变量保存程序运行过程中需要的数据。"
                        },

                        {
                            title: "数据类型",

                            text:
                                "理解 int、float、str、bool 和 None。"
                        },

                        {
                            title: "字符串",

                            text:
                                "能够创建字符串、使用方法、索引和切片处理文本。"
                        },

                        {
                            title: "运算",

                            text:
                                "能够使用基本算术运算符和表达式完成计算。"
                        },

                        {
                            title: "数据来源",

                            text:
                                "理解程序的数据可以来自变量、固定数据、文件、接口或用户输入。"
                        },

                        {
                            title: "类型转换",

                            text:
                                "能够使用 int()、float() 和 str() 在不同数据类型之间转换。"
                        },

                        {
                            title: "格式化",

                            text:
                                "能够使用 f-string 把变量和计算结果组织成清晰的文本。"
                        }

                    ]
                },

                {
                    type: "checklist",

                    items: [

                        "我知道 Python 程序是什么",

                        "我知道 print() 如何输出",

                        "我理解变量和赋值",

                        "我知道 int、float、str、bool 和 None",

                        "我会创建和处理字符串",

                        "我会使用字符串索引和切片",

                        "我会进行基本数学运算",

                        "我知道表达式可以产生结果",

                        "我知道程序的数据可以来自哪里",

                        "我知道文本和数字需要区分",

                        "我会使用 int() 和 float() 转换数据",

                        "我会使用 f-string",

                        "我能够分析一个简单的现实问题",

                        "我能够把问题拆成数据、计算和输出",

                        "我可以独立完成一个简单 Python 程序"

                    ]
                },

                {
                    type: "callout",

                    title: "🎉 这一章，你真的已经走了很远",

                    text:
                        "如果这是你第一次系统学习 Python，那么请认真给自己一个肯定。你已经从“看不懂代码”走到了可以自己定义变量、处理数据、进行计算并完成一个小程序。现在的你可能还不能写大型项目，但这完全没有关系——最重要的第一步已经完成了。"
                },

                {
                    type: "animation",

                    title: "从写一句代码，到完成一个程序",

                    duration: 3000,

                    html:
                        `
<div class="chapter-progress">

    <div class="progress-stage">
        <span class="progress-icon">01</span>
        <strong>变量</strong>
        <small>保存数据</small>
    </div>

    <div class="progress-line"></div>

    <div class="progress-stage">
        <span class="progress-icon">02</span>
        <strong>运算</strong>
        <small>处理数据</small>
    </div>

    <div class="progress-line"></div>

    <div class="progress-stage">
        <span class="progress-icon">03</span>
        <strong>格式化</strong>
        <small>展示结果</small>
    </div>

    <div class="progress-line"></div>

    <div class="progress-stage final">
        <span class="progress-icon">✓</span>
        <strong>完整程序</strong>
        <small>你已经做到</small>
    </div>

</div>
`,

                    css:
                        `
.chapter-progress {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #ffffff;
    overflow-x: auto;
}

.progress-stage {
    box-sizing: border-box;
    flex: 0 0 105px;
    min-height: 85px;
    padding: 12px 8px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
    opacity: .25;
    transform: translateY(6px);
}

.progress-icon {
    display: block;
    margin-bottom: 6px;
    color: #3776ab;
    font-size: 11px;
    font-weight: 600;
}

.progress-stage strong {
    display: block;
    color: #344454;
    font-size: 12px;
}

.progress-stage small {
    display: block;
    margin-top: 5px;
    color: #8a96a3;
    font-size: 9px;
}

.progress-stage.final {
    background: #f4f8fb;
}

.progress-line {
    flex: 0 0 25px;
    height: 1px;
    background: #dce4ec;
    opacity: .2;
}
`,

                    js:
                        `
const stages =
    animationRoot.querySelectorAll(
        ".progress-stage"
    );

const lines =
    animationRoot.querySelectorAll(
        ".progress-line"
    );

stages.forEach(stage => {
    stage.style.transition =
        "opacity .45s ease, transform .45s ease";
});

lines.forEach(line => {
    line.style.transition =
        "opacity .25s ease";
});

stages.forEach((stage, index) => {

    setTimeout(() => {

        stage.style.opacity = "1";
        stage.style.transform =
            "translateY(0)";

        if (lines[index]) {
            setTimeout(() => {
                lines[index].style.opacity =
                    "1";
            }, 250);
        }

    }, 300 + index * 550);

});
`
                },

                {
                    type: "heading",

                    level: 3,

                    text:
                        "七、下一章：让 Python 学会“做决定”"
                },

                {
                    type: "paragraph",

                    text:
                        "到目前为止，我们写过的程序基本都是从上到下执行：先创建变量，再计算，再输出。可是现实中的程序并不总是这么简单。"
                },

                {
                    type: "paragraph",

                    text:
                        "例如：如果余额不足，就提醒用户；如果成绩达到 90 分，就显示优秀；如果一个列表里有很多数据，就需要一个一个处理；如果某个条件已经满足，就可以提前停止。"
                },

                {
                    type: "animation",

                    title: "下一章：程序开始做决定和重复工作",

                    duration: 3000,

                    html:
                        `
<div class="next-chapter-flow">

    <div class="next-chapter-item">
        <span class="next-chapter-keyword">
            if
        </span>
        <strong>做决定</strong>
        <small>如果条件成立</small>
    </div>

    <div class="next-chapter-item">
        <span class="next-chapter-keyword">
            for
        </span>
        <strong>重复执行</strong>
        <small>逐个处理数据</small>
    </div>

    <div class="next-chapter-item">
        <span class="next-chapter-keyword">
            while
        </span>
        <strong>持续执行</strong>
        <small>条件满足就继续</small>
    </div>

    <div class="next-chapter-item">
        <span class="next-chapter-keyword">
            break
        </span>
        <strong>提前结束</strong>
        <small>不再继续循环</small>
    </div>

    <div class="next-chapter-item">
        <span class="next-chapter-keyword">
            continue
        </span>
        <strong>跳过本次</strong>
        <small>继续下一轮</small>
    </div>

</div>
`,

                    css:
                        `
.next-chapter-flow {
    box-sizing: border-box;
    width: 100%;
    padding: 30px 10px;
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 8px;
    background: #ffffff;
    overflow-x: auto;
}

.next-chapter-item {
    box-sizing: border-box;
    flex: 0 0 105px;
    padding: 13px 8px;
    border: 1px solid #dce4ec;
    border-radius: 8px;
    background: #f8fafc;
    text-align: center;
    opacity: .25;
    transform: translateY(6px);
}

.next-chapter-keyword {
    display: block;
    margin-bottom: 7px;
    color: #3776ab;
    font-family:
        "SFMono-Regular",
        Consolas,
        monospace;
    font-size: 14px;
    font-weight: 600;
}

.next-chapter-item strong {
    display: block;
    color: #344454;
    font-size: 11px;
}

.next-chapter-item small {
    display: block;
    margin-top: 5px;
    color: #8a96a3;
    font-size: 8px;
}
`,

                    js:
                        `
const items =
    animationRoot.querySelectorAll(
        ".next-chapter-item"
    );

items.forEach(item => {

    item.style.transition =
        "opacity .45s ease, transform .45s ease";

});

items.forEach((item, index) => {

    setTimeout(() => {

        item.style.opacity = "1";
        item.style.transform =
            "translateY(0)";

    }, 300 + index * 450);

});
`
                },

                {
                    type: "callout",

                    title: "🚀 下一章：程序控制流",

                    text:
                        "下一章，我们正式进入 Python 的程序控制流。你将学习比较运算、布尔逻辑、if / elif / else 条件判断，以及 for、while、break、continue 等循环控制语句。到那时，Python 程序将不再只是“从上到下计算几个变量”，而是可以根据不同情况做决定、重复执行任务，并控制程序什么时候继续、什么时候停止。"
                },

                {
                    type: "paragraph",

                    text:
                        "准备好了吗？下一章开始，Python 会真正“动起来”。"
                }

            ]
        },

    ]

};