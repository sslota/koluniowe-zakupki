import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ShareList = (props) => {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState();
  const { listID, setShowShareList } = props;

  const shareList = async () => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:8080/shopping-lists/share`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: selectedFriend,
        listID: listID,
      }),
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    async function fetchFriendsToShareList() {
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
    fetchFriendsToShareList().then((response) => {
      return response;
    });
  }, [listID]);

  const handleFriendSelection = (event) => {
    setSelectedFriend(event.target.value);
  };

  const isShareButtonDisabled = !selectedFriend;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-lg">
      <div className="rounded-3xl shadow-2xl">
        <div className="relative p-8 text-center sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Share list with your friend!
          </p>

          <h2 className="mt-6 text-3xl font-bold">Friends</h2>

          {friends.map((friend) => (
            <div key={friend.ID} className="flex items-center mt-4">
              <input
                id={`friend_${friend.ID}`}
                name="friend"
                value={friend.ID}
                type="radio"
                className="form-radio border-0 h-4 w-4 text-indigo-600 transition duration-150 ease-in-out ml-20"
                onChange={handleFriendSelection}
              />
              <label
                htmlFor={`friend_${friend.ID}`}
                className="ml-3 text-gray-600 text-base font-semibold"
              >
                {friend.username}
              </label>
            </div>
          ))}

          {!isNaN(selectedFriend) && (
            <p className="text-red-500 pt-4">Choose wisely!</p>
          )}

          <button
            className="mt-8 inline-block w-full rounded-full bg-indigo-600 py-4 text-sm font-bold text-white shadow-xl disabled:opacity-50"
            type="submit"
            onClick={() => {
              shareList();
              setShowShareList(!setShowShareList);
            }}
            disabled={isShareButtonDisabled}
          >
            Share
          </button>
          <XMarkIcon
            onClick={() => setShowShareList(!setShowShareList)}
            className="absolute top-3 right-3 w-8 h-8 text-gray-600 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default ShareList;
