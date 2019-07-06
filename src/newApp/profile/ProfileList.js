import React, { useEffect, useState } from "react";
import ProfileCard from "./general/ProfileCard";
import NotFound from "./general/NotFound";
import PropTypes from "prop-types";
import axios from "axios";

const ProfileList = ({ type }) => {
  const [profileList, setProfileList] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8000/api/users/list-users")
        .then(res => {
          // setProfileList()
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchData();
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
