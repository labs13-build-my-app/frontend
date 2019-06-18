import React, { useEffect, useState } from "react";
import { fetchPlan, updatePlan } from "../../store/actions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "../../custom-styles";
// import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Plan = ({ match, isLoading, isSignedIn, role }) => {
  console.log(match);
  // const { fullScreen } = props;
  // const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [plan, setPlan] = useState([]);
  const [planStatus, setPlanStatus] = useState([]);

  // function handleClickOpen() {
  //   setOpen(true);
  // }

  // function handleClose() {
  //   setOpen(false);
  // }

  const changeHandler = e => {
    let planUpdate = e.target.value;
    setPlanStatus(planUpdate);
  };

  const submitHandler = e => {
    e.preventDefault();
    updatePlan({ planStatus: planStatus }, match.params.plan_id);
    setPlan(prevState => ({
      ...prevState,
      planStatus
    }));
    setPlanStatus([]);
  };

  useEffect(() => {
    fetchPlan(match.params.plan_id, setPlan);
  }, [match.params.plan_id]);

  return (
    <div>
      <h1>Name: {plan.name}</h1>
      <h1>desc: {plan.description}</h1>
      <h1>tech: {plan.technologiesToUse}</h1>
      <h1>bud: {plan.budget}</h1>
      <h1>date: {plan.dueDate}</h1>
      <h1>status: {plan.planStatus}</h1>
      <form onSubmit={submitHandler}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-simple">Plan Status</InputLabel>
          <Select
            // className={classes.select}
            value={planStatus}
            onChange={e => changeHandler(e)}
          >
            <MenuItem value="" />
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
          </Select>
          <Button type={"submit"} style={{ margin: "20px" }}>
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default Plan;
