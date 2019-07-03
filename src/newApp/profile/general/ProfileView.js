import React, { useEffect, useState } from "react";

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
