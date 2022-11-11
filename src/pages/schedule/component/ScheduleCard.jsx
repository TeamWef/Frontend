import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ScheduleCard = () => {
  const seheduleList = useSelector((state) => state);
  console.log(seheduleList);
  const dispatch = useDispatch();
  return <div>ScheduleCard</div>;
};

export default ScheduleCard;
