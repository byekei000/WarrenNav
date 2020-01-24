require('leaflet-geometryutil');
require('leaflet-snap');
require('leaflet-routing-machine');
var L = require('leaflet');
// var turf = require('@turf/turf');
var PathFinder = require('geojson-path-finder');
var geojson = require('./test.json');
var pathFinder = new PathFinder(geojson, {precision: 1e-5});
var map = L.map('map',{ center:[39.79130734516531, -86.00025283002853], zoom: 18});
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap', maxZoom: 21, maxNativeZoom: 19, minZoom: 1}).addTo(map);
var guide = L.geoJSON(geojson, {style: {color:"white", weight:5, fillColor:"blue"}}).addTo(map);
var startLngLat = [-86.00126892328261, 39.79148171548422];
var finishLngLat = [-86.00163906812668, 39.79133538772051];
// var startPos = document.getElementById('dropdown').value;
var startMarker = L.marker([startLngLat[1],startLngLat[0]]).addTo(map);
var finishMarker = L.marker([finishLngLat[1],finishLngLat[0]]).addTo(map);
// startPos = localStorage.getItem("start");
window.hi = function(startPos){
    if(startPos === "a100"){
        startLngLat = [-86.00126892328261, 39.79148171548422];
    } else if(startPos === "a200"){
        startLngLat = [-86.00096315145493, 39.791840320236936];
    } else if(startPos === "a300"){
        startLngLat = [-86.00107043981552, 39.79135187537143];
    } else if(startPos === "a400"){
        startLngLat = [-86.00120455026627, 39.79065114672283];
    }
    startMarker.setLatLng([startLngLat[1],startLngLat[0]]);
    updatePath(startLngLat[1], startLngLat[0], finishLngLat[1], finishLngLat[0]);
};
window.hello = function(finishPos){
    if(finishPos === "a100"){
        finishLngLat = [-86.00126892328261, 39.79148171548422];
    } else if(finishPos === "a200"){
        finishLngLat = [-86.00096315145493, 39.791840320236936];
    } else if(finishPos === "a300"){
        finishLngLat = [-86.00107043981552, 39.79135187537143];
    } else if(finishPos === "a400"){
        finishLngLat = [-86.00120455026627, 39.79065114672283];
    }
    finishMarker.setLatLng([finishLngLat[1], finishLngLat[0]]);
    updatePath(startLngLat[1], startLngLat[0], finishLngLat[1], finishLngLat[0]);
};
var start = ({
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [
            startLngLat[0],
            startLngLat[1]
        ]
    }
});
var finish = ({
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [
            finishLngLat[0],
            finishLngLat[1]
        ]
    }
});
// L.geoJSON(finish).addTo(map);

startMarker.snapediting = new L.Handler.MarkerSnap(map, startMarker);
startMarker.snapediting.addGuideLayer(guide);
startMarker.snapediting.enable();
startMarker.on('dragend', function (e) {
    updatePath(startMarker.getLatLng().lat, startMarker.getLatLng().lng, finishLngLat[1], finishLngLat[0]);
});

finishMarker.snapediting = new L.Handler.MarkerSnap(map, finishMarker);
finishMarker.snapediting.addGuideLayer(guide);
finishMarker.snapediting.enable();
finishMarker.on('dragend', function (e) {
    updatePath(startLngLat[1], startLngLat[0], finishMarker.getLatLng().lat, finishMarker.getLatLng().lng);
});

function updatePath(startlat, startlng, finishlat, finishlng){
    startLngLat = [startlng, startlat];
    finishLngLat = [finishlng, finishlat];
    start.geometry.coordinates = [startlng,startlat];
    finish.geometry.coordinates = [finishlng,finishlat];
    var path = pathFinder.findPath(start, finish);
    console.log(path);
    pathjson.geometry.coordinates = path.path;
    pathLayer.remove();
    pathLayer = L.geoJSON(pathjson, {style: {color: "rgb(102, 157, 247)", weight:10}}).addTo(map);
}

var path = pathFinder.findPath(start, finish);
console.log(path);

var pathjson = {
    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "LineString",
        "coordinates": path.path
    }
};
var pathLayer = L.geoJSON(pathjson, {style: {color: "lightblue"}}).addTo(map);

hi();