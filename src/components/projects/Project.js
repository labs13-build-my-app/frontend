import React, { useEffect, useState } from "react";
import axios from "axios";

const Project = ({ match, name, description, budget, dueDate, isLoading }) => {
  const [project, setProject] = useState([]);

  useEffect(() => {
    if (!match.params.id) {
      setProject({ name, description, budget, dueDate });
    }
    if (match.params.id && !isLoading) {
      axios
        .get(`http://localhost:8000/api/projects/project/${match.params.id}`)
        .then(res => {
          setProject(res.data);
        });
    }
  }, [match, isLoading, name, description, budget, dueDate]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="Projects">
      <div>
        <h3 className="ProjectTitle">{project.name}</h3>
      </div>
      <div>
        <p>{project.description}</p>
        <p>{project.budget}</p>
        <p>{project.dueDate}</p>
      </div>
    </div>
  );
};

export default Project;
