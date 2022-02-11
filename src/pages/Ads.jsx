import React, { useState, useEffect } from "react";
import { SiGoogleadsense } from "react-icons/si";
import { useGoogleApi } from "react-gapi";
import { useNavigate } from "react-router-dom";
import reactImageSize from "react-image-size";

import { getAds, getUser, postAds, updateAds } from "../function/api";
import AdsUpdateModel from "../components/Ads/AdsUpdateModel";
import Loading from "../components/Loading";
import AdsCreateModel from "../components/Ads/AdsCreateModel";

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
  const [allAds, setAllAds] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (!accessToken) {
      alert("Your don't have accessToken please Login Again!");
      history("/login");
    }
  }, [auth]);

  useEffect(() => {
    getUser(accessToken, userId).then((res) => {
      if (res.data.data && res.data.data.is_admin !== true) {
        history("/");
      }
    });
  });

  const handleClickOpen = () => {
    setShowModel(true);
    setBsizeImg1(allAds && allAds.bsize1_image ? allAds.bsize1_image : "");
    setBsizeUrl1(allAds && allAds.bsize1_url ? allAds.bsize1_url : "");
    setBsizeImg2(allAds && allAds.bsize2_image ? allAds.bsize2_image : "");
    setBsizeUrl2(allAds && allAds.bsize2_url ? allAds.bsize2_url : "");
    setBannerImg(allAds && allAds.banner_image ? allAds.banner_image : "");
    setBannerUrl(allAds && allAds.banner_url ? allAds.banner_url : "");
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
      .catch((err) => {
        setCheck1(false);
        console.log(err, "img size1 err");
      });
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
      .catch((err) => setCheck2(false));
  };

  const checkImageSize3 = () => {
    reactImageSize(bannerImg)
      .then(({ width, height }) => {
        if (width === 1000 && height === 150) {
          setCheck3(true);
        } else {
          setCheck3(false);
        }
      })
      .catch((err) => setCheck3(false));
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

    if (check1 === false) {
      alert("Please check Leftside Ad image");
    } else if (check2 === false) {
      alert("Please check Rightside Ad image");
    } else if (check3 === false) {
      alert("Please check Bottom Ad image");
    } else {
      postAds(accessToken, userId, form)
        .then((res) => {
          console.log(res, "success create ads");
        })
        .catch((err) => {
          console.log("fail create ads", err);
        });
    }
  };
  const handleUpdateAds = () => {
    // const form = new FormData();
    const params = new URLSearchParams();

    params.append("id", allAds.id);
    params.append("bsize1_image", bSizeImg1);
    params.append("bsize1_url", bSizeUrl1);
    params.append("bsize2_image", bSizeImg2);
    params.append("bsize2_url", bSizeUrl2);
    params.append("banner_image", bannerImg);
    params.append("banner_url", bannerUrl);

    if (check1 === false) {
      alert("Please check Leftside Ad image");
    } else if (check2 === false) {
      alert("Please check Rightside Ad image");
    } else if (check3 === false) {
      alert("Please check Bottom Ad image");
    } else {
      updateAds(accessToken, userId, params)
        .then((res) => {
          console.log(res, "success update ads");
          setAllAds(res.data.data);
        })
        .catch((err) => {
          console.log("fail create ads", err);
        });
    }
  };

  const getAdsApi = () => {
    setLoading(true);
    getAds(userId)
      .then((res) => {
        setAllAds(res.data.data);
        setInterval(() => {
          setLoading(false);
        }, 1000);
        console.log(res, "get ads");
      })
      .catch((err) => console.log(err, "get ads err"));
  };
  useEffect(() => {
    getAdsApi();
  }, []);

  return (
    <div className="p-10">
      <div className="flex items-center text-2xl font-semibold">
        <SiGoogleadsense className="mr-2" /> <h1>All Your Ads</h1>
      </div>

      <div className="float-right bg-green-500 text-white px-4 py-1 rounded-lg text-base mt-5">
        <button onClick={handleClickOpen}>
          {allAds ? "Update Ads" : "Create Ads"}
        </button>
      </div>

      {loading ? (
        <Loading width={"w-[8%] m-auto md:mt-40"} />
      ) : (
        <div className="bg-white rounded-md px-4 py-4 mt-16">
          <h6 className="text-xl font-semibold">Leftside Ad</h6>
          <div className="grid grid-cols-4 gap-4 my-4">
            <div className="w-[30%] m-auto">
              {allAds && allAds.bsize1_image ? (
                <img src={allAds.bsize1_image} />
              ) : (
                "No Ad Added in this part."
              )}
            </div>
            <div className="col-span-2">
              <span>Ads Image Url</span>
              <p className="bg-[#f0ce60] px-3 py-1 mt-1 text-green-500 rounded-md">
                {allAds && allAds.bsize1_image
                  ? allAds.bsize1_image
                  : "No Ad Added in this part."}
              </p>
            </div>
            <div>
              <span>Redirect Url</span>
              <p className="bg-[#f0ce60] px-3 py-1 mt-1 text-green-500 rounded-md">
                {allAds && allAds.bsize1_url
                  ? allAds.bsize1_url
                  : "No Ad Added in this part."}
              </p>
            </div>
          </div>
          {/* ---------- Right */}
          <h6 className="text-xl font-semibold">Rightside Ad</h6>
          <div className="grid grid-cols-4 gap-4 my-4">
            <div className="w-[30%] m-auto">
              {allAds && allAds.bsize2_image ? (
                <img src={allAds.bsize2_image} />
              ) : (
                "No Ad Added in this part."
              )}
            </div>
            <div className="col-span-2">
              <span>Ads Image Url</span>
              <p className="bg-[#f0ce60] px-3 py-1 mt-1 text-green-500 rounded-md">
                {allAds && allAds.bsize2_image
                  ? allAds.bsize2_image
                  : "No Ad Added in this part."}
              </p>
            </div>
            <div>
              <span>Redirect Url</span>
              <p className="bg-[#f0ce60] px-3 py-1 mt-1 text-green-500 rounded-md">
                {allAds && allAds.bsize2_url
                  ? allAds.bsize2_url
                  : "No Ad Added in this part."}
              </p>
            </div>
          </div>
          {/* ---------- Bottom */}
          <h6 className="text-xl font-semibold">Bottom Ad</h6>
          <div className="grid grid-cols-4 gap-4 my-4">
            <div className="m-auto">
              {allAds && allAds.banner_image ? (
                <img src={allAds.banner_image} />
              ) : (
                "No Ad Added in this part."
              )}
            </div>
            <div className="col-span-2">
              <span>Ads Image Url</span>
              <p className="bg-[#f0ce60] px-3 py-1 mt-1 text-green-500 rounded-md">
                {allAds && allAds.banner_image
                  ? allAds.banner_image
                  : "No Ad Added in this part."}
              </p>
            </div>
            <div>
              <span>Redirect Url</span>
              <p className="bg-[#f0ce60] px-3 py-1 mt-1 text-green-500 rounded-md">
                {allAds && allAds.banner_url
                  ? allAds.banner_url
                  : "No Ad Added in this part."}
              </p>
            </div>
          </div>
        </div>
      )}

      {showModel &&
        (allAds ? (
          <AdsUpdateModel
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
            handleUpdateAds={handleUpdateAds}
            checkImageSize1={checkImageSize1}
            checkImageSize2={checkImageSize2}
            checkImageSize3={checkImageSize3}
            check1={check1}
            check2={check2}
            check3={check3}
          />
        ) : (
          <AdsCreateModel
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
        ))}
    </div>
  );
};

export default Ads;
