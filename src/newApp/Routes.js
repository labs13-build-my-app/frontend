import React from "react";
import { Route } from "react-router";
import ProfileContainer from "./profile/general/ProfileContainer";
import ProfileList from "./profile/ProfileList";
import TestComponent from "./TestComponent";

const Routes = () => {
  return (
    <>
      <Route path="/test" render={props => <TestComponent />} />

      <Route
        path="/:type-profile-list"
        render={props => {
          const { type } = props.match.params;
          return <ProfileList type={type} />;
        }}
      />

      <Route
        path="/:type-id-:user_id"
        render={props => {
          const { user_id, type } = props.match.params;
          const { push } = props.history;
          return (
            <ProfileContainer id={parseInt(user_id)} {...{ type, push }} />
          );
        }}
      />
    </>
  );
};

export default Routes;
