import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getGroupSchedule } from "../../../redux/modules/scheduleSlice";
import Svg from "../../../elem/Svg";

const ScheduleCard = () => {
  const data = useSelector((state) => state.schedule.groupSchedule.data);
  // console.log("메인 스케쥴 카드=>", data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getGroupSchedule());
  }, [dispatch]);

  return (
    <MainContainer>
      <h2>Schedule.</h2>

      {data?.map((item) => {
        return (
          <ScheduleContainer key={item.scheduleId}>
            <TextContainer>
              <GroupTitle>
                <TitleBox>
                  <h3>{item?.partyName}</h3>
                </TitleBox>
                <p>{item?.title}</p>
                <p>{item?.writer}</p>
              </GroupTitle>
              <UserBox>
                <More
                  onClick={() => {
                    navigate(`/sheduledetail/${item.scheduleId}`);
                  }}
                >
                  <Svg variant={"more"} />
                </More>
              </UserBox>
            </TextContainer>
          </ScheduleContainer>
        );
      })}
    </MainContainer>
  );
};

export default ScheduleCard;

const MainContainer = styled.div`
  width: 1078px;
  height: 40px;
  margin: 0 auto;
`;

const TitleBox = styled.div`
  background-color: #ede8e1;
  color: #a4a19d;
  width: 160px;
  height: 30px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  & h3 {
    font-weight: 400;
  }
`;

const ScheduleContainer = styled.div`
  height: 70px;
  border-bottom: 1px solid #d9d3c7;
`;

const TextContainer = styled.div`
  display: flex;
`;

const GroupTitle = styled.div`
  width: 1078px;
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
