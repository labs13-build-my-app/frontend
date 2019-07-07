import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { getData } from "../../../utils/services";

const ProfileContent = ({ id, type, children, push }) => {
  const [userProfile, setUserProfile] = useState({});
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

  const role = userProfile.role ? userProfile.role.toLowerCase() : undefined;
  useEffect(() => {
    if (role && role !== type) {
      push(`/${role}-id-${id}`);
    }
  }, [role, push, id, type]);

  if (userProfile === "user not found") {
    return <Redirect to={`/user-${id}-notfound`} />;
  } else if (userProfile === undefined || !userProfile.id || role !== type) {
    return null;
  } else if (role === type) {
    return <>{children(userProfile)}</>;
  }
};

export default ProfileContent;

ProfileContent.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired
};
