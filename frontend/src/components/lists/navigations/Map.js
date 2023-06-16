import React from "react";
import DropdownMenu from "../../DropdownMenu";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, Popup , useMap} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Routing from "./Routing";
import "leaflet-routing-machine";

function Map() {
  return (
<MapContainer className="h-screen" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Routing/>
</MapContainer>
  );
};

export default Map;
