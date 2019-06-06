import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("https://build-my-app.herokuapp.comapi/projects/projects")
      .then(res => {
        setProjects(res.data.projects);
      });
  }, []);
};

export default Projects;
