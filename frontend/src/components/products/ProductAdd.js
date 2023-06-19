import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProductAdd() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [tags, setTags] = useState([]);
  const [chosenTags, setChosenTags] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    async function fetchProducts() {
      try {
        const response = await fetch(
            `http://localhost:8080/tags?userID=${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts().then((response) => {
      return response;
    });
  },[]);



  const addProduct = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      setError("Please enter product.");
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
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    fetch(`http://localhost:8080/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: trimmedName,
        userID: id,
        tags: chosenTags
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        navigate("/product");
        return response.json();
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  const handleChosenTags = (event) => {
    const {checked} = event.target;
    const tagID = parseInt(event.target.value);
    if (checked) {
      const selectedTag = tags.find((tag) => tag.id === tagID)
      if (selectedTag) {
        setChosenTags((prevTags) => [
          ...prevTags, selectedTag
        ]);
      }
    } else {
      setChosenTags((prevTags) => prevTags.filter((prevTag) => prevTag.id !== tagID));
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={addProduct}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Product
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div
              className="text-md pt-4 font-medium leading-6 text-gray-900"
          >
            Tags
          </div>
          <div
              className="py-1 grid grid-cols-2 text-center"
          >
          {tags.map((tags) => (
              <div className="mt-2"  key={tags.id}>
                <div
                className="truncate"
                >
                <label
                    htmlFor="tags"
                    className="text-gray-600 text-base font-semibold"
                >
                  {tags.name}
                </label>
                </div>
                <input
                    id="tags"
                    name="tags"
                    type="checkbox"
                    value={tags.id}
                    onChange={handleChosenTags}
                    className="form-checkbox border-0 h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
              </div>
              )
          )}
          </div>
          {error && (
              <div className="mt-2 text-center text-sm text-red-600">
                {error}
              </div>
          )}
        </div>

        <div className=" flex space-x-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
          <Link
            to={`/product`}
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ProductAdd;
