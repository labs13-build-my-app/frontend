import React, { useEffect } from "react";
import { fetchRole } from "../store/actions";

const Login = ({ role, token, dispatch, history }) => {
  useEffect(() => {
    if (!role && token) {
      console.log("should be fetching role");
      fetchRole()(dispatch);
    } else {
      console.log("this condition going to home", !role, token);
      // probably need to handle this on a state change
      history.push("/home");
    }
  }, [role, token, dispatch, history]);

  return <div>Loading...</div>;
};

export default Login;
