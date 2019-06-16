import React from "react";

const ProfileCard = ({ user }) => {
  return (
    <div>
      <img
        src={user.profilePictureURL}
        alt="avatar"
        style={{ width: "25%", height: "auto", maxWidth: 385 }}
      />
    </div>
  );
};

export default ProfileCard;
