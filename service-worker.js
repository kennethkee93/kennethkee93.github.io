const CACHE_NAME = 'emerald-hills-ev-cache-v2.4'; // Match your app version

// A list of critical files to cache on install
const urlsToCache = [
  '/',
  '/index.html',
  'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
  'https://cdn.jsdelivr.net/npm/hammerjs@2.0.8/hammer.min.js',
  'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.18/index.global.min.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js',
  '/assets/images/favicons/site.webmanifest',
  '/assets/images/favicons/apple-touch-icon.png',
  '/assets/images/favicons/favicon-32x32.png',
  '/assets/images/favicons/favicon-16x16.png',
  '/favicon.ico'
];

// 1. Install the service worker and cache critical assets
self.addEventListener('install', event => {
  console.log('SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Caching core assets...');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Activate the service worker and clean up old caches
self.addEventListener('activate', event => {
  console.log('SW: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Intercept network requests
self.addEventListener('fetch', event => {
  // THE CRITICAL FIX IS HERE:
  // We only apply caching logic to GET requests.
  // For POST requests, we do nothing and let them go directly to the network.
  if (event.request.method !== 'GET') {
    // Do not intercept the request. Let it pass through.
    return;
  }

  // For GET requests, use a "cache first, then network" strategy.
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // If the response is in the cache, return it
        if (cachedResponse) {
          // console.log('SW: Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // If it's not in the cache, fetch it from the network
        // console.log('SW: Fetching from network:', event.request.url);
        return fetch(event.request).then(
          networkResponse => {
            // And cache the new response for next time
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return networkResponse;
          }
        );
      })
      .catch(error => {
        // Handle fetch errors, e.g., by returning a fallback page
        console.error('SW: Fetch failed:', error);
        // You could return a custom offline page here if you had one
      })
  );
});

// 4. Listen for the 'skipWaiting' message from the front-end
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
