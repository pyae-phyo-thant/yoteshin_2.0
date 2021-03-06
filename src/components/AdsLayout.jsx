import React, { useEffect, useState } from "react";
import AdsNavbar from "./AdsNavbar";
import Footer from "./Footer";
import Loading from "./Loading";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdsLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return loading ? (
    <Loading width={"w-[7%] m-auto mt-10"} />
  ) : (
    <>
      <AdsNavbar />
      <ToastContainer />
      <div className="min-h-screen relative w-full h-full bg-gray-100">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default AdsLayout;
