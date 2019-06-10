import React, { useEffect, useReducer } from "react";
import { Route } from "react-router";
import Developers from "./DeveloperList";

const ProfileContainer = () => {
  return (
    <div>
      {/* public routes */}

      <Route
        exact
        path={"/profile/developers"}
        render={props => <Developers />}
      />
      <Route
        exact
        path={"/profile/developer/:developer_id"}
        render={props => <div>developer page view</div>}
      />
      <Route
        exact
        path={"/profile/project-owner/:project_owner_id"}
        render={props => <div>project owner page view</div>}
      />
    </div>
  );
};

export default ProfileContainer;
