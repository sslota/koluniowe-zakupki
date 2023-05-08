import {React, useState, useEffect} from "react";
import DropdownMenu from "../DropdownMenu";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Shops() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // const id = localStorage.getItem("id");
    async function fetchShops() {
      const response = await fetch(
        `http://localhost:8080/shops`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setShops(data);
    }
    fetchShops().then((response) => {
      return response;
    });
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
      <div className="grid gap-10 w-3/4 max-w-screen-md">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="bg-white p-5 rounded-md flex items-center justify-between space-x-10"
          >
            <div className="text-gray-800 text-2xl">{shop.name}</div>
            <div className="flex items-center space-x-2">
              <TrashIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Delete"
                onClick={() => deleteShop(shop.id)}
              />
            </div>
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
