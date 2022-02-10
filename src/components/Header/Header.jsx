import "./Header.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

function Header() {
  const { userLog } = useContext(UserContext);
  return (
    <div className="header">
      <img src={userLog.photoURL} alt="photo_user" />
      <img src="./images/logo.png" alt="logo" />
      <img src="./images/logo_name.png" alt="logo_name" />
    </div>
  );
}

export default Header;
