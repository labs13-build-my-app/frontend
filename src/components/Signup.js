import React, { useEffect } from "react";
import axios from "axios";

const Signup = ({ dispatch, history }) => {
  //   useEffect(() => {}, []);

  const signupHandler = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      const headers = {
        authorization: token
      };
      axios
        .get("http://localhost:8000/api/account/onboarding/signup", headers)
        .then(res => {
          dispatch({ type: "LOGIN_USER_SUCCESS", payload: res.data.role });
          history.pushState("/dashboard");
        })
        .catch(err => {
          console.log(err);
          dispatch({ type: "LOGIN_USER_FAILURE" });
        });
    }
  };
  return (
    <div>
      <h2>signup form</h2>
      <button onClick={signupHandler}>submit</button>
    </div>
  );
};
export default Signup;
