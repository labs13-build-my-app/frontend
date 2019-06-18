import React, { useEffect, useState } from "react";
import { Card } from "../../custom-styles";
import ProjectPlan from "./ProjectPlan";

const ProjectPlanList = ({ projectPlans, project, user, clickHandler }) => {
  console.log("<<<======= PLANNNNNN", projectPlans);
  return (
    <div className={"project-plans"}>
      {projectPlans &&
        projectPlans
          .filter(plan => plan.planStatus !== "declined")
          .map(plan => {
            return <ProjectPlan {...{ plan, user, project, clickHandler }} />;
          })}
    </div>
  );
};

export default ProjectPlanList;
