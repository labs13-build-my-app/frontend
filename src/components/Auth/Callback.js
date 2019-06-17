import React, { useEffect } from "react";
import auth0 from "auth0-js";
import { saveToken } from "../../store/actions";

const auth = new auth0.WebAuth({
  domain: "dev-juy4gqyj.auth0.com",
  clientID: "erkAAAar4RrEqx4GcMSefhL42s2fulSu",
  //redirectUri: "https://build-my-app-fe.onrender.com/callback", // maybe this can redirect to home or change this to auth?
  redirectUri: "http://localhost:3000/callback",
  responseType: "token id_token",
  scope: "openid profile"
});

const Callback = ({
  history,
  dispatch,
  token,
  isSignedIn,
  isLoading,
  fetch
}) => {
  useEffect(() => {
    // function to logout
    const logout = () => {
      // Remove isLoggedIn flag from localStorage
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });
      console.log("log1");

      // navigate to the home route
      history.replace("/home");
    };

    // retrive data Auth0 and parse into token
    const getToken = cb => {
      auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          localStorage.setItem("token", authResult.idToken);
          localStorage.setItem("isLoggedIn", "true");
          saveToken(localStorage.getItem("token"))(dispatch);
        } else if (err) {
          // history.replace("/home");
          alert(`Error: ${err.error}. Check the console for further details.`);
        }
      });
    };

    // function to login
    const login = () => {
      auth.authorize({
        prompt: "login"
      });
    };

    if (history.location.state === "sign on") {
      login();
    } else if (history.location.state === "logout") {
      logout();
    } else {
      getToken();
      history.push("/profile");
      // dispatch({ type: "LOADING" });
    }
  }, [history, token, isSignedIn, dispatch, fetch]);

  return (
    <div>
      <h2>Creating Session...</h2>
    </div>
  );
};
export default Callback;
