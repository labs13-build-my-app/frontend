import React, { useEffect, useReducer, useState } from "react";

const ProfileCard = ({ children, user }) => {
  // isSignedIn
  // -- display data specific to signed in user
  // isUser
  // -- display user profile with data that is specific to the signed in user
  // roleType
  // -- display type of user

  return <>{children(user.id)}</>;
};

export default ProfileCard;
