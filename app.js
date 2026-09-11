/**
 * ==============================================================================
 * LOC CYBER COMMAND PORTAL - CORE ROUTER & MARKDOWN ENGINE (app.js)
 * High-performance, native ES6+ client-side routing & dynamic markdown renderer.
 * ==============================================================================
 */

(() => {
  'use strict';

  // --- REGISTRY CONFIGURATION FOR ALL 11 PAGES ---
  const ROUTE_REGISTRY = {
    'page-00': {
      id: 'page-00',
      title: '00. EXECUTIVE DASHBOARD',
      type: 'static',
      targetContainer: 'dashboard-view'
    },
    'page-01': {
      id: 'page-01',
      title: '01. REPORT PART I',
      subtitle: 'Universal Fraud & Everyday Vectors',
      type: 'markdown',
      file: 'cyber-mobile-world-report-part1.md',
      prev: 'page-00',
      next: 'page-02'
    },
    'page-02': {
      id: 'page-02',
      title: '02. REPORT PART II',
      subtitle: 'Hardware SIMBoxes & Mule Accounts',
      type: 'markdown',
      file: 'cyber-mobile-world-report-part2.md',
      prev: 'page-01',
      next: 'page-03'
    },
    'page-03': {
      id: 'page-03',
      title: '03. REPORT PART III',
      subtitle: 'Transnational Schemes & Protocols',
      type: 'markdown',
      file: 'cyber-mobile-world-report-part3.md',
      prev: 'page-02',
      next: 'page-04'
    },
    'page-04': {
      id: 'page-04',
      title: '04. REPORT PART IV',
      subtitle: 'Mitigation Infrastructure & Channels',
      type: 'markdown',
      file: 'cyber-mobile-world-report-part4.md',
      prev: 'page-03',
      next: 'page-05'
    },
    'page-05': {
      id: 'page-05',
      title: '05. REPORT PART V',
      subtitle: 'Telecommunication Exploits & Spoofing',
      type: 'markdown',
      file: 'cyber-mobile-world-report-part5.md',
      prev: 'page-04',
      next: 'page-06'
    },
    'page-06': {
      id: 'page-06',
      title: '06. REPORT PART VI',
      subtitle: 'Transnational Cyber Hubs & Crypto Flows',
      type: 'markdown',
      file: 'cyber-mobile-world-report-part6.md',
      prev: 'page-05',
      next: 'page-07'
    },
    'page-07': {
      id: 'page-07',
      title: '07. REPORT PART VII',
      subtitle: 'Digital Arrest Coercion Mechanics',
      type: 'markdown',
      file: 'cyber-mobile-world-report-part7.md',
      prev: 'page-06',
      next: 'page-08'
    },
    'page-08': {
      id: 'page-08',
      title: '08. REPORT PART VIII',
      subtitle: 'NCRP Protocols & Financial Intercepts',
      type: 'markdown',
      file: 'cyber-mobile-world-report-part8.md',
      prev: 'page-07',
      next: 'page-09'
    },
    'page-09': {
      id: 'page-09',
      title: '09. REPORT PART IX',
      subtitle: 'Interstate Enforcement & Police Synergy',
      type: 'markdown',
      file: 'cyber-mobile-world-report-part9.md',
      prev: 'page-08',
      next: 'page-10'
    },
    'page-10': {
      id: 'page-10',
      title: '10. REPORT PART X',
      subtitle: 'Master Forensic Synthesis & Action Matrix',
      type: 'markdown',
      file: 'cyber-mobile-world-report-part10.md',
      prev: 'page-09',
      next: 'page-00'
    }
  };

  // In-memory caching for parsed Markdown HTML to prevent redundant network fetches
  const cache = new Map();

  // Cached DOM elements
  let dashboardView = null;
  let contentLoader = null;
  let contentViewport = null;
  let loaderMessage = null;
  let breadcrumbPage = null;
  let sidebar = null;
  let sidebarOverlay = null;
  let navItems = null;

  /**
   * Initialize Core Application
   */
  document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM Nodes
    dashboardView = document.getElementById('dashboard-view');
    contentLoader = document.getElementById('content-loader');
    contentViewport = document.getElementById('content-viewport');
    loaderMessage = document.getElementById('loader-message');
    breadcrumbPage = document.getElementById('breadcrumb-page');
    sidebar = document.getElementById('main-sidebar');
    sidebarOverlay = document.getElementById('sidebar-overlay');
    navItems = document.querySelectorAll('.nav-item');

    // Configure Marked.js options if loaded
    if (window.marked) {
      window.marked.setOptions({
        gfm: true,
        breaks: true
      });
    }

    // Initialize Event Listeners
    initNavigationListeners();
    initMobileDrawer();
    initSearchFilter();
    initDashboardSearchFilter();
    initReadingProgressBar();
    initLiveDocumentSearchEngine();
    initDecryptTerminalEffect();
    initServiceWorker();
    initLiveClock();

    // Deep Link Resolution (URL Hash e.g. #page-02)
    const initialRoute = getRouteFromHash();
    window.navigateTo(initialRoute);
  });

  /**
   * Listen for popstate / hash change events
   */
  window.addEventListener('hashchange', () => {
    const route = getRouteFromHash();
    window.navigateTo(route, false);
  });

  /**
   * Helper to parse active page ID from URL Hash
   * @returns {string} Page identifier
   */
  function getRouteFromHash() {
    const hash = window.location.hash.replace('#', '').trim();
    return ROUTE_REGISTRY[hash] ? hash : 'page-00';
  }

  /**
   * Bind click events on persistent sidebar navigation buttons
   */
  function initNavigationListeners() {
    navItems.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = button.getAttribute('data-page');
        if (targetPage) {
          window.navigateTo(targetPage);
        }
      });
    });
  }

  /**
   * Primary Navigation Controller
   * Switches between the static Executive Dashboard and dynamic Markdown report parts.
   * @param {string} pageId - Target page ID (e.g. 'page-00', 'page-01')
   * @param {boolean} updateHash - Whether to push state to URL hash
   */
  window.navigateTo = async function (pageId, updateHash = true) {
    const route = ROUTE_REGISTRY[pageId] || ROUTE_REGISTRY['page-00'];

    // Update active state in sidebar navigation
    updateSidebarActiveState(route.id);

    // Update breadcrumb navigation
    if (breadcrumbPage) {
      breadcrumbPage.textContent = route.title;
    }

    // Update browser URL hash
    if (updateHash && window.location.hash !== `#${route.id}`) {
      window.history.pushState(null, '', `#${route.id}`);
    }

    // Close mobile drawer if active
    closeMobileSidebar();

    // Reset reading progress bar to 0 on route transition
    const progressBar = document.getElementById('reading-progress-bar');
    if (progressBar) progressBar.style.width = '0%';

    // Route type 1: Static Executive Dashboard
    if (route.type === 'static') {
      renderStaticDashboard();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Route type 2: Dynamic Markdown Ingestion
    if (route.type === 'markdown') {
      await renderDynamicMarkdown(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Render the Static Executive Dashboard
   */
  function renderStaticDashboard() {
    // Hide dynamic loader and markdown viewport
    if (contentLoader) contentLoader.style.display = 'none';
    if (contentViewport) contentViewport.style.display = 'none';

    // Show static dashboard with fade-in animation
    if (dashboardView) {
      dashboardView.style.display = 'block';
      triggerFadeIn(dashboardView);
      if (window.reapplyDocSearch) window.reapplyDocSearch();
      if (window.attachDecryptEffects) window.attachDecryptEffects(dashboardView);
    }
  }

  /**
   * Fetch, Parse, and Inject Markdown Content into Viewport
   * @param {Object} route - Route configuration object
   */
  async function renderDynamicMarkdown(route) {
    // Hide static dashboard and clear current viewport
    if (dashboardView) dashboardView.style.display = 'none';
    if (contentViewport) contentViewport.style.display = 'none';

    // Check memory cache first for instantaneous switching
    if (cache.has(route.file)) {
      displayRenderedContent(route, cache.get(route.file));
      return;
    }

    // Show glowing futuristic loader
    showLoader(`ACCESSING SECURE DATA SECTOR // ${route.title}`);

    try {
      // Fetch Markdown file via Fetch API
      const response = await fetch(route.file);

      // Handle HTTP error (e.g., 404 file not found)
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: Failed to retrieve ${route.file}`);
      }

      const markdownText = await response.text();

      // Check if marked.js is available
      if (typeof window.marked === 'undefined') {
        throw new Error('Markdown parser engine (marked.js) is not available.');
      }

      // Parse Markdown into semantic HTML
      const parsedHtml = window.marked.parse(markdownText);

      // Cache HTML for rapid re-navigation
      cache.set(route.file, parsedHtml);

      // Render content
      displayRenderedContent(route, parsedHtml);

    } catch (error) {
      console.error('[LOC COMMAND ROUTER ERROR]', error);
      renderErrorScreen(route, error);
    } finally {
      hideLoader();
    }
  }

  /**
   * Display Rendered HTML in Content Viewport with Navigation Bar
   * @param {Object} route - Current route object
   * @param {string} htmlContent - Parsed HTML string
   */
  function displayRenderedContent(route, htmlContent) {
    hideLoader();

    if (!contentViewport) return;

    // Construct metadata header and pagination footer
    const intelHeader = `
      <div class="doc-intel-badge">
        <span class="pulse-dot"></span>
        <span>CLASSIFIED FORENSIC DOSSIER // ${route.title}</span>
      </div>
    `;

    const prevRoute = ROUTE_REGISTRY[route.prev];
    const nextRoute = ROUTE_REGISTRY[route.next];

    const paginationFooter = `
      <div class="doc-footer-podcast">
        <div class="podcast-footer-info">
          <div class="doc-footer-podcast-text">LOC Cyber Mobile World Special Program // Official Podcast Series</div>
          <div class="doc-footer-podcast-sub">Listen on Apple Podcasts, Spotify, or subscribe via Official RSS Feed</div>
        </div>
        <div class="podcast-footer-actions">
          <a href="https://podcasts.apple.com/us/podcast/inside-billion-dollar-cyber-fraud-machine-digital-arrests-simboxes-international-scam-networks/id6810244376" target="_blank" rel="noopener noreferrer" class="apple-podcasts-btn" aria-label="Listen on Apple Podcasts">
            <svg class="apple-podcast-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.31v-2.22C5.46 17.82 3.9 15.11 3.9 12c0-4.47 3.63-8.1 8.1-8.1s8.1 3.63 8.1 8.1c0 3.11-1.56 5.82-4.46 7.09v2.22C19.36 19.86 22 16.24 22 12c0-5.52-4.48-10-10-10zm0 4c-3.31 0-6 2.69-6 6 0 2.22 1.21 4.15 3 5.19v-2.24c-1.04-.8-1.7-2.07-1.7-3.5 0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5c0 1.43-.66 2.7-1.7 3.5v2.24c1.79-1.04 3-2.97 3-5.19 0-3.31-2.69-6-6-6zm0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-1 5h2v7h-2v-7z"/>
            </svg>
            <span>Apple Podcasts</span>
          </a>
          <a href="https://open.spotify.com/show/5vPqZ9eLkZc0duBO1nFfDZ" target="_blank" rel="noopener noreferrer" class="spotify-btn" aria-label="Listen on Spotify">
            <svg class="spotify-icon" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.502 17.307c-.218.358-.683.473-1.041.254-2.855-1.745-6.449-2.14-10.681-1.173-.409.094-.816-.162-.909-.571-.094-.409.162-.816.571-.909 4.639-1.059 8.608-.614 11.806 1.344.358.218.473.684.254 1.042zm1.469-3.264c-.274.446-.86.589-1.306.314-3.268-2.008-8.25-2.592-12.114-1.419-.501.152-1.034-.134-1.186-.635-.152-.501.134-1.034.635-1.186 4.417-1.34 9.911-.69 13.657 1.62.446.275.589.86.314 1.306zm.126-3.41c-3.918-2.327-10.375-2.541-14.11-1.407-.601.182-1.239-.163-1.421-.764-.182-.601.163-1.239.764-1.421 4.29-1.302 11.418-1.049 15.932 1.631.54.321.716 1.022.396 1.562-.321.54-1.022.716-1.561.396z"/>
            </svg>
            <span>Listen on Spotify</span>
          </a>
          <a href="https://anchor.fm/s/1170c4654/podcast/rss" target="_blank" rel="noopener noreferrer" class="rss-feed-btn" aria-label="Official Podcast RSS Feed">
            <svg viewBox="0 0 24 24">
              <circle cx="6.18" cy="17.82" r="2.18"/>
              <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/>
            </svg>
            <span>RSS Feed</span>
          </a>
        </div>
      </div>
      <footer class="doc-footer-nav">
        <button type="button" class="cyber-btn secondary" onclick="window.navigateTo('${route.prev}')">
          ← ${prevRoute ? prevRoute.title : 'Previous'}
        </button>
        <button type="button" class="cyber-btn secondary" onclick="window.navigateTo('page-00')">
          Executive Dashboard ⟲
        </button>
        <button type="button" class="cyber-btn primary" onclick="window.navigateTo('${route.next}')">
          ${nextRoute ? nextRoute.title : 'Next'} →
        </button>
      </footer>
    `;

    // Inject into viewport
    contentViewport.innerHTML = intelHeader + htmlContent + paginationFooter;
    contentViewport.style.display = 'block';

    // Apply fade-in animation
    triggerFadeIn(contentViewport);

    // Reapply live document search highlighting if query active
    if (window.reapplyDocSearch) window.reapplyDocSearch();

    // Attach "Decrypting..." terminal effects to newly injected elements
    if (window.attachDecryptEffects) window.attachDecryptEffects(contentViewport);
  }

  /**
   * Render Graceful Futuristic Error Screen
   * @param {Object} route - Route configuration object
   * @param {Error} error - Error object
   */
  function renderErrorScreen(route, error) {
    if (!contentViewport) return;

    const isFileProtocol = window.location.protocol === 'file:';
    const diagnosticMessage = isFileProtocol 
      ? 'LOCAL FILE PROTOCOL DETECTED: Modern browser security restricts Fetch API on local file:// URLs. To access markdown reports offline or locally, launch a local web server (e.g. `python -m http.server` or `npx serve .`) or host on GitHub Pages, Netlify, or Vercel.'
      : 'The requested intelligence file could not be verified or retrieved from the host repository. Ensure the markdown file exists in the directory.';

    contentViewport.innerHTML = `
      <section class="cyber-error-screen fade-in-up" role="alert">
        <div class="error-badge">
          <span class="pulse-dot" style="background-color: var(--neon-magenta); box-shadow: 0 0 10px rgba(255,0,127,0.8);"></span>
          <span>CRITICAL INTEL ACCESS ERROR</span>
        </div>
        <h2 class="error-title">SYSTEM ALERT: SOURCE SECURE SECTOR OFFLINE - CHECK FILE DIRECTORY.</h2>
        <p class="error-desc">
          <strong>TARGET RESOURCE:</strong> ${route.file || 'Unknown'}<br>
          <strong>SECURITY DIAGNOSTIC:</strong> ${diagnosticMessage}
        </p>
        <div class="error-actions">
          <button type="button" class="cyber-btn primary" onclick="window.navigateTo('${route.id}')">
            Retry Connection ⟲
          </button>
          <button type="button" class="cyber-btn secondary" onclick="window.navigateTo('page-00')">
            Return to Executive Dashboard
          </button>
        </div>
      </section>
    `;

    contentViewport.style.display = 'block';
    triggerFadeIn(contentViewport);
  }

  /**
   * Show Futuristic Glowing Loader
   * @param {string} message - Optional loader message
   */
  function showLoader(message = 'ACCESSING SECURE DATA SECTOR...') {
    if (loaderMessage) loaderMessage.textContent = message;
    if (contentLoader) contentLoader.style.display = 'flex';
  }

  /**
   * Hide Futuristic Glowing Loader
   */
  function hideLoader() {
    if (contentLoader) contentLoader.style.display = 'none';
  }

  /**
   * Trigger CSS Fade-In-Up Animation
   * @param {HTMLElement} element - Target container element
   */
  function triggerFadeIn(element) {
    element.classList.remove('fade-in-up');
    // Force reflow
    void element.offsetWidth;
    element.classList.add('fade-in-up');
  }

  /**
   * Update Active State on Sidebar Buttons
   * @param {string} activePageId - Active page identifier
   */
  function updateSidebarActiveState(activePageId) {
    if (!navItems) return;

    navItems.forEach(item => {
      const page = item.getAttribute('data-page');
      if (page === activePageId) {
        item.classList.add('active');
        item.setAttribute('aria-current', 'page');
      } else {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Mobile Drawer Toggle & Overlay Management
   */
  function initMobileDrawer() {
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');

    if (mobileToggleBtn) {
      mobileToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (sidebar && sidebar.classList.contains('open')) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      });
    }

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileSidebar();
      }
    });
  }

  function openMobileSidebar() {
    if (sidebar) sidebar.classList.add('open');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Live Sidebar Search / Filter across all 11 Navigation Items
   */
  function initSearchFilter() {
    const searchInput = document.getElementById('report-search-input');
    if (!searchInput || !navItems) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      navItems.forEach(item => {
        const title = item.querySelector('.nav-item-title')?.textContent.toLowerCase() || '';
        const desc = item.querySelector('.nav-item-desc')?.textContent.toLowerCase() || '';
        const num = item.querySelector('.nav-item-num')?.textContent.toLowerCase() || '';

        if (!query || title.includes(query) || desc.includes(query) || num.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  /**
   * Live UTC Timestamp Clock
   */
  function initLiveClock() {
    const liveClockEl = document.getElementById('live-clock');
    if (!liveClockEl) return;

    function updateTime() {
      const now = new Date();
      const utcString = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      liveClockEl.textContent = utcString;
    }

    updateTime();
    setInterval(updateTime, 1000);
  }

  /**
   * Prompt 3 Addition: Global Live Interactive Filter for Executive Dashboard
   * Dynamically filters the 10 report cards as the user types keywords.
   */
  function initDashboardSearchFilter() {
    const dashSearchInput = document.getElementById('dashboard-search-input');
    const dashSearchClear = document.getElementById('dashboard-search-clear');
    const dashSearchCount = document.getElementById('dashboard-search-count');
    const reportCards = document.querySelectorAll('.report-part-card');
    const emptyState = document.getElementById('dashboard-empty-state');

    if (!dashSearchInput || !reportCards.length) return;

    function applyFilter() {
      const query = dashSearchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      reportCards.forEach(card => {
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
        const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
        const theme = (card.querySelector('.card-theme')?.textContent || '').toLowerCase();

        const isMatch = !query || keywords.includes(query) || title.includes(query) || theme.includes(query);

        if (isMatch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Update active count badge
      if (dashSearchCount) {
        if (query) {
          dashSearchCount.textContent = `${visibleCount} / 10 VOLUMES ACTIVE`;
        } else {
          dashSearchCount.textContent = '10 / 10 VOLUMES ACTIVE';
        }
      }

      // Toggle clear button
      if (dashSearchClear) {
        dashSearchClear.style.display = query ? 'block' : 'none';
      }

      // Toggle empty state
      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    dashSearchInput.addEventListener('input', applyFilter);

    if (dashSearchClear) {
      dashSearchClear.addEventListener('click', () => {
        dashSearchInput.value = '';
        applyFilter();
        dashSearchInput.focus();
      });
    }

    // Expose reset globally
    window.resetDashboardSearch = function () {
      if (dashSearchInput) {
        dashSearchInput.value = '';
        applyFilter();
        dashSearchInput.focus();
      }
    };
  }

  /* ==========================================================================
     PROMPT 4 UTILITIES: PROGRESS BAR, DOC SEARCH & DECRYPT TERMINAL EFFECT
     ========================================================================== */

  /**
   * 1. Active Reading Progress Bar
   * Dynamically tracks scroll height of the current page and updates fixed top bar.
   */
  function initReadingProgressBar() {
    const progressBar = document.getElementById('reading-progress-bar');
    if (!progressBar) return;

    let ticking = false;

    function updateProgress() {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = docHeight - winHeight;

      const percent = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) : 0;
      progressBar.style.width = `${percent}%`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  /**
   * 2. Live Document Text Search Engine with In-Page Highlighting
   * Highlights occurrences of search terms in real-time inside the active content viewport.
   */
  let docSearchMatches = [];
  let currentDocSearchIndex = -1;

  function initLiveDocumentSearchEngine() {
    const input = document.getElementById('doc-search-input');
    const counter = document.getElementById('doc-search-counter');
    const prevBtn = document.getElementById('doc-search-prev');
    const nextBtn = document.getElementById('doc-search-next');
    const closeBtn = document.getElementById('doc-search-close');

    if (!input) return;

    function getActiveContainer() {
      if (contentViewport && contentViewport.style.display !== 'none') {
        return contentViewport;
      }
      return dashboardView;
    }

    function clearHighlights() {
      const container = getActiveContainer();
      if (!container) return;

      const marks = container.querySelectorAll('mark.cyber-highlight');
      marks.forEach(mark => {
        const textNode = document.createTextNode(mark.textContent);
        mark.replaceWith(textNode);
      });
      container.normalize();

      docSearchMatches = [];
      currentDocSearchIndex = -1;
      if (counter) counter.textContent = '0/0';
    }

    function highlightOccurrences(query) {
      clearHighlights();
      if (!query || query.length < 2) return;

      const container = getActiveContainer();
      if (!container) return;

      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      const textNodes = [];

      // Collect eligible text nodes
      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentElement;
            if (parent && (
              parent.tagName === 'SCRIPT' || 
              parent.tagName === 'STYLE' || 
              parent.tagName === 'MARK' || 
              (parent.classList && (
                parent.classList.contains('decrypt-btn') || 
                parent.classList.contains('doc-footer-nav') ||
                parent.classList.contains('doc-footer-podcast') ||
                parent.classList.contains('spotify-actions-toolbar')
              ))
            )) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        },
        false
      );

      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      // Replace matching segments with <mark class="cyber-highlight">
      textNodes.forEach(textNode => {
        const val = textNode.nodeValue;
        if (regex.test(val)) {
          const frag = document.createDocumentFragment();
          let lastIdx = 0;
          regex.lastIndex = 0;
          let match;

          while ((match = regex.exec(val)) !== null) {
            if (match.index > lastIdx) {
              frag.appendChild(document.createTextNode(val.substring(lastIdx, match.index)));
            }
            const mark = document.createElement('mark');
            mark.className = 'cyber-highlight';
            mark.textContent = match[0];
            frag.appendChild(mark);
            docSearchMatches.push(mark);
            lastIdx = regex.lastIndex;
          }

          if (lastIdx < val.length) {
            frag.appendChild(document.createTextNode(val.substring(lastIdx)));
          }

          textNode.replaceWith(frag);
        }
      });

      if (docSearchMatches.length > 0) {
        goToMatch(0);
      } else {
        if (counter) counter.textContent = '0/0';
      }
    }

    function goToMatch(index) {
      if (!docSearchMatches.length) {
        if (counter) counter.textContent = '0/0';
        return;
      }

      if (currentDocSearchIndex >= 0 && docSearchMatches[currentDocSearchIndex]) {
        docSearchMatches[currentDocSearchIndex].classList.remove('current');
      }

      currentDocSearchIndex = (index + docSearchMatches.length) % docSearchMatches.length;
      const target = docSearchMatches[currentDocSearchIndex];
      target.classList.add('current');
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });

      if (counter) {
        counter.textContent = `${currentDocSearchIndex + 1}/${docSearchMatches.length}`;
      }
    }

    input.addEventListener('input', () => {
      highlightOccurrences(input.value.trim());
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToMatch(currentDocSearchIndex + 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToMatch(currentDocSearchIndex - 1);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        input.value = '';
        clearHighlights();
        input.blur();
      });
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.shiftKey) {
          goToMatch(currentDocSearchIndex - 1);
        } else {
          goToMatch(currentDocSearchIndex + 1);
        }
      } else if (e.key === 'Escape') {
        input.value = '';
        clearHighlights();
        input.blur();
      }
    });

    // Global Hotkey Ctrl+F / Cmd+F
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });

    window.reapplyDocSearch = function() {
      const q = input.value.trim();
      if (q && q.length >= 2) {
        highlightOccurrences(q);
      }
    };
  }

  /**
   * 3. "Decrypting..." Terminal Micro-Animation Effect
   * Cycles random binary/hex/cyber glyphs for 300ms before resolving to English text.
   */
  const CYBER_CHARSET = '010101ABCDEF0123456789$#%&*<>[]{}~=+/\\';

  window.runDecryptEffect = function(element, duration = 300) {
    if (!element || element.getAttribute('data-is-decrypting') === 'true') return;

    const originalText = element.getAttribute('data-original-text') || element.textContent.trim();
    if (!originalText) return;
    element.setAttribute('data-original-text', originalText);
    element.setAttribute('data-is-decrypting', 'true');
    element.classList.add('decrypting-text');

    const startTime = performance.now();
    const length = originalText.length;

    function frame(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const solvedCount = Math.floor(progress * length);

      let scrambled = '';
      for (let i = 0; i < length; i++) {
        if (originalText[i] === ' ' || originalText[i] === '\n') {
          scrambled += originalText[i];
        } else if (i < solvedCount) {
          scrambled += originalText[i];
        } else {
          scrambled += CYBER_CHARSET[Math.floor(Math.random() * CYBER_CHARSET.length)];
        }
      }

      element.textContent = scrambled;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        element.textContent = originalText;
        element.removeAttribute('data-is-decrypting');
        element.classList.remove('decrypting-text');
      }
    }

    requestAnimationFrame(frame);
  };

  function initDecryptTerminalEffect() {
    window.attachDecryptEffects = function(root = document) {
      // Decrypt buttons
      const decryptBtns = root.querySelectorAll('.decrypt-btn span');
      decryptBtns.forEach(span => {
        if (!span.hasAttribute('data-has-decrypt-listener')) {
          span.setAttribute('data-has-decrypt-listener', 'true');
          span.parentElement.addEventListener('mouseenter', () => window.runDecryptEffect(span, 300));
          span.parentElement.addEventListener('click', () => window.runDecryptEffect(span, 300));
        }
      });

      // Sidebar Navigation Item Titles
      const navTitles = root.querySelectorAll('.nav-item-title');
      navTitles.forEach(title => {
        if (!title.hasAttribute('data-has-decrypt-listener')) {
          title.setAttribute('data-has-decrypt-listener', 'true');
          title.parentElement.addEventListener('mouseenter', () => window.runDecryptEffect(title, 280));
        }
      });

      // Hero Titles
      const heroTitles = root.querySelectorAll('.hero-title, .hero-subtitle');
      heroTitles.forEach(h => {
        if (!h.hasAttribute('data-has-decrypt-listener')) {
          h.setAttribute('data-has-decrypt-listener', 'true');
          h.addEventListener('mouseenter', () => window.runDecryptEffect(h, 320));
        }
      });
    };

    window.attachDecryptEffects(document);
  }

  /**
   * 4. Service Worker Registration (Prompt 5 Offline Caching)
   */
  function initServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('[SW] Autonomous offline engine active. Scope:', reg.scope);
          })
          .catch((err) => {
            console.info('[SW] Worker registration deferred:', err);
          });
      });
    }
  }

})();

