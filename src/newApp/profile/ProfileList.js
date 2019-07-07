import React, { useEffect, useState } from "react";
import ProfileCard from "./general/ProfileCard";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { getData } from "../../utils/services";

const ProfileList = ({ type, search }) => {
  const [profileList, setProfileList] = useState({
    page: 1,
    per: 18,
    list: []
  });

  useEffect(() => {
    const fetchData = ({ endpoint, params, setState }) => {
      getData({ endpoint, params, setState });
    };
    if (type === "developer" || type === "project-owner" || type === "users") {
      fetchData({
        endpoint: `/users/list-users${search}`,
        params: { role: type },
        setState: setProfileList
      });
    }
  }, [type, search]);

  const { list } = profileList;
  if (type !== "developer" && type !== "project-owner" && type !== "users") {
    return <Redirect to={"/users-profile-list?page=1"} />;
  } else {
    return (
      <>
        {list.length > 0 &&
          list.map(user => {
            return <ProfileCard key={user.id} user={user} />;
          })}
      </>
    );
  }
};

export default ProfileList;

ProfileList.propTypes = {
  type: PropTypes.string,
  search: PropTypes.string
};
