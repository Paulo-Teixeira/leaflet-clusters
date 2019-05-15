const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}), latlng = L.latLng(50.5, 30.51);

const map = L.map('map', { center: latlng, zoom: 15, layers: [tiles] });

const markers = L.markerClusterGroup({
  maxClusterRadius: 120,
  iconCreateFunction: (cluster) => {
    let markers = cluster.getAllChildMarkers(),
        n = 0;
    for (let i = 0, len = markers.length; i < len; i++) {
      n += markers[i].number;
    }
    return L.divIcon(
      { 
        html:
          `<div class="info">
            ${n}
            <span class="info__bubble">${n}</span>
          </div>`,
        className: 'cluster'
      });
  },
  spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsClick: false
});

function populate() {
  for (let i = 0; i < 100; i++) {
    let m = L.marker(getRandomLatLng(map), { title: i });
    m.number = i;
    markers.addLayer(m);
  }
  return false;
}

function populateRandomVector() {
  for (var i = 0, latlngs = [], len = 20; i < len; i++) {
    latlngs.push(getRandomLatLng(map));
  }
  var path = L.polyline(latlngs);
  map.addLayer(path);
}

function getRandomLatLng(map) {
  var bounds = map.getBounds(),
      southWest = bounds.getSouthWest(),
      northEast = bounds.getNorthEast(),
      lngSpan = northEast.lng - southWest.lng,
      latSpan = northEast.lat - southWest.lat;
  return L.latLng(
    southWest.lat + latSpan * Math.random(),
    southWest.lng + lngSpan * Math.random()
  );
}

populate();
map.addLayer(markers);