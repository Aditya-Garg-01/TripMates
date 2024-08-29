$(document).ready(function () {
  // Function to load images based on city
  function populateCategoryDropdown(city) {
    $.getJSON("../json files/full.json", function (data) {
      const cityData = data[city.toLowerCase()]; // Ensure lowercase consistency
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

  // Function to load images based on city
  function loadImages(city) {
    $.getJSON("../json files/full.json", function (data) {
      const cityData = data[city.toLowerCase()]; // Convert city to lowercase
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

            // Add event listener to each card
            $card.on("click", function () {
              // Redirect to the new page with city, category, and name in the URL parameters
              window.location.href = `/html pages/details.html?city=${encodeURIComponent(
                city
              )}&category=${encodeURIComponent(
                category
              )}&name=${encodeURIComponent(item.name)}`;
            });

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
      category: urlParams.get("category") || null, // Also grab the category parameter
    };
  }

  // Load images based on city
  const params = getParams();
  if (params.city) {
    loadImages(params.city);
    populateCategoryDropdown(params.city);
  } else {
    console.error("No city specified in URL parameters.");
  }

  // Event listener for dropdown selection
  $("#category-dropdown").change(function () {
    const selectedCategory = $(this).val(); // Get selected category
    const city = params.city; // City is already in the URL

    if (selectedCategory && city) {
      // Redirect to new page with city and category in the URL parameters
      window.location.href = `/html pages/categories.html?city=${encodeURIComponent(
        city
      )}&category=${encodeURIComponent(selectedCategory)}`;
    } else {
      console.error("City or category is missing.");
    }
  });
});
