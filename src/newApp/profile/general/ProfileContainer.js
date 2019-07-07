import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import Profile from "./ProfileContent";
import { DeveloperPage, ProjectOwnerPage } from "../roles";

const ProfileContainer = ({ id, type, push }) => {
  const UserProfile =
    type === "developer"
      ? DeveloperPage
      : type === "project-owner"
      ? ProjectOwnerPage
      : null;
  return isNaN(id) || (type !== "developer" && type !== "project-owner") ? (
    <Redirect to={"/home"} />
  ) : (
    <Profile id={id} {...{ type, push }}>
      {user => <UserProfile user={user} />}
    </Profile>
  );
};

export default ProfileContainer;

ProfileContainer.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string,
  push: PropTypes.func
};
