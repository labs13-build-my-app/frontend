import React, { useEffect, useState } from "react";
import Project from "./Project";
import { Link } from "react-router-dom";
import {
  fetchProjects,
  fecthProjectOwnerProjectsList
} from "../../store/actions";
import { PageTitle, Button } from "../../custom-styles";

const Projects = ({
  isLoading,
  isSignedIn,
  fetch,
  error,
  role,
  user,
  match,
  history
}) => {
  const props = { history, match, role, isLoading, isSignedIn };
  const [projects, setProjects] = useState([]); // public PO or not loggin User

  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    if (!isLoading && pageCount) {
      fetchProjects(user.id, pageCount, setProjects, setPageCount);
    }
  }, [isLoading, history.location.state]);

  if (!projects) {
    return <h1>Loading...</h1>;
  }

  let projectsArr = projects.filter(
    project => project.projectStatus === "proposal"
  );

  const filteredArr = projectsArr.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  console.log(projectsArr);
  console.log(filteredArr);

  return (
    <div>
      <PageTitle>All Projects</PageTitle>
      <div style={{ width: "80%", margin: "auto auto" }}>
        {filteredArr.map(project => (
          <Link
            style={{ textDecoration: "none" }}
            className="project-link"
            to={`/project/${project.id}`}
            key={project.id}
          >
            <Project
              {...props}
              name={project.name}
              description={project.description}
              budget={project.budget}
              dueDate={project.dueDate}
              email={project.email}
              image_url={project.image_url}
              firstName={project.firstName}
              lastName={project.lastName}
              user={user}
            />
          </Link>
        ))}
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
      </div>
    </div>
  );
};

export default Projects;
