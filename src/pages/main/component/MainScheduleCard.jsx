import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getGroupSchedule } from "../../../redux/modules/scheduleSlice";
import Svg from "../../../elem/Svg";
import { Div, Flex, Margin, Span } from "../../../elem";

const ScheduleCard = () => {
  const data = useSelector((state) => state.schedule.groupSchedule.data);
  console.log("메인 스케쥴 카드=>", data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getGroupSchedule());
  }, [dispatch]);

  return (
    <Div variant="bodyContainer">
      <Flex>
        <Span variant="bold">Schedule.</Span>
        <StContainerDiv>
          {data?.length !== 0 ? (
            <>
              {data?.map((item) => {
                return (
                  <StDiv key={item.scheduleId}>
                    <StFlexDiv>
                      <StItemDiv>
                        <StTitleDiv>
                          <Span variant="smallBronze">{item?.partyName}</Span>
                        </StTitleDiv>
                        <p>{item?.title}</p>
                        <p>{item?.writer}</p>
                      </StItemDiv>
                      <StbtnDiv
                        onClick={() => {
                          navigate(
                            `/${item.partyId}/scheduledetail/${item.scheduleId}`
                          );
                        }}
                      >
                        <Svg variant={"more"} />
                      </StbtnDiv>
                    </StFlexDiv>
                  </StDiv>
                );
              })}
            </>
          ) : (
            <Div variant="nullBox">
              <Flex>
                <Span variant="bigBronze" asf="center">
                  현재 일정이 없습니다.
                </Span>
              </Flex>
            </Div>
          )}
        </StContainerDiv>
      </Flex>
    </Div>
  );
};

export default ScheduleCard;

const StContainerDiv = styled.div`
  width: 1075px;
  height: 500px;
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
  background-color: #ede8e1;
  color: #a4a19d;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

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
`;

const StbtnDiv = styled.div`
  width: 50px;
  height: 30px;
  margin-top: 26px;
  margin-left: 26px;
  border-radius: 5px;
  border: none;
`;
