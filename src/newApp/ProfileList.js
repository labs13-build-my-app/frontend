import React, { useEffect, useReducer, useState } from "react";

const ProfileList = ({ users }) => {
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
  });
  return (
    <>
      {users.length > 0 &&
        users.map(user => {
          return <div>{user.id}</div>;
        })}
    </>
  );
};

export default ProfileList;
