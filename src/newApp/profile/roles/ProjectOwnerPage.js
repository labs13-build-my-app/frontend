import React from "react";
import PropTypes from "prop-types";
import ProfileCard from "../general/ProfileCard";

const ProjectOwner = ({ user }) => {
  return <ProfileCard user={user} />;
};

export default ProjectOwner;

ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
};
