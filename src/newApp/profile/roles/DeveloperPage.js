import React from "react";
import PropTypes from "prop-types";
import ProfileCard from "../general/ProfileCard";

const Developer = ({ user }) => {
  return <ProfileCard user={user} />;
};

export default Developer;

ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
};
