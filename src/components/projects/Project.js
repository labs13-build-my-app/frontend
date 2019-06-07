import React, { useEffect, useState } from "react";
import axios from "axios";

const Project = () => {
  const [project, setProject] = useState([]);
  useEffect(() => {
    axios
      .get("https://build-my-app.herokuapp.comapi/projects/projects/project")
      .then(res => {
        setProjects(res.data.projects);
      });
  }, []);
};

export default Project;
