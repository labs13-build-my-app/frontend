import React, { useEffect, useState, Children } from "react";
import EmailDrawer from "../EmailDrawer.js";
import {
  fetchProject,
  listProjectPlans,
  acceptPlan,
  updateProject,
  formatDate
} from "../../store/actions";
import ProjectPlanList from "./ProjectPlanList";
import ProjectPlan from "./ProjectPlan";
import { Button } from "../../custom-styles";
// import Button from "@material-ui/core/Button";
import moment from "moment";
import PlanForm from "./CreatePlanForm";
///////////////////////////////////
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles(theme => ({
  paperModal: {
    position: "absolute",
    width: "85%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none"
  }
}));

const Project = ({
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
  const [openPlan, setOpenPlan] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenPlan = () => {
    setOpenPlan(true);
  };

  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };
  const modalClasses = useStyles();

  const [project, setProject] = useState([]);

  useEffect(() => {
    // const formatDate = unixDate => {
    //   //function to format unix date
    //   const date = new Date(Number(unixDate)); //make date string into date object
    //   return moment(date).format("MMMM Do YYYY"); //return formatted date object
    // };
    const formatBudget = (
      budgetInCents //function to format cents to dollars
    ) => `$${(budgetInCents / 100).toFixed(2)}`; //return a string with a $ and a . for the remaining cents

    if (!match.params.project_id && !isLoading) {
      // const newDueDate = formatDate(dueDate); //run res.data.date through formatter
      const newBudget = formatBudget(budget); //change budget from dollars to cents
      console.log(newBudget);
      setProject({
        name,
        description,
        email,
        image_url,
        budget: newBudget,
        dueDate,
        firstName,
        lastName,
        projectOwnerAvatar,
        user_id
      });
    }
    // if (match.params.project_id && !isLoading) {
    //   fetchProject(
    //     match.params.project_id,
    //     // formatDate,
    //     formatBudget,
    //     setProject
    //   );
    // }
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
    projectOwnerAvatar,
    user_id
  ]);

  const [projectPlans, setProjectPlans] = useState([]);
  useEffect(() => {
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
      margin: 10,
      width: 75,
      height: 75
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "80%",
      margin: "0 auto"
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

  return (
    <>
      <Card
        className="project-card"
        style={{ width: "100%", marginBottom: "20px", minHeight: "700px" }}
      >
        <CardMedia
          className={classes.media}
          image={project.image_url || require("../../assets/images/grey.jpg")}
          title={project.name}
        />
        <CardHeader
          avatar={
            <Avatar
              alt="Profile image"
              src={
                project.projectOwnerAvatar ||
                require("../../assets/images/profile-placeholder.png")
              }
              className={classes.bigAvatar}
            />
          }
          title={project.name}
          subheader={`Project Owner: ${project.firstName} ${project.lastName}`}
        />
        <div>
          <CardContent className={classes.content}>
            <p>
              {project.description !== undefined
                ? project.description.length >= 100
                  ? `${project.description.slice(0, 100)}...`
                  : project.description
                : null}
            </p>
            <p>Willing to pay {project.budget}</p>
            <p>Need by {project.dueDate}</p>
          </CardContent>

          <CardContent className={classes.buttonWrapper}>
            <Button
              // style={{ marginBottom: "25px", marginTop: "25px" }}
              small
              variant="outlined"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();

                history.push(`/profile/${project.user_id}`);
              }}
            >
              View Profile
            </Button>

            {/* added conditions to only render email option if project does not belong to current user */}

            {project.user_id === user.id ? null : (
              <EmailDrawer
                emailAddress={project.email}
                firstName={user.firstName}
                buttonText={`Message ${project.firstName} `}
              />
            )}
          </CardContent>

          {project.projectStatus === "completed" ? (
            <>
              <span className="project-feedback-tag">Project Feedback: </span>
              <p className="project-feedback-text">{project.feedback}</p>
            </>
          ) : null}

          {project.projectStatus === "proposal" &&
          isSignedIn &&
          role === "Developer" ? (
            <div>
              <Button
                onClick={handleOpenPlan}
                className="create-plan"
                //              to={{
                //state: {
                //    project_id: project.id,
                //    modal: modal === true ? false : true
                //  }
                //}}
              >
                + Apply to this project
              </Button>
              <Modal open={openPlan}>
                <div style={modalStyle} className={modalClasses.paperModal}>
                  <PlanForm
                    projectId={project.id}
                    user={user}
                    history={history}
                    setOpenPlan={setOpenPlan}
                    project={project}
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

export default Project;
