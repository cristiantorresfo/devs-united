import Posts from "../components/Posts";
import TypingField from "../components/TypingField";

function Feed ({userLog,  posts, setPosts }) {
    return (
        <div>
            <TypingField userLog={userLog}/>
            <Posts userLog={userLog}  setPosts={setPosts} posts={posts}/>
        </div>
    )
}

export default Feed;
