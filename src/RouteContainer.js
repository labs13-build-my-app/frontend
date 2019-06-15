import React from "react";
import { Route } from "react-router";
import Home from "./components/Home";
import ProfileContainer from "./components/profiles/ProfileContainer";
import Projects from "./components/projects/Projects";
import Project from "./components/projects/Project";
import Plan from "./components/projects/Plan";

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
      {/* Home component can be renamed to Dashboard */}
      <Route path={"/"} render={props => <Home {...props} {...state} />} />

      {/* can add a marketing Routing component for home */}
      {!isLoading ? (
        <>
          <Route path={"/home"} render={() => <h1>home component</h1>} />
          <Route
            path={"/profile/:user_id"}
            render={props => <ProfileContainer {...props} {...state} />}
          />

          <Route
            path={"/projects/proposals"}
            render={props => <Projects {...props} {...state} />}
          />

          <Route
            path={"/project/:project_id"}
            render={props => <Project {...props} {...state} />}
          />

          <Route
            path={"/plan/:plan_id"}
            render={props => <Plan {...props} {...state} />}
          />
        </>
      ) : (
        <h1>Loading... </h1>
      )}
    </>
  );
};

export default RouteContainer;
