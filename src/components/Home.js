import React from "react";
import { Route, Redirect } from "react-router";
import Callback from "./Auth/Callback";
import Signup from "./Signup";
// import Login from "./Login";
import NavContainer from "./NavContainer";
// import Auth from "./Auth/Auth";

const home = ({ isSignedIn, isLoading, token, role, dispatch }) => {
  // useEffect(() => {});

  if (token === null) return <h1>Loading...2.0</h1>;
  // if (token && isLoading) {
  //   return <Login />;
  // }

  console.log(token);

  return (
    <div>
      <NavContainer isSignedIn={isSignedIn} token={token} />

      <Route
        path="/callback"
        render={props =>
          token ? (
            <Redirect to={"/dashboard"} />
          ) : (
            <Callback
              {...props}
              dispatch={dispatch}
              role={role}
              token={token}
            />
          )
        }
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

      {/* <Route
        path={"/login"}
        render={props =>
          role ? (
            <Redirect to={"/dashboard"} />
          ) : (
            <Login {...props} dispatch={dispatch} role={role} token={token} />
          )
        }
      /> */}
    </div>
  );
};
export default home;
