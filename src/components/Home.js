import React from "react";
import { Route, Redirect } from "react-router";
import Callback from "./Auth/Callback";
import Signup from "./Signup";
import NavContainer from "./NavContainer";
import CreateProjectForm from "./projects/CreateProjectForm";

const Home = ({
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
  // if (isLoading) return <h1>Loading...2.0</h1>; wrong place for loading

  return (
    <div>
      {/* can implement a componet to to conditionall render when in loading state to render a loading status */}
      {/* this is our navigation component always render or can be conditionally rendered when isloading is false */}
      <NavContainer {...state} />

      {!isSignedIn && !isLoading ? (
        <>
          {/* this is our auth route that calls auth0 for token */}
          <Route
            path="/callback"
            render={props => <Callback {...props} {...state} />}
          />
          {/* this is our auth route that takes us to our signup page */}
          <Route
            path={"/signup"}
            render={props => <Signup {...props} {...state} />}
          />
        </>
      ) : null}

      {role === "Project Owner" ? (
        <Route
          path={"create-project-form"}
          render={props => <CreateProjectForm {...props} {...state} />}
        />
      ) : null}

      {/*  404 page not found not home */}
      {/* <Redirect to={"/home"} /> */}
    </div>
  );
};
export default Home;
