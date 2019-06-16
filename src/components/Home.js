import React from "react";
import { Route, Redirect } from "react-router";
import Callback from "./Auth/Callback";
import Signup from "./Signup";
// import Login from "./Login";
import NavContainer from "./NavContainer";
// import Auth from "./Auth/Auth";

const Home = ({
  isSignedIn,
  isLoading,
  token,
  role,
  dispatch,
  fetch,
  newUser,
  user
}) => {
  // useEffect(() => {});

  if (token === null) return <h1>Loading...2.0</h1>;
  // if (token && isLoading) {
  //   return <Login />;
  // }

  return (
    <div>
      {/* can implement a componet to to conditionall render when in loading state to render a loading status */}
      {/* this is our navigation component always render or can be conditionally rendered when isloading is false */}
      {/* <ProfileCard user={user} /> */}

      {/* can add a marketing Routing component for home */}

      {/* this is our auth route that calls auth0 for token */}
      {/* <Route
        path="/callback"
        render={props =>
          token && props.history.location.state !== "logout" ? (
            <Redirect to={"/home"} />
          ) : (
            <Callback
              {...props}
              dispatch={dispatch}
              role={role}
              token={token}
              isLoading={isLoading}
              fetch
            />
          )
        }
      /> */}

      {/* this is our signup route if isSignedIn is false it Redirects to home */}
      <Route
        path={"/signup"}
        render={props =>
          isSignedIn ? (
            <Redirect to="/home" />
          ) : (
            <Signup {...props} dispatch={dispatch} token={token} />
          )
        }
      />
    </div>
  );
};
export default Home;
