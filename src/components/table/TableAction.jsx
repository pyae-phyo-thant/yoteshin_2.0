import React, { useEffect, useState } from "react";
import Tooltip from "../tooltip/Tooltip";
import { BiTrash } from "react-icons/bi";

const TableAction = ({ actionData, tableDataCol }) => {
  const [id, setId] = useState([]);
  const [slug, setSlug] = useState("");
  const data = tableDataCol.slice(0, 2);

  useEffect(() => {
    setId(data[0]);
    setSlug(data[1]);
  }, [data]);
  console.log(data[0], "dayta");
  console.log(id, "id");
  console.log(slug, "slug");
  return (
    <div className="inline-flex flex-nowrap justify-between items-center">
      {actionData.map((ac, index) => (
        <React.Fragment key={index}>
          <div className="text-center px-2 inline-block cursor-pointer text-gray-600 hover:text-gray-900">
            <Tooltip toolTipText={ac.actionName}>
              <ac.actionIcon
                onClick={() =>
                  ac.actionName === "Delete"
                    ? ac.actionHandle(id)
                    : ac.actionHandle(slug)
                }
              />
            </Tooltip>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TableAction;
