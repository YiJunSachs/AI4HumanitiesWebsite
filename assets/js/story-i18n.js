(() => {
  "use strict";
  const records = Array.from(document.querySelectorAll("[data-story-en]"), element => ({
    element,
    zh: element.textContent,
    en: element.dataset.storyEn
  }));
  const chineseTitle = document.title;
  function translate(language) {
    const english = language === "en";
    records.forEach(({element, zh, en}) => {
      element.textContent = english ? en : zh;
    });
    if (document.body.classList.contains("research-story")) {
      document.title = english
        ? `${document.querySelector("h1").textContent} | Zhishan`
        : chineseTitle;
      document.querySelector(".story-contents").setAttribute("aria-label", english ? "Topic contents" : "专题目录");
    }
  }
  window.addEventListener("site:languagechange", event => translate(event.detail.language));
})();
