import React, { useState, useRef, useEffect } from "react";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import { FiShare2, FiArrowRightCircle } from "react-icons/fi";
import { CgDatabase } from "react-icons/cg";
import { BiCopy } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatBytes } from "../function/formatBytes";
import { useGoogleApi } from "react-gapi";

const gApiKey = "AIzaSyCs0p1eJrsn8KT7yz_F2IZd40JwFOBLEnU";

const Dashboard = () => {
  const [share, setShare] = useState("");
  const [showCopy, setShowCopy] = useState(false);
  const [copyLink, setCopyLink] = useState("");
  const [isCopy, setIsCopy] = useState(false);
  const [id, setId] = useState("");
  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const ref = useRef();
  const copyRef = useRef();
  const history = useNavigate();
  const accessToken = localStorage.getItem("token");
  const gAccessToken = localStorage.getItem("Gtoken");
  const userId = localStorage.getItem("userId");

  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapi?.auth2.getAuthInstance();

  useEffect(() => {
    if (!auth) {
      history("/login");
    }
  }, []);

  const onChangeState = (e) => {
    setShare(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyRef.current.value);
    console.log("copy!");
    setIsCopy(true);
    console.log(ref.current.value);
  };

  const getData = async () => {
    setId(ref.current?.value);
    const driveId = id.slice(32, 65);

    await axios
      .get(
        `https://www.googleapis.com/drive/v3/files/${driveId}?fields=name%2Csize%2Cid%2CthumbnailLink%2CmimeType&key=${gApiKey}`,
        {},
        {
          headers: {
            Authorization: "Bearer" + gAccessToken,
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("drive data", res);
        const fileSize = formatBytes(res.data.size);

        const form = new FormData();

        form.append("user_id", userId);
        form.append("file_id", res.data.id);
        form.append("name", res.data.name);
        form.append("thumb", res.data.thumbnailLink);
        form.append("mime_type", res.data.mimeType);
        form.append("file_size", fileSize);

        axios
          .post(`${import.meta.env.VITE_APP_API_URL}/add-file`, form, {
            headers: {
              "content-type": "application/json",
              this_is_token: accessToken,
            },
          })
          .then((res) => {
            console.log("send file data from share link", res);
            setShowCopy(true);
            setCopyLink(`${baseURL}/file/${res.data.data.slug}`);
          })
          .catch((err) => console.log("send file error", err));
      })
      .catch((err) => console.log("drive err", err));
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

        <div className="flex mb-2">
          <input
            type="text"
            value={share}
            ref={ref}
            onChange={onChangeState}
            placeholder="Enter GDrive share link"
            className="px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 
            focus:outline-none focus:border-sky-500 w-full"
          />
          <button
            disabled={!share}
            onClick={getData}
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

        {showCopy && (
          <>
            <span className="text-sm text-[#6c757d] ml-4 font-medium">
              Link to share
            </span>
            <div className="flex mt-2">
              <input
                type="text"
                value={copyLink}
                ref={copyRef}
                disabled
                placeholder="Enter GDrive share link"
                className="px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 
            focus:outline-none focus:border-sky-500 w-full"
              />
              <button
                onClick={copyToClipboard}
                className={`${
                  !share
                    ? "bg-blue-300"
                    : "border-blue-500 border cursor-pointer hover:bg-blue-800"
                } rounded-md text-black hover:text-white text-base font-medium ml-6 px-10 py-2 flex items-center`}
              >
                <span>
                  <BiCopy className="mr-1" />
                </span>
                {isCopy ? "Done" : "Copy"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
