import React, { useState, useEffect } from "react";
import { signup } from "../store/actions";
import Auth from "./Auth/Auth";
// import clsx from "clsx"; // whats this??? we need this???
import { makeStyles } from "@material-ui/core/styles";
// import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const auth = new Auth();
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
  menu: {
    width: 200
  }
}));

const Signup = ({ token, dispatch, history }) => {
  const classes = useStyles();
  // const [values, setValues] = React.useState({
  //   name: "Cat in the Hat",
  //   age: "",
  //   multiline: "Controlled",
  //   currency: "EUR"
  // });
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [devType, setDevType] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [twitter, setTwitter] = useState("");

  useEffect(() => {
    if (!token) {
      console.log("in here", token);
      auth.login();
    }
  }, [token, history]);

  const changeHandler = (e, setState) => {
    let user = e.target.value;
    setState(user);
  };
  const submitHandler = e => {
    e.preventDefault();
    signup({
      role,
      firstName,
      lastName,
      email,
      skills,
      devType,
      linkedIn,
      gitHub,
      twitter
    })(dispatch);
    history.push("/dashboard");
  };
  if (!localStorage.getItem("token")) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h2>signup form</h2>
      <form onSubmit={submitHandler}>
        <div>role</div>
        <input
          onChange={event => changeHandler(event, setRole)}
          name="role"
          type="text"
          value={role}
        />
        <div>firstName</div>
        <input
          onChange={event => changeHandler(event, setFirstName)}
          name="firstName"
          type="text"
          value={firstName}
        />
        <TextField
          id="first-name"
          label="First Name"
          className={classes.textField}
          value={firstName}
          onChange={event => changeHandler(event, setFirstName)}
          type="text"
          margin="normal"
          variant="outlined"
        />
        <div>lastName</div>
        <input
          onChange={event => changeHandler(event, setLastName)}
          name="lastName"
          type="text"
          value={lastName}
        />
        <div>email</div>
        <input
          onChange={event => changeHandler(event, setEmail)}
          name="email"
          type="text"
          value={email}
        />
        <div>skills</div>
        <input
          onChange={event => changeHandler(event, setSkills)}
          name="skills"
          type="text"
          value={skills}
        />
        <div>devType</div>
        <input
          onChange={event => changeHandler(event, setDevType)}
          name="devType"
          type="text"
          value={devType}
        />
        <div>linkedIn</div>
        <input
          onChange={event => changeHandler(event, setLinkedIn)}
          name="linkedIn"
          type="text"
          value={linkedIn}
        />
        <div>gitHub</div>
        <input
          onChange={event => changeHandler(event, setGitHub)}
          name="gitHub"
          type="text"
          value={gitHub}
        />
        <div>twitter</div>
        <input
          onChange={event => changeHandler(event, setTwitter)}
          name="twitter"
          type="text"
          value={twitter}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default Signup;
