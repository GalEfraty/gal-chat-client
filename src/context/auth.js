import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  const [currentUser, setCurrentUser] = useState(null);
  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("chatUser"));
    if (user) {
      const result = await axios.get(
        `https://gal-chat-server.herokuapp.com/api/users/findUser/${user.id}`
      );
      if (!result.data) {
        return localStorage.removeItem("chatUser");
      }
    }

    setCurrentUser(user);
  };

  const changeUser = newUser => {
    setCurrentUser(newUser);
  };

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
