// Send track messages to the client (the page)
// It queues them in case the SW is not controlling the page yet
let messages = [];
let count = 1;
function purgeQueue() {
    if (messages.length>0) {
        clients.matchAll({includeUncontrolled: false}).then(clients => {      
            let storedMessages = [...messages];
            count++;
            if (clients.length > 0 && count==4) { // HACK count=3                
                messages = [];                        
            } 
            clients.forEach(client => {
                var channel = new MessageChannel();
                client.postMessage(storedMessages, [channel.port2]);
            });        
    });
    } else {
       clearInterval(purgeTimer);
    }
}
self.skipWaiting();

let purgeTimer; 
purgeTimer = setInterval( () => { purgeQueue(); }, 1000); 

function track(action, value) {
    clients.matchAll({includeUncontrolled: false}).then(clients => {
        if (clients==0) {
            // Queue messages for later
            console.log("queue");
            messages.push({ action, value });
        } else {
            console.log("direct");
            clients.forEach(client => {
                var channel = new MessageChannel();
                if (messages.length>0) {
                    client.postMessage([...messages, {action, value}]);
                    messages = [];
                } else {
                    client.postMessage([{ action, value }]);
                    messages = [];
                }
            });
        }
    });
}