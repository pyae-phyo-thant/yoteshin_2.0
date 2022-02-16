import React, { useState, useRef, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleApi } from "react-gapi";

import { AiOutlineDashboard, AiOutlineCloudDownload } from "react-icons/ai";
import { FiShare2, FiArrowRightCircle } from "react-icons/fi";
import { CgDatabase } from "react-icons/cg";
import { BiCopy } from "react-icons/bi";
import loadingButton from "../images/loading_red.gif";

import { formatBytes } from "../function/formatBytes";
import { addFile, getData, getUser } from "../function/api";

import Chart from "../components/chart/Chart";

const DummyData = [
  {
    name: "Jan",
    Downloads: 4000,
  },
  {
    name: "Feb",
    Downloads: 3000,
  },
  {
    name: "Mar",
    Downloads: 5000,
  },
  {
    name: "Apr",
    Downloads: 4000,
  },
  {
    name: "May",
    Downloads: 3000,
  },
  {
    name: "June",
    Downloads: 2000,
  },
  {
    name: "July",
    Downloads: 4000,
  },
  {
    name: "Aug",
    Downloads: 3000,
  },
  {
    name: "Sept",
    Downloads: 4000,
  },
  {
    name: "Oct",
    Downloads: 1000,
  },
  {
    name: "Nov",
    Downloads: 4000,
  },
  {
    name: "Dec",
    Downloads: 3000,
  },
];

const Dashboard = () => {
  var dt = new Date();
  var month = dt.getMonth();
  console.log(month, "w");

  const [share, setShare] = useState("");
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalDownCount, setTotalDownCount] = useState(0);
  const [showCopy, setShowCopy] = useState(false);
  const [copyLink, setCopyLink] = useState("");
  const [isCopy, setIsCopy] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkValid, setLinkValid] = useState(false);
  const [showError, setshowError] = useState(false);
  const [days, setDays] = useState([]);
  const ref = useRef();
  const copyRef = useRef();
  const history = useNavigate();
  const accessToken = localStorage.getItem("admin_token");
  const gAccessToken = localStorage.getItem("admin_Gtoken");
  const userId = localStorage.getItem("admin_userId");

  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const gApiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapi?.auth2.getAuthInstance();

  useEffect(() => {
    if (!auth?.isSignedIn.get()) {
      history("/login");
    }
    if (!accessToken) {
      alert("Your don't have accessToken please Login Again!");
      history("/login");
    }
  }, [auth]);

  useEffect(() => {
    getUser(accessToken, userId).then((res) => {
      if (res.data.data && res.data.data.is_admin !== true) {
        history("/");
      }
    });
  }, []);

  //------ Filter is mobile or not
  useEffect(() => {
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent;

    /* Creating a regular expression 
       containing some mobile devices keywords 
       to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
       it returns boolean value*/
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
      alert(
        "Please open via laptop or desktop to get full experience of app. Otherwise you can not move to other pages."
      );
    } else {
      console.log("desktop");
    }
  }, []);

  const onChangeState = (e) => {
    setShare(e.target.value);
    setId(e.target.value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyRef.current.value);
    setIsCopy(true);
  };

  const gapiDrive = useGoogleApi({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const getDatas = () => {
    if (ref.current?.value.slice(32, 65)) {
      setshowError(false);
    } else {
      return setshowError(true);
    }

    const driveId = id.slice(32, 65);

    setLoading(true);

    // axios
    //   .get(
    //     `https://www.googleapis.com/drive/v3/files/${driveId}?fields=name%2Csize%2Cid%2CthumbnailLink%2CmimeType&key=${gApiKey}`
    //   )
    //id,name,thumbnailLink,mimeType,size

    gapiDrive?.client.drive.files
      .get({
        fileId: driveId,
        fields: "id,name,thumbnailLink,mimeType,size",
      })
      .then((res) => {
        setLoading(false);

        //Format to Byte to MB ,GB
        const fileSize = formatBytes(res.result.size);

        const form = new FormData();

        form.append("user_id", userId);
        form.append("file_id", res.result.id);
        form.append("name", res.result.name);
        form.append("thumb", res.result.thumbnailLink);
        form.append("mime_type", res.result.mimeType);
        form.append("file_size", fileSize);

        addFile(accessToken, form)
          .then((res) => {
            setShowCopy(true);
            setCopyLink(`${baseURL}/file/${res.data.data.slug}`);
          })
          .catch((err) => {
            console.log("send file fail", err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log("fail to get data from drive id", err);
      });
  };

  useEffect(() => {
    getData(accessToken, userId).then((res) => {
      if (res.data) {
        setTotalLinks(res.data.length);

        const total = res?.data.reduce(
          (n, { down_count }) => n + parseInt(down_count),
          0
        );
        setTotalDownCount(total);
      }
    });
  }, []);

  return (
    <>
      <div className="bg-glass-dash p-10">
        <div className="flex items-center text-2xl font-semibold">
          <AiOutlineDashboard className="mr-2 text-red-600" />{" "}
          <h1>Dashboard</h1>
        </div>

        <div className="my-10 flex gap-4">
          <div className="flex bg-glass flex-col rounded-lg p-4  bg-white shadow-xl w-3/6">
            <div className="mb-4 pb-3 flex justify-center text-4xl text-[#6c757d]">
              <CgDatabase className="text-blue-600" />
            </div>
            <h5 className="text-center text-xl font-semibold mb-2">
              Total Links
            </h5>
            <h5 className="text-center text-xl font-semibold text-[#6c757d]">
              {totalLinks}
            </h5>
          </div>
          <div className="flex bg-glass flex-col rounded-lg p-4  bg-white shadow-lg w-3/6">
            <div className="mb-4 pb-3 flex justify-center text-4xl text-[#6c757d]">
              <Link to="/admin/files">
                <AiOutlineCloudDownload className="text-green-600" />
              </Link>
            </div>
            <h5 className="text-center text-xl font-semibold mb-2">
              Downloads
            </h5>
            <h5 className="text-center text-xl font-semibold text-[#6c757d]">
              {totalDownCount}
            </h5>
          </div>
        </div>
      </div>

      <div className="rounded-lg mx-10 mt-5 md:w-[94%] shadow-lg w-full bg-white">
        <Chart
          data={DummyData}
          title="Downloads Analytics"
          grid
          dataKey="Downloads"
        />
      </div>

      <div className="px-10 mt-20 mb-10">
        <div className="rounded-lg bg-glass p-4 shadow-md w-full bg-white">
          <div className="flex items-center text-2xl font-medium mb-4">
            <FiShare2 className="mr-2 text-blue-500" />
            Quick Share
          </div>

          <div className="flex mb-2">
            <input
              type="text"
              value={share}
              ref={ref}
              onChange={onChangeState}
              placeholder="Enter GDrive share link"
              className="px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 
            focus:outline-none focus:border-sky-500 w-full"
            />
            <button
              disabled={!share}
              onClick={getDatas}
              className={`${
                !share
                  ? "bg-blue-300"
                  : "bg-blue-500 cursor-pointer hover:bg-blue-800"
              } rounded-md text-white text-base font-medium ml-6 flex px-10 py-2 items-center`}
            >
              {loading ? (
                <img src={loadingButton} className="w-[17%]" />
              ) : (
                <FiArrowRightCircle className="mr-1" />
              )}
              <span>Share</span>
            </button>
          </div>
          {showError ? (
            <p className="text-sm text-red-600">
              invalid link! Please check your input link
            </p>
          ) : (
            ""
          )}
          {showCopy && (
            <>
              <span className="text-sm text-[#6c757d] ml-4 font-medium">
                Link to share
              </span>
              <div className="flex mt-2">
                <input
                  type="text"
                  value={copyLink}
                  ref={copyRef}
                  disabled
                  placeholder="Enter GDrive share link"
                  className="px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 
            focus:outline-none focus:border-sky-500 w-full"
                />
                <button
                  onClick={copyToClipboard}
                  className={`${
                    !share
                      ? "bg-blue-300"
                      : "border-blue-500 border cursor-pointer hover:bg-blue-800"
                  } rounded-md text-black hover:text-white text-base font-medium ml-6 px-10 py-2 flex items-center`}
                >
                  <span>
                    <BiCopy className="mr-1" />
                  </span>
                  {isCopy ? "Done" : "Copy"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
