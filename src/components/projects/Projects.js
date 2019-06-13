import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import Project from "./Project";
import { Link } from "react-router-dom";
import { fetchProjects } from "../../store/actions";

const Projects = ({ match, isLoading }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      fetchProjects()(setProjects);
    }
  }, [isLoading]);
  console.log(isLoading);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      {projects.map(project => (
        <Link
          className="project-link"
          to={`/projects/project/${project.id}`}
          key={project.id}
        >
          <Project
            match={match}
            name={project.name}
            description={project.description}
            budget={project.budget}
            dueDate={project.dueDate}
            isLoading={isLoading}
          />
        </Link>
      ))}
    </div>
  );
};

export default Projects;
