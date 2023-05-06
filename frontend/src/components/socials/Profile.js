import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import DropdownMenu from "../DropdownMenu";

function Profile() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <UserIcon className="h-64 w-64" />
      <div className="text-gray-800 text-4xl font-semibold"> Username </div>

      <div className="absolute top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
        <DropdownMenu />
      </div>
    </div>
  );
}

export default Profile;
