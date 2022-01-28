import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import SocialAuth from "../components/auth/SocialAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { createOrUpdateUser } from "../function/auth";
import Layout from "../components/Layout";

const clientId =
  "821863821685-rc8tk3jks0u5lbft02tamrd6n90bq6v2.apps.googleusercontent.com";

const Login = () => {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  const { authReducer } = useSelector((state) => ({ ...state }));

  const onLoginSuccess = async (res) => {
    console.log("Login Success:", res);
    const avatar = await res.profileObj.imageUrl;

    const form = new FormData();

    form.append("google_id", res.profileObj.googleId);
    form.append("image", res.profileObj.imageUrl);
    form.append("token", res.accessToken);
    form.append("user_email", res.profileObj.email);
    form.append("user_name", res.profileObj.name);

    // createOrUpdateUser(form)
    axios
      .post("https://api.meta-mate.pw/login", form, {
        headers: {
          "content-type": "application/json",
        },
      })
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
        console.log("login with google", res);

        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("userId", res.data.data.id);
        localStorage.setItem("email", res.data.data.user_email);
        localStorage.setItem("name", res.data.data.user_name);

        const GApiKey = "AIzaSyCs0p1eJrsn8KT7yz_F2IZd40JwFOBLEnU";

        // axios
        //   .get(`https://www.googleapis.com/drive/v3/about?key=${GApiKey}`, {
        //     headers: {
        //       "content-type": "application/json",
        //     },
        //   })
        //   .then((res) => console.log("res storage", res));
      })
      .catch((err) => {
        console.log("token err", err);
      });
    history("/user");
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
    toast.error("Login failed");
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    localStorage.removeItem("token");
    console.clear();

    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  return (
    <Layout>
      <SocialAuth
        showloginButton={showloginButton}
        clientId={clientId}
        onLoginSuccess={onLoginSuccess}
        onLoginFailure={onLoginFailure}
        onSignoutSuccess={onSignoutSuccess}
        showlogoutButton={showlogoutButton}
      />
    </Layout>
  );
};

export default Login;
