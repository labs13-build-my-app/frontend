import React, { useEffect } from "react";
import Auth from "./Auth/Auth";

const Login = ({ dispatch }) => {
  useEffect(() => {
    // dispatch({ type: "LOGIN" });
    const auth = new Auth();
    auth.login();
  }, []);

  return (
    <div>
      <h2>this is the login component</h2>
    </div>
  );
};

export default Login;
