import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleApi } from "react-gapi";

import Layout from "../components/Layout";
import { formatBytes } from "../function/formatBytes";
import Loading from "../components/Loading";

const User = () => {
  const history = useNavigate();
  const [limit, setLimit] = useState("");
  const [usage, setUsage] = useState("");
  const [free, setFree] = useState("");
  const [percent, setPercent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const formatUsage = formatBytes(usage);
  const formatFree = formatBytes(limit - usage);

  const calculatePercent = () => {
    let maxPercent = 100;

    const cal = Math.round((usage / limit) * maxPercent);
    setPercent(cal);
  };

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
          setLoading(false);
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
          setLimit(response.result.storageQuota.limit);
          setUsage(response.result.storageQuota.usage);
        },
        (err) => {
          console.error("Execute error", err);
          setLoading(false);
        }
      );
  };
  useEffect(() => {
    getDriveStorage();
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  return (
    <Layout>
      <div className="m-auto h-screen py-16 md:max-w-screen-sm">
        <div className="border border-gray-300">
          <div className="px-4 text-xl font-semibold py-4 border-b border-gray-300 bg-[#e1e4e7]">
            User Information
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="px-4 py-4 font-medium">
                <p>Email: {email}</p>
                <p>Name: {name}</p>
              </div>
              <div className="px-4 py-4 font-semibold border-t border-gray-300">
                Storage
              </div>
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
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default User;
