# 智缮题字字体

本功能在浏览器本地以字体排版生成“智缮”，不是在线模型推理或书法家亲笔原作。

- Ma Shan Zheng：Ma ShanZheng（马善政），https://github.com/googlefonts/mashanzheng
- Zhi Mang Xing：Wei Zhimang（魏志莽），https://github.com/google/fonts/tree/main/ofl/zhimangxing
- Liu Jian Mao Cao：基于 Liu Zhengjiang（刘正江）书法，https://github.com/googlefonts/liujianmaocao

字体来源：Google Fonts 官方仓库 `ofl/<family>/`。每个字体均为 SIL Open Font License 1.1，完整授权文件及作者元数据与 WOFF2 一并保留。

WOFF2 仅保留 U+667A 智、U+7F2E 缮，使用 fontTools 子集化以减少加载大小；仅内部使用命名，不以原字体名销售修改后的字体。

生成：`fontTools.subset`，`populate(text="智缮")`，输出 `font.flavor="woff2"`。

入口：点击主页左上“智缮”或“切换书体”，选择、应用并下载 PNG。选择通过 localStorage 的 `zhishan-calligraphy-style` 保存；禁用存储时仍可使用。字体加载失败时保留原头图标题。
