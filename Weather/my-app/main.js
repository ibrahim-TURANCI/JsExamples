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

var popup = new ol.Overlay({
  element: document.getElementById('popup'),
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -10],
});
map.addOverlay(popup);

    // Şehirler ve koordinatları
    var cities = [
      { name: 'Ankara', coordinates: [39.94, 32.86] },
      { name: 'İstanbul', coordinates: [41.04, 29.03] },
      { name: 'Konya', coordinates: [37.87, 32.49] },
      { name: 'İzmir', coordinates: [38.42, 27.14] },
      { name: 'Malatya', coordinates: [38.35, 38.33] }
    ];

    // Sayfa yüklendiğinde her şehir için popup ekleyin
    cities.forEach(city => {
      requestCityApi(city.coordinates[0], city.coordinates[1], city.name);
    });

    function requestCityApi(lat, lon, cityName) {
      var apiKey = '183f7b5c813f83be7dea5d605772da7b';
      var api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      fetch(api)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(result => {
          var temperature = result.list[0].main.temp;
          var icon = `<img src='http://openweathermap.org/img/wn/${result.list[0].weather[0].icon}@2x.png'>`;

          // Hava durumu bilgilerini ekrana yazdır
          var coordinate = ol.proj.fromLonLat([lon, lat]);
          var element = document.createElement('div');
          var content = `<span class="tempCity">${temperature}°C</span>`;
          element.className = 'ol-popup';
          element.innerHTML = `<a href="#" class="ol-popup-closer"></a><div class="popup-content"><p>${cityName}</p></div>`+icon+content;
          

          var cityPopup = new ol.Overlay({
            element: element,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -5],
          });

          cityPopup.setPosition(coordinate);
          map.addOverlay(cityPopup);

          // Popup kapatma işlemi
          element.querySelector('.ol-popup-closer').addEventListener('click', function() {
            cityPopup.setPosition(undefined);
          });
        })
    }


map.on('click', function (event) {
  var coordinates = event.coordinate;
  var lonLat = ol.proj.toLonLat(coordinates);

  const lon = lonLat[0].toFixed(2);
  const lat = lonLat[1].toFixed(2);

  popup.setPosition(coordinates);

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

/*   document.querySelector(".temp").innerText = Math.floor(temp)
  document.querySelector(".location").innerText = city
  document.querySelector(".w-icon").innerHTML = icon */

  document.querySelector(".temp").innerText = Math.floor(temp)
  document.querySelector(".location").innerText = city
  document.querySelector(".w-icon").innerHTML = icon
}
