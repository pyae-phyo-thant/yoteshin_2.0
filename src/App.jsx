import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import User from "./pages/User";
import AdsDynamic from "./pages/AdsDynamic";
import { GoogleApiProvider } from "react-gapi";
import Policy from "./pages/policy";
import Terms from "./pages/terms";

function App() {
  return (
    <GoogleApiProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<DashboardLayout />} />
          <Route path="/user" element={<User />} />
          <Route path="/file/:name" exact element={<AdsDynamic />} />
          <Route path="/policy" exact element={<Policy />} />
          <Route path="/terms" exact element={<Terms />} />
        </Routes>
      </BrowserRouter>
    </GoogleApiProvider>
  );
}

export default App;
