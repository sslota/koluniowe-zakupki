import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const AddProductToList = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { id, name } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("id");
    async function fetchProducts() {
      try {
        const response = await fetch(
          `http://localhost:8080/products?userID=${userID}&listID=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts().then((response) => {
      return response;
    });
  }, [id]);

  const addPositionToList = async (event) => {
    event.preventDefault();
    if (!selectedProduct) {
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8080/shopping-lists/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listID: id,
          productID: selectedProduct.id,
          quantity: quantity,
        }),
      });
      if (response.ok) {
        console.log("added");
        navigate(`/list/${id}/${name}`);
      } else {
        console.error("failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={addPositionToList}
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
                  products.find(
                    (product) => product.id === parseInt(e.target.value)
                  )
                )
              }
              className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled hidden>
                Choose a product
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Quantity
            </label>
          </div>
          <div className="mt-2">
            <input
              id="quantity"
              name="quantity"
              type="number"
              autoComplete="current-quantity"
              required
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className=" flex space-x-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
          <Link
            to={`/list/${id}/${name}`}
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProductToList;
