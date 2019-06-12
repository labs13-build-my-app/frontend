import React, { useEffect, useReducer } from "react";
import { Route } from "react-router";
import Developers from "./DeveloperList";
import DeveloperPageView from "./DevloperPageView";
import Dashboard from "../dashboard/Dashboard";

const ProfileContainer = ({ dispatch, user }) => {
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
    </div>
  );
};

export default ProfileContainer;
