const CACHE_NAME = 'emeraldevbooking-pwa-cache-v1.4';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/images/favicons/site.webmanifest',
  '/assets/images/favicons/apple-touch-icon.png',
  '/assets/images/favicons/favicon-32x32.png',
  '/assets/images/favicons/favicon-16x16.png',
  '/favicon.ico'
];

// Install event: cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  // Remove self.skipWaiting() - let it wait for user action
});

// Activate event: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  // Take control of all clients immediately after activation
  self.clients.claim();
});

// Fetch event: serve cached file if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Clone and store in cache
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request);
      })
  );
});

// Listen for skip waiting message from main thread
self.addEventListener('message', event => {
  if (event.data?.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
