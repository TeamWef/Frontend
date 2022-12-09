import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import GroupTitle from "../../components/GroupTitle";
import { Div, Svg, Flex, Span, Button } from "../../elem";
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
    <Div variant="bodyContainer" jc="flex-start" mh="800px">
      <GroupTitle />
      <StItemDiv>
        <h2>Schedule.</h2>
        <Button
          variant="border-small"
          onClick={() => {
            navigate(`/${partyId}/schedule/create`);
          }}
        >
          일정 만들기
        </Button>
      </StItemDiv>
      {scheduleList?.map((data) => {
        return (
          <StDiv
            key={data?.scheduleId}
            onClick={() => {
              navigate(`/${partyId}/scheduledetail/${data?.scheduleId}`);
            }}
          >
            <Flex fd="row" asg="center">
              <Flex fd="row" asg="center">
                <StScheduleItemDiv>
                  <StTitleDiv>
                    <Span
                      variant="small"
                      fw="600"
                      color="#535353"
                      of="hidden"
                      to="ellipsis"
                      wb="break-all"
                    >
                      {data?.partyName}
                    </Span>
                  </StTitleDiv>

                  <p>{data?.title}</p>

                  <StTextDiv>
                    <Span variant="small" asf="center" fw="400" color="#535353">
                      {data?.writer}
                    </Span>
                  </StTextDiv>
                </StScheduleItemDiv>
              </Flex>
              <StbtnDiv>
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

const StDiv = styled.button`
  width: 1050px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid #d9d3c7;
  margin-bottom: 20px;
  cursor: pointer;
  white-space: nowrap;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

const StItemDiv = styled.div`
  width: 1050px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
  justify-content: space-between;
`;

const StScheduleItemDiv = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  & p {
    width: 400px;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: #535353;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StTitleDiv = styled.div`
  width: 160px;
  height: 35px;
  background-color: #ede8e1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  white-space: nowrap;
`;

const StContentDiv = styled.div`
  width: 160px;
  display: block;
  white-space: nowrap;
`;

const StbtnDiv = styled.div`
  width: 100%;
  height: 30px;
  margin-top: 8px;
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
