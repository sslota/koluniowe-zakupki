import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FriendAdd() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchUsers() {
      const response = await fetch(
        `http://localhost:8080/socials/friends/name=`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers().then((response) => {
      return response;
    });
  }, []);

  const addFriend = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("id");
    const selectedUser = filteredUsers.find(
      (user) => user.username === searchTerm
    );
    if (!selectedUser) return;
    const friendID = selectedUser.ID;

    await fetch(
      `http://localhost:8080/socials/friends?userID=${userID}&friendID=${friendID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate("/friend");
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = users.filter((user) => user.username.startsWith(term));
    setFilteredUsers(filtered);
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST" onSubmit={addFriend}>
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
              list="users"
              type="text"
              autoComplete="name"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <datalist id="users" className="mt-2">
            {filteredUsers.map(
              (user, index) =>
                index < 10 && (
                  <div key={user.ID}>
                    <option>{user.username}</option>
                  </div>
                )
            )}
          </datalist>
        </div>

        <a href="/friend" className=" flex space-x-4">
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

export default FriendAdd;
