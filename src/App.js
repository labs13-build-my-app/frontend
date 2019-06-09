import React, { useEffect, useReducer } from "react";
import store from "./store";
import { Route, withRouter, Redirect } from "react-router";
import { saveToken, locationRestore, fetchUser } from "./store/actions";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
import User from "./components/User";
import Projects from "./components/projects/Projects";
import CreatePlan from "./components/CreatePlan";
import CreateProjectForm from "./components/projects/CreateProjectForm"; // <<<<<<<MB

import "./App.css";

const App = ({ history, match }) => {
  // step 1 set initial state
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  const { role, user, token, isSignedIn, newUser, location, isLoading } = state;
  console.log("STATE", state);
  // step one app renders with loading
  // step two after first render location updates with current location of url
  // and token updates true or false if token
  // if no token do nothing
  // if token check for user on database
  // if user on database return role
  const { pathname } = history.location;

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
        fetchUser(localStorage.getItem("token"))(dispatch);
        // step 7 (b) if ID check user exist on database
        // (b) is login process
        // Step 8 (b) if user exist on database send client role and basic user info
        // Step 9 (b) Step 15 (a)  client sets role and basic user info to state -- ex. role:”Project Owner” user: {basic info}
        // Step 10 (b) Step 16 (a) client sets state isSignedIn to true and isLoading to false -- isSignedIn: true, isLoading: false
        // Step 11 (b) client routes user to location from state
        // Step 12 (b) data is loaded for specific url view
      } else if (isSignedIn) {
        history.push(location);
        // } else if (role) {
        //   history.push("/dashboard");
      } else if (newUser) {
        console.log("new user");
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

      <Route path={"/create-plan"} render={() => <CreatePlan />} />

      <Route
        path={"/create-project-form"}
        render={props => <CreateProjectForm dispatch={dispatch} {...props} />}
      />

      <Route
        path={"/projects"}
        render={props => <Projects {...props} dispatch={dispatch} />}
      />

      <Route path={"/get-users-test"} componet={User} />
    </div>
  );
};

export default withRouter(App);
