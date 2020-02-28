require('leaflet-geometryutil');
require('leaflet-snap');
require('leaflet-routing-machine');
var L = require('leaflet');
// var turf = require('@turf/turf');
var PathFinder = require('geojson-path-finder');
var geojson = require('./test.json');
var rooms = require('./rooms.json');
var pathFinder = new PathFinder(geojson, {precision: 1e-5});
var map = L.map('map',{ center:[39.79130734516531, -86.00025283002853], zoom: 18});
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap', maxZoom: 21, maxNativeZoom: 19, minZoom: 1}).addTo(map);
var guide = L.geoJSON(geojson, {style: {color:"white", weight:5, fillColor:"blue"}}).addTo(map);
var startLngLat = [-86.00126892328261, 39.79148171548422];
var finishLngLat = [-86.00163906812668, 39.79133538772051];
// var startPos = document.getElementById('dropdown').value;
var startMarker = L.marker([startLngLat[1],startLngLat[0]]).addTo(map);
var finishMarker = L.marker([finishLngLat[1],finishLngLat[0]]).addTo(map);
console.log(rooms);
// startPos = localStorage.getItem("start");
window.getJson = function(){
    return rooms;
}
window.hi = function(startPos){
    switch(startPos){
        // case "a100": startLngLat = [-86.00126892328261, 39.79148171548422]; break;
        case "A309": case "A308": case "A310": startLngLat = [-86.00149422883987, 39.792005195357945]; break;
        case "A306": case "A305": startLngLat = [-86.00132927298544, 39.79198458598944]; break;
        case "A304": case "A302": startLngLat = [-86.00116431713104, 39.79196397661473]; break;
        case "A311": case "A312": case "A313": startLngLat = [-86.0015344619751, 39.791834137412195]; break;
        case "A315": case "A301": startLngLat = [-86.00136682391167, 39.79181249752128]; break;
        case "A111": case "A112": case "A113": startLngLat = [-86.00160419940948, 39.791520873565396]; break;
        case "A115": case "A101": case "A102": startLngLat = [-86.00126892328261, 39.79148171548422]; break;
        case "A105": case "A104": startLngLat = [-86.00130915641783, 39.79129829049152]; break;
        case "A107": case "A108": case "A109": case "A110": startLngLat = [-86.00163906812668, 39.79133538772051]; break;
        case "A107": case "A108": case "A109": case "A110": startLngLat = [-86.00163906812668, 39.79133538772051]; break;
        case "A107": case "A108": case "A109": case "A110": startLngLat = [-86.00163906812668, 39.79133538772051]; break;
        case "A107": case "A108": case "A109": case "A110": startLngLat = [-86.00163906812668, 39.79133538772051]; break;
        case "A107": case "A108": case "A109": case "A110": startLngLat = [-86.00163906812668, 39.79133538772051]; break;
        case "A107": case "A108": case "A109": case "A110": startLngLat = [-86.00163906812668, 39.79133538772051]; break;


    }
    startMarker.setLatLng([startLngLat[1],startLngLat[0]]);
    updatePath(startLngLat[1], startLngLat[0], finishLngLat[1], finishLngLat[0]);
};
window.hello = function(finishPos){
    switch(finishPos){
        // case "a100": startLngLat = [-86.00126892328261, 39.79148171548422]; break;
        case "A309": case "A308": case "A310": finishLngLat = [-86.00149422883987, 39.792005195357945]; break;
        case "A306": case "A305": finishLngLat = [-86.00132927298544, 39.79198458598944]; break;
        case "A304": case "A302": finishLngLat = [-86.00116431713104, 39.79196397661473]; break;
        case "A311": case "A312": case "A313": finishLngLat = [-86.0015344619751, 39.791834137412195]; break;
        case "A315": case "A301": finishLngLat = [-86.00136682391167, 39.79181249752128]; break;
        case "A111": case "A112": case "A113": finishLngLat = [-86.00160419940948, 39.791520873565396]; break;
        case "A115": case "A101": case "A102": finishLngLat = [-86.00126892328261, 39.79148171548422]; break;
        case "A105": case "A104": finishLngLat = [-86.00130915641783, 39.79129829049152]; break;
        case "A107": case "A108": case "A109": case "A110": finishLngLat = [-86.00163906812668, 39.79133538772051]; break;
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