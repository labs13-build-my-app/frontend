import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const Developers = ({ history }) => {
  const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 400,
      // display: "flex",
      marginBottom: 20,
      marginLeft: "auto",
      marginRight: "auto",
      padding: 10
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
    axios({
      method: "GET",
      url: "http://localhost:8000/api/users/developers",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res.data);
        setDevelopers(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  if (!developers) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        {developers.map(dev => {
          return (
            <div key={dev.id}>
              <Card className={classes.card}>
                <CardContent>
                  <p>Developer Name: {dev.firstName}</p>
                  <p>Proficiency: {dev.devType}</p>
                  <p>Skills: {dev.skills}</p>
                  <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={() => history.push(`/profile/developer/${dev.id}`)}
                  >
                    See More
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Developers;
