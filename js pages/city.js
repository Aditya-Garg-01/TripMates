$(document).ready(function () {
  // Function to load images based on city
  function populateCategoryDropdown(city) {
    $.getJSON("../json files/full.json", function (data) {
      const cityData = data[city.toLowerCase()];
      const $dropdown = $("#category-dropdown");
      $dropdown.empty(); // Clear existing options

      // Append a default disabled option
      $dropdown.append(
        '<option value="" disabled selected>Select a category</option>'
      );

      // Populate categories based on city data
      if (cityData) {
        $.each(cityData, function (category) {
          $dropdown.append(
            $("<option></option>").attr("value", category).text(category)
          );
        });
      } else {
        console.error("No data found for city " + city);
      }
    }).fail(function () {
      console.error("Error loading city data.");
    });
  }
  function loadImages(city) {
    $.getJSON("../json files/full.json", function (data) {
      const cityData = data[city];
      if (cityData) {
        const $container = $(".destination__grid");
        $container.empty(); // Clear existing content

        // Iterate over each category in the city data
        $.each(cityData, function (category, items) {
          items.forEach(function (item) {
            const $cardContent = $("<div>").addClass("card__content");

            const $imgElement = $("<img>").attr({
              src: item.src,
              alt: item.alt,
            });

            const $nameElement = $("<h2>").text(item.name);
            const $descriptionElement = $("<p>").text(item.description);

            $cardContent.append($imgElement, $nameElement, $descriptionElement);

            const $card = $("<div>")
              .addClass("destination__card")
              .append($cardContent);

            $container.append($card);
          });
        });
      } else {
        console.error(`No data found for city "${city}".`);
      }
    }).fail(function () {
      console.error("Error loading images.");
    });
  }

  // Function to get the city from URL parameters
  function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      city: urlParams.get("city") || null,
    };
  }

  // Load images based on city
  const params = getParams();
  if (params.city) {
    loadImages(params.city);
  }
});
