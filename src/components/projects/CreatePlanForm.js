import React from "react";
import { createPlan } from "../../store/actions";
import { useInput } from "../../utils/customhooks/index";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button, ExitButton, ListDesc } from "../../custom-styles";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import List from "@material-ui/core/List";

import ListItemText from "@material-ui/core/ListItemText";

const CreatePlan = ({ history, user, projectId, setOpenPlan, project }) => {
  const { inputs: state, handleInputChange, handleSubmit } = useInput(() => {
    const plan = { ...state, budget: state.budget * 100 }; // <<<<<< MB

    createPlan(plan, projectId);
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <h1>Add Plan</h1>
      </div>
      <div
        className="createPlanFormContainer"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        <div
          className="createPlanFormInfo"
          style={{
            width: "40%"
          }}
        >
          <ListDesc>
            <h4>Project Name: </h4>
            <span>{project.name}</span>
            <h4>Description: </h4>
            <span>{project.description}</span>
            <h4>Budget: </h4>
            <span>{project.budget}</span>
            <h4>Need by: </h4>
            <span>{project.dueDate}</span>
            <h4>Project Owner:</h4>
            <span>
              {project.firstName}
              {` `}
              {project.lastName}
            </span>
          </ListDesc>
        </div>

        <div
          className="createPlanFormInputs"
          style={{
            width: "60%"
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around"
            }}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <br />
            <ExitButton
              className="exit"
              onClick={() => setOpenPlan(false)}
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
              label="Plan Name"
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
              label="Plan Description"
              multiline
              rows="6"
              placeholder="Be as descriptive as possible to give the project owner an idea of how you will complete this project, and how it aligns with their vision"
            />

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
              label="Technologies to Implement"
              multiline
              rows="6"
              placeholder="What tech stack do you suggest? What libraries and frameworks work for this application? Why?"
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
              placeholder="Propose a dollar amount required to complete this project"
            />

            <br />
            <TextField
              label="Finish By"
              name="dueDate"
              type="date"
              onChange={handleInputChange}
              className={classes.textField}
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              placeholder="When can you reasonably complete this project?"
            />

            <br />
            <Button style={{ margin: "0 auto" }} type="submit">
              Submit
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </form>
  );
};

export default CreatePlan;
