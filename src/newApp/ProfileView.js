import React, { useEffect, useReducer, useState, Children } from "react";
import ProfileCard from "./ProfileCard";

const ProfileView = ({ id, children }) => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    setUserProfile({
      id: id,
      firstName: "Oscar",
      lastName: "Ramos",
      email: "oramcar@gmail.com",
      avatar: "none",
      role: "Project Owner"
    });
  }, []);

  return <>{children(userProfile)}</>;
};

export default ProfileView;
