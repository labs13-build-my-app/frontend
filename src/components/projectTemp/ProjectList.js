import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../store/actions";
import Projects from "./Projects";

const ProjectList = ({
  isLoading,
  isSignedIn,
  role,
  user,
  project_id,
  match,
  history
}) => {
  const state = {
    isLoading,
    isSignedIn,
    role,
    user,
    project_id,
    match,
    history
  };

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (projects.length === 0) {
      fetchProjects(setProjects);
    }
  }, [projects]);
  return projects ? (
    <Projects {...{ projects, ...state, project_id, setProjects, match }} />
  ) : null;
};

export default ProjectList;
