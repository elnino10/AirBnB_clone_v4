$(document).ready(function () {
  const selectedAmenities = [];

  // listen for changes in the input checkbox
  $('input:checkbox').change(function () {
    let amenityId = $(this).data("name");

    if ($(this).is(":checked")) {
      selectedAmenities.push(amenityId);
    } else {
      // Find the index of the amenity name in the selectedAmenities array
      const index = selectedAmenities.indexOf(amenityId);
      // Check if the amenity name already exists in the array
      if (index !== -1) {
        selectedAmenities.splice(index, 1);
      }
    }
    $("DIV.amenities h4").empty();
    let amenitiesName = selectedAmenities.join(", ")
    $("DIV.amenities h4").text(amenitiesName);
  });
  
  $.get("http://localhost:5001/api/v1/status/", function (data) {
    console.log(data);
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      if ($("#api_status").hasClass("available")) {
        $("#api_status").removeClass("available");
      }
    }
  });
});
