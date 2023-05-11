import React from "react";
import { useState } from "react";

function BlacklistAdd() {
  const Shops = [
    { id: 1, name: "Shop1", blacklisted: false },
    { id: 2, name: "Shop2", blacklisted: false },
    { id: 3, name: "Shop3", blacklisted: false },
  ];

  const [selectedShop, setSelectedShop] = useState(null);

  const handleSubmit = (event) => {};

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="shop"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Blacklist
          </label>
          <div className="mt-2">
            <select
              id="shop"
              name="shop"
              autoComplete="shop"
              required
              value={selectedShop ? selectedShop.id : ""}
              onChange={(e) =>
                handleShopSelect(
                  Shops.find((shop) => shop.id === parseInt(e.target.value))
                )
              }
              className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled hidden>
                Choose a shop
              </option>
              {Shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <a href="/blacklist" className=" flex space-x-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
          <button
            type="button"
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </button>
        </a>
      </form>
    </div>
  );
}

export default BlacklistAdd;
