/* Code snippets from Module 2 of Advanced Progressive Web Apps Pluralsight Course: Service Worker */

self.addEventListener('install', event => {
    track('service-worker', 'installed');
      event.waitUntil(
        caches.open('appCache')
            .then(cache => cache.addAll(['./', 'script.js'])
                .then(event => track('assets', 'installed'))
                .catch(event => track('assets', 'failed'))
            )
      );
});