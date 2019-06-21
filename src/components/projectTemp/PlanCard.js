import React, { useState } from "react";

const PlanCard = ({ plan, children }) => {
  return (
    <>
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
        {children}
      </div>
    </>
  );
};

export default PlanCard;
