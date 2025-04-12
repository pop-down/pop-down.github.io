const CACHE_NAME = 'zigzag-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json'
];

// 서비스 워커 설치 및 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('캐시 열기 성공');
        return cache.addAll(urlsToCache);
      })
  );
});

// 네트워크 요청을 가로채서 캐시된 응답 반환
self.addEventListener('fetch', event => {
  // HTTP나 HTTPS 요청만 캐싱
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 있으면 캐시에서 반환
        if (response) {
          return response;
        }
        
        // 캐시에 없으면 네트워크 요청 후 캐싱
        return fetch(event.request).then(
          response => {
            // 유효한 응답이 아니면 그냥 응답만 반환
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 응답을 복제 (스트림은 한 번만 사용 가능)
            const responseToCache = response.clone();
            
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

// 오래된 캐시 정리
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
