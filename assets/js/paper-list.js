(async function renderPaperList() {
  const lists = document.querySelectorAll("[data-paper-list]");
  const template = document.querySelector("#paper-card-template");

  if (!lists.length || !template) {
    return;
  }

  const createEmptyState = (list) => {
    const empty = document.createElement("article");
    empty.className = "paper-empty";

    const title = document.createElement("h3");
    title.textContent = list.dataset.emptyTitle || "暂无论文";

    const description = document.createElement("p");
    description.textContent = list.dataset.emptyDescription || "该方向的论文入口已预留。";

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

    title.textContent = paper.title;
    description.textContent = paper.description;

    tags.textContent = "";
    for (const tag of paper.tags || []) {
      const tagElement = document.createElement("span");
      tagElement.className = "tag";
      tagElement.textContent = tag;
      tags.appendChild(tagElement);
    }

    return card;
  };

  try {
    const response = await fetch("data/papers.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`papers.json 加载失败：${response.status}`);
    }

    const papers = await response.json();

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
  } catch (error) {
    lists.forEach((list) => {
      list.innerHTML = '<p class="load-error">论文列表加载失败。请通过本地服务器打开该网站。</p>';
    });
    console.error(error);
  }
})();
