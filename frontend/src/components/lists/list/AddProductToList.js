import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AddProductToList = () => {
  const Products = [
    { id: 1, name: "Product1" },
    { id: 2, name: "Product2" },
    { id: 3, name: "Product3" },
  ];

  const { id } = useParams();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSubmit = (event) => {};

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
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
            htmlFor="product"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Add product
          </label>
          <div className="mt-2">
            <select
              id="product"
              name="product"
              autoComplete="product"
              required
              value={selectedProduct ? selectedProduct.id : ""}
              onChange={(e) =>
                handleProductSelect(
                  Products.find((shop) => shop.id === parseInt(e.target.value))
                )
              }
              className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled hidden>
                Choose a product
              </option>
              {Products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <a href={`/list/${id}`} className=" flex space-x-4">
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
};

export default AddProductToList;
