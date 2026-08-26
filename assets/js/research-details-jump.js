(function () {
  const detailSectionIds = new Set([
    "detail-rubbing-restoration",
    "detail-multi-carrier-reading",
    "detail-ancient-character-restoration",
    "detail-historical-phonology",
  ]);

  const getHashTarget = () => {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    return detailSectionIds.has(id) ? document.getElementById(id) : null;
  };

  const jumpToTarget = () => {
    const target = getHashTarget();

    if (!target) {
      return;
    }

    document.documentElement.classList.add("is-anchor-jumping");
    target.scrollIntoView({ block: "start" });

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start" });
    });

    window.setTimeout(() => {
      target.scrollIntoView({ block: "start" });
      document.documentElement.classList.remove("is-anchor-jumping");
    }, 180);
  };

  window.addEventListener("hashchange", jumpToTarget);
  window.addEventListener("load", jumpToTarget);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.requestAnimationFrame(jumpToTarget);
    });
  } else {
    window.requestAnimationFrame(jumpToTarget);
  }
})();
