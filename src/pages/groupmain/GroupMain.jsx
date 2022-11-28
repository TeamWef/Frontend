import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Div, Flex } from "../../elem";
import { __popularSchedule } from "../../redux/modules/scheduleSlice";

const GroupMain = () => {
  const navigate = useNavigate();
  const partyId = useParams().partyId;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.schedule?.popularSchedule);
  console.log(data);
  const member = data?.memberResponseDtoList;

  useEffect(() => {
    dispatch(__popularSchedule(partyId));
  }, [dispatch, partyId]);

  return (
    <>
      <Div variant="bodyContainer">
        <div>
          <h2>{data.partyName}</h2>
          <p>{data.partyIntroduction}</p>
          <p>
            {member?.map((item, i) => {
              return (
                <>
                  <div key={i}></div>
                  <Stimg src={item.profileImageUrl} alt="profileImg" />
                  {item.memberName}
                </>
              );
            })}
          </p>
        </div>
        <div>
          <h2>Favorite Schedule.</h2>
          <div>
            <div>
              <div>
                <p>{data.title}</p>
                <p>{data.writer}</p>
              </div>
              <div>
                <p>{data.participantSize}</p>
              </div>
            </div>
            <p>{data.content}</p>
            <p>{data.date}</p>
          </div>
        </div>
      </Div>
    </>
  );
};

export default GroupMain;

const Stimg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 5px;
  object-fit: cover;
`;
