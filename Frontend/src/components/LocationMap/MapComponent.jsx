import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const locations = [
  {
    name: "BethMar HQ",
    coords: [51.80226595170416, -0.22687572883579438],
  },
  {
    name: "BethMar Northants Yard",
    coords: [52.31022426697426, -0.8174363661949865],
  },
  {
    name: "BethMar Buntingford Yard",
    coords: [51.93424567673203, 0.01456571501343264],
  },
  {
    name: "BethMar Stokenchurch Yard",
    coords: [51.66199226420901, -0.909827695616455],
  }
];

const ZoomToLocation = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13, { animate: true });
  }, [coords, map]);
  return null;
};

const CtrlZoomManager = ({ mapRef, setShowTooltip }) => {
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const container = map.getContainer();

    const handleWheel = (e) => {
      if (!container.contains(e.target)) return;

      if (!e.ctrlKey) {
        e.preventDefault();
        map.scrollWheelZoom.disable();
        setShowTooltip(true);
      } else {
        map.scrollWheelZoom.enable();
        setShowTooltip(false);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [mapRef, setShowTooltip]);

  return null;
};

const MapComponent = () => {
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const mapRef = useRef(null);

  return (
    <div className="w-full h-auto relative">
      {showTooltip && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm z-[999]">
          Hold <strong>Ctrl</strong> to zoom the map
        </div>
      )}
      <MapContainer
        center={[52.05, -0.5]}
        zoom={8.5}
        scrollWheelZoom={false}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location, index) => (
          <Marker
            position={location.coords}
            key={index}
            eventHandlers={{
              click: () => {
                const [lat, lng] = location.coords;
                window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
              },
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
              {location.name}
            </Tooltip>
          </Marker>
        ))}

        {selectedCoords && <ZoomToLocation coords={selectedCoords} />}
        <CtrlZoomManager mapRef={mapRef} setShowTooltip={setShowTooltip} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
