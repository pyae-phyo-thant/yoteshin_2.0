import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleApi } from "react-gapi";
import { formatBytes } from "../function/formatBytes";

const User = () => {
  const token = localStorage.getItem("Gtoken");
  const history = useNavigate();
  const [limit, setLimit] = useState("");
  const [usage, setUsage] = useState("");
  const [free, setFree] = useState("");
  const [percent, setPercent] = useState("");

  const formatUsage = formatBytes(usage).toString();

  const totalWidth = "100" - percent + "%";
  const calculatePercent = () => {
    let maxPercent = 15;

    const total = maxPercent - formatUsage.slice(0, 2);
    setPercent(total + "0");
    console.log(total);
  };
  console.log(formatUsage);

  const gapiProfile = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapiProfile?.auth2.getAuthInstance();
  useEffect(() => {
    calculatePercent();
    if (!auth) {
      history("/login");
    }
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

  useEffect(() => {
    getDriveStorage();
  }, [gapi, limit, usage]);

  return (
    <Layout>
      <div className="m-auto h-screen py-16 md:max-w-screen-sm">
        <div className="border border-gray-300">
          <div className="px-4 text-xl font-semibold py-4 border-b border-gray-300 bg-[#e1e4e7]">
            User Information
          </div>
          <div className="px-4 py-4 font-medium">
            <p>Email: {localStorage.getItem("email")}</p>
            <p>Name: {localStorage.getItem("name")}</p>
          </div>
          <div className="px-4 py-4 font-semibold border-t border-gray-300">
            Storage
          </div>
          <span className="px-4 text-sm">Free space: {formatBytes(free)}</span>
          <div className="relative pt-1 px-4">
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${totalWidth}` }}
                className="shadow-none flex font-semibold flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              >
                {formatBytes(usage)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
