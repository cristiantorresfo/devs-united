import { Route, Routes } from "react-router-dom";
import FavoritesPosts from "../../components/FavoritesPosts/FavoritesPosts";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import PostsUsers from "../../components/PostsUser/PostsUser";

function UserProfile() {
  return (
    <div>
      <HeaderProfile />
      <Routes>
        <Route path="/posts" element={<PostsUsers />} />
        <Route path="/favorites" element={<FavoritesPosts />} />
      </Routes>
    </div>
  );
}

export default UserProfile;
