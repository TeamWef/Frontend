import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import GroupTitle from "../../components/GroupTitle";
import { Div, Svg, Flex, Span } from "../../elem";
import {
  __getSchedule,
  __getGroupSchedule,
} from "../../redux/modules/scheduleSlice";

const ScheduleMain = () => {
  const scheduleList = useSelector((state) => state.schedule?.schedule);
  const dispatch = useDispatch();
  const { partyId } = useParams();
  const navigate = useNavigate();

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
            <Flex fd="row" asg="center">
              <Flex fd="row" asg="center" margin="0px 0px 0px 0px">
                <StScheduleItemDiv>
                  <StTitleDiv>
                    <h4>{data?.partyName}</h4>
                  </StTitleDiv>
                  <p>{data?.title}</p>
                  <StTextDiv>
                    <Span variant="other" asf="center">
                      {data?.writer}
                    </Span>
                  </StTextDiv>
                </StScheduleItemDiv>
              </Flex>
              <StbtnDiv
                onClick={() => {
                  navigate(`/${partyId}/scheduledetail/${data?.scheduleId}`);
                }}
              >
                <Svg variant={"more"} />
              </StbtnDiv>
            </Flex>
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d9d3c7;
`;

const StItemDiv = styled.div`
  width: 1060px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 30px;
  justify-content: space-between;
  & button {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
`;

const StScheduleItemDiv = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  justify-content: space-between;
  & p {
    width: 250px;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: #b5b3af;
  }
`;

const StTitleDiv = styled.div`
  width: 160px;
  height: 35px;
  background-color: #ede8e1;
  color: #a4a19d;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const StbtnDiv = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 15px;
  margin-left: 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const StTextDiv = styled.div`
  width: 70px;
  text-align: center;
  color: #b5b3af;
`;
