import React from "react";
import { Route } from "react-router";
import ProfileContainer from "./profile/general/ProfileContainer";
import { DeveloperPage, ProjectOwnerPage, AdminPage } from "./profile/roles";

const RouteContainer = () => {
  return (
    <>
      <Route
        path="/:type-id-:user_id"
        render={props => {
          let component = null;
          const { type } = props.match.params;
          const { user_id } = props.match.params;
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
            <ProfileContainer id={parseInt(user_id)} component={component} />
          );
        }}
      />
    </>
  );
};

export default RouteContainer;
