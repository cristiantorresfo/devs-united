import "./Posts.css";
import { db, deletePost, getUsers, updatePost } from "../../firebase";

import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { PostsContext } from "../../contexts/PostsContext";
import { collection, onSnapshot } from "firebase/firestore";

function Posts() {
  const { users, setUsers, userLog } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostsContext);

  useEffect(() => {
    getUsers().then((data) => {
      console.log(data);
      setUsers(data);
    });
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
            uid: doc.data().uid,
            fecha: doc.data().fecha,
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

  const likePost = (id, fav, likes = 0) => {
    !fav
      ? updatePost(id, { fav: true, likes: likes + 1 })
      : updatePost(id, { fav: false, likes: likes - 1 });
  };

  return (
    <div className="containerPosts">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              {users.map((user) => {
                return (
                  user.email === post.email && (
                    <div key={user.uid}>
                      <img
                        className="photo_user"
                        src={user.photo}
                        alt="photo_user"
                      />
                    </div>
                  )
                );
              })}
              <div>
                <div className="container">
                  <div className="containerUsername">
                    {users.map((user) => {
                      return (
                        user.email === post.email && (
                          <p
                            key={user.uid}
                            className="username"
                            style={{ backgroundColor: user.color }}
                          >
                            {user.username}
                          </p>
                        )
                      );
                    })}
                    <p>{post.fecha}</p>
                  </div>

                  {userLog?.uid === post.uid ? (
                    <img
                      src="./images/delete.svg"
                      id={post.id}
                      onClick={handlerDelete}
                      assName="delete actionBtn"
                      alt="delete_img"
                    />
                  ) : null}
                </div>

                <p className="message">{post.message}</p>

                <div className="likePost">
                  <img
                    height="13px"
                    src={
                      post.fav
                        ? "./images/corazonFav.svg"
                        : "./images/corazonUnFav.svg"
                    }
                    alt={post.id}
                    onClick={() => likePost(post.id, post.fav, post.likes)}
                  />
                  <span>{post.likes ? post.likes : 0}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Posts;
