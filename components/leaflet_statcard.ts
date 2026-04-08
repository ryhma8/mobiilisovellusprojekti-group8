export const leafletHtmlStat = `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>
  html, body, #map {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
</head>

<body>
<div id="map"></div>

<script>
  let map = L.map('map').setView([0,0], 13);

  L.tileLayer("https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=ArtNedkKH4O6pHCVbzwG", {
    tileSize: 256,
    maxZoom: 19
  }).addTo(map);

  document.addEventListener("message", function(event) {
    try {
      const data = JSON.parse(event.data);

      if (data.type === "draw-polyline") {
        const latlngs = data.coords.map(c => [c.lat, c.lng]);

        L.polyline(latlngs, { color: 'red', weight: 4 }).addTo(map);
        map.fitBounds(latlngs);
      }
    } catch (e) {
      console.log("Stats map error:", e);
    }
  });
</script>

</body>
</html>
`;
