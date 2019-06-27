import React, { useEffect, useReducer, useState } from "react";
import store from "./store";
import { withRouter } from "react-router";
import { locationRestore, fetchUser } from "./store/actions";
import NavContainer from "./components/NavContainer";
import RouteContainer from "./components/RouteContainer";
import ModalContainer from "./components/ModalContainer";
import { Background } from "./custom-styles";

import "./App.css";

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
  } = state;
  const { pathname } = history.location;

  const [displayNav, setDisplayNav] = useState({
    nav: false,
    width: "75%",
    marginLeft: "25%"
  });

  useEffect(() => {
    if (
      pathname !== location &&
      pathname !== "/login" &&
      pathname !== "/signup" &&
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
        });
      } else if (isToken && isLoading && !role && !isSignedIn && !isNewUser) {
        fetchUser(localStorage.getItem("token"), dispatch);
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
    <div className="App">
      <NavContainer
        {...state}
        displayNav={displayNav}
        setDisplayNav={setDisplayNav}
      />

      <Background displayNav={displayNav}>
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
      </Background>
    </div>
  );
};

export default withRouter(App);
