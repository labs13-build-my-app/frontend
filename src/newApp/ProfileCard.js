import React, { useEffect, useReducer, useState } from "react";

const ProfileCard = ({ user }) => {
  // isSignedIn
  // -- display data specific to signed in user
  // isUser
  // -- display user profile with data that is specific to the signed in user
  // roleType
  // -- display type of user

  console.log(user);

  return (
    <>
      <div>{user.id}</div>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
    </>
  );
};

export default ProfileCard;
