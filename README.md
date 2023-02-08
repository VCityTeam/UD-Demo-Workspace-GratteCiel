# UD-Demo-Workspace-GratteCiel

A demonstration for visualizing RDF semantic graphs alongside 3D City models using:
* [UD-Viz](https://github.com/VCityTeam/UD-Viz) as a frontend web application for urban data visualization
  * In particular the [SPARQL module](https://github.com/VCityTeam/UD-Viz/tree/master/src/Widgets/Extensions/SPARQL) is used to visualize semantic urban data in the form of RDF
* [Blazegraph](https://github.com/blazegraph/database/wiki/About_Blazegraph) an RDF-Store for storing and serving geospatial semantic graph data in the form of RDF with a SPARQL API

### Component Diagram
![SPARQL POC Component Diagram](./UD-Demo_SPARQL_POC_Component_Diagram.svg)

## Installation
### Pre-requisites 

* [Install Docker](https://docs.docker.com/engine/install/)
* [Install Docker Compose](https://docs.docker.com/compose/install/)
* [Install Node/npm](https://github.com/VCityTeam/UD-Viz#installing-nodenpm)

### Component Setup
To begin, clone and initialize the repository:
```
git clone https://github.com/VCityTeam/UD-Demo-Workspace-GratteCiel.git
git submodule init      # init UD-Viz
git submodule update    # update UD-Viz 
```


To configure the demo and the components that support it edit the `.env` file to be launched with docker-compose. By default the following ports are used by the following services:
- 8997: `Blazegraph`
- 8998: `UD-Viz`

The following sections will describe how to configure this file for each component. 

### Build run Blazegraph
First, build the Blazegraph, and UD-Viz docker images and run their containers:
```
docker-compose up
```

**Note:** Make sure to set the `sparqlModule/url` port in the [./ud-viz-context/assets/config.json](./ud-viz-context/assets/config.json) file to the same port for the **Blazegraph** container declared in the `.env` file. 
### Populate Blazegraph
To populate the Blazegraph database, open the user inteface in a web browser ([http://localhost:8997/bigdata](http://localhost:8997/bigdata) by default)

1. Select the **UPDATE** tab
2. Set the `type` dropdown to **"File Path or URL"**
3. Enter the following URLs into the textbox and select `Update` for each URL:
   1. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/CityGML/3.0/core.ttl`
   2. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/CityGML/3.0/construction.ttl`
   3. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/CityGML/3.0/building.ttl`
   4. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/CityGML/3.0/versioning.ttl`
   5. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/Workspace/3.0/workspace.ttl`
   6. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/Workspace/3.0/transactiontype.ttl`
   7.  `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2009_2018_Workspace.ttl`
