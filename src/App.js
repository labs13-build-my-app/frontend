import React, { useEffect, useReducer, useState } from "react";
import { withRouter, Route } from "react-router";
import ProfileContainer from "./newApp/ProfileContainer";
import ProfileCard from "./newApp/ProfileCard";

const App = () => {
  return (
    <div className="App">
      <Route
        path="/profile/:user_id"
        render={props => (
          <ProfileContainer
            id={props.match.params.user_id}
            component={ProfileCard}
          />
        )}
      />
      {/* <ProfileContainer /> */}
    </div>
  );
};

export default withRouter(App);
