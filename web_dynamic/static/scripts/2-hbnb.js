// script that executes when the DOM is ready
// and adds event listeners on each input checkbox

$(document).ready(function () {
  $.get("http://localhost:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("div#api_status").addClass("available");
    } else {
      $("div#api_status").removeClass("available");
    }
  });

  let amenityDict = {};
  $("input:checkbox").change(function () {
    let idVar = $(this).attr("data-id");
    let nameVar = $(this).attr("data-name");
    if ($(this).is(":checked")) {
      amenityDict[idVar] = nameVar;
    } else {
      delete amenityDict[idVar];
    }
    $("DIV.amenities h4").empty();
    let list = Object.values(amenityDict).join(", ");
    if (list) {
      $("DIV.amenities h4").text(list);
    } else {
      $("DIV.amenities h4").html(`&nbsp;`);
    }
  });
});
