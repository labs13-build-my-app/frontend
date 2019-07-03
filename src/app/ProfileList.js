import React, { useEffect, useReducer, useState } from "react";

const ProfileList = () => {
  const profileData = {
    id: 0,
    firstName: "Oscar",
    lastName: "Ramos",
    email: "oramcar@gmail.com",
    avatar: "none",
    role: "Project Owner"
  };
  return <div>{profileData.firstName}</div>;
};

export default ProfileList;
