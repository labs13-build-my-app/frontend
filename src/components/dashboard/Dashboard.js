import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router";
import Admin from "./Admin";
import ProjectOwner from "./ProjectOwner";
import Developer from "./Developer";
import { fetchDashboard } from "../../store/actions";
import axios from "axios";

const Dashboard = ({
  match,
  dispatch,
  loggedInUser,
  role,
  isSignedIn,
  history
}) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    console.log("this use effect");
    axios({
      method: "GET",

      url: `http://localhost:8000/api/users/profile/${match.params.id}`
    })
      .then(res => {
        setUser(res.data);
      })
      .catch(error => {
        console.log(error);
      });

  }, [setUser, history.location.state]);
  console.log("user", user);
  console.log(history.location.state);
  const displayBasedOnRole = () => {
    if (user.role === "Project Owner") {
      return <ProjectOwner           history={history}
          user={user}
          loggedInUser={loggedInUser} />;
    } else if (user.role === "Developer" || history.location.state) {

      return <Developer user={user} loggedInUser={loggedInUser} />;
    } else {
      return <h1>Loading</h1>;
    }
  };

  console.log("Dashboard logged in user", loggedInUser);

  return <div>{displayBasedOnRole()}</div>;
};

export default Dashboard;
