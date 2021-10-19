/* Code snippets from Module 5 of Advanced Progressive Web Apps Pluralsight Course: Client */

function share() {
    if ('share' in navigator) { 
        navigator.share({
            title: 'Title to share',
            text: 'Text to share',
            url: 'https://pluralsight.com' 
        }).then( () => track('share', 'shared fulfilled'))
        .catch( () => track('share', 'shared cancelled'));
    } else {
        track('share', 'not available');
    }
}

function openURL(url) {
    location.href=url;
}