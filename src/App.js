import React, { useEffect, useReducer, useState } from "react";
import { withRouter } from "react-router";
import ProfileContainer from "./app/ProfileContainer";

const App = () => {
  return (
    <div className="App">
      <ProfileContainer />
    </div>
  );
};

export default withRouter(App);
