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

  return (
    <>
      {planCard || plan ? (
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
