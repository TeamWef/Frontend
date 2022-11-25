import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  __getSchedule,
  __getGroupSchedule,
} from "../../redux/modules/scheduleSlice";

const ScheduleMain = () => {
  const scheduleList = useSelector((state) => state.schedule?.schedule);
  console.log("!!!", scheduleList);
  const dispatch = useDispatch();
  const { partyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getSchedule({ partyId }));
    dispatch(__getGroupSchedule());
  }, [dispatch, partyId]);

  return (
    <div>
      <button
        onClick={() => {
          navigate(`/${partyId}/schedule/create`);
        }}
      >
        💖 일정 등록 🎈
      </button>
      {scheduleList?.map((data) => {
        return (
          <div key={data?.scheduleId}>
            <h2>{data?.title}</h2>
            <p>{data?.writer}</p>
            <button
              onClick={() => {
                navigate(`/${partyId}/scheduledetail/${data?.scheduleId}`);
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

export default ScheduleMain;
