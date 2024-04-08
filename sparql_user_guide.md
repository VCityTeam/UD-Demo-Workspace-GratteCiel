# SPARQL Query Widget User Guide
This is a user guide for using the SPARQL Widget (currently under development) in a UD-Viz application. This is a Widget for visualizing urban graph data and interacting with objects in the 3D scene.

## Interface

![Untitled drawing](https://user-images.githubusercontent.com/23373264/193422973-43391ead-2bf9-4113-9e92-216a5426f60e.png)

### Select Query
Use this dropdown menu to load one of several prewritten queries to vizualize urban data in UD-Viz. This demo features 5 queries:
1. **Show Workspace:** Show the entire workspace dataset including both scenarios of evolution, their spaces, and the versions and version transitions contained within.
1. **Show Workspace (without spaces):** Show the workspace without (concensus and proposition) spaces. This is a bit visually cleaner than the first query. 
2. **Show Workspace (without spaces and scenarios):** Show just the versions and version transitions of the workspace. This is visually cleaner than the previous queries for understanding the structure of both scenarios of evolution, but clicking on version or version transition nodes will not update the 3D scene in this query (scenarios must be included in the query for UD-Viz to deduce which 3D city model to show).
3. **Show only Scenario 1 Versions and Transitions:** Show just the versions and version transitions from scenario 1.
4. **Show Scenario 2 Versions and Transitions:** Same as previous query but for scenario 2.
5. **Show Transition 2015 -> 2018 (warning: big query):** Show the building transactions (individual changes) that occurred between 2015 and 2018.

### Show/Hide Query
This button can toggle whether the text area for the query to be submitted is shown or not. This also allows the query to be edited before submission.

Queries are written in [SPARQL](https://www.w3.org/TR/sparql11-query/)

### Select Result Visualization Format
Use this dropdown menu to select how the query result will be visualized. Only one visualization format is proposed for this demo so this dropdown is not very useful...

### Interacting with the Graph
Once a query is sent and a graph is visualized, clicking on a node with the legend color `vers:Version` or `vers:VersionTransition` will update the 3D scene to show the city at that time (if a version is clicked) or what buildings were changes between two versions (if a transition is clicked).

![image](https://user-images.githubusercontent.com/23373264/221206638-b2d477d9-650d-47c4-be64-eb809f9538a5.png)