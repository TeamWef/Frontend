import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Div, Flex, Img, Margin, Span } from "../../elem";
import { __popularSchedule } from "../../redux/modules/scheduleSlice";
import { Chat } from "../chat/component/Chat";

const GroupMain = () => {
  const partyId = useParams().partyId;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.schedule?.popularSchedule);
  const members = data.participantList;

  useEffect(() => {
    dispatch(__popularSchedule(partyId));
  }, [dispatch, partyId]);

  return (
    <>
      <Div variant="bodyContainer">
        <Margin mg="38px" />
        <Flex>
          <Flex>
            <Flex ai="center">
              <Span variant="bold" asf="center">
                {data.partyName}
              </Span>
              <Span variant="mediumBronze" mg="30px 0">
                {data.partyIntroduction}
              </Span>
              <StDiv pd="15px 0 0 0">
                <Flex ai="center">
                  <Span variant="medium" color="#D9D3C7" fw="700">
                    My Friends
                  </Span>
                  <StHr />
                </Flex>
                <StMembers>
                  {members?.map((item, i) => {
                    return (
                      <Flex key={i} fd="row" ai="center">
                        {item.profileImageUrl === null ? (
                          <Img src="/images/userProfile.jpg" />
                        ) : (
                          <Img src={item.profileImageUrl} alt="profileImg" />
                        )}
                        <Span variant="smallBronze" mg="0 0 0 4px">
                          {item.memberName}
                        </Span>
                      </Flex>
                    );
                  })}
                </StMembers>
              </StDiv>
            </Flex>
          </Flex>
          <Margin />
          <Flex ai="center">
            <Span variant="mediumBronze" fw="700" mg="0 0 20px 0">
              Favorite Schedule.
            </Span>
            <StDiv pd="25px" width="600px">
              <Flex fd="row" jc="space-between" ai="center">
                <Flex fd="row" ai="center">
                  <Span color="#a4a19d" fw="700" mg="0 10px 0 0">
                    {data.title}
                  </Span>
                  <Span variant="smallBronze">{data.writer}</Span>
                </Flex>
                <Span variant="smallBronze">
                  참여 인원 : {data.participantSize}명
                </Span>
              </Flex>
              <Span variant="mediumBronze" mg="35px 0">
                {data.content}
              </Span>
              <Flex>
                <Span variant="mediumBronze">{data.date}</Span>
                <Span variant="mediumBronze">{data.meetTime}</Span>
                <Span variant="mediumBronze">{data.placeName}</Span>
                <Span variant="mediumBronze">{data.address}</Span>
              </Flex>
            </StDiv>
          </Flex>
        </Flex>
      </Div>
    </>
  );
};

export default GroupMain;

const StDiv = styled.div`
  width: ${({ width }) => (width ? width : "")};
  padding: ${({ pd }) => (pd ? pd : "")};
  border: solid 1px #d9d3c7;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const StMembers = styled.div`
  margin: 15px;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 130px;
  height: 130px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    background: #d9d9d9;
    width: 6px;
    height: 100%;
    border-radius: 10px;
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

const StHr = styled.hr`
  border: 0;
  background-color: #d9d3c7;
  height: 1px;
  width: 140px;
  margin-top: 10px;
`;
