import React, { useEffect, useReducer, useState } from "react";
import ProfileList from "./ProfileList";
import ProfileView from "./ProfileView";

const ProfileContainer = ({ id }) => {
  const [userProfile, setUserProfile] = useState({});
  const [profileList, setProfileList] = useState([]);

  useEffect(() => {
    if (id) {
      setUserProfile({
        id: 10,
        firstName: "Oscar",
        lastName: "Ramos",
        email: "oramcar@gmail.com",
        avatar: "none",
        role: "Project Owner"
      });
    } else {
      setProfileList([
        {
          id: 10,
          firstName: "Oscar",
          lastName: "Ramos",
          email: "oramcar@gmail.com",
          avatar: "none",
          role: "Project Owner"
        },
        {
          id: 11,
          firstName: "Oscar",
          lastName: "Ramos",
          email: "oramcar@gmail.com",
          avatar: "none",
          role: "Project Owner"
        }
      ]);
    }
  }, [id]);

  if (id) {
    return <ProfileView user={userProfile} />;
  } else {
    return <ProfileList users={profileList} />;
  }
};

export default ProfileContainer;
