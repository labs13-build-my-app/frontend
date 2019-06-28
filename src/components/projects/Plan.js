import React, { useEffect, useState } from "react";
import {
  fetchPlan,
  updatePlan,
  sendUpdateMessage,
  formatDate
} from "../../store/actions";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "../../custom-styles";

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
  const classes = useStyles();
  const [plan, setPlan] = useState({});
  const [planStatus, setPlanStatus] = useState("");

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
            small
            onClick={submitHandler}
            type={"submit"}
            style={{ margin: "20px auto" }}
          >
            Mark Completed
          </Button>
          <Button
            small
            style={{ margin: "0 auto" }}
            onClick={() => history.push(`/project/${plan.project_id}`)}
          >
            See Project Page
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default Plan;
