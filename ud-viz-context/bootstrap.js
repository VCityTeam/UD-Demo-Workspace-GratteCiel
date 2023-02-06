/** @format */

import * as udviz from 'ud-viz';
import { SparqlModule } from './SPARQL/SparqlModule';

const app = new udviz.Templates.AllWidget();

app.start('../assets/config/config.json').then((config) => {

  ////// ABOUT MODULE
  const about = new udviz.Widgets.AboutWindow();
  app.addModuleView('about', about);

  ////// HELP MODULE
  const help = new udviz.Widgets.Extensions.HelpWindow(config.helpWindow);
  app.addModuleView('help', help);

  ////// CITY OBJECTS MODULE
  let cityObjectModule = new udviz.Widgets.CityObjectModule(
    app.view3D.layerManager,
    app.config
  );
  app.addModuleView('cityObjects', cityObjectModule.view);

  ////// 3DTILES DEBUG
  const debug3dTilesWindow = new udviz.Widgets.Debug3DTilesWindow(
    app.view3D.layerManager
  );
  app.addModuleView('3dtilesDebug', debug3dTilesWindow, {
    name: '3DTiles Debug',
  });

  ////// CAMERA POSITIONER
  const cameraPosition = new udviz.Widgets.CameraPositionerView(
    app.view3D.getItownsView()
  );
  app.addModuleView('cameraPositioner', cameraPosition);

  ////// LAYER CHOICE MODULE
  const layerChoice = new udviz.Widgets.LayerChoice(app.view3D.layerManager);
  app.addModuleView('layerChoice', layerChoice);

  const inputManager = new udviz.Components.InputManager();
  ///// SLIDESHOW MODULE
  const slideShow = new udviz.Widgets.SlideShow(app, inputManager);
  app.addModuleView('slideShow', slideShow);

  ////// TEMPORAL MODULE
  const temporalModule = new udviz.Widgets.TemporalModule(
    app.view3D.getLayerManager().tilesManagers[0],
    app.config.temporalModule
  );
  app.addModuleView('temporal', temporalModule.view);
  
  ////// SPARQL MODULE
  const sparqlModule = new SparqlModule(
    app.config,
    app.view3D.getLayerManager()
  );
  app.addModuleView('sparqlModule', sparqlModule.view, {
    name: 'Data Explorer',
  });
});
