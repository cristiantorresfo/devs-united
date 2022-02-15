import "./LogIn.css";
import { getUsers, logInWithGoogle } from "../../firebase";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

function LogIn() {
  const { users, userLog, setUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, [setUsers]);

  const usersfilter = users.some((user) => {
    return user.uid === userLog.uid;
  });

  return (
    <div className="LogInGoogle">
      <p>Lorem, ipsum dolor.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

      {userLog.uid.length !== 0 ? (
        <Link to={usersfilter === true ? "/feed" : "/welcome"}>
          <br />
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

      <p>© 2022 Devs_United - <span className="red">BETA</span></p>
    </div>
  );
}
export default LogIn;
