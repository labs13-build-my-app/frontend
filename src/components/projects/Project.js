import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Route, Redirect } from "react-router";
import axios from "axios";

const Project = props => {
  const [project, setProject] = useState([]);
  console.log("project state: ", project);
  // let projectData;
  // if (props.history.location === "/projects") {
  //   projectData = props;
  // } else {
  //   projectData = project;
  // }

  // console.log(props);
  useEffect(() => {
    if (!props.match.params.id) {
      setProject(props);
    }
    if (props.match.params.id) {
      axios
        .get(
          `http://localhost:8000/api/projects/project/${props.match.params.id}`
        )
        .then(res => {
          setProject(res.data);
        });
    }
  }, [props.match]);
  return (
    <div className="Projects">
      <div>
        <h3 className="ProjectTitle">{props.name}</h3>
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
