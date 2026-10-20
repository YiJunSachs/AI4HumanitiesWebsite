(() => {
  const cards = [...document.querySelectorAll("#multi-carrier-reading .carrier-sample")];
  if (!cards.length) return;
  const dialog = document.createElement("dialog");
  dialog.className = "carrier-lightbox";
  dialog.setAttribute("aria-label", "载体样例放大预览");
  dialog.innerHTML = '<div class="carrier-lightbox-header"><span></span><button type="button" class="carrier-lightbox-close" aria-label="关闭放大预览">×</button></div><div class="carrier-lightbox-images"></div>';
  document.body.append(dialog);
  let active = 0;
  const updateLabels = () => {
    const en = document.documentElement.lang === "en";
    dialog.setAttribute("aria-label", en ? "Enlarged historical media examples" : "载体样例放大预览");
    dialog.querySelector("button").setAttribute("aria-label", en ? "Close enlarged preview" : "关闭放大预览");
    cards.forEach(card => card.setAttribute("aria-label", (en ? "Enlarge " : "放大查看") + card.querySelector("figcaption").textContent));
    if (dialog.open) dialog.querySelector(".carrier-lightbox-header span").textContent = cards[active].querySelector("figcaption").textContent;
  };
  window.addEventListener("site:languagechange", updateLabels);
  const show = index => {
    active = (index + cards.length) % cards.length;
    const card = cards[active];
    dialog.querySelector(".carrier-lightbox-header span").textContent = card.querySelector("figcaption").textContent;
    const images = [...card.querySelectorAll("img")].map(source => { const img = new Image(); img.src = source.currentSrc || source.src; img.alt = source.alt; return img; });
    dialog.querySelector(".carrier-lightbox-images").replaceChildren(...images);
    updateLabels();
    if (!dialog.open) dialog.showModal();
  };
  cards.forEach((card,index) => {
    card.tabIndex = 0; card.setAttribute("role", "button");
    card.setAttribute("aria-label", "放大查看" + card.querySelector("figcaption").textContent + "样例");
    card.addEventListener("click", () => show(index));
    card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); show(index); } });
  });
  updateLabels();
  dialog.querySelector("button").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener("keydown", event => { if (event.key === "ArrowRight") show(active + 1); if (event.key === "ArrowLeft") show(active - 1); });
})();
