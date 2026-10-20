# 文脉 · v2

静态数字人文研究网站，无构建依赖。

- 原网址：https://yijunsachs.github.io/AI4HumanitiesWebsite/
- v2 源码分支：`main-v2`
- GitHub Pages 发布源：`main` 分支仓库根目录

`main-v2` 的网站内容合入 `main` 后，GitHub Pages 自动构建并更新原网址。无需独立 v2 仓库。

## 页面

首页为 `index.html`。四个专题为 `research1-*.html` 至 `research4-*.html`，按研究脉络展开，论文原文链接集中在文末。首页展示顺序为残损古籍修复、多载体转录、历史音韵、字体风格迁移生成；文件名保持兼容。

专题样式位于 `assets/research-story.css`；`assets/js/story-i18n.js` 与 `i18n.js` 提供中英文切换。

## 本地预览

```sh
python3 -m http.server 5501 --bind 127.0.0.1
```

## 发布

在 `main-v2` 完成修改和检查后提交并推送，再将该分支合入 `main`。等待 GitHub Pages 构建成功后验证原网址。部署可能有短暂缓存。

本地备份目录、编辑器配置和 VSIX 安装包不参与发布。
