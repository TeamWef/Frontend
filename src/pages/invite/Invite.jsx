import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Span, Button } from "../../elem";
import Svg from "../../elem/Svg";
import { useModal } from "../../hooks/useModal";
import { __getInviteCode } from "../../redux/modules/inviteSlice";

export const Invite = () => {
  const [invite, openInvite] = useModal();
  const dispatch = useDispatch();
  const inviteCode = useSelector((state) => state.invite.invite);
  console.log(inviteCode);

  const getCodeHandler = (e) => {};

  useEffect(() => {
    dispatch(__getInviteCode());
  }, [dispatch]);

  return (
    <>
      <StBtn onClick={openInvite}>
        <Svg variant="invite" />
      </StBtn>
      {invite &&
        (inviteCode.length > 0 ? (
          <StContainerDiv>
            <StTitleDiv>
              <Span variant="bold">Invite</Span>
              <StBtn
                onClick={() => {
                  openInvite();
                }}
              >
                <Svg variant="close" />
              </StBtn>
            </StTitleDiv>
            <Span variant="other" mg="30px 0px 0px 30px">
              추천코드
            </Span>
            <StInput />
            <Button variant="large" margin="20px 0px 0px 30px">
              Join
            </Button>
          </StContainerDiv>
        ) : (
          <StContainerDiv>
            <StTitleDiv>
              <Span variant="bold">Invite</Span>
              <StBtn
                onClick={() => {
                  openInvite();
                }}
              >
                <Svg variant="close" />
              </StBtn>
            </StTitleDiv>
            <Span variant="other" mg="30px 0px 0px 30px">
              추천코드
            </Span>
            <StCodeDiv />
            <Button
              variant="large"
              margin="20px 0px 0px 30px"
              onClick={getCodeHandler}
            >
              Copy
            </Button>
          </StContainerDiv>
        ))}
    </>
  );
};

const StContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100px;
  width: 440px;
  height: 273px;
  background: #f8f5f0;
  border-radius: 5px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
`;

const StTitleDiv = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

const StInput = styled.input`
  margin: 30px 20px 20px 30px;
  width: 375px;
  border: none;
  border-bottom: 1px solid #b5b3af;
  background-color: transparent;
`;

const StBtn = styled.button`
  background-color: transparent;
  border: none;
`;

const StCodeDiv = styled.div`
  margin: 30px 20px 20px 30px;
  width: 375px;
  border: none;
  border-bottom: 1px solid #b5b3af;
  background-color: transparent;
`;
