import React from "react";
import { NavLink } from "react-router-dom";

const NonExpensionMenu = ({ data, sidebarState }) => {
  return (
    <NavLink to={data.routeTo}>
      <div className="flex items-center px-2 h-12 cursor-pointer text-sm font-bold active xl:hover:bg-green-100 xl:hover:text-green-600 text-[#343a40]">
        <div className="w-12 text-center flex-none ml-2">
          <data.menuIcon className="text-2xl" />
        </div>
        <span className={`flex-none flex-grow ${sidebarState ? "" : "hidden"}`}>
          {data.itemName}
        </span>
      </div>
    </NavLink>
  );
};

export default NonExpensionMenu;
