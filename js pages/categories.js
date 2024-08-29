$(document).ready(function () {
  // Function to load images based on city and category
  function loadImages(city, category) {
    $.getJSON("../json files/full.json", function (data) {
      const cityData = data[city.toLowerCase()]; // Convert city to lowercase for consistency

      if (cityData && cityData[category]) {
        const categoryData = cityData[category]; // Get the specific category data
        const $container = $(".destination__grid");
        $container.empty(); // Clear existing content

        // Iterate over each item in the category data
        categoryData.forEach(function (item) {
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
      } else {
        console.error(
          `No data found for city "${city}" and category "${category}".`
        );
      }
    }).fail(function () {
      console.error("Error loading images.");
    });
  }

  // Function to get the city and category from URL parameters
  function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      city: urlParams.get("city") || null,
      category: urlParams.get("category") || null,
    };
  }

  // Load images based on city and category
  const params = getParams();
  if (params.city && params.category) {
    loadImages(params.city, params.category);
  } else {
    console.error("City or category parameter is missing.");
  }

  // Populate the dropdown with categories based on city
  function populateCategoryDropdown(city, currentCategory) {
    $.getJSON("../json files/full.json", function (data) {
      const cityData = data[city.toLowerCase()];
      const $dropdown = $("#category-dropdown");
      $dropdown.empty(); // Clear existing options

      // Append a default disabled option
      $dropdown.append('<option value="" disabled>Select a category</option>');

      // Populate categories based on city data
      if (cityData) {
        $.each(cityData, function (category) {
          const $option = $("<option></option>")
            .attr("value", category)
            .text(category);

          // If the category matches the current category from URL, mark it as selected
          if (category === currentCategory) {
            $option.attr("selected", true);
          }

          $dropdown.append($option);
        });
      } else {
        console.error("No data found for city " + city);
      }
    }).fail(function () {
      console.error("Error loading city data.");
    });
  }

  // If a city is provided in the URL, populate the category dropdown and select the current category
  if (params.city) {
    populateCategoryDropdown(params.city, params.category);
  }

  // Handle dropdown change
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
