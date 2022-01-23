import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const SidebarHeader = ({ sidebarState, toggleSidebar }) => {
  return (
    <div className="p-4 h-20 border-b flex items-center justify-between">
      <div
        className={`flex items-center flex-none ${
          sidebarState ? "" : "hidden"
        }`}
      >
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/51hKyr0it6L.png"
          alt=""
          className="object-center w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-200 mr-2 md:mr-4"
        />
        <h1 className="text-lg md:text-xl font-bold">Version 1.0</h1>
      </div>
      <div
        className="hidden w-8 h-8 bg-gray-200 text-gray-600 rounded-full xl:flex flex-none hover:text-gray-800 transition-color duration-150 cursor-pointer"
        onClick={toggleSidebar}
      >
        {sidebarState ? (
          <BsArrowLeft className="m-auto" />
        ) : (
          <BsArrowRight className="m-auto" />
        )}
      </div>
      <div
        className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex xl:hidden hover:text-gray-800 transition-color duration-150 cursor-pointer"
        onClick={toggleSidebar}
      >
        <BsArrowLeft className="m-auto" />
      </div>
    </div>
  );
};

export default SidebarHeader;
