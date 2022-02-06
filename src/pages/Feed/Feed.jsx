import Posts from "../../components/Posts/Posts";
import TypingField from "../../components/TypingField/TypingField";

function Feed({ username }) {
  return (
    <div>
      <TypingField username={username} />
      <Posts username={username} />
    </div>
  );
}

export default Feed;
