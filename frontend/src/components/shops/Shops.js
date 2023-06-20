import {React, useEffect, useState} from "react";
import DropdownMenu from "../DropdownMenu";
import {BuildingStorefrontIcon, TrashIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

function Shops() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchShops() {
      const response = await fetch(`http://localhost:8080/shops`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setShops(data);
    }
    // Wanted to add reverse geolocation, unfortunately we don't have enough money for Google apis :D
    // const reverseGeocode = async (latitude, longitude) => {
    //   const response = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`);
    //   const geocode = await response.json();
    //   const display_name = geocode.display_name;
    //   return display_name;
    // }
    //
    // const fetchShopLocations = async() => {
    //   const updatedShops = [];
    //   for (const shop of shops) {
    //     const location = await reverseGeocode(shop.latitude, shop.longitude);
    //     const data = location.split(",");
    //     const address = data[0];
    //     const street = data[1];
    //     const city = data[5];
    //
    //     const updatedShop = { ...shop, location: `${address}, ${street}, ${city}` };
    //     updatedShops.push(updatedShop);
    //   }
    //   setShops(updatedShops);
    // };

    fetchShops();
    // fetchShopLocations();
  }, []);



  const deleteShop = async (id) => {
    if (window.confirm("Confirm to delete this shop")) {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8080/shops?shopID=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedShops = shops.filter((shop) => shop.id !== id);
      setShops(updatedShops);
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 place-items-center gap-10 w-3/4 max-w-screen-md">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="w-4/5 max-w-2xl flex items-start justify-between rounded-xl border border-gray-100 p-4 bg-white shadow-xl sm:p-6 lg:p-8 overflow-hidden relative"
          >
            <div className="pt-4 text-gray-600 px-1">
              <BuildingStorefrontIcon className="h-8 w-8 sm:h-12 sm:w-12" />

              <h3 className="mt-4 text-lg font-bold text-gray-800 sm:text-xl">
                {shop.name}
              </h3>

              <p className="mt-2 hidden font-semibold text-sm sm:block">
                {shop.location}
              </p>
            </div>

            <span className="absolute -bottom-16 right-12 px-20 h-32 w-32 bg-green-500 opacity-50 rounded-full" />
            <span className="absolute -bottom-14 -right-12 px-12 h-24 w-32 bg-green-500 opacity-50 rounded-full" />

            <span className="absolute right-6 top-6 rounded-full bg-red-400 px-3 py-2 cursor-pointer">
              <TrashIcon
                className="text-gray-600 h-6 w-6"
                title="Remove"
                onClick={() => deleteShop(shop.id)}
              />
            </span>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 sm:flex sm:space-y-0 sm:space-x-10 grid grid-flow-row place-items-center space-y-4">
        <Link to="/shop-add">
          <button className="rounded-md bg-indigo-600 px-8 sm:px-16 lg:px-32 py-4 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add shop
          </button>
        </Link>
        <Link to="/blacklist">
          <button className="rounded-md bg-gray-600 px-8 sm:px-16 lg:px-32 py-4 font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Blacklist
          </button>
        </Link>
      </div>

      <div className="fixed top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
        <DropdownMenu />
      </div>
    </div>
  );
}

export default Shops;
