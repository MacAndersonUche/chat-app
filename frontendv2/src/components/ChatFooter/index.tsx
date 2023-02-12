import { useRef, useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
}

const ChatFooter = ({ socket }: Props) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          name="message"
          placeholder="Message"
          required
          className="message"
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">Send</button>
        <button className="sendBtn">Send location</button>
      </form>
    </div>
  );
};

export default ChatFooter;
