import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/projects/").then(res => {
      setProjects(res.data);
    });
  }, []);
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <p>{project.name}</p>
          <p>{project.description}</p>
          <p>{project.budget}</p>
          <p>{project.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
