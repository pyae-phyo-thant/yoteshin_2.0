import React, { useState, useRef } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SubMenuItem from "./SubMenuItem";

const ExpensionMenu = ({ data, sidebarState }) => {
  const myRef = useRef();
  const [detailsMarkerState, setDetailsMarkerState] = useState(true);

  return (
    <details className="text-sm font-bold" ref={myRef}>
      <summary
        className="outline-none relative w-full h-12 invisible"
        onClick={() => setDetailsMarkerState(myRef.current.open)}
      >
        <div className="flex items-center px-2 h-12 cursor-pointer absolute top-0 left-0 w-full visible xl:hover:bg-green-100 xl:hover:text-green-600 text-[#343a40]">
          <div className="w-12 text-center flex-none ml-2">
            <data.menuIcon className="text-2xl" />
          </div>
          <span
            className={`flex-none flex-grow ${sidebarState ? "" : "hidden"}`}
          >
            {data.itemName}
          </span>
          <div
            className={`flex-none w-5 text-center ${
              sidebarState ? "" : "hidden"
            }`}
          >
            {detailsMarkerState ? (
              <FiChevronDown className="text-xs" />
            ) : (
              <FiChevronUp className="text-xs" />
            )}
          </div>
        </div>
      </summary>
      <div className="px-2 text-xs text-gray-600 border-b pb-3">
        {data.subItems.map((item, index) => (
          <SubMenuItem key={index} item={item} sidebarState={sidebarState} />
        ))}
      </div>
    </details>
  );
};

export default ExpensionMenu;
