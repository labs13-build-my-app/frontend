import React, { useEffect, useReducer } from "react";
import store from "./store";
import { withRouter } from "react-router";
import { saveToken, locationRestore, fetchUser } from "./store/actions";
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
    isLoading,
    fetch
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
      isToken === null
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
        // fetch user
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
        history.push("/signup");
      } else if (isSignedIn && location === "/callback") {
        history.push({
          pathname: `/profile/${userID}`
        });
      } else if (!isToken && !localStorage.getItem("token") && !isLoading) {
        history.push("/home"); // could push to dynamic location
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

  // step 2 first render
  // if (isLoading) return <h1>Loading...</h1>;
  // if (!isLoading) return <h1>Loading complete</h1>;

  return (
    <div className="App">
      <RouteContainer {...state} />
      {/* should move routes into a container component to reduce cluter in app component */}
      {/* <Route
        path={"/"}
        render={props => (
          <Home
            {...props}
            isSignedIn={isSignedIn}
            isToken={isToken}
            role={role}
            dispatch={dispatch}
            isLoading={isLoading}
            fetch={fetch}
            isNewUser={isNewUser}
            user={user}
          />
        )}
      /> */}

      {/* <Route
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
      /> */}
      {/* <Route
        path={"/projects/plan/:plan_id"}
        render={props => (
          <Plan {...props} isLoading={isLoading} isSignedIn={isSignedIn} />
        )}
      /> */}
      {/* <Route
        exact
        path={"/projects"}
        render={props => <Projects dispatch={dispatch} {...props} />}
      /> */}
      {/* <Route
        path={"/projects/project/:id"}
        render={props => (
          <Project
            dispatch={dispatch}
            {...props}
            isSignedIn={isSignedIn}
            isLoading={isLoading}
            role={role}
          />
        )}
      /> */}
      {/* 
      <Route
        path={"/projects/project/:id"}
        render={props => <Project dispatch={dispatch} {...props} />}
      /> */}

      {/* <Route
        path={"/create-project-form"}
        render={props => <CreateProjectForm dispatch={dispatch} {...props} />}
      /> */}

      {/* <Route
        path={"/create-project-form"}
        render={props => <CreateProjectForm dispatch={dispatch} {...props} />}
      /> */}

      {/* <Route path={"/create-plan"} render={() => <CreatePlan />} /> */}
      {/* <Route
        path={"/create-plan"}
        render={props => <CreatePlan {...props} user={user} />}
      /> */}

      {/* <Route
        path={"/profile"}
        render={props => (
          <ProfileContainer
            {...props}
            dispatch={dispatch}
            user={user}
            role={role}
          />
        )}
      /> */}
      {/* 
      <Route path={"/get-users-test"} componet={User} /> */}

      {/* <Route
        path={"/admin"}
        render={props => <Admin {...props} dispatch={dispatch} />}
      /> */}

      {/* <Route
        path={"/dashboard"}
        render={props =>
          isToken === false ? (
            <Redirect to={"/home"} />
          ) : (
            <Dashboard
              {...props}
              user={user}
              dispatch={dispatch}
              role={role}
              isSignedIn={isSignedIn}
              isToken={isToken}
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
            isToken={isToken}
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
      {/* <Route path={"/get-users-test"} componet={User} /> */}
    </div>
  );
};

export default withRouter(App);
