import ColorPicker from "./ColorPicker";
import "./WelcomeUsername.css";

function WelcomeUsername() {
  return (
    <div className="welcomeName">
      <p>Welcome Name</p>
      <input type="text" name="" placeholder="Type your username" />
      <p>Select your favorite color</p>
      <ColorPicker/>
      <button className="welcomeButton">Continue</button>
    </div>
  );
}

export default WelcomeUsername;
