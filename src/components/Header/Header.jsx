import "./Header.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

function Header() {
  const { userLog } = useContext(UserContext);
  return (
    <header className="header">
      <Link to = "/profile/posts" >
      <img src={userLog.photoURL} alt="photo_user" />
      </Link>
      <img src="./images/logo.png" alt="logo" />
      <img src="./images/logo_name.png" alt="logo_name" />
    </header>
  );
}

export default Header;
