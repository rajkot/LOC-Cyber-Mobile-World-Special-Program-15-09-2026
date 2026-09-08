# LOC Cyber Command Portal - Production Deployment & Optimization Guide

This repository contains an ultra-modern, zero-dependency static Single-Page Application (SPA) designed for the **LOC Cyber Mobile World Special Program** (Episode 3100 forensic archive).

---

## 🚀 Architectural Profile

- **Stack**: Pure Semantic HTML5, Vanilla CSS3 (Custom Design System), Modern Vanilla JavaScript (ES6+), Marked.js (via CDN / Offline Worker).
- **Build Step**: **None required**. Zero bundling, zero compilation, 100% instant execution.
- **Offline Capability**: Progressive Web App (PWA) ready via `sw.js` Service Worker with Cache-First asset and markdown dossier ingestion.
- **Security Audit**: Pre-configured Content Security Policy (CSP), frame protection, and strict origin referrer controls.

---

## 🌐 Cloud Deployment Options

### Option 1: GitHub Pages (Free & Instant)
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy LOC Cyber Command Portal"
   git push origin main
   ```
2. Navigate to your GitHub Repository:
   - **Settings** → **Pages**
   - **Source**: Select `Deploy from a branch`
   - **Branch**: `main` / Folder: `/ (root)`
   - Click **Save**.
3. Your portal will be live at:
   `https://<username>.github.io/<repository-name>/`

---

### Option 2: Vercel
Configuration file [`vercel.json`](./vercel.json) is pre-configured with security headers and service worker cache invalidation.

**Deploy via CLI:**
```bash
npx vercel --prod
```

**Deploy via Web Dashboard:**
1. Import this GitHub repository into Vercel.
2. Framework Preset: **Other**.
3. Build Command: Leave blank.
4. Output Directory: Leave blank (`.` root).
5. Click **Deploy**.

---

### Option 3: Netlify
Configuration file [`netlify.toml`](./netlify.toml) is pre-configured.

**Deploy via CLI:**
```bash
npx netlify deploy --prod --dir=.
```

**Deploy via Web Dashboard:**
1. Log into Netlify and drag-and-drop the project folder directly into the dashboard.
2. Or connect your Git repository (Publish directory: `.`).

---

### Option 4: Cloudflare Pages
1. Go to **Cloudflare Dashboard** → **Workers & Pages** → **Create application** → **Pages**.
2. Connect your Git repository.
3. Build settings:
   - **Framework preset**: None
   - **Build command**: (Leave empty)
   - **Build output directory**: `/`
4. Click **Save and Deploy**.

---

## 💻 Local & Air-Gapped Network Testing

> [!NOTE]
> Modern web browsers restrict the `fetch()` API on `file:///` URLs due to local file origin security policies (CORS). For local inspection, serve the directory via any lightweight local HTTP server:

```bash
# Option A: Python 3 (Installed by default on most systems)
python -m http.server 8000

# Option B: Node.js / npx
npx serve .

# Option C: PHP Built-in Server
php -S localhost:8000
```
Open **`http://localhost:8000`** in your browser.

---

## ⚡ Performance & Security Checklist

| Feature | Implementation | Benefit |
|---|---|---|
| **Fluid Typography** | `clamp(min, preferred, max)` | Seamless scaling from 5" mobile phones to 32" 4K displays |
| **Font Optimization** | `font-display: swap` + `<link rel="preconnect">` | Eliminates Flash of Invisible Text (FOIT) |
| **Content Security Policy** | Strict `meta http-equiv="Content-Security-Policy"` | Hardens against XSS and unauthorized resource injection |
| **Offline Cache** | `sw.js` Cache-First Service Worker | Caches HTML, CSS, JS, marked.js, and all 10 `.md` files |
| **Zero-Asset Favicon** | Data URI SVG Favicon | Zero network round-trips for site icon |
| **Path Portability** | Universal relative pathing (`./`) | Runs under subpaths without root path breakage |
