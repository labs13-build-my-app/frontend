import React, { useEffect, useReducer } from "react";
import store from "./store";
import { Route, withRouter, Redirect } from "react-router";
import { saveToken, locationRestore, fetchUser } from "./store/actions";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
import User from "./components/User";
// import ProjectsContainer from "./components/projects/ProjectsContainer";
import ProfileContainer from "./components/profiles/ProfileContainer";
import Projects from "./components/projects/Projects";
import CreatePlan from "./components/CreatePlan";
import CreateProjectForm from "./components/projects/CreateProjectForm";
import Project from "./components/projects/Project";

import "./App.css";
// complete routing
// must implement propTypes for testing
// review state and actions

const App = ({ history }) => {
  // step 1 set initial state
  const [state, dispatch] = useReducer(store.usersReducer, store.initialState);
  const {
    role,
    user,
    token,
    isSignedIn,
    newUser,
    location,
    isLoading,
    fetch
  } = state;
  const { pathname } = history.location;

  // logging state here
  console.log("STATE", state, isLoading);

  // step 3 set location from history.location.pathname  -- ex. location: “/dashboard”
  // on second render
  useEffect(() => {
    if (
      pathname !== location &&
      pathname !== "/login" &&
      pathname !== "/signup" &&
      // pathname !== "/callback" &&
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
      console.log("token is going to be set to true", token);
      // step 5 (b) if token send token to server  -- token: true
      // will render a 3rd time after this
      saveToken(true)(dispatch);
    } else if (token === null) {
      // step 5 (a) if no token stop loading process, set isLoading to false -- isLoading: false
      // will render a 3rd time after this
      saveToken(false)(dispatch);
      // dispatch({ type: "LOADING_COMPLETE" });
    } else if (token === null && !newUser) {
      //loadingComplete()(dispatch);
      console.log("finish loading");
      dispatch({ type: "LOADING_COMPLETE" });
    }
    // else if (token && !isLoading) {
    // dispatch({ type: "LOADING" });
    // }
  }, [token, dispatch]);

  useEffect(() => {
    const handleLoadingProcess = () => {
      // if(location === "/callback") {
      //   history.push("/")
      // }
      if (!role) {
        // step 6 send token to server retrive user info and role and set to state
        // step 7 (b) if ID check user exist on database
        // (b) is login process
        // Step 8 (b) if user exist on database send client role and basic user info
        console.log("fetching user");
        fetchUser(localStorage.getItem("token"))(dispatch);
        // console.log(" APP FETCH times");
      } else if (isSignedIn) {
        // Step 11 (b) client routes user to location from state
        // Step 12 (b) data is loaded for specific url view
        console.log("should this route to profile page?");
        history.push(location);
      }
    };

    if (token && isLoading) {
      // step 5 (b) --> continue process request to server
      handleLoadingProcess();
    } else if (!token && !isLoading) {
      // Step 5 (a) -b route to homepage  --> step 5 (a) completed
      // history.push("/home");
    } else if (newUser) {
      history.push("/signup");
    } else if (isSignedIn && location === "/callback") {
      console.log("asd;lfkjas;dlfhaslkjdghasl;dkfjslka;dfhal;sdhfasljdhfl");
      history.push({
        pathname: `/profile/${user.id}`
      });
    }
  }, [token, isLoading, location, role, newUser, isSignedIn, history, fetch]);

  console.log(location);

  // step 2 first render
  if (token === null) return <h1>Loading...</h1>;

  return (
    <div className="App">
      {/* should move routes into a container component to reduce cluter in app component */}
      <Route
        path={"/"}
        render={props => (
          <Home
            {...props}
            isSignedIn={isSignedIn}
            token={token}
            role={role}
            dispatch={dispatch}
            isLoading={isLoading}
            fetch={fetch}
            newUser={newUser}
            user={user}
          />
        )}
      />

      <Route
        path={"/projects"}
        exact
        render={props => (
          <Projects
            dispatch={dispatch}
            {...props}
            isSignedIn={isSignedIn}
            isLoading={isLoading}
          />
        )}
      />

      {/* <Route
        exact
        path={"/projects"}
        render={props => <Projects dispatch={dispatch} {...props} />}
      /> */}
      <Route
        path={"/projects/project/:id"}
        render={props => (
          <Project dispatch={dispatch} {...props} isLoading={isLoading} />
        )}
      />
      {/* 
      <Route
        path={"/projects/project/:id"}
        render={props => <Project dispatch={dispatch} {...props} />}
      /> */}

      <Route
        path={"/create-project-form"}
        render={props => <CreateProjectForm dispatch={dispatch} {...props} />}
      />

      {/* <Route
        path={"/create-project-form"}
        render={props => <CreateProjectForm dispatch={dispatch} {...props} />}
      /> */}

      {/* <Route path={"/create-plan"} render={() => <CreatePlan />} /> */}
      <Route
        path={"/create-plan"}
        render={props => <CreatePlan {...props} user={{ user }} />}
      />

      <Route
        path={"/profile"}
        render={props => (
          <ProfileContainer
            {...props}
            dispatch={dispatch}
            user={user}
            role={role}
          />
        )}
      />

      <Route path={"/get-users-test"} componet={User} />

      {/* <Route
        path={"/admin"}
        render={props => <Admin {...props} dispatch={dispatch} />}
      /> */}

      {/* <Route
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

      <Route
        path={"/dashboard/settings"}
        render={props =>
          isSignedIn === false ? (
            <Redirect to={"/home"} />
          ) : (
            <h1>settings page</h1>
          )
        }
      /> */}

      {/* <Route
        path={"/projects"}
        render={props => (
          <ProjectsContainer
            {...props}
            dispatch={dispatch}
            role={role}
            token={token}
          />
        )}
      />

      <Route
        path={"/profile"}
        render={props => <ProfileContainer {...props} dispatch={dispatch} user={user} />}
      />
      {/* <Route
        path={"/admin"}
        render={props => <Admin {...props} dispatch={dispatch} />}
      /> */}

      {
        // this will moved to projects view
      }

      {
        // this will be moved to dashboard view for project owner
      }

      {
        // only for testing
      }
      <Route path={"/get-users-test"} componet={User} />
    </div>
  );
};

export default withRouter(App);
