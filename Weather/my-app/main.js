import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
/* 
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
}); */

var osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});

// Turkey boundaries WMS layer
var turkeyLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://ahocevar.com/geoserver/wms',
    params: { 'LAYERS': 'topp:states', 'TILED': true },
    serverType: 'geoserver',
    crossOrigin: 'anonymous'
  })
});

var map = new ol.Map({
  target: 'map',
  layers: [osmLayer, turkeyLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat([35.8617, 39.1310]), // Ankara coordinates
    zoom: 7
  })
});
