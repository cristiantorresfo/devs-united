import "./LoggedOut.css"
import LogIn from "../components/LogIn";
import DevsLogo from "../components/DevsLogo";

function LoggedOut() {
  return (
    <div className="initialContainer">
      <DevsLogo/>
      <LogIn />
    </div>
  );
}

export default LoggedOut;


