import "./WelcomeUsername.css";

function WelcomeUsername() {
  return (
    <div className="welcomeName">
      <p>Welcome Name</p>
      <input type="text" name="" placeholder="Type your username" />
      <p>Select your favorite color</p>
      <div className="usernameColor">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <button className="welcomeButton">Continue</button>
    </div>
  );
}

export default WelcomeUsername;
