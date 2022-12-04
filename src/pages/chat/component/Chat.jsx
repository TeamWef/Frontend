// import React, { useCallback, useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import { Div, Svg } from "../../../elem";
// import { useModal } from "../../../hooks/useModal";
// // import ChattingService from "../../../ChattingService/ChattingService";
// import { getCookie } from "../../../redux/modules/customCookies";
// import { useParams } from "react-router-dom";
// import { Stomp } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { useSelector } from "react-redux";

// export const Chat = () => {
//   const [Chat, openChat] = useModal();
//   const stompClient = useRef(null);
//   const chatId = useSelector(
//     (state) => state.schedule?.popularSchedule.chatRoomId
//   );
//   const token = getCookie("token");
//   const partyId = useParams().partyId;
//   const [chatLog, setChatLog] = useState([]);
//   const [receiveMsg, setReceiveMsg] = useState();

//   // message를 키:벨류 형태로 저장해서 key 왼쪽 value 오른쪽 (노랭이)
//   // class name=key, value
//   // Message User & Content

//   const [message, setMessage] = useState("");

//   const inputMessage = (e) => {
//     setMessage(e.target.value);
//   };

//   const onEnter = (e) => {
//     // 만약 엔터를 해서 텍스트를 보냈을 때, 실행할 콘솔
//     if (e.keyCode === 13) {
//       console.log("메시지 전송 성공!");
//     }
//   };

//   const socketConnect = () => {
//     const webSocket = new SockJS(`${process.env.REACT_APP_BASE_URL}/socket`);
//     stompClient.current = Stomp.over(webSocket);

//     stompClient.current.connect(
//       {
//         Authorization: token,
//       },

//       // 연결 성공 시 실행되는 함수
//       () => {
//         stompClient.current.subscribe(
//           `/sub/chatrooms/${partyId}`,
//           (response) => {
//             console.log("::::", response);
//             const newMessage = JSON.parse(response.body);
//           },
//           { Authorization: token }
//         );
//         // stompClient.current.send(
//         //   `/pub/chatrooms/${partyId}`,
//         //   { token },
//         //   JSON.stringify({ content: message, token: token })
//         // );
//       }
//     );
//   };

//   const sendMessage = (e) => {
//     e.preventDefault();
//     const message = e.target.chat.value;
//     if (message === "") return false;

//     const messageObj = {
//       content: message,
//       token: token,
//     };

//     stompClient.current.send(
//       `/pub/chatrooms/${partyId}`,
//       {},
//       JSON.stringify(messageObj)
//     );
//     setMessage("");
//     // e.target.chat.value = [];
//   };

//   const socketDisconnect = () => {
//     stompClient.current.disconnect();
//     stompClient.current = null;
//   };

//   useEffect(() => {
//     // 채팅방 전환 시 기존 연결 해제 후 새 연결 요청
//     if (stompClient.current) {
//       socketDisconnect();
//     }
//     socketConnect();

//     return () => {
//       // 언마운트 시 연결 해제
//       if (stompClient.current) socketDisconnect();
//     };
//   }, []);

//   // const submitHandler = (e) => {
//   //   e.preventDefault();
//   //   stompClient.current.send(
//   //     `/pub/chatrooms/${partyId}`,
//   //     {},
//   //     JSON.stringify({
//   //       content: message,
//   //       token: token,
//   //     })
//   //   );
//   //   setMessage("");
//   // };

//   return (
//     <Div variant="bodyContainer">
//       <StModalDiv onClick={openChat}>
//         <Svg variant="message" />
//       </StModalDiv>
//       {Chat ? (
//         chatLog?.length > 1 ? (
//           <StContainerDiv>
//             {chatLog?.map((item, i) => {
//               return item?.memberId === 2 ? (
//                 <StChatBoxDiv>
//                   <StChatDiv key={i}>{item?.content}</StChatDiv>
//                 </StChatBoxDiv>
//               ) : (
//                 <StChatBoxDiv>
//                   <StUserChatDiv>{item?.content}</StUserChatDiv>
//                 </StChatBoxDiv>
//               );
//             })}

//             <StBottomDiv>
//               <form onSubmit={sendMessage}>
//                 <StInput
//                   name="chat"
//                   autoComplete="off"
//                   placeholder="메시지를 입력해주세요!"
//                   type="text"
//                   onKeyDown={onEnter}
//                   value={message}
//                   onChange={inputMessage}
//                 />
//                 <StBtn type="submit">
//                   <Svg variant="send" />
//                 </StBtn>
//               </form>
//             </StBottomDiv>
//           </StContainerDiv>
//         ) : (
//           <StContainerDiv>
//             <StBoxDiv>
//               <p>채팅이 없습니다 🥺</p>
//               <p>첫 메시지를 친구들에게 남겨보세요!</p>
//             </StBoxDiv>
//             <span>메시지를 주고 받으세요!</span>
//             <StBottomDiv>
//               <form onSubmit={sendMessage}>
//                 <StInput
//                   name="chat"
//                   autoComplete="off"
//                   placeholder="메시지를 입력해주세요!"
//                   type="text"
//                   onKeyDown={onEnter}
//                   value={message}
//                   onChange={inputMessage}
//                 />
//                 <StBtn type="submit">
//                   <Svg variant="send" />
//                 </StBtn>
//               </form>
//             </StBottomDiv>
//           </StContainerDiv>
//         )
//       ) : null}
//     </Div>
//   );
// };

// const StModalDiv = styled.div`
//   position: fixed;
//   top: 700px;
//   right: 50px;
//   display: flex;
//   align-items: center;
//   text-align: center;
//   justify-content: center;
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   border: 3px solid #a4a09c;
//   background-color: white;
//   cursor: pointer;
//   & Svg {
//     width: 24px;
//   }
// `;

// const StContainerDiv = styled.div`
//   position: fixed;
//   top: 50px;
//   right: 120px;
//   display: flex;
//   flex-direction: column;
//   justify-content: right;
//   width: 440px;
//   height: 700px;
//   background-color: #f8f5f0;
//   box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
//   border-radius: 5px;
//   & span {
//     color: #d9d3c7;
//     font-size: 15px;
//     text-align: center;
//     margin-top: 50%;
//   }
// `;

// const StBoxDiv = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   width: 440px;
//   height: 80px;
//   border-bottom: 2px solid #d9d3c7;
//   color: #d9d3c7;
//   font-size: 15px;
// `;

// const StBottomDiv = styled.div`
//   position: absolute;
//   bottom: 0px;
//   width: 440px;
//   height: 80px;
//   background-color: transparent;
//   border-top: 2px solid #d9d3c7;
// `;

// const StInput = styled.input`
//   position: absolute;
//   left: 18px;
//   top: 16px;
//   width: 400px;
//   height: 45px;
//   background-color: transparent;
//   border-radius: 55px;
//   border: 2px solid #d9d3c7;
//   &::placeholder {
//     padding: 15px;
//   }
// `;

// const StBtn = styled.button`
//   position: absolute;
//   right: 30px;
//   top: 13px;
//   width: 50px;
//   height: 50px;
//   background-color: transparent;
//   border: none;
//   font-size: 12px;
//   color: #d9d3c7;
//   & Svg {
//     width: 18px;
//     margin-top: 5px;
//   }
// `;

// const StChatBoxDiv = styled.div`
//   width: 400px;
//   display: flex;
//   justify-content: flex-end;
// `;

// const StChatDiv = styled.div`
//   background-color: #ebe3d8;
//   margin-right: -20px;
//   padding: 8px 10px;
//   margin-top: 11px;
//   width: max-content;
//   max-width: 50%;
//   border-radius: 15px 15px 0px 15px;
//   text-align: center;
// `;

// const StUserChatDiv = styled.div`
//   background-color: #fff;
//   margin-right: -20px;
//   padding: 8px 10px;
//   margin-top: 11px;
//   width: max-content;
//   max-width: 50%;
//   border-radius: 15px 15px 15px 0px;
//   text-align: center;
// `;
