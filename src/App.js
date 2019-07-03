import React from "react";
import { withRouter, Route } from "react-router";
import RouteContainer from "./newApp/RouteContainer";

const App = () => {
  return (
    <div className="App">
      <RouteContainer />
    </div>
  );
};

export default withRouter(App);
