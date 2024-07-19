// URL to fetch the earthquake data from the USGS website
let earthquakeDataUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch and process the earthquake data using D3
// d3 is a JavaScript library for producing dynamic, interactive data visualizations in web browsers
d3.json(earthquakeDataUrl).then(earthquakeData => {
    processEarthquakeData(earthquakeData.features);
});

// Function to process the earthquake data and create features for the map
function processEarthquakeData(earthquakeFeatures) {
    // Function to run for each feature in the features array
    function onEachEarthquakeFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    // Function to determine marker size based on earthquake magnitude
    function calculateMarkerSize(magnitude) {
        return magnitude * 4;
    }

    // Function to determine marker color based on earthquake depth
    // The depth of the earthquake is the third coordinate in the geometry.coordinates array
    // The ? : operator is a ternary operator that is used as a shorthand for if...else statements. This only works for simple if...else statements in JavaScript.
    function calculateMarkerColor(depth) {
        return depth > 90 ? '#FF5F65' :
               depth > 70 ? '#FCA35D' :
               depth > 50 ? '#FDB72A' :
               depth > 30 ? '#F7DB11' :
               depth > 10 ? '#DCF400' :
                            '#A3F600';
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the EarthquakeFeature function once for each piece of data in the array
    let earthquakeLayer = L.geoJSON(earthquakeFeatures, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: calculateMarkerSize(feature.properties.mag),
                fillColor: calculateMarkerColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: onEachEarthquakeFeature
    });

    // Send the earthquake layer to the createMap function
    createMap(earthquakeLayer);
}

// Function to create the map
function createMap(earthquakeLayer) {
    // Define street and satellite map layers
    let streetMapLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    });

    let satelliteMapLayer = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
        attribution: "Map data: &copy; <a href='https://opentopomap.org/'>OpenTopoMap</a> contributors"
    });

    // Define a baseMaps object to hold our base layers
    let baseMapLayers = {
        "Street Map": streetMapLayer,
        "Satellite Map": satelliteMapLayer
    };

    // Create an overlay object to hold our overlay layer
    let overlayMapLayers = {
        Earthquakes: earthquakeLayer
    };

    // Create map, giving it the streetMapLayer and earthquakeLayer as layers to display
    let earthquakeMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetMapLayer, earthquakeLayer]
    });

    // Create a layer control, pass in our baseMapLayers and overlayMapLayers, and add the layer control to the map
    L.control.layers(baseMapLayers, overlayMapLayers, {
        collapsed: false
    }).addTo(earthquakeMap);

    // Create a legend to display information about our map
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
        let legendDiv = L.DomUtil.create("div", "info legend"),
            depthIntervals = [0, 10, 30, 50, 70, 90],
            legendLabels = [];

        // loop through our depth intervals and generate a label with a colored square for each interval
        for (let i = 0; i < depthIntervals.length; i++) {
            legendDiv.innerHTML +=
                '<i style="background:' + calculateMarkerColor(depthIntervals[i] + 1) + '"></i> ' +
                depthIntervals[i] + (depthIntervals[i + 1] ? '&ndash;' + depthIntervals[i + 1] + '<br>' : '+');
        }

        return legendDiv;
    };

    // Lastly always add it to the map
    legend.addTo(earthquakeMap);
}
