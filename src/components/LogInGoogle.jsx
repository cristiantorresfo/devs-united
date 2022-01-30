import "./LogInGoogle.css"
import { logInWithGoogle, logout } from "../firebase";

function LogInGoogle({userLog }) {
  return (
    <div className="LogIn">
      {userLog.uid.length !== 0 ? (
        <div className="user-profile">
          <img  src={userLog.photoURL} alt="" />
          <p>¡Hola {userLog.displayName}!</p>
          <button onClick={logout}>Log out</button>
        </div>
      ) : (
        <button className="login-btn" onClick={logInWithGoogle}>
          Login con Google
        </button>
      )}
    </div>
  );
}
export default LogInGoogle;
