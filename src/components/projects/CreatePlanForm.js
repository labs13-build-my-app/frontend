import React from "react";
import { createPlan } from "../../store/actions";
//>>>>>>>>>>>>>>>>>>>>>>>>
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
//<<<<<<<<<<<<<<
const CreatePlan = ({ history, user, dispatch }) => {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [technologiesToUse, setTechnologies] = useState("");
  // const [budget, setBudget] = useState("");
  // const [dueDate, setfinishedBy] = useState("");

  // const changeHandler = (e, setState) => {
  //   setState(e.target.value);
  // };

  // const submitHandler = e => {
  //   e.preventDefault();
  //   const user_id = user.id;
  //   const project_id = history.location.state.projectid;
  //   const planStatus = "started";
  //   const testData = {
  //     name,
  //     description,
  //     technologiesToUse,
  //     budget,
  //     dueDate,
  //     planStatus,
  //     user_id,
  //     project_id
  //   };
  //   createPlan(
  //     {
  //       name,
  //       description,
  //       technologiesToUse,
  //       budget,
  //       dueDate,
  //       planStatus,
  //       user_id,
  //       project_id
  //     },
  //     project_id
  //   );

  //   history.push(`/profile/${user.id}`);
  // };
  //>>>>>>>>>>>>>>>>>>>>>>>>
  const { inputs: state, handleInputChange, handleSubmit } = useInput(() => {
    const budgetDisplay = { ...state, budget: state.budget * 100 }; // ??? does not display the right format
    createPlan(budgetDisplay, history.location.state.project_id, dispatch); // why I need a dispatch?
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
  //<<<<<<<<<<<<<<
  return (
    // <form onSubmit={handleSubmit}>
    //   <label>Name</label>
    //   <input
    //     name={"name"}
    //     value={name}
    //     onChange={e => changeHandler(e, setName)}
    //   />
    //   <label>Description</label>
    //   <input
    //     name={"description"}
    //     value={description}
    //     onChange={e => changeHandler(e, setDescription)}
    //   />
    //   <label>Technologies</label>
    //   <input
    //     name={"technologies"}
    //     value={technologiesToUse}
    //     onChange={e => changeHandler(e, setTechnologies)}
    //   />
    //   <label>Budget</label>
    //   <input
    //     name={"budget"}
    //     value={budget}
    //     onChange={e => changeHandler(e, setBudget)}
    //   />
    //   <label>Finished By</label>
    //   <input
    //     name={"Finished By"}
    //     value={dueDate}
    //     onChange={e => changeHandler(e, setfinishedBy)}
    //   />
    //   <button type={"submit"}>Submit</button>
    // </form>
    //<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>
    <div style={{ marginLeft: "20%", width: "80%" }}>
      <StyledCard>
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
