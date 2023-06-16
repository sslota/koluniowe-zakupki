import React from "react";
import DropdownMenu from "../../DropdownMenu";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, Popup , useMap} from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import Routing from "./Routing";
import "leaflet-routing-machine";


// function Map() {
//   return (
//     <div className="flex items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
//       <img className="w-3/5" src="/route.jpeg" alt="route" />


//       <div className="fixed top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
//         <DropdownMenu />
//       </div>
//     </div>
//   );
// }

function Map() {
  // const position = [50.049683, 19.944544]; // Initial map position

  // const markers = [
  //   { position: [51.505, -0.09], label: 'Marker 1' },
  //   { position: [51.51, -0.1], label: 'Marker 2' },
  //   { position: [51.49, -0.1], label: 'Marker 3' },
  // ];

  // const path = [[51.505, -0.09], [51.51, -0.1], [51.49, -0.1]]; // Path coordinates


  return (
<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Routing/>
</MapContainer>
  );
};

export default Map;
