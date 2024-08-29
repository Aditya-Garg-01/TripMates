$(document).ready(function () {
  // Handle search form submission
  $("#search-form").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    var query = $("#city-input").val().trim(); // Get the search query
    query = query.toLowerCase();
    if (query) {
      // Redirect to city.html with the city query as a URL parameter
      window.location.href =
        "/html pages/city.html?city=" + encodeURIComponent(query);
    } else {
      alert("Please enter a city name.");
    }
  });w
});
