import "./HeaderProfile.css";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { logout } from "../../firebase";
import { Link } from "react-router-dom";

function HeaderProfile() {
  const { userLog, users } = useContext(UserContext);
  const [isActive ,setIsActive] = useState(true)

  const headerUsername = users.map((user) => {
    return (
      user.uid === userLog.uid && (
        <p key={user.uid} className="headerUsername">
          {user.username}
        </p>
      )
    );
  });
  const profileUsername = users.map((user) => {
    return (
      user.uid === userLog.uid && (
        <span
          key={user.uid}
          className="profileUsername"
          style={{ backgroundColor: user.color }}
        >
          {user.username}
        </span>
      )
    );
  });

  const photoProfile = users.map((user) => {
    return (
      user.uid === userLog.uid && (
        <img
        key = {user.uid}
          className="photoUser"
          style={{
            borderWidth: "5px",
            borderStyle: "solid",
            borderColor: user.color,
          }}
          src={userLog.photoURL}
          alt="photo_user"
        />
      )
    );
  });

  return (
    <div>
      <div className="headerProfile">
        <Link to ="/feed" >
        <img className="back" src="../images/back.svg" alt="back" />
        </Link>
        {headerUsername}
        <Link to="/">
          <button className="logout" onClick={logout}>
            <p>LOGOUT</p>
            <img src="../images/logout.svg" alt="logo" />
          </button>
        </Link>
      </div>
      <div className="dataProfile">
        {photoProfile}
        {profileUsername}
        <div>
          <Link to= "posts">
            <button className={isActive ? "activeBtn" : "inactiveBtn"} onClick={() => setIsActive(!isActive)}  >POSTS</button>
          </Link>
          <Link to ="favorites">
          <button className={!isActive ? "activeBtn" : "inactiveBtn"} onClick={() => setIsActive(!isActive)}>FAVORITES</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderProfile;
