// import data from url using D3
// using https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson  USGS M2.5+ Earthquakes from the past seven days because 353 earthquakes
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

// Perform a GET request to the query URL/    .then gets us to the first response
d3.json(queryUrl).then(function (data){
    console.log(data.features) ;
    createFeatures(data.features)});  // confirms data was accessed;  
//open html  f12  look at console to see code of features  !!!!!!

// use leaflet to visualize initial map

function createMap(earthquakes) {

    // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [street, earthquakes]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  }
  // circular markers, radius of circle represents magnitude (radius increases with magnitude)
  function createFeatures(earthquakeData) {
    // save the earthquake data in a variable
      // Define a function that we want to run once for each feature in the features array.
      // Give each feature a popup that describes the place and time of the earthquake.
      //  need that console.log to get syntax for feature.properties.place
      // popup includes Magnitude, the location (place or latitude & longitude?) and depth
      function onEachElement(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><h3>Depth: ${feature.geometry.coordinates[2]}</h3>`);
      }
    
      var geojsonMarkerOptions = {
        radius: 8,
        //fillColor: getColor,
        color: "white",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.6
    };
    
      // Create a GeoJSON layer that contains the features array on the earthquakeData object.
      // onEachFeature is a geojson function that runs like a for loop
      // Run the onEachFeature function once for each piece of data in the array.
      let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            geojsonMarkerOptions.radius = markerSize(feature.properties.mag),
            geojsonMarkerOptions.color = getColor(feature.geometry.coordinates[2])
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
     //   onEachFeature: onEachElement
      , onEachFeature: onEachElement });
    
      // Send our earthquakes layer to the createMap function/
      createMap(earthquakes);
    }

    function markerSize(magnitude) {
        return Math.pow(magnitude, 2.5);  // square
      }
// color of circle reflects depth (darker equals greater depth)
    function getColor(depth) {
     
        if (depth < 10) return fillColor = "white";

        else if (depth < 30) return fillColor = "#ccffff";

        else if (depth < 50) return  fillColor = "#33ccff";

        else if (depth < 70) return fillColor = "#0066ff";

        else if (depth < 90) return fillColor = "3333ff";

        else return "#000099"};


// legend showing cutoffs in gradations of color/depth - not there yet
//addLegend('bottomright', pal = geojsonMarkerOptions.color, values = feature.geometry.coordinates[2],
//           title = "Depth ranges of earthquakes", opacity = 1 )

//var legend = L.control({position: 'bottomright'});

//legend.onAdd = function (myMap) {

    //values = [-10-10, 10-30, 30-50, 50-70, 70-90, 90+],
    //pal = [white, #ccffff, #33ccff, #0066ff, #3333ff, #000099],
    title = "Depth ranges of earthquakes";
//};
//legend.addTo(myMap);

//let legend = L.control({ position: "bottomright" });
//legend.onAdd = function() {
//  let div = [-10-10, 10-30, 30-50, 50-70, 70-90, 90+];
 // let limits = geojson.options.limits;
//  let colors = geojsonMarkerOptions.color;
//  let labels = [];
//};
//legend.addTo(myMap);