import { useState } from "react";

const useMessages = () => {
  const [message, setMessage] = useState("");

  return {
    message,
    setMessage,
  };
};

export default useMessages;
