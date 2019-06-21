import React, { useEffect, Children } from "react";
import { NavLink } from "react-router-dom";
import EmailDrawer from "../EmailDrawer.js";
import { Card, Button } from "../../custom-styles";

const ProjectView = ({
  project,
  children,
  isLoading,
  isSignedIn,
  role,
  modal,
  user,
  history
}) => {
  return (
    <>
      <div style={{ width: "25%" }}>
        <h3 style={{ color: "black" }} className="ProjectTitle">
          {project.name}
        </h3>
      </div>
      <div style={{ width: "75%" }}>
        <p>{project.description}</p>
        <p>Willing to pay {project.budget}</p>
        <p>Need by {project.dueDate}</p>

        <p>
          Project Owner: {project.firstName} {project.lastName}
        </p>
        {children}
      </div>
    </>
  );
};

export default ProjectView;
