import React, { useEffect, useState } from "react";
import { Button, Card } from "../../custom-styles";
import EmailDrawer from "../EmailDrawer";


const ProjectPlan = ({ project, user, clickHandler, plan, history }) => {

  return (
    <div className={"project-plans"}>
      {plan && (
        <Card style={{ width: "80%", color: "black" }}>
          <div style={{ width: "25%" }}>
            <h3 style={{ color: "black" }} className="ProjectTitle">
              Plan
            </h3>
            <h3 style={{ color: "black" }} className="ProjectTitle">
              {plan.name}
            </h3>
          </div>
          <div style={{ width: "75%" }}>
            <p>{plan.description}</p>

            {user.id === plan.user_id || user.id === plan.project_owner_id ? (
              <>
                <p>Will accept ${(plan.budget / 100).toFixed(2)}</p>
                <p>Can Deliver by {plan.dueDate}</p>
                <p>Plan Status: {plan.planStatus}</p>
              </>
            ) : null}
            {user.id === plan.user_id ? null : (
              <EmailDrawer
                emailAddress={plan.email}
                firstName={user.firstName}
              />
            )}

          </div>
          {project.user_id === user.id &&
          project.projectStatus === "proposal" ? (
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
        </Card>
      )}
    </div>
  );
};

export default ProjectPlan;
