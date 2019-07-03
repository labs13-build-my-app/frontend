import React from "react";
import Profile from "./ProfileView";

const ProfileContainer = ({ id, component }) => {
  const ProfileView = component;
  return <Profile id={id}>{user => <ProfileView user={user} />}</Profile>;
};

export default ProfileContainer;
