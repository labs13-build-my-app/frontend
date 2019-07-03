import React, { useEffect, useReducer, useState } from "react";
import { withRouter, Route } from "react-router";
import ProfileContainer from "./newApp/ProfileContainer";

const App = () => {
  return (
    <div className="App">
      <Route
        path="/profile/:user_id"
        render={props => <ProfileContainer id={props.match.params.user_id} />}
      />
      {/* <ProfileContainer /> */}
    </div>
  );
};

export default withRouter(App);
