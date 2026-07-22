(() => {
  const cards = document.querySelectorAll(".carrier-card");

  cards.forEach((card) => {
    const preview = card.querySelector(".carrier-preview");
    const showPreview = () => {
      card.classList.add("is-previewing");
      preview?.style.setProperty("opacity", "1");
      preview?.style.setProperty("transform", "translateY(0)");
    };
    const hidePreview = () => {
      card.classList.remove("is-previewing");
      preview?.style.removeProperty("opacity");
      preview?.style.removeProperty("transform");
    };

    card.addEventListener("pointerenter", showPreview);
    card.addEventListener("pointerleave", hidePreview);
    card.addEventListener("click", showPreview);
    card.addEventListener("focusin", showPreview);
    card.addEventListener("focusout", hidePreview);
    card.addEventListener("touchstart", showPreview, { passive: true });
  });
})();
