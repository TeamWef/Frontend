import React from "react";
import GroupCard from "./component/GroupCard";
import ScheduleCard from "./component/ScheduleCard";
import CreateGroupCard from "./component/CreateGroupCard";

const Main = () => {
  return (
    <div>
      <CreateGroupCard />
      <GroupCard />
      <ScheduleCard />
    </div>
  );
};

export default Main;
