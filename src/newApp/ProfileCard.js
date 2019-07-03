import React, { useEffect, useReducer, useState } from "react";

const ProfileCard = ({ user }) => {
  return (
    <>
      <div>{user.id}</div>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
    </>
  );
};

export default ProfileCard;
