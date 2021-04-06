import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import JoblyApi from "./api/api";
import Routes from "./routes-navigation/Routes"
import Navigation from "./routes-navigation/Navigation";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";
import LoadingSpinner from "./common/LoadingSpinner";

// The Jobly Application
// App -> Routes

// currentUser: Is an object from the API, that determines if a user is logged in, 
// will be used via context throughout the app

// token: Is for logged in users, also their authentication JWT; Required to be set for 
// most API calls; read from localStorage and used based on the hook. Acts a the dependency forthe effect.
export const LOCAL_STORAGE_TOKEN_ID = "jobly-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_TOKEN_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]))


  // From API, load user info; will only run if user is logged in and has token;
  // Will re-run when user logs out
  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if(token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications))
        } catch (errors) {
          console.error("Problems loading user info.", errors);
          setCurrentUser(null)
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  // Handles site-wide signup
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData); 
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Signup Failed.", errors);
      return { success: false, errors };
    }
  }

  // Handles site-wide login
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Login Failed.", errors);
      return { success: false, errors };
    }
  }

  // Handles site-wide logout
  function logout() {
    setCurrentUser(null);
    setToken(null)
  }

  // Checks to make sure if job has been apploed for
  function appliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    if(appliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if(!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
     <UserContext.Provider value={{ currentUser, setCurrentUser, appliedToJob, applyToJob  }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
