# leaflet_challenge

Brian Guenther

Utilizing the updating earthquake information through the United States Geological Survey (more specifically earthquakes of magnitude greater than 2.5 through https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson), I created an webpage that displays the earthquake with circle markers.  The radius of the circle depends on the magnitude of the earthquake and the color of the circle depends on the depth of the earthquake.  Increasing values result in either a bigger radius or a darker shade of color.  The background of the map is available through either a streetview or topographical version.  Additionally, a popup maker contains information on the nearest city, magnitude, and depth of the earthquake indicated.

The tutor was helpful at guiding me to the leaflet documentation for working with JSON data, and the example in that tutorial provided some of the initial code.
Using GeoJSON with Leaflet - Leaflet - a JavaScript library for interactive maps (leafletjs.com) 

Additional websites that I found useful were:
For squares in javascript
https://stackoverflow.com/questions/26593302/whats-the-fastest-way-to-square-a-number-in-javascript 
For changing color based on depth of the earthquake, was aided by
https://stackoverflow.com/questions/62236447/change-style-of-geojson-circle-marker-by-feature-property-value 
For color codes I found this link most helpful
www.visibone.com/color/hexagon_800.gif

Otherwise, I utilized examples from class and variations with the code to complete every step except the legend.  My first attempt of adding a legend turned out to be based on an example from R.  My second attempt was based on the code example in the leaflet tutorial for adding a legend to a Choropleth Map, which did not prompt an error but also did not display a legend.  I suspect that there may be issues with either the css file or how I call the legend in the html file but am out of time to explore this possibility.
