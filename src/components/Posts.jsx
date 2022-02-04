import "./Posts.css";
import { deletePost, updatePost } from "../firebase";
import corazon from "../corazon.svg";
import { ColorContext } from "../contexts/ColorContext";
import { useContext, useState } from "react";

function Posts({ userLog, setPosts, posts, username }) {
  const { color } = useContext(ColorContext);
  const [like, setLike] = useState();

  const handlerDelete = (e) => {
    deletePost(e.target.id).then((id) => {
      const newPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPosts);
    });
  };

  const likeUser = (id, likes = 0, uid) => {
    !like
      ? updatePost(id, { likes: likes + 1 })
      : updatePost(id, { likes: likes - 1 });
    setLike(!like)
    console.log(like);
  };
  return (
    <div className="formPosts">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div
              className="post"
              style={{ backgroundColor: color.hex }}
              key={post.id}
            >
              <div className="userMessage">
                <p>{post.username}</p>
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
                  onClick={() => likeUser(post.id, post.likes, post.uid)}
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
