import "./Feed.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import TypingField from "../../components/TypingField/TypingField";
import { useContext } from "react";
import { PostsContext } from "../../contexts/PostsContext";
import Loading from "../../components/Loading/Loading";

function Feed() {
  const {isLoading} = useContext(PostsContext);
  return (
    <div className="feed">
      <Header />
      <TypingField />
      {isLoading ? <Loading /> : <Posts />}
    </div>
  );
}

export default Feed;
