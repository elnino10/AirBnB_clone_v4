// script that executes when the DOM is ready
// and adds event listeners on each input checkbox

$(document).ready(function () {
    const amenityDict = {};
    $("input:checkbox").change(function () {
        const idVar = $(this).attr('data-id');
        const nameVar = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            amenityDict[idVar] = nameVar;
        } else {
            delete amenityDict[idVar];
        }
    });
    $('DIV.amenities h4').empty();
    for (let id in amenityDict) {
        $('DIV.amenities h4').each(function () {
            $('DIV.amenities h4').text(amenityDict[id]);
        });
    }
});
