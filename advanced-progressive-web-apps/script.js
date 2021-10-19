
// Service Worker Registration
navigator.serviceWorker.register("sw.js").then(reg => {
    navigator.serviceWorker.addEventListener('message', event => {
        for (let m of event.data) {
            track(m.action, m.value);
        }
    });     
});
   
// Utilities
function track(action, value) {
    document.querySelector("ul#output").innerHTML += `<li><b>${action}</b> ${value}`;
}



  

