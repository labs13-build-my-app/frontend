import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 300
  },
  title: {
    fontSize: 14
  },
  pos: {
    margin: "10 auto"
  }
});

function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("https://build-my-app.herokuapp.com/api/user").then(res => {
      setUsers(res.data.users);
    });
  }, []);

  return (
    <div>
      {users.map(user => (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {user.role}
            </Typography>
            <Typography variant="body2" component="p">
              {user.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

// const User = () => {
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     axios.get("https://build-my-app.herokuapp.com/api/user").then(res => {
//       setUsers(res.data.users);
//     });
//   }, []);

//   return (
//     <div>
//       {users.map(user => (
//         <div key={user.id}>
//           <p>{user.firstName}</p>
//           <p>{user.lastName}</p>
//           <p>{user.email}</p>
//           <p>{user.role}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

export default SimpleCard;
