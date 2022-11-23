// import { useEffect, useState } from "react";
// import ChattingService from "../../../ChattingService/ChattingService";
// import { getCookie } from "../../../redux/modules/customCookies";

// const ChattingServiceKit = new ChattingService();

// export const ChatRoom = () => {
//   const accessToken = getCookie("token");
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
//     if (e.keyCode === 13) {
//       console.log("메시지 전송 성공!");
//     }
//   };

//   ChattingServiceKit.onConnect("/topic/greetings", {}, (newMessage) => {
//     setReceiveMsg(newMessage.content);
//   });

//   useEffect(() => {
//     setChatLog([...chatLog, receiveMsg]);
//   }, [chatLog, receiveMsg]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     ChattingServiceKit.sendMessage({
//       content: message,
//       accesstoken: accessToken,
//     });
//     setMessage("");
//   };

//   useEffect(() => {
//     return () => {
//       ChattingServiceKit.onDisconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <div>
//         {chatLog !== 0 &&
//           chatLog.map((val, index) => {
//             return <h4 key={index}>{val}</h4>;
//           })}
//         {message.length > 0 ? (
//           <p>메시지 보내는 중</p>
//         ) : (
//           <p>메시지 받는 중...</p>
//         )}
//       </div>
//       <form onSubmit={submitHandler}>
//         <input
//           name="chat"
//           autoComplete="off"
//           placeholder=">"
//           type="text"
//           onKeyDown={onEnter}
//           value={message}
//           onChange={inputMessage}
//         />
//       </form>
//     </div>
//   );
// };
