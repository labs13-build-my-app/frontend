import React, { useEffect, useReducer } from "react";
import Projects from "./Projects";
import ProjectView from "./ProjectView";
import store from "../../store";
import { Route, Switch } from "react-router";

const ProjectsContainer = ({ role, match, isLoading, isSignedIn, history }) => {
  const [projects, projectsDispatch] = useReducer(
    store.projectsReducer,
    store.initialState
  );

  return (
    <div>
      <Switch>
        {/* may need to implement switch in here to render only one render */}
        {/* public routes */}
        <Route
          exact
          path={"/projects"}
          render={props => (
            <Projects
              {...props}
              match={match}
              isLoading={isLoading}
              isSignedIn={isSignedIn}
            />
          )}
        />

        <Route
          path={"/projects/:project_id"}
          render={props => (
            <ProjectView
              {...props}
              role={role}
              match={match}
              isLoading={isLoading}
              isSignedIn={isSignedIn}
            />
          )}
        />
        {/* <Route
        exact
        path={"/projects/view-plan/:project_id/:plan_id"}
        render={props => <div>plan page view to project</div>}
      /> */}
      </Switch>
    </div>
  );
};

export default ProjectsContainer;
