# Tutorial Studio 教程中心

## 在线访问

- [教程中心](https://artinte.github.io/tutorial/)
- [Python 快速入门](https://makevideowithhtml.top/tutorial/html/python_quick_start/index.html)
- [深度学习基础](https://makevideowithhtml.top/tutorial/html/deep_learning_fundamentals/index.html)
- [在线编辑器](https://makevideowithhtml.top)


## 目录结构

```
index.html                     教程中心首页
css/tutorial.css               首页样式
js/tutorial.js                 首页课程数据与筛选

css/shared/                    ★ 共享样式
    content_kit.css            正文样式（代码块、练习、提示、结构图……）
    reader.css                 目录 / 进度 / 上下节导航

js/shared/                     ★ 共享模块
    content_blocks.js          内容构造器（课程的「词汇表」）
    content_renderer.js        正文渲染与交互（复制、运行、动画、编号）
    course_reader.js           目录、编号、进度、上下节、路由回调

js/utils/html_escape.js        统一转义

js/python_quick_start/         Python 课程
    chapters.js                课程元数据 + 15 章汇总 + 统计
    chapter01.js               第 01 章：元数据 + 汇总 16 个小节
    chapter01/                 第 01 章的 16 个小节，一节一个文件
        py-01-01.js … py-01-16.js
    chapter02.js … chapter15.js  其余各章（整章一个文件）
    introduction.js            课程前言
    python_quick_start.js      页面引擎（运行环境、AI 助手、首页）

js/deep_learning_fundamentals/ 深度学习课程
    chapters.js                13 章内容（使用同一套构造器）
    deep_learning_fundamentals.js  页面引擎
    neural_training_visual.js  首页主视觉动画

html/                          两个课程页面
scripts/                       自检脚本（见文末）
```


## 共享模块：内容只写数据，不写 HTML / CSS

两门课使用同一套内容定义与同一套样式。新增内容时只写数据：

```js
import {
    lesson, paragraph, heading, code, practice,
    thinking, note, callout, concepts, checklist, diagram
} from "../shared/content_blocks.js";

export const chapter16 = {
    id: "chapter-16",
    number: "16",
    title: "……",
    description: "……",
    sections: [
        lesson(
            "py-16-01",
            "小节标题",
            "小节导语",
            [
                paragraph("正文段落。"),
                heading("小标题（编号由渲染器自动生成）"),
                code(`print("hi")`, "代码标题", "python"),
                practice("练习标题", "练习说明", `print("起点")`),
                note("注意", "提示内容"),
                concepts(["概念 A", "概念 B"])
            ]
        )
    ]
};
```

要点：

- `code(content, title, language)` 的代码正文统一使用 `content` 字段。
- 只有 `language === "python"` 且课程接入了运行环境时才显示「运行代码」。
- 正文里的普通内容（段落、练习、提示、概念）只写数据，不写 HTML。
- **复杂的示意图 / 动画用 HTML + CSS + JS 写**：`diagram(title, html, description)` 的第二个参数就是图形本身，
  渲染器只负责加统一外框（标题、留白、圆角、画布底色）。
  图形内部的类名与布局完全由内容决定，对应样式写在 `css/shared/diagram.css`：

```js
diagram("Python 的三层工具世界", `
    <div class="stdlib-layer-diagram">
        <div class="stdlib-layer">你的程序</div>
        <div class="stdlib-arrow">↓</div>
        <div class="stdlib-layer stdlib-highlight">Python 标准库</div>
    </div>
`);
```

`css/shared/diagram.css` 里已经有一套通用图元可以直接用：
`.diagram-row` `.diagram-flow` `.diagram-column` `.diagram-stack` `.diagram-grid`
`.diagram-box` `.diagram-node` `.diagram-arrow` `.diagram-table` `.diagram-tags` `.highlight`，
以及主题变量 `--dg-accent` `--dg-surface` `--dg-border` `--dg-text` `--dg-mono` 等。

新增图解样式时补在 `diagram.css` 对应章节的分节里，写完跑一次覆盖检查（见文末自检脚本）。

动画同理：`animation` block 的 `html` / `css` / `js` 就是动画自己的舞台，不参与页面样式。

`js/python_quick_start/content_helpers.js` 只是转发共享模块，保持旧章节的 import 可用。


## 编号规则

目录与正文的编号都由共享模块生成，内容里不手写编号：

| 层级 | 编号 | 出现位置 |
| --- | --- | --- |
| 章节 | `1` | 左侧目录 |
| 小节 | `1.1` | 左侧目录 + 正文标题 |
| 正文小标题 | `1.1.1` | 右侧正文 |

因此调整章节顺序或增删小节后，编号会自动跟着变。


## 页面分工

- 首页（`index.html`）：课程筛选与入口。
- 课程首页：每个课程保留自己的视觉风格（深色渐变主视觉 / Python 蓝），
  只复用正文与目录模块。
- 阅读界面：左侧目录（章节 1 → 小节 1.1），右侧正文（小标题 1.1.1），
  底部上下节导航与完成标记。

深度学习课程的小节直接由共享阅读器渲染，不再依赖逐节手写的静态 HTML。


## 运行

在仓库根目录启动静态服务器：

```bash
python -m http.server 8000
```

Windows PowerShell：

```powershell
py -m http.server 8000
```

然后打开 <http://localhost:8000/>。

不要直接双击 `index.html` 用 `file://` 打开，页面使用 JavaScript 模块，必须通过 HTTP 访问。

### 关于在线运行与 AI 助手

`js/python_quick_start/python_quick_start.js` 会请求两个接口：

- `POST /api/python/run` —— 运行 Python 代码
- `POST /api/ai/chat` —— AI 学习助手

这两个接口不在本仓库中。只用 `python -m http.server` 启动时，页面本身可以正常浏览，
但「运行代码」和「学习助手」会提示无法连接服务器。部署时需要由后端提供这两个接口。


## 自检脚本

修改内容或样式后，可以运行以下脚本检查（需要 Node.js 18+）：

```bash
node scripts/verify_course.mjs    # 课程数据：代码块是否有正文、渲染是否正常、编号是否正确
node scripts/verify_reader.mjs    # 阅读器：目录 1/1.1、正文 1.1.1、进度、上下节、旧进度兼容
node scripts/verify_pages.mjs     # 页面接线：资源路径、DOM id、模块 import、废弃引用
node scripts/verify_runtime.mjs   # 运行时冒烟：用 DOM 桩真实执行两门课的页面引擎
node scripts/verify_diagrams.mjs  # 图解样式覆盖：内容里用到的每个类名是否都有 CSS
```

`verify_diagrams.mjs` 加 `--detail` 会列出每章缺哪些类名，
加 `--css=<文件>` 可以只检查某个样式表（分章编写时自检用）。

五个脚本全部通过后再提交，可以避免出现「链接指向不存在的页面」
「代码块渲染为空」「图解没有样式」「DOM 元素改名导致脚本失效」这类问题。
