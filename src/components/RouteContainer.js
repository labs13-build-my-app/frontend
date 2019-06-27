import React from "react";
import { Route } from "react-router";
import Home from "./Home";
import Dashboard from "./dashboard/Dashboard";
import Developers from "./profiles/DeveloperList";
import Projects from "./projects/Projects";
import ProjectView from "./projects/ProjectView";
import Project from "./projects/Project";
import ProjectsContainer from "./projectTemp/ProjectsContainer";
import Plan from "./projects/Plan";
import Callback from "./Auth/Callback";
import "./Signup.css";
import Signup from "./Signup";

const RouteContainer = ({
  isLoading,
  isToken,
  isSignedIn,
  isNewUser,
  fetch,
  error,
  role,
  user,
  dispatch,
  reload
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
    dispatch,
    reload
  };

  return (
    <>
      {/* Home component  */}
      {/* <Route path={"/"} render={props => <Home {...props} {...state} />} /> */}

      {!isSignedIn && !isLoading ? (
        <>
          {/* this is our auth route that calls auth0 for token */}
          <Route
            path="/callback"
            render={props => <Callback {...props} {...state} />}
          />
          <Route
            path="/signup"
            render={props => <Signup {...props} {...state} />}
          />
        </>
      ) : null}

      {/* can add a marketing Routing component for home */}
      {!isLoading ? (
        <>
          <Route path={"/home"} render={() => <h1>home component</h1>} />

          <Route
            path={"/profile/:user_id"}
            render={props => <Dashboard {...props} {...state} />}
          />

          <Route
            path={"/developers"}
            render={props => <Developers user={user} {...props} {...state} />}
          />

          <Route
            path={"/projects/proposals"}
            render={props => <Projects {...props} {...state} />}
          />

          <Route
            path={"/project/:project_id"}
            render={props => <ProjectView {...props} {...state} />}
          />

          <Route
            path={"/plan/:plan_id"}
            render={props => <Plan {...props} {...state} />}
          />
        </>
      ) : null}
    </>
  );
};

export default RouteContainer;
