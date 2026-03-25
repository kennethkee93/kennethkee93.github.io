// We use a new version name to trigger the browser's update check
const CACHE_NAME = 'emerald-hills-ev-SHUTDOWN-APRIL-1'; 

self.addEventListener('install', event => {
  console.log('SW: Shutting down app...');
  // Force this new "kill" worker to take over immediately
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('SW: Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Unregister itself so it doesn't run again
      return self.registration.unregister();
    }).then(() => {
      // Force all open tabs to reload to see the "Moved" HTML
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => client.navigate('/'));
      });
    })
  );
});

// Disable all fetching logic to ensure nothing is served from cache
self.addEventListener('fetch', event => {
  return; 
});
