import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ChatBar from "../ChatBar";
import ChatBody from "../ChatBody";
import ChatFooter from "../ChatFooter";

interface Props {
  socket: Socket;
}

export interface MessageType {
  text: string;
  name: string;
  id: string;
}

const ChatPage = ({ socket }: Props) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
