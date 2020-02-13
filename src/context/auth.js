import React, { useState, createContext, useEffect } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    fetchUser()
  }, [])

  const [currentUser, setCurrentUser] = useState(null);
  const fetchUser = () => {
    const user = JSON.parse(localStorage.getItem("chatUser"));
    setCurrentUser(user)
  }

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
