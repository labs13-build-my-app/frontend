import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Route, Redirect } from "react-router";
import axios from "axios";

const Project = ({ match, name, description, budget, dueDate, isLoading }) => {
  const [project, setProject] = useState([]);

  console.log("project state: ", project);
  // let projectData;
  // if (props.history.location === "/projects") {
  //   projectData = props;
  // } else {
  //   projectData = project;
  // }

  useEffect(() => {
    if (!match.params.id) {
      setProject({ name, description, budget, dueDate });
    }
    if (match.params.id && !isLoading) {
      axios
        .get(`http://localhost:8000/api/projects/project/${match.params.id}`)
        .then(res => {
          setProject(res.data);
        });
    }
  }, [match, isLoading, name, description, budget, dueDate]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="Projects">
      <div>
        <h3 className="ProjectTitle">{project.name}</h3>
      </div>
      <div>
        <p>{project.description}</p>
        <p>{project.budget}</p>
        <p>{project.dueDate}</p>
        <NavLink
          className="create-plan"
          to={{ pathname: "/create-plan", state: { projectid: project.id } }}
        >
          Apply to this project
        </NavLink>
        {/* {role ? (
          <Route
            path={"/projects/:project_id/create-plan-modal"}
            render={props => {
              const path = props.match.params.project_id;
              return role !== "Developer" ? (
                <Redirect to={`/projects/${path}`} />
              ) : (
                <h1>model to create plan to project</h1>
              );
            }}
          />
        ) : null} */}
      </div>
    </div>
  );
};

export default Project;
