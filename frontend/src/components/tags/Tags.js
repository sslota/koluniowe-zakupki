import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import DropdownMenu from "../DropdownMenu";
import { Link } from "react-router-dom";

export async function fetchTags() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const response = await fetch(
        `http://localhost:8080/tags/userID=${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return await response.json();
}

function Tags() {
  const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchTags().then((data) => {
            setTags(data);
        });
    }, []);

    const deleteTag = async (id) => {
        if (window.confirm("Confirm to delete this tag")) {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:8080/tags?tagID=${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedTags = tags.filter((tag) => tag.id !== id);
            setTags(updatedTags);
        }
    };

  return (
    <div className="flex items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <div className="grid gap-10 w-3/4 max-w-screen-md">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="bg-white p-5 rounded-md flex items-center justify-between space-x-10"
          >
            <div className="text-gray-800 text-2xl">{tag.name}</div>
            <div className="flex items-center space-x-2">
              <TrashIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Delete"
                onClick={() => deleteTag(tag.id)}
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
