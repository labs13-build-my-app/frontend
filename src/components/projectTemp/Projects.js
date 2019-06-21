import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectView from "./ProjectView";

const Projects = ({
  projects,
  isLoading,
  isSignedIn,
  role,
  modal,
  user,
  project_id,
  history,
  match,
  setProjects
}) => {
  return (
    <>
      {projects.map(project => {
        return (
          <Link
            key={project.id}
            style={{ textDecoration: "none" }}
            className="project-link"
            to={`/project/${project.id}`}
            key={project.id}
          >
            <ProjectView
              {...{
                project,
                isLoading,
                isSignedIn,
                role,
                modal,
                user,
                project_id,
                history,
                match,
                setProjects
              }}
            />
          </Link>
        );
      })}
    </>
  );
};

export default Projects;
