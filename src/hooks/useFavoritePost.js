import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { updatePost, updateUser } from "../firebase";


export function useFavoritePost() {

const { users, userLog } = useContext(UserContext);

    const favoritesPosts =  (postId, fav) => (e) => {
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
        }

        return favoritesPosts;
}
