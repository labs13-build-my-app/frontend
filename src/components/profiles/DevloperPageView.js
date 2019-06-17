import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import { fetchDeveloper } from "../../store/actions";

const DeveloperPageView = ({ match }) => {
  const useStyles = makeStyles({
    avatar: {
      margin: 10
    },
    purpleAvatar: {
      margin: 10,
      color: "#fff",
      backgroundColor: deepPurple[500]
    }
  });
  const classes = useStyles();

  const [developer, setDeveloper] = useState({});

  useEffect(() => {
    fetchDeveloper(match.params.id, setDeveloper);
  }, [match.params.id]);

  if (!developer) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Avatar alt="Remy Sharp" className={classes.purpleAvatar}>
            {developer.initials}
          </Avatar>
        </Grid>
        <span>
          {developer.firstName} {developer.lastName}
        </span>
        <p>Proficiency: {developer.devType}</p>
        <p>Skills: {developer.skills}</p>
        <p>Github: {developer.gitHub}</p>
        <p>Twitter: {developer.twitter}</p>
        <p>LinkedIn: {developer.linkedIn}</p>
      </div>
    );
  }
};
export default DeveloperPageView;
