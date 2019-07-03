import React from "react";
import PropTypes from "prop-types";

const ProfileCard = ({ user }) => {
  return (
    <>
      <div>{user.id}</div>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
      <div>{user.email}</div>
      <div>{user.profileIMG}</div>
      <div>{user.role}</div>
      <div>{user.skills}</div>
      <div>{user.devType}</div>
    </>
  );
};

export default ProfileCard;

ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    profileIMG: PropTypes.string,
    role: PropTypes.string,
    skills: PropTypes.string,
    devType: PropTypes.string
  })
};
