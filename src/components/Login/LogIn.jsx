import "./LogIn.css";
import { logInWithGoogle } from "../../firebase";
import { Link } from "react-router-dom";

function LogIn() {
  return (
    <div className="LogInGoogle">
      <p>Lorem, ipsum dolor.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <div className="LogIn" onClick={logInWithGoogle}>
        <div className="googleLogo">
          <img src="./images/googleLogo.svg" alt="" />
        </div>
        <Link to="/welcome" >
        <button className="login-btn">Log in with Google</button>
        </Link>
      </div>
      <p>© 2022 Devs_United - BETA</p>
    </div>
  );
}
export default LogIn;
