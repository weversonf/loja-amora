const CACHE_NAME = 'amora-adm-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e faz o cache dos arquivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições (se a internet falhar, ele tenta carregar a interface do cache)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
