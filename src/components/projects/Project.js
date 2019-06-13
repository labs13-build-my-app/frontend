import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Route, Redirect } from "react-router";
import axios from "axios";
import { fetchProject } from "../../store/actions";

import { Card } from "../../custom-styles";
import moment from "moment";

const Project = ({
  match,
  name,
  description,
  budget,
  dueDate,
  isLoading,
  isSignedIn
}) => {
  const [project, setProject] = useState([]);

  // let projectData;
  // if (props.history.location === "/projects") {
  //   projectData = props;
  // } else {
  //   projectData = project;
  // }

  const formatDate = unixDate => {
    //function to format unix date
    const date = new Date(Number(unixDate)); //make date string into date object
    return moment(date).format("MMMM Do YYYY"); //return formatted date object
  };
  const formatBudget = (
    budgetInCents //function to format cents to dollars
  ) => `$${(budgetInCents / 100).toFixed(2)}`; //return a string with a $ and a . for the remaining cents

  useEffect(() => {
    if (!match.params.id) {
      const newDueDate = formatDate(dueDate); //run res.data.date through formatter
      const newBudget = formatBudget(budget); //change budget from dollars to cents
      setProject({ name, description, budget: newBudget, dueDate: newDueDate });
    }
    if (match.params.id && !isLoading) {
      fetchProject(match.params.id, formatDate, formatBudget)(setProject);
    }
  }, [
    match,
    isLoading,
    name,
    description,
    budget,
    dueDate,
    formatDate,
    formatBudget
  ]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Card style={{ width: "80%", color: "black" }}>
      <div style={{ width: "25%" }}>
        <h3 style={{ color: "black" }} className="ProjectTitle">
          {project.name}
        </h3>
      </div>
      <div style={{ width: "75%" }}>
        <p>{project.description}</p>
        <p>Willing to pay {project.budget}</p>
        <p>Need by {project.dueDate}</p>
        {project.projectStatus === "completed" ? (
          <p>{project.feedback}</p>
        ) : null}

        {project.projectStatus === "proposal" && isSignedIn ? (
          <NavLink
            style={{ textDecoration: "none" }}
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
