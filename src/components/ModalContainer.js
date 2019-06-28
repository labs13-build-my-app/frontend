import React from "react";
import CreateProjectForm from "./projects/CreateProjectForm";
import CreatePlanForm from "./projects/CreatePlanForm";
import Signup from "./Signup";

const ModalContainer = ({
  isLoading,
  isToken,
  isSignedIn,
  isNewUser,
  fetch,
  error,
  role,
  user,
  dispatch,
  history,
  match
}) => {
  const state = {
    isLoading,
    isToken,
    isSignedIn,
    isNewUser,
    fetch,
    error,
    role,
    user,
    dispatch,
    history,
    match
  };

  return (
    <>
      {role === "Project Owner" ? <CreateProjectForm {...state} /> : null}
      {role === "Developer" ? <CreatePlanForm {...state} /> : null}
      {isNewUser ? <Signup {...state} /> : null}
    </>
  );
};

export default ModalContainer;
