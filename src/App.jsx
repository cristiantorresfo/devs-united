import { useContext,  useEffect,  useState } from "react";
import "./App.css";
import { ColorProvider } from "./contexts/ColorContext";
import { UserContext } from "./contexts/UserContext";
import { auth } from "./firebase";
import Feed from "./pages/Feed/Feed";
import LoggedOut from "./pages/LoggedOut/LoggedOut";
import Welcome from "./pages/Welcome/Welcome";


function App() {
  const [nextPage, setNextPage] = useState(false);
  const [username, setUsername] = useState("");
  const {userLog} = useContext(UserContext)

  const {setUserLog, USER_INITIAL} = useContext(UserContext)

  useEffect(()=>{
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserLog(user || USER_INITIAL);
    })
      return () => {unsubscribeAuth()}
  },[USER_INITIAL, setUserLog])

  return (
    <ColorProvider>      
          <div className="App">
            {userLog.uid.length === 0 ? (
              <LoggedOut setNextPage={setNextPage}/>
            ) : nextPage ? (
              <Feed username={username}/>
            ) : (
              <Welcome username={username} setUsername={setUsername} setNextPage={setNextPage} />
            )}
          </div>
    </ColorProvider>
  );
}

export default App;
