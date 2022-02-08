import "./LogIn.css";
import { logInWithGoogle } from "../../firebase";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function LogIn() {
  const { userLog } = useContext(UserContext);
  return (
    <div className="LogInGoogle">
      <p>Lorem, ipsum dolor.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        
        {userLog.uid.length !== 0 ? (
          <Link to="/welcome">
            <br />
            <button className="continueBtn">Continue</button>
          </Link>
        ) : (
          <div  className="LogIn" onClick={logInWithGoogle}>
            <div className="googleLogo">
              <img src="./images/googleLogo.svg" alt="" />
            </div>
            <button className="login-btn">Log in with Google</button>
          </div>
        )}
      
      <p>© 2022 Devs_United - BETA</p>
    </div>
  );
}
export default LogIn;
