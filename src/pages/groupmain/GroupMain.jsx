import { Navigate, useNavigate, useParams } from "react-router-dom";

const GroupMain = () => {
  const navigate = useNavigate();
  const partyId = useParams().partyId;
  console.log(partyId);

  return (
    <>
      <div>Group MainPage</div>
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
    </>
  );
};

export default GroupMain;
