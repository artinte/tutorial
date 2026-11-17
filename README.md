# Tutorial Studio 教程中心

## 本地预览

从仓库根目录启动静态服务器，然后打开 `/html/index.html`：

```bash
python -m http.server 8000
```

入口页通过相对路径加载 `css/`、`js/` 和 `html/` 中的课程页面；不要直接用 `file://` 打开，因为页面使用了 JavaScript 模块。
