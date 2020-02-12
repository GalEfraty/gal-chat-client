import React, { useState, createContext } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const changeUser = (newUser) =>{
      setCurrentUser(newUser)
  }

  return (
    <authContext.Provider
      value={{
        currentUser,
        changeUser
      }}
    >
      {children}
    </authContext.Provider>
  );
};
