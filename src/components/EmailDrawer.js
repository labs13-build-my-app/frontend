import React, { useState } from "react";
import { sendEmail } from "../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Button } from "../custom-styles";
import TextField from "@material-ui/core/TextField";

const EmailDrawer = ({ emailAddress, firstName }) => {
  const [state, setState] = React.useState({
    bottom: false
  });

  const [email, setEmail] = useState({});

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
    let updateState = { ...email, [e.target.name]: e.target.value };
    setEmail(updateState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const emailConfig = {
      ...email,
      to: emailAddress,
      name: firstName
    };
    sendEmail(emailConfig);
    console.log(emailConfig);
    setState({ ...state, bottom: false });
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
          name="replyTo"
          type="text"
          value={email.replyTo}
          required
          className={classes.textField}
          margin="normal"
          variant="outlined"
          label="Your E-mail"
        />
        <br />

        <br />
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
  // console.log({ emailAddress, firstName });
  return (
    <div>
      <Button small onClick={toggleDrawer("bottom", true)}>
        Send Email
      </Button>
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
export default EmailDrawer;
