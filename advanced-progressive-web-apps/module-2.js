/* Code snippets from Module 2 of Advanced Progressive Web Apps Pluralsight Course: Client */


/* Before Install Prompt */
let installPrompt;
window.addEventListener('beforeinstallprompt', event => {
    track('install', 'available');
    installPrompt = event;
});

function install() {
    if (installPrompt==undefined) {
      track('install-prompt', "event not fired; you may be able to install this App manually")
      return;
    }
     // Tracking installation prompt result
    installPrompt.userChoice.then(result => {
        // result can be 'accepted' or 'dismissed'  
        console.log(result);      
        track('install-prompt', result.outcome);
        track('install-prompt-platform', result.platform);
    });
    installPrompt.prompt();
}

window.addEventListener('appinstalled', event => {
    track('install', 'installed');
});


window.addEventListener('DOMContentLoaded', async (event) => {
    // The Page ID can be used to detect same or different navigations
    track('load', "Page loaded with id " + Math.round(Math.random()*10000))
    // Tracking deferred installation on iOS and iPadOS
    if (navigator.standalone &&
          localStorage.getItem('firstLoad')===undefined) {
       track('install', 'installed');
       // Set a flag for future loads on this PWA icon instance
       // WARNING: false positives can happen
       localStorage.setItem('firstLoad', false);
    } 
});


async function checkInstalledApp() {
    if ('getInstalledRelatedApps' in navigator) {
        // we get all the installed related apps taken from Manifest
        const installedApps = await navigator.getInstalledRelatedApps();
        // we filter them to find the one we need by package ID
        // TODO: Change the PackageID for the real one you define in the Manifest
        const packageId = "com.app.pwa";
        const app = installedApps.find(app => app.id === packageId);
        if (app) {   // app was found
            track('related-app', `${app.id} version ${app.version} is installed`);
        } else {
            track('related-app', `The app is not installed`);
        }  
    } else {
        track('related-app', `API not available`);
    }
}





/* HACK for iOS to improve installation reliability */
/* TODO: Replace Manifest and Icon URLs */
if ('standalone' in navigator) {
    fetch("app.webmanifest")
        .then(r=>r.text())
        .then(manifest => 
            document.querySelector("link[rel=manifest]").href = 
                `data:application/manifest+json;charset=utf-8,${manifest}`
        )

    fetch("icon.png")
        .then(r=>r.blob())
        .then(blob => {
                let reader = new FileReader();
                reader.onload = () => 
                    document.querySelector("link[rel=apple-touch-icon]").href = 
                        reader.result;
                reader.readAsDataURL(blob);
        })    
}

