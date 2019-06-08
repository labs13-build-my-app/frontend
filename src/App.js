import React, { useEffect, useReducer } from "react";
import store from "./store";
import { Route, withRouter, Redirect, Link } from "react-router";
import { saveToken, locationRestore } from "./store/actions";
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
  const { role, user, login, token, isSignedIn, newUser, location } = state;
  console.log("STATE", state);
  // step one app renders with loading
  // step two after first render location updates with current location of url
  // and token updates true or false if token
  // if no token do nothing
  // if token check for user on database
  // if user on database return role
  const { pathname } = history.location;
  // saves current url location in state after every refresh after first render
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
  // if token in local storage, token on state will update after first render
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      saveToken(true)(dispatch);
    } else if (token === null) {
      saveToken(false)(dispatch);
    }
  }, [token]);
  useEffect(() => {
    // this was originaly part of the login process.
    // might not be working as intended anymore.
    // but this might be useful in some compacity.
    // reviewing what it does.
    const handleLoadingAccount = () => {
      if (isSignedIn) {
        console.log("should pass to path", pathname);
        // probably better to pass in isSignedin to test condition
        const path = pathname;
        history.push(path);
      } else if (token && role) {
        history.push("/dashboard");
      } else if (newUser) {
        console.log("new user");
        history.push("/signup");
      } else if (!role && token) {
        history.push("/login");
      }
    };
    handleLoadingAccount();
  }, [token, history.location.pathname, role, user, newUser, isSignedIn]);

  if (token === null) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <NavContainer isSignedIn={isSignedIn} token={token} />

      <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />

      <Route path={"/home"} render={props => <Home {...props} />} />

      <Route
        path="/callback"
        render={props => (
          <Callback {...props} dispatch={dispatch} role={role} token={token} />
        )}
      />

      <Route
        path={"/signup"}
        render={props =>
          isSignedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <Signup {...props} dispatch={dispatch} token={token} />
          )
        }
      />

      <Route
        path={"/login"}
        render={props =>
          role ? (
            <Redirect to={"/dashboard"} />
          ) : (
            <Login
              {...props}
              dispatch={dispatch}
              login={login}
              role={role}
              token={token}
            />
          )
        }
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
        render={props => <Projects {...props} dispatch={dispatch} />}
      />
    </div>
  );
};

export default withRouter(App);
