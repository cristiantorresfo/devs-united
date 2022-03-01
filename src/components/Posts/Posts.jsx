import "./Posts.css";
import { deletePost, updatePost, updateUser } from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { PostsContext } from "../../contexts/PostsContext";
import { Link } from "react-router-dom";
import { useFavoritePost } from "../../hooks/useFavoritePost";

function Posts() {
  const { users, userLog, setUidSelected } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostsContext);
  const favoritesPosts = useFavoritePost()

  const handlerDelete = (e) => {
    window.confirm("Are you sure you want to delete this post?") && 
    deletePost(e.target.id).then((id) => {
      const newPosts = posts.filter((post) => {
        return post.id !== id;
      });
      setPosts(newPosts);
    });
  };

  const handleSendUid = (uid) => {
    setUidSelected(uid);
  };

  const postsSortByDate = posts.sort((a, b) => b.dateUNIX - a.dateUNIX);
  
  const filterUsersByUid = users.filter((user) => {
    return user.uid === userLog.uid;
  });

  return (
    <main className="containerPosts">
      <div className="posts">
        {postsSortByDate.map((post) => {
          return (
            <div className="post" key={post.id}>
              {users.map((user) => {
                return (
                  user.email === post.email && (
                    <div key={user.uid}>
                      <Link
                        to={
                          post.uid === userLog.uid
                            ? "/profile/posts"
                            : `/user/${user.username}`
                        }
                      >
                        <img
                          className="photo_user"
                          src={user.photo}
                          onClick={() => handleSendUid(post.uid)}
                          alt="photo_user"
                        />
                      </Link>
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

                <div className="message">{post.message}</div>

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
    </main>
  );
}
export default Posts;
