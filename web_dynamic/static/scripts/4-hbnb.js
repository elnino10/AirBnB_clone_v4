// script that executes when the DOM is ready
// and adds event listeners on each input checkbox

window.addEventListener("load", function () {
  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("div#api_status").addClass("available");
    } else {
      $("div#api_status").removeClass("available");
    }
  });

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
  $("DIV.amenities h4").text(Object.values(amenityDict));

  // fetch places
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    type: "POST",
    data: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
    success: function (data) {
      for (let place in data) {
        $("section.places").append(
          `<article>
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
              
            </div>
            <div class="description">${place.description}</div>
          </article>`
        );
      }
    },
  });

  // new POST request when button clicked
  $("section.filters button").click(function () {
    console.log("clicked!!!");
    $.ajax({
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      type: "POST",
      data: JSON.stringify({ amenities: Object.keys(amenityDict) }),
      headers: {
        "Content-Type": "application/json",
      },
      success: function (data) {
        $("section.places").empty();
        $("section.places").append("<h1>Places</h1>");
        for (const place in data) {
          $("section.places").append(
            `<article>
              <div class="title">
                <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">
                  <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                  <br />${place.max_guest} Guests
                </div>
                <div class="number_rooms">
                  <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                  <br />${place.number_rooms} Bedrooms
                </div>
                <div class="number_bathrooms">
                  <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                  <br />${place.number_bathrooms} Bathroom
                </div>
              </div>
              <div class="description">${place.description}</div>
            </article>`
          );
        }
      },
    });
  });
});
