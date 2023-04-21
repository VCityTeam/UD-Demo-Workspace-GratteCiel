# SPARQL Query Widget User Guide
This is a user guide for using the SPARQL Widget (currently under development) in a UD-Viz application. This is a Widget for visualizing urban graph data and interacting with objects in the 3D scene.

To open the Widget, click on the SPARQL Query button in the left panel:

![221245183-33a9ada3-ac06-4c10-bb97-a0736e6421fd](https://user-images.githubusercontent.com/23373264/221245352-7ec094e5-5a81-4a3a-a428-44a31bad0bec.png)

## Interface

![Untitled drawing](https://user-images.githubusercontent.com/23373264/193422973-43391ead-2bf9-4113-9e92-216a5426f60e.png)

![image](https://user-images.githubusercontent.com/23373264/221206638-b2d477d9-650d-47c4-be64-eb809f9538a5.png)

### Select Query
Use this dropdown menu to load one of several prewritten queries to vizualize urban data in UD-Viz. This demo features 5 queries:
1. **Select a buildings and its details from 2015:** Select a specific building building from 2015 and visualize all of the related data points. Clicking on the node with the same color as the `citygml-bldg:Building` entry in the legend will zoom in on the specified building.
2. **Count the number of buildings in each year:** Count the number of buildings in each year from the dataset.
3. **Select All buildings from Gratte-Ciel 2015 (warning big query!):** Visualize the graph of the Gratte-Ciel dataset from 2015. Many of these nodes represent buildings and clicking on any building node will zoom in on the building in the 3D scene.
4. **Select 30 buildings from Gratte-Ciel 2009:** Select 30 random buildings from the Gratte Ciel dataset in 2009.
5. **Select 30 buildings from Gratte-Ciel 2012:** Select 30 random buildings from the Gratte Ciel dataset in 2012.
6. **Select 30 buildings from Gratte-Ciel 2015:** Select 30 random buildings from the Gratte Ciel dataset in 2015.
7. **Select 30 buildings from Gratte-Ciel 2018:** Select 30 random buildings from the Gratte Ciel dataset in 2018.

### Show/Hide Query
This button can toggle whether the text area for the query to be submitted is shown or not. This also allows the query to be edited before submission.

Queries are written in [SPARQL](https://www.w3.org/TR/sparql11-query/)

### Select Result Visualization Format
Use this dropdown menu to select how the query result will be visualized.
Note that in the **Graph** visualization format, clicking on a node with the legend color `citygml-bldg:Building` will zoom the camera on the building in the 3D scene.
