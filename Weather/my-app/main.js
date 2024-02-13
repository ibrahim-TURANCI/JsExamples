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

    // Adding a div with latitude and longitude on the map
    var infoDiv = document.getElementById('info');
    var latElement = document.getElementById('lat');
    var lonElement = document.getElementById('lon');

    map.on('click', function (event) {
      var coordinates = event.coordinate;
      var lonLat = ol.proj.toLonLat(coordinates);

      const lon = lonLat[0].toFixed(2);
      const lat = lonLat[1].toFixed(2);
      
requestApi(lat,lon);
      latElement.textContent = 'Latitude: ' + lat;
      lonElement.textContent = 'Longitude: ' + lon;

      infoDiv.style.display = 'block';
      infoDiv.style.opacity = 0.7;
      console.log(infoDiv);
    });
    map.on('pointermove', function () {
      infoDiv.style.display = 'none';
    });

    function requestApi(lat,lon){
      console.log(lat,lon);
      let api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=183f7b5c813f83be7dea5d605772da7b`
      fetch(api).then(response => console.log(response.json()))
/*       fetch(api)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response.json());
    return response.json();
  })
  .then(data => {
    console.log('Weather Forecast Data:', data);
    // Use the data as needed
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
  }); */
    }
