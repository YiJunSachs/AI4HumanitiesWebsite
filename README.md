# 文脉 · v2

静态网站，无构建依赖。

- 原仓库源码分支：`YiJunSachs/AI4HumanitiesWebsite` 的 `main-v2`
- 独立发布仓库：`YiJunSachs/AI4HumanitiesWebsite-v2` 的 `main`
- GitHub Pages：`main` 分支仓库根目录

## 页面

首页 `index.html`；四个研究专题为 `research1-*.html` 至 `research4-*.html`。专题按研究脉络展开，论文原文链接集中在文末。`assets/research-story.css` 控制专题样式；`assets/js/story-i18n.js` 与 `i18n.js` 提供中英文切换。

## 本地预览

```sh
python3 -m http.server 5501 --bind 127.0.0.1
```

## 发布

在 `main-v2` 提交并推送到原仓库后，将相同提交推送到独立发布仓库的 `main`。GitHub Pages 自动构建。不要将 v2 覆盖到原仓库的 `main`。

```sh
git push origin main-v2
git push v2 main-v2:main
```

本地备份、编辑器配置与 VSIX 安装包不参与发布。
