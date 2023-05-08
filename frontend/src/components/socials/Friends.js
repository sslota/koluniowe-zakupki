import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "../DropdownMenu";
import { TrashIcon } from "@heroicons/react/24/outline";

function Friends() {
  const [friends, setFriends] = useState([]);

  const Groups = [
    { id: 1, name: "Group1", friends: ["friend1", "friend2"] },
    { id: 2, name: "Group2", friends: ["friend3", "friend2"] },
    { id: 3, name: "Group3", friends: ["friend3", "friend1"] },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    async function fetchFriends() {
      const response = await fetch(
        `http://localhost:8080/socials/friends?userID=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setFriends(data);
    }
    fetchFriends().then((response) => {
      return response;
    });
  }, []);

  const removeFriend = async (friendID) => {
    if (window.confirm("Confirm to remove friend")) {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      await fetch(
        `http://localhost:8080/socials/friends?userID=${id}&friendID=${friendID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedFriendList = friends.filter(
        (friend) => friend.ID !== friendID
      );
      setFriends(updatedFriendList);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-10 mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <div className="grid place-items-center gap-10 w-1/2 max-w-screen-md">
        {friends.map((friend) => (
          <div
            key={friend.ID}
            className="bg-white p-5 rounded-md flex items-center justify-between space-x-10 w-3/4"
          >
            <div className="text-gray-800 text-2xl">{friend.username}</div>
            <div className="flex items-center space-x-2">
              <TrashIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Delete"
                onClick={() => removeFriend(friend.ID)}
              />
            </div>
          </div>
        ))}
        <Link className="fixed bottom-24" to="/friend-add">
          <button className="rounded-md bg-indigo-600 px-8 sm:px-16 lg:px-32 py-4 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add friend
          </button>
        </Link>
      </div>

      <div className="grid place-items-center gap-10 w-1/2 max-w-screen-md">
        {Groups.map((group) => (
          <div
            key={group.id}
            className="bg-white p-5 rounded-md flex items-center justify-between space-x-10 w-3/4"
          >
            <div className="text-gray-800 text-2xl">{group.name}</div>
            <div className="flex items-center space-x-2">
              <TrashIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Delete"
              />
            </div>
          </div>
        ))}
        <Link className="fixed bottom-24" to="/group-make">
          <button className="rounded-md bg-indigo-600 px-8 sm:px-16 lg:px-32 py-4 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Make group
          </button>
        </Link>
      </div>

      <div className="fixed top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
        <DropdownMenu />
      </div>
    </div>
  );
}

export default Friends;
