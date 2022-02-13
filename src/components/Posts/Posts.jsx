import "./Posts.css";
import {
  db,
  deletePost,
  getUsers,
  updatePost,
  updateUser,
} from "../../firebase";

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
            date: doc.data().date,
            dateUNIX: doc.data().dateUNIX,
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
  }, []);

  const handlerDelete = (e) => {
    deletePost(e.target.id).then((id) => {
      const newPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPosts);
    });
  };

  const favoritesPosts = (postId, fav, likes) => (e) => {
    users.map((user) => {
      user.uid === userLog.uid &&
        (!user.favorites.includes(postId) ? (
          <>
            {user.favorites.push(postId)}
            {(e.target.src = "./images/corazonFav.svg")}
          </>
        ) : (
          <>
            {
              (user.favorites = user.favorites.filter((fav) => {
                return fav !== postId;
              }))
            }
            {(e.target.src = "./images/corazonUnFav.svg")}
          </>
        ));

      return updateUser(user.id, { favorites: user.favorites });
    });

    !fav.includes(userLog.uid)
      ? fav.push(userLog.uid)
      : (fav = fav.filter((fa) => {
          return fa !== userLog.uid;
        }));

    return updatePost(postId, { fav: fav, likes: fav.length });
  };

  const filterUsersByUid = users.filter((user) => {
    return user.uid === userLog.uid;
  });

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
                    <p>{post.date}</p>
                  </div>

                  {userLog?.uid === post.uid ? (
                    <img
                      src="./images/delete.svg"
                      id={post.id}
                      onClick={handlerDelete}
                      alt="delete_img"
                    />
                  ) : null}
                </div>

                <p className="message">{post.message}</p>

                <div className="likePost">
                  <img
                    height="13px"
                    src={filterUsersByUid.map((user) => {
                      return user.favorites.includes(post.id)
                        ? "./images/corazonFav.svg"
                        : "./images/corazonUnFav.svg";
                    })}
                    alt="logo_fav"
                    onClick={favoritesPosts(post.id, post.fav, post.likes)}
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
