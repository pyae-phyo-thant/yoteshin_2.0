import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import driveImg from "../images/google-drive-logo.png";
import { ImGoogleDrive } from "react-icons/im";
import { useGoogleApi } from "react-gapi";
import { formatBytes } from "../function/formatBytes";
import { getSingleData } from "../function/api";
import SocialAuth from "../components/auth/SocialAuth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AiOutlineDownload } from "react-icons/ai";

const AdsDynamic = () => {
  const params = useParams();
  const [showloginButton, setShowloginButton] = useState(true);
  const [limit, setLimit] = useState("");
  const [usage, setUsage] = useState("");
  const [free, setFree] = useState("");
  const [data, setData] = useState({});
  const [percent, setPercent] = useState("");
  const [folderId, setFolderId] = useState("");
  const [fileId, setFileId] = useState("");
  const [download, setDownload] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Gtoken = localStorage.getItem("Gtoken");

  const formatFree = formatBytes(limit - usage);
  const formatUsage = formatBytes(usage).toString();
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
  const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

  useEffect(() => {
    getDataFromSlug();
  }, []);
  const getDataFromSlug = async () => {
    await getSingleData(params.name)
      .then((res) => {
        console.log(res, "data from url");
        setData(res.data.data);
      })
      .catch((err) => console.log("url data err", err));
  };

  const calculatePercent = () => {
    let maxPercent = 100;

    const cal = Math.round((usage / limit) * maxPercent);
    setPercent(cal);
  };

  const onLoginSuccess = async (res) => {
    console.log("Login Success:", res);
    const avatar = await res.profileObj.imageUrl;
    const Gtoken = await res.accessToken;

    const form = new FormData();

    form.append("google_id", res.profileObj.googleId);
    form.append("image", res.profileObj.imageUrl);
    form.append("token", res.accessToken);
    form.append("user_email", res.profileObj.email);
    form.append("user_name", res.profileObj.name);

    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/login`, form, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: res.data.data.user_name,
            email: res.data.data.user_email,
            image: res.data.data.image,
            token: res.data.data.token,
            google_id: res.data.data.googleId,
          },
        });
        console.log("login with google", res);

        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("Gtoken", Gtoken);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("userId", res.data.data.id);
        localStorage.setItem("email", res.data.data.user_email);
        console.log(res.data.data.user_email);
        localStorage.setItem("name", res.data.data.user_name);
      })
      .catch((err) => {
        console.log("token err", err);
      });
    setShowloginButton(false);
  };
  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
    toast.error("Login failed");
  };

  const gapiDrive = useGoogleApi({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    scopes: ["https://www.googleapis.com/auth/drive.metadata.readonly"],
  });

  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapi?.auth2.getAuthInstance();

  // if (!auth) {
  //   return <div>Loading to get drive data</div>;
  // }

  const getDriveStorage = () => {
    gapiDrive?.client?.drive.about
      .get({
        fields: "storageQuota",
      })
      .then(
        (response) => {
          // Handle the results here (response.result has the parsed body).
          setLimit(response.result.storageQuota.limit);
          setUsage(response.result.storageQuota.usage);
        },
        (err) => {
          console.error("Execute error", err);
        }
      );
  };

  const saveToDrive = async () => {
    setLoading(true);
    const folderMetadata = {
      name: "MetaMate Drive",
      mimeType: "application/vnd.google-apps.folder",
    };
    //Filter Folder
    gapiDrive?.client?.drive.files
      .list({
        q: "name='MetaMate Drive'",
        fields: "files(name,id)",
      })
      .then((res) => {
        let exists =
          res.result.files.filter((f) => {
            return f.name.toLowerCase() === folderMetadata.name.toLowerCase();
          }).length > 0;

        if (!exists) {
          console.log("not exist");
          // Create a Folder

          gapiDrive?.client?.drive.files
            .create({
              resource: folderMetadata,
              fields: "id",
            })
            .then((res) => {
              console.log("create folder", res.result.id);
              setFolderId(res.result.id);
            })
            .catch((err) => console.log("create folder err", err));
        } else {
          setFolderId(res.result.files[0].id);
        }
      })
      .catch((err) => console.log("filter err", err));

    // Create a file a above folder
    console.log("folderId", folderId);
    const fileMetadata = {
      name: data.name,
      parents: [folderId],
      mimeType: data.mime_type,
    };
    gapiDrive?.client?.drive.files
      .create({
        resource: fileMetadata,

        fields: "id, webContentLink, webViewLink",
      })
      .then((res) => {
        console.log("create file in folder", res);
        setFileId(res.result.id);
        setShowDownload(true);
        setLoading(false);
        setDownload(res.result.webViewLink);
      })
      .catch((err) => {
        console.log("create err file in folder", err);
        setLoading(false);
      });
  };

  // const handleDownload = async () => {
  //   await axios.get(
  //     `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`,
  //     {
  //       headers: {
  //         Authorization: "Bearer"[Gtoken],
  //         Accept: "application/json",
  //       },
  //     }
  //   );
  // };

  useEffect(() => {
    calculatePercent();
    getDriveStorage();
  }, [free, limit, usage, onLoginSuccess]);

  return (
    <Layout>
      <div className="flex justify-center items-center bg-gray-100">
        <div className="bg-white rounded-md px-4 py-5">
          <h1 className="font-semibold text-base pb-4">{data?.name}</h1>
          <div className="flex">
            <div className="mr-2 px-1 py-1 text-white bg-red-700 font-bold text-sm rounded-md">
              {data?.file_size}
            </div>
            <div className="mr-2 px-1 py-1 text-white bg-green-700 font-bold text-sm rounded-md">
              N/A
            </div>
            <div className="mr-2 px-1 py-1 text-white bg-sky-700 font-bold text-sm rounded-md">
              {data?.mme_type === null ? "null" : data?.mime_type}
            </div>
            <div className="mr-2 px-1 py-1 text-white bg-blue-700 font-bold text-sm rounded-md">
              0 Downloads
            </div>
          </div>
          <div className="my-5 items-center flex justify-center">
            <img src={driveImg} alt="Google Drive" className="md:w-1/5" />
          </div>
          {auth?.isSignedIn.get() ? (
            <>
              <p className="text-center font-semibold">
                Save this file to your google drive account to download
              </p>
              <button
                onClick={saveToDrive}
                className="bg-green-500 text-white rounded-md px-8 py-2 font-bold my-6 flex items-center m-auto"
              >
                <ImGoogleDrive className="mr-2" />{" "}
                {loading ? "Loading" : "Save to Google Drive"}
              </button>

              {showDownload ? (
                <a
                  href={download}
                  target="_blank"
                  className="bg-blue-500 md:w-[48%] text-white rounded-md px-8 py-2 font-bold my-6 flex items-center m-auto"
                >
                  <AiOutlineDownload className="mr-2" /> Download Now
                </a>
              ) : (
                ""
              )}

              <div className="border-t border-b border-gray-400">
                <span className="px-4 text-sm">Free space: {formatFree}</span>
                <div className="relative pt-1 px-4">
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${percent}%` }}
                      className="shadow-none flex font-semibold flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    >
                      {formatUsage}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm p-2">
                If your drive is full,{" "}
                <a
                  href="https://drive.google.com"
                  target="_blank"
                  className="text-blue-600"
                >
                  click here{" "}
                </a>
                to go to your google drive and delete some files.
              </p>
            </>
          ) : (
            <SocialAuth
              showloginButton={showloginButton}
              clientId={clientId}
              onLoginSuccess={onLoginSuccess}
              onLoginFailure={onLoginFailure}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdsDynamic;
