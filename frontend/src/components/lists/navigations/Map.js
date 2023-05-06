import React from "react";
import DropdownMenu from "../../DropdownMenu";

function Map() {
  return (
    <div className="flex items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <img className="w-3/5" src="/route.jpeg" alt="route" />

      <div className="absolute top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
        <DropdownMenu />
      </div>
    </div>
  );
}

export default Map;
