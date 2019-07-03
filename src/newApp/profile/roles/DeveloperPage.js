import React from "react";
import PropTypes from "prop-types";
import ProfileCard from "../general/ProfileCard";

const Developer = ({ user }) => {
  return <ProfileCard user={user} />;
};

export default Developer;

Developer.propTypes = {
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
