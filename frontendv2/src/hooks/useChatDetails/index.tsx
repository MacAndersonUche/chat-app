import { useState } from "react";

const useChatDetails = () => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");
  return {
    userName,
    setUserName,
    roomName,
    setRoomName,
  };
};

export default useChatDetails;
