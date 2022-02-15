import React from "react";

import { GoogleLogin } from "react-google-login";

const UserAuth = ({
  showloginButton,
  clientId,
  onLoginSuccess,
  onLoginFailure,
}) => {
  return (
    <>
      {showloginButton ? (
        <div className="text-center md:mt-20 mt-15">
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            scope="profile https://www.googleapis.com/auth/drive"
            className="font-bold"
          />
        </div>
      ) : null}
    </>
  );
};

export default UserAuth;
