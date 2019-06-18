import React from "react";
import { createPlan } from "../../store/actions";
import { useInput } from "../../utils/customhooks/index";
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
  width: 80%;
  box-shadow: 10px 10px 10px grey;
`;

const CreatePlan = ({ history, user, dispatch }) => {
  const { inputs: state, handleInputChange, handleSubmit } = useInput(() => {
    const plan = { ...state, budget: state.budget * 100 };

    createPlan(plan, history.location.state.project_id, dispatch); // why I need a dispatch?
    history.push(`/profile/${user.id}`);
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
    <div style={{ marginLeft: "20%", width: "80%" }}>
      <StyledCard
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <h2>Add Plan</h2>
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
            label="Plan Name"
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
            label="Description"
            multiline
            rows="6"
          />
          <br />
          <br />
          <TextField
            onChange={handleInputChange}
            name="technologiesToUse"
            type="text"
            value={state.technologiesToUse}
            required
            className={classes.textField}
            margin="normal"
            variant="outlined"
            label="Technologies"
            multiline
            rows="6"
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
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
          <br />
          <br />
          <TextField
            label="Finish By"
            name="dueDate"
            type="date"
            onChange={handleInputChange}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
          <br />
          <br />
          <Button type="submit">Submit</Button>
          <br />
          <br />
        </form>
      </StyledCard>
    </div>
  );
};

export default CreatePlan;
