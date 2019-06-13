import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router";
import Projects from "../projects/Projects";
import placeholder from "../../assets/images/profile-placeholder.png";
import styled from "styled-components";
import { Button } from "../../styled-components";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

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

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));

const ProjectOwner = ({ loggedInUser, user, role, history }) => {
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = projectID => {
    setOpen(true);
    history.push({
      pathname: `/profile/${user.id}/feedbackmodal`,
      state: projectID
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  // Add Feedback for completed project
  const [feedback, setFeedback] = useState("");
  const changeHandler = (e, setState) => {
    setState(e.target.value);
  };
  // add  axios call
  const submitHandler = e => {
    e.preventDefault();
    console.log("HERE HISTORY", history.location.state);
    const user_id = user.id;
    const project_id = history.location.state;
    axios({
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      url: `http://localhost:8000/api/account/project-owner/update-project-project-owner/${
        history.location.state
      }`,
      data: {
        feedback,
        user_id,
        project_id
      }
    })
      .then(res => {
        history.push(`/projects/project/${res.data.id}`);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    console.log("Use Effect");
    axios({
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      url: `http://localhost:8000/api/projects/project-list/${user.id}`
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

  console.log("Logged In User", loggedInUser);
  console.log("User", user);
  console.log("Projects", projects);
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

      {projects.length === 0 ? (
        <Card className={"card projectsCard"}>No Projects</Card>
      ) : (
        projects.map(project => (
          <Card key={project.id} className={"card projectsCard"}>
            {project.image_url ? <img src={project.image_url} /> : null}
            <h1 onClick={() => history.push(`/projects/project/${project.id}`)}>
              {project.name}
            </h1>
            {/* <<< See card page */}
            <p>{project.description}</p>

            {project.projectStatus === "completed" ? (
              <Button onClick={() => handleOpen(project.id)}>
                Add Feedback
              </Button>
            ) : null}
            <Button>Delete</Button>
            {/* <<< Modal form to delete with confirmation question to delete */}
          </Card>
        ))
      )}
      <Button
        onClick={() =>
          history.push({
            state: loggedInUser.id,
            pathname: "/create-project-form"
          })
        }
      >
        + Create New Project
      </Button>
      <Route
        path={"/profile/:id/feedbackmodal"}
        render={() => {
          return (
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={handleClose}
            >
              <div style={modalStyle} className={classes.paper}>
                <form onSubmit={submitHandler}>
                  <textarea
                    style={{
                      width: "400px",
                      height: "300px",
                      marginBottom: "10px"
                    }}
                    name={"feedback"}
                    value={feedback}
                    onChange={e => changeHandler(e, setFeedback)}
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </Modal>
          );
        }}
      />
      {/* <Route
      <div className="projects-area" style={{width: '70%', margin: '50px auto'}}>
      <h2 style={{borderBottom: '1px solid black', paddingBottom: '5px', textAlign: 'left'}}>Projects</h2>
      {
        projects.length === 0
          ?  <Card className={'card projectsCard'}>
               No Projects
             </Card>
          : projects.map(project => (
              <Card className={'card projectsCard'}>
                  {
                    project.image_url ? 
                    <img src={project.image_url}/>
                    : null}
                <h1>project.name</h1>
                <p>project.description</p>
              </Card>
          )) 
      }
      {
        user.id === loggedInUser.id 
        ? <Button style={{margin: '50px auto'}}>+ Create New Project</Button>
        : null
      }    

      </div>
      {/* <Route
        path={"/dashboard/create-project"}
        render={props => <h1>create project model for project owner</h1>}
      /> */}
    </div>
  );
};
export default ProjectOwner;
