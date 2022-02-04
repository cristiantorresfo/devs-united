import "./LoggedOut.css"
import LogIn from "../components/LogIn";
import DevsLogo from "../components/DevsLogo";

function LoggedOut({setNextPage}) {
  return (
    <div className="initialContainer">
      <DevsLogo/>
      <LogIn />
      {setNextPage(false)}
    </div>
  );
}

export default LoggedOut;


