import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getGroupSchedule } from "../../../redux/modules/scheduleSlice";
import Svg from "../../../elem/Svg";
import { Div, Flex, Margin, Span } from "../../../elem";

const ScheduleCard = () => {
  const data = useSelector((state) => state.schedule.groupSchedule.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getGroupSchedule());
  }, [dispatch]);

  return (
    <Div variant="bodyContainer" mh="400px">
      <Flex width="1075px">
        <Span variant="bold">Schedule.</Span>
        <Margin mg="10px" />
        <Div variant="scroll-y" width="1070px" height="300px">
          {data?.length !== 0 ? (
            <>
              {data?.map((item) => {
                return (
                  <StDiv
                    key={item.scheduleId}
                    onClick={() => {
                      localStorage.setItem("Group", item.partyName);
                      navigate(
                        `/${item.partyId}/scheduledetail/${item.scheduleId}`
                      );
                    }}
                  >
                    <Flex fd="row" ai="center">
                      <Flex fd="row" ai="center" margin="5px">
                        <StItemDiv>
                          <StTitleDiv>
                            <Span
                              variant="small"
                              fw="600"
                              color="#535353"
                              of="hidden"
                              to="ellipsis"
                              wb="break-all"
                            >
                              {item?.partyName}
                            </Span>
                          </StTitleDiv>

                          <p>{item?.title}</p>

                          <StTextDiv>
                            <Span
                              variant="small"
                              asf="center"
                              fw="400"
                              color="#535353"
                              width="100%"
                            >
                              {item?.writer}
                            </Span>
                          </StTextDiv>
                        </StItemDiv>
                      </Flex>
                      <StbtnDiv>
                        <Svg variant="more" />
                      </StbtnDiv>
                    </Flex>
                  </StDiv>
                );
              })}
            </>
          ) : (
            <Div variant="null" width="1070px" height="227px">
              <Flex>
                <Span variant="bigBronze" asf="center">
                  현재 일정이 없습니다.
                </Span>
              </Flex>
            </Div>
          )}
        </Div>
      </Flex>
    </Div>
  );
};

export default ScheduleCard;

const StContainerDiv = styled.div`
  width: 1075px;
  height: 400px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 20px;
  &::-webkit-scrollbar {
    background: #d9d9d9;
    width: 6px;
    height: 100%;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #a4a19d;
  }
  &::-webkit-scrollbar-track {
    width: 0;
    height: auto;
  }
`;

const StTitleDiv = styled.div`
  width: 160px;
  height: 35px;
  margin: 0px 0px 0px 10px;
  background-color: #ede8e1;
  color: #a4a19d;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  white-space: nowrap;
  & p {
    color: #535353;
    font-size: 16px;
  }
`;

const StDiv = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  width: 1055px;
  height: 75px;
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #d9d3c7;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

const StItemDiv = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
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

const StTextDiv = styled.div`
  width: 60px;
  text-align: center;
  color: #b5b3af;
`;

const StbtnDiv = styled.div`
  width: 50px;
  height: 30px;
  margin-top: 12px;
  margin-left: -10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
