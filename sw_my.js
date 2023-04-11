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

const cacheName = 'helloWorld';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        'https://virucana.blogspot.com/2023/02/blog-post.html',
        'index.html',
        'css1.css',
        'sw_my.js',
        'manifest.json',
        'icons/佛4.png',
        'icons/virucana192.png',
        'icons/virucana512.png'
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