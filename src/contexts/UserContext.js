import { createContext, useState } from "react";


const USER_INITIAL = {
    uid: ""
  };

export const UserContext = createContext();


export const UserProvider = ({ children }) => {

    const [userLog, setUserLog] = useState(USER_INITIAL);

  return (
    <UserContext.Provider value={{ userLog, setUserLog, USER_INITIAL }}>
      {children}
    </UserContext.Provider>
  );
};