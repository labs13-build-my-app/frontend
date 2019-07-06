import React, { useEffect, useState } from "react";
import ProfileCard from "./general/ProfileCard";
import NotFound from "./general/NotFound";
import PropTypes from "prop-types";
import { getData } from "../../utils/services";

const ProfileList = ({ type }) => {
  const [profileList, setProfileList] = useState([]);
  useEffect(() => {
    const fetchData = ({ endpoint, params, setState }) => {
      getData({ endpoint, params, setState });
    };

    if (type === "developer" || type === "project-owner" || type === "users") {
      fetchData({
        endpoint: "/users/list-users",
        params: { role: type },
        setState: setProfileList
      });
    }
    return () => {
      fetchData({
        endpoint: "/users/list-users",
        params: { role: type },
        setState: setProfileList
      });
    };
  }, [type]);

  if (type !== "developer" && type !== "project-owner" && type !== "users") {
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
