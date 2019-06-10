import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router";
import axios from "axios";

const ProjectView = ({ role }) => {
  console.log(role, role !== "Developer");
  return (
    <div>
      <h1>project view page</h1>

      {role ? (
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
      ) : null}
    </div>
  );
};

export default ProjectView;
