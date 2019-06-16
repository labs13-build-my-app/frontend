import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { fetchDevelopers } from "../../store/actions";

const Developers = ({ history }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: "80%",
      marginTop: 20,
      marginBottom: 20,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    card: {
      // display: "flex",
      marginBottom: 20,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 0
    },
    avatar: {
      margin: 10
    },
    purpleAvatar: {
      margin: 10,
      color: "#fff",
      backgroundColor: deepPurple[500]
    },
    button: {
      margin: theme.spacing(1)
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  }));
  const classes = useStyles();
  const [developers, setDevelopers] = useState([]);
  useEffect(() => {
    fetchDevelopers()(setDevelopers);
  }, []);
  if (!developers) {
    return <h1>Loading...</h1>;
  } else {
    console.log(developers);
    return (
      <div>
        {developers.map(dev => {
          const initials = dev.firstName.charAt(0) + dev.lastName.charAt(0);
          return (
            <div key={dev.id}>
              <Paper className={classes.root}>
                <Grid>
                  <Avatar alt="Remy Sharp" className={classes.purpleAvatar}>
                    {initials}
                  </Avatar>
                </Grid>
                <div className={classes.name}>
                  {dev.firstName} {dev.devType} developer
                </div>

                <p>Skills: {dev.skills}</p>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={() => history.push(`/profile/${dev.id}`)}
                >
                  View Profile
                </Button>
              </Paper>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Developers;
