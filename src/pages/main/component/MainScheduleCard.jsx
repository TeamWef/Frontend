import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getGroupSchedule } from "../../../redux/modules/scheduleSlice";

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
                <h2>💖 {item?.partyName} 🥳</h2>
                <p>{item?.title}</p>
              </GroupTitle>
              <UserBox>
                <p>{item?.writer}</p>
                <button
                  onClick={() => {
                    navigate(`/sheduledetail/${item.scheduleId}`);
                  }}
                >
                  바로가기
                </button>
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
  & h2 {
    margin-top: 20px;
  }
`;

const ScheduleContainer = styled.div`
  height: 70px;
  border-bottom: 1px solid #d9d3c7;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GroupTitle = styled.div`
  display: flex;
  & p {
    margin-top: 28px;
    margin-left: 25px;
    color: #b5b3af;
  }
`;

const UserBox = styled.div`
  display: flex;
  & p {
    margin-top: 30px;
    font-weight: 600;
  }
  & button {
    margin-top: 22px;
    margin-left: 20px;
    width: 95px;
    height: 28px;
    border-radius: 5px;
    border: none;
    background-color: #a4a19d;
    color: #f0eade;
  }
`;
