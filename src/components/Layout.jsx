import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-gray-100">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
