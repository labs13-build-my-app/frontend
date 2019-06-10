import React, { useEffect, useReducer } from "react";
import Projects from "./Projects";
import ProjectView from "./ProjectView";
// import Plan from "./Plans"
import store from "../../store";
import { Route } from "react-router";

const ProjectsContainer = ({ role }) => {
  const [projects, projectsDispatch] = useReducer(
    store.projectsReducer,
    store.initialState
  );
  return (
    <div>
      {/* public routes */}
      <Route exact path={"/projects"} render={props => <Projects />} />
      <Route
        path={"/projects/:project_id"}
        render={props => <ProjectView {...props} role={role} />}
      />
      <Route
        exact
        path={"/projects/view-plan/:project_id/:plan_id"}
        render={props => <div>plan page view to project</div>}
      />
    </div>
  );
};

export default ProjectsContainer;
