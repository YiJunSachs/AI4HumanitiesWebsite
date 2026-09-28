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
    carrierHall: "Multi-Carrier Gallery",
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
    paperResearchArea: "Research Area",
    paperMethods: "Methods",
    paperCorpus: "Corpus",
    paperResults: "Results",
    paperSensitivity: "Sensitivity",
    qyspdEyebrow: "QYSPD | Chinese Historical Phonology",
    qyspdHero: "Combining internal evidence from the Guangyun with multi-genre Song-dynasty contexts, this study selects primary fanqie for polyphonic spellers and represents the resolution of inherited ambiguity through primary paths.",
    codeAndData: "Code & Data",
    backResearchArea: "Back to Research Area",
    corpusGroups: "corpus groups",
    corpusFiles: "corpus files",
    polyphonicSpellers: "polyphonic fanqie spellers in the full pipeline",
    strongDominance: "characters with strong posterior dominance",
    researchQuestion: "Research Question",
    qyspdQuestion1: "In fanqie notation, the upper speller supplies the initial, while the lower speller supplies the final and tone. When a polyphonic character is used to spell another character, its own ambiguity propagates through the fanqie relation, creating inherited ambiguity.",
    qyspdQuestion2: "QYSPD (Qieyun System Polyphonic-character Disambiguation) uses the Guangyun as its dictionary basis and combines it with contextual sense evidence from Song-dynasty corpora to infer the common reading and corresponding primary fanqie of polyphonic spellers.",
    evidenceInference: "Evidence and Inference",
    qyspdEvidence1: "The dictionary constrains candidate fanqie, senses, and graphic-variant relations.",
    qyspdEvidence2: "Multi-genre Song-dynasty corpora provide concrete contexts of use.",
    qyspdEvidence3: "The model selects among candidate senses; readings are inferred through sense–fanqie pairings rather than direct phonetic reconstruction.",
    definitionsToPaths: "From Dictionary Senses to Primary Fanqie Paths",
    qyspdStep1: "<strong>Variant filtering:</strong> Candidate forms are filtered using graphic-variant markers within the Guangyun.",
    qyspdStep2: "<strong>Sentence retrieval:</strong> Sentences containing the target polyphonic character or its variants are retrieved with their context.",
    qyspdStep3: "<strong>Contextual sense selection:</strong> Qwen2.5-7B selects from dictionary-provided candidate senses, with an option for ‘no suitable sense.’",
    qyspdStep4: "<strong>Primary fanqie selection:</strong> After excluding ‘no suitable sense,’ sense frequencies are normalized within each valid genre and averaged with equal genre weights. The fanqie paired with the most frequent sense becomes the primary fanqie.",
    qyspdFigure4: "Figure 4 (paper, p. 7): The QYSPD pipeline and an illustrative character example.",
    songCorpus: "Multi-Genre Song-Dynasty Corpus",
    songCorpusSummary: "The corpus contains comprehensive historical works and ten genres of canonical texts, totaling 371 files. The historical works include Zizhi Tongjian, New History of the Five Dynasties, New Book of Tang, and Xu Zizhi Tongjian Changbian.",
    corpusTableTitle: "Table 1 · Corpus Group Statistics",
    group: "Group",
    fileCount: "Files",
    characterCount: "Characters",
    avgCharacters: "Average characters per file",
    corpusComprehensive: "Comprehensive histories",
    corpusYi: "Yi studies",
    corpusBuddhist: "Buddhist",
    corpusHistory: "History",
    corpusConfucian: "Confucian",
    corpusTaoist: "Taoist",
    corpusMedical: "Medical",
    corpusPhilosophy: "Philosophy",
    corpusArt: "Art",
    corpusPoetry: "Poetry",
    corpusAnthology: "Anthology",
    corpusTableCaption: "Values for each group follow Table 1 of the paper.",
    qyspdFigure6: "Figure 6 (paper, p. 9): Extended primary paths in the lower-speller network (a) and upper-speller network (b).",
    pathMeaning: "How Paths Represent Reading Selection",
    pathMeaningSummary: "The paper constructs directed multigraphs for upper and lower spellers. For a head character A, the upper speller U and lower speller L form edges U → A and L → A, respectively.",
    pathLegend1: "A single ring denotes a monophonic character; a double ring denotes a polyphonic character.",
    pathLegend2: "Red marks the selected primary fanqie; black dashed lines mark non-primary fanqie.",
    pathLegend3: "Diamond arrowheads indicate fanqie found in commentary notes.",
    viewHomepageAnimation: "View Homepage Animation",
    coverageDominance: "Coverage and Posterior Dominance",
    coverageSummary: "The Guangyun fanqie graph contains 1,684 distinct spellers, of which 377 are polyphonic. After preprocessing and exception screening, 253 enter the complete QYSPD pipeline.",
    coverageTableTitle: "Table 2 · Coverage of Ambiguous Entries and Fanqie",
    statisticUnit: "Statistic",
    processedQyspd: "Processed by QYSPD",
    senseCollision: "C4: Sense collision",
    rareCharacters: "C5: Rare characters",
    ambiguousEntries: "Ambiguous entries",
    distinctAmbiguousFanqie: "Distinct ambiguous fanqie",
    coverageTableCaption: "Table 2 of the paper. Each entry represents one reading; the counts are not numbers of distinct characters.",
    dominanceTitle: "Primary-Fanqie Dominance among 253 Characters",
    dominanceSummary1: "The paper constructs Dirichlet posteriors from genre-level sense counts and draws 5,000 samples. Of the 253 characters, 208 show strong dominance (82.2%), 4 show dominance (1.6%), 36 show borderline dominance (14.2%), and 5 show no dominance (2.0%).",
    dominanceSummary2: "Strong dominance requires at least 0.95 posterior probability that the selected sense has a cross-genre mean probability above 0.5. Other cases are classified by the 95% highest-posterior-density interval of the gap between the selected sense and its strongest competitor. This diagnoses dominance in model-derived sense counts; it is not accuracy against human ground truth.",
    qyspdFigure7: "Figure 7 (paper, p. 11): Dominance categories (a), proportion of strong dominance (b), and interval widths (c).",
    modelStability: "Stability across Models and Temperatures",
    modelStabilitySummary: "The comparison uses only the ten genres of canonical texts and excludes comprehensive histories. The baseline is Qwen2.5-7B at temperature 0.7.",
    sensitivityTableTitle: "Table 3 · Agreement and JS Distance Relative to the Baseline",
    modelTemperature: "Model / Temperature",
    primaryFanqieAgreement: "Primary fanqie agreement ↑",
    meanJsDistance: "Mean JS distance ↓",
    all: "All",
    strong: "Strong dominance",
    temperature01: "Qwen2.5-7B · Temperature 0.1",
    temperature03: "Qwen2.5-7B · Temperature 0.3",
    temperature05: "Qwen2.5-7B · Temperature 0.5",
    temperature09: "Qwen2.5-7B · Temperature 0.9",
    sensitivityCaption: "Table 3 of the paper. JS distance compares candidate fanqie–sense distributions within genres. Higher agreement and lower JS distance indicate greater similarity to the baseline, not higher accuracy.",
    scopeOpenQuestions: "Scope and Open Questions",
    scopeSummary1: "The findings are scoped to the Guangyun system and the Song-dynasty written corpus collected in this study. Models perform contextual sense selection, while primary fanqie are inferred through dictionary sense–fanqie pairings.",
    scopeSummary2: "Thirty C4 characters exhibit sense collisions and require evidence from additional dictionaries or phonological sources. Twelve rare C5 characters occur fewer than 20 times each in the selected corpus and require broader textual coverage.",
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

  const documentDefault = document.documentElement.lang.toLowerCase().startsWith("en") ? "en" : "zh";
  applyLanguage(localStorage.getItem(storageKey) || documentDefault, false);
  window.siteI18n = { applyLanguage, get language() { return document.documentElement.dataset.language || "zh"; } };
})();
