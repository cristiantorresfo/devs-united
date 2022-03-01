import "./PostsUser.css";
import { useContext } from "react";
import { PostsContext } from "../../contexts/PostsContext";
import { UserContext } from "../../contexts/UserContext";
import { useFavoritePost } from "../../hooks/useFavoritePost";
import { useDeletePost } from "../../hooks/useDeletePost";

function PostsUsers() {
  const { posts } = useContext(PostsContext);
  const { users, userLog } = useContext(UserContext);
  const favoritesPosts = useFavoritePost();
  const handlerDelete = useDeletePost();

  // obtener posts del usuario loguedao
  const postsFiltered = posts.filter((post) => post.uid === userLog.uid);

  //obtener de la coleccion users el que pertenezca al usuario logueado
  const filterUsersByUid = users.filter((user) => {
    return user.uid === userLog.uid;
  });

  return (
    <main className="containerPosts">
      <div className="posts">
        {postsFiltered.length === 0 ? (
          <h4 className="noPosts">No posts yet</h4>
        ) : (
          postsFiltered.map((post) => {
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
                        src="../images/delete.svg"
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
          })
        )}
      </div>
    </main>
  );
}

export default PostsUsers;
