import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import PrivateRoute from "./PrivateRoute";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profile/ProfileForm";
import SignupForm from "../auth/SignupForm";

// All Site Routes Here
// Private Routes are only visible to authorized users.
// Non-existent routes are redirected to the homepage. 

function Routes({ login, signup }) {

  return (
    <div className="pt-5">
      <Switch>
        
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute>
        
        <PrivateRoute exact path="/jobs">
          <JobList />
        </PrivateRoute>

        <PrivateRoute exact path="/companies/:handle">
          <CompanyDetail />
        </PrivateRoute>

        <PrivateRoute path="/profile">
          <ProfileForm />
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  )
}


export default Routes;
