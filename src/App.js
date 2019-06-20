import React, { useEffect, useReducer } from "react";
import store from "./store";
import { withRouter } from "react-router";
import { locationRestore, fetchUser } from "./store/actions";
import NavContainer from "./components/NavContainer";
import RouteContainer from "./components/RouteContainer";
import ModalContainer from "./components/ModalContainer";
import { Background } from "./custom-styles";

import "./App.css";

// complete routing
// must implement propTypes for testing
// review state and actions

// routes should only load data when isLoading is false
// login and sign up changes isloading from false back to true

const App = ({ history, match }) => {
  // step 1 set initial state
  const [state, dispatch] = useReducer(store.usersReducer, store.initialState);
  const { modal, reload } = history.location.state || false;
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
  console.log("STATE", state, isLoading, history.location.state, pathname);

  useEffect(() => {
    if (
      pathname !== location &&
      pathname !== "/login" &&
      pathname !== "/signup" &&
      // pathname !== "/callback" &&
      pathname !== undefined &&
      isToken === false
    ) {
      locationRestore(pathname, dispatch);
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
        fetchUser(localStorage.getItem("token"), dispatch); //I wonder if I can do a function with a call back and pass in the action with out importing. something to test later
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
      } else if (
        isToken &&
        !isLoading &&
        !role &&
        !isSignedIn &&
        isNewUser &&
        history.location.state !== "logout"
      ) {
        history.push("/signup");
      } else if (
        isSignedIn &&
        location === "/callback" &&
        history.location.state !== "logout" &&
        !modal
      ) {
        history.push({
          pathname: `/profile/${user.id}`
        });
      } else if (!isToken && !localStorage.getItem("token") && !isLoading) {
        // history.push(location); // could push to dynamic location
      } else if (history.location.state === "logout") {
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
    user.id,
    isToken,
    isLoading,
    isSignedIn,
    isNewUser,
    role,
    userID,
    location,
    history,
    history.location.state,
    modal,
    dispatch
  ]);

  return (
    <Background>
      <div
        onClick={() => {
          return modal === true
            ? history.push({ state: { modal: false } })
            : null;
        }}
        className="App"
      >
        <NavContainer {...state} />
        <div className="content-wrapper">
          <RouteContainer {...{ ...state, dispatch, reload }} />
          {modal ? (
            <ModalContainer
              {...{
                ...state,
                ...history.location.state,
                dispatch,
                history,
                match
              }}
            />
          ) : null}
        </div>
      </div>
    </Background>
  );
};

export default withRouter(App);
