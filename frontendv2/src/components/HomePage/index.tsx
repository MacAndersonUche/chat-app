import { useNavigate } from "react-router-dom";
import useChatDetails from "../../hooks/useChatDetails";

const HomePage = () => {
  const { roomName, userName, setUserName, setRoomName } = useChatDetails();
  const navigate = useNavigate();

  const submitHandler = (e: { preventDefault: () => void }) => {
    localStorage.setItem("userName", userName);
    e.preventDefault();
    navigate("/chat");
  };
  return (
    <div className="centered-form">
      <div className="centered-form__box">
        <h1>Join</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">Display name</label>
          <input
            type="text"
            name="username"
            placeholder="Display name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="roomname">Room</label>
          <input
            type="text"
            name="roomname"
            placeholder="Room"
            value={roomName}
            required
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button>Join</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
