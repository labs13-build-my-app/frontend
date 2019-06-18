import React, { useEffect, useState } from "react";
import { Card } from "../../custom-styles";

const ProjectPlanList = ({ projectPlans, project, user, clickHandler }) => {
  return (
    <div className={"project-plans"}>
      {projectPlans &&
        projectPlans
          .filter(plan => plan.planStatus !== "declined")
          .map(plan => {
            return (
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
                  <p>Will accept ${(plan.budget / 100).toFixed(2)}</p>
                  <p>Can Deliver by {plan.dueDate}</p>
                  <p>Plan Status: {plan.planStatus}</p>
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
            );
          })}
    </div>
  );
};

export default ProjectPlanList;
