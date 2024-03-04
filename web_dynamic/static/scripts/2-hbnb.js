// script that executes when the DOM is ready
// and adds event listeners on each input checkbox

$.get('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
        $('div#api_status').addClass('available')
    } else {
        $('div#api_status').removeClass('available')
    }
});

$(document).ready(function () {
    let amenityDict = {}
    $("input:checkbox").change(function () {
        let idVar = $('input:checkbox').attr('data-id');
        let nameVar = $('input:checkbox').attr('data-name');
        if ($(this).is(':checked')) {
            amenityDict[idVar] = nameVar;
        } else {
            delete amenityDict[idVar];
        }
    });
    $('DIV.amenities h4').empty();
    for (let id in amenityDict) {
        $('DIV.amenities h4').text(amenityDict[id]);
    }
});
