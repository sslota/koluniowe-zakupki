import { useEffect } from "react";
import L, { Draggable } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function Routing() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(51.510, -0.09), L.latLng(51.505, -0.09), L.latLng(51.520, -0.09)],
      routeWhileDragging: true ,
      draggableWaypoints: false,
      addWaypoints: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}