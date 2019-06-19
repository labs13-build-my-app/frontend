import React, { useEffect, useState } from "react";
import EmailDrawer from "../EmailDrawer.js";
import { NavLink } from "react-router-dom";
import Plan from "./Plan";
import {
  fetchProject,
  fetchProfile,
  listProjectPlans,
  acceptPlan
} from "../../store/actions";
import ProjectPlanList from "./ProjectPlanList";
import ProjectPlan from "./ProjectPlan";
import { Card, Button } from "../../custom-styles";
import moment from "moment";

const Project = ({
  match,
  user,
  name,
  description,
  budget,
  dueDate,
  isLoading,
  isSignedIn,
  role,
  email,
  image_url,
  history,
  reload,
  firstName,
  lastName
}) => {
  const [project, setProject] = useState([]);
  console.log("USER <===========", user);
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
      setProject({
        name,
        description,
        email,
        image_url,
        budget: newBudget,
        dueDate: newDueDate,
        firstName,
        lastName
      });
    }
    if (match.params.project_id && !isLoading) {
      fetchProject(
        match.params.project_id,
        formatDate,
        formatBudget,
        setProject
      );
    }
  }, [
    match.params.project_id,
    isLoading,
    name,
    description,
    budget,
    dueDate,
    email,
    image_url
  ]);

  const [projectPlans, setProjectPlans] = useState([]);
  useEffect(() => {
    // const { reload } = history.location.state || false;
    if ((match.params.project_id && !isLoading) || reload) {
      listProjectPlans(match.params.project_id, setProjectPlans);
    }
  }, [match.params.project_id, isLoading, reload]);

  const [selectedPlan, setSelectedPlan] = useState([]);
  useEffect(() => {
    setSelectedPlan(projectPlans.find(plan => plan.planStatus === "selected"));
  }, [projectPlans]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const clickHandler = (e, id, status) => {
    // e.preventDefault();
    acceptPlan(match.params.project_id, { planStatus: status, id: id });
    const plan = projectPlans.find(plan => plan.id === id);
    setSelectedPlan(() => ({
      ...plan,
      planStatus: status
    }));
    setProject(prevState => ({
      ...prevState,
      projectStatus: status === "selected" ? "in progress" : "proposal"
    }));
    // window.location.reload(); // need to change this. this might be giving us a bug
  };
  const { modal } = history.location.state || false;

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

          <p>
            Project Owner: {project.firstName} {project.lastName}
          </p>

          <div>
            <Button
              medium
              variant="outlined"
              onClick={() => history.push(`/profile/${project.user_id}`)}
            >
              View Profile
            </Button>
          </div>

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
                state: {
                  project_id: project.id,
                  modal: modal === true ? false : true
                }
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

          {/* added conditions to only render email option if project does not belong to current user */}
          {project.user_id === user.id ? null : (
            <EmailDrawer
              emailAddress={project.email}
              firstName={user.firstName}
            />
          )}
        </div>
      </Card>
      {project.projectStatus === "proposal" ? (
        <ProjectPlanList
          style={{ width: '60%' }}
          project={project}
          projectPlans={projectPlans}
          user={user}
          clickHandler={clickHandler}
          history={history}
        />
      ) : selectedPlan !== undefined ? (
        <ProjectPlan
          project={project}
          plan={selectedPlan}
          user={user}
          clickHandler={clickHandler}
        />
      ) : null}
    </div>
  );
};

export default Project;
