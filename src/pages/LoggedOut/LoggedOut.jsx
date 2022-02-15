import "./LoggedOut.css"
import LogIn from "../../components/Login/LogIn";
import DevsLogo from "../../components/DevsLogo/DevsLogo";


function LoggedOut() {

   return (
    <div className="initialContainer">
      <DevsLogo/>
      <LogIn />
    </div>
  );
}

export default LoggedOut;


