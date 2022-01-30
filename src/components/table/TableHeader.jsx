import React from "react";

const TableHeader = ({ tableHeader, tableAction }) => {
  return (
    <div className="hidden md:table-row text-green-100 bg-green-500 font-bold">
      <div className="hidden lg:table-cell md:px-2 md:py-3 lg:p-3">#</div>
      {tableHeader.map((th, index) => (
        <React.Fragment key={index}>
          {index <= 3 ? (
            <div className="block md:table-cell md:px-2 md:py-3 lg:p-3">
              {th}
            </div>
          ) : (
            <div className="block md:hidden lg:table-cell md:px-2 md:py-3 lg:p-3">
              {th}
            </div>
          )}
        </React.Fragment>
      ))}
      {tableAction && (
        <div className="block md:table-cell md:px-2 md:py-3 lg:p-3"></div>
      )}
    </div>
  );
};

export default React.memo(TableHeader);
