// My service worker

workbox.core.setCacheNameDetails({ prefix: 'se-learning' })

self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

self.addEventListener('notificationclick', event => {
  if (event.action === 'close') {
    event.notification.close()
  } else {
    event.waitUntil(
      self.clients.matchAll().then(clients => {
        if (clients.length) {
          // check if at least one tab is already open
          clients[0].focus()
        } else {
          self.clients.openWindow('/')
          event.notification.close()
        }
      })
    )
  }
})
