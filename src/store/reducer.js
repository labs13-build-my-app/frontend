const reducer = (state, action) => {
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
    case "FETCH_ROLE_SUCCESS":
      console.log(action.payload);
      return {
        ...state,
        role: action.payload
      };
    case "FETCH_USER_SUCCESS":
      console.log(state);
      return {
        ...state,
        role: action.payload.role,
        user: {
          ...state.user,
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        }
      };
    default:
      return state;
  }
};

export default reducer;
