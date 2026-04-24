// Sjalavard Soul Care — service worker
// Timestamped cache name means every deploy invalidates the previous one on
// activate. Fetch is pass-through so Netlify cache-control headers rule.
const CACHE = "sjalavard-v" + Date.now();

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    Promise.all([
      caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (k) { return caches.delete(k); }));
      }),
      self.clients.claim()
    ])
  );
});

self.addEventListener("fetch", function (e) {
  return;
});
