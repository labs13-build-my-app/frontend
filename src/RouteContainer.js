import React from "react";
import { Route, withRouter, Redirect } from "react-router";

const RouteContainer = ({
  isLoading,
  isToken,
  isSignedIn,
  isNewUser,
  fetch,
  error,
  role,
  user,
  dispatch
}) => {
  const state = {
    isLoading,
    isToken,
    isSignedIn,
    isNewUser,
    fetch,
    error,
    role,
    user,
    dispatch
  };
  return (
    <>
      <Route path={"/"} render={props => <Home {...props} {...state} />} />

      <Route
        path={"/profile/:user_id"}
        render={props => <ProfileContainer {...props} {...state} />}
      />

      <Route
        path={"/projects/proposls"}
        render={props => <Projects {...props} {...state} />}
      />

      <Route
        path={"/projects/project/:project_id"}
        render={props => <Project {...props} {...state} />}
      />

      <Route
        path={"/projects/plan/:plan_id"}
        render={props => <Plan {...props} {...state} />}
      />
    </>
  );
};

export default RouteContainer;
