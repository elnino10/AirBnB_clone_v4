// script that executes when the DOM is ready
// and adds event listeners on each input checkbox


$(document).ready(function () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        console.log(data)
        // if (data.status == 'OK') {
        //     $('div#api_status').addClass('available')
        // } else {
        //     $('div#api_status').removeClass('available')
        // }
    });
    let amenity_dict = {}
    $("input:checkbox").change(function () {
        let id_var = $('input:checkbox').attr('data_id');
        if ($(this).is(':checked')) {
            amenity_dict[id_var] = true;
        } else {
            delete amenity_dict[id_var];
        }
    });
    $('DIV.amenities h4').empty();
    for (let id in amenity_dict) {
        $('DIV.amenities h4').text(id);
    }
});
