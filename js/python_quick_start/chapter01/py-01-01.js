/* =========================================================
   PYTHON QUICK START · 第 01 章
   py-01-01 · Python 到底是什么？
   ---------------------------------------------------------
   本章第 1 个小节。
   内容只用数据描述，具体渲染见：
       js/shared/content_blocks.js
       js/shared/content_renderer.js
========================================================= */
export const py_01_01 = {
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
            content:
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
            content:
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
            content:
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
            content:
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
};
export default py_01_01;
