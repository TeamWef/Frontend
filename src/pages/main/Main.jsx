import React from "react";
import GroupCard from "./component/GroupCard";
import MainScheduleCard from "./component/MainScheduleCard";

import Mypage from "../mypage/Mypage";
import styled from "styled-components";
import { Header } from "./component/Header";

const Main = () => {
  return (
    <>
      <Header />
      <Mypage />
      <h2>Group.</h2>
      <GroupCard />
      {/* <h2>Schedule.</h2>
      <MainScheduleCard /> */}
    </>
  );
};

export default Main;
