import React, { useEffect, useReducer } from "react";
import store from "./store";
import { Route, withRouter, Redirect, Link } from "react-router";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import User from "./components/User";
import Auth from "./components/Auth/Auth";

import "./App.css";

import Callback from "./components/Auth/Callback";
let count = 0;

// import "./App.css";
const auth = new Auth();

const App = ({ history, match }) => {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  console.log("count", ++count, state);

  useEffect(() => {
    dispatch({
      type: "RECORD_URL_LOCATION",
      payload: history.location.pathname
    });
    const login = () => {
      const token = localStorage.getItem("token");
      if (!state.role && token) {
        history.push("/callback");
      } else if (state.role) {
        const path = history.location.pathname;
        history.push(path);
      }
    };
    login();
  }, [history, state.role, state.user]);

  return (
    <div className="App">
      <button onClick={() => auth.logout()}>Logout</button>
      <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
      <Route path={"/home"} render={props => <Home {...props} />} />
      <Route
        path="/callback"
        render={props => (
          <Callback {...props} dispatch={dispatch} role={state.role} />
        )}
      />
      <Route
        path={"/signup"}
        render={props => <Signup {...props} dispatch={dispatch} />}
      />
      <Route
        path={"/login"}
        render={props => (
          <Login {...props} dispatch={dispatch} login={state.login} />
        )}
      />
      <Route path={"/get-users-test"} componet={User} />

      <Route
        path={"/dashboard"}
        render={props => (
          <Dashboard
            {...props}
            user={state.user}
            dispatch={dispatch}
            role={state.role}
            isSignedIn={state.isSignedIn}
            token={state.token}
          />
        )}
      />
      <Route path={"/home"} render={() => <div>Home</div>} />
    </div>
  );
};

export default withRouter(App);
