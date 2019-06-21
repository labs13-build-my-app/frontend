import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../store/actions";
import Projects from "./Projects";
import { PageTitle, Button } from "../../custom-styles";

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
  const [pageCount, setPageCount] = useState(1);
  useEffect(() => {
    if (!isLoading && typeof pageCount === "number" && projects.length === 0) {
      fetchProjects(user.id, pageCount, setProjects, setPageCount);
    }
  }, [projects, isLoading, user.id, pageCount]);

  return (
    <>
      {projects ? (
        <Projects {...{ projects, ...state, project_id, setProjects, match }} />
      ) : null}

      {pageCount.page > 1 ? (
        <Button
          medium
          onClick={() => {
            if (pageCount.page >= 0)
              fetchProjects(
                user.id,
                Number(pageCount.page) - 1,
                setProjects,
                setPageCount
              );
          }}
        >
          Prev
        </Button>
      ) : null}
      {pageCount.page < pageCount.total_pages ? (
        <Button
          medium
          onClick={() => {
            if (pageCount.page <= pageCount.total_pages)
              fetchProjects(
                user.id,
                Number(pageCount.page) + 1,
                setProjects,
                setPageCount
              );
          }}
        >
          Next
        </Button>
      ) : null}
    </>
  );
};

export default ProjectList;
