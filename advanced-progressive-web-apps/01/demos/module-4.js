/* Code snippets from Module 4 of Advanced Progressive Web Apps Pluralsight Course: Client */

/* SERVICE WORKER UPDATE CHECK */

async function requestUpdate() {
    const registration = await navigator.serviceWorker.ready;
    if ('update' in registration) {
        registration.update();
        track('sw-update', 'requested');
    } else {
        track('sw-update', 'not available');
    }

    registration.addEventListener("updatefound", event => {
       const newSW = registration.installing;
       newSW.addEventListener("statechange", event => {
         if (newSW.state=="installed") {
            track("sw-update", "installed and waiting");
            // You can show a user a notification here
         } 
       }); 
    }) 
}

navigator.serviceWorker.addEventListener("controllerchange", event => {
    track("sw-update", "activated and controlling the PWA");
}); 

/* Web Badging API */
function badge() {
    if ('setAppBadge' in navigator) { 
        navigator.setAppBadge(prompt("Insert a number")).catch(error => {
            // Do something on error
            track("badge", "error: " + error.message)
        });
    } else {
     track("badge", "not available");
    }
}


/* STORAGE */

async function persist() {
    if (navigator.storage && navigator.storage.persist) {
        const granted = await navigator.storage.persist();
        track('storage-persist-request', granted);
    } else {
        track('storage-persist-request', 'API not available');
    }
}

async function persisted() {
    if (navigator.storage && navigator.storage.persisted) {
        const isPersisted = await navigator.storage.persisted();
        track('storage-persisted', isPersisted);
    } else {
        track('storage-persisted-request', 'API not available');
    }
}

async function quota() {
    if (navigator.storage && navigator.storage.estimate) {
        const q = await navigator.storage.estimate();
        track('quota available', q.quota);
        track('quota usage', q.usage);
    } else {
        track('quota', 'API not available');
    } 
}
