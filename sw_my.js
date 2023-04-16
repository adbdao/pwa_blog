// "start_url": "./?source=pwa",

// window.addEventListener('load', function () {
//   var btnSave = document.getElementById('addPWA')
//   var savedPrompt

//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('sw_my.js')
//       .then(function (registration) {
//         console.log('ServiceWorker registration successful with scope:', registration.scope)
//         // alert('安裝成功')
//       }).catch(function (err) {
//         console.log('ServiceWorker registration failed:', err)
//         // alert('安裝失敗，請重新安裝')
//       })
//   }

//   window.addEventListener('beforeinstallprompt', function (e) {
//     e.preventDefault()
//     btnSave.removeAttribute('disabled')
//     savedPrompt = e
//     return false
//   })

//   btnSave.addEventListener('click', function () {
//     if (savedPrompt !== undefined) {
//       savedPrompt.prompt()

//       savedPrompt.userChoice.then(function (result) {

//         if (result.outcome == 'dismissed') {
//           //   alert('使用者關閉主營幕')
//           console.log('User dismissed homescreen install')
//         } else {
//           // alert('使用者加入主營幕')
//           console.log('User added to homescreen')
//         }
//         savedPrompt = null
//       })
//     }
//   })

// })
// ========================

const cacheName = 'nfPWA';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        'index.html',
        'css1.css',
        'nf.js',
        'sw.js',
        'blog.webmanifest',
        'icons/sd48.png',
        'icons/sd192.png',
        'icons/sd512.png',
        // 不知道Github路徑，只好全部加入
        '/pwa_blog/index.html',
        '/pwa_blog/css1.css',
        '/pwa_blog/nf.js',
        '/pwa_blog/sw.js',
        '/pwa_blog/blog.webmanifest',
        '/pwa_blog/icons/sd48.png',
        '/pwa_blog/icons/sd192.png',
        '/pwa_blog/icons/sd512.png'
      ]))
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response
        }
        return fetch(event.request)
      }))
});