import "./Welcome.css"
import DevsLogo from "../../components/DevsLogo/DevsLogo";
import WelcomeUsername from "../../components/WelcomeUsername/WelcomeUsername";

function Welcome({setNextPage, username, setUsername}) {
  return (
    <div className="initialContainer">
      <DevsLogo/>
      <WelcomeUsername setNextPage={setNextPage} setUsername={setUsername} username={username}/>
    </div>

  );
}

export default Welcome;
