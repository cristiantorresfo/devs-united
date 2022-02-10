import "./TypingField.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { addPost, logout } from "../../firebase";

const INITIAL_FORM_DATA = {
  message: "",
  email: "",
  uid: "",
  autor: "",
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const getShortMonthName = function (date) {
  return monthNames[date.getMonth()].substring(0, 3);
};
const fecha = new Date();

const fechaPost = `- ${fecha.getDate()} ${getShortMonthName(fecha)}`;

function TypingField() {
  const [newPost, setNewPost] = useState(INITIAL_FORM_DATA);
  const { userLog } = useContext(UserContext);

  console.log(fechaPost);

  const handleChange = (e) => {
    setNewPost(() => {
      return {
        message: e.target.value,
        email: userLog.email,
        uid: userLog.uid,
        autor: userLog.displayName,
        fecha: fechaPost,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(newPost).then(() => {
      setNewPost(INITIAL_FORM_DATA);
    });
  };
  return (
    <div className="typingField">
      <img src={userLog.photoURL} alt="photoUser" />
      <form onSubmit={handleSubmit}>
        <textarea
          maxLength="200"
          rows="4"
          cols="30"
          className="itemInput"
          onChange={handleChange}
          type="text"
          placeholder="What's happening?"
          value={newPost.message}
        />
        <br />
        <div className="containerSubmit">
          <p>200 max.</p>
          <button>POST</button>
        </div>
      </form>
    </div>
  );
}
export default TypingField;
