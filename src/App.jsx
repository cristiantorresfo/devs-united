import "./App.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase";
import Posts from "./components/Posts";
import LogIn from "./components/LogIn";

const INITIAL_FORM_DATA = {
  message: "",
  email: "",
  uid: "",
  autor: "",
};
const USER_INITIAL = {
  uid: "",
};

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(INITIAL_FORM_DATA);
  const [userLog, setUserLog] = useState(USER_INITIAL);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map(
        (doc) => {
          return {
            message: doc.data().message,
            id: doc.id,
            likes: doc.data().likes,
            autor: doc.data().autor,
            email: doc.data().email,
            uid: doc.data().uid,
          };
        },
        (error) => {
          console.log(error, "error de escucha");
        }
      );
      setPosts(postsData);
    });
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserLog(user || USER_INITIAL);
    });
    return () => {
      unsub();
      unsubscribeAuth();
    };
  }, []);

  return (
    <div className="App">
      <LogIn userLog={userLog} />
      {userLog.uid.length !== 0 ? (
        <Posts
          posts={posts}
          setPosts={setPosts}
          userLog={userLog}
          newPost={newPost}
          setNewPost={setNewPost}
          INITIAL_FORM_DATA={INITIAL_FORM_DATA}
        />
      ) : null}
    </div>
  );
}

export default App;
