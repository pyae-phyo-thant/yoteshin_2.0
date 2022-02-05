import React, { useEffect, useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import {
  AiOutlineClose,
  AiOutlineDashboard,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { FiLogOut, FiLogIn, FiShare } from "react-icons/fi";
import { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleApi } from "react-gapi";

const NarbarItem = ({ title, classProps, url }) => {
  return (
    <li className={`mr-4 cursor-pointer md:text-base ${classProps}`}>
      <Link to={url}>{title}</Link>
    </li>
  );
};

const menu = [
  {
    title: "Dashboard",
    icon: AiOutlineDashboard,
    url: "/admin/dashboard",
  },
  {
    title: "Generator",
    icon: FiShare,
    url: "/admin/generate/google-drive",
  },
  {
    title: "Settings",
    icon: AiOutlineSetting,
    url: "/admin/settings",
  },
  {
    title: "My Account",
    icon: AiOutlineUser,
    url: "/user",
  },
];

const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [authenticate, setAuthenticate] = useState(false);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const history = useNavigate();
  const location = window.location.pathname.slice(0, 6);
  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapi?.auth2.getAuthInstance();
  useEffect(() => {
    if (auth?.isSignedIn.get()) {
      setAuthenticate(true);
    } else {
      setAuthenticate(false);
    }
  }, [auth]);
  const onSignoutSuccess = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    gapi.auth2.getAuthInstance().signOut();
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    localStorage.removeItem("userId");
    localStorage.removeItem("Gtoken");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    console.clear();
    if (location === "/admin") {
      history("/login");
    }
  };

  useEffect(() => {
    setAvatar(localStorage.getItem("avatar"));
  }, [auth]);

  // md:flex-[0.5] flex-initial justify-center items-center
  return (
    <nav className="w-full bg-[#2c2f48] flex md:justify-between justify-between items-center p-4">
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
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <li className={`mr-4 cursor-pointer md:text-base`}>
          <Link to="/">Home</Link>
        </li>
        {authenticate &&
          menu.map((item, index) => (
            <React.Fragment key={index}>
              <item.icon className="mr-2" />
              <NarbarItem
                key={item + index}
                title={item.title}
                classProps={undefined}
                url={item.url}
              />
            </React.Fragment>
          ))}

        {authenticate ? (
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
        ) : (
          <li className="cursor-pointer items-center mx-4 md:text-base flex">
            <FiLogIn className="mr-2" />
            <Link to="/login">Login</Link>
          </li>
        )}
        <li>
          <img className="w-9 rounded-full ml-6" src={avatar} />
        </li>
      </ul>
      <div className="flex md:hidden">
        <div className="flex relative">
          {toggleMenu ? (
            <AiOutlineClose
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <HiMenuAlt4
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <ul
              className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none 
          flex flex-col justify-start items-end rounded-mg blue-glassmorphism text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose
                  onClick={() => setToggleMenu(false)}
                  className="cursor-pointer"
                />
              </li>

              {menu.map((item, index) => (
                <div className="flex items-center" key={index}>
                  <item.icon className="mr-2" />
                  <NarbarItem
                    key={item + index}
                    title={item.title}
                    classProps={"my-2 text-lg"}
                  />
                </div>
              ))}
            </ul>
          )}
        </div>
        {authenticate && (
          <img className="w-9 rounded-full ml-6 md:hidden" src={avatar} />
        )}
        {authenticate ? (
          <li className="cursor-pointer items-center ml-2 md:text-base flex md:hidden">
            <FiLogOut className="mr-2 text-white" />
            <GoogleLogout
              clientId={clientId}
              onLogoutSuccess={onSignoutSuccess}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="text-white text-base"
                >
                  Logout
                </button>
              )}
            />
          </li>
        ) : (
          <li className="cursor-pointer items-center ml-2 md:text-base flex md:hidden">
            <FiLogIn className="mr-2 text-white" />
            <Link to="/login" className="text-white">
              Login
            </Link>
          </li>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
