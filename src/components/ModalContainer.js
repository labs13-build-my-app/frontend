import React from "react";

const ModalContainer = ({
  isLoading,
  isToken,
  isSignedIn,
  isNewUser,
  fetch,
  error,
  role,
  user,
  dispatch
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
    dispatch
  };

  return (
    <>
      <h1>container to handle modals</h1>
    </>
  );
};

export default ModalContainer;
