import React from "react";

import { GoogleLogin } from "react-google-login";

const SocialAuth = ({
  showloginButton,
  clientId,
  onLoginSuccess,
  onLoginFailure,
}) => {
  return (
    <div className="flex justify-center items-center mt-40">
      {showloginButton ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign In"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          scope="https://www.googleapis.com/auth/drive"
        />
      ) : null}
    </div>
  );
};

export default SocialAuth;
