import React, { useEffect, useReducer, useState } from "react";
import ProfileCard from "./ProfileCard";

const ProfileView = ({ user }) => {
  // isSignedIn
  // -- display data specific to signed in user
  // isUser
  // -- display user profile with data that is specific to the signed in user
  // roleType
  // -- display type of user

  return (
    <>
      <ProfileCard user={user}>{word => word}</ProfileCard>
    </>
  );
};

export default ProfileView;