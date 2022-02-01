import { useState } from "react";
import { addPost } from "../firebase";

const INITIAL_FORM_DATA = {
    message: "",
    email: "",
    uid: "",
    autor: "",
  };
function TypingField({userLog}) {

const [newPost, setNewPost] = useState(INITIAL_FORM_DATA);

    const handleChange = (e) => {
        setNewPost(() => {
            return {
              message: e.target.value,
              email: userLog.email,
              uid: userLog.uid,
              autor: userLog.displayName
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
  );
}
export default TypingField;
