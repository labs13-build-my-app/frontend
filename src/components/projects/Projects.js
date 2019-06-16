import React, { useEffect, useState } from "react";
import Project from "./Project";
import { Link } from "react-router-dom";
import { fetchProjects } from "../../store/actions";
import { PageTitle } from "../../custom-styles";

const Projects = ({
  isLoading,
  isSignedIn,
  fetch,
  error,
  role,
  user,
  match,
  history
}) => {
  const props = { history, match, role, isLoading, isSignedIn };
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      fetchProjects()(setProjects);
    }
  }, [isLoading]);

  if (!projects) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <PageTitle>All Projects</PageTitle>
      <div style={{ width: "80%", margin: "0 auto" }}>
        {projects
          .filter(project => project.projectStatus === "proposal")
          .map(project => (
            <Link
              style={{ textDecoration: "none" }}
              className="project-link"
              to={`/project/${project.id}`}
              key={project.id}
            >
              <Project
                {...props}
                name={project.name}
                description={project.description}
                budget={project.budget}
                dueDate={project.dueDate}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Projects;
