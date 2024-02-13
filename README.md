# UD-Demo-Workspace-GratteCiel

A demonstration for visualizing RDF semantic graphs alongside 3D City models using:
* [UD-Viz](https://github.com/VCityTeam/UD-Viz) a frontend web application for urban data visualization
  * In particular the SPARQL and Workspace modules from [UD-Viz](https://github.com/VCityTeam/UD-Viz) is used to visualize semantic urban data in the form of RDF
* [Blazegraph](https://blazegraph.com/) an RDF-Store for storing and serving semantic graph data with a SPARQL REST API

![image](https://github.com/VCityTeam/UD-Demo-Workspace-GratteCiel/assets/23373264/27f9d2b0-ca1e-4779-a213-ba6447f16785)

### Component Diagram
![SPARQL POC Component Diagram](./UD-Demo_SPARQL_POC_Component_Diagram.svg)

## Installation

### Pre-requisites 

* [Install Docker](https://docs.docker.com/engine/install/)

### Repository setup
Currently, the UD-Viz framework must be initialized after cloning this repository.
```
git clone https://github.com/VCityTeam/UD-Demo-Workspace-GratteCiel.git
cd UD-Demo-Workspace-GratteCiel
```

### Component Setup
To configure the demo and the components that support it edit the `.env` file to be launched with docker-compose. By default, the following ports are used by the following services:
- 9010: `UD-Viz`
- 9011: `Blazegraph`

The following sections will describe how to configure this file for each component. 

### Build Images and run containers
First, make sure to set the `sparqlModule/url` port in the [./ud-viz-context/assets/config/server/workspace_server.json file](./ud-viz-context/assets/config/server/workspace_server.json) to the same value as the `BLAZEGRAPH_PORT` variable declared in the [.env](./.env) file.

Then build the Blazegraph docker image and run its container:
```
docker compose up
```

### Upload RDF-Store Dataset
To upload files into the RDF-store to be used by the sparqlModule run the [./loadData.sh](./loadData.sh) script with the blazegraph port as a parameter: 
```bash
./loadData.sh 9011 > log.html
```

Now the UD-Viz demo is ready and can be accessed from [localhost:9010](http://localhost:9010)
