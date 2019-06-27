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
  match
}) => {
  const props = { match, role, isLoading, isSignedIn };
  const [projects, setProjects] = useState([]);

  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    if (projects.length === 0 && !isLoading && pageCount) {
      fetchProjects(user.id, pageCount, setProjects, setPageCount);
    }
  }, [isLoading, pageCount, user.id, projects.length]);

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

  return (
    <>
      <PageTitle className="projects-list-header">Available Projects</PageTitle>

      <div className="projects-list-wrapper">
        {filteredArr.map(project => (
          <Link
            style={{ textDecoration: "none", width: "35%" }}
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
              projectOwnerAvatar={project.projectOwnerAvatar}
              user_id={project.user_id}
            />
          </Link>
        ))}
      </div>
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

export default Projects;
