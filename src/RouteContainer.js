import React from "react";
import { Route, Redirect } from "react-router";
import Home from "./components/Home";
import ProfileContainer from "./components/profiles/ProfileContainer";
import Projects from "./components/projects/Projects";
import Project from "./components/projects/Project";
// import Plan from "./components/projects/plan";

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

  const CTA = <h1>CTA</h1>;
  return (
    <>
      {/* Home component can be renamed to Dashboard */}
      {/* <Route path={"/"} render={props => <Home {...props} {...state} />} /> */}

      {/* can add a marketing Routing component for home */}
      {/* <Route path={"/home"} component={CTA} /> */}

      <Route
        path={"/profile/:user_id"}
        render={props => <ProfileContainer {...props} {...state} />}
      />

      <Route
        path={"/projects/proposls"}
        render={props => <Projects {...props} {...state} />}
      />

      <Route
        path={"/project/:project_id"}
        render={props => <Project {...props} {...state} />}
      />

      {/* <Route
        path={"/plan/:plan_id"}
        render={props => <Plan {...props} {...state} />}
      /> */}
    </>
  );
};

export default RouteContainer;
