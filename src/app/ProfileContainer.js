import React, { useEffect, useReducer, useState } from "react";
import ProfileList from "./ProfileList";

const ProfileContainer = () => {
  const profileData = {
    id: 0,
    firstName: "Oscar",
    lastName: "Ramos",
    email: "oramcar@gmail.com",
    avatar: "none",
    role: "Project Owner"
  };
  return <ProfileList />;
};

export default ProfileContainer;
