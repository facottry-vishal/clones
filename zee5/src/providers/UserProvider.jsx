import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const children = props.children;

  // Function to set user data upon successful signup
  function signUpContext(userData) {
    // Add logic to set user data upon successful signup
    setUser(userData);
  }

  // Function to set user data and token upon successful login
  function signInContext(authToken, userName) {
    setUser(userName);
    setToken(authToken);
    
  }

  // Function to clear user data and token upon logout
  function signOutContext() {
    setUser(null);
    setToken(null);
  }

  const value = {
    isUserLoggedIn: !!user,
    user,
    token,
    signUpContext,
    signInContext,
    signOutContext,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
