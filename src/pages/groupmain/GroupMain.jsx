import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Div, Flex } from "../../elem";

const GroupMain = () => {
  const navigate = useNavigate();
  const partyId = useParams().partyId;
  console.log(partyId);

  return (
    <>
      <Div variant="bodyContainer">
        <div>Group MainPage</div>
        <Flex fd="row">
          <button
            onClick={() => {
              navigate(`/${partyId}/schedule`);
            }}
          >
            schedule
          </button>
          <button
            onClick={() => {
              navigate(`/${partyId}/album`);
            }}
          >
            album
          </button>
        </Flex>
      </Div>
    </>
  );
};

export default GroupMain;
