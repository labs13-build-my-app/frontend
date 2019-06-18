import React, { useState, useEffect } from "react";

import placeholder from "../../assets/images/profile-placeholder.png";
import styled from "styled-components";
import { fetchDeveloperPlans, getDeveloperFeedback } from "../../store/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaUser,
  FaEnvelope,
  FaDev,
  FaBook
} from "react-icons/fa";

const Card = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px auto;
  border: 1px solid lightgrey;
  border-radius: 15px;
  box-shadow: lightgrey 15px 15px 15px;
  padding: 10px;
`;

const UserInfo = styled.div`
  text-align: left;
  width: 50%;
`;

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Developer = ({ loggedInUser, user, role, history }) => {
  const [plans, setPlans] = useState([]);
  const [feedbacks, setfeedback] = useState([]);
  useEffect(() => {
    fetchDeveloperPlans(user.id, setPlans);
    getDeveloperFeedback(user.id, setfeedback);
  }, [user.id, setPlans]);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Card className={"card userCard"}>
        <div style={{ width: "50%" }}>
          <img
            src={user.profilePictureURL ? user.profilePictureURL : placeholder}
            alt={"avatar"}
            style={{
              borderRadius: "100%",
              width: "50%"
            }}
          />
        </div>
        <UserInfo>
          <List component="userInfo" aria-label="Dashboard user info list">
            <ListItem>
              <ListItemIcon>
                <FaUser />
              </ListItemIcon>
              <ListItemText>
                {user.firstName} {user.lastName}
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FaEnvelope />
              </ListItemIcon>
              <ListItemText>{user.email}</ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FaDev />
              </ListItemIcon>
              <ListItemText>{user.devType}</ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FaBook />
              </ListItemIcon>
              <ListItemText>{user.skills}</ListItemText>
            </ListItem>

            <Divider />
            <ListItem>
              <ListItemIcon>
                <FaGithub />
              </ListItemIcon>
              <ListItemLink
                target="_blank"
                href={`https://github.com/${user.gitHub}`}
              >
                <ListItemText primary={`${user.gitHub}`} />
              </ListItemLink>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FaLinkedin />
              </ListItemIcon>
              <ListItemLink
                target="_blank"
                href={`https://www.linkedin.com/in/${user.linkedIn}`}
              >
                <ListItemText primary={`${user.linkedIn}`} />
              </ListItemLink>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FaTwitter />
              </ListItemIcon>
              <ListItemLink
                target="_blank"
                href={`https://twitter.com/${user.twitter}`}
              >
                <ListItemText primary={`${user.twitter}`} />
              </ListItemLink>
            </ListItem>
          </List>
          <p>{role}</p>
        </UserInfo>
      </Card>
      <div className="plans-area" style={{ width: "70%", margin: "50px auto" }}>
        <h2
          style={{
            borderBottom: "1px solid black",
            paddingBottom: "5px",
            textAlign: "left"
          }}
        >
          plans
        </h2>
        {plans.length === 0 ? (
          <Card className={"card plansCard"}>No plans</Card>
        ) : (
          plans.map(plan => (
            <Card
              key={plan.id}
              className={"card plansCard"}
              onClick={() => history.push(`/plan/${plan.id}`)}
            >
              {plan.image_url ? (
                <img src={plan.image_url} alt={"avatar"} />
              ) : null}
              <h1>{plan.name}</h1>
              <p>{plan.description}</p>
              <p>{plan.planStatus}</p>
            </Card>
          ))
        )}
        {/* maybe move this button on project */}
        {/* {user.id === loggedInUser.id ? (
          <Button style={{ margin: "50px auto" }}>+ Create New plan</Button>
        ) : null} */}
      </div>
      <div className="projectsFeedback">
        Feedback
        {feedbacks.length === 0 ? (
          <Card className={"card plansCard"}>No Feedback</Card>
        ) : (
          feedbacks.map(feedback => (
            <Card key={feedback.planID} className={"card plansCard"}>
              <h1
                onClick={() => history.push(`/project/${feedback.projectID}`)}
              >
                {feedback.projectName}
              </h1>
              <p
                onClick={() =>
                  history.push(`/profile/${feedback.projectOwnerID}`)
                }
              >
                {feedback.projectOwnerFirstName}
                {""} {feedback.projectOwnerLastName}
              </p>
              <p>{feedback.feedback}</p>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
export default Developer;
