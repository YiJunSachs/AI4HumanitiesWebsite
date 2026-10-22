(() => {
  "use strict";
  const root = document.documentElement;
  const canvasWidth = 2351;
  const maximumScale = 0.8;
  const fitCanvas = () => {
    const width = root.clientWidth || window.innerWidth;
    root.style.setProperty("--home-canvas-scale", String(Math.min(maximumScale, width / canvasWidth)));
  };
  // Set the scale before first paint, then account for the page's scrollbar.
  fitCanvas();
  document.addEventListener("DOMContentLoaded", fitCanvas, { once: true });
  window.addEventListener("resize", fitCanvas, { passive: true });
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(fitCanvas).observe(root);
  }
})();
