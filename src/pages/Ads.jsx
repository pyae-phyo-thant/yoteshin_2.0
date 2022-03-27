import React, { useState, useEffect } from "react";
import { SiGoogleadsense } from "react-icons/si";
import { useGoogleApi } from "react-gapi";
import { useNavigate } from "react-router-dom";
import reactImageSize from "react-image-size";
import { toast } from "react-toastify";

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
      // if (res.data && res.data.is_admin !== true) {
      //   history("/");
      // }
    });
  });

  const handleClickOpen = () => {
    setShowModel(true);
    setBsizeImg1(allAds && allAds.leftside_image ? allAds.leftside_image : "");
    setBsizeUrl1(
      allAds && allAds.leftside_redirect_url ? allAds.leftside_redirect_url : ""
    );
    setBsizeImg2(
      allAds && allAds.rightside_image ? allAds.rightside_image : ""
    );
    setBsizeUrl2(
      allAds && allAds.rightside_redirect_url
        ? allAds.rightside_redirect_url
        : ""
    );
    setBannerImg(allAds && allAds.banner_image ? allAds.banner_image : "");
    setBannerUrl(
      allAds && allAds.banner_redirect_url ? allAds.banner_redirect_url : ""
    );
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

    form.append("leftside_image", bSizeImg1);
    form.append("leftside_redirect_url", bSizeUrl1);
    form.append("rightside_image", bSizeImg2);
    form.append("rightside_redirect_url", bSizeUrl2);
    form.append("banner_image", bannerImg);
    form.append("banner_redirect_url", bannerUrl);

    if (check1 === false && !bSizeImg1) {
      alert("Please check Leftside Ad image");
    } else if (check2 === false && bSizeImg2) {
      alert("Please check Rightside Ad image");
    } else if (check3 === false && bannerImg) {
      alert("Please check Bottom Ad image");
    } else {
      postAds(accessToken, form)
        .then((res) => {
          setShowModel(false);
          toast.success("Successfully created.");
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

    params.append("leftside_image", bSizeImg1);
    params.append("leftside_redirect_url", bSizeUrl1);
    params.append("rightside_image", bSizeImg2);
    params.append("rightside_redirect_url", bSizeUrl2);
    params.append("banner_image", bannerImg);
    params.append("banner_redirect_url", bannerUrl);

    if (check1 === false && !bSizeImg1) {
      alert("Please check Leftside Ad image");
    } else if (check2 === false && !bSizeImg2) {
      alert("Please check Rightside Ad image");
    } else if (check3 === false && bannerImg) {
      alert("Please check Bottom Ad image");
    } else {
      updateAds(accessToken, allAds.id, params)
        .then((res) => {
          setShowModel(false);
          console.log(res, "success update ads");
          getAdsApi();
        })
        .catch((err) => {
          console.log("fail create ads", err);
        });
    }
  };

  const getAdsApi = () => {
    setLoading(true);
    getAds(accessToken)
      .then((res) => {
        setAllAds(res.data);
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
          <div className="grid grid-cols-4 gap-4 my-4 glass-ads py-2">
            <div className="w-[30%] m-auto">
              {allAds && allAds.leftside_image ? (
                <img src={allAds.leftside_image} />
              ) : (
                "No Ad Added in this part."
              )}
            </div>
            <div className="col-span-2">
              <span>Ads Image Url</span>
              <p className="bg-[#f0ce60] px-3 py-1 mt-1 text-green-500 rounded-md">
                {allAds && allAds.leftside_image
                  ? allAds.leftside_image
                  : "No Ad Added in this part."}
              </p>
            </div>
            <div>
              <span>Redirect Url</span>
              <p className="bg-[#f0ce60] px-3 py-1 mt-1 text-green-500 rounded-md">
                {allAds && allAds.leftside_redirect_url
                  ? allAds.leftside_redirect_url
                  : "No Ad Added in this part."}
              </p>
            </div>
          </div>
          {/* ---------- Right */}
          <h6 className="text-xl font-semibold">Rightside Ad</h6>
          <div className="grid grid-cols-4 gap-4 my-4 glass-ads py-2">
            <div className="w-[30%] m-auto">
              {allAds && allAds.rightside_image ? (
                <img src={allAds.rightside_image} />
              ) : (
                "No Ad Added in this part."
              )}
            </div>
            <div className="col-span-2">
              <span>Ads Image Url</span>
              <p className="bg-[#f0ce60] px-3 py-1 mt-1 text-green-500 rounded-md">
                {allAds && allAds.rightside_image
                  ? allAds.rightside_image
                  : "No Ad Added in this part."}
              </p>
            </div>
            <div>
              <span>Redirect Url</span>
              <p className="bg-[#f0ce60] px-3 py-1 mt-1 text-green-500 rounded-md">
                {allAds && allAds.rightside_redirect_url
                  ? allAds.rightside_redirect_url
                  : "No Ad Added in this part."}
              </p>
            </div>
          </div>
          {/* ---------- Bottom */}
          <h6 className="text-xl font-semibold">Bottom Ad</h6>
          <div className="grid grid-cols-4 gap-4 my-4 glass-ads py-2">
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
                {allAds && allAds.banner_redirect_url
                  ? allAds.banner_redirect_url
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
