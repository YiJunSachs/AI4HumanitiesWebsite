const artifacts = [
  { title: "甲骨刻辞", type: "甲骨刻辞 · ORACLE BONE", description: "甲骨刻辞是商代占卜活动的重要记录。刻辞内容涉及祭祀、征伐、田猎、天气与王室生活，是认识早期汉字形态和商代社会的重要材料。", category: "oracle", artClass: "image-oracle" },
  { title: "青铜器铭文", type: "铭刻文字 · INSCRIPTION", description: "青铜器铭文常与礼仪、纪事、赏赐和族属相关。通过观察文字形态与器物背景，可以进一步理解先秦时期的历史文化。", category: "inscription", artClass: "image-bronze" },
  { title: "古籍与文字资料", type: "古籍文献 · DOCUMENT", description: "历代文献保存了文字传承与知识积累的丰富线索。数字化展示有助于细节观察、资料整理和跨地域的学术交流。", category: "document", artClass: "image-document" },
  { title: "古文字形与演变", type: "字形研究 · SCRIPT STUDY", description: "比较不同材料中的字形，可以观察文字构形、书写习惯与意义表达的变化。这里的图形仅用于界面演示，并非真实拓片。", category: "oracle", artClass: "image-rubbing" }
];
const grid = document.querySelector("#artifactGrid");
const searchInput = document.querySelector("#searchInput");
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const emptyState = document.querySelector("#emptyState");
const modal = document.querySelector("#artifactModal");
const modalArt = document.querySelector("#modalArt");
let activeFilter = "all";

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let shown = 0;
  document.querySelectorAll(".artifact-card").forEach(card => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesText = (card.dataset.search + " " + card.innerText).toLowerCase().includes(query);
    const visible = matchesCategory && matchesText;
    card.hidden = !visible;
    if (visible) shown++;
  });
  emptyState.hidden = shown !== 0;
}
filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  applyFilters();
}));
searchInput.addEventListener("input", applyFilters);

function openModal(index) {
  const item = artifacts[index];
  if (!item) return;
  document.querySelector("#modalTitle").textContent = item.title;
  document.querySelector("#modalType").textContent = item.type;
  document.querySelector("#modalDescription").textContent = item.description;
  modalArt.innerHTML = "";
  const art = document.createElement("div");
  art.className = `artifact-image ${item.artClass}`;
  art.setAttribute("aria-hidden", "true");
  if (index === 0) art.innerHTML = '<span class="image-label">ORACLE BONE</span><span class="bone-shape"><i>𠂉</i><b>⺀</b><i>口</i><b>丨</b><i>卜</i><b>𠃌</b><i>十</i></span>';
  if (index === 1) art.innerHTML = '<span class="image-label">BRONZE INSCRIPTION</span><div class="bronze-vessel"><span>吉金文字</span><b>吉<br>金<br>文<br>字</b></div>';
  if (index === 2) art.innerHTML = '<span class="image-label">ANCIENT DOCUMENT</span><div class="scroll-art"><div>古</div><div>籍</div><div>文</div><div>献</div></div>';
  if (index === 3) art.innerHTML = '<span class="image-label">SCRIPT STUDY</span><div class="rubbing-paper"><span>日</span><span>月</span><span>山</span><span>水</span></div>';
  modalArt.appendChild(art);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector(".modal-close").focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-open]").forEach(button => button.addEventListener("click", () => openModal(Number(button.dataset.open))));
document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", closeModal));
document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("open")) closeModal(); });

const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("show")));

document.querySelector("#langToggle").addEventListener("click", () => {
  const button = document.querySelector("#langToggle");
  button.textContent = button.textContent.includes("中文") ? "English · demo" : "中文 ⌄";
  if (button.textContent.includes("English")) {
    alert("This sample only provides the Chinese interface. You can add English translations in index.html and app.js.");
  }
});
