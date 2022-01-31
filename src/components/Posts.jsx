import "./Posts.css";
import { addPost, deletePost, updatePost } from "../firebase";
import corazon from "../corazon.svg";

function Posts({
  posts,
  setPosts,
  newPost,
  setNewPost,
  INITIAL_FORM_DATA,
  userLog,
}) {
  const handleChange = (e) => {
    const newPost = {
      message: e.target.value,
      email: userLog.email,
      uid: userLog.uid,
      autor: userLog.displayName,
    };
    setNewPost(newPost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(newPost).then(() => {
      setNewPost(INITIAL_FORM_DATA);
    });
  };
  const handlerDelete = (e) => {
    deletePost(e.target.id).then((id) => {
      const newPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPosts);
    });
  };

  const likeUser = (id, likes = 0) => {
    updatePost(id, {
      likes: likes + 1,
    });
  };
  return (
    <div>
      <h1>Hello USERS</h1>
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
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="userMessage">
                <h3>{post.message}</h3>
                <p>{post.autor}</p>
                <p>{post.email}</p>
              </div>
              <div>
                {userLog?.uid === post.uid ? (
                  <button
                    id={post.id}
                    onClick={handlerDelete}
                    className="delete actionBtn"
                  >
                    Eliminar
                  </button>
                ) : null}
                <button
                  className="actionBtn"
                  onClick={() => likeUser(post.id, post.likes)}
                >
                  <img height="13px" src={corazon} alt="" />
                  <span>{post.likes ? post.likes : 0}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Posts;
