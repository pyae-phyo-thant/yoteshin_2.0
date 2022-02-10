import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: 30,
    width: 600,
  },
  "& .MuiDialogActions-root": {
    padding: 30,
    width: 600,
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} className="w-full">
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const AdsCreateModel = ({
  open,
  handleClose,
  sizeError,
  bSizeImg1,
  setBsizeImg1,
  bSizeUrl1,
  setBsizeUrl1,
  bSizeImg2,
  setBsizeImg2,
  bSizeUrl2,
  setBsizeUrl2,
  bannerImg,
  setBannerImg,
  bannerUrl,
  setBannerUrl,
  checkImageSize1,
  checkImageSize2,
  checkImageSize3,
  check1,
  check2,
  check3,
  handleCreateAds,
}) => {
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Update your Ads
        </BootstrapDialogTitle>
        <h6 className="text-base pl-4">For Leftside Ad</h6>
        <input
          className="text-base mx-4  rounded-md px-4 py-1 border border-green-400"
          type="text"
          placeholder="Your Ads Image Url"
          value={bSizeImg1}
          onChange={(e) => setBsizeImg1(e.target.value)}
        />
        {check1 ? (
          <span className="text-green-500 text-sm text-left ml-4">Pass</span>
        ) : (
          <span className="text-red-500 text-sm text-left ml-4">
            (please upload 200 * 500 size)
          </span>
        )}
        <span
          className="mb-3 text-right pr-5 cursor-pointer"
          onClick={checkImageSize1}
        >
          Check Image
        </span>
        <input
          className="text-base mx-4 rounded-md px-4 py-1 border border-green-400"
          type="text"
          placeholder="Your Ads Owner App Url"
          value={bSizeUrl1}
          onChange={(e) => setBsizeUrl1(e.target.value)}
        />
        <h6 className="text-base pl-4 mt-2">For Rightside Ad</h6>
        <input
          className="text-base mx-4 rounded-md px-4 py-1 border border-green-400"
          type="text"
          placeholder="Your Ads Image Url"
          value={bSizeImg2}
          onChange={(e) => setBsizeImg2(e.target.value)}
        />
        {check2 ? (
          <span className="text-green-500 text-sm text-left ml-4">Pass</span>
        ) : (
          <span className="text-red-500 text-sm text-left ml-4">
            (please upload 200 * 500 size)
          </span>
        )}
        <span
          className="mb-3 text-right pr-5 cursor-pointer"
          onClick={checkImageSize2}
        >
          Check Image
        </span>
        <input
          className="text-base mx-4 rounded-md px-4 py-1 border border-green-400"
          type="text"
          placeholder="Your Ads Owner App Url"
          value={bSizeUrl2}
          onChange={(e) => setBsizeUrl2(e.target.value)}
        />
        <h6 className="text-base pl-4 mt-2">For Bottom Ad</h6>
        <input
          className="text-base mx-4 rounded-md px-4 py-1 border border-green-400"
          type="text"
          placeholder="Your Ads Image Url"
          value={bannerImg}
          onChange={(e) => setBannerImg(e.target.value)}
        />
        {check3 ? (
          <span className="text-green-500 text-sm text-left ml-4">Pass</span>
        ) : (
          <span className="text-red-500 text-sm text-left ml-4">
            (please upload 1000 * 150 size)
          </span>
        )}
        <span
          className="mb-3 text-right pr-5 cursor-pointer"
          onClick={checkImageSize3}
        >
          Check Image
        </span>
        <input
          className="text-base mx-4 rounded-md px-4 py-1 border border-green-400"
          type="text"
          placeholder="Your Ads Owner App Url"
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
        />
        {sizeError && (
          <p className="text-sm text-red-600">Please Check your image size.</p>
        )}
        <br />
        {/* <input type="text" placeholder="Your Ads Owner Url" value={bSize1} onChange={(e) => setBsize1(e.target.value)} /> */}
        <DialogActions>
          <Button autoFocus onClick={handleCreateAds}>
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default AdsCreateModel;
