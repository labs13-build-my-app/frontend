import React, { useState, useEffect } from "react";
import { Route } from "react-router";
import placeholder from "../../assets/images/profile-placeholder.png";
import styled from "styled-components";
import { Button, Card } from "../../custom-styles";
import ProjectExpansionPanel from "../ProjectExpansionPanel";
import ProjectsByProjectOwner from "./ProjectsByProjectOwner";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import {
  fecthProjectOwnerProjectsList,
  updateProject,
  updateProjectStatus,
  listProjectPlans
} from "../../store/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Divider from "@material-ui/core/Divider";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import EmailDrawer from "../EmailDrawer";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import ProjectForm from "../../components/projects/CreateProjectForm";

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
  },
  delete: {
    marginLeft: "10px",
    color: "red",
    "&:hover": {
      color: "darkred"
    }
  },
  accept: {
    marginLeft: "10px",
    color: "green",
    "&:hover": {
      color: "darkgreen"
    },
    socialIcons: {
      margin: "0px 10px"
    }
  },
  paperModal: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
    height: "70vh",
    overflow: "scroll"
  }
}));

const ProjectOwner = ({ loggedInUser, user, role, history }) => {
  const [open, setOpen] = React.useState(false);
  const [openProject, setOpenProject] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const modalClasses = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenProject = () => {
    setOpenProject(true);
  };
  const handleOpenFeedback = projectID => {
    setOpen(true);
    history.push({
      pathname: `/profile/${user.id}/feedbackmodal`,
      state: projectID
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseProject = () => {
    setOpenProject(false);
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
    updateProject(
      history.location.state,
      {
        feedback,
        user_id,
        project_id
      },
      history
    );
  };

  const [reload, setReload] = useState(false);
  useEffect(() => {
    fecthProjectOwnerProjectsList(user.id, setProjects);
  }, [user.id, history.location.state, reload]);

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
            <p style={{ fontSize: "20px" }}>
              {user.firstName} {user.lastName}
            </p>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bolder",
                marginBottom: "20px",
                display: "block"
              }}
            >
              {user.role}
            </span>
            <Divider style={{ margin: "10px 0px" }} />
            <div style={{ display: "flex", alignItems: "center" }}>
              {user.gitHub ? (
                <a target="_blank" href={`${user.gitHub}`}>
                  <FaGithub
                    style={{ margin: "10 10px 10 0px", color: "#211F1F" }}
                    size="35px"
                  />
                </a>
              ) : null}
              {user.linkedIn ? (
                <a target="_blank" href={`${user.linkedIn}`}>
                  <FaLinkedin
                    style={{ margin: "10 10px", color: "#0077B5" }}
                    size="35px"
                  />
                </a>
              ) : null}
              {user.twitter ? (
                <a target="_blank" href={`${user.twitter}`}>
                  <FaTwitter
                    style={{ margin: "10 10px", color: "#00aced" }}
                    size="35px"
                  />
                </a>
              ) : null}
            </div>
            {loggedInUser.id === user.id ? null : (
              <EmailDrawer
                buttonSize
                emailAddress={user.email}
                firstName={loggedInUser.firstName}
                buttonText={`Message ${user.firstName}`}
              />
            )}
          </List>
        </UserInfo>
      </Card>
      <Button
        large
        center
        style={displayOnlyOnLoggedInUser()}
        onClick={handleOpenProject}
      >
        + Create New Project
      </Button>
      <Modal open={openProject}>
        <div style={modalStyle} className={modalClasses.paperModal}>
          <ProjectForm
            history={history}
            setOpenProject={setOpenProject}
            setProjects={setProjects}
            projectOwnerID={user.id}
          />
        </div>
      </Modal>

      {projects.length === 0 ? (
        <Card className={"card projectsCard"}>No Projects</Card>
      ) : (
        projects.map(project => (
          <ProjectExpansionPanel
            key={project.id}
            project={project}
            component={
              <>
                <ProjectsByProjectOwner
                  setOpen={setOpen}
                  user={user}
                  loggedInUser={loggedInUser}
                  handleOpen={handleOpen}
                  modalStyle={modalStyle}
                  project={project}
                  history={history}
                  open={open}
                  updateProjectStatus={updateProjectStatus}
                  setProjects={setProjects}
                  reload={reload}
                  setReload={setReload}
                />
              </>
            }
          />
        ))
      )}
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
    </div>
  );
};
export default ProjectOwner;
