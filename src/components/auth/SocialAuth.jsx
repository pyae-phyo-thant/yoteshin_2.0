import React from "react";

import { GoogleLogin } from "react-google-login";

const SocialAuth = ({
  showloginButton,
  clientId,
  onLoginSuccess,
  onLoginFailure,
}) => {
  // const gapiDrive = useGoogleApi({
  //   discoveryDocs: [
  //     "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  //   ],
  //   scopes: [
  //     "https://www.googleapis.com/auth/drive.metadata.readonly",
  //     "https://www.googleapis.com/auth/drive.file",
  //   ],
  // });
  return (
    <div className="absolute top-0 w-full bg-[rgba(30,41,59)] bg-cover bg-no-repeat bg-full bg-Image">
      <div className="container mx-auto h-full px-4">
        <div className="flex items-center content-center justify-center min-h-screen">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg border-0 bg-[rgba(226,232,240)]">
              <div className="rounded-t mb-0 px-6 py-6 text-center">
                <div className="text-center mb-3">
                  <h6 className="text-sm font-bold text-[rgba(100,116,139)]">
                    Sign in with
                  </h6>
                </div>
                {showloginButton ? (
                  <>
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="GOOGLE"
                      onSuccess={onLoginSuccess}
                      onFailure={onLoginFailure}
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={true}
                      scope="profile email https://www.googleapis.com/auth/drive"
                      className="font-bold"
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAuth;
