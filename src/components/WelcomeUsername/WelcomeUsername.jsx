import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ColorContext } from "../../contexts/ColorContext";
import { UserContext } from "../../contexts/UserContext";
import { addUser } from "../../firebase";
import ColorPicker from "../ColorPicker/ColorPicker";
import "./WelcomeUsername.css";

const INITIAL_DATA = {
  username: "",
  email: "",
  uid: "",
  autor: "",
  photo: "",
};

function WelcomeUsername() {
  const { userLog, users } = useContext(UserContext);
  const { color } = useContext(ColorContext);
  const [newUsername, setNewUsername] = useState(INITIAL_DATA);

  const handleChangeUsername = (e) => {
    setNewUsername(() => {
      return {
        username: e.target.value.toUpperCase(),
        email: userLog.email,
        uid: userLog.uid,
        autor: userLog.displayName,
        photo: userLog.photoURL,
        color: color.hex,
        favorites: [],
      };
    });
  };
  const validationUsername = users.some((user) => {
    return user.username === newUsername.username;
  });
  const validationUser = users.some((user) => {
    return user.uid === userLog.uid;
  });
  const handleSubmitUsername = () => {
    validationUser &&
      window.alert("This user already have a username registered");

    newUsername.username.length === 0
      ? window.alert("Please type a username before continue")
      : !validationUsername && addUser(newUsername);
  };

  return (
    <div className="welcomeName">
      <p>
        Welcome <span style={{ color: color.hex }}>{newUsername.username}</span>
      </p>
      <input
        type="text"
        name="username"
        placeholder="Type your username"
        onChange={handleChangeUsername}
        value={newUsername.username}
      />
      <p className="selectColor">Select your favorite color: {color.name}</p>
      <ColorPicker />
      <br />
      <Link
        to={newUsername.username.length !== 0 && !validationUsername && "/feed"}
      >
        <button className="continueBtn" onClick={handleSubmitUsername}>
          Continue
        </button>
      </Link>
      ;
    </div>
  );
}

export default WelcomeUsername;
