import Posts from "../components/Posts";
import TypingField from "../components/TypingField";

function Feed ({userLog,  posts, setPosts, username}) {
    return (
        <div>
            <TypingField userLog={userLog} username={username}/>
            <Posts userLog={userLog}  setPosts={setPosts} posts={posts} username={username}/>
        </div>
    )
}

export default Feed;
