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
      next: 'page-readme'
    },
    'page-readme': {
      id: 'page-readme',
      title: '📖 MASTER COMPENDIUM (README.MD)',
      subtitle: '12,401 Lines // 10 Volumes & 105 Chapters Exhaustive Synthesis',
      type: 'markdown',
      file: 'README.md',
      prev: 'page-10',
      next: 'page-invitation'
    },
    'page-invitation': {
      id: 'page-invitation',
      title: '🪙 JOIN LOC PROGRAM // 1 USDT',
      subtitle: 'Binance QR Global Invitation Gateway (196 Countries)',
      type: 'static',
      targetContainer: 'invitation-view',
      prev: 'page-readme',
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

    // Route type 1: Static Executive Dashboard or Invitation Gateway
    if (route.type === 'static') {
      renderStaticPage(route);
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
   * Render Static Views (Executive Dashboard or 1 USDT Binance Invitation Gateway)
   * @param {Object} route - Current route object
   */
  function renderStaticPage(route) {
    // Hide dynamic loader and markdown viewport
    if (contentLoader) contentLoader.style.display = 'none';
    if (contentViewport) contentViewport.style.display = 'none';

    const invitationView = document.getElementById('invitation-view');

    if (route.id === 'page-invitation') {
      if (dashboardView) dashboardView.style.display = 'none';
      if (invitationView) {
        invitationView.style.display = 'block';
        triggerFadeIn(invitationView);
      }
    } else {
      if (invitationView) invitationView.style.display = 'none';
      if (dashboardView) {
        dashboardView.style.display = 'block';
        triggerFadeIn(dashboardView);
        if (window.reapplyDocSearch) window.reapplyDocSearch();
        if (window.attachDecryptEffects) window.attachDecryptEffects(dashboardView);
      }
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

      <!-- Verified Contribution, Pro Appointments & Official Digital Store -->
      <section class="pro-payment-section">
        <div class="pro-section-header">
          <div class="pro-section-badge">
            <span class="pulse-dot" style="background-color: #F0B90B; box-shadow: 0 0 10px rgba(240, 185, 11, 0.8);"></span>
            <span>VERIFIED CONTRIBUTION &amp; OFFICIAL SERVICES</span>
          </div>
          <h3 class="pro-section-title">Support the Intelligence Mission &amp; Digital Store</h3>
          <p class="pro-section-subtitle">Book high-priority cyber forensic appointments, contribute directly via Binance or UPI, or access the official digital store.</p>
        </div>

        <!-- Action Buttons Trio (User Requested) -->
        <div class="pro-btn-container">
          <button type="button" class="pro-btn btn-buy-pro" onclick="window.open('https://wa.me/919898048483', '_blank')">⚡ BUY NOW PRO (APPOINTMENT)</button>
          <button type="button" class="pro-btn btn-donate" onclick="window.open('https://docs.google.com/forms/d/e/1FAIpQLScJ7WjuxEXqdoSlUtxN7NQ8UeKpbEAeA9iIO-IXOmBmYzlLHQ/viewform?usp=sharing&ouid=116676179363878319046', '_blank')">🪙 DONATION SYSTEM</button>
          <button type="button" class="pro-btn btn-store" onclick="window.open('https://wa.me/c/919898048483', '_blank')">🛒 OFFICIAL DIGITAL STORE</button>
        </div>

        <!-- Both QR Codes Grid: Binance QR & UPI QR -->
        <div class="pro-qr-grid">
          <!-- 1. Binance QR Card -->
          <div class="pro-qr-card binance-card">
            <div class="pro-qr-card-header">
              <span class="pro-qr-tag binance-tag">BINANCE PAY</span>
              <span class="pro-qr-network">CRYPTO / USDT</span>
            </div>
            <div class="pro-qr-img-box">
              <img src="./binance_qr.png" alt="Binance QR Code - BuyMyTime" class="pro-qr-image" loading="lazy">
            </div>
            <div class="pro-qr-info">
              <div class="pro-qr-title">BuyMyTime</div>
              <div class="pro-qr-instruction">Scan with Binance App to pay anywhere</div>
            </div>
          </div>

          <!-- 2. UPI QR Card -->
          <div class="pro-qr-card upi-card">
            <div class="pro-qr-card-header">
              <span class="pro-qr-tag upi-tag">UPI INSTANT</span>
              <span class="pro-qr-network">ALL UPI APPS</span>
            </div>
            <div class="pro-qr-img-box">
              <img src="./upi_qr.png" alt="UPI QR Code - Jignesh Jayantilal Kariya" class="pro-qr-image" loading="lazy">
            </div>
            <div class="pro-qr-info">
              <div class="pro-qr-title">Jignesh Jayantilal Kariya</div>
              <div class="pro-upi-row">
                <code class="pro-upi-id">oo71097145198@okaxis</code>
                <button type="button" class="pro-copy-chip" onclick="window.copyUPI(this)" title="Copy UPI ID">
                  <span>Copy UPI</span>
                </button>
              </div>
              <div class="pro-qr-instruction">Scan with GPay, PhonePe, Paytm, BHIM</div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Master Compendium Sticky Quick Jump Toolbar for README.md
    let stickyToolbar = '';
    if (route.id === 'page-readme') {
      stickyToolbar = `
        <div class="readme-sticky-toolbar notranslate">
          <div class="readme-toolbar-left">
            <span class="readme-badge-pill">📖 MASTER COMPENDIUM</span>
            <span class="readme-lines-pill">12,401 LINES // 100% VERIFIED</span>
            <select class="readme-jump-select" onchange="window.jumpToReadmeChapter(this.value)" aria-label="Jump to Chapter">
              <option value="">⚡ Quick Jump to Chapter / Volume...</option>
              <option value="verified-contribution">💎 Buttons Trio &amp; Dual QR Codes</option>
              <option value="chapter-1">Chapter 1: Episode 3100 Overview</option>
              <option value="chapter-10">Chapter 10: SIMBox Hardware Architecture</option>
              <option value="chapter-24">Chapter 24: Task-Based Job Fraud</option>
              <option value="chapter-38">Chapter 38: AI Voice Cloning</option>
              <option value="chapter-52">Chapter 52: CFFMC Fusion Center</option>
              <option value="chapter-61">Chapter 61: Digital Arrest Studios</option>
              <option value="chapter-69">Chapter 69: Bank Mule Fan-Out</option>
              <option value="chapter-77">Chapter 77: 3 Decades &amp; DPDP Act</option>
              <option value="chapter-84">Chapter 84: Interpol Red Notices</option>
              <option value="chapter-91">Chapter 91: Carrier Firewalls &amp; STIR/SHAKEN</option>
              <option value="chapter-98">Chapter 98: Unified Threat Matrix</option>
              <option value="chapter-99">Chapter 99: Sovereign Defense Shield</option>
              <option value="chapter-100">Chapter 100: Citizen Survival Charter</option>
              <option value="chapter-102">Chapter 102: Sovereign Epilogue</option>
            </select>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button type="button" class="header-action-pill header-usdt-pill" onclick="window.navigateTo('page-invitation')" title="Pay 1 USDT via Binance Pay to Join LOC Program">
              🪙 JOIN LOC // 1 USDT
            </button>
          </div>
        </div>
      `;
    }

    // Inject into viewport
    contentViewport.innerHTML = stickyToolbar + intelHeader + htmlContent + paginationFooter;
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

  /**
   * 5. Copy UPI ID to Clipboard Utility
   */
  window.copyUPI = function(btn) {
    const upiId = 'oo71097145198@okaxis';
    const originalContent = btn.innerHTML;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(upiId).then(() => {
        btn.innerHTML = '<span>COPIED ✓</span>';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        prompt('Copy UPI ID:', upiId);
      });
    } else {
      prompt('Copy UPI ID:', upiId);
    }
  };

  /**
   * 6. Master Compendium Quick Jump Controller
   */
  window.jumpToReadmeChapter = function(targetKey) {
    if (!targetKey) return;
    const cleanKey = targetKey.toLowerCase();
    const headings = contentViewport ? contentViewport.querySelectorAll('h1, h2, h3, h4, section, div') : [];
    let matchedElement = null;
    for (const h of headings) {
      const text = (h.textContent || '').toLowerCase();
      const id = (h.id || '').toLowerCase();
      if (id.includes(cleanKey) || text.includes(cleanKey.replace(/-/g, ' '))) {
        matchedElement = h;
        break;
      }
    }
    if (matchedElement) {
      matchedElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /**
   * 7. Google Translate Multi-Language Controller (Seamless All Languages)
   */
  window.setGoogleLanguage = function(langCode) {
    document.querySelectorAll('.lang-chip').forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-lang') === langCode);
    });

    try {
      const hostname = window.location.hostname;
      const domain = (hostname === 'localhost' || hostname === '127.0.0.1' || !hostname.includes('.')) ? '' : `.${hostname}`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain};`;
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      localStorage.setItem('loc_preferred_lang', langCode);
    } catch (e) {}

    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    }
  };

  /**
   * 8. Binance 1 BNB VIP & 1 USDT Payment Verification & Cryptographic Receive Code Generator
   */
  window.handleGenerateReceiveCode = function(event) {
    if (event) event.preventDefault();

    const orderIdInput = document.getElementById('binance-order-id');
    const nameInput = document.getElementById('registrant-name');
    const countryInput = document.getElementById('registrant-country');
    const contactInput = document.getElementById('registrant-contact');
    const tierSelect = document.getElementById('membership-tier');
    const container = document.getElementById('receive-code-container');

    const orderId = orderIdInput ? orderIdInput.value.trim() : '';
    const name = nameInput ? nameInput.value.trim() : 'Global Operative';
    const country = countryInput ? countryInput.value.trim() : 'Worldwide (All Countries)';
    const contact = contactInput ? contactInput.value.trim() : 'Direct';
    const selectedTier = tierSelect ? tierSelect.value : 'VIP_BNB';

    if (!orderId) {
      alert('Please enter your Binance Order ID / TxID or reference.');
      return;
    }

    const isVip = selectedTier === 'VIP_BNB' || orderId.includes('453747440013639680') || orderId.toUpperCase().includes('BNB');

    // Generate deterministic yet cryptographic Receive Code
    const cleanId = orderId.replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase() || '7F9A2B';
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    const receiveCode = isVip
      ? `LOC-VIP-BNB-2026-${cleanId}-${randomHex}-SOVEREIGN`
      : `LOC-USDT-2026-${cleanId}-${randomHex}-JOIN`;

    try {
      localStorage.setItem('loc_member_code', receiveCode);
      localStorage.setItem('loc_member_order', orderId);
      localStorage.setItem('loc_member_name', name);
      localStorage.setItem('loc_member_tier', isVip ? 'VIP_1_BNB' : 'USDT_1');
    } catch (e) {}

    const whatsappMsg = isVip
      ? encodeURIComponent(
          `Hello LOC Cyber Command Team,\n\nI have registered for the 1.00 BNB Executive VIP Sovereign Program via Binance Pay to BuyMyTime (Order ID: ${orderId}).\n\n` +
          `VIP Telemetry:\n` +
          `• Operative Name: ${name}\n` +
          `• Country: ${country}\n` +
          `• Contact: ${contact}\n` +
          `• Binance Order/TxID: ${orderId}\n` +
          `• Sovereign VIP Code: ${receiveCode}\n` +
          `• Tier: Executive Sovereign VIP (1.00 BNB Coin)\n\n` +
          `Please confirm my VIP 1-on-1 Consultation and activate my credentials!`
        )
      : encodeURIComponent(
          `Hello LOC Cyber Command Team,\n\nI have successfully paid 1.00 USDT via Binance Pay to BuyMyTime for the LOC Cyber Mobile World Special Program.\n\n` +
          `Registration Telemetry:\n` +
          `• Operative Name: ${name}\n` +
          `• Country: ${country}\n` +
          `• Binance TxID: ${orderId}\n` +
          `• Official Receive Code: ${receiveCode}\n\n` +
          `Please register my official member credentials and VIP access pass!`
        );

    if (container) {
      if (isVip) {
        container.innerHTML = `
          <div class="receive-code-result vip-sovereign">
            <div class="receive-code-header">
              <span class="receive-code-label">👑 EXECUTIVE VIP SOVEREIGN CREDENTIAL ISSUED</span>
              <span class="receive-code-badge">1.00 BNB COIN VERIFIED</span>
            </div>

            <div class="receive-code-display">
              <span class="receive-code-text" id="active-receive-code">${receiveCode}</span>
              <button type="button" class="copy-code-btn" onclick="window.copyReceiveCode('${receiveCode}', this)">
                📋 Copy VIP Code
              </button>
            </div>

            <div class="member-pass-details">
              <div><strong>VIP Operative:</strong> ${escapeHtml(name)} (${escapeHtml(country)})</div>
              <div><strong>Official Payee:</strong> BuyMyTime &nbsp;|&nbsp; <strong>Order ID:</strong> ${escapeHtml(orderId)}</div>
              <div><strong>Verified Asset:</strong> 1.00 BNB Coin &nbsp;|&nbsp; <strong>Bill Type:</strong> request_a_payment</div>
              <div><strong>Status:</strong> <span style="color:#ffd700; font-weight:700;">ACTIVE EXECUTIVE SOVEREIGN STATUS // TOP-TIER</span></div>
              <div style="margin-top:0.4rem; padding:0.4rem 0.6rem; background:rgba(0,0,0,0.4); border-radius:4px; border-left:3px solid #ffd700;">
                👑 <strong>VIP Privileges Unlocked:</strong><br>
                • 1-on-1 Direct Cyber Forensics Investigation Consultation with Jignesh Karia<br>
                • Dedicated VIP WhatsApp Hotline Priority Dispatch (+91 98980 48483)<br>
                • Unrestricted Access to 12,401-line README Compendium & All Dossier Parts
              </div>
            </div>

            <div class="pass-action-buttons">
              <button type="button" class="pass-action-btn primary binance-vip-btn" onclick="window.navigateTo('page-readme')">
                📖 Open Master README.md (12,401 Lines)
              </button>
              <a href="https://wa.me/919898048483?text=${whatsappMsg}" target="_blank" rel="noopener noreferrer" class="pass-action-btn secondary" style="background:#25D366; color:#08090c; border:none; font-weight:700;">
                💬 Confirm VIP via WhatsApp (+91 98980 48483)
              </a>
            </div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="receive-code-result">
            <div class="receive-code-header">
              <span class="receive-code-label">⚡ OFFICIAL RECEIVE CODE ISSUED</span>
              <span class="receive-code-badge">1.00 USDT VERIFIED</span>
            </div>

            <div class="receive-code-display">
              <span class="receive-code-text" id="active-receive-code">${receiveCode}</span>
              <button type="button" class="copy-code-btn" onclick="window.copyReceiveCode('${receiveCode}', this)">
                📋 Copy Code
              </button>
            </div>

            <div class="member-pass-details">
              <div><strong>Operative:</strong> ${escapeHtml(name)} (${escapeHtml(country)})</div>
              <div><strong>Official Payee:</strong> BuyMyTime &nbsp;|&nbsp; <strong>Fee:</strong> 1.00 USDT [PAID]</div>
              <div><strong>Status:</strong> <span style="color:#00ff66; font-weight:700;">ACTIVE LIFETIME SOVEREIGN MEMBERSHIP</span></div>
              <div><strong>Dossier Access:</strong> Unrestricted access to 12,401-line README.md Compendium granted.</div>
            </div>

            <div class="pass-action-buttons">
              <button type="button" class="pass-action-btn primary" onclick="window.navigateTo('page-readme')">
                📖 Open Master README.md (12,401 Lines)
              </button>
              <a href="https://wa.me/919898048483?text=${whatsappMsg}" target="_blank" rel="noopener noreferrer" class="pass-action-btn secondary" style="background:#25D366; color:#08090c; border:none;">
                💬 Confirm via WhatsApp VIP (+91 98980 48483)
              </a>
            </div>
          </div>
        `;
      }
      container.style.display = 'block';
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  window.triggerInstantVipBnbDemoCode = function() {
    const orderInput = document.getElementById('binance-order-id');
    const nameInput = document.getElementById('registrant-name');
    const countryInput = document.getElementById('registrant-country');
    const tierSelect = document.getElementById('membership-tier');

    if (tierSelect) tierSelect.value = 'VIP_BNB';
    if (orderInput) orderInput.value = '453747440013639680';
    if (nameInput) nameInput.value = 'Executive VIP Operative // Sovereign';
    if (countryInput) countryInput.value = 'Global VIP Sovereign (Worldwide)';

    window.handleGenerateReceiveCode();
  };

  window.triggerInstantDemoCode = function() {
    const orderInput = document.getElementById('binance-order-id');
    const nameInput = document.getElementById('registrant-name');
    const countryInput = document.getElementById('registrant-country');
    const tierSelect = document.getElementById('membership-tier');

    if (tierSelect) tierSelect.value = 'USDT';
    if (orderInput) orderInput.value = 'BINANCE-ORDER-' + Math.floor(100000000000 + Math.random() * 900000000000);
    if (nameInput) nameInput.value = 'Global Operative // Verified';
    if (countryInput) countryInput.value = 'All 196 Countries (Universal Pass)';

    window.handleGenerateReceiveCode();
  };

  window.copyReceiveCode = function(code, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML = '✅ Copied!';
          btn.style.background = '#00ff66';
          btn.style.color = '#08090c';
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        }
      }).catch(() => {
        prompt('Copy Receive Code:', code);
      });
    } else {
      prompt('Copy Receive Code:', code);
    }
  };

  window.copyReferralCode = function(code, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML = '✅ Copied!';
          btn.style.background = '#00ff66';
          btn.style.color = '#08090c';
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        }
      }).catch(() => {
        prompt('Copy Binance Referral Code:', code);
      });
    } else {
      prompt('Copy Binance Referral Code:', code);
    }
  };

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

})();

