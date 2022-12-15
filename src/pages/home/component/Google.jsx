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
import { Div, Icon, Span } from "../../../elem";
import { useEffect } from "react";

const Google = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(googleLogin({ code, navigate }));
  }, []);

  const login = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
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
    <Div variant="bodyContainer">
      {/* <GoogleLogin
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFail}
      /> */}
      <Span>Google Login...</Span>
    </Div>
  );
};

export default Google;
