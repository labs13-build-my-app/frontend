import React from "react";
import PropTypes from "prop-types";
import ProfileCard from "../general/ProfileCard";

const Admin = ({ user }) => {
  return <ProfileCard user={user} />;
};

export default Admin;

Admin.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    profileIMG: PropTypes.string,
    role: PropTypes.string
  })
};
