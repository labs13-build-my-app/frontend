import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Card } from "../../custom-styles";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";
import { listProjectPlans, deleteProject } from "../../store/actions";

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
  open,
  openDelete,
  updateProjectStatus,
  setProjects,
  reload,
  setReload,
  handleOpenFeedback,
  handleCloseDelete
}) => {
  console.log(project);
  const [projectPlans, setProjectPlans] = useState({});

  useEffect(() => {
    listProjectPlans(project.id, setProjectPlans);
  }, [project.id]);

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
  // const handleOpenFeedback = projectID => {
  //   setOpen(true);
  //   history.push({
  //     pathname: `/profile/${user.id}/feedbackmodal`,
  //     state: projectID
  //   });
  // };
  const displayOnlyOnLoggedInUser = () => {
    return loggedInUser.id === user.id ? null : { display: "none" };
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <Card key={project.id} className={"card projectsCard"}>
        {project.image_url ? (
          <ImageContainer
            style={{
              width: "55%",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              cursor: "pointer"
            }}
            onClick={() => history.push(`/project/${project.id}`)}
          >
            {project.image_url ? (
              <img
                style={{ width: "100%" }}
                src={project.image_url}
                alt={project.name}
              />
            ) : null}
          </ImageContainer>
        ) : null}

        <div
          className="leftSideProjectCard"
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            wordWrap: "break-word"
          }}
        >
          <div>
            <h1
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/project/${project.id}`)}
            >
              {project.name}
            </h1>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/project/${project.id}`)}
            >
              {project.description}
            </p>
          </div>
          {/* <p>Plans Available</p>
          <h2>{project.plans.length}</h2> */}
          <div className="buttons">
            {project.plans.length === 0 ? null : project.plans[0].planStatus ===
                "completed" && project.projectStatus === "in progress" ? (
              <Button
                medium
                center
                style={displayOnlyOnLoggedInUser()}
                onClick={() => {
                  updateProjectStatus(project, setProjects);
                }}
              >
                <i class="fas fa-check" /> &nbsp; Mark Completed
              </Button>
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center"
              }}
            >
              {project.projectStatus === "completed" && !project.feedback ? (
                // hide when loggedIn !== user
                <Button
                  medium
                  style={displayOnlyOnLoggedInUser()}
                  onClick={() => handleOpenFeedback(project.id)}
                >
                  + Add Feedback
                </Button>
              ) : null}
              <Icon
                className={clsx(classes.delete, "far fa-trash-alt")}
                style={displayOnlyOnLoggedInUser()}
                // style={{ display: "none" }}
                onClick={() => handleOpen()}
              />
            </div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={openDelete}
              //onClose={handleClose}
            >
              <div style={modalStyle} className={classes.paper}>
                <h3>Are you sure you want to delete this project?</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around"
                  }}
                >
                  <Button
                    backgroundColor="green"
                    color="white"
                    width="35%dd"
                    small
                    onClick={() => {
                      deleteProject(project.id, reload, setReload);
                      handleCloseDelete();
                    }}
                  >
                    <Icon className={clsx("", "far fa-check-circle")} />
                    <p> Delete</p>
                  </Button>
                  <Button
                    backgroundColor="red"
                    color="white"
                    width="35%"
                    small
                    onClick={handleCloseDelete}
                  >
                    <Icon className={clsx("", "far fa-times-circle")} />
                    <p> Cancel</p>
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default ProjectByProjectOwner;
