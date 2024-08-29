$(document).ready(function () {
  function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("URL Parameters:", urlParams.toString()); // Debugging
    return {
      city: urlParams.get("city"),
      category: urlParams.get("category"),
      name: urlParams.get("name"),
    };
  }

  function loadDetails(city, category, name) {
    $.getJSON("../json files/full.json", function (data) {
      console.log("Data loaded:", data); // Debugging
      const cityData = data[city.toLowerCase()];
      console.log("City Data:", cityData); // Debugging
      if (cityData && cityData[category]) {
        const items = cityData[category];
        console.log("Category Items:", items); // Debugging
        const item = items.find((item) => item.name === name);
        console.log("Selected Item:", item); // Debugging

        if (item) {
          $("#detail-image").attr("src", item.src).attr("alt", item.alt);
          $("#detail-title").text(item.name);
          $("#detail-description").text(item.description);
        } else {
          console.error(`No item found with name "${name}".`);
        }
      } else {
        console.error(
          `No data found for city "${city}" and category "${category}".`
        );
      }
    }).fail(function () {
      console.error("Error loading JSON data.");
    });
  }

  const params = getParams();
  console.log("Params:", params); // Debugging
  if (params.city && params.category && params.name) {
    loadDetails(params.city, params.category, params.name);
  } else {
    console.error("City, category, or name parameter is missing.");
  }
});
