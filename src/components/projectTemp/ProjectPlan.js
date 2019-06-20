import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCard";
import ConfirmationButtons from "./ConfirmationButtons";
import { Card } from "../../custom-styles";
import EmailDrawer from "../EmailDrawer";
import { fetchProjectSelectedPlan } from "../../store/actions";

const ProjectPlan = ({
  project,
  user,
  plan: planCard,
  setProject,
  history
}) => {
  const [plan, setPlan] = useState({});

  const { plan: seletectPlan } = history.location.state || false;
  useEffect(() => {
    if (planCard) {
      setPlan(planCard);
    } else if (seletectPlan) {
      setPlan(seletectPlan);
    } else {
      fetchProjectSelectedPlan(project.id, setPlan);
    }
  }, [planCard, seletectPlan, project.id]);

  useEffect(() => {
    if (plan) {
      history.push({ state: { planStatus: plan.planStatus } });
    }
  }, [plan]);

  return (
    <>
      {planCard || plan ? ( // maybe do the condtion for logged in user and if user id match user on plan display this card? and if user match user on project
        <Card style={{ width: "80%", color: "black" }}>
          <PlanCard plan={plan}>
            <EmailDrawer emailAddress={plan.email} firstName={user.firstName} />
          </PlanCard>
          <ConfirmationButtons
            {...{ project, user, plan, setPlan, setProject, history }}
          />
        </Card>
      ) : null}
    </>
  );
};

export default ProjectPlan;
