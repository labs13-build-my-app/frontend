import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchPlan } from "../../store/actions";

const Plan = ({ match, isLoading, isSignedIn, role }) => {
  const [plan, setPlan] = useState([]);

  console.log(match);

  useEffect(() => {
    fetchPlan(match.params.plan_id)(setPlan);
  }, [match.params.plan_id]);
  return (
    <div>
      <h1>Name: {plan.name}</h1>
      <h1>desc: {plan.description}</h1>
      <h1>tech: {plan.technologiesToUse}</h1>
      <h1>bud: {plan.budget}</h1>
      <h1>date: {plan.dueDate}</h1>
      <h1>status: {plan.planStatus}</h1>
    </div>
  );
};
console.log("hello plan");

export default Plan;
