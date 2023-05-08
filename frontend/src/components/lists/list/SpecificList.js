import { Link, useParams } from "react-router-dom";
import {
  TrashIcon,
  MapIcon,
  ShareIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import DropdownMenu from "../../DropdownMenu";
import { useEffect, useState } from "react";

function SpecificList() {
  const { id, name } = useParams();
  const [productsInList, setProductsInList] = useState([]);

  const deleteProductFromList = async (id, productID) => {
    if (window.confirm("Confirm to delete")) {
      const token = localStorage.getItem("token");
      await fetch(
        `http://localhost:8080/shopping-lists/remove-product-from-list?listID=${id}&productID=${productID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedProductsInList = productsInList.filter(
        (product) => product.ID !== productID
      );
      setProductsInList(updatedProductsInList);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchProductsInList() {
      try {
        const response = await fetch(
          `http://localhost:8080/shopping-lists/list=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setProductsInList(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProductsInList().then((response) => {
      return response;
    });
  }, [id]);

  return (
    <div className="flex items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <div className="grid gap-10 w-3/4 max-w-screen-md">
        <div className="bg-white p-5 rounded-md flex items-center justify-between space-x-10">
          <div className="flex gap-2 text-gray-800">
            <div className=" text-2xl">{name}</div>
            <PencilSquareIcon className="h-8 w-7 cursor-pointer" title="Edit" />
          </div>

          <div className="flex gap-8">
            <ShareIcon
              className="text-gray-600 h-8 w-8 cursor-pointer"
              title="Share"
            />
            <Link to={`/list/${id}/${name}/route`}>
              <MapIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Navigate"
              />
            </Link>
          </div>
        </div>
        {productsInList.map((product) => (
          <div
            key={product.ID}
            className="bg-white p-5 rounded-md flex items-center justify-center justify-between"
          >
            <div className="text-gray-800 text-2xl">{product.name}</div>
            <div className="text-gray-800 text-2xl"> {product.quantity} </div>
            <div className="flex items-center space-x-2">
              <TrashIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Delete"
                onClick={() => deleteProductFromList(id, product.ID)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 sm:flex sm:space-y-0 sm:space-x-10 grid grid-flow-row place-items-center space-y-4">
        <Link to={`/list/${id}/${name}/add-product`}>
          <button className="rounded-md bg-indigo-600 px-8 sm:px-16 lg:px-32 py-4 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add product
          </button>
        </Link>
      </div>

      <div className="fixed top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
        <DropdownMenu />
      </div>
    </div>
  );
}

export default SpecificList;
