import useMessages from "../../hooks/useMessages";

const ChatFooter = () => {
  const { message, setMessage } = useMessages();

  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log({ userName: localStorage.getItem("userName"), message });
    setMessage("");
  };
  return (
    <div className="compose">
      <form id="message-form" onSubmit={handleSendMessage}>
        <input
          name="message"
          placeholder="Message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
      <button id="send-location">Send location</button>
    </div>
  );
};

export default ChatFooter;
