import React from "react";
import { FiSettings } from "react-icons/fi";

const Settings = () => {
  return (
    <>
      <div className="flex items-center text-2xl font-semibold">
        <FiSettings className="mr-2" /> <h5>Settings</h5>
      </div>
    </>
  );
};

export default Settings;
