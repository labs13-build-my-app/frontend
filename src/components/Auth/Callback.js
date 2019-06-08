import React, { useEffect } from "react";
import auth0 from "auth0-js";
import { fetchRole } from "../../store/actions";

const auth = new auth0.WebAuth({
  domain: "dev-juy4gqyj.auth0.com",
  clientID: "erkAAAar4RrEqx4GcMSefhL42s2fulSu",
  redirectUri: "http://localhost:3000/callback",
  responseType: "token id_token",
  scope: "openid profile"
});

const Callback = ({ history, dispatch, token, isSignedIn }) => {
  useEffect(() => {
    // retrive data Auth0 and parse into token
    const getToken = () => {
      auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          localStorage.setItem("token", authResult.idToken);
          localStorage.setItem("isLoggedIn", "true");

          // send token  to server and server decodes and then check for user
          // response is role if role user exist, if no role user no exist
          console.log("FETCHING ROLE CALLBACK");
          // fetchRole(authResult.idToken)(dispatch);
          history.push("/login");
        } else if (err) {
          history.replace("/home");
          alert(`Error: ${err.error}. Check the console for further details.`);
        }
      });
    };
    if (isSignedIn) {
      history.push(`/dashboard`);
    } else if (token) {
      history.push("/login");
      // fetchRole(token)(dispatch);
    } else {
      getToken();
    }
  }, [history, dispatch, token]);

  return (
    <div>
      <h2>Creating Session...</h2>
    </div>
  );
};
export default Callback;
