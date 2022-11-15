import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  __getSchedule,
  __getGroupSchedule,
} from "../../../redux/modules/scheduleSlice";

const ScheduleCard = () => {
  const seheduleList = useSelector((state) => state.schedule.schedule);
  console.log("!!!", seheduleList);
  const dispatch = useDispatch();
  const { partyId } = useParams();
  // console.log({ partyId });
  const navigate = useNavigate();
  // const scheduleId = seheduleList?.scheduleId;

  useEffect(() => {
    dispatch(__getSchedule({ partyId }));
    dispatch(__getGroupSchedule());
  }, [dispatch, partyId]);

  return (
    <div>
      {seheduleList?.map((data) => {
        return (
          <div scheduleId={data?.scheduleId}>
            <h4>{data?.scheduleId}</h4>
            <h2>{data?.title}</h2>
            <p>{data?.writer}</p>
            <button
              onClick={() => {
                navigate(`/sheduledetail/${data?.scheduleId}`);
              }}
            >
              상세보기
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleCard;
