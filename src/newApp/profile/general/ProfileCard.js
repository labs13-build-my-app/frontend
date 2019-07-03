import React from "react";

const ProfileCard = ({ user }) => {
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
