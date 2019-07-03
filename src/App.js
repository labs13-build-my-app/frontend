import React from "react";
import { withRouter, Route } from "react-router";
import ProfileContainer from "./newApp/profile/general/ProfileContainer";
import {
  DeveloperPage,
  ProjectOwnerPage,
  AdminPage
} from "./newApp/profile/roles";

const App = () => {
  return (
    <div className="App">
      <Route
        path="/profile/:type/:user_id"
        render={props => {
          let component = null;
          const { type } = props.match.params;
          if (type === "developer") {
            component = DeveloperPage;
          } else if (type === "project-owner") {
            component = ProjectOwnerPage;
          } else if (type === "admin") {
            // redirect?
            component = AdminPage;
          } else {
            return <div> 404 not found or redirect to something? </div>;
          }
          return (
            <ProfileContainer
              id={props.match.params.user_id}
              component={component}
            />
          );
        }}
      />
      {/* <ProfileContainer /> */}
    </div>
  );
};

export default withRouter(App);
