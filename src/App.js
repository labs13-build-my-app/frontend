import React from "react";
import { withRouter } from "react-router";
import Routes from "./newApp/Routes";

const App = () => {
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

export default withRouter(App);
