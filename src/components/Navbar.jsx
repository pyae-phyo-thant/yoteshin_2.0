import React, { useEffect, useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FiLogOut, FiLogIn, FiShare } from "react-icons/fi";
import { GoogleLogout } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleApi } from "react-gapi";
import { getUser } from "../function/api";

const NarbarItem = ({ title, classProps, url }) => {
  return (
    <li className={`mr-4 cursor-pointer md:text-base ${classProps}`}>
      <Link to={url}>{title}</Link>
    </li>
  );
};

const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const Navbar = () => {
  const [authenticate, setAuthenticate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const history = useNavigate();
  const token = localStorage.getItem("admin_token");
  const userId = localStorage.getItem("admin_userId");
  const adminAvatar = localStorage.getItem("admin_avatar");
  const uAvatar = localStorage.getItem("user_avatar");
  const location = window.location.pathname.slice(0, 6);
  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapi?.auth2.getAuthInstance();

  useEffect(() => {
    if (auth?.isSignedIn.get()) {
      setAuthenticate(true);
      setAvatar(adminAvatar);
      setUserAvatar(uAvatar);
    } else {
      setAuthenticate(false);
    }
  }, []);

  useEffect(() => {
    getUser(token, userId).then((res) => {
      if (res.data.data && res.data.data.is_admin === true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  });

  const onSignoutSuccess = () => {
    gapi.auth2.getAuthInstance().signOut();
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_avatar");
    localStorage.removeItem("user_avatar");
    localStorage.removeItem("admin_userId");
    localStorage.removeItem("admin_Gtoken");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_name");
    console.clear();
    if (location === "/admin") {
      history("/login");
    }
  };

  // md:flex-[0.5] flex-initial justify-center items-center
  return (
    <nav className="w-full bg-[rgba(30,41,59)] flex md:justify-between justify-between items-center py-2 px-4">
      <div className="">
        {/* <img src={logo} alt="logo" className="w-32 cursor-pointer" /> */}
        <Link to="/">
          <img
            src="https://images-na.ssl-images-amazon.com/images/I/51hKyr0it6L.png"
            alt=""
            className="w-10 h-10"
          />
        </Link>
      </div>
      <ul className="text-white flex list-none flex-row justify-between items-center flex-initial">
        {authenticate ? (
          <>
            <li className="cursor-pointer items-center mx-4 md:text-base flex">
              <FiLogOut className="mr-2" />
              <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={onSignoutSuccess}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Logout
                  </button>
                )}
              />
            </li>
            {isAdmin
              ? location !== "/admin" && (
                  <li className="cursor-pointer items-center mx-4 md:text-base flex">
                    <AiOutlineDashboard className="mr-2" />
                    <Link to="/admin/dashboard">Dashboard</Link>
                  </li>
                )
              : ""}
          </>
        ) : (
          <>
            <li className="cursor-pointer items-center mx-4 md:text-base flex">
              <FiLogIn className="mr-2" />
              <Link to="/login">Admin Login</Link>
            </li>
          </>
        )}
        <li>
          <img
            className="w-9 rounded-full ml-6"
            src={avatar ? avatar : userAvatar}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
