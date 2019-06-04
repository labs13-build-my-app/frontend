import React, { useReducer, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ dispatch, user }) => {
  useEffect(() => {
    retrieveUser();
  }, []);

  const retrieveUser = () => {
    axios
      .get("http://localhost:8000/api/account/developer/dashboard-developer")
      .then(res => {
        console.log(res.data);
        dispatch({ type: "FETCH_USER_SUCCESS", payload: res.data });
      });
  };
  console.log(user.profilePicutreURL);
  return (
    <div>
      <h1>{user.id}</h1>
      <h1>{user.name}</h1>
      <img src={user.profilePicutreURL} />
      <button onClick={() => retrieveUser()}>update user</button>
    </div>
  );
};

export default Dashboard;
