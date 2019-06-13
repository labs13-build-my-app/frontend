import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Route, Redirect } from "react-router";
import axios from "axios";
import { Card } from '../../custom-styles';

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
    <Card style={{width: '80%', color: 'black'}}>
      <div style={{width: '25%'}}>
        <h3 style={{color: 'black'}} className="ProjectTitle">{project.name}</h3>
      </div>
      <div style={{width: '75%'}}>
        <p>{project.description}</p>
        <p>{project.budget}</p>
        <p>{project.dueDate}</p>
        {project.projectStatus === "completed" ? (
          <p>{project.feedback}</p>
        ) : null}

        {project.projectStatus === "proposal" ? (
          <NavLink
            style={{textDecoration: 'none'}}
            className="create-plan"
            to={{ pathname: "/create-plan", state: { projectid: project.id } }}
          >
            Apply to this project
          </NavLink>
        ) : null}

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
    </Card>
  );
};

export default Project;
