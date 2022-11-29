import sockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getCookie } from "../redux/modules/customCookies";

// 클래스 함수를 사용한 이유 : 아무데서나 갖다 쓸 수 있고, 몇개를 만들지 몰라서
// 가져다 쓰기 쉽게 사용하기 위해 파일을 분리함!

class ChattingService {
  socket = new sockJS(`${process.env.REACT_APP_BASE_URL}/socket`);
  stompClient = Stomp.over(this.socket);
  roomId = "";
  // 방 id 받기

  receiveRoomId = (roomId) => {
    this.roomId = roomId;
  };
  // 웹소켓 연결 요청 & 구독 요청

  onConnect = (
    roomAddress = "/sub/chatrooms/1",
    headers = { Authorization: getCookie("token") },
    callback = () => {}
  ) => {
    let newMessage = "";
    // headers에 {} 인증요청 집어 넣기
    this.stompClient.connect(headers, () => {
      console.log("연결 성공");
      this.stompClient.subscribe(roomAddress, headers, (data) => {
        newMessage = JSON.parse(data.body);
        // 연결 성공시 발동시킬 콜백 넣기
        // 주로 메세지를 받는 로직을 여기에 넣는다
        // 리렌더링
        callback(newMessage);
      });
    });
    return newMessage;
  };

  //
  //

  sendMessage = (
    messageObject,
    headers = { Authorization: getCookie("token") }
  ) => {
    this.stompClient.send(
      "/pub/chatrooms/1",
      headers,
      JSON.stringify(messageObject)
    );
    // this.stompClient.send('/app/hello', {}, messageObject);
  };

  receiveMessage = () => {};

  onDisconnect = () => {
    this.stompClient.disconnect();
    console.log("disconnected");
  };
}

export default ChattingService;
