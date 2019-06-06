import React, { useState, useEffect } from "react";
import Auth from "./Auth/Auth";
import axios from "axios";

const Signup = ({ dispatch, history }) => {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // dispatch({ type: "SIGNUP", payload: { signup: true, role: role } });
      const auth = new Auth();
      auth.login();
    }
  }, []);

  // const signupHandler = e => {
  //   e.preventDefault();
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const headers = {
  //       authorization: token
  //     };
  //     axios
  //       .get("http://localhost:8000/api/account/onboarding/signup", headers)
  //       .then(res => {
  //         dispatch({ type: "LOGIN_USER_SUCCESS", payload: res.data.role });
  //         history.pushState("/dashboard");
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         dispatch({ type: "LOGIN_USER_FAILURE" });
  //       });
  //   }
  // };

  const changeHandler = (e, setState) => {
    let user = e.target.value;
    setState(user);
  };
  const submitHandler = e => {
    e.preventDefault();
    console.log("here signup");
    dispatch({ type: "FETCH_ROLE_SUCCESS", payload: role });
    history.push("/callback");
    // axios({
    //   method: "post",
    //   headers: {
    //     "content-type": "application/json",
    //     Authorization: localStorage.getItem("token")
    //   },
    //   url: "http://localhost:8000/api/account/onboarding/signup",
    //   data: { role, firstName, lastName }
    // })
    //   .then(res => console.log(res, "here"))
    //   .catch(err => console.log(err));
  };
  if (!localStorage.getItem("token")) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h2>signup form</h2>
      <form onSubmit={submitHandler}>
        <input
          onChange={event => changeHandler(event, setRole)}
          name="role"
          type="text"
          value={role}
        />
        <input
          onChange={event => changeHandler(event, setFirstName)}
          name="firstName"
          type="text"
          value={firstName}
        />
        <input
          onChange={event => changeHandler(event, setLastName)}
          name="lastUser"
          type="text"
          value={lastName}
        />
        <button type="submit">Submit</button>
      </form>
      {/* <button onClick={signupHandler}>submit</button> */}
    </div>
  );
};
export default Signup;
