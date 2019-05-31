import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("https://build-my-app.herokuapp.com/api/user").then(res => {
      setUsers(res.data.users);
    });
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
};

export default User;
