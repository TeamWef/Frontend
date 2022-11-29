import { Chat } from "./component/Chat";

const ChatMain = () => {
  return (
    <div>
      <Chat />
      <ChatMain />
    </div>
  );
};

export default ChatMain;
