import React from "react";
import ProfileCard from "../general/ProfileCard";

const Developer = ({ user }) => {
  console.log(user);
  return <ProfileCard user={user} />;
};

export default Developer;
