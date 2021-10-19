importScripts("sw-track.js", "sw-module-2.js", "sw-module-3.js", "sw-module-4.js", "sw-module-5.js");


self.addEventListener('activate', event => {
    self.clients.claim();
    purgeQueue();
}) 

// We save some files to serve offline
// to pass PWA Criteria on latest Chromium versions
const urls = ['./', 'script.js', 'module-2.js', 'module-3.js', 'module-4.js',
 'module-5.js', 'styles.css'];
self.addEventListener('install', event => {
    event.waitUntil(caches.open("test-suite")
        .then(function(cache) {
            return cache.addAll(urls);
        })
    );
}) 
    
// Update-while-revalidate fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Even if the response is in the cache, we fetch it
                // and update the cache for future usage
                var fetchPromise = fetch(event.request).then(
                    function(networkResponse) {
                        caches.open("test-suite").then(function(cache) {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    });
                // We use the currently cached version if it's there
                return response || fetchPromise;
            })
        );
    }); 
