import { Route, Routes } from "react-router-dom";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import Posts from "../../components/Posts/Posts";
import PostsUsers from "../../components/PostsUser/PostsUser";
import "./UserProfile.css";

function UserProfile() {
  return (
    <div>
      <HeaderProfile />
      <Routes>
        <Route path="/posts" element={<PostsUsers />} />
        <Route path="/favorites" element={<Posts />} />
      </Routes>
    </div>
  );
}

export default UserProfile;
