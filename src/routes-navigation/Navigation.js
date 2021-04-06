import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";

// Website Navigation Bar, which is displayed on every webpage
// Logged In User: Shows links to website pages
// Logged Out User: Shows links login and signup forms

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/companies">
            Companies
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link"  to="/jobs">
            Jobs
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link"  to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={logout}>
            Log Out {currentUser.firstName || currentUser.username}
          </Link>
        </li>
      </ul>
    )
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    )
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation; 
