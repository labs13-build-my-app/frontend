import React, { useState } from "react";
import axios from "axios";
import { useInput } from "./customhooks/index";

const CreateProjectForm = () => {
  const { inputs: state, handleInputChange, handleSubmit } = useInput(() => {
    axios
      .post(
        "http://localhost:8000/api/projects/create-project-project-owner",
        state
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error.message);
      });
  });
  // const [projects, setProject] = useState({})
  // const [project, , handleChanges] = useInput({})

  // const addProject = () => {
  //   const newproject = [
  //     ...projects
  //     // { add new project object }
  //   ];
  //   setProject(newproject);
  // };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleInputChange}
          name="name"
          type="text"
          value={state.name}
        />
        <input
          onChange={handleInputChange}
          name="decription"
          type="text"
          value={state.decription}
        />
        <input
          onChange={handleInputChange}
          name="image_url"
          type="text"
          value={state.image_url}
        />
        <input
          onChange={handleInputChange}
          name="budget"
          type="text"
          value={state.budget}
        />
        <input
          onChange={handleInputChange}
          name="dueDate"
          type="text"
          value={state.dueDate}
        />
        <input
          onChange={handleInputChange}
          name="projectStatus"
          type="text"
          value={state.projectStatus}
        />
        <input
          onChange={handleInputChange}
          name="paymentStatus"
          type="text"
          value={state.paymentStatus}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProjectForm;
