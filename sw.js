/**
 * ==============================================================================
 * LOC CYBER COMMAND PORTAL - SERVICE WORKER (sw.js)
 * Offline First Cache Strategy for Autonomous & Air-Gapped Environments
 * ==============================================================================
 */

const CACHE_NAME = 'loc-cyber-portal-v1.1';

// Core static assets, media artwork, feed, and intelligence corpus to pre-cache
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './podcast_cover.png',
  './rss.xml',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
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
      .then(() => self.skipWaiting())
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
 * Service Worker Fetch Interception
 * Cache-First with Background Network Revalidation for instantaneous offline reading.
 */
self.addEventListener('fetch', (event) => {
  // Only handle HTTP/HTTPS GET requests; ignore chrome-extension:// and non-GET
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 1. Return immediately from cache if available
      if (cachedResponse) {
        // Asynchronously revalidate from network to keep content fresh
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const resToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, resToCache);
              });
            }
          })
          .catch(() => {
            // Offline: silent ignore network errors
          });

        return cachedResponse;
      }

      // 2. Not in cache: fetch from network and cache for subsequent offline access
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
          // Return generic error or cached index if HTML navigation
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html').then((match) => match || caches.match('./'));
          }
          throw fetchError;
        });
    })
  );
});
