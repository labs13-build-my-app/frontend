import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router";
import Projects from "../projects/Projects";
import placeholder from "../../assets/images/profile-placeholder.png";
import styled from "styled-components";
import { Button } from "../../styled-components";

const Card = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px auto;
  border: 1px solid lightgrey;
  border-radius: 15px;
  box-shadow: lightgrey 15px 15px 15px;
  padding: 10px;
`;

const UserInfo = styled.div`
  text-align: left;
  width: 50%;
`;

const ProjectOwner = ({ loggedInUser, user, role }) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    console.log("Use Effect");
    axios({
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      url: `https://build-my-app.herokuapp.com/api/account/project-owner/project-list`
    })
      .then(res => {
        res.data.message === "No Projects"
          ? setProjects([])
          : setProjects(res.data);
      })
      .catch(error => {
        console.log("Error", error);
      });
  }, []);

  console.log("Logged In User", loggedInUser);
  console.log("User", user);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Card className={"card userCard"}>
        <div style={{ width: "50%" }}>
          <img
            src={user.profilePictureURL ? user.profilePictureURL : placeholder}
            style={{
              borderRadius: "100%",
              width: "50%"
            }}
          />
        </div>
        <UserInfo>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <p>{role}</p>
        </UserInfo>
      </Card>
      <div
        className="projects-area"
        style={{ width: "70%", margin: "50px auto" }}
      >
        <h2
          style={{
            borderBottom: "1px solid black",
            paddingBottom: "5px",
            textAlign: "left"
          }}
        >
          Projects
        </h2>
        {projects.length === 0 ? (
          <Card className={"card projectsCard"}>No Projects</Card>
        ) : (
          projects.map(project => (
            <Card className={"card projectsCard"}>
              {project.image_url ? <img src={project.image_url} /> : null}
              <h1>project.name</h1>
              <p>project.description</p>
            </Card>
          ))
        )}
        {user.id === loggedInUser.id ? (
          <Button style={{ margin: "50px auto" }}>+ Create New Project</Button>
        ) : null}
      </div>
      {/* <Route
        path={"/dashboard/create-project"}
        render={props => <h1>create project model for project owner</h1>}
      /> */}
    </div>
  );
};
export default ProjectOwner;
