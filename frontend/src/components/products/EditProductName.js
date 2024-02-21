import React, { useState } from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";

const EditProductName = (props) => {
    const { productID, setEditProductName } = props;
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const renameProduct = async () => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const trimmedName = name.trim();

        if (trimmedName.length === 0) {
            setError("Please enter a name for the product.");
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
            `http://localhost:8080/products`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: productID,
                    name: trimmedName,
                    userID: id
                }),
            });
        setEditProductName(false);
    };

    const isButtonDisabled = name === ""

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-lg">
            <div className="rounded-3xl shadow-2xl">
                <div className="relative p-8 text-center sm:p-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                        Change the name of your product!
                    </p>

                    <h2 className="mt-6 text-3xl font-bold">Edit Product Name</h2>
                    <div className="mb-4">
                        <label
                            htmlFor="new-product-name"
                            className="block mt-12 mb-1 font-semibold text-gray-600 pt-8"
                        >
                            New Product Name
                        </label>
                        <input
                            type="text"
                            required
                            id="new-product-name"
                            name="new-product-name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
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
                            onClick={() => setEditProductName(false)}
                        />
                        <button
                            type="submit"
                            className="mt-16 inline-block w-full rounded-full bg-indigo-600 py-4 text-sm font-bold text-white shadow-xl disabled:opacity-50"
                            onClick={(event) => {
                                event.preventDefault();
                                renameProduct();
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

export default EditProductName;
