import React, { useState, useEffect } from "react";

import placeholder from "../../assets/images/profile-placeholder.png";
import styled from "styled-components";
import { fetchDeveloperPlans, getDeveloperFeedback } from "../../store/actions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import EmailDrawer from "../EmailDrawer";
import ExpansionPanel from "../ExpansionPanel";
import Plan from "../projects/Plan";

import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaUser,
  FaEnvelope,
  FaDev,
  FaBook
} from "react-icons/fa";
import { PageTitle, Card, FeedbackCard, Button } from "../../custom-styles";

// const Card = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   margin: 20px auto;
//   border: 1px solid lightgrey;
//   border-radius: 15px;
//   box-shadow: lightgrey 15px 15px 15px;
//   padding: 10px;
// `;
// const divStyle = {
//   display: "flex",
//   justifyContent: "space-around",
//   alignItems: "center",
//   flexDirection: "column",
//   margin: "20px auto",
//   border: "1px solid lightgrey",
//   borderRadius: "4px",
//   boxShadow:
//     "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
//   padding: "10px",
//   backgroundColor: "white",
//   color: "rgba(0, 0, 0, 0.87)",
//   transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//   backgroundColor: "#fff"
// };
const UserInfo = styled.div`
  text-align: left;
  width: 50%;
`;

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

const Developer = ({ loggedInUser, user, role, history }) => {
  console.log("LOG", loggedInUser, "USER", user);
  const [state, setState] = React.useState({
    submitted: true,
    selected: true,
    completed: true
  });

  const [filters, setFilters] = useState(["declined"]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const newFilters = ["declined"];
    Object.keys(state).forEach(filter => {
      !state[filter] && newFilters.push(filter);
    });
    setFilters(newFilters);
  }, [state, setFilters]);

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const [plans, setPlans] = useState([]);
  const [feedbacks, setfeedback] = useState([]);
  useEffect(() => {
    fetchDeveloperPlans(user.id, setPlans);
    getDeveloperFeedback(user.id, setfeedback);
  }, [user.id, setPlans, reload]);

  let userSkills = user.skills ? user.skills.split(",") : [];

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Card className={"card userCard"}>
        <div style={{ width: "50%" }}>
          <img
            src={
              user.profile_picture_url ? user.profile_picture_url : placeholder
            }
            alt={user.firstName}
            style={{
              borderRadius: "100%",
              width: "50%"
            }}
          />
        </div>
        <UserInfo>
          <List component="userInfo" aria-label="Dashboard user info list">
            <p style={{ fontSize: "20px" }}>
              {user.firstName} {user.lastName}
            </p>
            <span className="dev-type">
              {user.devType} {user.role}
            </span>
            {userSkills ? (
              <div className="dev-skills">
                <span className="skill-tag">Specializing in</span>
                {userSkills.map(el => {
                  return <span className="skill">{el}</span>;
                })}
              </div>
            ) : null}

            <Divider style={{ margin: "10px 0px" }} />
            <div style={{ display: "flex", alignItems: "center" }}>
              {user.gitHub ? (
                <a target="_blank" href={`${user.gitHub}`}>
                  <FaGithub
                    style={{ margin: "10 10px 10 0px", color: "#211F1F" }}
                    size="35px"
                  />
                </a>
              ) : null}
              {user.linkedIn ? (
                <a target="_blank" href={`${user.linkedIn}`}>
                  <FaLinkedin
                    style={{ margin: "10 10px", color: "#0077B5" }}
                    size="35px"
                  />
                </a>
              ) : null}
              {user.twitter ? (
                <a target="_blank" href={`${user.twitter}`}>
                  <FaTwitter
                    style={{ margin: "10 10px", color: "#00aced" }}
                    size="35px"
                  />
                </a>
              ) : null}
            </div>
            {loggedInUser.id === user.id ? null : (
              <EmailDrawer
                buttonSize
                emailAddress={user.email}
                firstName={loggedInUser.firstName}
                buttonText={`Message ${user.firstName}`}
              />
            )}
          </List>
        </UserInfo>
      </Card>
      <PageTitle>Plans</PageTitle>
      <div className="plans-area" style={{ width: "80%", margin: "50px auto" }}>
        <div
          className="switches"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h3 style={{ marginRight: "15px" }}>Show:</h3>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={state.submitted}
                  onChange={handleChange("submitted")}
                  value="submitted"
                  color="primary"
                />
              }
              label="Submitted"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.selected}
                  onChange={handleChange("selected")}
                  value="selected"
                  color="primary"
                />
              }
              label="Selected"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.completed}
                  onChange={handleChange("completed")}
                  value="completed"
                  color="primary"
                />
              }
              label="Completed"
            />
          </FormGroup>
        </div>
        {plans.length === 0 ? (
          <Card className={"card plansCard"}>No plans</Card>
        ) : (
          // plans.map(
          //   plan =>
          //     !filters.includes(plan.planStatus.toLowerCase()) && (
          //       <ExpansionPanel
          //         key={plan.id}
          //         component={
          //           <div style={{ width: "100%" }}>
          //             <PageTitle>Plan Description</PageTitle>
          //             <p>{plan.description}</p>
          //             {loggedInUser.id === user.id &&
          //             plan.planStatus === "selected" ? (
          //               <Plan
          //                 user={user}
          //                 loggedInUser={loggedInUser}
          //                 planID={plan.id}
          //               />
          //             ) : null}
          //             <Divider style={{ margin: "10px 0px" }} />
          //             <Button
          //               small
          //               onClick={() =>
          //                 history.push(`/project/${plan.project_id}`)
          //               }
          //             >
          //               See Project Page
          //             </Button>
          //           </div>
          //         }
          //         plan={plan}
          //       />
          //       // <Card
          //       //   key={plan.id}
          //       //   className={"card plansCard"}
          //       //   onClick={() => history.push(`/plan/${plan.id}`)}
          //       // >
          //       //   {plan.image_url ? (
          //       //     <img src={plan.image_url} alt={plan.name} />
          //       //   ) : null}
          //       //   <StatusPill status={plan.planStatus}>
          //       //     {plan.planStatus}
          //       //   </StatusPill>
          //       //   <p>{plan.name}</p>
          //       //   <p>{plan.description}</p>
          //       // </Card>
          //     )
          // )
          plans
            .filter(plan => {
              let planState = true;
              feedbacks.forEach((feedback, i) => {
                if (plan.id === feedbacks[i].planID) {
                  if (feedback.feedback !== null) planState = false;
                }
              });
              return planState;
            })
            .map(
              plan =>
                !filters.includes(plan.planStatus.toLowerCase()) && (
                  <ExpansionPanel
                    key={plan.id}
                    component={
                      <div style={{ width: "100%" }}>
                        {/* <PageTitle>Plan Description</PageTitle> */}
                        {/* <p>{plan.description}</p> */}
                        {loggedInUser.id === user.id ? (
                          <>
                            <Plan
                              planID={plan.id}
                              user={user}
                              history={history}
                              setPlans={setPlans}
                              reload={reload}
                              setReload={setReload}
                            />
                          </>
                        ) : null}
                        <Divider style={{ margin: "10px 0px" }} />
                      </div>
                    }
                    plan={plan}
                  />
                  // <Card
                  //   key={plan.id}
                  //   className={"card plansCard"}
                  //   onClick={() => history.push(`/plan/${plan.id}`)}
                  // >
                  //   {plan.image_url ? (
                  //     <img src={plan.image_url} alt={plan.name} />
                  //   ) : null}
                  //   <StatusPill status={plan.planStatus}>
                  //     {plan.planStatus}
                  //   </StatusPill>
                  //   <p>{plan.name}</p>
                  //   <p>{plan.description}</p>
                  // </Card>
                )
            )
        )}
      </div>

      <PageTitle style={{ marginBottom: "35px" }}>Completed Projects</PageTitle>
      <div className="completed-projects-feedback">
        {feedbacks.length === 0 ? (
          <FeedbackCard style={{ width: "100%" }} className={"card plansCard"}>
            No Feedback
          </FeedbackCard>
        ) : (
          feedbacks.map(feedback =>
            feedback.feedback ? (
              <FeedbackCard
                style={{
                  width: "33%",
                  flexDirection: "column",
                  margin: "20px"
                }}
                key={feedback.planID}
                className={"card plansCard"}
              >
                <div className="project-avatar-feedback">
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "20px"
                    }}
                  >
                    <img
                      className="project-avatar"
                      src={feedback.projectImage}
                    />
                  </div>

                  <h3>{feedback.projectName}</h3>
                </div>

                <h4>
                  {`${feedback.projectOwnerFirstName} ${
                    feedback.projectOwnerLastName
                  }
                said this about ${user.firstName}`}
                </h4>
                {/* <p
                onClick={() =>
                  history.push(`/profile/${feedback.projectOwnerID}`)
                }
              >
                {feedback.projectOwnerFirstName}
                {""} {feedback.projectOwnerLastName}
              </p> */}
                <em>{feedback.feedback}</em>
                {/* <Divider style={{ margin: "10px 0px" }} /> */}
                <Button
                  small
                  onClick={() => history.push(`/project/${feedback.projectID}`)}
                >
                  View This Project
                </Button>
              </FeedbackCard>
            ) : null
          )
        )}
      </div>
    </div>
  );
};
export default Developer;
