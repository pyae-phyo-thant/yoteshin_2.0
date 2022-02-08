import React, { useState, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import GDrive from "../pages/GDrive";
import GGenerator from "../pages/GGenerator";
import Settings from "../pages/Settings";
import Home from "../pages/Home";

import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { ImGoogleDrive } from "react-icons/im";
import { FiShare, FiSettings } from "react-icons/fi";

import Sidebar from "../components/sidebar/Sidebar";
import Layout from "../components/Layout";
import User from "../pages/User";

const createMenuItem = (itemName, menuIcon, routeTo, subItems) => {
  return { itemName, menuIcon, routeTo, subItems };
};
// const createSubMenuItem = (subItemName, subMenuIcon, subRouteTo) => {
//   return { subItemName, subMenuIcon, subRouteTo };
// };
const menuItems = [
  createMenuItem("Dashboard", AiOutlineDashboard, "/admin/dashboard", null),
  createMenuItem("All Gdrive files", ImGoogleDrive, "/admin/files", null),
  createMenuItem(
    "Links Generator",
    FiShare,
    "/admin/generate/google-drive",
    null
  ),
  createMenuItem("Account", AiOutlineUser, "/admin/account", null),
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
        <div className="md:flex bg-gray-50">
          <Sidebar
            sidebarState={sidebarState}
            toggleSidebar={toggleSidebar}
            menuItems={menuItems}
          />
          <div className="flex-grow md:w-[80%]">
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route path="/files" element={<GDrive />} />
              <Route path="/generate/google-drive" element={<GGenerator />} />
              <Route path="/account" element={<User />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </ToggleSidebarContext.Provider>
    </Layout>
  );
};

export default DashboardLayout;
