import React, { useState } from "react";
import axios from "axios";
import { createNewPlan } from "../store/actions";

const CreatePlan = ({ history, user }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [technologiesToUse, setTechnologies] = useState("");
  const [budget, setBudget] = useState("");
  const [dueDate, setfinishedBy] = useState("");

  const changeHandler = (e, setState) => {
    setState(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    const user_id = user.id;
    const project_id = history.location.state.projectid;
    const planStatus = "started";
    const testData = {
      name,
      description,
      technologiesToUse,
      budget,
      dueDate,
      planStatus,
      user_id,
      project_id
    };
    createNewPlan(
      {
        name,
        description,
        technologiesToUse,
        budget,
        dueDate,
        planStatus,
        user_id,
        project_id
      },
      project_id
    )();

    history.push(`/profile/${user.id}`);
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Name</label>
      <input
        name={"name"}
        value={name}
        onChange={e => changeHandler(e, setName)}
      />
      <label>Description</label>
      <input
        name={"description"}
        value={description}
        onChange={e => changeHandler(e, setDescription)}
      />
      <label>Technologies</label>
      <input
        name={"technologies"}
        value={technologiesToUse}
        onChange={e => changeHandler(e, setTechnologies)}
      />
      <label>Budget</label>
      <input
        name={"budget"}
        value={budget}
        onChange={e => changeHandler(e, setBudget)}
      />
      <label>Finished By</label>
      <input
        name={"Finished By"}
        value={dueDate}
        onChange={e => changeHandler(e, setfinishedBy)}
      />
      <button type={"submit"}>Submit</button>
    </form>
  );
};

export default CreatePlan;
