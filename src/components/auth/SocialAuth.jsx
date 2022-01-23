import React from "react";

import { GoogleLogin, GoogleLogout } from "react-google-login";

const SocialAuth = ({
  showloginButton,
  clientId,
  onLoginSuccess,
  onLoginFailure,
  onSignoutSuccess,
  showlogoutButton,
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
        />
      ) : null}
    </div>
  );
};

export default SocialAuth;
