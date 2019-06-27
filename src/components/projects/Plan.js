import React, { useEffect, useState } from "react";
import {
  fetchPlan,
  updatePlan,
  sendUpdateMessage,
  formatDate
} from "../../store/actions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "../../custom-styles";
import moment from "moment";
// import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Plan = ({
  match,
  isLoading,
  isSignedIn,
  role,
  planID,
  loggedInUser,
  user,
  history,
  reload,
  setReload
}) => {
  // const { fullScreen } = props;
  // const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [plan, setPlan] = useState({});
  const [planStatus, setPlanStatus] = useState("");

  // function handleClickOpen() {
  //   setOpen(true);
  // }

  // function handleClose() {
  //   setOpen(false);
  // }

  const changeHandler = e => {
    let planUpdate = e.target.value;
    setPlanStatus(planUpdate);
  };
  const currentPlanID = planID || match.params.plan_id;

  const submitHandler = e => {
    e.preventDefault();
    let planUpdate = "completed";
    setPlanStatus(planUpdate);

    updatePlan({ planStatus: planUpdate }, currentPlanID);
    setPlan(prevState => ({
      ...prevState,
      planStatus: planUpdate
    }));
    setPlanStatus("");
    sendUpdateMessage({
      projectID: plan.project_id,
      userEmail: user.email,
      name: user.firstName
    });
    setReload(!reload);
  };

  useEffect(() => {
    fetchPlan(currentPlanID, setPlan);
  }, [currentPlanID]);

  return (
    <div>
      {/* <h1>Name: {plan.name}</h1> */}
      <div className="left" />
      <ul className={"plan-card-info"}>
        <li className={"plan-card-list"}>
          <span className={"plan-tag-title"}>Description:</span>
          <span className={"plan-title-info plan-desc"}>
            {plan.description}
          </span>
        </li>
        <li className={"plan-card-list"}>
          <span className={"plan-tag-title"}>Technologies:</span>
          <span className={"plan-title-info"}>{plan.technologiesToUse}</span>
        </li>
        <li className={"plan-card-list"}>
          <span className={"plan-tag-title"}>Budget:</span>
          <span className={"plan-title-info"}>
            $ &nbsp;{(plan.budget / 100).toFixed(2)}
          </span>
        </li>
        <li className={"plan-card-list"}>
          <span className={"plan-tag-title"}>Finish By:</span>
          <span className={"plan-title-info"}>{formatDate(plan.dueDate)}</span>
        </li>
      </ul>

      {plan.planStatus === "selected" ? (
        <>
          <Button
            onClick={submitHandler}
            type={"submit"}
            style={{ margin: "20px" }}
          >
            Mark Completed
          </Button>
          <Button
            small
            onClick={() => history.push(`/project/${plan.project_id}`)}
          >
            See Project Page
          </Button>
        </>
      ) : // <form onSubmit={submitHandler}>
      //   <FormControl className={classes.formControl}>
      //     <InputLabel htmlFor="name-simple">Plan Status</InputLabel>
      //     <Select
      //       // className={classes.select}
      //       value={planStatus}
      //       onChange={e => changeHandler(e)}
      //     >
      //       <MenuItem value="" />

      //       <MenuItem value={"completed"}>Completed</MenuItem>
      //     </Select>
      //     <Button type={"submit"} style={{ margin: "20px" }}>
      //       Submit
      //     </Button>
      //   </FormControl>
      // </form>
      null}
    </div>
  );
};

export default Plan;
