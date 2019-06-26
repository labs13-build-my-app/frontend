import React, { useEffect, useState, Children } from "react";
import EmailDrawer from "../EmailDrawer.js";
import { NavLink } from "react-router-dom";
import {
  fetchProject,
  listProjectPlans,
  acceptPlan,
  updateProject
} from "../../store/actions";
import ProjectPlanList from "./ProjectPlanList";
import ProjectPlan from "./ProjectPlan";
import { Button } from "../../custom-styles";
// import Button from "@material-ui/core/Button";
import moment from "moment";
import PlanForm from "./CreatePlanForm";
///////////////////////////////////
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles(theme => ({
  paperModal: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));

const ProjectView = ({
  match,
  user,
  name,
  description,
  budget,
  dueDate,
  isLoading,
  isSignedIn,
  role,
  email,
  image_url,
  history,
  reload,
  children,
  firstName,
  lastName,
  projectOwnerAvatar,
  user_id
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
  const modalClasses = useStyles();

  const [project, setProject] = useState([]);
  // console.log("USER <===========", user);
  useEffect(() => {
    const formatDate = unixDate => {
      //function to format unix date
      const date = new Date(Number(unixDate)); //make date string into date object
      return moment(date).format("MMMM Do YYYY"); //return formatted date object
    };
    const formatBudget = (
      budgetInCents //function to format cents to dollars
    ) => `$${(budgetInCents / 100).toFixed(2)}`; //return a string with a $ and a . for the remaining cents

    if (!match.params.project_id && !isLoading) {
      const newDueDate = formatDate(dueDate); //run res.data.date through formatter
      const newBudget = formatBudget(budget); //change budget from dollars to cents
      setProject({
        name,
        description,
        email,
        image_url,
        budget: newBudget,
        dueDate: newDueDate,
        firstName,
        lastName,
        projectOwnerAvatar,
        user_id
      });
    }
    if (match.params.project_id && !isLoading) {
      fetchProject(
        match.params.project_id,
        formatDate,
        formatBudget,
        setProject
      );
    }
  }, [
    match.params.project_id,
    isLoading,
    name,
    description,
    budget,
    dueDate,
    email,
    image_url,
    firstName,
    lastName,
    projectOwnerAvatar
  ]);

  const [projectPlans, setProjectPlans] = useState([]);
  useEffect(() => {
    console.log("is this use effect being invoked?");
    // const { reload } = history.location.state || false;
    if ((match.params.project_id && !isLoading) || reload) {
      listProjectPlans(match.params.project_id, setProjectPlans);
    }
  }, [match.params.project_id, isLoading, reload]);

  const [selectedPlan, setSelectedPlan] = useState([]);
  useEffect(() => {
    setSelectedPlan(projectPlans.find(plan => plan.planStatus === "selected"));
  }, [projectPlans]);

  const [completedPlan, setCompletedPlan] = useState(null);
  useEffect(() => {
    setCompletedPlan(
      projectPlans.find(plan => plan.planStatus === "completed")
    );
  }, [projectPlans]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  ////////////////////////  MUI STYLINGS
  const getStyles = makeStyles(theme => ({
    projectCard: {
      display: "flex",
      alignItems: "center",
      width: "80%",
      maxWidth: "1000px",
      margin: "0 auto",
      border: " 2px solid red",
      justifyContent: "space-around"
    },
    cardText: {
      fontSize: "larger",
      fontWeight: "600"
    },
    subheader: {
      marginTop: "10px"
    },
    card: {
      // maxWidth: 345,
      // display: "flex",
      // justifyContent: "space-around"
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    avatar: {
      backgroundColor: red[500]
    },
    bigAvatar: {
      width: "120px",
      margin: "10px",
      height: "120px"
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "space-evenly"
    }
  }));

  const classes = getStyles();

  const clickHandler = (e, id, status) => {
    acceptPlan(match.params.project_id, { planStatus: status, id: id });
    const plan = projectPlans.find(plan => plan.id === id);
    setSelectedPlan(() => ({
      ...plan,
      planStatus: status
    }));
    setProject(prevState => ({
      ...prevState,
      projectStatus: status === "selected" ? "in progress" : "proposal"
    }));
  };
  const { modal } = history.location.state || false;

  return (
    <>
      <Card classes={{ root: classes.projectCard }}>
        <CardHeader
          classes={{ title: classes.cardText, subheader: classes.subheader }}
          avatar={
            project.image_url ? (
              <Avatar
                alt="Remy Sharp"
                src={project.projectOwnerAvatar}
                className={classes.bigAvatar}
              />
            ) : null
          }
          title={project.name}
          subheader={`Project Owner: ${project.firstName} ${project.lastName}`}
        />
        <div
          className="btn-wrap"
          style={{
            display: "flex",
            minWidth: "400px",
            justifyContent: "space-evenly"
          }}
        >
          <Button
            medium
            variant="outlined"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              history.push(`/profile/${project.user_id}`);
            }}
          >
            View Profile
          </Button>
          {project.user_id === user.id ? null : (
            <EmailDrawer
              emailAddress={project.email}
              firstName={user.firstName}
            />
          )}
        </div>
      </Card>

      <Card className="project-card" style={{ width: "80%" }}>
        {/* Image >>>> */}
        {project.image_url ? (
          <CardMedia
            className={classes.media}
            image={project.image_url}
            title={project.name}
          />
        ) : null}
        {/* Image <<< */}

        <div>
          <CardContent className={classes.content}>
            <p>{project.description}</p>
            <p>Willing to pay {project.budget}</p>
            <p>Need by {project.dueDate}</p>
          </CardContent>

          {project.projectStatus === "completed" ? (
            <p>{project.feedback}</p>
          ) : null}

          {project.projectStatus === "proposal" &&
          isSignedIn &&
          role === "Developer" ? (
            <div>
              <Button onClick={handleOpen} className="create-plan">
                + Apply to this project
              </Button>
              <Modal open={open} onClose={handleClose}>
                <div style={modalStyle} className={modalClasses.paperModal}>
                  <PlanForm
                    projectId={project.id}
                    user={user}
                    history={history}
                  />
                </div>
              </Modal>
            </div>
          ) : completedPlan && project.projectStatus !== "completed" ? (
            <Button
              onClick={() => {
                updateProject(
                  project.id,
                  { projectStatus: "completed" },
                  history
                );
              }}
            >
              <i class="fas fa-check" /> &nbsp; Mark Completed
            </Button>
          ) : null}
        </div>
      </Card>
      {project.projectStatus === "proposal" ? (
        <ProjectPlanList
          style={{ width: "60%" }}
          project={project}
          projectPlans={projectPlans}
          user={user}
          clickHandler={clickHandler}
          history={history}
        />
      ) : selectedPlan !== undefined ? (
        <ProjectPlan
          project={project}
          plan={selectedPlan}
          user={user}
          clickHandler={clickHandler}
        />
      ) : null}
    </>
  );
};

export default ProjectView;
