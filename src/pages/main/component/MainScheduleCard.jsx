import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getGroupSchedule } from "../../../redux/modules/scheduleSlice";

const ScheduleCard = () => {
  const data = useSelector((state) => state.schedule.groupSchedule.data);
  console.log("메인 스케쥴 카드=>", data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getGroupSchedule());
  }, [dispatch]);

  return (
    <div>
      <br />
      <hr />
      <br />
      {data?.map((item) => {
        return (
          <div key={item.scheduleId}>
            <h2>💖{item?.partyName}🥳</h2>
            <p>{item?.title}</p>
            <p>{item?.writer}</p>
            <button
              onClick={() => {
                navigate(`/sheduledetail/${item.scheduleId}`);
              }}
            >
              바로가기
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleCard;
