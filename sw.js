// 引用workbox build
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// 使用cache功能
// 存任何的.js
workbox.routing.registerRoute(
  new RegExp('*\.js'),
  workbox.strategies.CacheOnly({
    cacheName: 'js-cache'
  })
);

// 存任何的html
workbox.routing.registerRoute(
  new RegExp('*\.html'),
  workbox.strategies.CacheOnly({
    cacheName: 'html-cache'
  })
);

// 存任何的css
workbox.routing.registerRoute(
  new RegExp('*\.css'),
  workbox.strategies.CacheOnly({
    cacheName: 'css-cache'
  })
);

// 存任何的images
workbox.routing.registerRoute(
  new RegExp('icons/*\.(?:png|jpg|jpeg|svg|gif)'),
  workbox.strategies.CacheOnly({
    cacheName: 'image-cache'
  })
);
// 不知道Github路徑，只好全部加入
// 存任何的.js
workbox.routing.registerRoute(
  new RegExp('/pwa_blog/*\.js'),
  workbox.strategies.CacheOnly({
    cacheName: 'js-cache-github'
  })
);

// 存任何的html
workbox.routing.registerRoute(
  new RegExp('/pwa_blog/*\.html'),
  workbox.strategies.CacheOnly({
    cacheName: 'html-cache-github'
  })
);

// 存任何的css
workbox.routing.registerRoute(
  new RegExp('/pwa_blog/*\.css'),
  workbox.strategies.CacheOnly({
    cacheName: 'css-cache-github'
  })
);

// 存任何的images
workbox.routing.registerRoute(
  new RegExp('/pwa_blog/icons/*\.(?:png|jpg|jpeg|svg|gif)'),
  workbox.strategies.CacheOnly({
    cacheName: 'image-cache-github'
  })
);
