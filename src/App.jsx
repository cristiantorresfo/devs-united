import { useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import TypingField from "./components/TypingField";
import Feed from "./pages/Feed";
// import { useEffect, useState } from "react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db, auth } from "./firebase";
// import Posts from "./components/Posts";
// import LogIn from "./components/LogIn";
import LoggedOut from "./pages/LoggedOut";
import Welcome from "./pages/Welcome";



const USER_INITIAL = {
  uid: "",
};
function App() {
  
  const [userLog, setUserLog] = useState(USER_INITIAL);


  return (
    <div className="App">
      <LoggedOut/>
      <Welcome/>
      <Feed userLog={userLog} setUserLog={setUserLog} USER_INITIAL={USER_INITIAL}/>
      

      {/* <LogIn userLog={userLog} />
      {userLog.uid.length !== 0 ? (
        <Posts
          posts={posts}
          setPosts={setPosts}
          userLog={userLog}
          newPost={newPost}
          setNewPost={setNewPost}
          INITIAL_FORM_DATA={INITIAL_FORM_DATA}
        />
      ) : null} */}
    </div>
  );
}

export default App;
