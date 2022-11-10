// 컴포넌트들이 모여있는 곳

import ScheduleCard from "./component/ScheduleCard";
import ScheduleCreate from "./component/ScheduleCreate";

const ScheduleMain = () => {
  return (
    <>
      <ScheduleCreate />
      <ScheduleCard />
    </>
  );
};

export default ScheduleMain;
