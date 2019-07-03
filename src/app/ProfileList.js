import React, { useEffect, useReducer, useState } from "react";

const ProfileList = ({ users }) => {
  return (
    <>
      {users.length > 0 &&
        users.map(user => {
          return <div>{user.id}</div>;
        })}
    </>
  );
};

export default ProfileList;
