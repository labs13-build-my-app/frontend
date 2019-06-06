import React, { useEffect } from "react";
import axios from "axios";
import Admin from "./Admin";
import ProjectOwner from "./ProjectOwner";
import Developer from "./Developer";
import { fetchUser } from "../../store/actions";

const Dashboard = ({ dispatch, user, role, isSignedIn, history, token }) => {
  useEffect(() => {
    const retrieveUser = () => {
      const heroku = "https://build-my-app.herokuapp.com";
      const local = "http://localhost:8000";
      const connection = true ? local : heroku;
      let userAccountEndpoint = "";

      if (role === "Admin") {
        userAccountEndpoint = `${connection}/api/account/admin/dashboard-admin`;
      } else if (role === "Project Owner") {
        userAccountEndpoint = `${connection}/api/account/project-owner/dashboard-project-owner`;
      } else if (role === "Developer") {
        userAccountEndpoint = `${connection}/api/account/developer/dashboard-developer`;
      } else {
        history.push("/home");
      }
      if (role === "Admin" || role === "Project Owner" || role === "Developer")
        fetchUser(userAccountEndpoint)(dispatch);
    };
    if (role && !isSignedIn) {
      retrieveUser();
    } else if (!isSignedIn && localStorage.getItem("token")) {
      console.log("entering Dashboard", role, isSignedIn);
      history.push("/home");
    }
  }, [history, dispatch, role, isSignedIn, token]);

  const displayBasedOnRole = () => {
    if (role === "Admin" && isSignedIn) {
      return <Admin role={role} user={user} />;
    } else if (role === "Project Owner" && isSignedIn) {
      return <ProjectOwner role={role} user={user} />;
    } else if (role === "Developer" && isSignedIn) {
      return <Developer role={role} user={user} />;
    } else {
      return <h1>Loading</h1>;
    }
  };

  return displayBasedOnRole();
};

export default Dashboard;
