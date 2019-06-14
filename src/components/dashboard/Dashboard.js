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
    fetchProfile(match.params.id)(setUser);
  }, [setUser, history.location.state, match.params.id]);

  const displayBasedOnRole = () => {
    if (user.role === "Project Owner") {
      return (
        <ProjectOwner
          history={history}
          user={user}
          loggedInUser={loggedInUser}
          role={role}
        />
      );
    } else if (user.role === "Developer" || history.location.state) {
<<<<<<< HEAD
      return <Developer user={user} loggedInUser={loggedInUser} role={role} />;
=======
      return (
        <Developer user={user} loggedInUser={loggedInUser} history={history} />
      );
>>>>>>> e5306110dcd76b8a537a76a9fc18072040a94ab4
    } else {
      return <h1>Loading</h1>;
    }
  };

  return <div>{displayBasedOnRole()}</div>;
};

export default Dashboard;
