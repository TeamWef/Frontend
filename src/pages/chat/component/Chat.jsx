import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Div } from "../../../elem";
import { useModal } from "../../../hooks/useModal";
import ChattingService from "../../../ChattingService/ChattingService";
import { getCookie } from "../../../redux/modules/customCookies";
import { useParams } from "react-router-dom";

const ChattingServiceKit = new ChattingService();

export const Chat = () => {
  const [Chat, openChat] = useModal();
  const token = getCookie("token").replace("Bearer", "");

  const [chatLog, setChatLog] = useState([]);
  const [receiveMsg, setReceiveMsg] = useState();

  console.log("chatLog==>", chatLog);
  console.log("receiveMsg===>", receiveMsg);

  // message를 키:벨류 형태로 저장해서 key 왼쪽 value 오른쪽 (노랭이)
  // class name=key, value

  // Message User & Content
  const [message, setMessage] = useState("");

  const inputMessage = (e) => {
    setMessage(e.target.value);
  };

  const onEnter = (e) => {
    // 만약 엔터를 해서 텍스트를 보냈을 때, 실행할 콘솔
    if (e.keyCode === 13) {
      console.log("메시지 전송 성공!");
    }
  };

  ChattingServiceKit.onConnect("/sub/chatrooms/1", {}, (newMessage) => {
    setReceiveMsg(newMessage.content);
  });

  useEffect(() => {
    setChatLog([...chatLog, receiveMsg]);
  }, [setChatLog, receiveMsg]);

  const submitHandler = (e) => {
    e.preventDefault();
    ChattingServiceKit.sendMessage({
      content: message,
      accesstoken: token,
    });
    setMessage("");
  };

  useEffect(() => {
    return () => {
      ChattingServiceKit.onDisconnect();
    };
  }, []);

  return (
    <Div variant="bodyContainer">
      <h2>Chat</h2>
      <StModalDiv onClick={openChat}> 💬 </StModalDiv>

      {Chat ? (
        chatLog.length > 0 ? (
          <StContainerDiv>
            <span>
              {chatLog.map((item) => {
                return <StBox>{item}</StBox>;
              })}
            </span>
            <StBottomDiv>
              <form onSubmit={submitHandler}>
                <StInput
                  name="chat"
                  autoComplete="off"
                  placeholder="메시지를 입력해주세요!"
                  type="text"
                  onKeyDown={onEnter}
                  value={message}
                  onChange={inputMessage}
                />
                <StBtn type="submit"> 💌 </StBtn>
              </form>
            </StBottomDiv>
          </StContainerDiv>
        ) : (
          <StContainerDiv>
            <StBoxDiv>
              <p>채팅이 없습니다 🥺</p>
              <p>첫 메시지를 친구들에게 남겨보세요!</p>
            </StBoxDiv>
            <span>메시지를 주고 받으세요!</span>
            <StBottomDiv>
              <form onSubmit={submitHandler}>
                <StInput
                  name="chat"
                  autoComplete="off"
                  placeholder="메시지를 입력해주세요!"
                  type="text"
                  onKeyDown={onEnter}
                  value={message}
                  onChange={inputMessage}
                />
                <StBtn type="submit"> 💌 </StBtn>
              </form>
            </StBottomDiv>
          </StContainerDiv>
        )
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

const StBox = styled.div`
  width: 100px;
  height: 20px;
  background-color: #acacac;
  color: #e8e8e8;
`;
