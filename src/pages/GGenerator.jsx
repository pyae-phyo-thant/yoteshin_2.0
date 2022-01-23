import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { FaGoogleDrive } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";

const GGenerator = () => {
  const [multi, setMulti] = useState(false);

  return (
    <>
      <div className="flex items-center text-2xl font-semibold">
        <FiShare2 className="mr-2" /> <h1>Create Link</h1>
      </div>

      <div className="bg-white py-3 my-10 rounded-md">
        <div className="flex justify-between py-2 px-3">
          <div>
            <h1 className="text-xl font-medium">
              {multi ? "Add multiple videos" : "Add Google Drive Id"}
              <span className="text-[#6c757d]">
                {" "}
                {multi ? "(one id per line)" : "(Single file id or folder id)"}
              </span>
            </h1>
          </div>
          <div>
            {multi ? (
              <span>Total: 0</span>
            ) : (
              <button
                onClick={() => setMulti(true)}
                className="flex p-2 rounded-md items-center font-medium border border-sky-500 hover:bg-sky-600 hover:text-white text-sky-600 text-sm "
              >
                <AiOutlineFolderAdd className="mr-2" />
                Multiple Add
              </button>
            )}
          </div>
        </div>

        <div className="border-y border-gray-200 py-12 px-14">
          {multi ? (
            <textarea
              rows={5}
              className="resize-none w-full focus:outline-none focus:border-sky-500 border border-slate-300 placeholder-slate-400"
            />
          ) : (
            <div className="flex border border-gray-200 w-full">
              <span className="p-3 border-r bg-gray-200">
                <FaGoogleDrive />
              </span>
              <input
                type="text"
                placeholder="Enter drive id (file or folder) accept"
                className="focus:outline-none focus:border-sky-500 w-full px-2 border border-slate-300 placeholder-slate-400 "
              />
            </div>
          )}
        </div>

        <div className="flex justify-end px-14 mt-4">
          {multi ? (
            <div className="flex">
              <button
                onClick={() => setMulti(false)}
                className="flex mr-3 items-center bg-red-500 hover:bg-red-800 text-white px-4 rounded-md py-2 font-medium"
              >
                <MdAddCircleOutline className="mr-2" />
                {} Cancel
              </button>
              <button className="flex items-center bg-sky-500 hover:bg-sky-800 text-white px-4 rounded-md py-2 font-medium">
                <MdAddCircleOutline className="mr-2" />
                {} Add all
              </button>
            </div>
          ) : (
            <button className="flex items-center bg-sky-500 hover:bg-sky-800 text-white px-4 rounded-md py-2 font-medium">
              <MdAddCircleOutline className="mr-2" />
              {} Add
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default GGenerator;
