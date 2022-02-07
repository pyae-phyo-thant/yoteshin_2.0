import React from "react";
import TableAction from "./TableAction";

const TableDataRow = ({
  rowCount,
  tableDataCol,
  tableHeader,
  handleDelete,
  tableAction,
}) => {
  const date = tableDataCol.created_at.slice(0, 10);

  return (
    <div
      className={`block p-4 mb-4 border bg-white rounded-lg shadow md:p-0 md:mb-0 md:bg-transparent md:rounded-none md:shadow-none md:border-none md:table-row ${
        rowCount % 2 === 0 ? "md:bg-gray-100" : ""
      }`}
    >
      <div className="hidden lg:table-cell md:px-2 md:py-3 md:border-t">
        {rowCount}
      </div>
      <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 md:border-t">
        <span className="font-bold mr-3 text-gray-700 md:hidden">Name</span>
        {tableDataCol.name}
      </div>
      <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 md:border-t">
        <span className="font-bold mr-3 text-gray-700 md:hidden">DriveID</span>
        <a
          href={`https://drive.google.com/open?id=${tableDataCol.file_id}`}
          className="text-blue-500"
        >
          {tableDataCol.file_id}
        </a>
      </div>
      <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 md:border-t">
        <span className="font-bold mr-3 text-gray-700 md:hidden">Size</span>
        {tableDataCol.file_size}
      </div>
      <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 md:border-t">
        <span className="font-bold mr-3 text-gray-700 md:hidden">Download</span>
        {tableDataCol.down_count}
      </div>
      <div className="block md:table-cell text-xs mb-1 md:text-sm md:px-2 md:py-3 md:border-t">
        <span className="font-bold mr-3 text-gray-700 md:hidden">
          Added Time
        </span>
        {date}
      </div>

      {tableAction && (
        <div className="block md:table-cell md:px-2 md:py-3 text-right md:text-center md:border-t">
          <TableAction actionData={tableAction} file={tableDataCol} />
        </div>
      )}
    </div>
  );
};

export default TableDataRow;
