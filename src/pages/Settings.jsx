import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { useGoogleApi } from "react-gapi";

const Settings = () => {
  const accessToken = localStorage.getItem("token");
  const history = useNavigate();
  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapi?.auth2.getAuthInstance();

  useEffect(() => {
    if (!auth) {
      history("/login");
    }
  }, []);
  return (
    <>
      <div className="flex items-center text-2xl font-semibold">
        <FiSettings className="mr-2" /> <h5>Settings</h5>
      </div>
    </>
  );
};

export default Settings;
