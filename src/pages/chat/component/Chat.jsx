import React from "react";
import styled from "styled-components";
import { Div } from "../../../elem";
import { useModal } from "../../../hooks/useModal";

export const Chat = () => {
  const [Chat, openChat] = useModal();

  return (
    <Div variant="bodyContainer">
      <h2>Chat</h2>
      <StModalDiv onClick={openChat}> 💬 </StModalDiv>

      {Chat ? (
        <StContainerDiv>
          <StBoxDiv>
            <p>채팅이 없습니다 🥺</p>
            <p>첫 메시지를 친구들에게 남겨보세요!</p>
          </StBoxDiv>
          <span>메시지를 주고 받으세요!</span>
          <StBottomDiv>
            <StInput /> <StBtn> 💌 </StBtn>
          </StBottomDiv>
        </StContainerDiv>
      ) : null}
    </Div>
  );
};

const StModalDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #a4a09c;
  background-color: white;
  cursor: pointer;
`;

const StContainerDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 440px;
  height: 700px;
  background-color: #f8f5f0;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  & span {
    color: #d9d3c7;
    font-size: 15px;
    text-align: center;
    margin-top: 50%;
  }
`;

const StBoxDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 440px;
  height: 80px;
  border-bottom: 2px solid #d9d3c7;
  color: #d9d3c7;
  font-size: 15px;
`;

const StBottomDiv = styled.div`
  position: absolute;
  bottom: 0px;
  width: 440px;
  height: 80px;
  background-color: transparent;
  border-top: 2px solid #d9d3c7;
`;

const StInput = styled.input`
  position: absolute;
  left: 18px;
  top: 16px;
  width: 400px;
  height: 45px;
  background-color: transparent;
  border-radius: 55px;
  border: 2px solid #d9d3c7;
`;

const StBtn = styled.button`
  position: absolute;
  right: 30px;
  top: 13px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  font-size: 20px;
`;
