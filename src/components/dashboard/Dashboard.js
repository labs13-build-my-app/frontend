import React, { useEffect } from "react";
import { Route, Redirect } from "react-router";
import Admin from "./Admin";
import ProjectOwner from "./ProjectOwner";
import Developer from "./Developer";
import { fetchDashboard } from "../../store/actions";

const Dashboard = ({ dispatch, user, role, isSignedIn, history }) => {
  useEffect(() => {
    const fetchUserDashboardData = () => {
      let userAccountEndpoint = "";

      if (role === "Admin") {
        userAccountEndpoint = `/api/account/admin/dashboard-admin`;
      } else if (role === "Project Owner") {
        userAccountEndpoint = `/api/account/project-owner/dashboard-project-owner`;
      } else if (role === "Developer") {
        userAccountEndpoint = `/api/account/developer/dashboard-developer`;
      } else {
        history.push("/home");
      }
      if (role === "Admin" || role === "Project Owner" || role === "Developer")
        fetchDashboard(userAccountEndpoint)(dispatch);
    };
    if (isSignedIn) {
      fetchUserDashboardData();
      history.push("/dashboard");
    }
  }, [history, dispatch, role, isSignedIn]);

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

  return <div>{displayBasedOnRole()}</div>;
};

export default Dashboard;
