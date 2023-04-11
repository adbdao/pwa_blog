// 引用workbox build
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

// 使用cache功能
// 存任何的.js
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.cacheFirst()
);

// 存任何的css
workbox.routing.registerRoute(
  new RegExp('.*\.css'),
  workbox.strategies.cacheFirst({
    cacheName: 'css-cache'
  })
);

// 存任何的images
workbox.routing.registerRoute(
  new RegExp('icons/*\.(?:png|jpg|jpeg|svg|gif)'),
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache'
  })
);

// ==============

// 使用precache功能，在offline下也可以執行
// 要存進cache storage裡的檔案清單
var cacheFiles = [
    // "assets/bootstrap.bundle.min.js",
    // "assets/bootstrap.min.css",
    // "assets/bootstrap.min.js",
    // "assets/jquery-3.3.1.slim.min.js",
    // "assets/test.jpg",
    {
      url: './index.html',
      revision: '00000003' // 加revision，版本改了以後，sw.js 在 application 上會更新
    }
  ];
  workbox.precaching.precacheAndRoute(cacheFiles);