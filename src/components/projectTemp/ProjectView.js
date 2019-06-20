import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectPlanList from "./ProjectPlanList";
import ProjectPlan from "./ProjectPlan";

import { NavLink } from "react-router-dom";
import EmailDrawer from "../EmailDrawer.js";
import { Card, Button } from "../../custom-styles";

const ProjectView = ({
  project,
  isLoading,
  isSignedIn,
  role,
  modal,
  user,
  project_id,
  setProject,
  history,
  match
}) => {
  const { pathname, state } = history.location;
  console.log("seleted plans here?", state);
  return (
    <>
      <Card style={{ width: "80%", color: "black" }}>
        <ProjectCard
          {...{ project, isLoading, isSignedIn, role, modal, user, history }}
        >
          <div>
            <Button
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

          {/* added conditions to only render email option if project does not belong to current user */}
          {project.user_id === user.id ? null : (
            <EmailDrawer
              emailAddress={project.email}
              firstName={user.firstName}
            />
          )}
        </ProjectCard>
      </Card>
      {project.projectStatus === "proposal" &&
      project_id &&
      pathname !== "/projects/proposals" ? (
        <ProjectPlanList
          {...{
            project,
            project_id,
            user,
            isLoading,
            isSignedIn,
            setProject,
            history
          }}
        />
      ) : project.projectStatus === "in progress" &&
        project_id &&
        pathname !== "/projects/proposals" ? (
        <ProjectPlan {...{ project, user, history }} />
      ) : pathname === "/projects/proposals" ? null : (
        <ProjectPlan {...{ project, user, history }} />
      )}
    </>
  );
};

export default ProjectView;
