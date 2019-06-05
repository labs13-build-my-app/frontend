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

const Callback = props => {
  // const auth = new Auth();

  useEffect(() => {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        localStorage.setItem("token", authResult.idToken);
        localStorage.setItem("isLoggedIn", "true");
        axios({
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: authResult.idToken
          },
          url: "http://localhost:8000/api/account/login"
        })
          .then(res => {
            console.log(res);
            props.history.push("/authenticated");
          })
          .catch(err => console.log("CATCH ERR", err));
      } else if (err) {
        history.replace("/");
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
    // const random = async () => {
    //   try {
    //     let authy = await auth.handleAuthentication();
    //     console.log(authy);
    //     const token = localStorage.getItem("token");
    //     // axios.get("http://localhost:8000/api/account/isLogged").then(res => {
    //     //   console.log(res);
    //     // });
    //     await axios({
    //       method: "GET",
    //       headers: { "content-type": "application/json", Authorization: token },
    //       url: "http://localhost:8000/api/account/isLogged"
    //     }).then(res => {
    //       console.log(token);
    //       console.log(res);
    //     });
    //     props.history.push("/authenticated");
    //     console.log(localStorage.getItem("token"));
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // random();
  }, [props.history]);

  return (
    <div>
      <h2>Creating Session...</h2>
    </div>
  );
};
export default Callback;
