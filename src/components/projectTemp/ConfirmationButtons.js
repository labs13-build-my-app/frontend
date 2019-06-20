import React, { useState } from "react";
import { acceptPlan } from "../../store/actions";

const ConfirmationButtons = ({
  plan,
  project,
  user,
  setPlan,
  setProject,
  history,
  children
}) => {
  const clickHandler = (e, id, status) => {
    acceptPlan(project.id, { planStatus: status, id: plan.id });
    console.log(plan);

    setPlan(() => ({
      ...plan,
      planStatus: status
    }));
    setProject(prevState => ({
      ...prevState,
      projectStatus: status === "selected" ? "in progress" : "proposal"
    }));
    history.push({ state: { plan: { ...plan, planStatus: "selected" } } });
  };
  return (
    <>
      {project.user_id === user.id && project.projectStatus === "proposal" ? (
        <div className={"button-container"}>
          <button
            type={"submit"}
            onClick={e => {
              return clickHandler(e, plan.id, "selected");
            }}
          >
            Accept
          </button>
          <button
            type={"submit"}
            onClick={e => {
              return clickHandler(e, plan.id, "declined");
            }}
          >
            Decline
          </button>
        </div>
      ) : null}
    </>
  );
};

export default ConfirmationButtons;
