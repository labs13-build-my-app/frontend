import React from "react";
import ProfileCard from "../ProfileCard";
import { Route, Switch } from "react-router";
import DeveloperPageView from "./DevloperPageView";
import Dashboard from "../dashboard/Dashboard";

const ProfileContainer = ({ history, dispatch, user, role }) => {
  return (
    <div>
      <Switch>
        {/* public routes */}

        {/* <Route
          exact
          path={"/profile/developers"}
          render={props => (
            <Developers dispatch={dispatch} {...props} role={role} />
          )}
        /> */}

        <Route
          exact
          path={"/profile/developer/:id"}
          render={props => (
            <DeveloperPageView {...props} user={user} role={role} />
          )}
        />
        <Route
          path={"/profile/:id"} // = developers
          render={props => (
            <Dashboard
              {...props}
              dispatch={dispatch}
              loggedInUser={user}
              role={role}
            />
          )}
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
      </Switch>
    </div>
  );
};

export default ProfileContainer;
