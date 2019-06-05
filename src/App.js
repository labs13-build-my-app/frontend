import React, { useEffect, useReducer } from "react";
import store from "./store";
import { Route, withRouter, Redirect, Link } from "react-router";
import axios from "axios";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import User from "./components/User";

import "./App.css";

import Callback from "./components/Auth/Callback";

// import "./App.css";

const App = ({ history }) => {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);

  useEffect(() => {
    const login = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const headers = {
          authorization: token
        };
        axios
          .get("http://localhost:8000/api/account/onboarding/login", headers)
          .then(res => {
            dispatch({ type: "LOGIN_USER_SUCCESS", payload: res.data.role });
            history.pushState("/dashboard");
          })
          .catch(err => {
            console.log(err);
            dispatch({ type: "LOGIN_USER_FAILURE" });
          });
      }
    };
    login();
  }, [history]);

  return (
    <div className="App">
      <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
      <Route path={"/home"} render={props => <Home {...props} />} />
      <Route
        path="/callback"
        render={props => (
          <Callback {...props} dispatch={dispatch} state={state} />
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

      {/* <Link to="/login">
        <button>Login Here</button>
      </Link> */}

      <Route
        path={"/dashboard/:role"}
        render={props => (
          <Dashboard
            {...props}
            user={state.user}
            dispatch={dispatch}
            role={state.role}
          />
        )}
      />
      <Route path={"/home"} render={() => <div>Home</div>} />
    </div>
  );
};

export default withRouter(App);
