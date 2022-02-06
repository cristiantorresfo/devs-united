import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ColorPicker from "../ColorPicker/ColorPicker";
import "./WelcomeUsername.css";

function WelcomeUsername({ setNextPage, username, setUsername }) {
  const { userLog } = useContext(UserContext);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleContinueBtn = () => {
    setNextPage(true);
  };
  return (
    <div className="welcomeName">
      <p>Welcome {userLog.displayName}</p>
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
