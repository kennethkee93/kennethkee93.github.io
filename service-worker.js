// service-worker.js
// Versioned cache for static assets and an offline snapshot for bookings (Option A)
const CACHE_NAME = 'emerald-hills-ev-cache-V2.1.2';
const OFFLINE_BOOKINGS_URL = '/offline-bookings.json';

// App shell + external libs to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html', // optional offline page
  OFFLINE_BOOKINGS_URL,
  // Fonts/libraries
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
    caches.open(CACHE_NAME).then(async cache => {
      console.log('SW: Caching app shell...');
      // Ensure the offline bookings snapshot exists (initially empty array)
      const initialOfflineBookings = new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put(OFFLINE_BOOKINGS_URL, initialOfflineBookings);
      // Add other assets (ignore failures for individual external resources)
      await cache.addAll(urlsToCache.filter(Boolean));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('SW: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(name => {
        if (name !== CACHE_NAME) {
          console.log('SW: Deleting old cache:', name);
          return caches.delete(name);
        }
      })
    )).then(() => self.clients.claim())
  );
});

// Helper: fetch with timeout
function fetchWithTimeout(request, timeout = 8000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Network timeout')), timeout);
    fetch(request).then(response => {
      clearTimeout(timer);
      resolve(response);
    }).catch(err => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

// Strategy: Network-first for bookings API (but do NOT cache the API URL itself)
// Instead store a dedicated offline snapshot at OFFLINE_BOOKINGS_URL
async function handleBookingsRequest(request) {
  try {
    const networkResponse = await fetchWithTimeout(request, 8000);
    // Only accept OK responses (200-299)
    if (!networkResponse || !networkResponse.ok) throw new Error('Network response not ok');

    // Clone response for reading & caching snapshot
    const responseClone = networkResponse.clone();
    try {
      const jsonText = await responseClone.text();
      // Store a snapshot under a dedicated key so we never return stale API responses
      const snapshotResponse = new Response(jsonText, { headers: { 'Content-Type': 'application/json' } });
      const cache = await caches.open(CACHE_NAME);
      await cache.put(OFFLINE_BOOKINGS_URL, snapshotResponse);
    } catch (e) {
      // If parsing/caching snapshot fails, log but continue returning network response
      console.warn('SW: Failed to cache bookings snapshot:', e);
    }

    return networkResponse;
  } catch (err) {
    // Network failed — return the cached snapshot if available
    console.warn('SW: Bookings network failed, serving snapshot. Error:', err && err.message);
    const cache = await caches.open(CACHE_NAME);
    const cachedSnapshot = await cache.match(OFFLINE_BOOKINGS_URL);
    if (cachedSnapshot) return cachedSnapshot;

    // As a final fallback, try any cached matching request (unlikely) or an offline page
    const fallback = await cache.match('/offline.html');
    return fallback || new Response(JSON.stringify([]), { headers: { 'Content-Type': 'application/json' } });
  }
}

// Network-only for other script.google.com calls (we don't want to cache arbitrary API responses)
async function handleScriptRequest(request) {
  try {
    return await fetchWithTimeout(request, 8000);
  } catch (err) {
    console.warn('SW: Script network failed:', err && err.message);
    // No caching of this request; try to return a cached generic response if available
    const cache = await caches.open(CACHE_NAME);
    return cache.match('/offline.html') || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

self.addEventListener('fetch', event => {
  const { request } = event;

  // Navigation requests -> serve index.html for SPA fallback (network first)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.match('/index.html') || cache.match('/offline.html');
      })
    );
    return;
  }

  // API requests to Google Apps Script
  if (request.url.includes('script.google.com')) {
    // If this is the bookings fetch, use network-first but cache snapshot under OFFLINE_BOOKINGS_URL
    if (request.url.includes('action=getBookings')) {
      event.respondWith(handleBookingsRequest(request));
      return;
    }
    // For other Google Script calls, do network-only (don't cache the responses)
    event.respondWith(handleScriptRequest(request));
    return;
  }

  // For other requests, use Cache First for static assets
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then(networkResponse => {
        // Don't cache opaque responses (e.g. third-party without CORS) to avoid poisoning cache
        if (!networkResponse || networkResponse.type === 'opaque') return networkResponse;
        // Cache the resource for future use
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, responseToCache));
        return networkResponse;
      }).catch(async () => {
        // Network failed: fallback to offline page or a cached image/icon
        const cache = await caches.open(CACHE_NAME);
        return cache.match('/offline.html') || cache.match('/favicon.ico') || new Response('Offline', { status: 503 });
      });
    })
  );
});

// Listen for messages from the page to perform actions (skipWaiting or manually update offline snapshot)
self.addEventListener('message', event => {
  const data = event.data || {};
  if (data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  if (data.action === 'updateOfflineBookings' && data.bookings) {
    // Accept bookings as an Array or JSON string
    (async () => {
      try {
        const bookingsJson = typeof data.bookings === 'string' ? data.bookings : JSON.stringify(data.bookings);
        const snapshotResponse = new Response(bookingsJson, { headers: { 'Content-Type': 'application/json' } });
        const cache = await caches.open(CACHE_NAME);
        await cache.put(OFFLINE_BOOKINGS_URL, snapshotResponse);
        console.log('SW: Offline bookings snapshot updated via message.');
      } catch (e) {
        console.warn('SW: Failed to update offline bookings via message', e);
      }
    })();
  }
});
