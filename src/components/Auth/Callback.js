import React, { useEffect } from "react";
import Auth from "./Auth";
import auth0 from "auth0-js";
import { fetchUser, saveToken } from "../../store/actions";

const auth = new auth0.WebAuth({
  domain: "dev-juy4gqyj.auth0.com",
  clientID: "erkAAAar4RrEqx4GcMSefhL42s2fulSu",
  redirectUri: "http://localhost:3000/callback", // maybe this can redirect to home or change this to auth?
  responseType: "token id_token",
  scope: "openid profile"
});
// const login = new Auth();

const Callback = ({
  history,
  dispatch,
  token,
  isSignedIn,
  isLoading,
  fetch
}) => {
  useEffect(() => {
    console.log("in useEffect");
    console.log(fetch, !token, isLoading);
    // function to login

    // function to logout
    const logout = () => {
      // Remove isLoggedIn flag from localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");

      // navigate to the home route
      history.replace("/");
    };

    // retrive data Auth0 and parse into token
    const getToken = cb => {
      auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          localStorage.setItem("token", authResult.idToken);
          localStorage.setItem("isLoggedIn", "true");
          saveToken(localStorage.getItem("token"))(dispatch);

          // send token  to server and server decodes and then check for user
          // response is role if role user exist, if no role user no exis
          // fetchUser(authResult.idToken)(dispatch);
          // history.push("/login");
          // console.log("wowowowowwo");
          // cb();
        } else if (err) {
          // history.replace("/home");
          alert(`Error: ${err.error}. Check the console for further details.`);
        }
      });
    };

    const login = cb => {
      auth.authorize();
      // getToken();
      // cb();
    };
    console.log(history.location.state, "checking state in callback");
    if (history.location.state) {
      login();
      // getToken();
    } else {
      console.log("get token");
      getToken();
      // history.push("/");
    }

    // const havetoken = localStorage.get;
    // if (isLoading) {
    //   console.log("start fetching", fetch, token);
    //   dispatch({ type: "FETCH_START" });
    // } else if (fetch) {
    //   console.log("fetching token");
    //   login();
    //   // if (token || localStorage.getItem("token")) {
    //   //   dispatch({ type: "FETCH_SUCCESS" });
    //   //   history.push("/");
    //   // }
    // }

    // if (isSignedIn) {
    //   history.push(`/dashboard`);
    // } else if (token) {
    //   fetchUser(localStorage.getItem("token"))(dispatch);
    // } else if (false) {
    //   getToken();
    // }
  }, [history, token, isSignedIn, dispatch, fetch]);

  return (
    <div>
      <h2>Creating Session...</h2>
    </div>
  );
};
export default Callback;
