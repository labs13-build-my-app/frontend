import React, { useEffect } from "react";
import { fetchRole } from "../store/actions";

const Login = ({ role, token, dispatch, history }) => {
  console.log(history.location.pathname);
  useEffect(() => {
    if (!role && token) {
      fetchRole()(dispatch);
    } else {
      history.push("/home");
    }
  }, [role, token, dispatch, history]);

  return <div>Loading...</div>;
};

export default Login;
