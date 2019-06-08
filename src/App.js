import React, { useEffect, useReducer } from "react";
import store from "./store";
import { Route, withRouter, Redirect, Link } from "react-router";
import { saveToken } from "./store/actions";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import User from "./components/User";
import Projects from "./components/projects/Projects";
import CreatePlan from "./components/CreatePlan";
import CreateProjectForm from "./components/projects/CreateProjectForm"; // <<<<<<<MB
import Callback from "./components/Auth/Callback";
import NavContainer from "./components/NavContainer";
import "./App.css";

// const useAppState = () => {
//   const [state, dispatch] = useReducer(store.reducer, store.initialState);
//   const { role, user, login, token, isSignedIn, signup } = state;

//   useEffect(() => {

//   })
//   return { dispatch, state, role, user, token, isSignedIn, signup, login };
// };

const App = ({ history, match }) => {
  const [state, dispatch] = useReducer(store.reducer, store.initialState);
  const { role, user, login, token, isSignedIn, signup, location } = state;
  console.log("STATE", state);
  useEffect(() => {
    // saves current url location in state after every location change or refresh
    if (history.location.pathname !== location) {
      dispatch({
        type: "RECORD_URL_LOCATION",
        payload: history.location.pathname
      });
    }

    // if token in local storage, token on state will update after first render
    if (!token && localStorage.getItem("token")) {
      saveToken(true)(dispatch);
    } else if (token === null) {
      saveToken(false)(dispatch);
    }

    if (role && token) {
    }

    const login = () => {
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
  }, [token, history.location.pathname, role, user, signup]);

  return (
    <div className="App">
      <NavContainer isSignedIn={isSignedIn} />

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
        render={props =>
          isSignedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <Signup {...props} dispatch={dispatch} />
          )
        }
      />

      <Route
        path={"/login"}
        render={props => <Login {...props} dispatch={dispatch} login={login} />}
      />
      <Route path={"/get-users-test"} componet={User} />

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
        render={() => <Projects dispatch={dispatch} />}
      />
    </div>
  );
};

export default withRouter(App);
