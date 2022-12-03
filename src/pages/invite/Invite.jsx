import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Span, Button } from "../../elem";
import Svg from "../../elem/Svg";
import { useModal } from "../../hooks/useModal";
import { __getInviteCode, __postInvite } from "../../redux/modules/inviteSlice";

export const Invite = () => {
  const [invite, openInvite, setInvite] = useModal();
  const dispatch = useDispatch();
  const inviteCode = useSelector((state) => state.invite?.invite.code);
  const id = useParams()?.partyId;
  const [code, setCode] = useState({ code: "" });
  const param = useParams();
  const modalEl = useRef(null);
  const textInput = useRef();

  console.log(inviteCode);
  // 인풋 내용 복사하기
  const copy = () => {
    const el = textInput.current;
    el.select();
    document.execCommand("copy");
    alert("복사되었습니다! 친구에게 코드를 공유해주세요!🥳");
  };

  //화면 밖을 클릭 했을 때 모달창이 닫히는 로직
  const handleCloseModal = (e) => {
    if (invite && !modalEl.current.contains(e.target)) {
      setInvite(false);
    }
  };

  useEffect(() => {
    if (invite) document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  });

  const postCodeHandler = (e) => {
    e.preventDefault();
    dispatch(__postInvite(code));
  };

  const onCode = (e) => {
    const { name, value } = e.target;
    setCode({ ...code, [name]: value });
  };

  useEffect(() => {
    if (id !== undefined) {
      dispatch(__getInviteCode(id));
    }
    return;
  }, [dispatch, id]);

  return (
    <>
      <StBtn onClick={openInvite}>
        <Svg variant="invite" />
      </StBtn>
      {invite &&
        (param.partyId === undefined ? (
          <StContainerDiv ref={modalEl}>
            <StTitleDiv>
              <Span variant="bold">Invite</Span>
              <StBtn
                onClick={() => {
                  openInvite();
                }}
              >
                <Svg variant="close" onClick={openInvite} />
              </StBtn>
            </StTitleDiv>
            <Span variant="other" mg="30px 0px 0px 30px">
              초대 코드
            </Span>
            <StInput
              type="text"
              placeholder="📍 코드를 입력해주세요"
              name="code"
              onChange={onCode}
            />
            <Button
              variant="large"
              margin="20px 0px 0px 30px"
              onClick={postCodeHandler}
            >
              Invite
            </Button>
          </StContainerDiv>
        ) : (
          <StContainerDiv ref={modalEl}>
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
              초대 코드
            </Span>
            <StInput
              type="text"
              value={inviteCode}
              name="code"
              onChange={onCode}
              ref={textInput}
            />
            <label>발급된 코드는 당일 자정까지만 사용 가능합니다!</label>
            <Button onClick={copy} variant="large" margin="20px 0px 0px 30px">
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
  top: 60px;
  width: 440px;
  height: 273px;
  background: #f8f5f0;
  border-radius: 5px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
  & label {
    font-size: 12px;
    margin: -13px 0px 0px 32px;
    color: gray;
  }
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
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

const StBtn = styled.button`
  background-color: transparent;
  border: none;
`;
