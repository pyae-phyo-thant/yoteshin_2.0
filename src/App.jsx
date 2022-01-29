import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import User from "./pages/User";
import AdsDynamic from "./pages/AdsDynamic";
import { GoogleApiProvider } from "react-gapi";

function App() {
  return (
    <GoogleApiProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<DashboardLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/file/:name" exact element={<AdsDynamic />} />
        </Routes>
      </BrowserRouter>
    </GoogleApiProvider>
  );
}

export default App;
