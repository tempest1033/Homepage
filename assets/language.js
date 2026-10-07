/* Language switch (Korean / English).
   Korean is the text written in the HTML; English comes from the dictionary
   below. Every element with data-i18n="key" is swapped, and blocks marked
   data-lang-block="ko|en" (legal pages) are shown for their language only. */
(function () {
  try {
    const path = window.location.pathname;
    if (path.endsWith('/index.html')) {
      const cleanPath = path.slice(0, -'index.html'.length);
      const target = cleanPath === '' ? '/' : cleanPath;
      window.history.replaceState(null, '', `${target}${window.location.search}${window.location.hash}`);
    }
  } catch (error) {
    /* ignore history errors (e.g., file protocol) */
  }

  const STORAGE_KEY = 'tribigames-language';
  const LANGS = ['ko', 'en'];
  const en = {
    'nav.games': 'Games',
    'nav.ai': 'AI',
    'nav.company': 'About',
    'nav.history': 'History',
    'nav.contact': 'Contact',
    'footer.company': 'Company',
    'footer.policy': 'Policies',
    'footer.link.terms': 'Terms of Service',
    'footer.link.privacy': 'Privacy Policy',
    'footer.link.accountDeletion': 'Account Deletion',

    'common.features': 'Features',
    'common.info': 'Product details',
    'common.infoTitle': 'At a glance',
    'common.type': 'Category',
    'common.price': 'Price',
    'common.platform': 'Platform',
    'common.license': 'License',
    'common.links': 'Links',
    'common.website': 'Website',
    'common.more': 'More products',
    'common.cat.game': 'Mobile game',
    'common.cat.mx': 'AI coding agent',
    'common.cat.gs': 'Game market data',
    'common.cat.ai': 'AI review media',
    'common.cat.ut': 'Unity editor tools',

    'home.docTitle': 'TRIBGAMES — A studio making games and AI',
    'home.title1': 'Across games and AI,',
    'home.title2': 'opening new possibilities.',
    'home.lede': 'TRIBGAMES is an independent studio that develops and operates games and AI tools.',
    'home.pillar.games': 'We make a mobile game, a game market data service, and Unity development tools.',
    'home.pillar.ai': 'We make an AI coding agent and an AI review media outlet.',
    'home.games.title': 'We make games, and provide the tools and data behind them.',
    'home.ai.title': 'We build AI agents, and share a wide range of insights on AI.',
    'home.ct.cat': 'Mobile game · Coming soon',
    'product.ct.name': 'Clash Tactica',
    'home.ct.desc': 'A casual defense game where you hold off incoming enemies with all kinds of combinations. Coming soon to Android and iOS.',
    'home.mx.cat': 'AI coding agent · Free and open source',
    'home.mx.desc': 'A desktop coding agent that delivers the same performance while using 63% fewer tokens.',
    'home.gs.cat': 'Game market data',
    'home.gs.desc': 'Daily mobile game revenue rankings across five countries, plus Steam concurrent player counts, tracked and analyzed.',
    'home.ai.cat': 'AI review media',
    'home.ai.desc': 'Hands-on reviews and measured analysis of AI models and coding tools.',
    'home.ut.cat': 'Unity editor tools',
    'home.ut.desc': 'A Git client and a spreadsheet-style data table editor that live inside Unity.',
    'home.companyTitle': 'We ship what we first built for ourselves.',
    'home.companyLede': 'TRIBGAMES is a small development studio in Yongin, Korea. Building our game, we made our own tools, and that work led to an AI coding agent. Today we build and run products in both games and AI.',
    'home.area1.desc': 'We develop a mobile defense game in Unity, and build game market data and development tools.',
    'home.area2.desc': 'We build an AI coding agent and publish reviews of AI models and tools.',
    'home.fact.name': 'Company',
    'home.fact.nameV': 'TRIBGAMES',
    'home.fact.location': 'Location',
    'home.fact.locationV': 'Suji-gu, Yongin, Korea',
    'home.fact.field': 'Business',
    'home.fact.fieldV': 'Games · AI software',
    'home.fact.contact': 'Contact',
    'home.historyTitle': 'History',
    'home.h.soon': 'Coming soon',
    'home.h.ct': 'Clash Tactica launches on Android and iOS',
    'home.h.ai2': 'AIScroll redesigned around reviews, analysis, and dev logs',
    'home.h.gs3': 'GamerScroll launches in five languages with a full redesign',
    'home.h.mx2': 'Mixdog 1.0 released',
    'home.h.mx1': 'First public release of Mixdog',

    'mx.docTitle': 'Mixdog — The open-source coding agent that uses 63% fewer tokens | TRIBGAMES',
    'mx.cat': 'AI coding agent',
    'mx.title1': 'Same performance,',
    'mx.title2': '63% fewer tokens.',
    'mx.lede': 'Mixdog is a free, open-source desktop coding agent. No extra billing: connect your existing Claude, ChatGPT, or Grok subscription and start working immediately.',
    'mx.dlWin': 'Download for Windows',
    'mx.dlMac': 'Download for macOS',
    'mx.note': 'Free · Apache-2.0 · Windows x64 and Apple Silicon Mac',
    'mx.featuresTitle': 'From code to documents, in one window.',
    'mx.f1.t': 'Same score, fewer tokens',
    'mx.f1.d': 'On the 89 Terminal-Bench 2.1 tasks with the same model, Mixdog achieved an 86.5% success rate (Codex CLI: 86.1%) while using 63% fewer tokens overall.',
    'mx.f2.t': 'Many models, one team',
    'mx.f2.d': 'A strong model plans while several cheaper models search, edit, and review in parallel.',
    'mx.f3.t': 'Editor, terminal, and Git together',
    'mx.f3.d': 'Edit code, run tests, commit, and open pull requests without leaving the app.',
    'mx.f4.t': 'Pick up on your phone',
    'mx.f4.d': 'End-to-end encrypted remote control lets you check and steer work from anywhere.',
    'mx.f5.t': 'Beyond code',
    'mx.f5.d': 'Drives browsers and desktop apps, and creates and edits Word, Excel, PowerPoint, and PDF documents.',
    'mx.f6.t': 'Local models on your GPU',
    'mx.f6.d': 'Download a model inside the app and run it on your own PC.',
    'mx.s1.label': 'Parallel work',
    'mx.s1.title': 'Several tasks at once.',
    'mx.s1.desc': 'Split the window and assign different tasks to independent sessions. Build a feature on one side while fixing a bug on the other.',
    'mx.s2.label': 'Usage',
    'mx.s2.title': 'See where every token went.',
    'mx.s2.desc': 'Token usage, cost, subscription limits, and reset times by provider and model, on one screen.',
    'mx.priceV': 'Free (model usage is billed by each provider’s subscription or API key)',
    'mx.platformV': 'Windows x64, Apple Silicon Mac, command line (Node.js)',
    'mx.models': 'Models',
    'mx.modelsV': 'Claude, ChatGPT/Codex, Gemini, Grok, OpenRouter, DeepSeek, local models',
    'mx.introPage': 'Product page',

    'gs.docTitle': 'GamerScroll — Game rankings and market data | TRIBGAMES',
    'gs.title1': 'Game rankings and market trends,',
    'gs.title2': 'recorded every day.',
    'gs.lede': 'GamerScroll gathers mobile game revenue and download rankings from five countries, alongside Steam concurrent player and sales rankings, every day. See rank changes, new releases, and fast risers at a glance.',
    'gs.visit': 'Visit GamerScroll',
    'gs.note': 'Free · Web · 5 languages',
    'gs.featuresTitle': 'The game market, in numbers.',
    'gs.f1.t': 'Mobile rankings in five countries',
    'gs.f1.d': 'Google Play and App Store revenue and download rankings for Korea, Japan, the US, China, and Taiwan, updated daily.',
    'gs.f2.t': 'Steam rankings',
    'gs.f2.d': 'Steam concurrent players and top sellers alongside the mobile charts.',
    'gs.f3.t': 'Trending now',
    'gs.f3.d': 'Fast risers, TOP 10 entries and exits, and new games entering the charts.',
    'gs.f4.t': 'Rank history per game',
    'gs.f4.d': 'Each game’s ranking over time, by country and store, as a chart.',
    'gs.f5.t': 'Game database',
    'gs.f5.d': 'Search by game or developer name, or browse by genre.',
    'gs.f6.t': 'No gaps',
    'gs.f6.d': 'Built on daily ranking records kept without a missing day since December 2025.',
    'gs.s1.label': 'Trending',
    'gs.s1.title': 'Spot the games on the rise first.',
    'gs.s1.desc': 'See the biggest climbers of the last seven days and the newcomers to the TOP 10, country by country.',
    'gs.countries': 'Countries',
    'gs.countriesV': 'Korea, Japan, US, China, Taiwan',
    'gs.data': 'Data',
    'gs.dataV': 'Mobile revenue and download rankings, Steam concurrent players and sales',
    'gs.update': 'Updates',
    'gs.updateV': 'Daily',

    'ai.docTitle': 'AIScroll — Reviews of AI models and tools | TRIBGAMES',
    'ai.title1': 'We test AI models and tools',
    'ai.title2': 'and write about them.',
    'ai.lede': 'AIScroll publishes reviews and analysis based on actually using and measuring AI models and coding agents, covering what matters when you choose: pricing, limits, and performance.',
    'ai.visit': 'Visit AIScroll',
    'ai.note': 'Free · Reviews · Analysis · Dev logs · News',
    'ai.coverLabel': 'What we cover',
    'ai.coverTitle': 'Use it, measure it, write it down.',
    'ai.f1.t': 'Reviews',
    'ai.f1.d': 'We put models and coding tools to work on real tasks and explain who they suit.',
    'ai.f2.t': 'Analysis',
    'ai.f2.d': 'We measure token costs, pricing, and limits ourselves and compare the numbers.',
    'ai.f3.t': 'Dev logs',
    'ai.f3.d': 'We record the problems and decisions behind building the coding agent Mixdog.',
    'ai.recentLabel': 'Recent articles',
    'ai.a1.t': 'AI token cost by language: non-English averages 1.54×, measured across 8 model tokenizers',
    'ai.a1.d': 'We fed the same sentences in nine languages to eight models and measured the token cost.',
    'ai.a2.t': 'Model pick — Muse Spark 1.3, the best value for money',
    'ai.a2.d': 'Strengths, weaknesses, and pricing terms as an implementation worker model.',
    'ai.a3.t': 'Three coding agent tools for September 2026: Paseo, Orca, and DeepSeek Harness',
    'ai.a3.d': 'Remote access, isolated parallel work, and plugin extensibility compared.',
    'ai.sections': 'Sections',
    'ai.sectionsV': 'Reviews, analysis, dev logs, news',

    'ut.docTitle': 'UniGit · UniCell — Unity editor tools | TRIBGAMES',
    'ut.title1': 'Git and data editing,',
    'ut.title2': 'done inside Unity.',
    'ut.lede': 'Unity editor extensions we built and use while developing Clash Tactica. Version control and game data editing, without leaving the editor.',
    'ut.contact': 'Contact us',
    'ut.cell.label': 'Data table editor',
    'ut.cell.desc': 'Edit CSV, TSV, and ScriptableObject tables like a spreadsheet. Modify hundreds of rows of balance data right inside a single Unity window.',
    'ut.cell.1': 'Cell selection, copy and paste, insert and delete rows and columns',
    'ut.cell.2': 'Sorting and text filters',
    'ut.cell.3': 'Column rules, ID formulas, balance factor cards',
    'ut.cell.4': 'ScriptableObject tables you can load at runtime',
    'ut.git.label': 'Git client for Unity',
    'ut.git.desc': 'A Git client built into the Unity Editor. From commits to GitHub, no terminal needed.',
    'ut.git.f1.t': 'Everyday Git',
    'ut.git.f1.d': 'Stage, commit, push, pull, fetch, branch, stash, cherry-pick, and reset with buttons.',
    'ut.git.f2.t': 'Cell-level CSV diff',
    'ut.git.f2.d': 'Game data CSVs are compared side by side, cell by cell.',
    'ut.git.f3.t': 'Commit history',
    'ut.git.f3.d': 'Browse authors, dates, messages, and changed files, per-file history, and ahead/behind counts.',
    'ut.git.f4.t': 'Project window integration',
    'ut.git.f4.d': 'Status dots on files and folders, and right-click to commit, revert, or view history.',
    'ut.git.f5.t': 'GitHub integration',
    'ut.git.f5.d': 'Sign in to GitHub from the editor and create or clone repositories.',
    'ut.git.f6.t': 'Setup wizard',
    'ut.git.f6.d': 'Four guided steps — Git detection, identity, GitHub, project — plus a Unity-ready .gitignore.',
    'ut.status': 'Status',
    'ut.gitEnv': 'UniGit requires',
    'ut.gitEnvV': 'Unity 2021.3 LTS or later, Git 2.20 or later, Windows/macOS/Linux',
    'ut.cellFormats': 'UniCell formats',

    'ct.docTitle': 'Clash Tactica | TRIBGAMES',
    'ct.title1': 'Mix and match your heroes,',
    'ct.title2': 'hold back the incoming horde.',
    'ct.lede': 'Clash Tactica is a casual defense game where you combine characters and skills in different ways to hold off waves of incoming enemies.',
    'ct.storesNote': 'Coming soon to Android and iOS. Store links will appear here at launch.',
    'ct.charsTitle': 'A cast of heroes, each with a style of their own.',
    'ct.c001': 'Medea',
    'ct.c002': 'Altair',
    'ct.c003': 'Erwen',
    'ct.c004': 'Aramis',
    'ct.c005': 'Catalunya',
    'ct.c006': 'Jane',
    'ct.c008': 'Orphee',
    'ct.c010': 'Chiyome',
    'ct.c012': 'Jeanne',
    'ct.c013': 'Recon',
    'ct.c016': 'Teresa',
    'ct.c017': 'Master Park',
    'ct.aboutLabel': 'About the game',
    'ct.aboutTitle': 'Easy to pick up, deeper with every combo.',
    'ct.f1.t': 'Defense',
    'ct.f1.d': 'Guard the wall and hold back every wave of incoming enemies.',
    'ct.f2.t': 'Endless combinations',
    'ct.f2.d': 'Which characters and skills you pair up changes every battle.',
    'ct.f3.t': 'Characters and gear',
    'ct.f3.d': 'Level up each character and their equipment for the next fight.',
    'ct.genre': 'Genre',
    'ct.genreV': 'Casual defense',
    'ct.statusV': 'Coming soon',
    'ct.engine': 'Engine'
  };

  const isKoreanLocale = (value) => typeof value === 'string' && value.trim().toLowerCase().startsWith('ko');

  const detectDefaultLanguage = () => {
    try {
      const nav = window.navigator;
      const candidates = [...(Array.isArray(nav.languages) ? nav.languages : []), nav.language, nav.userLanguage];
      if (candidates.some(isKoreanLocale)) return 'ko';
    } catch (error) {
      /* ignore navigator access errors */
    }
    return 'en';
  };

  const getSavedLanguage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (LANGS.includes(stored)) return stored;
    } catch (error) {
      /* localStorage unavailable */
    }
    return null;
  };

  const saveLanguage = (lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* ignore storage errors */
    }
  };

  const states = [];
  const closeAll = (exceptComponent) => {
    states.forEach((state) => {
      if (state.component !== exceptComponent) state.closeMenu();
    });
  };

  const applyLanguage = (lang) => {
    const target = LANGS.includes(lang) ? lang : 'ko';
    document.documentElement.lang = target;

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      if (node.dataset.i18nKo === undefined) node.dataset.i18nKo = node.textContent;
      const text = target === 'en' ? en[node.dataset.i18n] : node.dataset.i18nKo;
      if (typeof text === 'string') node.textContent = text;
    });

    document.querySelectorAll('[data-lang-block]').forEach((node) => {
      node.hidden = node.getAttribute('data-lang-block') !== target;
    });

    states.forEach((state) => {
      state.updateSelection(target);
      state.closeMenu();
    });

    saveLanguage(target);
  };

  document.querySelectorAll('[data-language-select]').forEach((component) => {
    const toggle = component.querySelector('.language-select__toggle');
    const menu = component.querySelector('.language-select__menu');
    const current = component.querySelector('[data-language-current]');
    const options = Array.from(component.querySelectorAll('[data-language-option]'));

    const closeMenu = () => {
      component.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    };

    const openMenu = () => {
      closeAll(component);
      component.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
    };

    const updateSelection = (value) => {
      options.forEach((option) => {
        const selected = option.dataset.languageOption === value;
        option.setAttribute('aria-selected', selected ? 'true' : 'false');
        if (selected) current.textContent = option.textContent;
      });
    };

    states.push({ component, updateSelection, closeMenu });
    menu.hidden = true;

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      if (component.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    toggle.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openMenu();
        options[0].focus();
      } else if (event.key === 'Escape') {
        closeMenu();
      }
    });

    menu.addEventListener('click', (event) => event.stopPropagation());

    options.forEach((option, index) => {
      option.addEventListener('click', (event) => {
        event.preventDefault();
        applyLanguage(option.dataset.languageOption);
        toggle.focus();
      });

      option.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeMenu();
          toggle.focus();
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          (options[index + 1] || options[0]).focus();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          (options[index - 1] || options[options.length - 1]).focus();
        } else if (event.key === 'Tab') {
          closeMenu();
        }
      });
    });
  });

  applyLanguage(getSavedLanguage() || detectDefaultLanguage());

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });
})();
