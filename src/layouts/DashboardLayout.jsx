import React, { useState, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import GDrive from "../pages/GDrive";
import GGenerator from "../pages/GGenerator";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import Home from "../pages/Home";

import { AiOutlineDashboard } from "react-icons/ai";
import { ImGoogleDrive } from "react-icons/im";
import { FiShare, FiSettings } from "react-icons/fi";

import Sidebar from "../components/sidebar/Sidebar";
import Layout from "../components/Layout";

const createMenuItem = (itemName, menuIcon, routeTo, subItems) => {
  return { itemName, menuIcon, routeTo, subItems };
};
// const createSubMenuItem = (subItemName, subMenuIcon, subRouteTo) => {
//   return { subItemName, subMenuIcon, subRouteTo };
// };
const menuItems = [
  createMenuItem("Dashboard", AiOutlineDashboard, "/admin/dashboard", null),
  createMenuItem("Google drive", ImGoogleDrive, "/admin/files", null),
  createMenuItem(
    "Link Generator",
    FiShare,
    "/admin/generate/google-drive",
    null
  ),
  createMenuItem("Settings", FiSettings, "/admin/settings", null),

  // createMenuItem("Visit Reg.", "clipboard-list", null, [
  //   createSubMenuItem("Visit Reg. List", "list", "/visitRegList"),
  //   createSubMenuItem("Visit Reg. Setup", "plus", "/visitRegSetup"),
  // ]),
  // createMenuItem("Sample Menu", "circle", "/sampleLink"),
];
export const ToggleSidebarContext = React.createContext();

const DashboardLayout = () => {
  const [sidebarState, setSidebarState] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarState(!sidebarState);
  }, [sidebarState]);

  return (
    <Layout>
      <ToggleSidebarContext.Provider value={toggleSidebar}>
        <div className="md:flex bg-gray-100">
          <Sidebar
            sidebarState={sidebarState}
            toggleSidebar={toggleSidebar}
            menuItems={menuItems}
          />
          <div className="flex-grow lg:p-14">
            <Routes>
              <Route exact path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/files" element={<GDrive />} />
              <Route
                path="/admin/generate/google-drive"
                element={<GGenerator />}
              />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </ToggleSidebarContext.Provider>
    </Layout>
  );
};

export default DashboardLayout;
