import {
  TOKEN_EXIST,
  FETCH_START,
  FETCH_USER_FAILURE,
  RECORD_URL_LOCATION,
  LOGIN_USER,
  FETCH_ROLE_SUCCESS,
  FETCH_USER_SUCCESS,
  CREATE_PROJECT_SUCCESS
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case TOKEN_EXIST:
      return {
        ...state,
        token: action.payload
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        newUser: action.payload.newUser
      };
    case RECORD_URL_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case FETCH_START:
      return {
        ...state,
        fetch: true
      };
    case LOGIN_USER:
      return {
        ...state,
        token: localStorage.getItem("token")
      };
    case FETCH_ROLE_SUCCESS:
      return {
        ...state,
        role: action.payload.role
      };
    case FETCH_USER_SUCCESS:
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
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        fetch: false,
        user: {
          ...state.user,
          project: [...state.user.project, action.payload]
        }
      };
    case "USER_SIGN_UP_SUCCESS":
      return {
        ...state,
        signup: false
      };
    default:
      return state;
  }
};

export default reducer;
