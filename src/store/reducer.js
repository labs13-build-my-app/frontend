const reducer = (state, action) => {
  console.log({ action });
  switch (action.type) {
    case "LOGIN":
      console.log("here");
      return {
        ...state,
        login: true
      };
    case "LOGIN_USER":
      return {
        ...state,
        token: localStorage.getItem("token")
      };
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.id,
          name: action.payload.name,
          profilePicutreURL: action.payload.profilePicutreURL
        }
      };
    default:
      return state;
  }
};

export default reducer;
