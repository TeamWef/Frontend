import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const chatMain = () => {
  return (
    <div>
      <ul>
        <li>다른 사용자: message</li>
        <li>또 다른 사용자 : message</li>
      </ul>
      <input />
      <button>send</button>
    </div>
  );
};

export default chatMain;
