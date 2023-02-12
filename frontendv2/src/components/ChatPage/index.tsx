import { Socket } from "socket.io-client/build/esm/socket";
import ChatFooter from "../ChatFooter";
import MessageStatus from "../MessageStatus";
import RecievedMessage from "../RecievedMessage";
import SentMessage from "../SentMessage";

interface Props {
  socket: Socket;
}

const ChatPage = ({ socket }: Props) => {
  return (
    <div className="chat">
      <div id="sidebar" className="chat__sidebar">
        <div id="sidebarRooms">
          <h5 className="room-title">Active Rooms</h5>
          <ul className="users" id="allRooms"></ul>
        </div>
        <div id="sidebarUsers">
          <h5 className="room-title">Active Users</h5>
          <ul className="users" id="allUsers"></ul>
        </div>
      </div>
      <div className="chat__main">
        <div id="messages" className="chat__messages">
          {/*This shows messages sent from you*/}
          <div className="message__container">
            <SentMessage />
            {/*This shows messages received by you*/}
            <RecievedMessage />
            {/*This is triggered when a user is typing*/}
            <MessageStatus />
          </div>
        </div>
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatPage;
