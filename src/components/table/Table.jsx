import React, { useEffect, useState } from "react";
import TableFilter from "./TableFilter";
import TableHeader from "./TableHeader";
import TableDataRow from "./TableDataRow";
import TablePagination from "./TablePagination";
import Loading from "../Loading";

const style = {
  backdropBlur: {
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
    background: "rgba(255, 255, 255, 0.95)",
  },
};

const Table = ({
  rowLimit,
  tableDataRow,
  tableFilter,
  tableHeader,
  tableAction,
  handleDelete,
}) => {
  const [currentMinRow, setCurrentMinRow] = useState(0);
  const [currentMaxRow, setCurrentMaxRow] = useState(rowLimit);
  const [resultData, setResultData] = useState(tableDataRow);
  const [isTableFilterOpen, setTableFilterOpen] = useState(false);

  useEffect(() => {
    setResultData(tableDataRow);
  }, [tableDataRow]);

  const toggleTableFilter = () => {
    setTableFilterOpen(!isTableFilterOpen);
  };
  const loadNextData = () => {
    if (currentMaxRow < resultData.length) {
      setCurrentMinRow(currentMaxRow);
      setCurrentMaxRow(currentMaxRow + rowLimit);
    }
  };
  const loadPrevData = () => {
    if (currentMinRow > 0) {
      setCurrentMaxRow(currentMinRow);
      setCurrentMinRow(currentMinRow - rowLimit);
    }
  };
  const loadFistData = () => {
    if (currentMinRow > 0) {
      setCurrentMinRow(0);
      setCurrentMaxRow(rowLimit);
    }
  };
  const loadLastData = () => {
    if (currentMaxRow < resultData.length) {
      setCurrentMinRow(resultData.length - (resultData.length % rowLimit));
      setCurrentMaxRow(resultData.length);
    }
  };
  const filteredData = (query) => {
    let data = tableDataRow.filter((tdr) =>
      tdr.reduce((prev, next) => (prev + next).toLowerCase()).includes(query)
    );
    setResultData(data);
  };
  return (
    <div className="overflow-auto overflow-x-auto pb-10 text-sm md:border md:bg-white md:rounded-lg md:shadow-md md:pb-0">
      <div
        style={style.backdropBlur}
        className="fixed bottom-0 left-0 p-4 w-full border-t text-center md:flex md:items-center md:p-1 md:justify-between md:static md:w-auto md:border-none z-20"
      >
        {tableFilter && (
          <div
            className={`-mt-2 mb-3 md:mb-0 md:mt-0 ${
              isTableFilterOpen ? null : "hidden md:block"
            }`}
          >
            <TableFilter filteredData={filteredData} />
          </div>
        )}
        <TablePagination
          tableFilter={tableFilter}
          toggleTableFilter={toggleTableFilter}
          isTableFilterOpen={isTableFilterOpen}
          loadNextData={loadNextData}
          loadPrevData={loadPrevData}
          loadFistData={loadFistData}
          loadLastData={loadLastData}
          rowCount={resultData.length}
          minRow={currentMinRow}
          maxRow={currentMaxRow}
        />
      </div>
      <div className="block md:table w-full">
        <TableHeader tableHeader={tableHeader} tableAction={tableAction} />
        {resultData.length <= 0 ? (
          <p className="p-3 text-lg">No Data Added.</p>
        ) : (
          resultData.slice(currentMinRow, currentMaxRow).map((row, index) => (
            <React.Fragment key={index}>
              <TableDataRow
                tableHeader={tableHeader}
                tableDataCol={row}
                rowCount={index + currentMinRow + 1}
                tableAction={tableAction}
                handleDelete={handleDelete}
              />
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
