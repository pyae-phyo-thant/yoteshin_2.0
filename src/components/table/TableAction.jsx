import React from "react";
import Tooltip from "../tooltip/Tooltip";

const TableAction = ({ actionData }) => {
  return (
    <div className="inline-flex flex-nowrap justify-between items-center">
      {actionData.map((ac, index) => (
        <React.Fragment key={index}>
          <div className="text-center px-2 inline-block cursor-pointer text-gray-600 hover:text-gray-900">
            <Tooltip toolTipText={ac.actionName}>
              <ac.actionIcon />
            </Tooltip>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TableAction;
