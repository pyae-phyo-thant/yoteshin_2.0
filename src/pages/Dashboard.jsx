import React, { useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import { FiShare2, FiArrowRightCircle } from "react-icons/fi";
import { CgDatabase } from "react-icons/cg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [share, setShare] = useState("");

  const onChangeState = (e) => {
    setShare(e.target.value);
  };

  return (
    <>
      <div className="flex items-center text-2xl font-semibold">
        <AiOutlineDashboard className="mr-2" /> <h1>Dashboard</h1>
      </div>

      <div className="my-10 flex gap-4">
        <div className="flex flex-col rounded-lg p-4  bg-white shadow-lg w-2/6">
          <div className="mb-4 pb-3 flex justify-center text-4xl text-[#6c757d]">
            <Link to="/admin/users">
              <AiOutlineUser />
            </Link>
          </div>
          <h5 className="text-center text-xl font-semibold mb-2">Users</h5>
          <h5 className="text-center text-xl font-semibold text-[#6c757d]">
            10000
          </h5>
        </div>
        <div className="flex flex-col rounded-lg p-4  bg-white shadow-lg w-2/6">
          <div className="mb-4 pb-3 flex justify-center text-4xl text-[#6c757d]">
            <CgDatabase />
          </div>
          <h5 className="text-center text-xl font-semibold mb-2">Users</h5>
          <h5 className="text-center text-xl font-semibold text-[#6c757d]">
            10000
          </h5>
        </div>
        <div className="flex flex-col rounded-lg p-4  bg-white shadow-lg w-2/6">
          <div className="mb-4 pb-3 flex justify-center text-4xl text-[#6c757d]">
            <Link to="/admin/files">
              <AiOutlineCloudDownload />
            </Link>
          </div>
          <h5 className="text-center text-xl font-semibold mb-2">Downloads</h5>
          <h5 className="text-center text-xl font-semibold text-[#6c757d]">
            10000
          </h5>
        </div>
      </div>

      <div className="rounded-lg p-4 shadow-md w-full bg-white">
        <div className="flex items-center text-2xl font-medium mb-4">
          <FiShare2 className="mr-2" />
          Quick Share
        </div>

        <div className="flex">
          <input
            type="text"
            value={share}
            onChange={onChangeState}
            placeholder="Enter GDrive share link"
            className="px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 
            focus:outline-none focus:border-sky-500 w-full"
          />
          <button
            disabled={!share}
            className={`${
              !share
                ? "bg-blue-300"
                : "bg-blue-500 cursor-pointer hover:bg-blue-800"
            } rounded-md text-white text-base font-medium ml-6 px-10 py-2 flex items-center`}
          >
            <span>
              <FiArrowRightCircle className="mr-1" />
            </span>
            Share
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
