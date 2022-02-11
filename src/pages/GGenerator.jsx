import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShare2, FiSave } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineAppstoreAdd } from "react-icons/ai";
import { FaGoogleDrive } from "react-icons/fa";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { useGoogleApi } from "react-gapi";
import { toast } from "react-toastify";
import axios from "axios";
import { formatBytes } from "../function/formatBytes";
import { getUser } from "../function/api";

const GGenerator = () => {
  const [multi, setMulti] = useState(false);
  const [save, setSave] = useState(false);
  const [ids, setIds] = useState([]);
  const [datas, setDatas] = useState([]);
  const [multiText, setMultiText] = useState("");
  const history = useNavigate();
  const singleRef = useRef();
  const multiRef = useRef();
  const accessToken = localStorage.getItem("admin_token");
  const gAccessToken = localStorage.getItem("admin_Gtoken");
  const userId = localStorage.getItem("admin_userId");

  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const gApiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;
  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapi?.auth2.getAuthInstance();
  useEffect(() => {
    if (!auth?.isSignedIn.get()) {
      history("/login");
    }
    if (!accessToken) {
      alert("Your don't have accessToken please Login Again!");
      history("/login");
    }
  }, [auth]);
  const handleMultiSave = (e) => {
    e.preventDefault();
    const lines = multiRef.current?.value.split(/\n/);
    let idArray = [];
    for (var i = 0; i < lines?.length; i++) {
      // only push this line if it contains a non whitespace character.
      if (/\S/.test(lines[i])) {
        idArray.push(lines[i].trim());
      }
    }
    if (multiRef.current?.value !== "") {
      setIds(idArray);
      setSave(true);
    }
  };

  useEffect(() => {
    getUser(accessToken, userId).then((res) => {
      if (res.data.data && res.data.data.is_admin !== true) {
        history("/");
      }
    });
  });

  const gapiDrive = useGoogleApi({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    scopes: [
      "https://www.googleapis.com/auth/drive.metadata.readonly",
      "https://www.googleapis.com/auth/drive.file",
    ],
  });

  const sendSingleData = async () => {
    await axios
      .get(
        `https://www.googleapis.com/drive/v3/files/${singleRef?.current?.value}?fields=name%2Csize%2Cid%2CthumbnailLink%2CmimeType&key=${gApiKey}`,
        {},
        {
          headers: {
            Authorization: "Bearer" + gAccessToken,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("drive data from id", res);
        //Format to Byte to MB ,GB
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
              accessToken: accessToken,
            },
          })
          .then((res) => {
            toast.success("Successfully Added!");
            singleRef.current.value = "";
            console.log("send success", res);
          })
          .catch((err) => {
            toast.error("add fail!");
            console.log("send file fail", err);
          });
      })
      .catch((err) => console.log("fail to get data from drive id", err));
  };

  const sendMultiData = () => {
    console.log(ids, "array of id");
    let dataArray = [];

    ids.forEach(async (id) => {
      await axios
        .get(
          `https://www.googleapis.com/drive/v3/files/${id}?fields=name%2Csize%2Cid%2CthumbnailLink%2CmimeType&key=${gApiKey}`,
          {},
          {
            headers: {
              Authorization: "Bearer" + gAccessToken,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          dataArray.push(...dataArray, res);
          console.log("drive data from id", res);
        })
        .catch((err) => console.log("fail to get data from drive id", err));
    });
    setDatas(dataArray);
    console.log("dataArray", dataArray);
    console.log("datas", datas);
    // console.log("Datas array", dataArray);
    //Format to Byte to MB ,GB
    // const fileSize = formatBytes(res.data.size);

    // const form = new FormData();

    // form.append("user_id", userId);
    // form.append("file_id", res.data.id);
    // form.append("name", res.data.name);
    // form.append("thumb", res.data.thumbnailLink);
    // form.append("mime_type", res.data.mimeType);
    // form.append("file_size", fileSize);

    // axios
    //   .post(`${import.meta.env.VITE_APP_API_URL}/add-file`, form, {
    //     headers: {
    //       "content-type": "application/json",
    //       this_is_token: accessToken,
    //     },
    //   })
    //   .then((res) => {
    //     toast.success("Successfully Added!");
    //     singleRef.current.value = "";
    //     console.log("send success", res);
    //   })
    //   .catch((err) => {
    //     toast.error("add fail!");
    //     console.log("send file fail", err);
    //   });
  };

  return (
    <div className="p-10">
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
            <button
              onClick={() => setMulti(true)}
              className="flex p-2 rounded-md items-center font-medium border border-sky-500 hover:bg-sky-600 hover:text-white text-sky-600 text-sm "
            >
              <AiOutlineFolderAdd className="mr-2" />
              Multiple Add
            </button>
          </div>
        </div>

        <div className="border-y border-gray-200 py-12 px-14">
          {multi ? (
            <>
              <textarea
                rows={5}
                value={multiText}
                ref={multiRef}
                onChange={(e) => setMultiText(e.target.value)}
                className="resize-none w-full focus:outline-none focus:border-sky-500 border border-slate-300 placeholder-slate-400"
              />
              <button
                onClick={handleMultiSave}
                disabled={!multiText}
                className="flex mr-3 items-center bg-green-500 hover:bg-green-800 text-white px-4 rounded-md py-1 float-right font-medium"
              >
                <FiSave className="mr-2" />
                {} Save
              </button>
            </>
          ) : (
            <div className="flex border border-gray-200 w-full">
              <span className="p-3 border-r bg-gray-200">
                <FaGoogleDrive />
              </span>
              <input
                type="text"
                ref={singleRef}
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
                <ImCancelCircle className="mr-2" />
                {} Cancel
              </button>
              {save ? (
                <button
                  onClick={sendMultiData}
                  disabled={!multiText}
                  className="flex items-center bg-sky-500 hover:bg-sky-800 text-white px-4 rounded-md py-2 font-medium"
                >
                  <AiOutlineAppstoreAdd className="mr-2" />
                  {} Add all Video
                </button>
              ) : (
                ""
              )}
            </div>
          ) : (
            <button
              onClick={sendSingleData}
              className="flex items-center bg-sky-500 hover:bg-sky-800 text-white px-4 rounded-md py-2 font-medium"
            >
              <BsFileEarmarkPlus className="mr-2" />
              {} Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GGenerator;
