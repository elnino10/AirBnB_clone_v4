// script that executes when the DOM is ready
// and adds event listeners on each input checkbox

$.get("http://localhost:5001/api/v1/status/", function (data) {
  if (data.status == "OK") {
    $("div#api_status").addClass("available");
  } else {
    $("div#api_status").removeClass("available");
  }
});

$(document).ready(function () {
  let amenityDict = {};
  $("input:checkbox").change(function () {
    let idVar = $("input:checkbox").attr("data-id");
    let nameVar = $("input:checkbox").attr("data-name");
    if ($(this).is(":checked")) {
      amenityDict[idVar] = nameVar;
    } else {
      delete amenityDict[idVar];
    }
  });
  $("DIV.amenities h4").empty();
  for (let id in amenityDict) {
    $("DIV.amenities h4").text(amenityDict[id]);
  }
});

$.ajax({
  url: "http://0.0.0.0:5001/api/v1/places_search/",
  type: "POST",
  data: {},
  headers : {
      "Content-Type": "application/json",
  },
  success: function (data) {
    for (let place in data) {
      $("section.places").append(
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest"></div>
            <div class="number_rooms"></div>
            <div class="number_bathrooms"></div>
          </div>
          <div class="user">
            <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
          </div>
          <div class="description">${place.description | safe}</div>
        </article>
      );
    }
  },
});
