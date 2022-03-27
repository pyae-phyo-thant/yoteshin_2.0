import React, { useEffect, useState, createContext } from "react";

// Icon
import { ImGoogleDrive } from "react-icons/im";
import { MdOpenInNew } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
//Network
import axios from "axios";
//Google
import { useGoogleApi } from "react-gapi";
//Component
import Table from "../components/table/Table";
//Function
import { getData, getUser } from "../function/api";
import Loading from "../components/Loading";

const tableHeader = [
  "Name",
  "DriveID",
  "Size",
  "Download",
  "Added Time",
  "Actions",
];

function createAction(actionName, actionIcon, actionHandle) {
  return { actionName, actionIcon, actionHandle };
}
export const TableContext = createContext();

const GDrive = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("admin_token");
  const userId = localStorage.getItem("admin_userId");
  const history = useNavigate();

  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapi?.auth2.getAuthInstance();

  useEffect(() => {
    if (!auth?.isSignedIn.get()) {
      history("/login");
      setLoading(false);
    }
    if (!token) {
      alert("Your don't have accessToken please Login Again!");
      history("/login");
    }
  }, [auth]);

  useEffect(() => {
    getData(token, userId)
      .then((res) => {
        setTableData(res.data.data);
        setLoading(false);
        console.log(res, "data from api");
      })
      .catch((err) => {
        setLoading(false);
        console.log("get file data error", err);
      });
  }, []);

  useEffect(() => {
    if (token) {
      getUser(token, userId).then((res) => {
        if (res.data.data && res.data.data.is_admin !== true) {
          history("/");
        }
      });
    }
  }, []);

  const handleDelete = (id) => {
    console.log(id, "delete");
    axios
      .delete(`${import.meta.env.VITE_APP_API_URL}/delete?id=${id}`, {
        headers: {
          accessToken: token,
          id: userId,
        },
      })
      .then(() => {
        getData(token, userId)
          .then((res) => {
            setTableData(res.data);
          })
          .catch((err) => console.log("get file data error", err));
      })
      .catch((err) => console.log("delete error", err));
  };

  const handleOpen = (slug) => {
    window.open(`${import.meta.env.VITE_APP_BASE_URL}/file/${slug}`, "_blank");
  };

  const copyToClipboard = (slug) => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_APP_BASE_URL}/file/${slug}`
    );
  };

  const tableAction = [
    createAction("Open", MdOpenInNew, handleOpen),
    createAction("Copy Link", FiCopy, copyToClipboard),
    createAction("Delete", BiTrash, handleDelete),
  ];

  return (
    <>
      {loading ? (
        <Loading width={"w-[8%] m-auto mt-40"} />
      ) : (
        <div className="p-10">
          <div className="flex items-center text-2xl font-semibold">
            <ImGoogleDrive className="mr-2 text-blue-500" />{" "}
            <h1>Google Drive</h1>
          </div>

          <div className="bg-glass rounded-md my-10">
            <Table
              tableHeader={tableHeader}
              tableData={tableData}
              tableAction={tableAction}
              rowLimit={10}
              tableFilter={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GDrive;
