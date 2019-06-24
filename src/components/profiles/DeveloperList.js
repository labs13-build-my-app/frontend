import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { Pill } from "../../custom-styles";
import { fetchDevelopers } from "../../store/actions";

const Developers = ({ history }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: 20,
      marginBottom: 20,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 0
      // display: "flex",
      // justifyContent: "space-between",
      // alignItems: "center"
    },
    divContainer: {
      display: "flex",
      flexWrap: "wrap"
    },
    cardContainer: {
      display: "flex",
      flexDirection: "column",
      width: "45%",
      margin: "0% 2.5%",
      flexWrap: "wrap"
    },
    grid: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0px 10px"
      // marginBottom: 20,
      // marginLeft: "auto",
      // marginRight: "auto",
      // padding: 0
    },
    avatar: {
      margin: 0
    },
    purpleAvatar: {
      margin: 0,
      color: "#fff",
      backgroundColor: deepPurple[500]
    },
    button: {
      margin: theme.spacing(1),
      backgroundColor: "#4E72B7",
      border: "1px solid #4E72B7",
      color: "white",
      fontSize: "0.7rem",
      padding: "8px 13px",
      fontWeight: "bold",
      borderRadius: "15px",
      cursor: "pointer",
      outline: "none",
      "&:hover": {
        color: "#4E72B7",
        backgroundColor: "white"
      }
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
  const [page, setPage] = useState({});
  useEffect(() => {
    fetchDevelopers(setDevelopers, setPage);
  }, []);
  if (developers.length === 0) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <h2>Available Developers</h2>
        <div className={classes.divContainer} style={{ width: "100%" }}>
          {developers.map(dev => {
            const initials = dev.firstName.charAt(0) + dev.lastName.charAt(0);
            return (
              <div className={classes.cardContainer} key={dev.id}>
                <Card
                  className={classes.root}
                  onClick={() => history.push(`/profile/${dev.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <Grid className={classes.grid}>
                    {dev.profile_picture_url ? (
                      <Avatar
                        alt={dev.firstName}
                        className={classes.purpleAvatar}
                        src={dev.profile_picture_url}
                      />
                    ) : (
                      <Avatar
                        alt={dev.firstName}
                        className={classes.purpleAvatar}
                      >
                        {initials}
                      </Avatar>
                    )}
                    <CardHeader
                      subheader={`${dev.firstName} ${dev.lastName}`}
                    />
                    <Pill devType={dev.devType}>{dev.devType}</Pill>
                  </Grid>
                  <Divider variant="middle" />
                  <p>Skills: {dev.skills}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default Developers;
