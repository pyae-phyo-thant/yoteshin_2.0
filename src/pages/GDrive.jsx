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
import { getData } from "../function/api";
import Loading from "../components/Loading";

function createData(name, fileId, size, quality, download, createdDate) {
  return [name, fileId, size, quality, download, createdDate];
}

const tableHeader = [
  "Name",
  "DriveID",
  "Size",
  "Quality",
  "Download",
  "Added Time",
  "Actions",
];

function createAction(actionName, actionIcon, actionHandle) {
  return { actionName, actionIcon, actionHandle };
}
export const TableContext = createContext();

const GDrive = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const history = useNavigate();

  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapi?.auth2.getAuthInstance();

  useEffect(() => {
    if (!auth) {
      history("/login");
    }
  }, []);

  const tableActionData = data.map((file) => file);

  const tableData = data.map((file) =>
    createData(
      file.name,
      <a
        target="_blank"
        href={`https://drive.google.com/open?id=${file.file_id}`}
        className="md:text-sky-600"
      >
        {file.file_id}
      </a>,
      file.file_size,
      "N/A",
      "0",
      "1/31/2022"
    )
  );

  const handleDelete = (id) => {
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
            setData(res.data);
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

  useEffect(() => {
    setLoading(true);
    getData(token, userId)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("get file data error", err);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center text-2xl font-semibold">
            <ImGoogleDrive className="mr-2 text-blue-500" />{" "}
            <h1>Google Drive</h1>
          </div>

          <div className="bg-white rounded-md my-10">
            <TableContext.Provider value={tableActionData}>
              <Table
                tableHeader={tableHeader}
                tableDataRow={tableData}
                tableAction={tableAction}
                rowLimit={10}
                tableFilter={true}
                handleDelete={handleDelete}
              />
            </TableContext.Provider>
          </div>
        </>
      )}
    </>
  );
};

export default GDrive;
