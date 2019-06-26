import React from "react";
import { useInput } from "../../utils/customhooks/index";
import { createProject } from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button, ExitButton } from "../../custom-styles";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

// const StyledCard = styled.form`
//   background-color: white;
//   border: 1px lightgrey solid;
//   border-radius: 20px;
//   margin: 25px auto;
//   height: 85%;
//   width: 85%;
//   box-shadow: 10px 10px 10px grey;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   .exit {
//     position: absolute;
//     right: 2%;
//     top: 3.5%;
//     height: 20px;
//   }
// `;

const CreateProjectForm = ({
  history,
  setOpenProject,
  projectOwnerID,
  setProjects
}) => {
  const { inputs: state, handleInputChange, handleSubmit } = useInput(() => {
    const project = { ...state, budget: state.budget * 100 };
    createProject(project, projectOwnerID, setProjects);

    // history.push({
    //   pathname: `/profile/${projectOwnerID}`,
    //   state: { reload: true }
    // });
  });

  const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "95%"
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
    <form
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <div className="createProjectFormInputs">
        <h2>Add Project</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <br />
          <ExitButton
            className="exit"
            onClick={() => setOpenProject(false)}
            style={{
              // width: "",
              position: "absolute",
              right: "2%",
              top: "2%",
              height: "20px"
            }}
          />
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
          <TextField
            onChange={handleInputChange}
            name="image_url"
            type="text"
            value={state.image_url}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            label="Image Url"
            placeholder="Anything useful, such as preliminary design files or mockups."
          />

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
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
            placeholder="How much are you willing to spend to finance the creation of this application?"
          />

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
          <Button type="submit">Submit</Button>
          <br />
          <br />
        </form>
      </div>
    </form>
  );
};

export default CreateProjectForm;
