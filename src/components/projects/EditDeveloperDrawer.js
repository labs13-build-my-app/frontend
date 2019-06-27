import React, { useState } from "react";
import { updateDeveloper } from "../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Button } from "../../custom-styles";
import TextField from "@material-ui/core/TextField";

const EditDeveloperDrawer = ({
  emailAddress,
  firstName,
  buttonText,
  buttonSize,
  setRefresh,
  refresh
}) => {
  const [state, setState] = React.useState({
    bottom: false
  });

  const [profile, setProfile] = useState({});

  const useStyles = makeStyles(theme => ({
    list: {
      width: 250
    },
    fullList: {
      width: "auto"
    },
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

  const handleInputChange = e => {
    let updateState = { ...profile, [e.target.name]: e.target.value };
    setProfile(updateState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // const profileConfig = {
    //   ...profile,
    // };
    updateProjectOwner(profile, setRefresh, refresh);
    console.log(profile);
    setState({ ...state, bottom: false });
    setProfile({});
  };

  const toggleDrawer = (side, open) => event => {
    event.stopPropagation();
    event.preventDefault();

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const fullList = side => (
    <div className={classes.fullList} role="presentation">
      <form onSubmit={handleSubmit}>
        <br />
        <TextField
          onChange={handleInputChange}
          name="firstName"
          type="text"
          value={profile.firstName}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="First Name"
        />
        <br />
        <TextField
          onChange={handleInputChange}
          name="lastName"
          type="text"
          value={profile.lastName}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Last Name"
        />
        <br />
        <TextField
          onChange={handleInputChange}
          name="email"
          type="text"
          value={profile.email}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Email Address"
        />
        <br />
        <TextField
          onChange={handleInputChange}
          name="skills"
          type="text"
          value={profile.skills}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Skills"
        />
        <br />
        <TextField
          onChange={handleInputChange}
          name="twitter"
          type="text"
          value={profile.twitter}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Twitter Profile Link"
        />
        <br />
        <TextField
          onChange={handleInputChange}
          name="linkedIn"
          type="text"
          value={profile.linkedIn}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="LinkedIn Profile Link"
        />
        <br />
        <TextField
          onChange={handleInputChange}
          name="gitHub"
          type="text"
          value={profile.gitHub}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="GitHub Profile Link"
        />
        <br />
        <TextField
          onChange={handleInputChange}
          name="profile_picture_url"
          type="text"
          value={profile.profile_picture_url}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Profile Picture Image URL"
        />
        <br />
        {/* <br />
        <TextField
          onChange={handleInputChange}
          name="text"
          type="text"
          value={email.text}
          required
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Message"
          multiline
          rows="6"
        />
        {/* <br />
        <br />
        <br />
        <br /> */}
        <Button small type="submit">
          Submit
        </Button>
        <br />
        <br />
      </form>
    </div>
  );

  return (
    <div>
      <Button small onClick={toggleDrawer("bottom", true)}>
        {buttonText || "Update Profile"}
      </Button>
      {/* {email ? (
        <Button email onClick={toggleDrawer("bottom", true)}>
          {buttonText || "Send Email"}
        </Button>
      ) : (
        <Button small onClick={toggleDrawer("bottom", true)}>
          {buttonText || "Send Email"}
        </Button>
      )} */}
      <Drawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer("bottom", false)}
      >
        {fullList("bottom")}
      </Drawer>
    </div>
  );
};
export default EditProjectOwnerDrawer;
