(() => {
  "use strict";
  // Adjust only styles so the existing bilingual text-node records stay valid.
  const fit = () => {
    const selector = ".section-head>p:not(.paper-corpus-detail), .epiagent-hero .hero-copy, .tool-execution-caption, .epiagent-overview aside li, .path-summary-line, .path-legend-nowrap" + (document.documentElement.dataset.language !== "en" ? ", .paper-theme-carriers .title-line, .epiagent-hero .title-line" : "");
    document.querySelectorAll(".paper-theme-carriers .title-line, .epiagent-hero .title-line").forEach(title => { title.style.fontSize = ""; title.classList.remove("paper-single-line"); });
    const items = document.querySelectorAll(selector);
    items.forEach(element => {
      element.style.fontSize = "";
      element.classList.remove("paper-single-line");
      if (window.innerWidth <= 1100) return;
      const style = getComputedStyle(element);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const width = context.measureText(element.textContent.trim().replace(/\s+/g, " ")).width;
      if (width > element.clientWidth) element.style.fontSize = `${parseFloat(style.fontSize) * element.clientWidth / width * .99}px`;
      element.classList.add("paper-single-line");
    });
  };
  const schedule = () => document.fonts.ready.then(() => requestAnimationFrame(fit));
  window.addEventListener("site:languagechange", schedule);
  window.addEventListener("resize", schedule);
  schedule();
})();
