import "./LogIn.css";
import {  logInWithGoogle } from "../../firebase";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function LogIn() {
  const { users, userLog } = useContext(UserContext);

 const usersfilter = users.some((user) => {
    return user.uid === userLog.uid;
  });

  return (
    <div className="LogInGoogle">
      <p>Welcome to Cristian's social network</p>
      <p>Comparte tus opiniones y pensamientos e interactúa con los posts de los demás usuarios</p>
      <br />
      {userLog.uid.length !== 0 ? (
        <Link to={usersfilter === true ? "/feed" : "/welcome"}>          
          <button className="continueBtn">Continue</button>
        </Link>
      ) : (
        <div className="LogIn" onClick={logInWithGoogle}>
          <div className="googleLogo">
            <img src="./images/googleLogo.svg" alt="" />
          </div>
          <button className="login-btn">Sign in with Google</button>
        </div>
      )}

      <p>© 2022 Devs_United - <span className="red">BETA</span> <br /> Created by Cristian Torres</p>
    </div>
  );
}
export default LogIn;
