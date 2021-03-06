import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import { ImGoogleDrive } from "react-icons/im";
import { useGoogleApi } from "react-gapi";

import { formatBytes } from "../function/formatBytes";
import { getSingleData, postDownCount } from "../function/api";
import UserAuth from "../components/auth/UserAuth";
import Loading from "../components/Loading";
import AdsLayout from "../components/AdsLayout";

const AdsDynamic = () => {
  const params = useParams();
  const [showloginButton, setShowloginButton] = useState(true);
  const [limit, setLimit] = useState("");
  const [usage, setUsage] = useState("");
  const [data, setData] = useState({});
  const [percent, setPercent] = useState("");
  const [fileId, setFileId] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const [showSave, setShowSave] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [authState, setAuthState] = useState(false);
  const [showSpace, setShowSpace] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [useWeb, setUseWeb] = useState(false);
  const [limitExceed, setLimitExceed] = useState(false);
  const [error, setError] = useState(false);
  const [allAds, setAllAds] = useState({});

  const [counts, setCounts] = useState(1);

  const formatFree = formatBytes(limit - usage);
  const formatUsage = formatBytes(usage).toString();
  const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    getDataFromSlug();
  }, []);

  const getDataFromSlug = async () => {
    await getSingleData(params.name)
      .then((res) => {
        setData(res.data.drive);
        setAllAds(res.data.ads);
        setInterval(() => {
          setPageLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log("url data err", err);
      });
  };

  const calculatePercent = () => {
    let maxPercent = 100;

    const cal = Math.round((usage / limit) * maxPercent);
    setPercent(cal);
  };

  const onLoginSuccess = async (res) => {
    localStorage.setItem("admin_name", res.profileObj.name);
    localStorage.setItem("admin_email", res.profileObj.email);
    localStorage.setItem("admin_Gtoken", res.accessToken);

    setShowloginButton(false);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
    toast.error("Login failed");
  };

  const gapiDrive = useGoogleApi({
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ],
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const auth = gapiDrive?.auth2.getAuthInstance();

  //Get G Drive storage when mount
  const getDriveStorage = () => {
    if (auth?.isSignedIn.get()) {
      gapiDrive?.client?.drive.about
        .get({
          fields: "storageQuota",
        })
        .then(
          (response) => {
            // Handle the results here (response.result has the parsed body).
            setLimit(response.result.storageQuota.limit);
            setUsage(response.result.storageQuota.usage);
          },
          (err) => {
            console.error("Execute error", err);
          }
        );
    }
  };
  useEffect(() => {
    getDriveStorage();
    calculatePercent();
  }, [auth]);

  //------ Filter is mobile or not
  useEffect(() => {
    /* Storing user's device details in a variable*/
    let details = navigator.userAgent;

    /* Creating a regular expression 
     containing some mobile devices keywords 
     to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
     it returns boolean value*/
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      console.log("desktop");
    }
  }, []);

  //------ Create if not exist and Permission and Copy to Drive
  const saveToDrive = async () => {
    setSaveLoading(true);
    const folderMetadata = {
      name: "MetaMate Drive",
      mimeType: "application/vnd.google-apps.folder",
    };
    //Filter Folder
    gapiDrive?.client?.drive.files
      .list({
        q: "name='MetaMate Drive' and trashed=false",
        fields: "files(name,id)",
      })
      .then((res) => {
        let exists =
          res.result.files.filter((f) => {
            return f.name.toLowerCase() === folderMetadata.name.toLowerCase();
          }).length > 0;

        if (!exists) {
          console.log("not exist");
          // Create a Folder
          gapiDrive?.client?.drive.files
            .create({
              resource: folderMetadata,
              fields: "id",
            })
            .then((res) => {
              gapiDrive?.client?.drive.permissions
                .create({
                  role: "reader",
                  type: "anyone",
                  fileId: res.result.id,
                  fields: "*",
                })
                .then((res) => {
                  console.log(res, "permission");
                })
                .catch((err) => console.log("creating permission error", err));
              // Create a file in above folder
              const fileMetadata = {
                name: data.name,
                parents: [res.result.id],
                mimeType: data.mime_type,
              };

              gapiDrive?.client?.drive.files
                .copy({
                  resource: fileMetadata,
                  fileId: data.file_id,
                  fields: "id, webContentLink",
                })
                .then((res) => {
                  console.log("create file in folder", res);
                  setFileId(res.result.id);
                  setShowDownload(true);
                  setShowSave(false);
                  setSaveLoading(false);
                })
                .catch((err) => {
                  if (
                    err.result.error.errors[0].reason === "storageQuotaExceeded"
                  ) {
                    setLimitExceed(true);
                  }
                  setSaveLoading(false);

                  if (err.status === 404) {
                    setError(true);
                  } else {
                    setError(false);
                  }

                  console.log("create err file in folder", err);
                });
            })
            .catch((err) => console.log("create folder err", err));
        } else {
          console.log("folderId", res);
          // Create a file in above folder
          const fileMetadata = {
            name: data.name,
            parents: [res.result.files[0].id],
            mimeType: data.mime_type,
          };
          console.log("data Id", data.file_id);
          gapiDrive?.client?.drive.files
            .copy({
              resource: fileMetadata,
              fileId: data.file_id,
              fields: "id,webContentLink",
            })
            .then((res) => {
              setFileId(res.result.id);
              setShowDownload(true);
              setShowSave(false);
              setSaveLoading(false);
              console.log("create file in folder", res);
            })
            .catch((err) => {
              if (
                err.result.error.errors[0].reason === "storageQuotaExceeded"
              ) {
                setLimitExceed(true);
              }
              setSaveLoading(false);
              if (err.status === 404) {
                setError(true);
              } else {
                setError(false);
              }
              console.log("create err file in folder", err);
            });
        }
      })
      .catch((err) => console.log("filter err", err));
  };

  useEffect(() => {
    if (auth?.isSignedIn.get()) {
      setAuthState(true);
      setShowSpace(true);
      setShowloginButton(false);

      setInterval(() => {
        setLoading(false);
      }, 1500);
    } else {
      setAuthState(false);
      setShowSpace(false);
      setShowloginButton(true);

      setInterval(() => {
        setLoading(false);
      }, 1500);
    }
  }, [onLoginSuccess]);

  const countDownload = () => {
    setCounts(counts + 1);

    const parsedCount = parseInt(data?.down_count);
    const totals = counts + parsedCount;
    const form = new FormData();

    form.append("down_count", totals);

    postDownCount(form, data.id)
      .then((res) => {
        console.log("success downcount", res);
      })
      .catch((err) => console.log("post downcount error", err));
  };

  const openApp = () => {
    // var now = new Date().valueOf();
    // setTimeout(function () {
    //   if (new Date().valueOf() - now > 100) return;
    // }, 25);
    const isApp = "meta-mate://";
    if (isApp) {
      window.location = `meta-mate://app/slug/${data.slug}`;
    } else {
      window.location = "https://play.google.com/store/apps";
    }
  };

  return (
    <AdsLayout>
      <div className="flex justify-between gap-4 min-h-screen md:mt-14  bg-white pt-[30px] md:pt-0 pb-[10px] px-[27px]">
        {pageLoading ? (
          <div className="mt-[70px] w-[7%]">
            <Loading />
          </div>
        ) : (
          <>
            <div className={`${isMobile ? "hidden" : "block"}`}>
              <a href={allAds && allAds.leftside_redirect_url}>
                <img
                  className="m-auto w-full"
                  src={allAds && allAds.leftside_image}
                />
              </a>
            </div>
            <div className="md:col-span-2 md:w-[52%] col-span-1">
              <div className=" gap-4">
                <div className="bg-[#f0ce60] rounded-md px-4 py-5 row-span-2 col-span-2">
                  <h1 className="font-semibold md:text-xl text-base text-white pb-4 break-all">
                    {data?.name}
                  </h1>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:w-[78%] m-auto">
                    <div className="mr-2 px-1 py-1 text-yellow-400 bg-red-500 font-bold text-xs text-center md:text-sm rounded-md">
                      {data?.file_size}
                    </div>
                    <div className="mr-2 px-1 py-1 text-yellow-400 bg-blue-800 font-bold text-xs text-center md:text-sm rounded-md">
                      {data?.mme_type === null ? "null" : data?.mime_type}
                    </div>
                    <div className="mr-2 px-1 py-1 text-yellow-400 bg-purple-800 font-bold text-xs text-center md:text-sm rounded-md">
                      {data?.down_count} Downloads
                    </div>
                  </div>
                  {
                    isMobile ? (
                      <>
                        {useWeb ? (
                          ""
                        ) : (
                          <>
                            <button
                              onClick={saveToDrive}
                              className="bg-green-500 text-white rounded-md px-6 py-1 font-bold mt-16 mb-2 flex items-center m-auto"
                            >
                              <span onClick={openApp}>Download with App</span>
                            </button>
                            <button
                              onClick={() => setUseWeb(true)}
                              className="bg-green-500 text-white rounded-md px-6 py-1 font-bold my-4 md:my-6 flex items-center m-auto"
                            >
                              <span>Download from Web</span>
                            </button>
                          </>
                        )}
                        {useWeb ? (
                          loading ? (
                            <div className="w-[10%] m-auto">
                              <Loading />
                            </div>
                          ) : authState ? (
                            <>
                              {showSave ? (
                                <>
                                  <button
                                    onClick={saveToDrive}
                                    className="bg-green-500 text-white rounded-md px-6 py-2 font-bold md:mt-16 mt-20 mb-2 flex items-center m-auto"
                                  >
                                    <ImGoogleDrive className="mr-2" />
                                    <span>
                                      {saveLoading
                                        ? "Loading"
                                        : "Save to Google Drive"}
                                    </span>
                                  </button>
                                  <p className="md:text-center font-bold text-xs text-white mb-3">
                                    Save this file to your google drive account
                                    to download
                                  </p>
                                </>
                              ) : (
                                <UserAuth
                                  showloginButton={showloginButton}
                                  clientId={clientId}
                                  onLoginSuccess={onLoginSuccess}
                                  onLoginFailure={onLoginFailure}
                                />
                              )}

                              {showDownload ? (
                                <a
                                  href={`https://drive.google.com/uc?id=${fileId}`}
                                  onClick={countDownload}
                                  target="_blank"
                                  className="bg-blue-500 text-white rounded-md px-14 w-fit py-1 font-bold mt-20 mb-2 flex items-center m-auto"
                                >
                                  <AiOutlineDownload className="mr-2" />{" "}
                                  Download Now
                                </a>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            <UserAuth
                              showloginButton={showloginButton}
                              clientId={clientId}
                              onLoginSuccess={onLoginSuccess}
                              onLoginFailure={onLoginFailure}
                            />
                          )
                        ) : (
                          ""
                        )}
                      </>
                    ) : loading ? (
                      <div className="w-[10%] m-auto">
                        <Loading />
                      </div>
                    ) : authState ? (
                      <>
                        {showSave ? (
                          <>
                            <button
                              onClick={saveToDrive}
                              className="bg-green-500 text-white rounded-md px-8 py-2 font-bold md:mt-16 mb-2 flex items-center m-auto"
                            >
                              <ImGoogleDrive className="mr-2" />
                              <span>
                                {saveLoading
                                  ? "Loading"
                                  : "Save to Google Drive"}
                              </span>
                            </button>
                            <p className="md:text-center font-bold text-xs text-white mb-3">
                              Save this file to your google drive account to
                              download
                            </p>
                          </>
                        ) : (
                          ""
                        )}

                        {showDownload ? (
                          <a
                            href={`https://drive.google.com/uc?id=${fileId}`}
                            onClick={countDownload}
                            target="_blank"
                            className="bg-blue-500 text-white rounded-md px-16 w-fit py-1 mt-20 font-bold my-6 flex items-center m-auto"
                          >
                            <AiOutlineDownload className="mr-2" /> Download Now
                          </a>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <UserAuth
                        showloginButton={showloginButton}
                        clientId={clientId}
                        onLoginSuccess={onLoginSuccess}
                        onLoginFailure={onLoginFailure}
                      />
                    )

                    //
                  }
                  {limitExceed ? (
                    <p className="text-red-600 text-center text-xs">
                      Not enough space to save in your Google drive. <br />{" "}
                      Please delete some file and reload the page.
                    </p>
                  ) : (
                    ""
                  )}
                  {error ? (
                    <p className="text-red-600 text-center text-xs">
                      File not found from uploader.
                    </p>
                  ) : (
                    ""
                  )}
                  {showSpace && (
                    <>
                      <div className="border-t border-b border-gray-400">
                        <span className="px-4 text-xs md:text-sm">
                          Free space: {formatFree}
                        </span>
                        <div className="relative pt-1 px-4">
                          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
                            <div
                              style={{ width: `${percent}%` }}
                              className="shadow-none flex font-semibold flex-col text-center whitespace-nowrap text-black justify-center bg-blue-500"
                            >
                              {formatUsage}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="md:text-sm text-xs p-2">
                        If your drive is full,{" "}
                        <a
                          href="https://drive.google.com"
                          target="_blank"
                          className="text-blue-600"
                        >
                          click here{" "}
                        </a>
                        to go to your google drive and delete some files.
                      </p>
                    </>
                  )}
                </div>
                <div className="md:mt-10 mt-5 md:w-full">
                  <a href={allAds && allAds.banner_redirect_url}>
                    <img src={allAds && allAds.banner_image} />
                  </a>
                </div>
              </div>
            </div>
            <div className={`${isMobile ? "hidden" : "block"}`}>
              <a href={allAds && allAds.rightside_redirect_url}>
                <img
                  className="m-auto"
                  src={allAds && allAds.rightside_image}
                />
              </a>
            </div>
          </>
        )}
      </div>
    </AdsLayout>
  );
};

export default AdsDynamic;
