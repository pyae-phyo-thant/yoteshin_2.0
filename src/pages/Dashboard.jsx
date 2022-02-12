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

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const Dashboard = () => {
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
      console.log(res);
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
    console.log(ref.current.value);
  };

  const gapiDrive = useGoogleApi({
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const getDatas = async () => {
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

    await gapiDrive?.client?.drive.files
      .get({
        fileId: driveId,
        fields: "id,name,thumbnailLink,mimeType,size",
      })
      .then((res) => {
        setLoading(false);
        console.log("drive data from id", res);
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
      console.log(res);
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

  // Creating Chart
  // ChartJS.register(
  //   CategoryScale,
  //   LinearScale,
  //   PointElement,
  //   LineElement,
  //   Title,
  //   Tooltip,
  //   Legend
  // );

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Chart.js Line Chart",
  //     },
  //   },
  // };

  // var dt = new Date();
  // var month = dt.getMonth();
  // var year = dt.getFullYear();
  // const daysInMonth = new Date(year, month, 0).getDate();

  // useEffect(() => {
  //   let array = [];
  //   for (let index = 1; index <= daysInMonth; index++) {
  //     array.push(index);
  //   }
  //   // setDays(array);
  // }, []);
  // const labels = days;

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Downloads",
  //       data: ["10", "3", "6"],
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };
  //------- End Chart

  return (
    <>
      <div className="bg-[rgba(2,132,199)] p-10">
        <div className="flex items-center text-2xl text-white font-semibold">
          <AiOutlineDashboard className="mr-2 text-red-600" />{" "}
          <h1>Dashboard</h1>
        </div>

        <div className="my-10 flex gap-4">
          <div className="flex flex-col rounded-lg p-4  bg-white shadow-lg w-3/6">
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
          <div className="flex flex-col rounded-lg p-4  bg-white shadow-lg w-3/6">
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

      <div className="rounded-lg mx-10 mt-10 shadow-lg w-full bg-white">
        {/* <Line options={options} data={data} /> */}
      </div>

      <div className="px-10 mt-20">
        <div className="rounded-lg p-4 shadow-md w-full bg-white">
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
