import React, { useEffect } from "react";
import axios from "axios";
import Auth from "./Auth";
import auth0 from "auth0-js";
import history from "./history";

const auth = new auth0.WebAuth({
  domain: "dev-juy4gqyj.auth0.com",
  clientID: "erkAAAar4RrEqx4GcMSefhL42s2fulSu",
  redirectUri: "http://localhost:3000/callback",
  responseType: "token id_token",
  scope: "openid profile"
});

const Callback = ({ history, dispatch }) => {
  // const auth = new Auth();

  useEffect(() => {
    // retrive data Auth0 and parse into token
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        localStorage.setItem("token", authResult.idToken);
        localStorage.setItem("isLoggedIn", "true");

        // send token  to server and server decodes and then check for user
        // response is role if role user exist, if no role user no exist
        axios({
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: authResult.idToken
          },
          url: "http://localhost:8000/api/account/login"
        })
          .then(res => {
            dispatch({ type: "FETCH_ROLE_SUCCESS", payload: res.data.role });
            history.push("/dashboard");
          })
          .catch(err => console.log("CATCH ERR", err));
      } else if (err) {
        history.replace("/home");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }, [history, dispatch]);

  return (
    <div>
      <h2>Creating Session...</h2>
    </div>
  );
};
export default Callback;
