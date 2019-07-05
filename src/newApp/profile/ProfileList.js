import React, { useEffect, useState } from "react";
import ProfileCard from "./general/ProfileCard";
import NotFound from "./general/NotFound";
import PropTypes from "prop-types";

const ProfileList = ({ type }) => {
  const [profileList, setProfileList] = useState([]);
  useEffect(() => {
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
  }, []);

  if (type !== "developer" && type !== "project-owner" && type !== "admin") {
    return <NotFound />;
  } else {
    return (
      <>
        {profileList.length > 0 &&
          profileList.map(user => {
            return <ProfileCard key={user.id} user={user} />;
          })}
      </>
    );
  }
};

export default ProfileList;

ProfileList.propTypes = {
  type: PropTypes.string
};
