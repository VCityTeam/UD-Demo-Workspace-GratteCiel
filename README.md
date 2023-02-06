# UD-Demo-Workspace-GratteCiel

A demonstration for visualizing RDF semantic graphs alongside 3D City models using:
* [UD-Viz](https://github.com/VCityTeam/UD-Viz) as a frontend web application for urban data visualization
  * In particular the [SPARQL module](https://github.com/VCityTeam/UD-Viz/tree/master/src/Widgets/Extensions/SPARQL) is used to visualize semantic urban data in the form of RDF
* [Strabon RDF Store](http://www.strabon.di.uoa.gr/) an RDF-Store for storing and serving geospatial semantic graph data in the form of RDF
* [PostGIS](https://postgis.net/) a geospatial database extension of [PostgreSQL](https://www.postgresql.org/) used here as a backend database for Strabon

### Component Diagram
![SPARQL POC Component Diagram](./UD-Demo_SPARQL_POC_Component_Diagram.svg)

## Installation
### Pre-requisites 

* [Install Docker](https://docs.docker.com/engine/install/)
* [Install Docker Compose](https://docs.docker.com/compose/install/)

### Component Setup
To begin, clone the repository:
```
git clone https://github.com/VCityTeam/UD-Demo-Workspace-GratteCiel.git
```

To configure the demo and the components that support it edit the `.env` file to be launched with docker-compose. By default the following ports are used by the following services:
- 8996: `PostGIS`
- 8997: `Strabon`
- 8998: `UD-Viz`

The following sections will describe how to configure this file for each component. 

### Build Images and run containers
First, build the PostGIS, Strabon, and UD-Viz docker images and run their containers:
```
docker-compose up
```

**Note:** Make sure to set the `sparqlModule/url` port in the `./ud-viz-context/config.json` file to the same port for the _Strabon_ container declared in the `.env` file. If these ports are ever changed after building the images, the _UD-Viz_ image must be rebuilt:
```
docker-compose rm udviz
docker-compose build udviz
```

### Populate RDF-Store
To populate the Blazegraph database, open the user inteface in a web browser ([http://localhost:8997/bigdata](http://localhost:8997/bigdata) by default)

Open the UPDATE tab and enter the following query into the textbox:
```
# TBox
### citygml 3.0 ontologies
load <https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/CityGML/3.0/core.ttl>
load <https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/CityGML/3.0/construction.ttl>
load <https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/CityGML/3.0/building.ttl>
load <https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/CityGML/3.0/versioning.ttl>
### workspace
load <https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/Workspace/3.0/workspace.ttl>
load <https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Ontologies/Workspace/3.0/transactiontype.ttl>

# ABox
load <https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2009_2018_Workspace.ttl>
```
