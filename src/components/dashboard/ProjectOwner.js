import React, { useState, useEffect } from "react";
import { Route } from "react-router";
import placeholder from "../../assets/images/profile-placeholder.png";
import styled from "styled-components";
import { Button, Card } from "../../custom-styles";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import {
  fecthProjectOwnerProjectsList,
  updateProject
} from "../../store/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaUser,
  FaEnvelope
  // FaDev,
  // FaBook
} from "react-icons/fa";
import EmailDrawer from "../EmailDrawer";

// const Card = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   margin: 20px auto;
//   border: 1px solid lightgrey;
//   border-radius: 15px;
//   box-shadow: lightgrey 15px 15px 15px;
//   padding: 10px;
// `;

const UserInfo = styled.div`
  text-align: left;
  width: 50%;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 10%;
  height: 100% img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

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
  console.log("LOGGEDIN USER", loggedInUser, "USER", user);
  console.log(user, "USERRRRRRRRRRRRRRRRRRRRRR");
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
    const user_id = user.id;
    const project_id = history.location.state;
    updateProject(history.location.state, {
      feedback,
      user_id,
      project_id
    })(history);
  };

  useEffect(() => {
    fecthProjectOwnerProjectsList(user.id, setProjects);
  }, [user.id, history.location.state]);

  const displayOnlyOnLoggedInUser = () => {
    return loggedInUser.id === user.id ? null : { display: "none" };
  };
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Card className={"card userCard"}>
        <div style={{ width: "50%" }}>
          <img
            src={
              user.profile_picture_url ? user.profile_picture_url : placeholder
            }
            alt={"avatar"}
            style={{
              borderRadius: "100%",
              width: "50%"
            }}
          />
        </div>
        <UserInfo>
          <List component="userInfo" aria-label="Dashboard user info list">
            <ListItem>
              <ListItemIcon>
                <FaUser />
              </ListItemIcon>
              <ListItemText>
                {user.firstName} {user.lastName}
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FaEnvelope />
              </ListItemIcon>
              <ListItemText>{user.email}</ListItemText>
            </ListItem>

            <Divider />
            <ListItem>
              <ListItemIcon>
                <FaGithub />
              </ListItemIcon>
              <ListItemLink
                target="_blank"
                href={`https://github.com/${user.gitHub}`}
              >
                <ListItemText primary={`${user.gitHub}`} />
              </ListItemLink>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FaLinkedin />
              </ListItemIcon>
              <ListItemLink
                target="_blank"
                href={`https://www.linkedin.com/in/${user.linkedIn}`}
              >
                <ListItemText primary={`${user.linkedIn}`} />
              </ListItemLink>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FaTwitter />
              </ListItemIcon>
              <ListItemLink
                target="_blank"
                href={`https://twitter.com/${user.twitter}`}
              >
                <ListItemText primary={`${user.twitter}`} />
              </ListItemLink>
            </ListItem>
          </List>
          <p>{user.role}</p>
          {loggedInUser.id === user.id ? null : (
            <EmailDrawer
              emailAddress={user.email}
              firstName={loggedInUser.firstName}
            />
          )}
        </UserInfo>
      </Card>
      <Button
        large
        style={displayOnlyOnLoggedInUser()}
        onClick={() =>
          history.push({
            state: { modal: true, projectOwner_id: loggedInUser.id }
          })
        }
      >
        + Create New Project
      </Button>
      {console.log(projects)}
      {projects.length === 0 ? (
        <Card className={"card projectsCard"}>No Projects</Card>
      ) : (
        projects.map(project => (
          <Card key={project.id} className={"card projectsCard"}>
            <ImageContainer
              style={{
                width: "55%",
                display: "flex",
                alignItems: "center",
                justifyContent: "end"
              }}
            >
              {project.image_url ? (
                <img
                  style={{ width: "100%" }}
                  src={project.image_url}
                  alt={"avatar"}
                />
              ) : null}
            </ImageContainer>

            <div
              className="leftSideProjectCard"
              style={{ width: "40%", display: "flex", flexDirection: "column" }}
            >
              <div>
                <h1 onClick={() => history.push(`/project/${project.id}`)}>
                  {project.name}
                </h1>
                <p>{project.description}</p>
              </div>
              <p>Plans Available</p>
              <h2>{project.plans.length}</h2>
              <div className="buttons">
                {project.projectStatus === "completed" ? (
                  <Button
                    style={displayOnlyOnLoggedInUser()}
                    onClick={() => handleOpen(project.id)}
                  >
                    Add Feedback
                  </Button>
                ) : null}
                <Button style={displayOnlyOnLoggedInUser()}>Delete</Button>
              </div>
            </div>
          </Card>
        ))
      )}
      {/* // hide when loggedIn !== user */}
      {/* <Button
        style={displayOnlyOnLoggedInUser()}
        onClick={() =>
          history.push({
            state: { modal: true, projectOwner_id: loggedInUser.id }
          })
        }
      >
        + Create New Project
      </Button> */}
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
                  <Button small type="submit">
                    Submit
                  </Button>
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
