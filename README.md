# 智缮 · Zhishan

静态研究网站，无构建依赖。首页与四个研究专题提供中英文内容。

## 页面与预览

首页为 `index.html`；研究专题为 `research1-*.html` 至 `research4-*.html`，论文原文链接集中在专题文末。

```sh
python3 -m http.server 5501 --bind 127.0.0.1
```

## 发布

在 `main-v2` 分支提交修改，合并到 `main` 后由 GitHub Pages 发布仓库根目录。当前仓库为 `YiJunSachs/AI4HumanitiesWebsite`，网站为 https://yijunsachs.github.io/AI4HumanitiesWebsite/ 。

本地备份、编辑器配置与 VSIX 安装包不参与发布。
