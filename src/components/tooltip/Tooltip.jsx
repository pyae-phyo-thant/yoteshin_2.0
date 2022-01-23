import React, { useState } from "react";

const style = {
  tooltipText: {
    top: "50%",
    marginTop: "calc(-50% - 0.25rem)",
    right: "100%",
    background: "rgba(0,0,0,0.7)",
  },
};

const Tooltip = ({ children, toolTipText }) => {
  const [isHovering, setHovering] = useState(false);
  const handleMouseHover = () => {
    setHovering(!isHovering);
  };
  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      {children}
      {isHovering && (
        <div
          style={style.tooltipText}
          className="hidden xl:inline-block w-20 text-white text-center rounded p-1 text-xs font-normal absolute mr-1"
        >
          <span>{toolTipText}</span>
        </div>
      )}
    </div>
  );
};
export default Tooltip;
