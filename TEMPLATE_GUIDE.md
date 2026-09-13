# 网站模板替换指南

这份指南给基于本仓库制作新网站的人使用。最简单的路线是：先保留现有结构，只替换文字、图片和论文数据；等网站稳定后再改样式和交互。

## 快速替换清单

| 想修改的内容 | 修改位置 |
| --- | --- |
| 浏览器标题 | `index.html` 的 `<title>` |
| 顶部 logo 和单位名称 | `index.html` 以及各个 `research-*.html`、`papers/*.html` 的导航栏 |
| 首页主标题和简介 | `index.html` 的 hero 区域 |
| 首页四个研究栏目 | `index.html` 中四个 `research-section` |
| “更多信息”跳转 | `index.html` 中每个 `.more-link` |
| 研究详情页背景、挑战、论文 | 对应的 `research-*.html` |
| 论文列表 | `data/papers.json` |
| 单篇论文页面 | `papers/` 文件夹 |
| 图片与展示实例 | `assets/rendered/`、`assets/figures/` |
| 页面颜色、间距、字体 | `assets/styles.css` |
| 修复前后滑动效果 | `assets/js/restoration-demo.js` |

## 建议的制作步骤

1. 先改 `index.html`，把首页单位、研究方向和简介换成自己的。
2. 再改对应的 `research-*.html`，让“更多信息”页面只展示对应方向。
3. 把论文信息写进 `data/papers.json`。
4. 复制 `papers/` 下最接近的一篇页面，改成自己的论文项目页。
5. 把图片放进 `assets/rendered/`，再更新 HTML 或 JSON 里的图片路径。
6. 本地预览确认没问题后，推送到 GitHub Pages。

## 路径规则

首页和研究详情页在项目根目录，引用资源时通常这样写：

```html
<img src="assets/rendered/example.png" alt="展示图">
```

论文页在 `papers/` 文件夹里，引用同一张资源时需要回到上一级：

```html
<img src="../assets/rendered/example.png" alt="展示图">
```

如果线上图片不显示，优先检查：

- 文件是否真的被提交到了 GitHub。
- 文件名大小写是否完全一致。
- 路径中是否有空格或中文，HTML 里是否写对。
- 论文页是否漏写了开头的 `../`。

## 研究方向页面

当前模板预留了四类研究方向：

- 残损古籍修复研究：`research-rubbing-restoration.html`
- 多载体古籍研究：`research-multi-carrier-reading.html`
- 字体风格迁移生成研究：`research-ancient-character-restoration.html`
- 中国古代音韵研究：`research-historical-phonology.html`

如果你的站点只有两个方向，可以删除首页多余 section，也可以先保留为“建设中”。如果你需要更多方向，可以复制一个已有 section 和一个已有详情页，再修改链接。

## 发布给别人使用

如果要让别人制作自己的网站，推荐这样做：

1. 仓库所有者在 GitHub `Settings -> General` 勾选 `Template repository`。
2. 使用者点击 `Use this template` 创建自己的仓库。
3. 使用者替换文字、图片和论文数据。
4. 使用者在自己的仓库中开启 GitHub Pages。

这样每个人都有自己的独立网站，不会影响原仓库。
