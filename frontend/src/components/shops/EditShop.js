import React, { useState } from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";

const EditShop = (props) => {
    const { shopID, setEditShop } = props;
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const editShop = async () => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const trimmedName = name.trim();

        if (trimmedName.length === 0) {
            setError("Please enter a name for the shop.");
            return;
        }

        if (trimmedName.length > 30) {
            setError("The maximum length for the name is 30 characters.");
            return;
        }

        if (trimmedName.includes("/")) {
            setError("The name cannot contain '/' character.");
            return;
        }
        await fetch (
            `http://localhost:8080/shops`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: shopID,
                    location: location,
                    name: trimmedName,
                    userID: id,
                    latitude: latitude,
                    longitude: longitude
                }),
            });
        setEditShop(false);
    };

    const handleLocationChange = async (event) => {
        const location = event.target.value;
        setLocation(location);
        try {
            const response = await fetch (
                `https://geocode.maps.co/search?q={${location}}`
            );
            const data = await response.json();
            if (data.length > 0) {
                const {lat, lon} = data[0];
                setLatitude(lat);
                setLongitude(lon);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const isButtonDisabled = name === ""

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-lg">
            <div className="rounded-3xl shadow-2xl">
                <div className="relative p-8 text-center sm:p-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                        Change your shop!
                    </p>

                    <h2 className="mt-6 px-12 text-3xl font-bold">Edit Your Shop</h2>
                    <div className="mb-4">
                        <label
                            htmlFor="new-shop-name"
                            className="block mt-12 mb-1 font-semibold text-gray-600 pt-8"
                        >
                            New Shop Name
                        </label>
                        <input
                            type="text"
                            required
                            id="new-shop-name"
                            name="new-shop-name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />

                        <label
                            htmlFor="new-shop-location"
                            className="block mt-12 mb-1 font-semibold text-gray-600"
                        >
                            New Shop Location
                        </label>
                        <input
                            type="text"
                            required
                            id="new-shop-location"
                            name="new-shop-location"
                            value={location}
                            placeholder="City, Street Name Building Number"
                            onChange={handleLocationChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        {error && (
                            <div className="mt-2 text-center text-sm text-red-600">
                                {error}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <XMarkIcon
                            className="absolute top-3 right-3 w-8 h-8 text-gray-600 cursor-pointer"
                            onClick={() => setEditShop(false)}
                        />
                        <button
                            type="submit"
                            className="mt-16 inline-block w-full rounded-full bg-indigo-600 py-4 text-sm font-bold text-white shadow-xl disabled:opacity-50"
                            onClick={(event) => {
                                event.preventDefault();
                                editShop();
                            }}
                            disabled={isButtonDisabled}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EditShop;
