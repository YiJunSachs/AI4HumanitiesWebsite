(() => {
  'use strict';
  const assetBase = new URL('../rendered/qyspd/', document.currentScript.src);
  const NS = 'http://www.w3.org/2000/svg';
  const svgElement = (tag, attributes, text) => {
    const element = document.createElementNS(NS, tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const icon = paths => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`;
  const icons = {
    play: icon('<path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none"/>'),
    pause: icon('<path d="M8 5v14M16 5v14" stroke-width="4"/>'),
    reset: icon('<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>'),
    plus: icon('<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6M7 10h6M10 7v6"/>'),
    minus: icon('<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6M7 10h6"/>'),
  };

  function mount(host, data, index) {
    const prefix = `ph-${index}`;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const totalStages = data.stages;
    host.innerHTML = `
      <div class="ph-graph-tools">
        <button type="button" data-action="zoom-out" aria-label="缩小" title="缩小">${icons.minus}</button>
        <button type="button" data-action="zoom-in" aria-label="放大" title="放大">${icons.plus}</button>
      </div>
      <div class="ph-graph-scroll" tabindex="0" role="region" aria-label="反切图">
        <div class="ph-graph-canvas"><svg class="ph-graph" viewBox="0 0 ${data.width} ${data.height}" role="img"></svg></div>
      </div>
      <div class="ph-legend" aria-label="图例">
        <span><i class="ph-ring" aria-hidden="true"></i>单音字</span>
        <span><i class="ph-ring ph-double" aria-hidden="true"></i>多音字</span>
        <span><i class="ph-line" aria-hidden="true"></i>反切</span>
        <span><i class="ph-line ph-red" aria-hidden="true"></i>常读音</span>
        <span><i class="ph-line ph-dotted" aria-hidden="true"></i>非常读音</span>
        <span><i class="ph-diamond" aria-hidden="true"></i>又切</span>
      </div>
      <div class="ph-controls">
        <button type="button" data-action="play" aria-label="播放" title="播放">${icons.play}</button>
        <button type="button" data-action="reset" aria-label="重置" title="重置">${icons.reset}</button>
        <input type="range" min="0" max="${totalStages}" step="0.01" value="0" aria-label="播放进度">
      </div>`;
    const svg = host.querySelector('.ph-graph');
    svg.setAttribute('aria-label', host.closest('.ph-card').querySelector('h3').textContent);
    const defs = svgElement('defs', {});
    svg.append(defs);
    const renderedEdges = data.edges.map((edge, i) => {
      const mask = svgElement('mask', { id: `${prefix}-mask-${i}`, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: data.width, height: data.height });
      const reveal = svgElement('path', { d: edge.path, fill: 'none', stroke: 'white', 'stroke-width': 12, pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 });
      mask.append(reveal); defs.append(mask);
      const base = svgElement('path', { d: edge.path, class: 'ph-edge', pathLength: 1 });
      const final = svgElement('path', { d: edge.path, class: 'ph-edge ph-edge-final', mask: `url(#${prefix}-mask-${i})` });
      final.style.stroke = edge.state === 'primary' ? '#b4312c' : '#262626';
      if (edge.state === 'discarded') {
        final.setAttribute('stroke-dasharray', '1 6');
        final.setAttribute('stroke-linecap', 'round');
      }
      const arrow = svgElement('polygon', { points: edge.arrowPoints.map(p => p.join(',')).join(' '), fill: edge.arrowhead === 'odiamond' ? '#fffefa' : '#262626', stroke: '#262626', 'stroke-width': 1 });
      const label = svgElement('text', { x: edge.labelX, y: edge.labelY, class: 'ph-edge-label', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, edge.fanqie);
      const tracer = svgElement('circle', { r: 3, fill: edge.state === 'primary' ? '#b4312c' : '#262626', visibility: 'hidden' });
      svg.append(base, final, arrow, tracer, label);
      return { edge, base, label, reveal, arrow, tracer, length: base.getTotalLength() };
    });
    const nodeElements = data.nodes.map(node => {
      const group = svgElement('g', { class: 'ph-node', transform: `translate(${node.x}, ${node.y})` });
      group.append(svgElement('circle', { r: node.radius }));
      if (node.polyphonic) group.append(svgElement('circle', { r: node.radius - 4, class: 'ph-inner' }));
      group.append(svgElement('text', { x: 0, y: 0 }, node.id));
      svg.append(group);
      return { node, group };
    });
    const play = host.querySelector('[data-action="play"]');
    const slider = host.querySelector('input');
    let progress = 0, frame = 0, running = false, previousTime = null;
    let started = false, visible = false, resumeOnEntry = false;

    function isEnglish() {
      return document.documentElement.lang === 'en';
    }

    function updatePlay() {
      const label = isEnglish() ? (running ? 'Pause' : 'Play') : (running ? '暂停' : '播放');
      play.innerHTML = running ? icons.pause : icons.play;
      play.setAttribute('aria-label', label);
      play.title = label;
    }

    function updateLanguage() {
      const en = isEnglish();
      const labels = en
        ? ['Monophonic', 'Polyphonic', 'Fanqie', 'Primary reading', 'Non-primary reading', 'Alternative fanqie']
        : ['单音字', '多音字', '反切', '常读音', '非常读音', '又切'];
      host.querySelectorAll('.ph-legend span').forEach((item, itemIndex) => {
        item.lastChild.textContent = labels[itemIndex];
      });
      const zoomOutLabel = en ? 'Zoom out' : '缩小';
      const zoomInLabel = en ? 'Zoom in' : '放大';
      const resetLabel = en ? 'Reset' : '重置';
      const graphLabel = en ? 'Fanqie graph' : '反切图';
      const legendLabel = en ? 'Legend' : '图例';
      const progressLabel = en ? 'Playback progress' : '播放进度';
      const zoomOutButton = host.querySelector('[data-action="zoom-out"]');
      const zoomInButton = host.querySelector('[data-action="zoom-in"]');
      const resetButton = host.querySelector('[data-action="reset"]');
      [[zoomOutButton, zoomOutLabel], [zoomInButton, zoomInLabel], [resetButton, resetLabel]].forEach(([button, label]) => {
        button.setAttribute('aria-label', label);
        button.title = label;
      });
      host.querySelector('.ph-graph-scroll').setAttribute('aria-label', graphLabel);
      host.querySelector('.ph-legend').setAttribute('aria-label', legendLabel);
      slider.setAttribute('aria-label', progressLabel);
      updatePlay();
    }
    function render(value) {
      progress = Math.max(0, Math.min(totalStages, value));
      slider.value = progress;
      slider.setAttribute('aria-valuetext', `${Math.round(progress / totalStages * 100)}%`);
      for (const item of renderedEdges) {
        const fraction = Math.max(0, Math.min(1, progress - item.edge.stage + 1));
        item.base.style.visibility = fraction === 1 ? 'hidden' : 'visible';
        item.base.setAttribute('stroke-dasharray', '1 1');
        item.base.setAttribute('stroke-dashoffset', -fraction);
        item.reveal.setAttribute('stroke-dashoffset', 1 - fraction);
        const color = fraction === 1 && item.edge.state === 'primary' ? '#b4312c' : '#262626';
        item.arrow.setAttribute('stroke', color);
        item.arrow.setAttribute('fill', item.edge.arrowhead === 'odiamond' ? '#fffefa' : color);
        item.label.style.fill = color;
        item.tracer.setAttribute('visibility', fraction > 0 && fraction < 1 ? 'visible' : 'hidden');
        if (fraction > 0 && fraction < 1) {
          const point = item.base.getPointAtLength(fraction * item.length);
          item.tracer.setAttribute('cx', point.x); item.tracer.setAttribute('cy', point.y);
        }
      }
      nodeElements.forEach(({ node, group }) => group.classList.toggle('ph-primary', node.primaryStage !== null && progress >= node.primaryStage));
    }
    function stop() {
      running = false;
      cancelAnimationFrame(frame);
      previousTime = null;
      updatePlay();
    }
    function tick(time) {
      if (!running) return;
      if (previousTime !== null) render(progress + (time - previousTime) / 750);
      previousTime = time;
      if (progress >= totalStages) stop(); else frame = requestAnimationFrame(tick);
    }
    function start() {
      if (running) return;
      if (progress === totalStages) render(0);
      if (reducedMotion.matches) { render(totalStages); return; }
      running = true;
      previousTime = null;
      updatePlay();
      frame = requestAnimationFrame(tick);
    }
    play.addEventListener('click', () => {
      started = true; resumeOnEntry = false;
      if (running) stop(); else start();
    });
    host.querySelector('[data-action="reset"]').addEventListener('click', () => {
      started = true; resumeOnEntry = false; stop(); render(0);
    });
    slider.addEventListener('input', () => {
      started = true; resumeOnEntry = false;
      const value = Number(slider.value); stop(); render(value);
    });

    const scroll = host.querySelector('.ph-graph-scroll');
    const zoomIn = host.querySelector('[data-action="zoom-in"]');
    const zoomOut = host.querySelector('[data-action="zoom-out"]');
    let zoom = 1;
    function resize() {
      const fit = Math.min((scroll.clientWidth - 20) / data.width, (scroll.clientHeight - 20) / data.height);
      svg.style.width = `${data.width * fit * zoom}px`;
      svg.style.height = `${data.height * fit * zoom}px`;
      zoomIn.disabled = zoom >= 3;
      zoomOut.disabled = zoom <= 0.5;
    }
    function changeZoom(delta) {
      const oldWidth = svg.getBoundingClientRect().width;
      const centerX = scroll.scrollLeft + scroll.clientWidth / 2;
      const centerY = scroll.scrollTop + scroll.clientHeight / 2;
      zoom = Math.max(0.5, Math.min(3, zoom + delta));
      resize();
      const ratio = svg.getBoundingClientRect().width / oldWidth;
      scroll.scrollLeft = centerX * ratio - scroll.clientWidth / 2;
      scroll.scrollTop = centerY * ratio - scroll.clientHeight / 2;
    }
    zoomIn.addEventListener('click', () => changeZoom(0.25));
    zoomOut.addEventListener('click', () => changeZoom(-0.25));
    new ResizeObserver(resize).observe(scroll);

    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.25;
      if (visible && !document.hidden) {
        if (!started) { started = true; if (!reducedMotion.matches) start(); }
        else if (resumeOnEntry) { resumeOnEntry = false; start(); }
      } else if (running) { resumeOnEntry = true; stop(); }
    }, { threshold: [0, 0.25] }).observe(scroll);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && running) { resumeOnEntry = true; stop(); }
      else if (!document.hidden && visible && resumeOnEntry) { resumeOnEntry = false; start(); }
    });
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) { resumeOnEntry = false; stop(); }
    });
    window.addEventListener('site:languagechange', updateLanguage);
    updateLanguage();
    render(0);
    resize();
  }

  document.querySelectorAll('[data-phonology-demo]').forEach((host, index) => {
    const name = host.dataset.phonologyDemo;
    if (!['fang-upper', 'ju-lower'].includes(name)) return;
    fetch(new URL(`${name}.json`, assetBase)).then(response => {
      if (!response.ok) throw new Error('Demo unavailable');
      return response.json();
    }).then(data => mount(host, data, index)).catch(() => {
      host.textContent = document.documentElement.lang === 'en' ? 'Unable to load visualization' : '图示加载失败';
    });
  });
})();
