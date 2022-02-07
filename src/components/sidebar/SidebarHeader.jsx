import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import defaultAvatar from "../../images/default_avatar.jpeg";

const SidebarHeader = ({ sidebarState, toggleSidebar }) => {
  const [email, setEmail] = useState("Your Gmail");
  const avatar = localStorage.getItem("avatar");
  useEffect(() => {
    const localEmail = localStorage.getItem("email");
    if (email.length > 18) {
      setEmail(localEmail?.substring(0, 17));
    } else {
      setEmail(localEmail?.substring(0, 10) + "...");
    }
  }, []);
  return (
    <div className="p-4 h-[9rem] border-b flex justify-between">
      <div className={`${sidebarState ? "" : "hidden"}`}>
        {avatar ? (
          <img
            src={avatar}
            alt=""
            className="object-center w-8 h-8 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-gray-200 mr-2 md:mr-4"
          />
        ) : (
          <img
            src={defaultAvatar}
            alt=""
            className="object-center w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-200 mr-2 md:mr-4"
          />
        )}
        <h6 className="text-sm md:text-base font-bold">
          {email ? email : "Your Gmail..."}
        </h6>
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
