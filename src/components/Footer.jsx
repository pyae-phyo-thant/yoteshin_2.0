import React from "react";
import playStore from "../images/playstore.png";

const Footer = () => {
  const date = new Date();

  return (
    <div className="bg-[rgba(30,41,59)]">
      <div className="p-4 mx-4 grid grid-cols-2 gap-4">
        <div>
          {/* <img
            src="https://images-na.ssl-images-amazon.com/images/I/51hKyr0it6L.png"
            alt=""
            className="w-10 h-10"
          /> */}
          <div>
            <p className="text-sm text-white">
              <span className="text-[rgba(100,116,139)]">
                Copyright © {date.getFullYear()}
              </span>{" "}
              ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
        {/* <div>
          <h6 className="text-white text-2xl font-bold">Application</h6>
          <p>Get our mobile application</p>
          <div className="w-[11%]">
            <img src={playStore} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
