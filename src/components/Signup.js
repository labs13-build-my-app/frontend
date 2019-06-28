import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Auth from "./Auth/Auth";
import { signup } from "../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { Button } from "../custom-styles";

const SignupForm = styled.form``;

const auth = new Auth();
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    background: "green"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "40%"
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  root: {
    // display: "flex",
    // flexWrap: "wrap",
    // width: "100%"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(1)
  }
}));

const Signup = ({ isToken, dispatch, history, isSignedIn, isLoading }) => {
  const classes = useStyles();
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [devType, setDevType] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [profilePictureUrl, setprofilePictureUrl] = useState("");

  const inputLabel = React.useRef(0);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    return () => setLabelWidth(null);
  }, [labelWidth]);

  useEffect(() => {
    if (!isToken) {
      auth.login();
    }
  }, [isToken, history]);

  const changeHandler = (e, setState) => {
    let user = e.target.value;
    setState(user);
  };
  const submitHandler = e => {
    e.preventDefault();
    signup(
      {
        role,
        firstName,
        lastName,
        email,
        skills,
        devType,
        linkedIn,
        gitHub,
        twitter,
        // // linkedIn: linkedIn.split("/")[linkedIn.split("/").length - 1],
        // gitHub: gitHub.split("/")[gitHub.split("/").length - 1],
        // twitter: twitter.split("/")[twitter.split("/").length - 1],
        profile_picture_url: profilePictureUrl
      },
      dispatch
    );
  };
  if (isSignedIn || isLoading || !localStorage.getItem("token")) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <SignupForm className={classes.root} onSubmit={submitHandler}>
        <h2>Profile Setup</h2>
        <div className="role">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor="role-type">
              Sign up As
            </InputLabel>
            <Select
              className={classes.selectMenu}
              value={role}
              onChange={event => changeHandler(event, setRole)}
              input={
                <OutlinedInput
                  labelWidth={labelWidth}
                  name="age"
                  id="role-type"
                />
              }
            >
              <MenuItem value=" ">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Developer"}>Developer</MenuItem>
              <MenuItem value={"Project Owner"}>Project Owner</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="general-info">
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
          <TextField
            id="last-name"
            label="Last Name"
            className={classes.textField}
            value={lastName}
            onChange={event => changeHandler(event, setLastName)}
            type="text"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="email"
            label="E-Mail"
            className={classes.textField}
            value={email}
            onChange={event => changeHandler(event, setEmail)}
            type="text"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="profile-image"
            label="Profile-Image"
            className={classes.textField}
            value={profilePictureUrl}
            onChange={event => changeHandler(event, setprofilePictureUrl)}
            type="text"
            margin="normal"
            variant="outlined"
          />
        </div>
        {role === "Developer" ? (
          <div className="dev-info">
            <TextField
              id="skills"
              label="Skills"
              className={classes.textField}
              value={skills}
              onChange={event => changeHandler(event, setSkills)}
              type="text"
              margin="normal"
              variant="outlined"
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name-simple">Dev Type</InputLabel>
              <Select
                value={devType}
                onChange={event => changeHandler(event, setDevType)}
                inputProps={{
                  name: "devType",
                  id: "name-simple"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Web">Web</MenuItem>
                <MenuItem value="iOS">iOS</MenuItem>
                <MenuItem value="Android">Android</MenuItem>
              </Select>
            </FormControl>
          </div>
        ) : null}
        <div className="socialmedia-info">
          <TextField
            id="linkedin"
            label="LinkedIn"
            className={classes.textField}
            value={linkedIn}
            onChange={event => changeHandler(event, setLinkedIn)}
            type="text"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="github"
            label="GitHub"
            className={classes.textField}
            value={gitHub}
            onChange={event => changeHandler(event, setGitHub)}
            type="text"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="twitter"
            label="Twitter"
            className={classes.textField}
            value={twitter}
            onChange={event => changeHandler(event, setTwitter)}
            type="text"
            margin="normal"
            variant="outlined"
          />
        </div>
        <Button large center type="submit">Submit</Button>
      </SignupForm>
    </div>
  );
};
export default Signup;
