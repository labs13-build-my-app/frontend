import React from "react";
import PropTypes from "prop-types";
import Profile from "./ProfileView";
import NotFound from "./NotFound";

const ProfileContainer = ({ id, component }) => {
  const ProfileView = component;
  if (isNaN(id)) {
    return <NotFound />;
  }
  return <Profile id={id}>{user => <ProfileView user={user} />}</Profile>;
};

export default ProfileContainer;

ProfileContainer.propTypes = {
  id: PropTypes.number,
  component: PropTypes.func
};
