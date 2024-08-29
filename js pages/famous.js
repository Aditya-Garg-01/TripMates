$(document).ready(function () {
  // Function to load images based on city and category
  function loadImages(city, category) {
    $.getJSON("../json files/cities.json", function (data) {
      const categoryData = data[city]?.[category];
      if (categoryData) {
        const $container = $(".destination__grid");
        $container.empty(); // Clear existing content

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

  // Function to get city and category from URL parameters
  function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      city: urlParams.get("city") || "paris",
      category: urlParams.get("category") || "monuments",
    };
  }

  // Load images based on city and category
  const params = getParams();
  loadImages("Delhi", "monuments");
});
