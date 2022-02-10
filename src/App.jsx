import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContext } from "./contexts/UserContext";
import { auth } from "./firebase";
import Feed from "./pages/Feed/Feed";
import LoggedOut from "./pages/LoggedOut/LoggedOut";
import Welcome from "./pages/Welcome/Welcome";

function App() {
  const { setUserLog, USER_INITIAL } = useContext(UserContext);

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
        <Route exact path="/" element={<LoggedOut />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
