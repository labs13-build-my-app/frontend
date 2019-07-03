import React from "react";
import Profile from "./ProfileView";
import ProfileCard from "./ProfileCard";

const ProfileContainer = ({ id }) => {
  return (
    <Profile id={id}>
      {user => {
        return (
          <>
            <ProfileCard user={user} />
          </>
        );
      }}
    </Profile>
  );
};

export default ProfileContainer;
