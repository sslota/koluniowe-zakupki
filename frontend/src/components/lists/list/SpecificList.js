import { Link, useNavigate, useParams } from "react-router-dom";
import {
  TrashIcon,
  MapIcon,
  ShareIcon,
  PencilSquareIcon,
  PlusIcon,
  MinusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DropdownMenu from "../../DropdownMenu";
import { useEffect, useState } from "react";
import ShareList from "./ShareList";

function SpecificList() {
  const { id: listID, name } = useParams();
  const [productsInList, setProductsInList] = useState([]);
  const [showShareList, setShowShareList] = useState(false);
  const [showEditListName, setShowEditListName] = useState(false);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();

  const updateProductQuantity = async (value, productID) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/shopping-lists/update-quantity`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listID: listID,
        productID: productID,
        quantity: value,
      }),
    });
    const updatedProductsInList = productsInList.map((product) =>
      product.ID === productID ? { ...product, quantity: value } : product
    );
    setProductsInList(updatedProductsInList);
  };

  const renameList = async () => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/shopping-lists/update-name`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        listID: listID,
      }),
    });
    setShowEditListName(false);
    navigate(`/list/${listID}/${newName}`);
  };

  const deleteProductFromList = async (productID) => {
    if (window.confirm("Confirm to delete")) {
      const token = localStorage.getItem("token");
      await fetch(
        `http://localhost:8080/shopping-lists/remove-product-from-list?listID=${listID}&productID=${productID}`,
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
          `http://localhost:8080/shopping-lists/list=${listID}`,
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
  }, [listID]);

  const isButtonDisabled = newName === "";

  return (
    <div className="flex items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <div className="grid gap-10 w-3/4 max-w-screen-md">
        <div className="bg-white p-5 rounded-md flex items-center justify-between space-x-10">
          <div className="flex gap-2 text-gray-800">
            <div className=" text-2xl">{name}</div>
            <PencilSquareIcon
              className="h-8 w-7 cursor-pointer"
              title="Edit"
              onClick={() => setShowEditListName(true)}
            />
          </div>

          <div className="flex gap-8">
            <ShareIcon
              className="text-gray-600 h-8 w-8 cursor-pointer"
              title="Share"
              onClick={() => setShowShareList(!showShareList)}
            />
            <Link to={`/list/${listID}/${name}/route`}>
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
            <div className="flex items-center justify-center justify-between gap-3">
              <div className="w-5">
                {product.quantity > 1 && (
                  <MinusIcon
                    className="text-gray-600 h-5 w-5 cursor-pointer"
                    title="Decrement"
                    onClick={() =>
                      updateProductQuantity(product.quantity - 1, product.ID)
                    }
                  />
                )}
              </div>
              <div className="text-gray-800 text-2xl ">{product.quantity}</div>
              <div className="w-5">
                <PlusIcon
                  className="text-gray-600 h-5 w-5 cursor-pointer"
                  title="Increment"
                  onClick={() =>
                    updateProductQuantity(product.quantity + 1, product.ID)
                  }
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrashIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Delete"
                onClick={() => deleteProductFromList(product.ID)}
              />
            </div>
          </div>
        ))}
      </div>

      {showShareList && (
        <ShareList listID={listID} setShowShareList={setShowShareList} />
      )}

      {showEditListName && (
        <div className="backdrop-filter backdrop-blur-lg fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-0 z-50 flex items-center justify-center">
          <div className="relative p-8 sm:p-12 rounded-3xl shadow-2xl h-1/2">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Share list with your friend!
            </p>
            <h2 className="mt-6 text-3xl font-bold">Edit List Name</h2>
            <div className="mb-4">
              <label
                htmlFor="new-list-name"
                className="block mt-12 mb-1 font-semibold text-gray-600 pt-8"
              >
                New List Name
              </label>
              <input
                type="text"
                required
                id="new-list-name"
                name="new-list-name"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div className="flex justify-end">
              <XMarkIcon
                type="button"
                className="absolute top-3 right-3 w-8 h-8 text-gray-600 cursor-pointer"
                onClick={() => setShowEditListName(false)}
              />
              <button
                type="submit"
                className="mt-16 inline-block w-full rounded-full bg-indigo-600 py-4 text-sm font-bold text-white shadow-xl disabled:opacity-50"
                onClick={(event) => {
                  event.preventDefault();
                  renameList();
                }}
                disabled={isButtonDisabled}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-24 sm:flex sm:space-y-0 sm:space-x-10 grid grid-flow-row place-items-center space-y-4">
        <Link to={`/list/${listID}/${name}/add-product`}>
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
