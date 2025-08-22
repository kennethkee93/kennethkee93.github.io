const CACHE_NAME = 'emerald-hills-ev-cache-V2.0.1'; // Incrementing version to ensure update

// A list of critical static files (the "App Shell") to cache on install
const urlsToCache = [
  '/',
  '/index.html',
  // Note: We do NOT cache the Google Script URL here.
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

self.addEventListener('install', event => {
  console.log('SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Caching app shell...');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

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

// ** THE MOST IMPORTANT CHANGE IS HERE **
self.addEventListener('fetch', event => {
  const { request } = event;

  // STRATEGY 1: For API calls (to Google Scripts), use Network First.
  if (request.url.includes('script.google.com')) {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          // If we get a good response, clone it and update the cache for offline fallback.
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // If the network fails, try to serve the last known good version from the cache.
          return caches.match(request);
        })
    );
    return; // End execution for API calls
  }

  // STRATEGY 2: For all other requests (static assets), use Cache First.
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // If we have a cached version, return it immediately.
        if (cachedResponse) {
          return cachedResponse;
        }
        // Otherwise, fetch it from the network.
        return fetch(request).then(networkResponse => {
            // And cache it for next time.
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
                cache.put(request, responseToCache);
            });
            return networkResponse;
        });
      })
  );
});


self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
