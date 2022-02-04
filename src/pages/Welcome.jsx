import "./Welcome.css"
import DevsLogo from "../components/DevsLogo";
import WelcomeUsername from "../components/WelcomeUsername";

function Welcome({userLog, setNextPage, username, setUsername}) {
  return (
    <div className="initialContainer">
      <DevsLogo/>
      <WelcomeUsername userlog={userLog} setNextPage={setNextPage} setUsername={setUsername} username={username}/>
    </div>
  );
}

export default Welcome;
