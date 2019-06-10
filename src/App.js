import React, { useEffect, useReducer } from "react";
import store from "./store";
import { Route, withRouter, Redirect, Link } from "react-router";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import User from "./components/User";
import Auth from "./components/Auth/Auth";
import Projects from "./components/projects/Projects";
import CreatePlan from "./components/CreatePlan";
import CreateProjectForm from "./components/projects/CreateProjectForm";
import Project from "./components/projects/Project";

import "./App.css";

import Callback from "./components/Auth/Callback";
let count = 0;

// import "./App.css";
const auth = new Auth();

const App = ({ history, match }) => {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  const { role, user, login, token, isSignedIn, signup } = state;
  console.log("STATE", state);
  useEffect(() => {
    dispatch({
      type: "RECORD_URL_LOCATION",
      payload: history.location.pathname
    });
    const token = localStorage.getItem("token");
    const login = () => {
      const token = localStorage.getItem("token");
      console.log("APP", signup, token, role);
      if (signup && token && role) {
        history.push("/dashboard");
      } else if (signup && token) {
        history.push("/signup");
      } else if (!role && token && !signup) {
        console.log("CALLBACK ON APP");
        history.push("/callback");
      } else if (role) {
        const path = history.location.pathname;
        history.push(path);
      }
    };
    login();
  }, [history, role, user, signup]);

  return (
    <div className="App">
      <button onClick={() => auth.logout()}>Logout</button>
      <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
      <Route path={"/home"} render={props => <Home {...props} />} />
      <Route
        path="/callback"
        render={props => (
          <Callback {...props} dispatch={dispatch} role={role} />
        )}
      />
      <Route
        path={"/signup"}
        render={props => <Signup {...props} dispatch={dispatch} />}
      />
      <Route
        path={"/login"}
        render={props => <Login {...props} dispatch={dispatch} login={login} />}
      />
      <Route path={"/get-users-test"} componet={User} />

      <Route
        path={"/dashboard"}
        render={props => (
          <Dashboard
            {...props}
            user={user}
            dispatch={dispatch}
            role={role}
            isSignedIn={isSignedIn}
            token={token}
          />
        )}
      />
      <Route path={"/home"} render={() => <div>Home</div>} />
      <Route path={"/create-plan"} render={() => <CreatePlan />} />
      <Route
        path={"/create-project-form"}
        render={props => <CreateProjectForm dispatch={dispatch} {...props} />}
      />
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
