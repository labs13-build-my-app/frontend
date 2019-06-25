import React from "react";
import { useInput } from "../../utils/customhooks/index";
import { createProject } from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button } from "../../custom-styles";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const StyledCard = styled.form`
  background-color: white;
  border: 1px lightgrey solid;
  border-radius: 20px;
  margin: 25px auto;
  width: 70%;
  box-shadow: 10px 10px 10px grey;
  position: fixed;
  margin-left: 10%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CreateProjectForm = ({ history, dispatch }) => {
  const { inputs: state, handleInputChange, handleSubmit } = useInput(() => {
    const project = { ...state, budget: state.budget * 100 };
    createProject(project, dispatch);

    history.push({
      pathname: `/profile/${history.location.state.projectOwner_id}`,
      state: { reload: true }
    });
  });
  const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "80%"
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    menu: {
      width: 200
    }
  }));
  const classes = useStyles();
  return (
    <StyledCard
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit}>
        <br />
        <TextField
          onChange={handleInputChange}
          name="name"
          type="text"
          value={state.name}
          required
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Project Name"
          placeholder="Add a concise name that gives a clear image of your vision for the project"
        />
        <br />
        <br />
        <TextField
          onChange={handleInputChange}
          name="description"
          type="text"
          value={state.description}
          required
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Project Description"
          multiline
          rows="6"
          placeholder="Add a description of the project that would allow a developer to get a good idea of what problem this application solves,
           and how you would like them to go about accomplishing that"
        />
        <br />
        <br />
        <TextField
          onChange={handleInputChange}
          name="image_url"
          type="text"
          value={state.image_url}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Image Url"
          placeholder="Add anything to aid in portraying your vision of the project here, such as preliminary design files or sketches"
        />
        <br />
        <br />
        <TextField
          onChange={handleInputChange}
          name="budget"
          type="text"
          value={state.budget}
          required
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Budget"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          placeholder="How much are you willing to spend to finance the creation of this application?"
        />
        <br />
        <br />
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          onChange={handleInputChange}
          className={classes.textField}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="When would you like the project to be completed? Remember to be reasonable,
           we recommend overbudgeting on time as you might not be aware of what it might take to complete this."
        />
        <br />
        <br />
        <Button type="submit">Submit</Button>
        <br />
        <br />
      </form>
    </StyledCard>
  );
};

export default CreateProjectForm;
