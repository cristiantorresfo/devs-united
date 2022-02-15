import { createContext, useEffect, useState } from "react";
import { getUsers } from "../firebase";

const USER_INITIAL = {
  uid: "",
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLog, setUserLog] = useState(USER_INITIAL);
  const [users, setUsers] = useState([]);
  const [uidSelected, setUidSelected] = useState("");

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, [setUsers]);

  return (
    <UserContext.Provider
      value={{
        userLog,
        setUserLog,
        USER_INITIAL,
        users,
        setUsers,
        uidSelected,
        setUidSelected,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
