import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import ColorPicker from "../ColorPicker/ColorPicker";
import "./WelcomeUsername.css";

function WelcomeUsername() {
  const { userLog } = useContext(UserContext);

  // const handleUsername = (e) => {
  //   setUsername(e.target.value);
  // };

  return (
    <div className="welcomeName">
      <p>Welcome {userLog.displayName}</p>
      <input
        type="text"
        name="username"
        placeholder="Type your username"
        // onChange={handleUsername}
        // value={username}
      />
      <p>Select your favorite color</p>
      <ColorPicker />
      <Link to="/feed">
        <br />
        <button className="continueBtn">Continue</button>
      </Link>
      ;
    </div>
  );
}

export default WelcomeUsername;
