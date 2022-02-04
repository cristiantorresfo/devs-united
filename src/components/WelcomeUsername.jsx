import ColorPicker from "./ColorPicker";
import "./WelcomeUsername.css";

function WelcomeUsername({ userlog, setNextPage, username, setUsername }) {
  const handleUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const handleContinueBtn = () => {
    setNextPage(true);
  };
  return (
    <div className="welcomeName">
      <p>Welcome {userlog.displayName.toUpperCase()}</p>
      <input
        type="text"
        name="username"
        placeholder="Type your username"
        onChange={handleUsername}
        value={username}
      />
      <p>Select your favorite color</p>
      <ColorPicker />
      <button className="welcomeButton" onClick={handleContinueBtn}>
        Continue
      </button>
    </div>
  );
}

export default WelcomeUsername;
