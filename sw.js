const CACHE_NAME = 'bio-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png', 
  '/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// Instalação do Service Worker e cache dos recursos
self.addEventListener('install', event => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] Instalação concluída');
        return self.skipWaiting();
      })
  );
});

// Interceptação das requisições
self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna a resposta
        if (response) {
          console.log('[Service Worker] Usando cache para:', event.request.url);
          return response;
        }

        console.log('[Service Worker] Baixando novo recurso:', event.request.url);
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
                console.log('[Service Worker] Cacheando novo recurso:', event.request.url);
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
      .catch(error => {
        console.log('[Service Worker] Erro no fetch:', error);
        // Opcionalmente poderia retornar uma página offline aqui
      })
  );
});

// Atualização do Service Worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] Ativando...');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Se o cache não estiver na whitelist, remova-o
            console.log('[Service Worker] Excluindo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[Service Worker] Ativação concluída');
      return self.clients.claim();
    })
  );
}); 