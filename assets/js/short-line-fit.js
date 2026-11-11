/* Fit a short second-line remainder without changing the wording or long paragraphs. */
(() => {
  'use strict';
  const selector = 'h1,h2,h3,h4,p,li,a,figcaption,button,.unified-unit-name';
  const fitted = new Map();
  let timer;
  function lines(element) {
    const rows = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.textContent.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) {
        if (!rect.width || !rect.height) continue;
        const row = rows.find(r => Math.min(r.bottom, rect.bottom) - Math.max(r.top, rect.top) > Math.min(r.height, rect.height) / 2);
        if (row) {
          row.left = Math.min(row.left, rect.left);
          row.right = Math.max(row.right, rect.right);
        } else rows.push({top: rect.top, bottom: rect.bottom, height: rect.height, left: rect.left, right: rect.right});
      }
    }
    return rows.sort((a, b) => a.top - b.top);
  }
  function restore(element, previous) {
    for (const [property, value, priority] of previous) {
      if (value) element.style.setProperty(property, value, priority);
      else element.style.removeProperty(property);
    }
  }
  function fit() {
    fitted.forEach((previous, element) => restore(element, previous));
    fitted.clear();
    const mobile = matchMedia('(max-width: 900px)').matches;
    document.querySelectorAll(selector).forEach(element => {
      if (!element.getClientRects().length || element.querySelector('br,h1,h2,h3,h4,p,li,a,figcaption,button')) return;
      if (element.matches('a') && element.closest('p,li')) return;
      const style = getComputedStyle(element);
      if (style.whiteSpace === 'nowrap') return;
      const rows = lines(element);
      if (rows.length !== 2) return;
      const firstWidth = rows[0].right - rows[0].left;
      const tailWidth = rows[1].right - rows[1].left;
      if (tailWidth > firstWidth * (mobile ? .4 : .35)) return;
      const size = parseFloat(style.fontSize);
      const heading = element.matches('h1,h2,h3,h4');
      const floor = mobile ? (heading ? 18 : Math.min(size, 14)) : 12;
      const previous = ['font-size', 'white-space'].map(property => [property, element.style.getPropertyValue(property), element.style.getPropertyPriority(property)]);
      const available = element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const scale = element.getBoundingClientRect().width / element.offsetWidth;
      if (!available || !scale) return;
      element.style.setProperty('white-space', 'nowrap', 'important');
      const single = lines(element);
      const contentLeft = element.getBoundingClientRect().left + parseFloat(style.paddingLeft) * scale;
      const fullWidth = single.length === 1 ? (single[0].right - Math.min(single[0].left, contentLeft)) / scale : Infinity;
      const target = Math.floor(Math.min(size, size * available / fullWidth * .99) * 10) / 10;
      if (target < Math.max(floor, size * (mobile && heading ? .7 : .74))) { restore(element, previous); return; }
      element.style.setProperty('font-size', `${target}px`, 'important');
      const checked = lines(element);
      if (checked.length !== 1 || checked[0].right > contentLeft + available * scale + 1 || element.scrollWidth > element.clientWidth + 1) {
        restore(element, previous);
        return;
      }
      fitted.set(element, previous);
    });
  }
  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(() => requestAnimationFrame(fit), 100);
  }
  window.addEventListener('resize', schedule);
  window.addEventListener('site:languagechange', schedule);
  window.addEventListener('load', schedule);
  // Fit parsed text immediately; large images must not delay text layout.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fit, { once: true });
  } else fit();
  document.fonts.ready.then(schedule);
  document.fonts.addEventListener('loadingdone', schedule);
})();
