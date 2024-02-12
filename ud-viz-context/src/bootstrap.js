/** @format */

import { SparqlEndpointResponseProvider } from "@ud-viz/widget_sparql";
import { SparqlWorkspaceQueryWindow } from "@ud-viz/widget_workspace";
import {
  loadMultipleJSON,
  initScene,
  getUriLocalname,
  loadingScreen
} from "@ud-viz/utils_browser";
import * as extension3DTilesTemporal from "@ud-viz/extensions_3d_tiles_temporal";
import * as proj4 from "proj4";
import * as itowns from "itowns";
/* eslint-disable no-new */

loadMultipleJSON([
  "./assets/config/crs.json",
  "./assets/config/extents.json",
  "./assets/config/layer/3DTiles.json",
  "./assets/config/layer/base_maps.json",
  "./assets/config/layer/elevation.json",
  "./assets/config/widget/workspace_widget.json",
  "./assets/config/server/workspace_server.json",
]).then((configs) => {
  proj4.default.defs(configs["crs"][0].name, configs["crs"][0].transform);

  const extent = new itowns.Extent(
    configs["extents"].name,
    parseInt(configs["extents"].west),
    parseInt(configs["extents"].east),
    parseInt(configs["extents"].south),
    parseInt(configs["extents"].north)
  );

  // create a itowns planar view
  const viewDomElement = document.createElement("div");
  viewDomElement.classList.add("full_screen");
  document.body.appendChild(viewDomElement);
  const view = new itowns.PlanarView(viewDomElement, extent);

  // eslint-disable-next-line no-constant-condition
  if ("RUN_MODE" == "production")
    loadingScreen(view, ["UD-VIZ", "UDVIZ_VERSION"]);

  // init scene 3D
  initScene(view.camera.camera3D, view.mainLoop.gfxEngine.renderer, view.scene);

  // add a 3DTiles temporal layer

  const extensions = new itowns.C3DTExtensions();
  extensions.registerExtension(extension3DTilesTemporal.ID, {
    [itowns.C3DTilesTypes.batchtable]:
      extension3DTilesTemporal.C3DTTemporalBatchTable,
    [itowns.C3DTilesTypes.boundingVolume]:
      extension3DTilesTemporal.C3DTTemporalBoundingVolume,
    [itowns.C3DTilesTypes.tileset]:
      extension3DTilesTemporal.C3DTTemporalTileset,
  });

  configs["3DTiles"].forEach((layerConfig) => {
    const c3DTilesLayer = new itowns.C3DTilesLayer(
      layerConfig.id,
      {
        name: layerConfig.id,
        source: new itowns.C3DTilesSource({
          url: layerConfig.url,
        }),
        registeredExtensions: extensions,
      },
      view
    );

    itowns.View.prototype.addLayer.call(view, c3DTilesLayer);
  });

  view.addLayer(
    new itowns.ColorLayer(configs["base_maps"][0]["name"], {
      updateStrategy: {
        type: itowns.STRATEGY_DICHOTOMY,
        options: {},
      },
      source: new itowns.WMSSource({
        extent: extent,
        name: configs["base_maps"][0]["source"]["name"],
        url: configs["base_maps"][0]["source"]["url"],
        version: configs["base_maps"][0]["source"]["version"],
        crs: extent.crs,
        format: configs["base_maps"][0]["source"]["format"],
      }),
      transparent: true,
    })
  );

  const isTextureFormat =
    configs["elevation"]["format"] == "image/jpeg" ||
    configs["elevation"]["format"] == "image/png";
  view.addLayer(
    new itowns.ElevationLayer(configs["elevation"]["layer_name"], {
      useColorTextureElevation: isTextureFormat,
      colorTextureElevationMinZ: isTextureFormat
        ? configs["elevation"]["colorTextureElevationMinZ"]
        : null,
      colorTextureElevationMaxZ: isTextureFormat
        ? configs["elevation"]["colorTextureElevationMaxZ"]
        : null,
      source: new itowns.WMSSource({
        extent: extent,
        url: configs["elevation"]["url"],
        name: configs["elevation"]["name"],
        crs: extent.crs,
        heightMapWidth: 256,
        format: configs["elevation"]["format"],
      }),
    })
  );

  // //// SPARQL Workspace widget
  const temporalWrappers = new Map();
  view
    .getLayers()
    .filter(
      (el) =>
        el.isC3DTilesLayer &&
        el.registeredExtensions.isExtensionRegistered(
          extension3DTilesTemporal.ID
        )
    )
    .forEach((layer) => {
      temporalWrappers.set(
        layer.id,
        new extension3DTilesTemporal.Temporal3DTilesLayerWrapper(layer)
      );
    });

  const sparqlWorkspaceWidgetView = new SparqlWorkspaceQueryWindow(
    new SparqlEndpointResponseProvider(configs["workspace_server"]),
    configs["workspace_widget"]
  );

  sparqlWorkspaceWidgetView.domElement.classList.add("widget_workspace");
  sparqlWorkspaceWidgetView.dataView.classList.add("data_view");
  sparqlWorkspaceWidgetView.table.filterSelect.classList.add("table_filter");

  // Add UI
  const uiDomElement = document.createElement("div");
  uiDomElement.classList.add("full_screen");
  document.body.appendChild(uiDomElement);
  uiDomElement.appendChild(sparqlWorkspaceWidgetView.domElement);

  // Add listeners for D3Canvas node events. Three events are possible 'click', 'mouseover', and 'mouseout'
  sparqlWorkspaceWidgetView.d3Graph.addEventListener("click", (event) => {
    // Get clicked node's data, if nodeData.type is 'Version' or 'VersionTransition', select the appropriate
    // temporalwrapper that contains the 3DTiles representation of the version or transition,
    // then set the time of the temporal wrapper to visualize the 3DTiles representation of the version or transition.
    const nodeData = sparqlWorkspaceWidgetView.d3Graph.data.getNodeByIndex(
      event.datum.index
    );
    const nodeType = getUriLocalname(nodeData.type);
    if (nodeType == "Version" || nodeType == "VersionTransition") {
      /* find the first scenario that contains the clicked node,
       * find the temporal the geometry layer with the same name, and
       * set the current time to the averaged timestamps linked to the node
       */
      const scenarioLayerName =
        sparqlWorkspaceWidgetView.getScenarioLayerNameByIndex(
          event.datum.index,
          view
        );
      const scenarioLayer = view
        .getLayers()
        .filter((el) => el.isC3DTilesLayer)
        .find((layer) => {
          return layer.name == scenarioLayerName;
        });

      console.debug(scenarioLayer);

      // if a layer is found, make sure it is visible and hide all other layers
      if (scenarioLayer) {
        view
          .getLayers()
          .filter((el) => el.isC3DTilesLayer)
          .forEach((layer) => (layer.visible = layer == scenarioLayer));

        // Calculate the average timestamp of the clicked node
        const timestamps =
          sparqlWorkspaceWidgetView.getBitemporalTimestampsByIndex(
            event.datum.index
          );
        const timestampAverage =
          (timestamps.validTo - timestamps.validFrom) / 2 +
          timestamps.validFrom;

        // set style temporal layer with the date
        temporalWrappers.get(scenarioLayer.id).styleDate = timestampAverage;

        view.notifyChange();
      }
    }
  });
  
  // Create div to integrate logo image
  const logoDiv = document.createElement('div');
  document.body.appendChild(logoDiv);
  logoDiv.id = 'logo-div';
  const img = document.createElement('img');
  logoDiv.appendChild(img);
  img.src = './assets/img/logo/logo-liris.png';
  img.classList.add('logos');
});
