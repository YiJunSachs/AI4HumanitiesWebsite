# AI4Humanities Website

这是一个可直接部署到 GitHub Pages 的静态数字人文研究网站模板。网站不需要后端，也不需要安装复杂依赖；复制仓库、替换内容、推送到自己的 GitHub 仓库后即可上线。

当前站点入口：

- 首页：`index.html`
- 研究详情页：`research-*.html`
- 论文项目页：`papers/*.html`
- 论文列表数据：`data/papers.json`
- 样式与交互：`assets/styles.css`、`assets/js/*.js`

## 最推荐的复用方式

如果你希望别人基于这个网站制作自己的版本，推荐把 GitHub 仓库设成 Template：

1. 打开 GitHub 仓库页面。
2. 进入 `Settings -> General`。
3. 勾选 `Template repository`。
4. 其他人点击仓库首页的 `Use this template`。
5. 他们会得到一个属于自己的新仓库，之后改内容并推送自己的代码即可。

这样别人不会误把内容推回你的仓库，也不需要拥有你仓库的写权限。

## 也可以下载后自己推送

别人也可以直接下载 ZIP 或 clone 这个仓库，然后推送到自己的仓库：

```bash
git clone https://github.com/YiJunSachs/AI4HumanitiesWebsite.git
cd AI4HumanitiesWebsite
git remote set-url origin https://github.com/自己的用户名/自己的仓库名.git
git push -u origin main
```

注意：如果没有你仓库的协作者权限，别人不能直接 push 到 `YiJunSachs/AI4HumanitiesWebsite`。他们应该 push 到自己的仓库。

## 本地预览

因为页面会读取 `data/papers.json`，不要直接双击打开 `index.html`。请在项目根目录启动一个本地服务器：

```bash
python -m http.server 5500
```

然后打开：

```text
http://127.0.0.1:5500/
```

## 修改自己的站点

常见修改位置：

- 网站标题、导航栏、首页四个研究方向：改 `index.html`
- 研究方向详情内容：改 `research-rubbing-restoration.html` 等详情页
- 首页和详情页里的论文列表：改 `data/papers.json`
- 单篇论文展示页：改或复制 `papers/*.html`
- 图片、logo、展示实例：放到 `assets/` 下面并更新对应 HTML 路径
- 全站视觉风格：改 `assets/styles.css`

更具体的替换清单见 [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)。

## 新增一篇论文

1. 在 `papers/` 下复制一个现有论文页面，例如：

```text
papers/mchdoc.html -> papers/new-paper.html
```

2. 把论文图片放入 `assets/rendered/` 或新的子文件夹中。

3. 在 `data/papers.json` 中新增一条记录：

```json
{
  "title": "论文标题",
  "href": "papers/new-paper.html",
  "area": "multi-carrier-reading",
  "thumbnail": "assets/rendered/new-paper-thumbnail.png",
  "thumbnailAlt": "论文缩略图说明",
  "tags": ["会议或期刊", "研究方向"],
  "description": "首页或详情页中展示的一句话简介。"
}
```

`area` 用来决定论文属于哪个研究方向：

- `rubbing-restoration`：残损古籍修复研究
- `multi-carrier-reading`：多载体古籍阅读研究
- `ancient-character-restoration`：字体风格迁移生成研究
- `historical-phonology`：中国古代音韵研究

## 部署到 GitHub Pages

1. 把网站代码推送到 GitHub 仓库。
2. 打开仓库的 `Settings -> Pages`。
3. Source 选择 `Deploy from a branch`。
4. Branch 选择 `main`，目录选择 `/root`。
5. 保存后等待 GitHub 构建完成。

生成的网址通常是：

```text
https://用户名.github.io/仓库名/
```

如果仓库名是 `用户名.github.io`，网址通常是：

```text
https://用户名.github.io/
```

## 常见问题

- 首页一直转圈：请确认是通过 `http://127.0.0.1:5500/` 这类本地服务器打开，而不是直接双击 HTML。
- 线上图片不显示：检查文件名大小写、空格、中文路径和 HTML 中的路径是否完全一致。
- 论文列表加载失败：检查 `data/papers.json` 是否是合法 JSON。
- 旧内容还没更新：GitHub Pages 有缓存，通常等几十秒到几分钟后刷新即可。
