import React from "react";
import { NavLink } from "react-router-dom";

const SubMenuItem = () => {
  return (
    <NavLink to={item.subRouteTo}>
      <div
        className={`flex items-center cursor-pointer hover:text-gray-800 h-12 ${
          sidebarState ? "ml-2" : ""
        }`}
      >
        <div className="w-12 text-center flex-none">
          <FontAwesomeIcon icon={item.subMenuIcon} />
        </div>
        <span className={`flex-none flex-grow ${sidebarState ? "" : "hidden"}`}>
          {item.subItemName}
        </span>
      </div>
    </NavLink>
  );
};

export default SubMenuItem;
