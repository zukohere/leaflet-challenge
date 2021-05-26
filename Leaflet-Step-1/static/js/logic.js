var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"


d3.json(queryUrl).then(function (earthquakeData, err) {
    var myMap = L.map("map", {
        center: [
            0,0
        ],
        zoom: 3.2
    })
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    // for opacity scaling
    var myColor = d3.scaleLinear()
        .domain(d3.extent(earthquakeData.features.map(d => d.geometry.coordinates[2])))
        .range([0.25, 1])

    // Loop through the cities array and create one marker for each city object
    earthquakeData.features.forEach(function (feature) {
        //Long and Lat flipped in the JSON file. Thanks for that.
        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            fillOpacity: myColor(feature.geometry.coordinates[2]), //depth
            color: "white",
            fillColor: `red`,
            radius: feature.properties.mag * 15000
        }).addTo(myMap).bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p><p>"  
            +"Magnitude: "+ feature.properties.mag + "</p><p>" 
            +"Depth: "+ feature.geometry.coordinates[2] + "</p>")

    })
})