// Variables
let tooltipButton = document.getElementById('tooltipButton');
let popButton = document.getElementById('popButton');
let showMore = document.getElementById('showMore');
let video1 = document.getElementById('video1');

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

    // Collapse
    // $('#history').collapse({
    //     toggle: true
    // });

    $('.collapse').collapse({
        "toggle": false
    });

    // Carousel
    $('.carousel').carousel({
        'interval': 5000,
        'pause': 'hover',
        'wrap': false,
        'touch': false
    })

    // Modal
    $('.modal').modal({
        backdrop: 'static',
        keyboard: false,
        show: false
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

// Collapse
function expandAll(){
    $('#collapseOne, #collapseTwo').collapse('show')
}

function closeAll(){
    $('#collapseOne, #collapseTwo').collapse('hide')
}

$('#history').on('show.bs.collapse', function () {
    showMore.innerHTML = 'Show Less';
})

$('#history').on('hide.bs.collapse', function () {
    showMore.innerHTML = 'Show More';
})

// Carousel functions
function thumbnail1(){
    $('.carousel').carousel(0);
}

function thumbnail2(){
    $('.carousel').carousel(1);
}

function thumbnail3(){
    $('.carousel').carousel(2);
}

function prev(){
    $('.carousel').carousel('prev');
}

function next(){
    $('.carousel').carousel('next');
}

// Scrollspy
$(window).on('activate.bs.scrollspy', function (e, obj) {
    console.log(obj.relatedTarget);
    if(obj.relatedTarget == "#section1"){
        
    }
});

// Video events
// video1.onpause = function(){
//     $('#about1').modal('toggle');
// }

function resumeVideo(){
    $('#about1').modal('toggle');
};

$('#about1').on('shown.bs.modal', function (e) {
    video1.pause();
});

$('#about1').on('hidden.bs.modal', function (e) {
    video1.play();
});

$('#pie1').on('show.bs.modal', function (e) {
    let button = $(e.relatedTarget);
    let titleText = button.data('title');
    let imagePath = button.data('image');
    let mainText = button.data('text');

    let modal = $(this);
    modal.find('.modal-title').text(titleText);
    modal.find('img').attr('src', imagePath);
    modal.find('p').text(mainText);
});