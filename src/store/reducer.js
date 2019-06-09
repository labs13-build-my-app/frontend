import {
  LOADING_COMPLETE,
  FETCH_DEVELOPER_SUCCESS,
  FETCH_PROJECT_OWNER_SUCCESS,
  FETCH_ADMIN_SUCCESS,
  TOKEN_EXIST,
  FETCH_START,
  FETCH_USER_FAILURE,
  RECORD_URL_LOCATION,
  USER_SIGNUP,
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
        newUser: true
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
    case USER_SIGNUP:
      return {
        ...state,
        newUser: true
      };
    case FETCH_DEVELOPER_SUCCESS:
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
          developerDetails: {
            skills: action.payload.skills,
            devType: action.payload.devType
          }
        }
      };
    case FETCH_PROJECT_OWNER_SUCCESS:
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
          projectOwnerDetails: {}
        }
      };
    case FETCH_ADMIN_SUCCESS:
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
          adminDetails: {}
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
    default:
      return state;
  }
};

export default reducer;
