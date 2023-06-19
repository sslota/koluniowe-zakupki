import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function TagAdd() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addTag = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      setError("Please enter tag.");
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

    fetch(`http://localhost:8080/tags`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: trimmedName,
        userID: id,
      }),
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          navigate("/tag")
          return response.json();
        })
        .catch((error) => {
          console.error(
              "There has been a problem with your fetch operation:",
              error
          );
        });
  };

  return (
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={addTag}
        >
          <div>
            <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
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
                to={`/tag`}
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
  );
}

export default TagAdd;
