import React, { useEffect, useReducer } from "react";
import ProfileCard from "../ProfileCard";
import { Route } from "react-router";
import Developers from "./DeveloperList";
import DeveloperPageView from "./DevloperPageView";
import Dashboard from "../dashboard/Dashboard";

const ProfileContainer = ({ history, dispatch, user }) => {
  return (
    <div>
      {/* public routes */}
      <Route
        path={"/profile/:id"}
        render={props => (
          <Dashboard {...props} dispatch={dispatch} loggedInUser={user} />
        )}
      />
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
