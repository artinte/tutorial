# Tutorial Studio 教程中心

## 在线访问

- [教程中心](https://artinte.github.io/tutorial/)
- [Python 快速入门](https://makevideowithhtml.top/tutorial/html/python_quick_start/index.html)
- [深度学习基础](https://makevideowithhtml.top/tutorial/html/deep_learning_fundamentals/index.html)
- [在线编辑器](https://makevideowithhtml.top)

## 运行

在仓库根目录打开终端，启动 Python 自带的静态服务器：

```bash
python -m http.server 8000
```

然后在浏览器打开 <http://localhost:8000/>。教程入口是仓库根目录的 `index.html`，课程页面仍放在 `html/` 目录。

Windows PowerShell 也可以运行：

```powershell
py -m http.server 8000
```

不要直接双击 `index.html` 用 `file://` 打开；页面使用 JavaScript 模块，需要通过本地 HTTP 服务器访问。
