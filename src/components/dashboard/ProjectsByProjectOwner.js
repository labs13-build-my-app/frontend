import React, { useState, useEffect } from "react";
import { Route } from "react-router";
import placeholder from "../../assets/images/profile-placeholder.png";
import styled from "styled-components";
import { Button, Card } from "../../custom-styles";
import ProjectExpansionPanel from "../ProjectExpansionPanel";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import {
  fecthProjectOwnerProjectsList,
  updateProject
} from "../../store/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin
  // FaUser,
  // FaEnvelope
  // FaDev,
  // FaBook
} from "react-icons/fa";
import EmailDrawer from "../EmailDrawer";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

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

const ProjectByProjectOwner = ({
  project,
  history,
  user,
  loggedInUser,
  setOpen,
  handleOpen,
  modalStyle,
  open
}) => {
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
    }
  }));
  const handleOpenFeedback = projectID => {
    setOpen(true);
    history.push({
      pathname: `/profile/${user.id}/feedbackmodal`,
      state: projectID
    });
  };
  const displayOnlyOnLoggedInUser = () => {
    return loggedInUser.id === user.id ? null : { display: "none" };
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  console.log(project);
  return (
    <>
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
              alt={project.name}
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
              // hide when loggedIn !== user
              <Button
                style={displayOnlyOnLoggedInUser()}
                onClick={() => handleOpenFeedback(project.id)}
              >
                + Add Feedback
              </Button>
            ) : null}
            {/* // hide when loggedIn !== user */}
            <Icon
              className={clsx(classes.delete, "far fa-trash-alt")}
              style={displayOnlyOnLoggedInUser()}
              onClick={handleOpen}
            />
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              onClose={handleClose}
            >
              <div style={modalStyle} className={classes.paper}>
                <h3>Are you sure you want to delete this project?</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around"
                  }}
                >
                  <div
                    className={classes.delete}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Icon
                      className={clsx(classes.accept, "far fa-check-circle")}
                    />
                    <p className={classes.accept}> Delete</p>
                  </div>
                  <div
                    className={classes.delete}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Icon
                      className={clsx(classes.delete, "far fa-times-circle")}
                    />
                    <p> Cancel</p>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </Card>
    </>
  );
};
export default ProjectByProjectOwner;
