import "./Welcome.css"
import DevsLogo from "../components/DevsLogo";
import WelcomeUsername from "../components/WelcomeUsername";

function Welcome() {
  return (
    <div className="initialContainer">
        <p>hola</p>
      <DevsLogo/>
      <WelcomeUsername/>
    </div>
  );
}

export default Welcome;
