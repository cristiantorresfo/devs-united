import "./Posts.css";
import {auth, db, deletePost, updatePost } from "../firebase";
import corazon from "../corazon.svg";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";


function Posts({userLog, setUserLog, USER_INITIAL}) {

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map(
        (doc) => {
          return {
            message: doc.data().message,
            id: doc.id,
            likes: doc.data().likes,
            autor: doc.data().autor,
            email: doc.data().email,
            uid: doc.data().uid,
          };
        },
        (error) => {
          console.log(error, "error de escucha");
        }
      );
      setPosts(postsData);
    });
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserLog(user || USER_INITIAL);
    });
    return () => {
      unsub();
      unsubscribeAuth();
    };
  }, []);
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
    <div className="formPosts">
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
