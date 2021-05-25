// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"


d3.json(queryUrl).then(function (earthquakeData, err) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(earthquakeData);
    // console.log(earthquakeData.features)
// function createFeatures(earthquakeData) {
    // console.log(earthquakeData)
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    // Add circles to map
    // Loop through the cities array and create one marker for each city object
    earthquakeData.features.forEach(function(feature,layer) {
        // console.log(feature.geometry.coordinates[0])
        // for (var i = 0; i < earthquakeData.length; i++) {
            // Conditionals for countries points
            // L.circle([earthquakeData[i].geometry.coordinates[0],
            L.circle([feature.geometry.coordinates[0],
            // earthquakeData[i].geometry.coordinates[1]], {
                feature.geometry.coordinates[1]], {
                fillOpacity: 1,
                color: "white",
                // fillColor: earthquakeData[i].geometry.coordinates[2],
                fillColor: "black", 
                // feature.geometry.coordinates[2],
                // Adjust radius
                radius: feature.properties.mag * 1500
                
            })
        }    )
    
        })
    function createFeatures(earthquakeData) {
        // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
        function onEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
              "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
          }
        var earthquakes = L.geoJSON(earthquakeData.features, {
            onEachFeature: onEachFeature
          });
          createMap(earthquakes);
        }
        
        function createMap(earthquakes) {
        
          // Define streetmap and darkmap layers
          var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: API_KEY
          });
        
          var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "dark-v10",
            accessToken: API_KEY
          });
        
          // Define a baseMaps object to hold our base layers
          var baseMaps = {
            "Street Map": streetmap,
            "Dark Map": darkmap
          };
        
          // Create overlay object to hold our overlay layer
          var overlayMaps = {
            Earthquakes: earthquakes
          };
        
          // Create our map, giving it the streetmap and earthquakes layers to display on load
          var myMap = L.map("map", {
            center: [
              37.09, -95.71
            ],
            zoom: 5,
            layers: [streetmap, earthquakes]
          });
        
          // Create a layer control
          // Pass in our baseMaps and overlayMaps
          // Add the layer control to the map
          L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
          }).addTo(myMap);
        
    }
