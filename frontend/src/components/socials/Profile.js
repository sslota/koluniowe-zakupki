import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import DropdownMenu from "../DropdownMenu";
import {fetchProducts} from "../products/Products";
import {fetchLists} from "../lists/Lists";
import {fetchFriends} from "./Friends";
import {fetchShops} from "../shops/Shops";
import {fetchTags} from "../tags/Tags";

function Profile() {
    const [lists, setLists] = useState(0);
    const [friends, setFriends] = useState(0);
    const [products, setProducts] = useState(0);
    const [shops, setShops] = useState(0);
    const [tags, setTags] = useState(0);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        async function fetchUsers() {
            const response = await fetch(`http://localhost:8080/socials/friends/name=`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            const filteredUsers = data.filter((user) => {
                return user.ID.toString() === id;
            });
            const usernames = filteredUsers.map((user) => user.username);
            setUsername(usernames);
        }
        fetchUsers().then((response) => {
            return response;
        });

        fetchProducts().then((products) => {
            setProducts(products.length);
        });
        fetchLists().then((lists) => {
            setLists(lists.length);
        });
        fetchFriends().then((friends) => {
            setFriends(friends.length);
        });
        fetchShops().then((shops) => {
            setShops(shops.length);
        });
        fetchTags().then((tags) => {
            setTags(tags.length);
        });
    }, []);

  return (
      <div className="p-16">
          <div className="p-8 bg-white shadow mt-24">
              <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                      <Link to={`/`}>
                          <p className="font-bold text-gray-700 text-xl">{lists}</p>
                          <p className="text-gray-400">Lists</p>
                      </Link>
                      <Link to={`/friend`}>
                          <p className="font-bold text-gray-700 text-xl">{friends}</p>
                          <p className="text-gray-400">Friends</p>
                      </Link>
                      <Link to={`/product`}>
                          <p className="font-bold text-gray-700 text-xl">{products}</p>
                          <p className="text-gray-400">Products</p>
                      </Link>
                  </div>
                  <div className="relative">
                      <div
                          className="w-48 h-48 bg-gray-300 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                          <UserIcon className="h-64 w-64 text-indigo-400" />
                      </div>
                  </div>
                  <div className="space-x-32 text-center flex justify-between mt-32 md:mt-0 md:justify-center">
                      <Link to={`/shop`}>
                          <p className="font-bold text-gray-700 text-xl">{shops}</p>
                          <p className="text-gray-400">Shops</p>
                      </Link>
                      <Link to={`/tag`}>
                          <p className="font-bold text-gray-700 text-xl">{tags}</p>
                          <p className="text-gray-400">Tags</p>
                      </Link>
                  </div>
              </div>
              <div className="mt-20 text-center border-b pb-12"><h1
                  className="text-4xl font-medium text-gray-700">{username}</h1>
                  <p className="font-light text-gray-600 mt-3">My Statistics</p>
              </div>
          </div>
          <div className="fixed top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
              <DropdownMenu />
          </div>
      </div>
  );
}

export default Profile;
