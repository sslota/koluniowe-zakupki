import React from "react";

function ShopAdd() {
  const handleSubmit = (event) => {};

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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="tags"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tags
            </label>
          </div>
          <div className="mt-2">
            <input
              id="tags"
              name="tags"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Location
            </label>
          </div>
          <div className="mt-2">
            <input
              id="location"
              name="location"
              type="text"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <a href="/shop" className=" flex space-x-4">
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

export default ShopAdd;
