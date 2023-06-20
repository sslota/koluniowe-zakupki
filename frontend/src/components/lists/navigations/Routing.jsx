import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25,35],
  iconAnchor:[10,29],
  popupAnchor: [0,-29]
});

export default function Routing(listID) {
  const [locations, setLocations] = useState([]);
  const [error,setError] = useState(null);
  const map = useMap();

  useEffect(() => {
    const token = localStorage.getItem("token");
    let lat;
    let long;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          lat=pos.coords.latitude;
          long=pos.coords.longitude;
          
          async function fetchLists() {
            const response = await fetch(
              `http://localhost:8080/route/listID=${listID.listID}/latitude=${lat}/longitude=${long}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = await response.json();
            const updatedData = data.map((list) => ({
              ...list,
              state: false,
            }));
            
            updatedData.unshift({location:{latitude: lat,longitude: long},tagList:[],shopName:"You",state: false});
            setLocations(updatedData);
          
          };
          fetchLists().then((response) => {
            return response;
          });
        },
        (err) => {
          setError(err.message);
          console.log(error);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
    }, [map]);
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: locations.map((loc,i)=>(L.latLng(loc.location.latitude,loc.location.longitude))),
      routeWhileDragging: true,
      draggableWaypoints: false,
      addWaypoints: false,
    }).addTo(map);
    return () => map.removeControl(routingControl);
}