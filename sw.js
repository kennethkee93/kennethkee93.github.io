/* sw-kill.js - Clears PWA cache and unregisters */
self.addEventListener('install', () => {
  self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      return self.registration.unregister();
    }).then(() => {
      // Force any open tabs to reload to the new index.html
      return self.clients.matchAll().then((clients) => {
        clients.forEach(client => client.navigate('/'));
      });
    })
  );
});