import {
  LOADING_COMPLETE,
  TOKEN_EXIST,
  FETCH_START,
  FETCH_USER_FAILURE,
  RECORD_URL_LOCATION,
  LOGIN_USER,
  FETCH_ROLE_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_DASHBOARD_SUCCESS,
  CREATE_PROJECT_SUCCESS
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING_COMPLETE:
      return {
        ...state,
        isLoading: false
      };
    case TOKEN_EXIST:
      return {
        ...state,
        token: action.payload.token
        // isLoading: false
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
        isLoading: false,
        role: action.payload.role,
        user: {
          ...state.user,
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          userSocialMedia: {
            linkedIn: action.payload.linkedIn,
            github: action.payload.gitHub,
            twitter: action.payload.twitter
          },
          roleSpecificUserDetails: {
            skills: action.payload.skills,
            devType: action.payload.devType
          }
        }
      };
    case FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        fetch: false,
        error: false,
        user: {
          ...state.user,
          dashboardData: action.payload
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
