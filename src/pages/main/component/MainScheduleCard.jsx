import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getGroupSchedule } from "../../../redux/modules/scheduleSlice";
import Svg from "../../../elem/Svg";
import { Flex, Margin, Span } from "../../../elem";

const ScheduleCard = () => {
  const data = useSelector((state) => state.schedule.groupSchedule.data);
  // console.log("메인 스케쥴 카드=>", data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getGroupSchedule());
  }, [dispatch]);

  return (
    <Flex>
      <Span variant="bold">Schedule.</Span>
      <ScheduleMaincontainer>
        {data?.length !== 0 ? (
          <>
            {data?.map((item) => {
              return (
                <ScheduleDiv key={item.scheduleId}>
                  <TextContainer>
                    <GroupTitle>
                      <TitleBox>
                        <Span variant="smallBronze">{item?.partyName}</Span>
                      </TitleBox>
                      <p>{item?.title}</p>
                      <p>{item?.writer}</p>
                    </GroupTitle>
                    <UserBox>
                      <More
                        onClick={() => {
                          navigate(
                            `/${item.partyId}/scheduledetail/${item.scheduleId}`
                          );
                        }}
                      >
                        <Svg variant={"more"} />
                      </More>
                    </UserBox>
                  </TextContainer>
                </ScheduleDiv>
              );
            })}
          </>
        ) : (
          <NullBox>
            <Flex>
              <Span variant="bigBronze" asf="center">
                현재 일정이 없습니다.
              </Span>
            </Flex>
          </NullBox>
        )}
      </ScheduleMaincontainer>
    </Flex>
  );
};

export default ScheduleCard;

const TitleBox = styled.div`
  background-color: #ede8e1;
  color: #a4a19d;
  width: 160px;
  height: 35px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ScheduleMaincontainer = styled.div`
  width: 1075px;
  height: 500px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
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
  /* overflow: hidden; */
`;

const ScheduleDiv = styled.div`
  width: 1075px;
  height: 75px;
  border-bottom: 1px solid #d9d3c7;
`;

const TextContainer = styled.div`
  display: flex;
`;

const GroupTitle = styled.div`
  width: 1075px;
  display: flex;
  justify-content: space-between;
  & p {
    margin-top: 28px;
    margin-left: 30px;
    color: #b5b3af;
  }
`;

const UserBox = styled.div`
  display: flex;
  & p {
    margin-top: 30px;
    font-weight: 600;
  }
`;

const More = styled.div`
  width: 50px;
  height: 30px;
  margin-top: 26px;
  margin-left: 26px;
  border-radius: 5px;
  border: none;
`;

const NullBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1070px;
  height: 227px;
  border: 2px dashed #d9d3c7;
  border-radius: 10px;
  margin-top: 40px;
`;
