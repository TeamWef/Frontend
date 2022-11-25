import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Flex } from "../../elem";

const GroupMain = () => {
  const navigate = useNavigate();
  const partyId = useParams().partyId;
  console.log(partyId);

  return (
    <>
      <div>Group MainPage</div>
      <Flex fd="row">
        <button
          onClick={() => {
            navigate(`/${partyId}/schedulelist`);
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
    </>
  );
};

export default GroupMain;
