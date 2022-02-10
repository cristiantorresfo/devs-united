import "./Posts.css";
import { db, deletePost, getUsers, updatePost } from "../../firebase";

import { ColorContext } from "../../contexts/ColorContext";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { PostsContext } from "../../contexts/PostsContext";
import { collection, onSnapshot } from "firebase/firestore";

function Posts() {
  const { color } = useContext(ColorContext);
  const { users, setUsers, userLog } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostsContext);
console.log(users);

useEffect(() => {
  getUsers().then((data) => {
    console.log(data);
    setUsers(data);
  })
}, [setUsers]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map(
        (doc) => {
          return {
            message: doc.data().message,
            id: doc.id,
            fav: doc.data().fav,
            likes: doc.data().likes,
            autor: doc.data().autor,
            email: doc.data().email,
            uid: doc.data().uid
          };
        },
        (error) => {
          console.log(error, "error de escucha");
        }
      );
      setPosts(postsData);
    });

    return () => {
      unsub();
    };
  }, [setPosts]);

  const handlerDelete = (e) => {
    deletePost(e.target.id).then((id) => {
      const newPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPosts);
    });
  };  

  const likePost = (id, fav, likes = 0) =>  {
      
           (!fav
          ? updatePost(id, { fav: true, likes: likes + 1 })
          : updatePost(id, { fav: false, likes: likes - 1 }));
    };

  return (
    <div className="containerPosts">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div
              className="post"
              
              key={post.id}
            >
              {
                users.map ((user) => {
                  return (user.email === post.email &&
                    <div>
                      <img  className="photo_user" src={user.photo} alt="photo_user"/>
                      <p className="username" style={{ backgroundColor: user.color }}>{user.username}</p>

                    </div>
                                      )
                })     
              }
              <div className="userMessage">
                <h3>{post.message}</h3>                
                <p >{post.email}</p>
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

                <img
                  height="13px"
                  src={
                    post.fav
                      ? "./images/corazonFav.svg"
                      : "./images/corazonUnFav.svg"
                  }
                  alt={post.id}
                  onClick={() =>likePost(post.id, post.fav, post.likes)}
                />
                <span>{post.likes ? post.likes : 0}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Posts;
