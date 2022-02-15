import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

function HeaderUser() {
  const { users, uidSelected } = useContext(UserContext);

  const headerUsername = users.map((user) => {
    return (
      user.uid === uidSelected && (
        <p key={user.uid} className="headerUsername">
          {user.username}
        </p>
      )
    );
  });
  const profileUsername = users.map((user) => {
    return (
      user.uid === uidSelected && (
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
      user.uid === uidSelected && (
        <img
          key={user.uid}
          className="photoUser"
          style={{
            borderWidth: "5px",
            borderStyle: "solid",
            borderColor: user.color,
          }}
          src={user.photo}
          alt="photo_user"
        />
      )
    );
  });

  return (
    <div>
      <div className="headerProfile">
        <Link to="/feed">
          <img className="back" src="../images/back.svg" alt="back" />
        </Link>
        {headerUsername}
      </div>
      <div className="dataProfile">
        {photoProfile}
        {profileUsername}
      </div>
    </div>
  );
}

export default HeaderUser;
