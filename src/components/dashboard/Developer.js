import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router";
import placeholder from "../../assets/images/profile-placeholder.png";
import styled from "styled-components";
import { Button } from "../../styled-components";

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

const Developer = ({ loggedInUser, user, role }) => {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    console.log("Use Effect");
    axios({
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      url: `http://localhost:8000/api/account/project-owner/project-list` // this will change
    })
      .then(res => {
        res.data.message === "No Plans" ? setPlans([]) : setPlans(res.data);
      })
      .catch(error => {
        console.log("Error", error);
      });
  }, []);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Card className={"card userCard"}>
        <div style={{ width: "50%" }}>
          <img
            src={user.profilePictureURL ? user.profilePictureURL : placeholder}
            style={{
              borderRadius: "100%",
              width: "50%"
            }}
          />
        </div>
        <UserInfo>
          <h1>
            {user.firstName} {user.lastName}
          </h1>
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
            <Card className={"card plansCard"}>
              {plan.image_url ? <img src={plan.image_url} /> : null}
              <h1>{plan.name}</h1>
              <p>{plan.description}</p>
            </Card>
          ))
        )}
        {user.id === loggedInUser.id ? (
          <Button style={{ margin: "50px auto" }}>+ Create New plan</Button>
        ) : null}
      </div>
    </div>
  );
};
export default Developer;
