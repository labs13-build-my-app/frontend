import React, { useEffect, useState } from "react";
import ProjectView from "./ProjectView";
import ProjectList from "./ProjectList";
import { fetchProject } from "../../store/actions";

const ProjectsContainer = ({
  isLoading,
  isSignedIn,
  role,
  user,
  match,
  history,
  dispatch
}) => {
  const state = { isLoading, isSignedIn, role, user, match, history };
  const { project_id } = match.params || project_id;

  // fetchs a single project by project id for single view
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (project_id && project === null) {
      fetchProject(project_id, "", "", setProject);
    }
  }, [project_id, project]);

  if (project_id && project !== null) {
    return (
      <ProjectView
        {...{ project, project_id, ...state, setProject, history }}
      />
    );
  } else {
    return <ProjectList {...{ ...state, project_id, history, match }} />;
  }
};

export default ProjectsContainer;
