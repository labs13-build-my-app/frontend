import React, { useEffect, useState } from "react";
import ProfileCard from "./general/ProfileCard";
import NotFound from "./general/NotFound";
import PropTypes from "prop-types";
import axios from "axios";

const ProfileList = ({ type }) => {
  const [profileList, setProfileList] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios({
        method: "GET",
        baseURL: "http://localhost:8000/api",
        url: "/users/list-users",
        params: {
          role: type
        }
      })
        .then(res => {
          setProfileList(res.data.projectOwners);
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    };

    if (type === "developer" || type === "project-owner" || type === "users") {
      fetchData();
    }
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
