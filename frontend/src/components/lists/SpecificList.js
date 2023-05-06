import { Link, useParams } from "react-router-dom";
import {
  TrashIcon,
  MapIcon,
  ShareIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import DropdownMenu from "../DropdownMenu";

function SpecificList() {
  const Products = [
    { id: 1, product: "Product1", quantity: 1 },
    { id: 2, product: "Product2", quantity: 2 },
    { id: 3, product: "Product3", quantity: 4 },
  ];
  const { id } = useParams();

  return (
    <div className="flex items-center justify-center mx-auto max-w-full py-8 px-2 sm:px-6 lg:px-8">
      <div className="grid gap-10 w-3/4 max-w-screen-md">
        <div className="bg-white p-5 rounded-md flex items-center justify-between space-x-10">
          <div className="flex gap-2 text-gray-800">
            <div className=" text-2xl">{id}</div>
            <PencilSquareIcon className="h-8 w-7 cursor-pointer" title="Edit" />
          </div>

          <div className="flex gap-8">
            <ShareIcon
              className="text-gray-600 h-8 w-8 cursor-pointer"
              title="Share"
            />
            <Link to={`/list/${id}/route`}>
              <MapIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Navigate"
              />
            </Link>
          </div>
        </div>
        {Products.map((list) => (
          <div
            key={list.id}
            className="bg-white p-5 rounded-md flex items-center justify-between space-x-10"
          >
            <div className="text-gray-800 text-2xl">{list.product}</div>
            <div className="text-gray-800 text-2xl">
              {" "}
              Quantity {list.quantity}
            </div>
            <div className="flex items-center space-x-2">
              <TrashIcon
                className="text-gray-600 h-8 w-8 cursor-pointer"
                title="Delete"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-16 right-0 py-4 px-2 sm:px-6 lg:px-8">
        <DropdownMenu />
      </div>
    </div>
  );
}

export default SpecificList;
