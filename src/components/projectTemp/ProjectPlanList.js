import React, { useEffect, useState } from "react";
import ProjectPlan from "./ProjectPlan";
import { listProjectPlans } from "../../store/actions";

const ProjectPlanList = ({
  project,
  user,
  isLoading,
  isSignedIn,
  project_id,
  setProject,
  history
}) => {
  const [projectPlans, setProjectPlans] = useState([]);
  useEffect(() => {
    if (project_id && !isLoading) {
      listProjectPlans(project_id, setProjectPlans);
    }
  }, [project_id, isLoading]);

  return (
    <>
      {projectPlans &&
        projectPlans
          .filter(plan => plan.planStatus !== "declined")
          .map(plan => {
            return (
              <ProjectPlan {...{ plan, user, project, setProject, history }} />
            );
          })}
    </>
  );
};

export default ProjectPlanList;
