import styled from "styled-components";
import { Div, Span, Button } from "../../elem";
import Svg from "../../elem/Svg";
import { useModal } from "../../hooks/useModal";

export const Invite = () => {
  const [invite, openInvite] = useModal();

  return (
    <>
      <Svg onClick={openInvite} variant="invite" />
      {invite && (
        <StContainerDiv>
          <StTitleDiv>
            <Span>Invite</Span>
            <Svg variant="close" />
          </StTitleDiv>
          <Span variant="smallBronze">추천코드</Span>
          <StInput />
          <Button variant="large">Join</Button>
        </StContainerDiv>
      )}
    </>
  );
};

const StContainerDiv = styled.div`
  width: 440px;
  height: 273px;
  background: #f8f5f0;
  border-radius: 5px;
`;

const StTitleDiv = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

const StInput = styled.input`
  width: 375px;
  border: none;
  border-bottom: 1px solid #b5b3af;
  background-color: transparent;
`;
