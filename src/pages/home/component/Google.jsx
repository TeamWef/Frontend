import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import {
  GoogleOAuthProvider,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../../redux/modules/membersSlice";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../elem";

const Google = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      const { code } = res;
      dispatch(googleLogin({ code, navigate }));
    },
    flow: "auth-code",
  });

  // const onSuccess = (res) => {
  //   const { clientId, credential, select_by } = res;
  //   dispatch(googleLogin({ credential, navigate }));
  // };
  // const onFail = (res) => {
  //   console.log(res);
  // };
  // const logoutGoogle = (res) => {
  //   console.log(res);
  // };
  return (
    <>
      {/* <GoogleLogin
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFail}
      /> */}
      <Icon variant="google" onClick={() => login()} />
    </>
  );
};

export default Google;
