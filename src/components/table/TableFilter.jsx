import React from "react";

const TableFilter = ({ filteredData }) => {
  console.log("table filter");
  return (
    <React.Fragment>
      <form action="" className="flex flex-wrap items-center">
        <input
          className="w-full md:w-64 m-2 p-3 border border-green-400"
          type="text"
          placeholder="Search..."
          onChange={(e) => filteredData(e.target.value.toLowerCase())}
        />
      </form>
    </React.Fragment>
  );
};

export default TableFilter;
