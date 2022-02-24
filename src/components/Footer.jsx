import React from "react";
import { Link } from "react-router-dom";
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
        <div className="text-right">
          <span className="text-white text-sm">
            <Link to="/policy"> Privacy Policy</Link>
          </span>
        </div>
        <div className="text-right">
          <span className="text-white text-sm">
            <Link to="/terms"> Term & Conditions</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
