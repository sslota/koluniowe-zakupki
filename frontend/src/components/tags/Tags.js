import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import DropdownMenu from "../DropdownMenu";
import { Link } from "react-router-dom";

function Tags() {
  const Tags = [
    { id: 1, name: "Tag1", state: true },
    { id: 2, name: "Tag2", state: false },
    { id: 3, name: "Tag3", state: false },
  ];

  return (
    <div className="flex items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <div className="grid gap-10 w-3/4 max-w-screen-md">
        {Tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-white p-5 rounded-md flex items-center justify-between space-x-10"
          >
            <div className="text-gray-800 text-2xl">{tag.name}</div>
            <div className="flex items-center space-x-2">
              <TrashIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Delete"
              />
            </div>
          </div>
        ))}
      </div>

      <Link className="fixed bottom-24" to="/tag-add">
        <button className="rounded-md bg-indigo-600 px-32 py-4 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add tag
        </button>
      </Link>

      <div className="fixed top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
        <DropdownMenu />
      </div>
    </div>
  );
}

export default Tags;
