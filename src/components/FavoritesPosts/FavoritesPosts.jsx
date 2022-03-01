import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { PostsContext } from "../../contexts/PostsContext";
import { useFavoritePost } from "../../hooks/useFavoritePost";
import { useDeletePost } from "../../hooks/useDeletePost";

function FavoritesPosts() {
  const { users, userLog } = useContext(UserContext);
  const { posts } = useContext(PostsContext);
  const favoritesPosts = useFavoritePost();
  const handlerDelete = useDeletePost();

  const postsFilterByFavorite = []; //array para guardar posts favoritos

  //Se recorren los posts que pertenezcan al usuario logueado y se guardan los que
  // esten incluidos en la base de datos en el campo favorites de la coleccion users.
  users.map((user) => {
    return (
      user.uid === userLog.uid &&
      posts.map((post) => {
        return (
          user.favorites.includes(post.id) && postsFilterByFavorite.push(post)
        );
      })
    );
  });

  const filterUsersByUid = users.filter((user) => {
    return user.uid === userLog.uid;
  });

  return (
    <div className="containerPosts">
      <div className="posts">
        {postsFilterByFavorite.map((post) => {
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
        })}
      </div>
    </div>
  );
}
export default FavoritesPosts;
