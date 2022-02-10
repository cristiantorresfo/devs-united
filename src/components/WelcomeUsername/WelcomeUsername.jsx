import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ColorContext } from "../../contexts/ColorContext";
import { UserContext } from "../../contexts/UserContext";
import { addUser, getUsers } from "../../firebase";
import ColorPicker from "../ColorPicker/ColorPicker";
import "./WelcomeUsername.css";

const INITIAL_DATA = {
  username: "",
  email: "",
  uid: "",
  autor: "",
};

function WelcomeUsername() {
  const { userLog, setUsers } = useContext(UserContext);
  const { color } = useContext(ColorContext);
  const [newUsername, setNewUsername] = useState(INITIAL_DATA);

  useEffect(() => {
    getUsers().then((data) => {
      console.log(data);
      setUsers(data);
    });
  }, [setUsers]);

  const handleChangeUsername = (e) => {
    const newUser = {
      username: e.target.value,
      email: userLog.email,
      uid: userLog.uid,
      autor: userLog.displayName,
      photo: userLog.photoURL,
      color: color.hex,
    };

    setNewUsername(newUser);
  };

  const handleSubmitUsername = (e) => {
    addUser(newUsername);
  };

  return (
    <div className="welcomeName">
      <p>
        Welcome <span>{userLog.displayName}</span>
      </p>
      <input
        type="text"
        name="username"
        placeholder="Type your username"
        onChange={handleChangeUsername}
        value={newUsername.username}
      />
      <p>Select your favorite color</p>
      <ColorPicker />
      <Link to="/feed">
        <br />
        <button className="continueBtn" onClick={handleSubmitUsername}>
          Continue
        </button>
      </Link>
      ;
    </div>
  );
}

export default WelcomeUsername;
