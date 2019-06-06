import React, { useEffect } from "react";
import axios from "axios";
import Auth from "./Auth";
import auth0 from "auth0-js";
import history from "./history";
import { fetchRole } from "../../store/actions";

const auth = new auth0.WebAuth({
  domain: "dev-juy4gqyj.auth0.com",
  clientID: "erkAAAar4RrEqx4GcMSefhL42s2fulSu",
  redirectUri: "http://localhost:3000/callback",
  responseType: "token id_token",
  scope: "openid profile"
});

const Callback = ({ history, dispatch, role }) => {
  useEffect(() => {
    // retrive data Auth0 and parse into token
    const getToken = () => {
      auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          localStorage.setItem("token", authResult.idToken);
          localStorage.setItem("isLoggedIn", "true");

          // send token  to server and server decodes and then check for user
          // response is role if role user exist, if no role user no exist
          fetchRole(authResult.idToken)(dispatch);
        } else if (err) {
          history.replace("/home");
          alert(`Error: ${err.error}. Check the console for further details.`);
        }
      });
    };
    const token = localStorage.getItem("token");
    if (role && token) {
      history.push(`/dashboard`);
    } else if (token && !role) {
      fetchRole(token)(dispatch);
    } else {
      getToken();
    }
  }, [history, dispatch, role]);

  return (
    <div>
      <h2>Creating Session...</h2>
    </div>
  );
};
export default Callback;
