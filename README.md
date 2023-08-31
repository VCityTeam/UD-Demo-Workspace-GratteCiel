# UD-Demo-Workspace-GratteCiel

A demonstration for visualizing RDF semantic graphs alongside 3D City models using:
* [UD-Viz](https://github.com/VCityTeam/UD-Viz) a frontend web application for urban data visualization
  * In particular the SPARQL and Workspace modules from [UD-Viz](https://github.com/VCityTeam/UD-Viz) is used to visualize semantic urban data in the form of RDF
* [Blazegraph](https://blazegraph.com/) an RDF-Store for storing and serving semantic graph data with a SPARQL REST API

![image](https://user-images.githubusercontent.com/23373264/221232941-cdb54a4a-8b14-4145-b773-c801b3989c01.png)

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
git submodule init      # init UD-Viz
git submodule update    # update UD-Viz
```

### Component Setup
To configure the demo and the components that support it edit the `.env` file to be launched with docker-compose. By default, the following ports are used by the following services:
- 9010: `UD-Viz`
- 9013: `Blazegraph`

The following sections will describe how to configure this file for each component. 

### Build Images and run containers
First, build the Blazegraph docker image and run its container:
```
docker compose up
```

**Note:** Make sure to set the `sparqlModule/url` port in the `./ud-viz-context/config.json` file to the same port for the _Strabon_ container declared in the `.env` file.

Then install and run the UD-Viz application:
```
cd ud-viz-context
npm i
npm run debug
```

### Upload RDF-Store Dataset
To upload files into the RDF-store to be used by the sparqlModule:
1. Open a web browser and navigate to [localhost:9013/blazegraph](http://localhost:9013/blazegraph)
2. Click on the *UPDATE* tab
3. Set the *Type* dropdown to "File path or URL"
4. Copy and paste the following URLs into the text field, and click *Update*.
   1. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2009_2018_Workspace.rdf`
   2. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2009_2012.rdf`
   3. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2012_2015.rdf`
   4. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2015_2018.rdf`
   5. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2009_2009b.rdf`
   6. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2009b_2012b.rdf`
   7. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2012b_2015.rdf`

   Optional:
   8. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2009_alt_split.rdf`
   9. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2009_split.rdf`
   10. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2012_alt_split.rdf`
   11. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2012_split.rdf`
   12. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2015_split.rdf`
   13. `https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2018_split.rdf`

Now the UD-Viz demo is ready and can be accessed from [localhost:9010](http://localhost:9010)
