// script that executes when the DOM is ready
// and adds event listeners on each input checkbox

$(document).ready(function () {
    const url = "http://0.0.0.0:5001/api/v1/status/";
    $.get(url, function(data, textStatus) {
        if (textStatus === 'success'){
            $("div#api_status").addClass(available)
        }else {
            $("div#api_status").removeClass("available")
        }
    })
})