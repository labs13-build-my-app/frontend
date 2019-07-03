import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
  }, [id]);

  return <>{children(userProfile)}</>;
};

export default ProfileView;

ProfileView.propTypes = {
  id: PropTypes.number,
  children: PropTypes.func
};
