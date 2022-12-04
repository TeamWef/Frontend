import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Div, Svg, Span } from "../../../elem";
import { useModal } from "../../../hooks/useModal";
import { getCookie } from "../../../redux/modules/customCookies";
import { useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useDispatch, useSelector } from "react-redux";
import { __getMessage } from "../../../redux/modules/chatSlice";

export const Chat = () => {
  const [chat, openChat, setChat] = useModal();
  const stompClient = useRef(null);
  const chatId = useSelector(
    (state) => state.schedule?.popularSchedule.chatRoomId
  );
  const token = getCookie("token");
  const partyId = useParams().partyId;
  const [chatLog, setChatLog] = useState([]);
  const [receiveMsg, setReceiveMsg] = useState();
  const headers = { Authorization: token };
  const dispatch = useDispatch();
  const modalEl = useRef(null);
  const userMessage = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");

  const inputMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleCloseModal = (e) => {
    if (chat && !modalEl.current.contains(e.target)) {
      setChat(!chat);
    }
  };

  useEffect(() => {
    if (chat) document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  });

  useEffect(() => {
    // dispatch(__getMessage(partyId));
  });

  useEffect(() => {
    setChatLog([...chatLog, receiveMsg]);
  }, [setChatLog, receiveMsg]);

  const socketConnect = () => {
    const webSocket = new SockJS(`${process.env.REACT_APP_BASE_URL}/socket`);
    stompClient.current = Stomp.over(webSocket);
    stompClient.current.connect(
      {
        Authorization: token,
      },
      // 연결 성공 시 실행되는 함수
      () => {
        stompClient.current.subscribe(`/sub/chatrooms/${partyId}`, (res) => {
          const newMessage = JSON.parse(res.body);
          setReceiveMsg({ ...receiveMsg, newMessage });
        });
      },
      headers
    );
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const message = e.target.chat.value;
    if (message === "") return false;

    stompClient.current.send(
      `/pub/chatrooms/${partyId}`,
      headers,
      JSON.stringify({
        content: message,
        token: token,
      })
    );
    setMessage("");
    // textRef.current.value = null;
    // e.target.chat.value = [];
  };

  const socketDisconnect = () => {
    stompClient.current.disconnect();
    stompClient.current = null;
  };

  useEffect(() => {
    // 채팅방 전환 시 기존 연결 해제 후 새 연결 요청
    if (stompClient.current) {
      socketDisconnect();
    }
    socketConnect();

    return () => {
      // 언마운트 시 연결 해제
      if (stompClient.current) socketDisconnect();
    };
  }, []);

  return (
    <Div variant="bodyContainer">
      <StModalDiv onClick={openChat}>
        <Svg variant="message" />
      </StModalDiv>
      {chat ? (
        chatLog?.length > 1 ? (
          <StContainerDiv ref={modalEl}>
            <StTextDiv>
              <p>그룹명</p>
            </StTextDiv>
            <StDiv>
              {chatLog
                ?.filter((item) => {
                  return item !== undefined;
                })
                .map((item, i) => {
                  return item?.newMessage.memberId === 2 ? (
                    <StChatBoxDiv key={i}>
                      <p>{item?.newMessage.memberName}</p>
                      <StUserChatDiv>{item?.newMessage.content}</StUserChatDiv>
                    </StChatBoxDiv>
                  ) : (
                    <StChatBoxDiv>
                      <StChatDiv>{item?.newMessage.content}</StChatDiv>
                    </StChatBoxDiv>
                  );
                })}
            </StDiv>
            <StBottomDiv>
              <form onSubmit={sendMessage}>
                <StInput
                  name="chat"
                  autoComplete="off"
                  placeholder="메시지를 입력해주세요!"
                  type="text"
                  // onKeyDown={onEnter}
                  value={message}
                  onChange={inputMessage}
                />
                <StBtn type="submit">
                  <Svg variant="send" />
                </StBtn>
              </form>
            </StBottomDiv>
          </StContainerDiv>
        ) : (
          <StContainerDiv>
            <Div variant="chatTitle">
              <p>채팅이 없습니다 🥺</p>
              <p>첫 메시지를 친구들에게 남겨보세요!</p>
            </Div>
            <Div variant="chatText">
              <span>친구들과 메시지를 주고 받으세요!</span>
            </Div>
            <StBottomDiv>
              <form onSubmit={sendMessage}>
                <StInput
                  name="chat"
                  autoComplete="off"
                  placeholder="메시지를 입력해주세요!"
                  type="text"
                  // onKeyDown={onEnter}
                  value={message}
                  onChange={inputMessage}
                />
                <StBtn type="submit">
                  <Svg variant="send" />
                </StBtn>
              </form>
            </StBottomDiv>
          </StContainerDiv>
        )
      ) : null}
    </Div>
  );
};

const StModalDiv = styled.div`
  position: fixed;
  top: 650px;
  right: 40px;
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
  & Svg {
    width: 24px;
  }
`;

const StContainerDiv = styled.div`
  position: fixed;
  top: 10px;
  right: 100px;
  display: flex;
  flex-direction: column;
  justify-content: right;
  width: 440px;
  height: 700px;
  background-color: #f8f5f0;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

const StDiv = styled.div`
  width: 100%;
  height: 560px;
  position: absolute;
  top: 60px;
  overflow-y: auto;
  & span {
    color: #d9d3c7;
    font-size: 15px;
    text-align: center;
    margin-top: 50%;
  }
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

const StTextDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 440px;
  height: 60px;
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
  padding: 15px;
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
  font-size: 12px;
  color: #d9d3c7;
  & Svg {
    width: 18px;
    margin-top: 5px;
  }
`;

const StChatBoxDiv = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-end;
`;

const StChatDiv = styled.div`
  background-color: #ebe3d8;
  margin-right: -20px;
  padding: 8px 10px;
  margin-top: 11px;
  width: max-content;
  max-width: 50%;
  border-radius: 15px 15px 0px 15px;
  text-align: center;
`;

const StUserChatDiv = styled.div`
  background-color: #fff;
  margin-right: -20px;
  padding: 8px 10px;
  margin-top: 11px;
  width: max-content;
  max-width: 50%;
  border-radius: 15px 15px 15px 0px;
  text-align: center;
`;
