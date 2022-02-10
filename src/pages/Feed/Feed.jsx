import "./Feed.css"
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import TypingField from "../../components/TypingField/TypingField";

function Feed() {
  return (
    <div className="feed">
      <Header/>
      <TypingField  />
      <Posts  />
    </div>
  );
}

export default Feed;
