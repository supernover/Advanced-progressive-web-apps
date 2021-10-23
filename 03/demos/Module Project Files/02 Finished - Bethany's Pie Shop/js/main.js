// Variables
let tooltipButton = document.getElementById('tooltipButton');
let popButton = document.getElementById('popButton');

// On Ready
$(document).ready(function(){

    // Dropdown options
    $('.dropdown-toggle').dropdown({
        "offset": -100,
        "flip": false
    });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip({
        delay: {show: 1000, hide: 1000},
        html: true,
        placement: "bottom",
        animation: false,
        title: 'Click to learn more',
        // trigger: 'click'
    });

    // Pop over
    $('[data-toggle="popover"]').popover({
        trigger: 'click',
        html: true
    });

    // Toast
    // $('.toast').toast('show');

    $('.toast').toast({
        delay: 5000,
        autohide: false
    });    

});

// Dropdown methods
function displayCategories(){
    $('#pieCatergories').dropdown('toggle');
}

// Dropdown events
$('#pieCatergories').on('show.bs.dropdown', function () {
    // alert('This')
})

// Pop Overs & Tooltips
function viewPopOvers(){
    $('#pop1').popover('toggle');
}

function showTooltips(){
    $('[data-toggle="tooltip"]').tooltip('toggle');
}

$('[data-toggle="tooltip"]').on('show.bs.tooltip', function () {
    tooltipButton.innerHTML = "Hide Tooltips";
})

$('[data-toggle="tooltip"]').on('hide.bs.tooltip', function () {
    tooltipButton.innerHTML = "Show Tooltips";
})

$('#pop1').on('show.bs.popover', function () {
    popButton.innerHTML = 'Hide Popover'
})

$('#pop1').on('hide.bs.popover', function () {
    popButton.innerHTML = 'Show Popover'
})

// Toasts
let saleMessage = setInterval(myCountDown, 3000);

function myCountDown(){
    $('.toast').toast('show');

    // Stop
    clearInterval(saleMessage);
}

$('.toast').on('hide.bs.toast', function () {
    console.log('Message was hidden')
})