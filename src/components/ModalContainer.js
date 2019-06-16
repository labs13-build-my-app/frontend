import React from "react";
import CreateProjectForm from "./projects/CreateProjectForm";
import CreatePlanForm from "./projects/CreatePlanForm";

// background: green;
// position: absolute;
// max-width: 50%;
// min-height: 60%;
// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);
// border-radius: 10px;
// padding: 40px;

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
      {isNewUser ? <h1>modal for signup</h1> : null}
    </>
  );
};

export default ModalContainer;
