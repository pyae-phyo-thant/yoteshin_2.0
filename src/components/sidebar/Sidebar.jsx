import React from "react";
import ExpensionMenu from "./ExpensionMenu";
import NonExpensionMenu from "./NonExpensionMenu";
import SidebarHeader from "./SidebarHeader";

const style = {
  backdropBlur: {
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    background: "rgba(255, 255, 255, 0.925)",
  },
};

const Sidebar = ({ sidebarState, toggleSidebar, menuItems }) => {
  return (
    <div
      className={`transition-all bg-glass duration-75 flex-none relative ${
        sidebarState ? "md:w-64 w-40" : "md:w-16 w-8"
      }`}
    >
      <div
        className={`fixed md:flex top-0 w-screen h-screen z-30 md:sticky md:w-full md:h-auto md:z-0 transform md:translate-x-0 transition-all duration-150 md:transition-none md:duration-0 ${
          sidebarState ? "left-0" : "-translate-x-full"
        }`}
      >
        <div
          style={style.backdropBlur}
          className="overflow-x-hidden overflow-y-auto mx-w-full w-64 md:w-auto h-screen border-r flex-none flex-grow"
        >
          <SidebarHeader
            sidebarState={sidebarState}
            toggleSidebar={toggleSidebar}
          />
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.routeTo === null ? (
                <ExpensionMenu data={item} sidebarState={sidebarState} />
              ) : (
                <NonExpensionMenu data={item} sidebarState={sidebarState} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div
          className={`w-full h-screen bg-gray-900 md:hidden ${
            sidebarState
              ? "opacity-25 transition-all duration-1000"
              : "opacity-0"
          }`}
          onClick={toggleSidebar}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
