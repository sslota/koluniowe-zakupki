import React from "react";
import {useParams} from "react-router-dom";
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Routing from "./Routing";
import "leaflet/dist/leaflet.css";

function Map() {

  const { id: listID} = useParams();
  const mapStyle = {
    height: `calc(100vh - 64px)`,
  };
  
  return (
      <div style={mapStyle}>
        <MapContainer
            className="h-full z-0"
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
        >
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Routing listID={listID} />
        </MapContainer>
      </div>
  );
}

export default Map;
