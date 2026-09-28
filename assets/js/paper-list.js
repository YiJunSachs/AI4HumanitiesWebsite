(async function renderPaperList() {
  const lists = document.querySelectorAll("[data-paper-list]");
  const template = document.querySelector("#paper-card-template");

  if (!lists.length || !template) {
    return;
  }

  let papers = [];

  const isEnglish = () => document.documentElement.lang === "en";

  const createEmptyState = (list) => {
    const empty = document.createElement("article");
    empty.className = "paper-empty";

    const title = document.createElement("h3");
    title.textContent = isEnglish() ? "Publications forthcoming" : (list.dataset.emptyTitle || "暂无论文");

    const description = document.createElement("p");
    description.textContent = isEnglish() ? "This research area is established; publications and examples will be added as the work develops." : (list.dataset.emptyDescription || "该方向的论文入口已预留。");

    empty.append(title, description);
    return empty;
  };

  const createPaperCard = (paper) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const image = card.querySelector("[data-paper-thumbnail]");
    const title = card.querySelector("[data-paper-title]");
    const description = card.querySelector("[data-paper-description]");
    const tags = card.querySelector("[data-paper-tags]");

    card.href = paper.href;
    card.dataset.paperArea = paper.area || "";

    if (image) {
      image.src = paper.thumbnail;
      image.alt = paper.thumbnailAlt || paper.title;
    }

    title.textContent = isEnglish() ? (paper.titleEn || paper.title) : paper.title;
    description.textContent = isEnglish() ? (paper.descriptionEn || paper.description) : paper.description;

    tags.textContent = "";
    const paperTags = isEnglish() ? (paper.tagsEn || paper.tags) : paper.tags;
    for (const tag of paperTags || []) {
      const tagElement = document.createElement("span");
      tagElement.className = "tag";
      tagElement.textContent = tag;
      tags.appendChild(tagElement);
    }

    return card;
  };

  const renderLists = () => {
    lists.forEach((list) => {
      const area = list.dataset.paperArea;
      const filteredPapers = area ? papers.filter((paper) => paper.area === area) : papers;
      list.textContent = "";

      if (!filteredPapers.length) {
        list.appendChild(createEmptyState(list));
        return;
      }

      for (const paper of filteredPapers) {
        list.appendChild(createPaperCard(paper));
      }
    });
  };

  window.addEventListener("site:languagechange", () => {
    if (papers.length) renderLists();
  });

  try {
    const response = await fetch("data/papers.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`papers.json 加载失败：${response.status}`);
    }

    papers = await response.json();
    renderLists();
  } catch (error) {
    lists.forEach((list) => {
      list.innerHTML = isEnglish()
        ? '<p class="load-error">Unable to load publications. Please open the site through a local server.</p>'
        : '<p class="load-error">论文列表加载失败。请通过本地服务器打开该网站。</p>';
    });
    console.error(error);
  }
})();
