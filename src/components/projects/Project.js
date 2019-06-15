import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Route, Redirect } from "react-router";
import axios from "axios";
import {
  fetchProject,
  listProjectPlans,
  acceptPlan
} from "../../store/actions";

import { Card } from "../../custom-styles";
import moment from "moment";

const Project = ({
  match,
  name,
  description,
  budget,
  dueDate,
  isLoading,
  isSignedIn,
  role
}) => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    const formatDate = unixDate => {
      //function to format unix date
      const date = new Date(Number(unixDate)); //make date string into date object
      return moment(date).format("MMMM Do YYYY"); //return formatted date object
    };
    const formatBudget = (
      budgetInCents //function to format cents to dollars
    ) => `$${(budgetInCents / 100).toFixed(2)}`; //return a string with a $ and a . for the remaining cents

    if (!match.params.project_id && !isLoading) {
      const newDueDate = formatDate(dueDate); //run res.data.date through formatter
      const newBudget = formatBudget(budget); //change budget from dollars to cents
      setProject({ name, description, budget: newBudget, dueDate: newDueDate });
    }
    if (match.params.project_id && !isLoading) {
      fetchProject(match.params.project_id, formatDate, formatBudget)(
        setProject
      );
    }
  }, [match.params.project_id, isLoading, name, description, budget, dueDate]);

  const [projectPlans, setProjectPlans] = useState([]);
  useEffect(() => {
    if (match.params.project_id && !isLoading) {
      listProjectPlans(match.params.project_id)(setProjectPlans);
    }
  }, [match.params.project_id, isLoading]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const clickHandler = (e, id, status) => {
    e.preventDefault();
    acceptPlan(match.params.id, { planStatus: status, id: id })();
    window.location.reload(); // need to change this. this might be giving us a bug
  };

  return (
    <div>
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

          {project.projectStatus === "proposal" &&
          isSignedIn &&
          role === "Developer" ? (
            <NavLink
              style={{ textDecoration: "none" }}
              className="create-plan"
              to={{
                pathname: "/create-plan",
                state: { projectid: project.id }
              }}
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
      <div className={"project-plans"}>
        {projectPlans &&
          projectPlans.map(plan => {
            return (
              <Card style={{ width: "80%", color: "black" }}>
                <div style={{ width: "25%" }}>
                  <h3 style={{ color: "black" }} className="ProjectTitle">
                    Plan
                  </h3>
                  <h3 style={{ color: "black" }} className="ProjectTitle">
                    {plan.name}
                  </h3>
                </div>
                <div style={{ width: "75%" }}>
                  <p>{plan.description}</p>
                  <p>Willing to accept ${plan.budget}</p>
                  <p>Can Deliver by {plan.dueDate}</p>
                  <p>Plan Status: {plan.planStatus}</p>
                </div>
                {/* Conditional rendering dependent on if PO is the user viewing project
                Conditional rendering dependent on if plan status is proposal */}
                <button
                  type={"submit"}
                  onClick={e => {
                    return clickHandler(e, plan.id, "selected");
                  }}
                >
                  Accept
                </button>
                {/* decline should remove card from dashboard */}
                <button
                  type={"submit"}
                  onClick={e => {
                    return clickHandler(e, plan.id, "declined");
                  }}
                >
                  Decline
                </button>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Project;
