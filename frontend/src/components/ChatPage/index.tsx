const ChatPage = () => {
  return (
    <div className="chat">
      <div id="sidebar" className="chat__sidebar">
        <div id="sidebarRooms">
          <h5 className="room-title">Active Rooms</h5>
          <ul className="users" id="allRooms"></ul>
        </div>
        <div id="sidebarUsers"></div>
      </div>
      <div className="chat__main">
        <div id="messages" className="chat__messages"></div>

        <div className="compose">
          <form id="message-form">
            <input name="message" placeholder="Message" required />
            <button>Send</button>
          </form>
          <button id="send-location">Send location</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
