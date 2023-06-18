import React from "react";
import { MapContainer, TileLayer} from 'react-leaflet';
import {useParams} from "react-router-dom";
import "leaflet/dist/leaflet.css";
import Routing from "./Routing";
import "leaflet-routing-machine";

function Map() {

  const { id: listID} = useParams();

  return (
<MapContainer className="h-screen"  zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Routing listID={listID} />
</MapContainer>
  );
};

export default Map;
