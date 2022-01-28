import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const GApiKey = "AIzaSyCs0p1eJrsn8KT7yz_F2IZd40JwFOBLEnU";
  useEffect(() => {
    if (!token) return history("/login");
    // const storageData = axios.get(
    //   `https://www.googleapis.com/drive/v3/about?key=${GApiKey}`, {
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }
    // );
    // console.log(storageData, "st");
  }, []);
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
        </div>
      </div>
    </Layout>
  );
};

export default User;
