import React from "react";
import {
  FiChevronLeft,
  FiChevronDown,
  FiSearch,
  FiChevronRight,
} from "react-icons/fi";

const TablePagination = ({
  minRow,
  maxRow,
  rowCount,
  loadFistData,
  loadNextData,
  loadPrevData,
  loadLastData,
  tableFilter,
  isTableFilterOpen,
  toggleTableFilter,
}) => {
  console.log("table pagination");
  return (
    <div className="flex md:inline-flex items-center justify-between md:justify-start">
      <div
        className={`w-6 md:w-8 h-6 md:h-8 flex mx-1 md:mx-2 items-center justify-center hover:bg-gray-200 rounded-lg cursor-pointer ${
          minRow > 0 ? "opacity-100" : "opacity-25"
        }`}
        onClick={loadFistData}
      >
        <span className="border-r-2 border-gray-900 h-3"></span>
        <FiChevronLeft />
      </div>
      <div
        className={`w-6 md:w-8 h-6 md:h-8 items-center flex mx-1 md:mx-2 hover:bg-gray-200 rounded-lg cursor-pointer ${
          minRow > 0 ? "opacity-100" : "opacity-25"
        }`}
        onClick={loadPrevData}
      >
        <FiChevronLeft />
      </div>
      <div className="hidden md:block mx-2 text-xs md:text-sm">
        <span className="font-bold text-gray-600">
          {minRow + 1}-{maxRow < rowCount ? maxRow : rowCount} of {rowCount}
        </span>
      </div>
      {tableFilter && (
        <div
          className={`md:hidden w-12 h-6 rounded-full flex text-white mx-1 ${
            isTableFilterOpen ? "bg-gray-600" : "bg-green-500"
          }`}
          onClick={toggleTableFilter}
        >
          {isTableFilterOpen ? (
            <FiChevronDown className="m-auto" />
          ) : (
            <FiSearch className="m-auto" />
          )}
        </div>
      )}
      <div
        className={`w-6 md:w-8 h-6 md:h-8 flex mx-1 md:mx-2 hover:bg-gray-200 rounded-lg cursor-pointer ${
          maxRow < rowCount ? "opacity-100" : "opacity-25"
        }`}
        onClick={loadNextData}
      >
        <FiChevronRight className="m-auto" />
      </div>
      <div
        className={`w-6 md:w-8 h-6 md:h-8 flex mx-1 md:mx-2 items-center justify-center hover:bg-gray-200 rounded-lg cursor-pointer ${
          maxRow < rowCount ? "opacity-100" : "opacity-25"
        }`}
        onClick={loadLastData}
      >
        <FiChevronRight />
        <span className="border-r-2 border-gray-900 h-3"></span>
      </div>
    </div>
  );
};

export default TablePagination;
