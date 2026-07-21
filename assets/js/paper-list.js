(async function renderPaperList() {
  const list = document.querySelector("[data-paper-list]");
  const template = document.querySelector("#paper-card-template");

  if (!list || !template) {
    return;
  }

  try {
    const response = await fetch("data/papers.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to load papers.json: ${response.status}`);
    }

    const papers = await response.json();
    list.textContent = "";

    for (const paper of papers) {
      const card = template.content.firstElementChild.cloneNode(true);
      const image = card.querySelector("[data-paper-thumbnail]");
      const title = card.querySelector("[data-paper-title]");
      const description = card.querySelector("[data-paper-description]");
      const tags = card.querySelector("[data-paper-tags]");

      card.href = paper.href;
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

      list.appendChild(card);
    }
  } catch (error) {
    list.innerHTML = '<p class="load-error">Paper list failed to load. Please open this site through a local server.</p>';
    console.error(error);
  }
})();
