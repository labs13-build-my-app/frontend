import React, { useState } from "react";
import axios from "axios";

const CreatePlan = () => {
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
    const user_id = 2;
    const project_id = 2;
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
    axios({
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      url: "http://localhost:8000/api/plans/createplan",
      data: {
        name,
        description,
        technologiesToUse,
        budget,
        dueDate,
        planStatus,
        user_id,
        project_id
      }
    })
      .then(res => console.log(res, "here"))
      .catch(err => console.log(err, testData));
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
