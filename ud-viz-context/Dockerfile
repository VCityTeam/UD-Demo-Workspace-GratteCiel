FROM ubuntu:focal

LABEL maintainer "VCityTeam"
LABEL source.repo "https://github.com/VCityTeam/UD-Viz-docker"

RUN apt-get update

# Node version 14 is required. For its installation (on focal) refer to e.g.
#  https://computingforgeeks.com/install-node-js-14-on-ubuntu-debian-linux/
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN node --version
RUN npm --version
RUN apt-get install -y git
RUN git --version

######### Install SimpleServer (an ExpressJS based...simple server)
WORKDIR /
RUN git clone https://github.com/VCityTeam/UD-SimpleServer
WORKDIR /UD-SimpleServer
RUN npm install

######### Install UD-Viz-Template, a basic web application for UD-Viz projects
ARG checkoutName=master
WORKDIR /
RUN git clone https://github.com/VCityTeam/UD-Viz-Template.git
WORKDIR /UD-Viz-Template
COPY package.json               /UD-Viz-Template/package.json
RUN npm install
COPY bootstrap.js               /UD-Viz-Template/src/bootstrap.js
COPY CityObjectProviderPatch.js /UD-Viz-Template/src/CityObjectProviderPatch.js
COPY SPARQL/SparqlModule.js     /UD-Viz-Template/src/SPARQL/SparqlModule.js
COPY SPARQL/Model/Graph.js                  /UD-Viz-Template/src/SPARQL/Model/Graph.js
COPY SPARQL/Model/SparqlEndpointService.js  /UD-Viz-Template/src/SPARQL/Model/SparqlEndpointService.js
COPY SPARQL/Model/Table.js                  /UD-Viz-Template/src/SPARQL/Model/Table.js
COPY SPARQL/Model/URI.js                    /UD-Viz-Template/src/SPARQL/Model/URI.js
COPY SPARQL/View/JsonRenderer.js        /UD-Viz-Template/src/SPARQL/View/JsonRenderer.js
COPY SPARQL/View/SparqlModuleView.js    /UD-Viz-Template/src/SPARQL/View/SparqlModuleView.js
COPY SPARQL/View/SparqlQueryWindow.js   /UD-Viz-Template/src/SPARQL/View/SparqlQueryWindow.js
COPY SPARQL/View/SparqlQueryWindow.css  /UD-Viz-Template/src/SPARQL/View/SparqlQueryWindow.css
COPY SPARQL/ViewModel/SparqlEndpointResponseProvider.js /UD-Viz-Template/src/SPARQL/ViewModel/SparqlEndpointResponseProvider.js
COPY index.html /UD-Viz-Template/index.html
RUN npm run build-debug
# RUN npm run build

# Add/overwrite default assets
COPY assets/config.json                 /UD-Viz-Template/assets/config/config.json
COPY assets/dataExplorerUserGuide.html  /UD-Viz-Template/assets/html/dataExplorerUserGuide.html
COPY assets/sparqlModule.svg            /UD-Viz-Template/assets/icons/sparqlModule.svg

WORKDIR /UD-SimpleServer
EXPOSE 80
CMD [ "node", "./index.js", "/UD-Viz-Template", "80" ]