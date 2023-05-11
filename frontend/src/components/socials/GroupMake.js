import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function GroupMake() {
  const navigate = useNavigate();
  const Friends = [
    { id: 1, name: "Friend1" },
    { id: 2, name: "Friend2" },
    { id: 3, name: "Friend3" },
  ];

  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/friend`);
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
  };

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
            htmlFor="friend"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Friend
          </label>
          <div className="mt-2">
            <select
              id="friend"
              name="friend"
              autoComplete="friend"
              required
              value={selectedFriend ? selectedFriend.id : ""}
              onChange={(e) =>
                handleFriendSelect(
                  Friends.find(
                    (friend) => friend.id === parseInt(e.target.value)
                  )
                )
              }
              className="block w-full rounded-md border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="" disabled hidden>
                Choose a friend
              </option>
              {Friends.map((friend) => (
                <option key={friend.id} value={friend.id}>
                  {friend.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className=" flex space-x-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
          <Link
            to={`/friend`}
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default GroupMake;
