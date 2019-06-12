import React, { useEffect, useReducer } from "react";
import ProfileCard from "../ProfileCard";
import { Route } from "react-router";
import Developers from "./DeveloperList";
import DeveloperPageView from "./DevloperPageView";

const ProfileContainer = ({ dispatch, user, role }) => {
  return (
    <div>
      {/* public routes */}

      <Route
        exact
        path={"/profile/developers"}
        render={props => <Developers dispatch={dispatch} {...props} />}
      />
      <Route
        exact
        path={"/profile/developer/:id"}
        render={props => <DeveloperPageView {...props} />}
      />
      <Route
        exact
        path={"/profile/project-owner/:project_owner_id"}
        render={props => <div>project owner page view</div>}
      />

      <Route
        exact
        path={"/profile"} // /profile-card-test
        render={props => <ProfileCard {...props} user={user} />}
      />
    </div>
  );
};

export default ProfileContainer;
