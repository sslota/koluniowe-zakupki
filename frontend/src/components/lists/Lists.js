import React, { useEffect, useState } from "react";
import DropdownMenu from "../DropdownMenu";
import {
  DocumentDuplicateIcon,
  TrashIcon,
  HeartIcon as HeartOutlineIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Lists() {
  const [listsData, setLists] = useState([]);

  const chooseFavourite = (id) => {
    const updatedListData = listsData.map((list) => {
      if (list.id === id) {
        return {
          ...list,
          state: !list.state,
        };
      } else {
        return list;
      }
    });
    setLists(updatedListData);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    async function fetchLists() {
      const response = await fetch(
        `http://localhost:8080/shopping-lists/user=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const updatedData = data.map((list) => ({
        ...list,
        state: false,
      }));
      setLists(updatedData);
    }
    fetchLists().then((response) => {
      return response;
    });
  }, []);

  return (
    <div className="flex items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <div className="grid gap-10 w-3/4 max-w-screen-md">
        {listsData.map((list) => (
          <div
            key={list.id}
            className="bg-white p-5 rounded-md flex items-center justify-between space-x-10"
          >
            <Link to={`/list/${list.name}`} className="text-gray-800 text-2xl">
              {list.name}
            </Link>
            <div className="flex items-center space-x-2">
              <DocumentDuplicateIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Duplicate"
              />
              {list.state ? (
                <HeartSolidIcon
                  className="text-red-500 h-8 w-8 cursor-pointer"
                  title="remove from favourite"
                  onClick={() => chooseFavourite(list.id)}
                />
              ) : (
                <HeartOutlineIcon
                  className="text-gray-600 h-8 w-8 cursor-pointer"
                  title="add to favourite"
                  onClick={() => chooseFavourite(list.id)}
                />
              )}
              <TrashIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Delete"
              />
            </div>
          </div>
        ))}
      </div>

      <Link className="fixed bottom-24" to="/list-add">
        <button className="rounded-md bg-indigo-600 px-32 py-4 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Add list
        </button>
      </Link>

      <div className="fixed top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
        <DropdownMenu />
      </div>
    </div>
  );
}

export default Lists;
