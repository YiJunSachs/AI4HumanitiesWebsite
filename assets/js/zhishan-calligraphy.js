(() => {
  "use strict";
  const root = document.querySelector("[data-calligraphy]");
  if (!root) return;
  const fontRoot = new URL("../fonts/calligraphy/", document.currentScript.src);
  const styles = [
    {id:"mashanzheng",family:"ZhishanMa",author:"马善政",en:"Ma Shanzheng",name:"楷书",styleEn:"Regular script",source:"https://github.com/googlefonts/mashanzheng"},
    {id:"zhimangxing",family:"ZhishanWei",author:"魏志莽",en:"Wei Zhimang",name:"行书",styleEn:"Running script",source:"https://github.com/google/fonts/tree/main/ofl/zhimangxing"},
    {id:"liujianmaocao",family:"ZhishanLiu",author:"刘正江",en:"Liu Zhengjiang",name:"草书",styleEn:"Cursive script",source:"https://github.com/googlefonts/liujianmaocao"}
  ];
  const dialog = document.querySelector("#calligraphy-dialog");
  const select = dialog.querySelector("select");
  const mainCanvas = root.querySelector("canvas");
  const preview = dialog.querySelector("canvas");
  const status = dialog.querySelector("[data-calligraphy-status]");
  const applyButton = dialog.querySelector("[data-calligraphy-apply]");
  const downloadButton = dialog.querySelector("[data-calligraphy-download]");
  const fonts = new Map();
  const storageKey = "zhishan-calligraphy-style";
  let applied = styles[0], previewStyle = null, request = 0;
  const english = () => document.documentElement.dataset.language === "en";
  const label = style => english() ? `${style.en} · ${style.styleEn}` : `${style.author} · ${style.name}`;
  function load(style) {
    if (!fonts.has(style.id)) {
      const face = new FontFace(style.family, `url("${new URL(style.id+"-zhishan.woff2",fontRoot)}")`);
      const promise = face.load().then(loaded => { document.fonts.add(loaded); return loaded; });
      fonts.set(style.id,promise);
      promise.catch(() => fonts.delete(style.id));
    }
    return fonts.get(style.id);
  }
  function draw(canvas, style, credit = false) {
    canvas.width = 420; canvas.height = credit ? 850 : 760;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#151913";
    ctx.font = `310px "${style.family}"`;
    for (const [index,glyph] of Array.from("智缮").entries()) {
      const metrics = ctx.measureText(glyph);
      const left = metrics.actualBoundingBoxLeft || 0;
      const right = metrics.actualBoundingBoxRight || metrics.width;
      const ascent = metrics.actualBoundingBoxAscent || 260;
      const descent = metrics.actualBoundingBoxDescent || 30;
      ctx.fillText(glyph, (420-right+left)/2, 190+index*360+(ascent-descent)/2);
    }
    if (credit) {
      ctx.font = '24px "Songti SC",SimSun,serif';
      ctx.textAlign = "right";
      ctx.fillStyle = "#8c4433";
      ctx.fillText(label(style),400,820);
    }
  }
  function describe() {
    root.querySelector("[data-calligraphy-credit]").textContent = english() ? label(applied) : `${applied.author}·${applied.name}`;
    root.querySelector("button").setAttribute("aria-label",english() ? "Change the calligrapher of 智缮" : "切换智缮的书法家与书体");
    dialog.querySelector("[data-calligraphy-author]").textContent = previewStyle ? label(previewStyle) : "";
    const link = dialog.querySelector("[data-calligraphy-source]");
    link.href = (previewStyle || applied).source;
    for (const option of select.options) option.textContent = label(styles.find(style => style.id === option.value));
    dialog.querySelector(".calligraphy-close").setAttribute("aria-label",english() ? "Close" : "关闭");
    dialog.querySelector("h2").textContent = english() ? "Zhishan Calligraphy Studio" : "智缮书法工坊";
    dialog.querySelector("[data-calligraphy-intro]").textContent = english() ? "Choose a calligrapher to generate your own 智缮 lettering." : "选择书法家，为智缮生成不同的题字。";
    dialog.querySelector("label").firstChild.textContent = english() ? "Calligrapher and script" : "书法家与书体";
    applyButton.textContent = english() ? "Generate & apply" : "生成并应用";
    downloadButton.textContent = english() ? "Download PNG" : "下载透明 PNG";
    root.querySelector(".signature-hint").textContent = english() ? "Change script ↗" : "切换书体 ↗";
    dialog.querySelector("[data-calligraphy-note]").textContent = english() ? "Rendered locally with licensed fonts; not an original handwritten work or an AI model inference." : "由授权字体在浏览器本地生成，非书法家亲笔原作或在线模型推理。";
    link.textContent = english() ? "Font source & license" : "字体来源与授权";
  }
  async function updatePreview() {
    const token = ++request;
    const style = styles.find(item => item.id === select.value) || styles[0];
    previewStyle = null;
    applyButton.disabled = downloadButton.disabled = true;
    status.textContent = english() ? "Loading calligraphy…" : "正在加载书体…";
    try {
      await load(style);
      if (token !== request) return;
      previewStyle = style; draw(preview,style); describe();
      status.textContent = english() ? "Ready to apply or download." : "已生成，可应用到头图或下载。";
      applyButton.disabled = downloadButton.disabled = false;
    } catch (_) {
      if (token === request) status.textContent = english() ? "Font failed to load. Please try again." : "书体加载失败，请重新选择后重试。";
    }
  }
  const sizeDialog = () => {
    const zoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
    dialog.style.zoom = String(1 / zoom);
  };
  window.addEventListener("resize", () => { if (dialog.open) sizeDialog(); });
  let cycling = false;
  async function cycleStyle() {
    if (cycling) return;
    cycling = true;
    const credit = root.querySelector("[data-calligraphy-credit]");
    const next = styles[(styles.indexOf(applied) + 1) % styles.length];
    root.setAttribute("aria-busy", "true");
    try {
      await load(next);
      applied = next;
      draw(mainCanvas, applied);
      root.classList.add("is-ready");
      describe();
      try { localStorage.setItem(storageKey, applied.id); } catch (_) {}
    } catch (_) {
      credit.title = english() ? "Font failed to load. Click to retry." : "字体加载失败，请点击重试";
    } finally {
      cycling = false;
      root.removeAttribute("aria-busy");
    }
  }
  root.querySelector("button").removeAttribute("aria-haspopup");
  root.querySelector("button").removeAttribute("aria-controls");
  root.querySelector("button").addEventListener("click", cycleStyle);
  root.querySelector("[data-calligraphy-credit]").addEventListener("click", cycleStyle);
  select.addEventListener("change",updatePreview);
  dialog.querySelector(".calligraphy-close").addEventListener("click",() => dialog.close());
  applyButton.addEventListener("click",() => {
    if (!previewStyle) return;
    applied = previewStyle; draw(mainCanvas,applied); describe();
    try { localStorage.setItem(storageKey,applied.id); } catch (_) { /* Private mode still supports generation. */ }
    dialog.close(); root.querySelector("button").focus();
  });
  downloadButton.addEventListener("click",() => {
    if (!previewStyle) return;
    const canvas = document.createElement("canvas"); draw(canvas,previewStyle,true);
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob), anchor = document.createElement("a");
      anchor.href = url; anchor.download = `智缮-${previewStyle.author}-${previewStyle.name}.png`;
      anchor.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
    },"image/png");
  });
  window.addEventListener("site:languagechange",() => { describe(); if (dialog.open) updatePreview(); });
  try { applied = styles.find(style => style.id === localStorage.getItem(storageKey)) || styles[0]; } catch (_) { /* Use the default when storage is unavailable. */ }
  describe();
  load(applied).then(() => { draw(mainCanvas,applied); root.classList.add("is-ready"); }).catch(() => { /* Retain the original baked-in title on font/network failure. */ });
})();
