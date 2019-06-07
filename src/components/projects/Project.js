import React, { useEffect, useState } from "react";
import axios from "axios";

const Project = props => {
  // const [project, setProject] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/projects/project/:id")
  //     .then(res => {
  //       setProjects(res.data.projects);
  //     });
  // }, []);

  return (
    <div className="Projects">
      <div className="Book-Top">
        <h3 className="ProjectTitle">{props.name}</h3>
      </div>
      <div>
        <p>{props.description}</p>
        <p>{props.budget}</p>
        <p>{props.dueDate}</p>
      </div>
    </div>
  );
};

export default Project;
