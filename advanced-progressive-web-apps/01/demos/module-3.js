/* Code snippets from Module 3 of Advanced Progressive Web Apps Pluralsight Course: Client */


/* LIFECYCLE */
function getState() {
    if (document.visibilityState === 'hidden') {
        return 'hidden';
    }
    if (document.hasFocus()) {
        return 'visible-active';
    }
    return 'visible-passive';
}

['visibilitychange', 'resume'].forEach((type) => {
    window.addEventListener(type, () => track('lifecycle', type + "-" + getState()), {capture: true});
});

window.addEventListener('freeze', () => {
    track('lifecycle', 'frozen');
    //TODO: Save state

}, {capture: true});

window.addEventListener('DOMContentLoaded', event => {
    if (document.wasDiscarded) {
       track('lifecycle', 'resume after discarded');
       //TODO: Restore state
    }
});

window.addEventListener('pagehide', (event) => {
if (event.persisted) {
    track('lifecycle', 'page hide-frozen');
} else {
    track('lifecycle', 'page hide-terminated');
}
}, {capture: true});




/* CHECK USAGE STATS */
//TODO: Replace standalone with minimal-ui or fullscreen based on your manifest's display value
window.addEventListener('DOMContentLoaded', event => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        event => track('pwaload', 'standalone')
    }
});

window.addEventListener('DOMContentLoaded', () => {
  window.matchMedia('(display-mode: standalone)')
      .addListener(event => {
          if (event.matches) {
             track('pwa-mode-change', 'standalone');
          } else {
             track('pwa-mode-change', 'browser');
          }
      });
});

window.addEventListener('DOMContentLoaded', async (event) => {
    if (location.search.length>0) {
        track('load-with-arguments', location.search.substring(1))
    }
});


/* WEB PUSH */
async function pushRequest() {
    if ('Notification' in window) {
        if (Notification.permission === "granted") {
           track('notification', "granted");
        } 
        status = await Notification.requestPermission();
        // it can be'granted', 'denied', 'default'
        track('notification-request', status);
    } else {
        track('notification', 'not available');
    }
}

async function pushSubscription() {
    if ('PushManager' in window) {
        const registration = await navigator.serviceWorker.ready;
        const pushData = await registration.pushManager.getSubscription();
        if (pushData) {
            // We have the Push Subscription details from a previous approved subscription
            track('push-subscription', pushData.endpoint);
            track('push-testing', 'Test sending push messages from DevTools in Chromium');
        } else {
            track('push-subscription', 'no subscription, requesting a new one');
            //TODO: Replace the applicationServerKey with your own public key
            // You can use 'npx web-push generate-vapid-keys' to create a pair of keys
            // You need to save safely the private key to send messages in the future
            const pushData = await registration.pushManager.subscribe({ 
                userVisibleOnly: true,
                applicationServerKey: 'BF5N1_cCHF0qaZ2vmPfSaGuhlfInbFPmVyTDc7t_QqbzVhgubrFGmQlk1NANzMs1wyZWZlvu5ZIQNZskK9F8hSA'
            });            
            if (pushData) {
                // We have the Push Subscription details to save in our server 
                track('push-subscription-new', pushData.endpoint);
                track('push-testing', 'Test sending push messages from DevTools in Chromium');
            } else {
                track('push-subscription', 'error getting subscription');
            }
        }
    } else {
        track('notification', 'not available');
    }
}

/* BACKGROUND SYNC */
async function registerSync() {
    if ('SyncManager' in window) {
        const registration = await navigator.serviceWorker.ready;
        registration.sync.register("tag-name");
        track('background-sync', 'registered');
    } else {
        track('background-sync', 'not available');
    } 
}

/* BACKGROUND PERIODIC SYNC */
async function periodicPermission() {
    if ('permissions' in navigator) {
        const permissionStatus = await navigator.permissions.query({
            name: 'periodic-background-sync',
        });
        if (permissionStatus.state === 'granted') {
            track('periodic-sync', 'granted');
        } else {
            track('periodic-sync', 'denied');
        }    
    } else {
        track('periodic-sync', 'not available');
    }
}

async function registerPeriodicSync() {
    const registration = await navigator.serviceWorker.ready;
    if ('periodicSync' in registration) {
        try {
            await registration.periodicSync.register('sync-tag', {
                minInterval: 60 * 60 * 1000 // One hour
            });
            track('periodic-sync', 'registered once per hour!');
        } catch (error) {
            track('periodic-sync', 'error while registering');
        }
    } else {
        track('periodic-sync', 'not available');
    }
}

/* BACKGROUND FETCH */
async function registerFetch() {
    const registration = await navigator.serviceWorker.ready;
    if ('backgroundFetch' in registration) {
        const fetch = await registration.backgroundFetch.fetch(    
            'fetch-name', ['https://speed.hetzner.de/100MB.bin'],
            {
              title: '100 MB Test Size',
              icons: [{ sizes:'300x300', src:'icon.png', type:'image/png'}],
                downloadTotal: 100 * 1024 * 1024,
            }
        ); 
        track('background-fetch', 'downloading'); 
    } else {
        track('background-fetch', 'not available');
    }
}

