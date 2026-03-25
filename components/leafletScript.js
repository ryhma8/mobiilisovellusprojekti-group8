function logToRN(msg) {
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(String(msg));
    }
  }

const key = "ArtNedkKH4O6pHCVbzwG";

const map = L.map('map').setView([49.2125578, 16.62662018], 14);

L.tileLayer("https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=" + key, {
  tileSize: 256,
  maxZoom: 19,
  attribution: "&copy; MapTiler &copy; OpenStreetMap contributors"
}).addTo(map);

// Asetetaan userMarker
let userMarker = null;



// Asetetaan karttanäkymä sekä userMarker saaduilla koordinaateilla käyttäjän sijaintiin 
function setUserLocation(lat, lng) {
  const latlng = [lat, lng];

  map.setView(latlng, 16);

  if (userMarker) {
    userMarker.setLatLng(latlng);
  } else {
    userMarker = L.marker(latlng).addTo(map)
  }

  userMarker.openPopup();
}

// Hakee user location datan Kartta.tsx:stä mistä parsetetaan koordinaatit
document.addEventListener("message", function(event) {
  try {
    const data = JSON.parse(event.data);

    if (data && typeof data.lat === "number" && typeof data.lng === "number") {
      setUserLocation(data.lat, data.lng);
    } else if (data && data.error) {
      logToRN("WebView data error: " + data.error);
    } else {
      logToRN("WebView event error: " + event.data);
    }
  } catch (e) {
    logToRN("WebView JSON parsetus epäonnistui: " + e.message + event.data);
  }
});

// Nappi ja tyylitykset user location napille
const locateControl = L.control({ position: "topleft" });

locateControl.onAdd = function () {
  const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");

  div.style.backgroundColor = "white";
  div.style.width = "30px";
  div.style.height = "30px";
  div.style.cursor = "pointer";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.fontSize = "20px";
  div.title = "Locate me";
  div.innerHTML = "👤";

  div.onclick = function () {
    logToRN("request-location");
  };
    
  return div;
};

const startTrackingButton = L.control({ position: "bottomleft" });

startTrackingButton.onAdd = function () {
  const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");

  div.style.backgroundColor = "white";
  div.style.width = "30px";
  div.style.height = "30px";
  div.style.cursor = "pointer";
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.justifyContent = "center";
  div.style.fontSize = "20px";
  div.title = "Locate me";

  div.onclick = function () {
    logToRN("start-timer");
  };
    
  return div;
};


locateControl.addTo(map);
startTrackingButton.addTo(map);
