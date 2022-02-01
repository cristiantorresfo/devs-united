import "./LogIn.css";
import { logInWithGoogle } from "../firebase";

function LogIn() {
  return (
      <div className="LogInGoogle">
        <p>Lorem, ipsum dolor.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="LogIn" onClick={logInWithGoogle}>
          <div className="googleLogo">
            <img src="./images/googleLogo.svg" alt="" />
          </div>
          <button className="login-btn">Log in with Google</button>
        </div>
        <p>© 2022 Devs_United - BETA</p>
      </div>
  )
  }
export default LogIn;

// userLog.uid.length !== 0 ? (
//   <div className="user-profile">
//     <img src={userLog.photoURL} alt="" />
//     <p>¡Hola {userLog.displayName}!</p>
//     <button onClick={logout}>Log out</button>
//   </div>
// )
