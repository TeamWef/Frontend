import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "../../../redux/modules/membersSlice";

const Kakao = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");
  // console.log(code);

  useEffect(() => {
    dispatch(kakaoLogin({ code, navigate }));
  }, []);
  return <div>KaKao Login ...</div>;
};

export default Kakao;
