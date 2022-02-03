import React, { useEffect, useState, useContext } from "react";
import Tooltip from "../tooltip/Tooltip";
import { TableContext } from "../../pages/GDrive";

const TableAction = ({ actionData }) => {
  const [id, setId] = useState([]);
  const [slug, setSlug] = useState("");
  const slugData = useContext(TableContext);

  useEffect(() => {
    slugData?.map((data) => {
      setId(data.id);
      setSlug(data.slug);
    });
  }, []);

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
