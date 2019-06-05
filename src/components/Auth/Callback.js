import React, { useEffect } from "react";
import Auth from "./Auth";

const Callback = ({ history, dispatch, token, login }) => {
  useEffect(() => {
    const auth = new Auth();
    const loginUser = () => {
      auth.handleAuthentication(dispatch);
    };
    if (token && login) {
      history.push("/dashboard");
    } else if (token) {
      history.push("/signup");
    } else {
      loginUser();
    }
  }, [history, dispatch, token, login]);

  console.log(token);

  return (
    <div>
      <h2>Creating Session...</h2>
    </div>
  );
};
export default Callback;
