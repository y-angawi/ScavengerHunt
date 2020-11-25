var id = null;
var firstTime = -1;

var loc1 = {
  lat:43.774177, lon:-79.501684, desc: "student center"
};
var loc2 = {
  lat:43.775467, lon:-79.502295, desc: "VR"
};
var loc3 = {
  lat:43.775153, lon:-79.511876, desc: "GYM"
};


var caches[] = [loc1, loc2, loc3];
var currentCache = 0;

function updateCache(){
  showCache(caches[currentCache]);
  currentCache = (currentCache + 1) % caches.length;
}

function showCache(cache){
  var x_target = computeposition(-79.5041456, -79.5050824, 504, 504, cache.long);
  var y_target = computeposition(43.7725742, 43.773585, 400, 288, cache.lat);
  var target = document.getElementById("target");
    target.style.left = x_target + "px";
    target.style.top = y_target + "px";
}
function togglegps() {
    var button = document.getElementById("togglegps");
    if (navigator.geolocation) {
        if (id === null) {
            id = navigator.geolocation.watchPosition(showPosition, handleError, {enableHighAccuracy : true, timeout: 1000});
            button.innerHTML = "STOP GPS";
            firstTime = -1;
        } else {
            navigator.geolocation.clearWatch(id);
            id = null;
            button.innerHTML = "START GPS";
        }
    } else {
        alert("NO GPS AVAILABLE");
    }
}

function handleError(error) {
    var errorstr = "Really unknown error";
    switch (error.code) {
      case error.PERMISSION_DENIED:
          errorstr = "Permission deined";
          break;
      case error.POSITION_UNAVAILABLE:
          errorstr = "Permission unavailable";
          break;
      case error.TIMEOUT:
          errorstr = "Timeout";
          break;
      case error.UNKNOWN_ERROR:
          error = "Unknown error";
          break;
    }
    alert("GPS error " + error);
}
function showPosition(position) {
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var now = document.getElementById("now");

    latitude.innerHTML = position.coords.latitude;
    longitude.innerHTML = position.coords.longitude;

    var x = computeposition(-79.5041456, -79.5050824, 504, 504, longitude.innerHTML);
    var y = computeposition(43.7725742, 43.773585, 400, 288, latitude.innerHTML);
    document.getElementById("debug").innerHTML = "left (u): " + x + " top (v): "+ y;

    if (firstTime < 0) {
      firstTime = position.timestamp;
    }
    now.innerHTML = position.timestamp - firstTime;

    var me = document.getElementById("me");
    me.style.left = x + "px";
    me.style.top = y + "px";
}
function computeposition(gps1, gps2, u1, u2, gps) {
    return (u2 - u1) * (gps - gps1) / (gps2 - gps1) + u1;
}
