import React, { useEffect, useReducer, useState } from "react";
import { withRouter, Route } from "react-router";
import ProfileContainer from "./newApp/ProfileContainer";
import DeveloperPage from "./newApp/DeveloperPage";

const App = () => {
  return (
    <div className="App">
      <Route
        path="/profile/:user_id"
        render={props => (
          <ProfileContainer
            id={props.match.params.user_id}
            component={DeveloperPage}
          />
        )}
      />
      {/* <ProfileContainer /> */}
    </div>
  );
};

export default withRouter(App);
