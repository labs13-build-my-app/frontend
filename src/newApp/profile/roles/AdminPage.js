import React from "react";
import PropTypes from "prop-types";
import ProfileCard from "../general/ProfileCard";

const Admin = ({ user }) => {
  return <ProfileCard user={user} />;
};

export default Admin;

ProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
};
