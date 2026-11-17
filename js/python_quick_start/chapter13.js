/* =========================================================
   PYTHON QUICK START
   chapter13.js

   第 13 章：Python 自动化实战

   教学目标：

   本章不再把“自动化”理解成几个简单脚本。

   真正的自动化程序通常需要：

   1. 扫描环境
   2. 读取数据
   3. 判断任务
   4. 批量处理
   5. 记录日志
   6. 处理异常
   7. 保存结果
   8. 支持配置
   9. 支持命令行
   10. 组织成可以长期运行的程序

   本章会把前面章节的知识真正组合起来：

   文件
   JSON / CSV
   函数
   数据结构
   异常
   类
   迭代器
   设计模式
   CLI
   logging

   最终完成一个小型自动化系统。
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


export const chapter13 = {

    id: "chapter-13",

    number: "13",

    title: "Python 自动化实战",

    englishTitle: "Python Automation",

    description:
        "从编写一次性脚本进入真正的自动化工程。学习如何扫描文件、批量处理数据、构建任务流水线、记录日志、处理失败、设计 CLI，并最终完成一个可以长期运行的小型自动化系统。",

    sections: [


        /* =====================================================
           01
        ===================================================== */

        lesson(
            "py-13-01",

            "自动化到底是什么？",

            "自动化并不是“让 Python 帮我执行一个命令”，而是把原本需要人反复判断和执行的工作，变成一个可以稳定重复运行的流程。",

            [

                paragraph(
                    "很多初学者第一次接触自动化时，会想到批量改文件名、移动图片或者生成一个 CSV。这些确实属于自动化，但真正有价值的自动化程序往往比一个简单脚本复杂得多。"
                ),

                paragraph(
                    "一个真实任务通常不是一个动作，而是一条流水线：发现任务、读取输入、验证数据、执行处理、保存结果、记录状态、处理异常，最后还要能够再次运行。"
                ),

                diagram(
                    "从脚本到自动化系统",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            人工操作
                            <small>重复、容易出错</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Python 脚本
                            <small>自动执行一个任务</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            自动化流水线
                            <small>多个任务连续执行</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            自动化系统
                            <small>配置、日志、异常、恢复</small>
                        </div>

                    </div>
                    `,

                    "自动化的难点通常不是“怎么执行”，而是“怎么让它长期稳定地执行”。"
                ),

                concepts([
                    "自动化的核心是减少重复的人类决策",
                    "自动化程序必须考虑输入是否正确",
                    "自动化程序必须考虑任务失败",
                    "自动化程序应该可以重复运行",
                    "真正的工程自动化需要状态、日志和错误处理"
                ]),

                thinking(
                    "思考",

                    "如果一个程序第一次运行成功，但是第二次运行会把第一次生成的文件再次处理一遍，那么它算不算一个可靠的自动化程序？"
                )
            ]
        ),


        /* =====================================================
           02
        ===================================================== */

        lesson(
            "py-13-02",

            "扫描文件系统：先发现任务",

            "自动化程序首先需要知道“现在有什么”。学习如何把目录扫描变成一个可处理的数据流。",

            [

                paragraph(
                    "前面的章节已经学习过 pathlib。现在我们不再只是介绍 Path 的方法，而是把文件系统当成自动化程序的数据源。"
                ),

                code(
                    `from pathlib import Path


root = Path("data")

for path in root.rglob("*"):

    if path.is_file():

        print(path)`,
                    "递归扫描目录"
                ),

                paragraph(
                    "rglob() 可以递归发现目录中的文件。这样一个目录就可以被转换成 Python 可以继续处理的数据流。"
                ),

                code(
                    `from pathlib import Path


root = Path("data")

files = (
    path
    for path in root.rglob("*")
    if path.is_file()
)

for path in files:

    print(path.name)`,
                    "把文件系统变成迭代器"
                ),

                callout(
                    "重要",

                    "这里开始把第 11 章的迭代器、生成器思想真正用于工程。不要急着把所有文件放进 list。面对大量文件时，惰性遍历可以减少不必要的内存占用。"
                ),

                practice(
                    "项目练习 86：文件扫描器",

                    "编写一个文件扫描器，递归遍历一个目录，并统计不同扩展名的文件数量。",

                    `from pathlib import Path


root = Path("data")

counts = {}

for path in root.rglob("*"):

    if not path.is_file():
        continue

    suffix = path.suffix.lower()

    counts[suffix] = counts.get(suffix, 0) + 1

print(counts)`
                )
            ]
        ),


        /* =====================================================
           03
        ===================================================== */

        lesson(
            "py-13-03",

            "批量处理：自动化的第一个真正难点",

            "从“找到文件”进入“对大量文件执行统一规则”。",

            [

                paragraph(
                    "批处理真正困难的地方不是 for 循环，而是你必须定义清楚：哪些文件应该处理？哪些应该跳过？处理成功后发生什么？失败后怎么办？"
                ),

                code(
                    `from pathlib import Path


source = Path("input")
target = Path("images")

target.mkdir(exist_ok=True)


for path in source.iterdir():

    if not path.is_file():
        continue

    if path.suffix.lower() not in {
        ".jpg",
        ".jpeg",
        ".png",
        ".gif"
    }:
        continue

    destination = target / path.name

    path.rename(destination)

    print(f"Moved: {path.name}")`,
                    "批量文件处理"
                ),

                paragraph(
                    "这个例子已经比简单的“移动文件”复杂了一步：程序开始拥有规则。规则越多，自动化程序越接近真正的软件。"
                ),

                thinking(
                    "继续思考",

                    "如果目标目录中已经存在同名文件，你应该覆盖它、跳过它、自动改名，还是直接报错？不同选择实际上对应不同的业务策略。"
                ),

                practice(
                    "项目练习 87：安全文件整理器",

                    "实现一个文件整理程序。要求：只处理指定扩展名；目标文件已存在时不能直接覆盖；每次操作都要记录；程序重复执行不会破坏已有结果。"
                )
            ]
        ),


        /* =====================================================
           04
        ===================================================== */

        lesson(
            "py-13-04",

            "配置驱动：不要把规则全部写死",

            "真正可维护的自动化程序应该尽量把经常变化的规则从代码中分离出来。",

            [

                paragraph(
                    "假设你写了一个文件整理程序。今天需要整理图片，明天需要整理视频，后天又要修改目标目录。如果每次都修改 Python 源代码，自动化程序就失去了很大一部分价值。"
                ),

                paragraph(
                    "一个常见的解决方案是使用配置文件。JSON 是一个非常适合入门的选择。"
                ),

                code(
                    `{
    "rules": {
        ".jpg": "images",
        ".png": "images",
        ".mp4": "videos",
        ".pdf": "documents"
    },

    "overwrite": false
}`,
                    "config.json",
                    "json"
                ),

                code(
                    `import json
from pathlib import Path


config_path = Path("config.json")

with config_path.open(
    "r",
    encoding="utf-8"
) as f:

    config = json.load(f)


rules = config["rules"]

print(rules)`,
                    "读取配置"
                ),

                paragraph(
                    "这样以后修改自动化规则时，不一定需要修改程序本身。代码负责“怎么做”，配置负责“做什么”。"
                ),

                concepts([
                    "代码：执行机制",
                    "配置：业务规则",
                    "数据：需要处理的对象",
                    "日志：程序执行留下的记录"
                ]),

                practice(
                    "项目练习 88：配置驱动的文件整理器",

                    "把前面的文件整理器改造成配置驱动版本。要求：扩展名和目标目录全部来自 JSON 配置文件。"
                )
            ]
        ),


        /* =====================================================
           05
        ===================================================== */

        lesson(
            "py-13-05",

            "日志：让自动化程序留下证据",

            "一个自动运行的程序不能只依赖 print。日志是自动化系统理解过去发生了什么的重要手段。",

            [

                paragraph(
                    "人工运行程序时，可以盯着终端观察。但如果程序半夜自动运行，第二天才发现结果不对，你需要知道昨天到底发生了什么。"
                ),

                code(
                    `import logging


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s "
           "%(levelname)s "
           "%(message)s"
)


logging.info("任务开始")

logging.warning("发现一个未知文件")

logging.error("处理文件失败")`,
                    "logging 基础"
                ),

                paragraph(
                    "logging 比 print 更适合长期运行的程序，因为它可以区分日志级别，并进一步输出到文件、控制台或其他日志系统。"
                ),

                code(
                    `import logging


logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    encoding="utf-8"
)


logging.info("自动化任务开始")
logging.info("读取配置")
logging.info("处理数据")
logging.info("任务结束")`,
                    "记录到日志文件"
                ),

                concepts([
                    "DEBUG：调试信息",
                    "INFO：正常运行信息",
                    "WARNING：值得注意的问题",
                    "ERROR：处理失败",
                    "CRITICAL：严重错误"
                ]),

                practice(
                    "项目练习 89：带日志的自动化程序",

                    "为前面的文件整理器加入 logging。要求：记录开始时间、扫描数量、成功数量、跳过数量和失败数量。"
                )
            ]
        ),


        /* =====================================================
           06
        ===================================================== */

        lesson(
            "py-13-06",

            "异常处理：自动化程序必须允许失败",

            "现实世界中的文件、数据和网络都不可靠。自动化程序必须知道如何面对失败。",

            [

                paragraph(
                    "前面第 9 章已经系统学习过异常处理。本章不再重复语法，而是把异常处理应用到批量任务中。"
                ),

                code(
                    `from pathlib import Path
import logging


for path in Path("input").iterdir():

    try:

        text = path.read_text(
            encoding="utf-8"
        )

        print(
            path.name,
            len(text)
        )

    except UnicodeDecodeError:

        logging.warning(
            "无法读取: %s",
            path
        )

    except OSError as e:

        logging.error(
            "文件错误: %s",
            e
        )`,
                    "批量任务中的异常隔离"
                ),

                paragraph(
                    "这里有一个非常重要的自动化思想：一个文件失败，不一定意味着整个任务都应该失败。"
                ),

                diagram(
                    "批处理中的错误隔离",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            文件 A
                            <small>成功</small>
                        </div>

                        <div class="diagram-node">
                            文件 B
                            <small>失败</small>
                        </div>

                        <div class="diagram-node">
                            文件 C
                            <small>继续处理</small>
                        </div>

                        <div class="diagram-node">
                            文件 D
                            <small>成功</small>
                        </div>

                    </div>
                    `,

                    "一个任务失败时，需要判断是终止整个流水线，还是记录失败后继续。"
                ),

                thinking(
                    "工程问题",

                    "哪些错误可以继续？哪些错误必须立即停止？这已经不是 Python 语法问题，而是程序设计问题。"
                )
            ]
        ),


        /* =====================================================
           07
        ===================================================== */

        lesson(
            "py-13-07",

            "任务流水线：把多个步骤连接起来",

            "自动化真正强大的地方在于把多个简单操作组合成一个稳定的处理流程。",

            [

                paragraph(
                    "一个完整的数据处理任务通常包含多个阶段。例如：扫描文件 → 读取 → 清洗 → 分析 → 保存 → 归档。"
                ),

                diagram(
                    "自动化流水线",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            Scan
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Load
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Validate
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Process
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Export
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Archive
                        </div>

                    </div>
                    `
                ),

                code(
                    `def scan():
    return ...


def load(files):
    return ...


def validate(data):
    return ...


def process(data):
    return ...


def export_result(result):
    ...


def archive(files):
    ...


files = scan()

data = load(files)

validate(data)

result = process(data)

export_result(result)

archive(files)`,
                    "最基本的任务流水线"
                ),

                paragraph(
                    "当每一步都有清晰的职责时，程序就开始具备架构。后面第 12 章学习的职责分离、组合、依赖注入，在这里会真正发挥作用。"
                ),

                practice(
                    "项目练习 90：设计数据处理 Pipeline",

                    "设计一个由多个步骤组成的数据处理流水线。每个步骤使用独立函数完成，主程序负责组织流程。"
                )
            ]
        ),


        /* =====================================================
           08
        ===================================================== */

        lesson(
            "py-13-08",

            "数据自动化：CSV → 分析 → 报告",

            "把前面学习的 CSV、字典、函数、异常、文件和日志组合起来。",

            [

                paragraph(
                    "现在开始做一个更接近真实工作的项目：程序每天收到一份 CSV 数据，自动读取、分析并生成报告。"
                ),

                code(
                    `name,score
Alice,91
Bob,78
Charlie,88
David,64
Eve,95`,
                    "scores.csv",
                    "csv"
                ),

                code(
                    `import csv


def load_scores(path):

    with open(
        path,
        "r",
        encoding="utf-8",
        newline=""
    ) as f:

        return list(
            csv.DictReader(f)
        )


rows = load_scores("scores.csv")

for row in rows:

    row["score"] = int(row["score"])

print(rows)`,
                    "读取并转换 CSV"
                ),

                code(
                    `def analyze(rows):

    scores = [
        row["score"]
        for row in rows
    ]

    return {
        "count": len(scores),
        "average": sum(scores) / len(scores),
        "highest": max(scores),
        "lowest": min(scores)
    }


result = analyze(rows)

print(result)`,
                    "数据分析"
                ),

                code(
                    `def build_report(result):

    return f"""
成绩分析报告
============

人数：{result["count"]}
平均分：{result["average"]:.2f}
最高分：{result["highest"]}
最低分：{result["lowest"]}
""".strip()


report = build_report(result)

print(report)`,
                    "生成报告"
                ),

                practice(
                    "项目练习 91：自动成绩报告系统",

                    "完成一个完整程序：读取 CSV → 转换数据 → 计算统计结果 → 生成 Markdown 或 TXT 报告 → 保存报告文件 → 写入日志。"
                )
            ]
        ),


        /* =====================================================
           09
        ===================================================== */

        lesson(
            "py-13-09",

            "幂等性：为什么自动化程序可以重复运行？",

            "一个优秀的自动化任务应该尽量做到重复执行不会产生灾难性的副作用。",

            [

                paragraph(
                    "这是很多初学者第一次接触自动化工程时容易忽略的问题。"
                ),

                paragraph(
                    "例如，一个程序把 input/report.csv 处理成 output/report.txt。如果程序执行了一半突然崩溃，再运行一次会发生什么？"
                ),

                paragraph(
                    "如果程序每次运行都会重复追加数据、重复移动文件或者覆盖重要结果，那么它就很难成为可靠的自动化任务。"
                ),

                concepts([
                    "检查目标是否已经存在",
                    "区分已处理和未处理的数据",
                    "使用临时文件避免生成半成品",
                    "任务完成后再标记状态",
                    "失败后可以重新运行",
                    "重复运行不会破坏已有结果"
                ]),

                code(
                    `from pathlib import Path


source = Path("input/data.csv")
target = Path("output/data.txt")


if target.exists():

    print("已经处理过，跳过")

else:

    text = source.read_text(
        encoding="utf-8"
    )

    target.write_text(
        text,
        encoding="utf-8"
    )

    print("处理完成")`,
                    "简单的幂等处理"
                ),

                callout(
                    "工程概念",

                    "幂等性是自动化系统非常重要的概念。因为真正的自动化环境中，失败、重试、重复执行都是正常情况。"
                ),

                practice(
                    "项目练习 92：可重复运行的数据处理器",

                    "改造成绩报告项目，使它可以重复运行。要求：已经生成且有效的报告不重复生成；处理中断后再次执行能够继续完成。"
                )
            ]
        ),


        /* =====================================================
           10
        ===================================================== */

        lesson(
            "py-13-10",

            "命令行工具：让程序真正成为工具",

            "把 Python 程序从一次性脚本提升为可以被别人调用的命令行工具。",

            [

                paragraph(
                    "当程序开始具有配置、日志、多个处理步骤之后，它已经不应该只依赖修改源码来运行。命令行接口可以让程序成为真正的小工具。"
                ),

                code(
                    `import argparse


parser = argparse.ArgumentParser(
    description="数据处理工具"
)


parser.add_argument(
    "input",
    help="输入文件"
)


parser.add_argument(
    "--output",
    default="report.txt",
    help="输出文件"
)


args = parser.parse_args()


print("输入：", args.input)
print("输出：", args.output)`,
                    "argparse"
                ),

                paragraph(
                    "相比直接读取 sys.argv，argparse 可以自动处理参数定义、帮助信息和错误提示，更适合真正的 CLI 程序。"
                ),

                code(
                    `python report.py scores.csv

python report.py scores.csv --output result.txt

python report.py --help`,
                    "命令行调用",
                    "bash"
                ),

                practice(
                    "项目练习 93：成绩分析 CLI",

                    "把成绩报告程序改造成 CLI 工具。支持输入文件、输出文件以及详细程度等参数。"
                )
            ]
        ),


        /* =====================================================
           11
        ===================================================== */

        lesson(
            "py-13-11",

            "自动化程序的配置、状态与日志",

            "当程序越来越复杂时，需要开始区分配置、运行状态和执行结果。",

            [

                diagram(
                    "自动化系统的四类信息",

                    `
                    <div class="diagram-grid">

                        <div class="diagram-node">
                            Config
                            <small>程序应该怎么工作</small>
                        </div>

                        <div class="diagram-node">
                            Input
                            <small>程序需要处理什么</small>
                        </div>

                        <div class="diagram-node">
                            State
                            <small>程序处理到哪里</small>
                        </div>

                        <div class="diagram-node">
                            Output
                            <small>程序产生什么结果</small>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "这是从脚本进入系统设计的重要一步。"
                ),

                paragraph(
                    "配置不是输入数据，日志也不是输出数据，程序状态又和日志不同。把这些概念区分开，自动化程序才容易继续扩展。"
                ),

                concepts([
                    "Configuration：配置",
                    "Input：输入",
                    "State：状态",
                    "Output：输出",
                    "Log：执行记录"
                ]),

                thinking(
                    "架构问题",

                    "如果一个程序每天凌晨执行一次，你如何判断今天的任务是否已经成功完成？如果服务器在处理过程中突然断电呢？"
                )
            ]
        ),


        /* =====================================================
           12
        ===================================================== */

        lesson(
            "py-13-12",

            "并发：当任务开始变多",

            "当自动化任务包含大量独立工作时，可以进一步思考如何提高吞吐量。",

            [

                paragraph(
                    "例如，你有 10,000 个文件需要处理。如果每个文件都需要一定时间，那么一个接一个处理可能非常慢。"
                ),

                paragraph(
                    "这时就会遇到并发问题。不过，并发并不是“开更多线程就一定更快”。不同任务适合不同的执行模型。"
                ),

                concepts([
                    "CPU 密集型任务",
                    "I/O 密集型任务",
                    "线程",
                    "进程",
                    "异步 I/O",
                    "任务队列"
                ]),

                code(
                    `from concurrent.futures import ThreadPoolExecutor


def process_file(path):

    print("processing:", path)

    return path


files = [
    "a.txt",
    "b.txt",
    "c.txt",
    "d.txt"
]


with ThreadPoolExecutor(
    max_workers=4
) as executor:

    results = list(
        executor.map(
            process_file,
            files
        )
    )

print(results)`,
                    "线程池"
                ),

                note(
                    "注意",

                    "本节重点不是让你马上掌握所有并发 API，而是建立判断能力：任务为什么慢？瓶颈在哪里？这个任务是否可以并行？"
                ),

                practice(
                    "项目练习 94：并发文件处理",

                    "设计一个文件处理程序，对多个独立文件进行处理，并比较串行执行和线程池执行的思路。"
                )
            ]
        ),


        /* =====================================================
           13
        ===================================================== */

        lesson(
            "py-13-13",

            "任务调度：让程序自己运行",

            "自动化的最终目标之一，是让任务不再依赖人工启动。",

            [

                paragraph(
                    "当一个程序已经可以稳定完成任务后，下一个问题自然出现：能不能每天自动运行？"
                ),

                paragraph(
                    "在真实环境中，Python 程序通常不会自己负责“每天几点执行”。更常见的方式是由操作系统或外部调度系统负责启动 Python 程序。"
                ),

                concepts([
                    "Windows Task Scheduler",
                    "Linux cron",
                    "systemd timer",
                    "CI/CD 定时任务",
                    "外部任务调度系统"
                ]),

                code(
                    `python report.py data/scores.csv`,
                    "任务调度器最终执行的仍然是普通程序",
                    "bash"
                ),

                paragraph(
                    "因此，一个好的自动化程序应该尽量做到：启动方式清晰、参数明确、日志完整、失败状态可判断。"
                ),

                thinking(
                    "系统思维",

                    "真正的自动化不是“让程序自己跑起来”，而是建立一个从触发、执行、记录到失败恢复的完整闭环。"
                )
            ]
        ),


        /* =====================================================
           14
        ===================================================== */

        lesson(
            "py-13-14",

            "综合项目：自动化数据处理平台",

            "把本章以及前面章节的知识组合起来，完成一个真正具有工程结构的自动化项目。",

            [

                paragraph(
                    "现在开始本章最重要的项目。你将设计一个可以持续处理数据的小型自动化系统。"
                ),

                diagram(
                    "最终项目架构",

                    `
                    <div class="diagram-flow">

                        <div class="diagram-node">
                            CLI
                            <small>启动任务</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Config
                            <small>读取配置</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Scanner
                            <small>发现数据</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Pipeline
                            <small>处理数据</small>
                        </div>

                        <div class="diagram-arrow">→</div>

                        <div class="diagram-node">
                            Reporter
                            <small>生成结果</small>
                        </div>

                    </div>
                    `
                ),

                paragraph(
                    "建议项目目录："
                ),

                code(
                    `automation_project/
│
├── main.py
├── config.json
│
├── pipeline/
│   ├── scanner.py
│   ├── loader.py
│   ├── processor.py
│   └── reporter.py
│
├── data/
│   ├── input/
│   └── output/
│
├── logs/
│
└── tests/
    └── test_processor.py`,
                    "项目结构",
                    "text"
                ),

                paragraph(
                    "这个项目不要求一次把所有内容写完。可以先完成最小版本，再逐步增加配置、日志、异常恢复、CLI、测试和并发。"
                ),

                concepts([
                    "Scanner：发现输入",
                    "Loader：读取数据",
                    "Processor：处理数据",
                    "Reporter：生成结果",
                    "Pipeline：组织流程",
                    "CLI：提供用户入口",
                    "Logger：记录执行过程"
                ]),

                practice(
                    "项目练习 95：完成自动化数据处理平台",

                    "任选一种现实数据作为输入，例如 CSV 成绩、商品数据、日志文件或文件目录。完成一个可以扫描数据、处理数据、生成结果、记录日志并通过 CLI 启动的自动化系统。"
                )
            ]
        ),


        /* =====================================================
           15
        ===================================================== */

        lesson(
            "py-13-15",

            "综合挑战：让系统面对真实世界",

            "最后不要再给程序一个永远正确的输入。主动制造问题，测试你的自动化系统。",

            [

                paragraph(
                    "真正的软件工程能力不是让程序在理想情况下运行，而是知道它在错误情况下应该怎么办。"
                ),

                practice(
                    "挑战 1：输入文件损坏",

                    "随机删除 CSV 的某些字段，观察程序是否能够发现错误，并给出明确日志。"
                ),

                practice(
                    "挑战 2：重复运行",

                    "连续运行自动化程序三次。检查是否产生重复报告、重复文件或者错误数据。"
                ),

                practice(
                    "挑战 3：中途失败",

                    "让程序处理到一半时主动抛出异常，然后重新运行。观察它是否能够安全恢复。"
                ),

                practice(
                    "挑战 4：大量数据",

                    "生成数万条测试数据，观察程序的内存和运行时间。思考哪里可以使用生成器、批处理或者并发。"
                ),

                practice(
                    "挑战 5：重新设计",

                    "如果未来需要增加 Excel、JSON、数据库三种输入格式，你会如何修改现在的程序，使核心处理逻辑尽量不变？"
                ),

                thinking(
                    "真正的问题",

                    "如果你的自动化程序明天交给另一个完全不了解代码的人使用，他能不能仅仅通过 --help、配置文件和日志就理解这个程序？"
                )
            ]
        ),


        /* =====================================================
           16
        ===================================================== */

        lesson(
            "py-13-16",

            "本章总结：从脚本到自动化系统",

            "自动化真正训练的是把 Python 知识组合成解决现实问题的能力。",

            [

                paragraph(
                    "到了这里，你应该已经能够明显感觉到：Python 的价值并不只是某个函数、某个语法或者某个库。真正重要的是把这些基础能力组合起来。"
                ),

                diagram(
                    "Python 自动化能力树",

                    `
                    <div class="diagram-grid">

                        <div class="diagram-node">
                            Python 基础
                            <small>变量 / 函数 / 循环</small>
                        </div>

                        <div class="diagram-node">
                            数据结构
                            <small>List / Dict / Set</small>
                        </div>

                        <div class="diagram-node">
                            文件与数据
                            <small>Path / CSV / JSON</small>
                        </div>

                        <div class="diagram-node">
                            异常
                            <small>失败处理</small>
                        </div>

                        <div class="diagram-node">
                            迭代器
                            <small>数据流</small>
                        </div>

                        <div class="diagram-node">
                            OOP
                            <small>组织复杂程序</small>
                        </div>

                        <div class="diagram-node">
                            设计模式
                            <small>控制复杂度</small>
                        </div>

                        <div class="diagram-node">
                            自动化
                            <small>解决真实问题</small>
                        </div>

                    </div>
                    `
                ),

                checklist([
                    "能够递归扫描文件系统",
                    "能够批量处理文件和数据",
                    "能够使用 JSON 管理配置",
                    "能够使用 logging 记录运行过程",
                    "能够设计异常处理和错误隔离",
                    "理解任务流水线",
                    "理解幂等性和重复运行",
                    "能够编写 CLI 工具",
                    "知道什么时候考虑并发",
                    "能够设计一个完整的自动化项目"
                ]),

                callout(
                    "下一步",

                    "如果你已经能够独立完成本章综合项目，那么你已经不再只是“会写 Python 语法”。下一步可以开始把 Python 用到真正的数据分析、机器学习和深度学习任务中。"
                ),

                paragraph(
                    "尤其值得注意的是：在机器学习和深度学习项目中，模型训练往往只是整个系统的一部分。数据读取、清洗、转换、批处理、缓存、预加载和训练流水线，同样需要扎实的 Python 工程能力。"
                ),

                paragraph(
                    "这也正是前面第 11 章迭代器、生成器、数据管道，以及本章自动化实践最终汇合的地方。"
                )
            ]
        )

    ]
};


export default chapter13;