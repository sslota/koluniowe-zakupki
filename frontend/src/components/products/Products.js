import React, {useEffect, useState} from "react";
import DropdownMenu from "../DropdownMenu";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import EditProductName from "./EditProductName";

export async function fetchProducts() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const response = await fetch(
      `http://localhost:8080/products?userID=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
  );
  return await response.json();
}

function Products() {
  const [products, setProducts] = useState([]);
  const [showEditProductName, setShowEditProductName] = useState(false);
  const [productID, setProductID] = useState();

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, [showEditProductName]);

  const deleteProduct = async (id) => {
    if (window.confirm("Confirm to delete this product")) {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8080/products?productID=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="flex items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <div className="grid gap-10 w-3/4 max-w-screen-md">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white msm:max-w-md sm-md:max-w-lg md:max-w-screen-sm lg:max-w-screen-md p-5 rounded-md flex items-center justify-between space-x-10"
          >
            <div className="msm:w-48 truncate text-gray-800 text-2xl truncate">{product.name}</div>
            <PencilSquareIcon
                className="w-8 h-8 md:w-16 cursor-pointer"
                title="Edit"
                onClick={() => { setProductID(product.id); setShowEditProductName(!showEditProductName)}}
            />
            <div className="flex items-center space-x-2">
              <TrashIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Delete"
                onClick={() => deleteProduct(product.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {showEditProductName && (
          <EditProductName productID={productID} setEditProductName={setShowEditProductName} />
      )}

      <Link className="fixed bottom-24" to="/product-add">
        <button className="rounded-md bg-indigo-600 px-32 py-4 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add Product
        </button>
      </Link>

      <div className="fixed top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
        <DropdownMenu />
      </div>
    </div>
  );
}

export default Products;
