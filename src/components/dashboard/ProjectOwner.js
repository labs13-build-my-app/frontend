import React from "react";

const ProjectOwner = ({ user, role }) => {
  return (
    <div>
      <h1>{user.id}</h1>
      <h1>{user.firstName}</h1>
      <h1>{user.lastName}</h1>
      <h1>{role}</h1>
    </div>
  );
};
export default ProjectOwner;
