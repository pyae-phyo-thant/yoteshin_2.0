import React from "react";
import { ImGoogleDrive } from "react-icons/im";
import Table from "../components/table/Table";
import { MdOpenInNew } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

function createData(patientID, name, father, nrc, age, blood, status) {
  return [patientID, name, father, nrc, age, blood, status];
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

const dataLink = () => {
  let data = [
    "1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1",
    "1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1",
    "1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1",
  ];

  return data.map((url) => {
    <Link to={url}>{url}</Link>;
  });
};

const tableDataRows = [
  createData(
    "Doctor Strange",
    <Link to="1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1" className="md:text-sky-600">
      1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1
    </Link>,
    "1 GB",
    "N/A",
    "0",
    "1/31/2022,12:00 PM"
  ),
  createData(
    "B Movie",
    <Link to="1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1" className="md:text-sky-600">
      1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1
    </Link>,
    "1 GB",
    "N/A",
    "0",
    "1/31/2022,12:00 PM"
  ),
  createData(
    "C Book",
    <Link to="1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1" className="md:text-sky-600">
      1Cumpz22uTM_BZ41iwwG9lxWmeoBYB3i1
    </Link>,
    "1 GB",
    "N/A",
    "0",
    "1/31/2022,12:00 PM"
  ),
];

const tableAction = [
  createAction("Open", MdOpenInNew),
  createAction("Copy Link", FiCopy),
  createAction("Delete", BiTrash),
];

const GDrive = () => {
  return (
    <>
      <div className="flex items-center text-2xl font-semibold">
        <ImGoogleDrive className="mr-2 text-blue-500" /> <h1>Google Drive</h1>
      </div>

      <div className="bg-white rounded-md my-10">
        <Table
          tableHeader={tableHeader}
          tableDataRow={tableDataRows}
          tableAction={tableAction}
          rowLimit={10}
          tableFilter={true}
        />
      </div>
    </>
  );
};

export default GDrive;
