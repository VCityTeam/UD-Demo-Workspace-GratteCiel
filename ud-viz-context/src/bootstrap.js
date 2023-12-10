/** @format */

import * as udvizBrowser from "@ud-viz/browser";
/* eslint-disable no-new */

// there has to be a better way to do this...
var element = document.createElement('link');
element.setAttribute('rel', 'stylesheet');
element.setAttribute('type', 'text/css');
element.setAttribute('href', './assets/css/SparqlQueryWindow.css');
document.getElementsByTagName('head')[0].appendChild(element);

udvizBrowser
.loadMultipleJSON([
  './assets/config/crs.json',
  './assets/config/extent_lyon.json',
  './assets/config/frame3D_planars.json',
  './assets/config/layer/3DTiles.json',
  './assets/config/layer/base_maps.json',
  './assets/config/layer/elevation.json',
  './assets/config/widget/sparql_widget.json',
  './assets/config/server/sparql_server.json',
])
.then((configs) => {
  udvizBrowser.proj4.default.defs(
    configs['crs'][0].name,
    configs['crs'][0].transform
  );

  const extent = new udvizBrowser.itowns.Extent(
    configs['extent_lyon'][0].name,
    parseInt(configs['extent_lyon'][0].west),
    parseInt(configs['extent_lyon'][0].east),
    parseInt(configs['extent_lyon'][0].south),
    parseInt(configs['extent_lyon'][0].north)
  );

  const frame3DPlanar = new udvizBrowser.Frame3DPlanar(
    extent,
    configs['frame3D_planars'][3]
  );

  // /// ADD LAYERS
  udvizBrowser.Widget.Temporal.add3DTilesTemporalFromConfig(
    configs['3DTiles'],
    frame3DPlanar.itownsView
  );

  frame3DPlanar.itownsView.addLayer(
    new udvizBrowser.itowns.ColorLayer(
      configs['base_maps'][0]['layer_name'],
      {
        updateStrategy: {
          type: udvizBrowser.itowns.STRATEGY_DICHOTOMY,
          options: {},
        },
        source: new udvizBrowser.itowns.WMSSource({
          extent: extent,
          name: configs['base_maps'][0]['name'],
          url: configs['base_maps'][0]['url'],
          version: configs['base_maps'][0]['version'],
          crs: extent.crs,
          format: configs['base_maps'][0]['format'],
        }),
        transparent: true,
      }
    )
  );

  const isTextureFormat =
    configs['elevation']['format'] == 'image/jpeg' ||
    configs['elevation']['format'] == 'image/png';
  frame3DPlanar.itownsView.addLayer(
    new udvizBrowser.itowns.ElevationLayer(
      configs['elevation']['layer_name'],
      {
        useColorTextureElevation: isTextureFormat,
        colorTextureElevationMinZ: isTextureFormat
          ? configs['elevation']['colorTextureElevationMinZ']
          : null,
        colorTextureElevationMaxZ: isTextureFormat
          ? configs['elevation']['colorTextureElevationMaxZ']
          : null,
        source: new udvizBrowser.itowns.WMSSource({
          extent: extent,
          url: configs['elevation']['url'],
          name: configs['elevation']['name'],
          crs: extent.crs,
          heightMapWidth: 256,
          format: configs['elevation']['format'],
        }),
      }
    )
  );

  // //// SPARQL Workspace widget
  const temporalWrappers = new Map();
  frame3DPlanar.itownsView
    .getLayers()
    .filter(
      (el) =>
        el.isC3DTilesLayer &&
        el.registeredExtensions.isExtensionRegistered(
          '3DTILES_temporal'
        )
    )
    .forEach((layer) => {
      temporalWrappers.set(
        layer.id,
        new udvizBrowser.Widget.Temporal.Temporal3DTilesLayerWrapper(
          layer
        )
      );
    });

  const sparqlWorkspaceWidgetView =
    new udvizBrowser.Widget.Server.SparqlWorkspaceQueryWindow(
      new udvizBrowser.Widget.Server.SparqlEndpointResponseProvider(
        configs['sparql_server']
      ),
      configs['sparql_widget']
    );

  sparqlWorkspaceWidgetView.domElement.id = '_window_sparqlQueryWindow';
  sparqlWorkspaceWidgetView.dataView.id = '_window_sparqlQueryWindow_data_view';

  frame3DPlanar.domElementUI.appendChild(
    sparqlWorkspaceWidgetView.domElement
  );

  // Add listeners for D3Canvas node events. Three events are possible 'click', 'mouseover', and 'mouseout'
  sparqlWorkspaceWidgetView.d3Graph.addEventListener(
    'click',
    (event) => {
      // Get clicked node's data, if nodeData.type is 'Version' or 'VersionTransition', select the appropriate
      // temporalwrapper that contains the 3DTiles representation of the version or transition,
      // then set the time of the temporal wrapper to visualize the 3DTiles representation of the version or transition.
      const nodeData =
        sparqlWorkspaceWidgetView.d3Graph.data.getNodeByIndex(
          event.datum.index
        );
      const nodeType = udvizBrowser.getUriLocalname(nodeData.type);
      if (nodeType == 'Version' || nodeType == 'VersionTransition') {
        /* find the first scenario that contains the clicked node,
         * find the temporal the geometry layer with the same name, and
         * set the current time to the averaged timestamps linked to the node
         */
        const scenarioLayerName =
          sparqlWorkspaceWidgetView.getScenarioLayerNameByIndex(
            event.datum.index,
            frame3DPlanar.itownsView
          );
        const scenarioLayer = frame3DPlanar.itownsView
          .getLayers()
          .filter((el) => el.isC3DTilesLayer)
          .find((layer) => {
            return layer.name == scenarioLayerName;
          });

        console.debug(scenarioLayer);

        // if a layer is found, make sure it is visible and hide all other layers
        if (scenarioLayer) {
          frame3DPlanar.itownsView
            .getLayers()
            .filter((el) => el.isC3DTilesLayer)
            .forEach(
              (layer) => (layer.visible = layer == scenarioLayer)
            );

          // Calculate the average timestamp of the clicked node
          const timestamps =
            sparqlWorkspaceWidgetView.getBitemporalTimestampsByIndex(
              event.datum.index
            );
          const timestampAverage =
            (timestamps.validTo - timestamps.validFrom) / 2 +
            timestamps.validFrom;

          // set style temporal layer with the date
          temporalWrappers.get(scenarioLayer.id).styleDate =
            timestampAverage;

          frame3DPlanar.itownsView.notifyChange();
        }
      }
    }
  );
});
