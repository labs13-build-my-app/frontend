import React, { useEffect, useState } from "react";
import ProjectOwner from "./ProjectOwner";
import Developer from "./Developer";
import { fetchProfile } from "../../store/actions";

const Dashboard = ({
  match,
  dispatch,
  user: loggedInUser,
  role,
  isSignedIn,
  history,
  reload
}) => {
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchProfile(match.params.user_id, setUser);
  }, [setUser, history.location.state, match.params.id, refresh]);

  const displayBasedOnRole = () => {
    if (user.role === "Project Owner") {
      return (
        <ProjectOwner
          history={history}
          user={user}
          loggedInUser={loggedInUser}
          role={role}
          reload={reload}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      );
    } else if (user.role === "Developer" || history.location.state) {
      return (
        <Developer
          role={role}
          user={user}
          loggedInUser={loggedInUser}
          history={history}
          reload={reload}
        />
      );
    } else {
      return <h1>Loading</h1>;
    }
  };

  return <div>{displayBasedOnRole()}</div>;
};

export default Dashboard;
