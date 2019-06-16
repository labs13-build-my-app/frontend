import React from "react";
import { Route } from "react-router";
import Home from "./Home";
import ProfileContainer from "./profiles/ProfileContainer";
import Developers from "./profiles/DeveloperList";
import Projects from "./projects/Projects";
import Project from "./projects/Project";
import Plan from "./projects/Plan";

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
            path={"/developers"}
            render={props => <Developers {...props} {...state} />}
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
