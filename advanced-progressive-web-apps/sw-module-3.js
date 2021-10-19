/* Code snippets from Module 3 of Advanced Progressive Web Apps Pluralsight Course: Service Worker */

//TODO: Uncomment next lines in case you want navigation preload
// self.addEventListener('activate', event => {
//   event.waitUntil(async function() {
//     if (self.registration.navigationPreload) {
//       // Enable navigation preload
//       await self.registration.navigationPreload.enable();
//     }
//   }());
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(async function() {
//     const responseInCache = await caches.match(event.request);
//     if (responseInCache) return responseInCache;
//     const responseNavPreload = await event.preloadResponse;
//     if (responseNavPreload) return responseNavPreload;
//     return fetch(event.request);
//   }());
// });

/* PUSH */
self.addEventListener('push', event => {
    track('push', 'push has been received with ' + event.data.text())
    event.waitUntil(
      self.registration.showNotification('Title',
        { 
            body: event.data.text(),
            icon: "/icon.png"
        }
      )
    );
});

/* BACKGROUND SYNC */
self.addEventListener('sync', event => {
   if (event.tag == 'tag-name') {
        track('background-sync', 'sync fired in the background')
       //TODO: event.waitUntil(syncOperation());
   }
});
    

/* BACKGROUND PERIODIC SYNC */
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'sync-tag') {
        track('background-periodic-sync', 'periodic sync fired in the background')
       //TODO: event.waitUntil(doPeriodicSyncOperation());
    }
  });

/* BACKGROUND FETCH */
self.addEventListener('backgroundfetchsuccess', async event => {
    track('background-fetch', 'file(s) downloaded in the background')
    const downloadedFiles = await event.registration.matchAll();
});
  
self.addEventListener('backgroundfetchclick', async event => {
    track('background-fetch', 'you clicked on notification')
    clients.openWindow('/');
});
  
self.addEventListener('backgroundfetchfailure', async event => {
    track('background-fetch', 'file(s) NOT downloaded')
});