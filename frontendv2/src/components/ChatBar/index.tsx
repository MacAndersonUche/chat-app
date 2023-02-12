import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
}

interface Users {
  userName: string;
  socketID: string;
}
const ChatBar = ({ socket }: Props) => {
  const [users, setUsers] = useState<Users[]>([]);

  console.log(users);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users &&
            users.map((user) => <p key={user.socketID}>{user.userName}</p>)}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
