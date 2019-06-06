import { FETCH_START } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_FAILURE":
      return {
        ...state,
        signup: action.payload.signup
      };
    case "RECORD_URL_LOCATION":
      return {
        ...state,
        location: action.payload
      };
    case FETCH_START:
      return {
        ...state,
        fetch: true
      };
    case "LOGIN_USER":
      return {
        ...state,
        token: localStorage.getItem("token")
      };
    case "FETCH_ROLE_SUCCESS":
      return {
        ...state,
        role: action.payload
      };
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        fetch: false,
        isSignedIn: true,
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
