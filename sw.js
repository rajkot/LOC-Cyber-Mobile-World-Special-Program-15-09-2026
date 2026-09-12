/**
 * ==============================================================================
 * LOC CYBER COMMAND PORTAL - SERVICE WORKER (sw.js)
 * Offline First Cache Strategy for Autonomous & Air-Gapped Environments
 * ==============================================================================
 */

const CACHE_NAME = 'loc-cyber-portal-v1.6';

// Core static assets, media artwork, feed, and intelligence corpus to pre-cache
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './podcast_cover.png',
  './binance_qr.png',
  './binance_1bnb_qr.png',
  './binance_1bnb_qr_square.png',
  './upi_qr.png',
  './rss.xml',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  './README.md',
  './cyber-mobile-world-report-part1.md',
  './cyber-mobile-world-report-part2.md',
  './cyber-mobile-world-report-part3.md',
  './cyber-mobile-world-report-part4.md',
  './cyber-mobile-world-report-part5.md',
  './cyber-mobile-world-report-part6.md',
  './cyber-mobile-world-report-part7.md',
  './cyber-mobile-world-report-part8.md',
  './cyber-mobile-world-report-part9.md',
  './cyber-mobile-world-report-part10.md'
];

/**
 * Service Worker Installation Phase
 * Resiliently pre-caches all essential static code, media, and all 10 markdown dossier volumes.
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching LOC Cyber Portal assets & intelligence files...');
        return Promise.allSettled(
          STATIC_ASSETS.map((url) =>
            cache.add(url).catch((err) => {
              console.warn('[SW] Non-fatal pre-cache skip:', url, err);
            })
          )
        );
      })
  );
});

/**
 * Service Worker Activation Phase
 * Purges obsolete cache generations to maintain storage hygiene.
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removing deprecated cache storage:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/**
 * Listen for manual skip-waiting trigger
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * Service Worker Fetch Interception
 * Network-First for core code (.html, .js, .css) to guarantee immediate freshness.
 * Cache-First with Background Network Revalidation for assets & markdown.
 */
self.addEventListener('fetch', (event) => {
  // Only handle HTTP/HTTPS GET requests; ignore chrome-extension:// and non-GET
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);
  const isCodeOrPage = event.request.mode === 'navigate' ||
                       url.pathname.endsWith('.html') ||
                       url.pathname.endsWith('.js') ||
                       url.pathname.endsWith('.css') ||
                       url.pathname === '/' ||
                       url.pathname.endsWith('/');

  // Network-First for Core Code (Ensures users ALWAYS get the latest UI and language dropdown)
  if (isCodeOrPage) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const resClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline, fallback to cache
          return caches.match(event.request).then((cached) => {
            if (cached) return cached;
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html').then((idx) => idx || caches.match('./'));
            }
            return new Response('Network unavailable', { status: 503, statusText: 'Service Unavailable' });
          });
        })
    );
    return;
  }

  // Cache-First for static assets (images, fonts, markdown files)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Asynchronously revalidate in background
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const resToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resToCache));
            }
          })
          .catch(() => {});

        return cachedResponse;
      }

      // Not in cache: fetch from network
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch((fetchError) => {
          console.warn('[SW] Offline fetch fallback:', event.request.url);
          throw fetchError;
        });
    })
  );
});
