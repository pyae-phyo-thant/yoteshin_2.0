import React, { useEffect, useState, useRef } from "react";
import { ImGoogleDrive } from "react-icons/im";
import Table from "../components/table/Table";
import { MdOpenInNew } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getData } from "../function/api";
import { useGoogleApi } from "react-gapi";
import { BiTrash } from "react-icons/bi";

function createData(
  id,
  slug,
  name,
  fileId,
  size,
  quality,
  download,
  createdDate
) {
  return [id, slug, name, fileId, size, quality, download, createdDate];
}

const tableHeader = [
  "Id",
  "slug",
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

const GDrive = () => {
  const [data, setData] = useState([]);
  const [copyLink, setCopyLink] = useState([]);
  const [copy, setCopy] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const history = useNavigate();
  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  // const copyArray = () => {
  //   data.map((file) => {
  //     setCopyLink(file.slug);
  //     console.log(file.slug, "inside");
  //   });
  //   console.log(data, "in");
  // };

  const auth = gapi?.auth2.getAuthInstance();

  useEffect(() => {
    if (!auth) {
      history("/login");
    }
  }, []);

  const tableData = data.map((file) =>
    createData(
      file.id,
      file.slug,
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
    console.log("delete", id);
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
    console.log("open", slug);
    window.open(`${import.meta.env.VITE_APP_BASE_URL}/file/${slug}`, "_blank");
  };

  const copyToClipboard = (slug) => {
    console.log("copy", slug);
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
    getData(token, userId)
      .then((res) => {
        console.log("file data", res);
        setData(res.data);
        setCopyLink(res.data);
      })
      .catch((err) => console.log("get file data error", err));
  }, []);

  return (
    <>
      <div className="flex items-center text-2xl font-semibold">
        <ImGoogleDrive className="mr-2 text-blue-500" /> <h1>Google Drive</h1>
      </div>

      <div className="bg-white rounded-md my-10">
        <Table
          tableHeader={tableHeader}
          tableDataRow={tableData}
          tableAction={tableAction}
          rowLimit={10}
          tableFilter={true}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default GDrive;
