import { useContext } from "react";
import { PostsContext } from "../../contexts/PostsContext";
import { UserContext } from "../../contexts/UserContext";
import { updatePost, updateUser } from "../../firebase";

function OtherUsers() {
  const { posts } = useContext(PostsContext);
  const { users, userLog, uidSelected } = useContext(UserContext);

  const postsFiltered = posts.filter(
    (post) => post.uid === uidSelected && post.uid !== userLog.uid
  );

  const filterUsersByUid = users.filter((user) => {
    return user.uid === userLog.uid;
  });

  const favoritesPosts = (postId, fav) => (e) => {
    users.map((user) => {
      user.uid === userLog.uid &&
        (!user.favorites.includes(postId) ? (
          <>
            {user.favorites.push(postId)}
            {(e.target.src = "../images/corazonFav.svg")}
          </>
        ) : (
          <>
            {
              (user.favorites = user.favorites.filter((fav) => {
                return fav !== postId;
              }))
            }
            {(e.target.src = "../images/corazonUnFav.svg")}
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

  return (
    <main className="containerPosts">
      <div className="posts">
        {postsFiltered.map((post) => {
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

                  {/* {userLog?.uid === post.uid ? (
                    <img
                      src="../images/delete.svg"
                      id={post.id}
                      onClick={}
                      alt="delete_img"
                    />
                  ) : null} */}
                </div>

                <div className="message">{post.message}</div>

                <div className="likePost">
                  <img
                    height="13px"
                    src={filterUsersByUid.map((user) => {
                      return user.favorites.includes(post.id)
                        ? "../images/corazonFav.svg"
                        : "../images/corazonUnFav.svg";
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

export default OtherUsers;
