import React, { useEffect, useState } from "react";
import { ImGoogleDrive } from "react-icons/im";
import Table from "../components/table/Table";
import { MdOpenInNew } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
];

function createAction(actionName, actionIcon) {
  return { actionName, actionIcon };
}

// const tableDataRows = [
//   createData(
//     "Doctor Strange",
//     <a
//       target="_blank"
//       href={`https://drive.google.com/open?id=1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1`}
//       className="md:text-sky-600"
//     >
//       1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1
//     </a>,
//     "1 GB",
//     "N/A",
//     "0",
//     "1/31/2022,12:00 PM"
//   ),
// ];

const tableAction = [
  createAction("Open", MdOpenInNew),
  createAction("Copy Link", FiCopy),
  createAction("Delete", BiTrash),
];

const GDrive = () => {
  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem("token");
  const history = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      history("/login");
    }
  }, []);

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
      "1/31/2022,12:00 PM"
    )
  );

  console.log(tableData, "row Gdrive");

  useEffect(() => {
    axios
      .get("https://api.meta-mate.pw/data", {
        headers: {
          accessToken:
            "ya29.A0ARrdaM8e3F0rhIJnoGg2O7Eeg48UHyZbjQcQBL7RvvP80-KniTSaqc9E3ia6StM61HkAjJ3N4oapBGLK7lLJxrdmh-z8QIoYdgimImehxEV8nvqks6_TZtfiIX767IAW04CISAxnv672Zg9iE9Cj0-oR4gpxTg",
          id: "3",
        },
      })
      .then((res) => {
        console.log("file data", res);
        setData(res.data);
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
        />
      </div>
    </>
  );
};

export default GDrive;
