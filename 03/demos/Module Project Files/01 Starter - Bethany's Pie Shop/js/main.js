$(document).ready(function(){

    // Dropdown options
    $('.dropdown-toggle').dropdown({
        "offset": -100,
        "flip": false
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