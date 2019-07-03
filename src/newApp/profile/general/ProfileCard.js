import React from "react";
import PropTypes from "prop-types";

const ProfileCard = ({ user }) => {
  return (
    <>
      <div>{user.id}</div>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
    </>
  );
};

export default ProfileCard;

ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
};
