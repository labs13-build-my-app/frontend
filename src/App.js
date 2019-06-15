import React, { useEffect, useReducer } from "react";
import store from "./store";
import { withRouter } from "react-router";
import { locationRestore, fetchUser } from "./store/actions";
import RouteContainer from "./RouteContainer";

import "./App.css";

// complete routing
// must implement propTypes for testing
// review state and actions

// routes should only load data when isLoading is false
// login and sign up changes isloading from false back to true

const App = ({ history, match }) => {
  // step 1 set initial state
  const [state, dispatch] = useReducer(store.usersReducer, store.initialState);
  const {
    role,
    userID,
    // user,
    isToken,
    isSignedIn,
    isNewUser,
    location,
    isLoading
    // fetch
  } = state;
  const { pathname } = history.location;

  // logging state here
  console.log("STATE", state, isLoading);

  useEffect(() => {
    if (
      pathname !== location &&
      pathname !== "/login" &&
      pathname !== "/signup" &&
      // pathname !== "/callback" &&
      pathname !== undefined &&
      isToken === false
    ) {
      locationRestore(pathname)(dispatch);
    }
  }, [isToken, location, pathname]);

  useEffect(() => {
    const loadApp = () => {
      if (!isToken && localStorage.getItem("token")) {
        dispatch({ type: "LOADING_STATUS", payload: { isToken: true } });
      } else if (!isToken && !localStorage.getItem("token") && isLoading) {
        dispatch({
          type: "LOADING_STATUS",
          payload: {
            isToken: false,
            isLoading: false,
            isSignedIn: false,
            role: "",
            isNewUser: false,
            user: {}
          }
          // history.push("/home");
        });
      } else if (isToken && isLoading && !role && !isSignedIn && !isNewUser) {
        // step 2
        dispatch({
          type: "LOADING_STATUS",
          payload: { isLoading: false, isNewUser: true }
        });
        // fetchUser()(dispatch); //I wonder if I can do a function with a call back and pass in the action with out importing. something to test later
      } else if (isToken && isLoading && role && !isSignedIn) {
        dispatch({
          type: "LOADING_STATUS",
          payload: {
            isToken: true,
            isLoading: false,
            isSignedIn: true,
            isNewUser: false
          }
        });
      } else if (isToken && !isLoading && !role && !isSignedIn && isNewUser) {
        console.log("going to sign up?");
        history.push("/signup");
      } else if (isSignedIn && location === "/callback") {
        history.push({
          pathname: `/profile/${userID}`
        });
      } else if (!isToken && !localStorage.getItem("token") && !isLoading) {
        history.push(location); // could push to dynamic location
      }
    };
    loadApp();
  }, [
    isToken,
    isLoading,
    isSignedIn,
    isNewUser,
    role,
    userID,
    location,
    history,
    dispatch
  ]);

  return (
    <div className="App">
      <RouteContainer {...state} />
      {/* should move routes into a container component to reduce cluter in app component */}

      {/* <Route path={"/create-plan"} render={() => <CreatePlan />} /> */}
      {/* <Route
        path={"/create-plan"}
        render={props => <CreatePlan {...props} user={user} />}
      /> */}

      {/* 
      <Route path={"/get-users-test"} componet={User} /> */}

      {/* <Route
        path={"/admin"}
        render={props => <Admin {...props} dispatch={dispatch} />}
      /> */}

      {/* <Route path={"/get-users-test"} componet={User} /> */}
    </div>
  );
};

export default withRouter(App);
