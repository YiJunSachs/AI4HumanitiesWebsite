(() => {
  "use strict";
  const header = document.querySelector(".team-intro");
  if (!header) return;
  const initialRatio = window.devicePixelRatio || 1;
  const initialWidth = document.documentElement.clientWidth;
  let previousRatio = initialRatio;
  let previousOuterWidth = window.outerWidth;
  let width = initialWidth;
  const apply = () => header.style.setProperty("--masthead-width", `${width}px`);
  apply();
  window.addEventListener("resize", () => {
    const ratio = window.devicePixelRatio || 1;
    const outerWidth = window.outerWidth;
    // Desktop zoom changes devicePixelRatio while keeping the window size.
    // Keep the artwork's CSS width so browser zoom can scale it visibly.
    if (Math.abs(outerWidth - previousOuterWidth) > 2) {
      width = document.documentElement.clientWidth * ratio / initialRatio;
      apply();
    } else if (ratio === previousRatio) {
      // Mobile pinch zoom leaves the layout width unchanged.
      // A real mobile resize or orientation change updates it.
      if (!window.visualViewport || window.visualViewport.scale === 1) {
        const next = document.documentElement.clientWidth * ratio / initialRatio;
        if (Math.abs(next - width) > 2) { width = next; apply(); }
      }
    }
    previousRatio = ratio;
    previousOuterWidth = outerWidth;
  });
})();
