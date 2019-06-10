import React, { useEffect, useReducer } from "react";
import store from "../../store";
import { Route } from "react-router";

const ProjectsContainer = () => {
  const [projects, projectsDispatch] = useReducer(
    store.usersReducer,
    store.initialState
  );
  return (
    <div>
      {/* public routes */}
      <Route
        exact
        path={"/projects"}
        render={() => <div>list of projects</div>}
      />
      <Route exact path={"/projects/:project_id"} render={() => <Project />} />
      <Route
        exact
        path={"/projects/:project_id/:plan_id"}
        render={() => <div>project owner page view</div>}
      />
    </div>
  );
};

export default ProjectsContainer;
