import React from "react";
import PropTypes from "prop-types";
import Profile from "./ProfileView";
import NotFound from "./NotFound";

const ProfileContainer = ({ id, component }) => {
  const UserProfile = component;
  return isNaN(id) ? (
    <NotFound />
  ) : (
    <Profile id={id}>{user => <UserProfile user={user} />}</Profile>
  );
};

export default ProfileContainer;

ProfileContainer.propTypes = {
  id: PropTypes.number,
  component: PropTypes.func
};
