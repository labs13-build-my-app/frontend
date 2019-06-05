import React, { useEffect } from "react";
import axios from "axios";

const Dashboard = ({ dispatch, projects, role, history }) => {
  useEffect(() => {
    retrieve();
  }, []);

  const displayBasedOnRole = () => {
    if (role === "Project Owner") {
      // may add another condition to route here if not logged on
      return <Proposals role={role} projects={projects} />;
    } else if (role === "Developer") {
      // may add another condition to route here if not logged on
      return <Plans role={role} projects={projects} />;
    } else {
      return <h1>Loading</h1>;
    }
  };

  const retrieveProjects = () => {
    const connection = true ? "http://localhost:8000" : heroku;
    const heroku = "https://build-my-app.herokuapp.com";
    let endpoint = "";
    if (role === "Project Owner") {
      endpoint = `${connection}/api/projects/proposal-list`;
    } else if (role === "Developer") {
      endpoint = `${connection}/api/projects/plan-list`;
    } else {
      history.push("/home");
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
