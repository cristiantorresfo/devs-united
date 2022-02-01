import Posts from "../components/Posts";
import TypingField from "../components/TypingField";

function Feed ({userLog, setUserLog, USER_INITIAL }) {
    return (
        <div>
            <TypingField userLog={userLog}/>
            <Posts userLog={userLog} setUserLog={setUserLog} USER_INITIAL={USER_INITIAL}/>
        </div>
    )
}

export default Feed;
