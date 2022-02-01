import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import { ColorProvider } from "./contexts/ColorContext";
import { auth, db } from "./firebase";
import Feed from "./pages/Feed";
import LoggedOut from "./pages/LoggedOut";
import Welcome from "./pages/Welcome";

const USER_INITIAL = {
  uid: "",
};
function App() {
  const [userLog, setUserLog] = useState(USER_INITIAL);
  const [posts, setPosts] = useState([]);

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
  }, [setUserLog]);

  return (
    <ColorProvider>
      <div className="App">
        {userLog.uid.length === 0 ? (
          <LoggedOut />
        ) : (
          <Feed userLog={userLog} setPosts={setPosts} posts={posts} />
        )}
        <Welcome />
      </div>
    </ColorProvider>
  );
}

export default App;
