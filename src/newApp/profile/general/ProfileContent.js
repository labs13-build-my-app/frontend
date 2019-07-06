import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getData } from "../../../utils/services";

const ProfileContent = ({ id, children }) => {
  const [userProfile, setUserProfile] = useState({});
  console.log(userProfile);
  useEffect(() => {
    const fetchData = ({ endpoint, params, setState }) => {
      getData({ endpoint, params, setState });
    };
    fetchData({
      endpoint: `/users/profile/${id}`,
      setState: setUserProfile
    });
    return () => {
      fetchData({
        endpoint: `/users/profile/${id}`,
        setState: setUserProfile
      });
    };
  }, [id]);

  if (userProfile === undefined || !userProfile.id) {
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
