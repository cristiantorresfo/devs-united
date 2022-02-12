import "./PostsUser.css"
import { useContext } from "react";
import { PostsContext } from "../../contexts/PostsContext";
import { UserContext } from "../../contexts/UserContext";
import { deletePost } from "../../firebase";

function PostsUsers() {
  const { posts, setPosts } = useContext(PostsContext);
  const { users, userLog } = useContext(UserContext);

    const handlerDelete = (e) => {
      deletePost(e.target.id).then((id) => {
        const newPosts = posts.filter((post) => {
          return post.id !== id;
        });
        setPosts(newPosts);
      });
    };

    // const likePost = (id, fav, likes = 0) => {
    //   !fav
    //     ? updatePost(id, { fav: true, likes: likes + 1 })
    //     : updatePost(id, { fav: false, likes: likes - 1 });
    // };

  const postsFiltered = posts.filter(
    (post) => post.uid === userLog.uid && !post.fav
  );
  console.log(postsFiltered);

  return (
    <div className="containerPostsUser">
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

                  {userLog?.uid === post.uid ? (
                    <img
                      src="../images/delete.svg"
                      id={post.id}
                    onClick = {handlerDelete}
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
                        ? "../images/corazonFav.svg"
                        : "../images/corazonUnFav.svg"
                    }
                    alt="logo_fav"
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

export default PostsUsers;
