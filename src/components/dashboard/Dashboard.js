import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router";
import Admin from "./Admin";
import ProjectOwner from "./ProjectOwner";
import Developer from "./Developer";
import { fetchDashboard, fetchProfile } from "../../store/actions";
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
    console.log();
    fetchProfile(match.params.id)(setUser);
  }, [setUser, history.location.state, match.params.id]);

  const displayBasedOnRole = () => {
    if (user.role === "Project Owner") {
      return (
        <ProjectOwner
          history={history}
          user={user}
          loggedInUser={loggedInUser}
        />
      );
    } else if (user.role === "Developer" || history.location.state) {
      return (
        <Developer user={user} loggedInUser={loggedInUser} history={history} />
      );
    } else {
      return <h1>Loading</h1>;
    }
  };

  console.log("Dashboard logged in user", loggedInUser);
  console.log("Dashboard user", user);

  return <div>{displayBasedOnRole()}</div>;
};

export default Dashboard;
