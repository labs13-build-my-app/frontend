import React from "react";
import ProjectPlan from "./ProjectPlan";

const ProjectPlanList = ({
  projectPlans,
  project,
  user,
  clickHandler,
  history
}) => {
  return (
    <div className={"project-plans"}>
      {projectPlans &&
        projectPlans
          .filter(plan => plan.planStatus !== "declined")
          .map(plan => {
            return (
              <ProjectPlan
                key={plan.id}
                {...{ plan, user, project, clickHandler, history }}
              />
            );
          })}
    </div>
  );
};

export default ProjectPlanList;
