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
    <div className="user-profile">
      <img src={userLog.photoURL} alt="photoUser" />
      <Link to="/">
        <button onClick={logout}>Log out</button>
      </Link>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="30"
          className="itemInput"
          onChange={handleChange}
          type="text"
          placeholder="Message here..."
          value={newPost.message}
        />
        <br />
        <button>Enviar</button>
      </form>
    </div>
  );
}
export default TypingField;
