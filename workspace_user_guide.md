# Workspaces User Guide
This is a user guide for using the Workspace functionality (currently under development) as a part of the SparqlQueryWidget. This is a UD-Viz Widget for visualizing urban graph data and interacting with objects in the 3D scene.

To open the Widget, click on the SPARQL Query button in the left panel:

## Interface

![Untitled drawing](https://user-images.githubusercontent.com/23373264/193422973-43391ead-2bf9-4113-9e92-216a5426f60e.png)

### Select Query
Use this dropdown menu to load one of several prewritten queries to vizualize urban data in UD-Viz. This demo features 5 queries:
1. **Show Full Workspace:** Return a visualization of the workspace graph (spaces, scenarios, versionTransitions, and versions) and their immediate properties 
2. **Show Versions and VersionTransitions:** Return a visualization of the versionTransitions, and versions of the workspace and their immediate properties
3. **Show Scenario 1:** Return a visualization of the versionTransitions and versions of `scenario_1` and their immediate properties
4. **Show Scenario 2:** Return a visualization of the versionTransitions and versions of `scenario_2` and their immediate properties
5. **Show Transition 2009-2012:** Return a visualization of the transactions and versionMembers of `versionTransition_2009_2012`, `version_2009`, `version_2012` and their immediate properties

### Show/Hide Query
This button can toggle whether the text area for the query to be submitted is shown or not. This also allows the query to be edited before submission.

Queries are written in [SPARQL](https://www.w3.org/TR/sparql11-query/)

### Select Result Visualization Format
Use this dropdown menu to select how the query result will be visualized. Currently 2 modes are presented:
1. Workspace - clicking on Version or VersionTransition will display the corresponding state of the city objects in 3D scene based on:
   1. The point in time of the clicked Version or Transition
   2. The (first) scenario that contains the clicked Version or Transition
2. Graph - clicking on a building node will zoom the camera on the building in the 3D scene

Not every query provides enough data to the Workspace or Graph visualizations, and thus serve only as a visual representation of the data. Here is a list of which queries support the funcionalities described above  :

| Query                                | Workspace Support (display corresponding Version or Transition) | Graph Support (zoom on building) |
| ------------------------------------ | --------------------------------------------------------------- | -------------------------------- |
| Show Full Workspace                  | 🟢                                                               | 🔴                                |
| Show Versions and VersionTransitions | 🔴                                                               | 🔴                                |
| Show Scenario 1                      | 🔴                                                               | 🔴                                |
| Show Scenario 2                      | 🔴                                                               | 🔴                                |
| Show Transition 2009-2012            | 🔴                                                               | 🟢                                |
