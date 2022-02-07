import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ColorProvider } from "./contexts/ColorContext";
import { UserContext } from "./contexts/UserContext";
import { auth } from "./firebase";
import Feed from "./pages/Feed/Feed";
import LoggedOut from "./pages/LoggedOut/LoggedOut";
import Welcome from "./pages/Welcome/Welcome";

function App() {
  // const [nextPage, setNextPage] = useState(false);
  // const {userLog} = useContext(UserContext)

  const { userLog,setUserLog, USER_INITIAL } = useContext(UserContext);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserLog(user || USER_INITIAL);
    });
    return () => {
      unsubscribeAuth();
    };
  }, [USER_INITIAL, setUserLog]);

  return (
    <div className="App">
      <Routes>
        {userLog.uid.length === 0 ? (
          <Route exact path="/" element={<LoggedOut />} />
          ):(
            <Route path="/welcome" element={<Welcome />} />
          )

        }
        <Route path="/feed" element={<Feed />} />
      </Routes>

      {/* 
            {userLog.uid.length === 0 ? (
              <LoggedOut setNextPage={setNextPage}/>
            ) : nextPage ? (
              <Feed />
            ) : (
              <Welcome  setNextPage={setNextPage} />
            )} */}
    </div>
  );
}

export default App;
