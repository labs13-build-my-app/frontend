import React, { useEffect, useState } from "react";
import axios from "axios";
import Project from "./Project";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/projects/").then(res => {
      setProjects(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      {projects.map(project => (
        <Link
          className="project-link"
          to={`/project/${project.id}`}
          key={project.id}
        >
          <Project
            name={project.name}
            description={project.description}
            budget={project.budget}
            dueDate={project.dueDate}
            key={project.id}
          />
        </Link>
      ))}
    </div>
  );
};

export default Projects;
