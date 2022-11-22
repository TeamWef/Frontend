import React from "react";
import GroupCard from "./component/GroupCard";
import MainScheduleCard from "./component/MainScheduleCard";
import styled from "styled-components";
import { Header } from "./component/Header";

const Main = () => {
  return (
    <>
      <Header />

      <GroupCard />
      <MainScheduleCard />
    </>
  );
};

export default Main;
