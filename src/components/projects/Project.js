import React, { useEffect, useState } from "react";
import axios from "axios";

const Project = props => {
  const [project, setProject] = useState([]);
  // let projectData;
  // if (props.history.location === "/projects") {
  //   projectData = props;
  // } else {
  //   projectData = project;
  // }

  // console.log(props);
  useEffect(() => {
    if (!props.match.params.id) {
      setProject(props);
    }
    if (props.match.params.id) {
      axios
        .get(
          `http://localhost:8000/api/projects/project/${props.match.params.id}`
        )
        .then(res => {
          setProject(res.data);
        });
    }
  }, [props.match]);
  // console.log(project);
  return (
    <div className="Projects">
      <div>
        <h3 className="ProjectTitle">{props.name}</h3>
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
