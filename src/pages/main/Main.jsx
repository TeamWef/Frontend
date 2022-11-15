import React from "react";
import GroupCard from "./component/GroupCard";
import MainScheduleCard from "./component/MainScheduleCard";
import CreateGroupCard from "./component/CreateGroupCard";
import Mypage from "../mypage/Mypage";

const Main = () => {
  return (
    <div>
      <Mypage />
      <CreateGroupCard />
      <GroupCard />
      <MainScheduleCard />
    </div>
  );
};

export default Main;
