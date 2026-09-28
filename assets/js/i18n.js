(() => {
  "use strict";

  const storageKey = "wenmai-language";
  const english = {
    navLabel: "Primary navigation",
    brand: "Southeast University  School of Computer Science and Engineering  Wenmai AI Team",
    home: "Home",
    navRestoration: "Damaged Document Restoration",
    navTranscription: "Multi-Carrier Historical Document Transcription",
    navStyleTransfer: "Font Style Transfer and Generation",
    navPhonology: "Chinese Historical Phonology",
    heroEyebrow: "Southeast University · School of Computer Science and Engineering · Wenmai AI Team",
    siteName: "Wenmai AI",
    heroCopy: "At the intersection of artificial intelligence and the humanities, the Wenmai AI Team explores new ways to reconnect cultural materials, historical experience, and traditions of knowledge. Across periods and media, we bring computational methods and humanistic interpretation into dialogue, making AI not only a tool for complex sources, but also a bridge to broader scholarship and new forms of cultural knowledge.",
    browseResearch: "Explore our research",
    restorationTitle: "Damaged Document Restoration",
    transcriptionTitle: "Multi-Carrier Historical Document Transcription",
    styleTransferTitle: "Font Style Transfer and Generation",
    phonologyTitle: "Chinese Historical Phonology",
    direction01: "Research Area 01",
    direction02: "Research Area 02",
    direction03: "Research Area 03",
    direction04: "Research Area 04",
    restorationTitleBreak: "Damaged Document<br>Restoration",
    transcriptionTitleBreak: "Multi-Carrier<br>Historical Document Transcription",
    styleTransferTitleBreak: "Font Style Transfer<br>and Generation",
    phonologyTitleBreak: "Chinese Historical<br>Phonology",
    restorationSummary: "We restore missing strokes, noisy regions, and fractured glyphs in damaged books, inscriptions, rubbings, and cliff carvings while preserving their original structures and material character.",
    transcriptionSummary: "We study visual recognition and textual collation across historical books, bamboo and wooden slips, calligraphy, stone inscriptions, silk manuscripts, and oracle bones.",
    styleTransferSummary: "We investigate font style transfer, glyph normalization, and style-consistent generation for historical texts and ancient scripts, with an emphasis on structural legibility in few-shot and cross-medium settings.",
    phonologySummary: "Using multi-genre Song-dynasty corpora and large language models, we study inherited ambiguity among polyphonic fanqie spellers in the Guangyun and identify traceable primary pronunciation paths.",
    moreInfo: "More information",
    backHomeSection: "Back to homepage",
    examples: "Examples",
    damaged: "Damaged",
    restored: "Restored",
    carrierBook: "Books",
    carrierBamboo: "Bamboo slips",
    carrierCalligraphy: "Calligraphy",
    carrierInscription: "Inscriptions",
    carrierSilk: "Silk manuscripts",
    carrierOracle: "Oracle bones",
    comingSoon: "In development",
    styleTransferShort: "Font Style Transfer and Generation",
    fangDemoTitle: "Primary reading of the upper fanqie speller: fang 房",
    juDemoTitle: "Primary reading of the lower fanqie speller: ju 句",
    relatedPapers: "Related Publications",
    papersLoading: "Loading publications...",
    background: "Background",
    challenges: "Challenges",
    methodsAndScope: "Methods and Scope",
    restorationBackground: "Damaged historical documents preserve rich evidence about literature, calligraphy, and local culture, yet their images often suffer from weathering, erosion, uneven ink, missing regions, and scanning noise. Intelligent restoration must balance legibility, glyph authenticity, and material appearance.",
    restorationChallenge1: "Damage often covers critical strokes, so generic image completion can produce implausible glyphs.",
    restorationChallenge2: "Books, inscriptions, and rubbings have distinct visual distributions, including reversed contrast, granular noise, and paper textures.",
    restorationChallenge3: "Results must reconcile character structure, contextual meaning, and expert interpretability.",
    transcriptionBackground: "Historical texts exist far beyond paper books. Each medium has its own layout, material, damage patterns, and glyph evolution, so reading must extend from visual perception to recognition, contextual reasoning, and knowledge-guided correction.",
    transcriptionChallenge1: "Large visual-domain gaps between media make stable transfer difficult for a single recognition model.",
    transcriptionChallenge2: "Historical forms, variants, and rare characters amplify recognition and collation errors.",
    transcriptionChallenge3: "A complete reading pipeline must evaluate page recognition, character recognition, and post-correction together.",
    styleTransferBackground: "Font styles in historical sources are shaped by period, medium, writing tools, and preservation. This area develops a framework for style transfer, structural preservation, cross-medium generation, and interpretable evaluation.",
    styleTransferChallenge1: "Few-shot style transfer is unstable, while generated characters must retain valid structures and stroke relations.",
    styleTransferChallenge2: "The same character can vary greatly across periods and media, causing style and structure to interfere with one another.",
    styleTransferChallenge3: "Real applications lack complete paired data and require coordinated style representations, generation constraints, and evaluation metrics.",
    historicalPhonologyTag: "Historical Phonology",
    phonologyBackground: "Fanqie indicates one character's pronunciation with two spellers: the upper supplies the initial, while the lower supplies the final and tone. When a speller is polyphonic, its interpretation affects downstream pronunciations and creates inherited ambiguity. Our study examines the Guangyun alongside Song-dynasty written corpora.",
    phonologyMethod1: "We filter graphic variants using internal Guangyun evidence, retrieve contexts from multiple genres, and ask models to select among dictionary senses.",
    phonologyMethod2: "Sense frequencies are normalized within each valid genre and averaged with equal weights to determine the primary fanqie and build primary paths in upper- and lower-speller networks.",
    phonologyMethod3: "Posterior-margin analysis and model-sensitivity experiments test robustness; sense collisions and rare characters still require further textual evidence.",
    footer: "© Southeast University · School of Computer Science and Engineering · Wenmai AI Team"
  };

  const titleEnglish = {
    "文脉智算": "Wenmai AI",
    "残损古籍修复研究 | 研究详情": "Damaged Document Restoration | Research",
    "多载体古籍转录研究 | 研究详情": "Multi-Carrier Document Transcription | Research",
    "字体风格迁移生成研究 | 研究详情": "Font Style Transfer and Generation | Research",
    "中国古代音韵研究 | 研究详情": "Chinese Historical Phonology | Research"
  };
  const originalTitle = document.title;

  function applyLanguage(language, persist = true) {
    const lang = language === "en" ? "en" : "zh";
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.documentElement.dataset.language = lang;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      if (!element.dataset.i18nOriginal) element.dataset.i18nOriginal = element.innerHTML;
      const translated = english[element.dataset.i18n];
      element.innerHTML = lang === "en" && translated ? translated : element.dataset.i18nOriginal;
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      if (!element.dataset.i18nAriaOriginal) element.dataset.i18nAriaOriginal = element.getAttribute("aria-label") || "";
      const translated = english[element.dataset.i18nAriaLabel];
      element.setAttribute("aria-label", lang === "en" && translated ? translated : element.dataset.i18nAriaOriginal);
    });

    document.title = lang === "en" ? (titleEnglish[originalTitle] || originalTitle) : originalTitle;
    document.querySelectorAll("[data-language-toggle]").forEach((button) => {
      const label = lang === "en" ? "切换至中文" : "Switch to English";
      button.setAttribute("aria-label", label);
      button.title = label;
      button.setAttribute("aria-pressed", String(lang === "en"));
      button.querySelectorAll("[data-language-option]").forEach((option) => {
        option.classList.toggle("is-active", option.dataset.languageOption === lang);
      });
    });

    if (persist) localStorage.setItem(storageKey, lang);
    window.dispatchEvent(new CustomEvent("site:languagechange", { detail: { language: lang } }));
  }

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(document.documentElement.dataset.language === "en" ? "zh" : "en"));
  });

  applyLanguage(localStorage.getItem(storageKey) || "zh", false);
  window.siteI18n = { applyLanguage, get language() { return document.documentElement.dataset.language || "zh"; } };
})();
