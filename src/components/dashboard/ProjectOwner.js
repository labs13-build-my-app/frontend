import React from "react";
import { Route } from "react-router";

const ProjectOwner = ({ user, role }) => {
  return (
    <div>
      <h1>{user.id}</h1>
      <h1>{user.firstName}</h1>
      <h1>{user.lastName}</h1>
      <h1>{role}</h1>

      <Route
        path={"/dashboard/create-project"}
        render={props => <h1>create project model for project owner</h1>}
      />
    </div>
  );
};
export default ProjectOwner;
