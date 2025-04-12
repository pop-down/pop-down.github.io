// 캐시 버전 관리 (업데이트 시 버전 번호 변경)
const CACHE_VERSION = 'v0.1.0';
const CACHE_NAME = `zigzag-cache-${CACHE_VERSION}`;
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json'
];

// 서비스 워커 설치 및 캐싱
self.addEventListener('install', event => {
  console.log(`[Service Worker] 새 버전 ${CACHE_VERSION} 설치 중`);
  
  // 대기 상태 없이 즉시 활성화 (skipWaiting)
  self.skipWaiting();
  
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

// 오래된 캐시 정리 및 새 서비스 워커 활성화
self.addEventListener('activate', event => {
  console.log(`[Service Worker] 버전 ${CACHE_VERSION} 활성화 중`);
  
  const cacheWhitelist = [CACHE_NAME];
  
  // 클라이언트 제어 즉시 획득 (새로고침 필요 없음)
  self.clients.claim();
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log(`[Service Worker] 오래된 캐시 삭제: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // 모든 클라이언트에게 업데이트 알림
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'UPDATE_AVAILABLE',
            version: CACHE_VERSION
          });
        });
      });
    })
  );
});

// 메시지 수신 처리 (클라이언트에서 서비스 워커로 메시지 보낼 경우)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
