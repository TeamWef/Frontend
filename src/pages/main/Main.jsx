import React from "react";
import GroupCard from "./component/GroupCard";
import MainScheduleCard from "./component/MainScheduleCard";
import CreateGroupCard from "./component/CreateGroupCard";

const Main = () => {
  return (
    <div>
      <CreateGroupCard />
      <GroupCard />
      <MainScheduleCard />
    </div>
  );
};

export default Main;
