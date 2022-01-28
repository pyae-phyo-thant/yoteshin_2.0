import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

const Settings = () => {
  const accessToken = localStorage.getItem("token");
  const history = useNavigate();

  useEffect(() => {
    if (!accessToken) {
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
