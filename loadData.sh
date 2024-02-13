#!/bin/bash

# curl -X POST --data-binary 'uri=tbox.ttl' "http://localhost:$1/blazegraph/sparql"
curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2009_2018_Workspace.rdf' http://127.0.0.1:9011/blazegraph/sparql
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2009_2018_Workspace.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2009_2012.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2012_2015.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2015_2018.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2009_2009b.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2009b_2012b.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/Transition_2012b_2015.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2009_alt_split.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2009_split.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2012_alt_split.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2012_split.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2015_split.rdf' "http://localhost:$1/blazegraph/sparql"
# curl -X POST --data-binary 'uri=https://dataset-dl.liris.cnrs.fr/rdf-owl-urban-data-ontologies/Datasets/GratteCiel_Workspace_2009_2018/3.0/GratteCiel_2018_split.rdf' "http://localhost:$1/blazegraph/sparql"