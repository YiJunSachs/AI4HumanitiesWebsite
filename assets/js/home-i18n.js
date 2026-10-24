(() => {
  "use strict";
  const copy = {".team-affiliation": ["Zhishan Team"], ".directory-title": ["Contents"], ".restoration-kicker": ["Research Area 01", "Research Area 02", "Research Area 03", "Research Area 04"], ".restoration-heading h2": ["Intelligent Rubbing Restoration", "Multi-Source Collation of Ancient Texts", "Digital and Intelligent Phonology", "Calligraphic Style Imitation"], ".restoration-slogan": ["Make fragments readable. Keep cultural memory alive.", "Read across media. Rediscover centuries of knowledge.", "Trace fanqie connections. Explore historical sounds.", "Transfer writing styles. Preserve the spirit of characters."], ".restoration-description": ["We restore missing strokes, noisy regions and fractured glyphs in damaged books, inscriptions, rubbings and cliff carvings, respecting their original writing structures and material character.", "<span class=\"en-line-primary\">We study visual recognition and textual collation across books, bamboo</span><br><span class=\"en-line-equal\">and wooden slips, calligraphy, inscriptions, silk manuscripts and oracle</span><br>bones, spanning materials, periods and writing forms.", "Using multi-genre Song-dynasty corpora and contextual interpretation by large language models, we resolve inherited ambiguity among polyphonic fanqie spellers in the Guangyun and construct traceable primary pronunciation paths.", "We investigate font style transfer, glyph normalization and style-consistent generation in historical texts and ancient scripts, preserving legibility and writing style in few-shot and cross-medium settings."], ".restoration-background>h3": ["Background", "Background", "Background", "Background"], ".restoration-background p": ["Historical books preserve evidence about history, calligraphy and local culture, but weathering, erosion, uneven ink and scanning noise often impede reading. Intelligent restoration must balance legibility, authentic glyphs and material style to support scholarship and cultural transmission.", "Historical texts exist beyond paper books. Different media have distinct layouts, materials, damage patterns and evolving character forms. Reading therefore extends from visual perception to character recognition, contextual reasoning and knowledge-guided correction.", "Fanqie indicates a character’s pronunciation using two spellers: the upper supplies the initial, while the lower supplies the final and tone. A polyphonic speller can propagate ambiguity to downstream pronunciations. Our study examines the Guangyun and Song-dynasty written corpora.", "Font styles in historical sources reflect their period, medium, writing tools and state of preservation. This area develops a framework for font style transfer, structural preservation, cross-medium generation and interpretable evaluation."], ".restoration-context h3": ["Challenges", "Challenges", "Challenges", "Challenges"], ".restoration-context li": ["Missing critical strokes can make image completion generate implausible glyphs.", "Text contrast, noise and surface textures vary substantially across historical media.", "Restoration must reconcile glyph structure, contextual meaning and expert interpretability.", "Large visual-domain gaps make it difficult to transfer a single recognizer across media.", "Historical forms, character variants and rare characters amplify recognition and collation errors.", "Page recognition, character recognition and post-correction require a unified evaluation.", "Polyphonic fanqie spellers introduce ambiguity that propagates through pronunciation relations.", "Sense distributions across literary genres require comparable normalization and correction.", "Sense collisions and rare characters still require additional documentary evidence.", "Few-shot style transfer must preserve character structure and stroke relations.", "Forms vary across periods and media, causing style and structure to interfere.", "Limited paired data require coordinated generation constraints and evaluation."], ".restoration-keywords li": ["Damage Restoration", "Noise Removal", "Glyph Reconstruction", "Multi-Carrier Recognition", "Character Recognition", "Textual Collation", "Primary Fanqie Readings", "Contextual Interpretation", "Primary Path Construction", "Style Transfer", "Glyph Preservation", "Few-Shot Generation"], ".restoration-publications:not(.topic-preview)>h3": ["Related Publications", "Related Publications", "Related Publications", "Related Publications"], ".restore-pair-labels span": ["Restored", "Damaged", "Restored", "Damaged"], ".restoration-caption": ["<span class=\"caption-index\">Example 01</span><span class=\"caption-description\">Damaged Inscription Restoration</span>", "<span class=\"caption-index\">Example 02</span><span class=\"caption-description\">Rubbing Text Reconstruction</span>"], ".restoration-interaction-note": ["Drag left or right to compare before and after restoration", "Six media, multiple dimensions of reading"], ".editorial-coming-soon span": ["In development"], ".editorial-coming-soon h3": ["Calligraphic Style Imitation"], ".editorial-coming-soon p": ["Examples forthcoming"], ".editorial-paper-empty h4": ["Publications forthcoming"], ".editorial-paper-empty p": ["The research framework is in place. Publications and examples will be added as the work develops."], ".restoration-paper h4": ["EpiAgent: An Agentic System for Ancient Inscription Restoration", "CIRI: A Benchmark Dataset for Inscription Restoration", "MCHDoc: A Comprehensive Benchmark for Multi-Carrier Chinese Historical Document Reading", "Resolving Inherited Ambiguity in Chinese Historical Phonology with Song Dynasty Corpus Evidence"], ".restoration-paper-tags span": ["CVPR 2026", "Agentic Restoration", "Ancient Inscriptions", "MM 2024", "CIRI Dataset", "Ancient Inscriptions", "CVPR 2026", "MCHDoc Benchmark", "Chinese Historical Documents", "npj Heritage Science 2026", "Historical Phonology", "Common Readings of Fanqie"], ".restoration-paper p:not(.restoration-paper-authors)": ["Coordinates multimodal perception, experience-guided planning, specialized restoration tools, and self-reflection to restore damaged historical documents.", "A benchmark for restoring Chinese inscription rubbings, combining authentic damaged rubbings, synthetic paired data, and a global-local diffusion baseline.", "A collection of 15,724 high-resolution images across six historical media, supporting page recognition, character recognition, and post-correction evaluation.", "Infers primary readings for polyphonic fanqie spellers and constructs primary paths from Guangyun evidence and multi-genre Song-dynasty contexts."]};
  const chineseHeaderTemplate = document.querySelector(".team-intro").cloneNode(true);
  let chineseHeaderTitleTop = null;
  const records = [];
  Object.entries(copy).forEach(([selector, values]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (element.hasAttribute("data-i18n") || values[index] === undefined) return;
      const original = element.innerHTML;
      const image = selector === ".restoration-heading h2" ? element.querySelector("img")?.outerHTML || "" : "";
      let en = values[index] + image;
      if (selector === ".restoration-slogan") {
        const text = values[index], end = text.indexOf(" ", 7);
        en = '<span class="restoration-slogan-rule">' + text.slice(0, end) + '</span>' + text.slice(end);
      }
      records.push({element, zh: original, en});
    });
  });
  const measure = (text, element) => {
    const style = getComputedStyle(element), canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    return context.measureText(text).width;
  };
  const balanceEnglish = (element, count, equalFirstTwo = false) => {
    if (!element) return;
    const text = element.dataset.englishLayoutText || element.textContent.trim();
    element.dataset.englishLayoutText = text;
    const words = text.split(/\s+/), limit = element.clientWidth;
    let best = null;
    const consider = breaks => {
      const lines = [], widths = [];
      let start = 0;
      for (const end of [...breaks, words.length]) {
        const line = words.slice(start, end).join(" ");
        lines.push(line); widths.push(measure(line, element)); start = end;
      }
      const maximum = Math.max(...widths), minimum = Math.min(...widths);
      const cost = maximum - minimum + Math.max(0, maximum - limit) * 1000;
      if (!best || cost < best.cost) best = {lines, widths, cost};
    };
    for (let i = 1; i < words.length; i++) {
      if (count === 2) consider([i]);
      else for (let j = i + 1; j < words.length; j++) consider([i,j]);
    }
    if (!best) return;
    element.replaceChildren();
    best.lines.forEach((text, index) => {
      const line = document.createElement("span"); line.className = "balanced-copy-line"; line.textContent = text;
      if (equalFirstTwo && index < 2) {
        const spaces = (text.match(/ /g) || []).length;
        if (spaces) line.style.wordSpacing = `${(Math.max(best.widths[0],best.widths[1])-best.widths[index])/spaces}px`;
      }
      element.append(line);
    });
  };
  const alignTeamHeader = () => {
    const header = document.querySelector(".team-intro"), group = header.querySelector(".team-copy-group");
    group.style.transform = "";
    if (document.documentElement.lang !== "en") return;
    const scale = parseFloat(getComputedStyle(document.body).zoom || 1);
    if (chineseHeaderTitleTop === null) {
      const probe = chineseHeaderTemplate.cloneNode(true);
      probe.setAttribute("aria-hidden", "true");
      Object.assign(probe.style, {position:"absolute",left:"0",top:"0",width:"2351px",transform:"none",visibility:"hidden",pointerEvents:"none"});
      const language = document.documentElement.dataset.language;
      document.documentElement.dataset.language = "zh";
      document.body.append(probe);
      chineseHeaderTitleTop = (probe.querySelector(".team-affiliation").getBoundingClientRect().top - probe.getBoundingClientRect().top) / scale;
      probe.remove();
      document.documentElement.dataset.language = language;
    }
    const top = (header.querySelector(".team-affiliation").getBoundingClientRect().top - header.getBoundingClientRect().top) / scale;
    group.style.transform = `translateY(${chineseHeaderTitleTop - top}px)`;
  };
  const refineEnglish = () => {
    balanceEnglish(document.querySelector(".research-section-rubbing .restoration-description"),3);
    balanceEnglish(document.querySelector(".characters-editorial .restoration-description"),3,true);
    balanceEnglish(document.querySelector(".phonology-editorial .restoration-description"),3,true);
    balanceEnglish(document.querySelector(".carrier-editorial .restoration-paper p:not(.restoration-paper-authors)"),2);
    balanceEnglish(document.querySelectorAll(".research-section-rubbing .restoration-paper p:not(.restoration-paper-authors)")[1],2);
    document.querySelectorAll(".research-section-rubbing .restoration-paper h4").forEach(title => {
      title.style.fontSize = "";
      const width = measure(title.textContent,title), available = title.clientWidth;
      if (width > available) title.style.fontSize = `${parseFloat(getComputedStyle(title).fontSize)*available/width}px`;
    });
  };
  const fitChineseLines = () => {
    if (matchMedia('(max-width: 900px)').matches) {
      document.querySelector('.team-copy-group').style.transform = '';
      new Set([...document.querySelectorAll('.balanced-copy-line')].map(line => line.parentElement)).forEach(parent => {
        if (parent.dataset.englishLayoutText) parent.textContent = parent.dataset.englishLayoutText;
      });
      return;
    }
    alignTeamHeader();
    if (document.documentElement.lang === "en") {
      refineEnglish();
      document.querySelectorAll(".en-line-equal").forEach(line => {
        const first = line.parentElement.querySelector(".en-line-primary");
        line.style.wordSpacing = "0px";
        const spaces = (line.textContent.match(/ /g) || []).length;
        const difference = (first.getBoundingClientRect().width - line.getBoundingClientRect().width) / parseFloat(getComputedStyle(document.body).zoom || 1);
        if (spaces) line.style.wordSpacing = `${difference / spaces}px`;
      });
      return;
    }
    document.querySelectorAll(".research-section-rubbing .restoration-paper h4").forEach(title => { title.style.fontSize = ""; });
    document.querySelectorAll(".intro-line-equal").forEach(line => {
      const first = line.parentElement.querySelector(".intro-line-primary");
      line.style.letterSpacing = "0px";
      const count = Array.from(line.textContent).length;
      const difference = (first.getBoundingClientRect().width - line.getBoundingClientRect().width) / parseFloat(getComputedStyle(document.body).zoom || 1);
      if (count > 1) line.style.letterSpacing = `${difference / count}px`;
    });
  };
  window.addEventListener("site:languagechange", event => {
    const language = event.detail.language;
    records.forEach(({element, zh, en}) => { element.innerHTML = language === "en" ? en : zh; });
    document.fonts.ready.then(() => requestAnimationFrame(fitChineseLines));
  });
  matchMedia('(max-width: 900px)').addEventListener('change', () => requestAnimationFrame(fitChineseLines));
  document.fonts.ready.then(() => requestAnimationFrame(fitChineseLines));
})();
