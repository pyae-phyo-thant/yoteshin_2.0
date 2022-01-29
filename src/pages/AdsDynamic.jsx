import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/Layout";
import driveImg from "../images/google-drive-logo.png";
import { ImGoogleDrive } from "react-icons/im";
import { useGoogleApi } from "react-gapi";
import { formatBytes } from "../function/formatBytes";
import { getSingleData } from "../function/api";

const AdsDynamic = () => {
  const params = useParams();
  const [limit, setLimit] = useState("");
  const [usage, setUsage] = useState("");
  const [free, setFree] = useState("");
  const [data, setData] = useState({});
  const [percent, setPercent] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const formatFree = formatBytes(free);
  const formatUsage = formatBytes(usage).toString();

  const totalWidth = "100" - percent + "%";
  const calculatePercent = () => {
    let maxPercent = 15;

    const total = maxPercent - formatUsage.slice(0, 2);
    setPercent(total + "0");
    console.log(total);
  };

  useEffect(() => {
    console.log(params);
    calculatePercent();
  }, []);

  const gapi = useGoogleApi({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    scopes: ["https://www.googleapis.com/auth/drive.metadata.readonly"],
  });

  const getDriveStorage = () => {
    gapi?.client?.drive?.about
      .get({
        fields: "storageQuota",
      })
      .then(
        (response) => {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
          setLimit(response.result.storageQuota.limit);
          setUsage(response.result.storageQuota.usage);
          setFree(limit - usage);
        },
        (err) => {
          console.error("Execute error", err);
        }
      );
  };

  const getDataFromSlug = () => {
    getSingleData(params.name)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log("url data err", err));
  };

  useEffect(() => {
    getDriveStorage();
    getDataFromSlug();
  }, [gapi, limit, usage]);
  return (
    <Layout>
      <div className="flex justify-center items-center bg-gray-100">
        <div className="bg-white rounded-md px-4 py-5">
          <h1 className="font-semibold text-base pb-4">{data.name}</h1>
          <div className="flex">
            <div className="mr-2 px-1 py-1 text-white bg-red-700 font-bold text-sm rounded-md">
              {data.file_size}
            </div>
            <div className="mr-2 px-1 py-1 text-white bg-green-700 font-bold text-sm rounded-md">
              N/A
            </div>
            <div className="mr-2 px-1 py-1 text-white bg-sky-700 font-bold text-sm rounded-md">
              {data.mme_type === null ? "null" : data.mme_type}
            </div>
            <div className="mr-2 px-1 py-1 text-white bg-blue-700 font-bold text-sm rounded-md">
              0 Downloads
            </div>
          </div>
          <div className="my-5 items-center flex justify-center">
            <img src={driveImg} alt="Google Drive" className="md:w-1/5" />
          </div>
          <p className="text-center font-semibold">
            Save this file to your google drive account to download
          </p>
          <button className="bg-green-500 text-white rounded-md px-8 py-2 font-bold my-6 flex items-center m-auto">
            <ImGoogleDrive className="mr-2" /> Save to Google Drive
          </button>
          <div className="border-t border-b border-gray-400">
            <span className="px-4 text-sm">Free space: {formatFree}</span>
            <div className="relative pt-1 px-4">
              <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
                <div
                  style={{ width: `${totalWidth}` }}
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
        </div>
      </div>
    </Layout>
  );
};

export default AdsDynamic;
