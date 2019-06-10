import React from "react";
import { useInput } from "../../utils/customhooks/index";
import { createProject } from "../../store/actions";

const CreateProjectForm = ({ history, dispatch }) => {
  const { inputs: state, handleInputChange, handleSubmit } = useInput(() => {
    createProject(state)(dispatch);
    history.push("/test"); // <<< push to projects page
  });
  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          onChange={handleInputChange}
          name="name"
          type="text"
          value={state.name}
          required
        />
        <label>Description</label>
        <input
          onChange={handleInputChange}
          name="description"
          type="text"
          value={state.description}
          required
        />
        <label>Image Url</label>
        <input
          onChange={handleInputChange}
          name="image_url"
          type="text"
          value={state.image_url}
          required
        />
        <label>Budget</label>
        <input
          onChange={handleInputChange}
          name="budget"
          type="text"
          value={state.budget}
          required
        />
        <label>Due Date</label>
        <input
          onChange={handleInputChange}
          name="dueDate"
          type="text"
          value={state.dueDate}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProjectForm;
