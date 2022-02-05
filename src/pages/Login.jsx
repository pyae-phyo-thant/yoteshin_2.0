import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import SocialAuth from "../components/auth/SocialAuth";
import Layout from "../components/Layout";
import { login } from "../function/auth";

const Login = () => {
  const [showloginButton, setShowloginButton] = useState(true);
  const history = useNavigate();
  const dispatch = useDispatch();
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

  const onLoginSuccess = async (res) => {
    console.log("Login Success from Google Login:", res);
    const avatar = await res.profileObj.imageUrl;
    const Gtoken = await res.accessToken;

    const form = new FormData();

    form.append("google_id", res.profileObj.googleId);
    form.append("image", res.profileObj.imageUrl);
    form.append("token", res.accessToken);
    form.append("user_email", res.profileObj.email);
    form.append("user_name", res.profileObj.name);

    login(form)
      .then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: res.data.data.user_name,
            email: res.data.data.user_email,
            image: res.data.data.image,
            token: res.data.data.token,
            google_id: res.data.data.googleId,
          },
        });
        console.log("data from api", res);

        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("Gtoken", Gtoken);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("userId", res.data.data.id);
        localStorage.setItem("email", res.data.data.user_email);
        localStorage.setItem("name", res.data.data.user_name);
      })
      .catch((err) => {
        console.log("send login data err", err);
      });
    history("/admin/dashboard");
    setShowloginButton(false);
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
