import { useNavigate } from "react-router-dom";
import useChatDetails from "../../hooks/useChatDetails";

const HomePage = () => {
  const { setUserName, setRoomName } = useChatDetails();
  const navigate = useNavigate();

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/chats");
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
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="roomname">Room</label>
          <input
            type="text"
            name="roomname"
            placeholder="Room"
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
