import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ProfileContent = ({ id, children }) => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    setUserProfile({
      id: id,
      firstName: "Oscar",
      lastName: "Ramos",
      email: "oramcar@gmail.com",
      profileIMG: "img.com",
      role: "Project Owner",
      skills: "one, two, punch",
      devType: "mobile"
    });
  }, [id]);

  if (!userProfile.id) {
    return null;
  } else {
    return <>{children(userProfile)}</>;
  }
};

export default ProfileContent;

ProfileContent.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired
};
