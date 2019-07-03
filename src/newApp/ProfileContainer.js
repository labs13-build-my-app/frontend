import React from "react";
import Profile from "./ProfileView";

const ProfileContainer = ({ id, component }) => {
  const Component = component;
  return <Profile id={id}>{user => <Component user={user} />}</Profile>;
};

export default ProfileContainer;
