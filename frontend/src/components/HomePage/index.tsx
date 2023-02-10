interface Props {
  setRoomName: (roomName: string) => void;
  setUserName: (userName: string) => void;
}

const HomePage = ({ setRoomName, setUserName }: Props) => {
  return (
    <div className="centered-form">
      <div className="centered-form__box">
        <h1>Join</h1>
        <form action="/chat.html">
          <label htmlFor="">Display name</label>
          <input
            type="text"
            name="username"
            placeholder="Display name"
            required
          />
          <label htmlFor="">Room</label>
          <input type="text" name="room" placeholder="Room" required />
          <button>Join</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
