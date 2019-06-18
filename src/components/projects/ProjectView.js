import React from "react";
import Project from "./Project";
import ProjectPlanList from "./ProjectPlanList";
import Test from "./Test";

const ProjectView = props => {
  console.log(props);
  return (
    <div>
      <Project {...props}>
        <Test text={"this should work right?"} />
      </Project>
      <ProjectPlanList />
    </div>
  );
};

export default ProjectView;
