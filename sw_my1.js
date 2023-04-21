// 要每次更換名稱，才能緩存更新
const cacheName = 'nf1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
    //   只要有一個載入失敗，就全部失敗，所以盡量少
        '/pwa_blog/index.html',
        // 'css1.css',
        // 'nf.js',
        // 'sw.js',
        // 'blog.webmanifest',
        // 'icons/sd48.png',
        // 'icons/sd192.png',
        '/pwa_blog/icons/sd512.png'
        // 不知道Github路徑，只好全部加入
        // '/pwa_blog/index.html',
        // '/pwa_blog/css1.css',
        // '/pwa_blog/nf.js',
        // '/pwa_blog/sw.js',
        // '/pwa_blog/blog.webmanifest',
        // '/pwa_blog/icons/sd48.png',
        // '/pwa_blog/icons/sd192.png',
        // '/pwa_blog/icons/sd512.png'
      ]))
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then(function (response) {
        if (response) {
          return response
        }

        var requestToCache = event.request.clone()

        return fetch(requestToCache).then(
          function (response) {
            if (!response || response.status !== 200) {
              return response
            }

            var requestToCache = response.clone()

            cache.open(cacheName)
              .then(function (cache) {
                cache.put(requestToCache, requestToCache)
              })
            return response
          }
        )
      })
  )
});