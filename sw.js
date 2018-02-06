var CACHE_STATIC = 'static-v2';
var CACHE_DYNAMIC = 'dynamic-v2';

self.addEventListener('install', function (event) {

  console.log('Installing Service Worker');
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(function (cache) {
        cache.add('/');
        cache.add('/index.html');
        cache.add('/dist/build.js');
        cache.add('https://fonts.googleapis.com/css?family=Lato:300,400,700,700i');
      })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Activating Service Worker');
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !==  CACHE_STATIC && key !== CACHE_DYNAMIC) {
            console.log("SW removing old cache " + key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function (res) {
              return caches.open(CACHE_DYNAMIC)
                .then(function (cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function (err) {
              // intentionally empty
            });
        }
      })
  );
});