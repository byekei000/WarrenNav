require('leaflet-geometryutil');
require('leaflet-snap');
require('leaflet-routing-machine');
var L = require('leaflet');
var turf = require('@turf/turf');
var PathFinder = require('geojson-path-finder');
var geojson = require('./test.json');
var pathFinder = new PathFinder(geojson, {precision: 1e-19});
var map = L.map('map',{ center:[39.79130734516531, -86.00025283002853], zoom: 18});
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', { attribution: '© OpenStreetMap', maxZoom: 21, maxNativeZoom: 19, minZoom: 1}).addTo(map);
var guide = L.geoJSON(geojson).addTo(map);
var startLngLat = [-86.00126892328261, 39.79148171548422];
var finishLngLat = [-86.00163906812668, 39.79133538772051];
var marker = L.marker([startLngLat[1],startLngLat[0]]).addTo(map);
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
L.geoJSON(finish).addTo(map);

marker.snapediting = new L.Handler.MarkerSnap(map, marker);
marker.snapediting.addGuideLayer(guide);
marker.snapediting.enable();
marker.on('dragend', function (e) {
    updatePath(marker.getLatLng().lat, marker.getLatLng().lng);
});

function updatePath(lat, lng){
    start.geometry.coordinates = [lng,lat];
    var path = pathFinder.findPath(start, finish);
    console.log(path);
    pathjson.geometry.coordinates = path.path;
    pathLayer.remove();
    pathLayer = L.geoJSON(pathjson, {style: {color: "red"}}).addTo(map);
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
var pathLayer = L.geoJSON(pathjson, {style: {color: "red"}}).addTo(map);

// var geojsonFeature = {
//     "type": "FeatureCollection",
//     "features": [
//         {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": [
//                     [
//                         [
//                             -86.00202798843384,
//                             39.79102830450014
//                         ],
//                         [
//                             -85.99810123443604,
//                             39.79102830450014
//                         ],
//                         [
//                             -85.99810123443604,
//                             39.79308923943747
//                         ],
//                         [
//                             -86.00202798843384,
//                             39.79308923943747
//                         ],
//                         [
//                             -86.00202798843384,
//                             39.79102830450014
//                         ]
//                     ]
//                 ]
//             }
//         },
//         {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": [
//                     [
//                         [
//                             -85.99526882171631,
//                             39.79393008315612
//                         ],
//                         [
//                             -85.99681377410889,
//                             39.79424333603115
//                         ],
//                         [
//                             -85.9965991973877,
//                             39.79302329047582
//                         ],
//                         [
//                             -85.99565505981445,
//                             39.7918856609346
//                         ],
//                         [
//                             -85.99434614181519,
//                             39.79271003204449
//                         ],
//                         [
//                             -85.99526882171631,
//                             39.79393008315612
//                         ]
//                     ]
//                 ]
//             }
//         },
//         {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "type": "LineString",
//                 "coordinates": [
//                     [
//                         -86.00179195404051,
//                         39.794259822985055
//                     ],
//                     [
//                         -86.00492477416992,
//                         39.792825443211484
//                     ],
//                     [
//                         -86.00475311279295,
//                         39.791044792224646
//                     ],
//                     [
//                         -86.00353002548218,
//                         39.789099213453305
//                     ],
//                     [
//                         -85.99822998046875,
//                         39.788835401926
//                     ],
//                     [
//                         -85.994131565094,
//                         39.79160537250667
//                     ],
//                     [
//                         -85.99177122116089,
//                         39.791803223280226
//                     ],
//                     [
//                         -85.99730730056763,
//                         39.79162186009287
//                     ],
//                     [
//                         -85.99803686141968,
//                         39.78959385734031
//                     ],
//                     [
//                         -86.0020923614502,
//                         39.790088497670716
//                     ],
//                     [
//                         -85.99872350692749,
//                         39.793814673842526
//                     ]
//                 ]
//             }
//         },
//         {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -86.00099802017212,
//                     39.79449063992477
//                 ]
//             }
//         },
//         {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -85.9960412979126,
//                     39.794787403423406
//                 ]
//             }
//         },
//         {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -85.99292993545531,
//                     39.792594620683865
//                 ]
//             }
//         },
//         {
//             "type": "Feature",
//             "properties": {},
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [
//                     -86.00350856781006,
//                     39.79083045149775
//                 ]
//             }
//         }
//     ]
// };
//
// L.geoJSON(geojsonFeature).addTo(map);