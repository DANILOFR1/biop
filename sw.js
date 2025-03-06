const CACHE_NAME = 'bio-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// Instalação do Service Worker e cache dos recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptação das requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna a resposta
        if (response) {
          return response;
        }

        // Faz uma cópia da requisição, pois é consumível apenas uma vez
        return fetch(event.request).then(
          response => {
            // Retorna se a resposta não for válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone a resposta
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Atualização do Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Se o cache não estiver na whitelist, remova-o
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 