import React, { useEffect, useReducer } from "react";
import store from "./store";
import { Route, withRouter, Redirect } from "react-router";
import { saveToken, locationRestore, fetchUser } from "./store/actions";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
import User from "./components/User";

import ProjectsContainer from "./components/projects/ProjectsContainer";
import ProfileContainer from "./components/profiles/ProfileContainer";

import Auth from "./components/Auth/Auth";
import Projects from "./components/projects/Projects";

import CreatePlan from "./components/CreatePlan";
import CreateProjectForm from "./components/projects/CreateProjectForm";
import Project from "./components/projects/Project";

import "./App.css";
// complete routing
// must implement propTypes for testing
// review state and actions
const App = ({ history }) => {
  // step 1 set initial state
  const [state, dispatch] = useReducer(store.usersReducer, store.initialState);
  const { role, user, token, isSignedIn, newUser, location, isLoading } = state;
  const { pathname } = history.location;
  console.log("STATE", state);

  // step 3 set location from history.location.pathname  -- ex. location: “/dashboard”
  // on second render
  useEffect(() => {
    if (
      pathname !== location &&
      pathname !== "/login" &&
      pathname !== "/signup" &&
      pathname !== "/callback" &&
      pathname !== undefined &&
      token === null
    ) {
      locationRestore(pathname)(dispatch);
    }
  }, [token, location, pathname]);

  // step 4 token is set to false or true if in localstorage -- ex. token: false
  // on second render
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      // step 5 (b) if token send token to server  -- token: true
      // will render a 3rd time after this
      saveToken(true)(dispatch);
    } else if (token === null) {
      // step 5 (a) if no token stop loading process, set isLoading to false -- isLoading: false
      // will render a 3rd time after this
      saveToken(false)(dispatch);
    }
  }, [token]);

  useEffect(() => {
    const handleLoadingProcess = () => {
      if (!role) {
        // step 6 send token to server retrive user info and role and set to state
        // step 7 (b) if ID check user exist on database
        // (b) is login process
        // Step 8 (b) if user exist on database send client role and basic user info
        fetchUser(localStorage.getItem("token"))(dispatch);
      } else if (isSignedIn) {
        // Step 11 (b) client routes user to location from state
        // Step 12 (b) data is loaded for specific url view
        history.push(location);
      } else if (newUser) {
        history.push("/signup");
      }
    };

    if (token && isLoading) {
      // step 5 (b) --> continue process request to server
      handleLoadingProcess();
    } else if (!token && !isLoading) {
      // Step 5 (a) -b route to homepage  --> step 5 (a) completed
      history.push("/home");
    }
  }, [token, isLoading, location, role, newUser, isSignedIn, history]);

  // step 2 first render
  if (token === null) return <h1>Loading...</h1>;

  return (
    <div className="App">
      {/* should move routes into a container component to reduce cluter in app component */}
      <Route
        path={"/"}
        render={props => (
          <Home
            {...props}
            isSignedIn={isSignedIn}
            token={token}
            role={role}
            dispatch={dispatch}
          />
        )}
      />

      <Route
        path={"/dashboard"}
        render={props =>
          token === false ? (
            <Redirect to={"/home"} />
          ) : (
            <Dashboard
              {...props}
              user={user}
              dispatch={dispatch}
              role={role}
              isSignedIn={isSignedIn}
              token={token}
            />
          )
        }
      />

      <Route
        path={"/dashboard/settings"}
        render={props =>
          isSignedIn === false ? (
            <Redirect to={"/home"} />
          ) : (
            <h1>settings page</h1>
          )
        }
      />

      <Route
        path={"/projects"}
        render={props => (
          <ProjectsContainer {...props} dispatch={dispatch} role={role} />
        )}
      />

      <Route
        path={"/profile"}
        render={props => <ProfileContainer {...props} dispatch={dispatch} />}
      />

      {/* <Route
        path={"/admin"}
        render={props => <Admin {...props} dispatch={dispatch} />}
      /> */}

      {
        // this will moved to projects view
      }
      <Route path={"/create-plan"} render={() => <CreatePlan />} />

      {
        // this will be moved to dashboard view for project owner
      }
      <Route
        path={"/create-project-form"}
        render={props => <CreateProjectForm dispatch={dispatch} {...props} />}
      />


      {
        // only for testing
      }
      <Route path={"/get-users-test"} componet={User} />

      <Route
        exact
        path={"/projects"}
        render={props => <Projects dispatch={dispatch} {...props} />}
      />
      <Route
        path={"/projects/project/:id"}
        render={props => <Project dispatch={dispatch} {...props} />}
      />

    </div>
  );
};

export default withRouter(App);
