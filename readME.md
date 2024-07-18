Here I will add my readme information. 

Instructions
The instructions for this activity are broken into two parts:


Part 1: Create the Earthquake Visualization

Your first task is to visualize an earthquake dataset. Complete the following steps:
Get your dataset. To do so, follow these steps:

1) The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualize. The following image is an example screenshot of what appears when you visit this link:
2) When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualization. The following image is a sampling of earthquake data in JSON format:

Import and visualize the data by doing the following:

1) Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
    2) Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
    Hint: The depth of the earth can be found as the third coordinate for each earthquake.

3) Include popups that provide additional information about the earthquake when its associated marker is clicked.

4) Create a legend that will provide context for your map data.

5) Your visualization should look something like the preceding map.


Part 2: Gather and Plot More Data (Optional with no extra points earning)

Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplatesLinks to an external site..

1) This part is completely optional; you can complete this part as a way to challenge yourself and boost your new skills.


Perform the following tasks:

1) Plot the tectonic plates dataset on the map in addition to the earthquakes.

2) Add other base maps to choose from.

3) Put each dataset into separate overlays that can be turned on and off independently.

4) Add layer controls to your map.

Requirements
These requirements apply only to "Part 1: Create the Earthquake Visualization" as "Part 2" is optional with no extra points earning.

Map (60 points)
TileLayer loads without error (20 points)

Connects to geojson API using D3 without error (20 points)

Markers with size corresponding to earthquake magnitude (10 points)

A legend showing the depth and their corresponding color (10 points)

Data Points (40 points)
Data points scale with magnitude level (10 points)

Data points colors change with depth level (10 points)

Each point has a tooltip with the Magnitude, the location and depth (10 points)

All data points load in the correct locations (10 points)