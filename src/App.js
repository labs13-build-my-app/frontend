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
    user,
    isToken,
    isSignedIn,
    isNewUser,
    location,
    isLoading
    // fetch
  } = state;
  const { pathname } = history.location;

  // logging state here
  console.log("STATE", state, isLoading, history.location.state);

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
    console.log("going into this use effect");
    const loadApp = () => {
      if (!isToken && localStorage.getItem("token")) {
        console.log("step 1");
        dispatch({ type: "LOADING_STATUS", payload: { isToken: true } });
      } else if (!isToken && !localStorage.getItem("token") && isLoading) {
        console.log("step 2");
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
        console.log("step 3");
        // dispatch({
        //   type: "LOADING_STATUS",
        //   payload: { isLoading: false, isNewUser: true }
        // });
        fetchUser(localStorage.getItem("token"))(dispatch); //I wonder if I can do a function with a call back and pass in the action with out importing. something to test later
      } else if (isToken && isLoading && role && !isSignedIn) {
        console.log("step 4");
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
      } else if (
        isSignedIn &&
        location === "/callback" &&
        history.location.state !== "logout"
      ) {
        console.log("step 6");
        history.push({
          pathname: `/profile/${user.id}`
        });
      } else if (!isToken && !localStorage.getItem("token") && !isLoading) {
        console.log("step 7");
        // history.push(location); // could push to dynamic location
      } else if (history.location.state === "logout") {
        console.log("this should logout in app");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        history.replace("/home");
        dispatch({
          type: "LOADING_STATUS",
          payload: {
            isSignedIn: false,
            isLoading: false,
            isToken: false,
            role: "",
            user: {}
          }
        });
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
    history.location.state,
    dispatch
  ]);

  return (
    <div className="App">
      <RouteContainer {...{ ...state, dispatch }} />
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
