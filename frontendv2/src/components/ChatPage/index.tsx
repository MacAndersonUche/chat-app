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
  const username = localStorage.getItem("userName");
  const room = localStorage.getItem("room");
  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
    socket.emit("join", { username, room }, (error: any) => {
      if (error) {
        alert(error);
        location.href = "/";
      }
    });
  }, [socket, messages]);
  useEffect(() => {
    socket.emit("join", { username, room }, (error: any) => {
      if (error) {
        alert(error);
        location.href = "/";
      }
    });
  }, []);

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
