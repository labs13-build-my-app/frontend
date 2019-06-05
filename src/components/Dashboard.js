import React, { useEffect } from "react";
import axios from "axios";
import Admin from "./Admin";
import ProjectOwner from "./ProjectOwner";
import Developer from "./Developer";

const Dashboard = ({ dispatch, user, role, history }) => {
  useEffect(() => {
    retrieveUser();
  }, []);

  const displayBasedOnRole = () => {
    if (role === "Admin") {
      return <Admin role={role} user={user} />;
    } else if (role === "Project Owner") {
      return <ProjectOwner role={role} user={user} />;
    } else if (role === "Developer") {
      return <Developer role={role} user={user} />;
    } else {
      return <h1>Loading</h1>;
    }
  };

  const retrieveUser = () => {
    const connection = true ? "http://localhost:8000" : heroku;
    const heroku = "https://build-my-app.herokuapp.com";
    let endpoint = "";
    if (role === "Admin") {
      endpoint = `${connection}/api/account/admin/dashboard-admin`;
    } else if (role === "Project Owner") {
      endpoint = `${connection}/api/account/project-owner/dashboard-project-owner`;
    } else if (role === "Developer") {
      endpoint = `${connection}/api/account/developer/dashboard-developer`;
    } else {
      history.push("/signup");
    }
    if (role === "Admin" || role === "Project Owner" || role === "Developer")
      axios
        .get(`${endpoint}/${1}`)
        .then(res => {
          console.log(res.data);
          dispatch({ type: "FETCH_USER_SUCCESS", payload: res.data });
        })
        .catch(err => {
          console.log(err);
        });
  };
  return displayBasedOnRole();
};

export default Dashboard;
