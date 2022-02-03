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
    <div className="flex justify-center items-center">
      {showloginButton ? (
        <>
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign In"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            scope="https://www.googleapis.com/auth/drive.file"
          />
        </>
      ) : null}
    </div>
  );
};

export default SocialAuth;
