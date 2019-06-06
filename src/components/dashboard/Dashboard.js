import React, { useEffect } from "react";
import axios from "axios";
import Admin from "./Admin";
import ProjectOwner from "./ProjectOwner";
import Developer from "./Developer";

const Dashboard = ({ dispatch, user, role, history, match }) => {
  console.log("DASHBOARD ROLE: ", role);
  useEffect(() => {
    const retrieveUser = () => {
      const heroku = "https://build-my-app.herokuapp.com";
      const local = "http://localhost:8000";
      const connection = true ? local : heroku;
      let endpoint = "";

      // const check = match.params.role;
      // console.log(match);
      if (role === "Admin") {
        endpoint = `${connection}/api/account/admin/dashboard-admin`;
      } else if (role === "Project Owner") {
        endpoint = `${connection}/api/account/project-owner/dashboard-project-owner`;
      } else if (role === "Developer") {
        console.log("HERE");
        endpoint = `${connection}/api/account/developer/dashboard-developer`;
      } else {
        history.push("/home");
      }
      if (role === "Admin" || role === "Project Owner" || role === "Developer")
        axios
          .get(`${endpoint}/${1}`)
          .then(res => {
            console.log(res.data);
            dispatch({ type: "FETCH_USER_SUCCESS", payload: res.data.user });
          })
          .catch(err => {
            console.log(err);
          });
    };
    retrieveUser();
  }, [dispatch, history, role]);

  const displayBasedOnRole = () => {
    // const check = match.params.role;
    if (role === "Admin") {
      console.log(user);
      return <Admin role={role} user={user} />;
    } else if (role === "Project Owner") {
      return <ProjectOwner role={role} user={user} />;
    } else if (role === "Developer") {
      return <Developer role={role} user={user} />;
    } else {
      return <h1>Loading</h1>;
    }
  };

  return displayBasedOnRole();
};

export default Dashboard;
