import './style.css';
import { Map, View } from 'ol';
import { decode } from 'ol/Image';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

let api;
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

  requestApi(lat, lon);
  latElement.textContent = 'Latitude: ' + lat;
  lonElement.textContent = 'Longitude: ' + lon;

  infoDiv.style.display = 'block';
  infoDiv.style.opacity = 0.7;
  console.log(infoDiv);
});
map.on('pointermove', function () {
  infoDiv.style.display = 'none';
});

function requestApi(lat, lon) {
  console.log(lat, lon);
  //&units=metric (Birim dönüşümü derece)
  api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=183f7b5c813f83be7dea5d605772da7b`
  fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

function weatherDetails(info) {
  console.log(info)
  const city = info.city.name
  const temp = info.list[0].main.temp
  const icon = ("<img src='http://openweathermap.org/img/wn/" + info.list[0].weather[0].icon + "@2x.png'>")

  document.querySelector(".temp").innerText = Math.floor(temp)
  document.querySelector(".location").innerText = city
  document.querySelector(".w-icon").innerHTML = icon
}