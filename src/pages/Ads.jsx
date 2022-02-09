import React, { useState, useEffect } from "react";
import { SiGoogleadsense } from "react-icons/si";
import { useGoogleApi } from "react-gapi";
import { useNavigate } from "react-router-dom";
import reactImageSize from "react-image-size";

import { getUser, postAds } from "../function/api";
import AdsModel from "../components/Ads/AdsModel";

const Ads = () => {
  const [showModel, setShowModel] = useState(false);
  const [bSizeImg1, setBsizeImg1] = useState("");
  const [bSizeUrl1, setBsizeUrl1] = useState("");
  const [bSizeImg2, setBsizeImg2] = useState("");
  const [bSizeUrl2, setBsizeUrl2] = useState("");
  const [bannerImg, setBannerImg] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [sizeError, setSizeError] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const history = useNavigate();

  const accessToken = localStorage.getItem("admin_token");
  const userId = localStorage.getItem("admin_userId");

  const gapi = useGoogleApi({
    scopes: ["profile"],
  });

  const auth = gapi?.auth2.getAuthInstance();

  useEffect(() => {
    if (!auth?.isSignedIn.get()) {
      history("/login");
    }
  }, []);

  useEffect(() => {
    getUser(accessToken, userId).then((res) => {
      if (res.data.data && res.data.data.is_admin !== true) {
        history("/");
      }
    });
  });

  const handleClickOpen = () => {
    setShowModel(true);
  };
  const handleClose = () => {
    setShowModel(false);
  };

  const checkImageSize1 = () => {
    reactImageSize(bSizeImg1)
      .then(({ width, height }) => {
        if (width === 200 && height === 500) {
          setCheck1(true);
        } else {
          setCheck1(false);
        }
      })
      .catch((err) => console.log(err, "img size1 err"));
    setCheck1(true);
  };

  const checkImageSize2 = () => {
    reactImageSize(bSizeImg2)
      .then(({ width, height }) => {
        if (width === 200 && height === 500) {
          setCheck2(true);
        } else {
          setCheck2(false);
        }
      })
      .catch((err) => console.log(err, "img size1 err"));
    setCheck2(true);
  };

  const checkImageSize3 = () => {
    reactImageSize(bSizeImg2)
      .then(({ width, height }) => {
        if (width === 1000 && height === 150) {
          setCheck2(true);
        }
      })
      .catch((err) => console.log(err, "img size1 err"));
    setCheck3(true);
  };

  const handleCreateAds = () => {
    const form = new FormData();

    form.append("admin_id", userId);
    form.append("bsize1_image", bSizeImg1);
    form.append("bsize1_url", bSizeUrl1);
    form.append("bsize2_image", bSizeImg2);
    form.append("bsize2_url", bSizeUrl2);
    form.append("banner_image", bannerImg);
    form.append("banner_url", bannerUrl);

    postAds(accessToken, userId, form)
      .then((res) => {
        console.log(res, "success create ads");
      })
      .catch((err) => {
        console.log("fail create ads", err);
      });
  };
  return (
    <div className="p-10">
      <div className="flex items-center text-2xl font-semibold">
        <SiGoogleadsense className="mr-2" /> <h1>All Your Ads</h1>
      </div>

      <div className="float-right bg-green-500 text-white px-4 py-1 rounded-lg text-base mt-5">
        <button onClick={handleClickOpen}>Create Ads</button>
      </div>

      {showModel && (
        <AdsModel
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={showModel}
          sizeError={sizeError}
          bSizeImg1={bSizeImg1}
          setBsizeImg1={setBsizeImg1}
          bSizeUrl1={bSizeUrl1}
          setBsizeUrl1={setBsizeUrl1}
          bSizeImg2={bSizeImg2}
          setBsizeImg2={setBsizeImg2}
          bSizeUrl2={bSizeUrl2}
          setBsizeUrl2={setBsizeUrl2}
          bannerImg={bannerImg}
          setBannerImg={setBannerImg}
          bannerUrl={bannerUrl}
          setBannerUrl={setBannerUrl}
          handleCreateAds={handleCreateAds}
          checkImageSize1={checkImageSize1}
          checkImageSize2={checkImageSize2}
          checkImageSize3={checkImageSize3}
          check1={check1}
          check2={check2}
          check3={check3}
        />
      )}
    </div>
  );
};

export default Ads;
