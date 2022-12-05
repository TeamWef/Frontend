import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import GroupTitle from "../../components/GroupTitle";
import { Div, Svg } from "../../elem";
import {
  __getSchedule,
  __getGroupSchedule,
} from "../../redux/modules/scheduleSlice";

const ScheduleMain = () => {
  const scheduleList = useSelector((state) => state.schedule?.schedule);

  const dispatch = useDispatch();
  const { partyId } = useParams();
  console.log({ partyId });
  const navigate = useNavigate();
  // const scheduleId = seheduleList?.scheduleId;

  useEffect(() => {
    dispatch(__getSchedule({ partyId }));
    dispatch(__getGroupSchedule());
  }, [dispatch, partyId]);

  return (
    <Div variant="bodyContainer">
      <GroupTitle />
      <StItemDiv>
        <h2>Schedule.</h2>
        <button
          onClick={() => {
            navigate(`/${partyId}/schedule/create`);
          }}
        >
          <Svg variant="add" />
        </button>
      </StItemDiv>
      {scheduleList?.map((data) => {
        return (
          <StDiv key={data?.scheduleId}>
            <StFlexDiv>
              <StItemDiv>
                <StTitleDiv>
                  <h4>{data?.partyName}</h4>
                </StTitleDiv>
                <p>{data?.title}</p>
                <p>{data?.writer}</p>
              </StItemDiv>
              <StbtnDiv
                onClick={() => {
                  navigate(`/${partyId}/scheduledetail/${data?.scheduleId}`);
                }}
              >
                <Svg variant={"more"} />
              </StbtnDiv>
            </StFlexDiv>
          </StDiv>
        );
      })}
    </Div>
  );
};

export default ScheduleMain;

const StDiv = styled.div`
  width: 1075px;
  height: 75px;
  border-bottom: 1px solid #d9d3c7;
`;

const StFlexDiv = styled.div`
  display: flex;
`;

const StItemDiv = styled.div`
  width: 1075px;
  display: flex;
  justify-content: space-between;
  & p {
    margin-top: 28px;
    margin-left: 30px;
    color: #b5b3af;
  }
  & button {
    border: none;
    background-color: transparent;
  }
`;

const StTitleDiv = styled.div`
  width: 160px;
  height: 35px;
  background-color: #ede8e1;
  color: #a4a19d;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const StbtnDiv = styled.div`
  width: 50px;
  height: 30px;
  margin-top: 26px;
  margin-left: 26px;
  border-radius: 5px;
  border: none;
`;
