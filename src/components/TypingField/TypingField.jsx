import "./TypingField.css"
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
function TypingField() {
  const [newPost, setNewPost] = useState(INITIAL_FORM_DATA);
  const { userLog } = useContext(UserContext);

  const handleChange = (e) => {
    setNewPost(() => {
      return {
        message: e.target.value,
        email: userLog.email,
        uid: userLog.uid,
        autor: userLog.displayName,
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
      <Link to="/">
        <button onClick={logout}>Log out</button>
      </Link>

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
