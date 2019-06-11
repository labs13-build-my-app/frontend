import React, { useEffect, useState } from "react";
import axios from "axios";
import Project from "./Project";
import { Link } from "react-router-dom";

const Projects = props => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/projects/").then(res => {
      setProjects(res.data);
      console.table(res.data);
    });
  }, []);
  return (
    <div>
      {projects.map(project => (
        <Link
          className="project-link"
          to={`/projects/project/${project.id}`}
          key={project.id}
        >
          <Project
            {...props}
            name={project.name}
            description={project.description}
            budget={project.budget}
            dueDate={project.dueDate}
            key={project.id}
          />
        </Link>

        // <div key={project.id}>
        //   <div>{project.name}</div>
        //   <div>{project.description}</div>
        //   <div>{project.budget}</div>
        //   <div>{project.dueDate}</div>
        // </div>
      ))}
    </div>
  );
};

export default Projects;
