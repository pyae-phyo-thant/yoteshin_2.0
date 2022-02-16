import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGoogleApi } from "react-gapi";

import SocialAuth from "../components/auth/SocialAuth";
import Layout from "../components/Layout";
import { login } from "../function/auth";

const Login = () => {
  const [showloginButton, setShowloginButton] = useState(true);
  const history = useNavigate();
  const token = localStorage.getItem("admin_token");
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

  const gapi = useGoogleApi({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const auth = gapi?.auth2.getAuthInstance();

  useEffect(() => {
    if (token && auth?.isSignedIn.get()) {
      history("/admin/dashboard");
    }
  }, [auth]);

  const onLoginSuccess = async (res) => {
    const avatar = await res.profileObj.imageUrl;
    const Gtoken = await res.accessToken;
    const form = new FormData();
    console.log("Login with gmail", res.profileObj.email);

    form.append("google_id", res.profileObj.googleId);
    form.append("image", res.profileObj.imageUrl);
    form.append("token", res.accessToken);
    form.append("user_email", res.profileObj.email);
    form.append("user_name", res.profileObj.name);
    form.append("is_admin", true);

    login(form)
      .then((res) => {
        console.log("data from api", res);

        localStorage.setItem("admin_token", res.data.data.token);
        localStorage.setItem("admin_Gtoken", Gtoken);
        localStorage.setItem("admin_avatar", avatar);
        localStorage.setItem("admin_userId", res.data.data.id);
        localStorage.setItem("admin_email", res.data.data.user_email);
        localStorage.setItem("admin_name", res.data.data.user_name);
        setShowloginButton(false);
      })
      .catch((err) => {
        console.log("send login data err", err);
      });
    history("/admin/dashboard");
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
    toast.error("Login failed");
  };

  return (
    <Layout>
      <SocialAuth
        showloginButton={showloginButton}
        clientId={clientId}
        onLoginSuccess={onLoginSuccess}
        onLoginFailure={onLoginFailure}
      />
    </Layout>
  );
};

export default Login;
